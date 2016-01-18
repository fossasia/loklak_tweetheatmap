picker = angular.module('daterangepicker', [])

picker.constant('dateRangePickerConfig',
  clearLabel: 'Clear'
  locale:
    separator: ' - '
    format: 'YYYY-MM-DD'
)

picker.directive 'dateRangePicker', ($compile, $timeout, $parse, dateRangePickerConfig) ->
  require: 'ngModel'
  restrict: 'A'
  scope:
    min: '='
    max: '='
    model: '=ngModel'
    opts: '=options'
    clearable: '='
  link: ($scope, element, attrs, modelCtrl) ->
    # Custom angular extend function to extend locales, so they are merged instead of overwritten
    # angular.merge removes prototypes...
    _mergeOpts = () ->
      localeExtend = angular.extend.apply(angular,
        Array.prototype.slice.call(arguments).map((opt) -> opt?.locale).filter((opt) -> !!opt))
      extend = angular.extend.apply(angular, arguments)
      extend.locale = localeExtend
      extend

    el = $(element)
    customOpts = $scope.opts
    opts = _mergeOpts({}, dateRangePickerConfig, customOpts)
    _picker = null

    _clear = ->
      _picker.setStartDate()
      _picker.setEndDate()

    _setDatePoint = (setter) ->
      (newValue) ->
        if _picker and newValue
          setter(moment(newValue))

    _setStartDate = _setDatePoint (m) ->
      if (_picker.endDate < m)
        _picker.setEndDate(m)
      opts.startDate = m
      _picker.setStartDate(m)

    _setEndDate = _setDatePoint (m) ->
      if (_picker.startDate > m)
        _picker.setStartDate(m)
      opts.endDate = m
      _picker.setEndDate(m)

    # Validation for our min/max
    _validate = (validator) ->
      (boundary, actual) ->
        if boundary and actual
        then validator(moment(boundary), moment(actual))
        else true

    _validateMin = _validate (min, start) -> min.isBefore(start) or min.isSame(start, 'day')
    _validateMax = _validate (max, end) -> max.isAfter(end) or max.isSame(end, 'day')

    # Formatter should return just the string value of the input
    # It is used for comparison of if we should re-render
    modelCtrl.$formatters.push (objValue) ->
      f = (date) ->
        if not moment.isMoment(date)
        then moment(date).format(opts.locale.format)
        else date.format(opts.locale.format)

      if opts.singleDatePicker and objValue
        f(objValue)
      else if objValue.startDate
        [f(objValue.startDate), f(objValue.endDate)].join(opts.locale.separator)
      else ''

    # Render should update the date picker start/end dates as necessary
    # It should also set the input element's val with $viewValue as we don't let the rangepicker do this
    modelCtrl.$render = () ->
      # Update the calendars
      if modelCtrl.$modelValue and modelCtrl.$modelValue.startDate
        _setStartDate(modelCtrl.$modelValue.startDate)
        _setEndDate(modelCtrl.$modelValue.endDate)
      else _clear()
      # Update the input with the $viewValue (generated from $formatters)
      el.val(modelCtrl.$viewValue)

    # This should parse the string input into an updated model object
    modelCtrl.$parsers.push (val) ->
      # Parse the string value
      f = (value) ->
        moment(value, opts.locale.format)
      objValue =
        startDate: null
        endDate: null
      if angular.isString(val) and val.length > 0
        if opts.singleDatePicker
          objValue = f(val)
        else
          x = val.split(opts.locale.separator).map(f)
          objValue.startDate = x[0]
          objValue.endDate = x[1]
      objValue

    modelCtrl.$isEmpty = (val) ->
      # modelCtrl is empty if val is empty string
      not (angular.isString(val) and val.length > 0)

    # _init has to be called anytime we make changes to the date picker options
    _init = ->
      # disable autoUpdateInput, can't handle empty values without it.  Our callback here will
      # update our $viewValue, which triggers the $parsers
      el.daterangepicker angular.extend(opts, {autoUpdateInput: false}), (start, end) ->
        $scope.$apply () ->
          $scope.model = if opts.singleDatePicker then start else {startDate: start, endDate: end}

      # Needs to be after daterangerpicker has been created, otherwise
      # watchers that reinit will be attached to old daterangepicker instance.
      _picker = el.data('daterangepicker')

      # Ability to attach event handlers. See https://github.com/fragaria/angular-daterangepicker/pull/62
      # Revised

      for eventType of opts.eventHandlers
        el.on eventType, (e) ->
          eventName = e.type + '.' + e.namespace
          $scope.$evalAsync(opts.eventHandlers[eventName])

    _init()

    # Watchers enable resetting of start and end dates
    # Update the date picker, and set a new viewValue of the model
    $scope.$watch 'model.startDate', (n) ->
      _setStartDate(n)
    $scope.$watch 'model.endDate', (n) ->
      _setEndDate(n)

    # Add validation/watchers for our min/max fields
    _initBoundaryField = (field, validator, modelField, optName) ->
      if attrs[field]
        modelCtrl.$validators[field] = (value) ->
          value and validator(opts[optName], value[modelField])
        $scope.$watch field, (date) ->
          opts[optName] = if date then moment(date) else false
          _init()

    _initBoundaryField('min', _validateMin, 'startDate', 'minDate')
    _initBoundaryField('max', _validateMax, 'endDate', 'maxDate')

    # Watch our options
    if attrs.options
      $scope.$watch 'opts', (newOpts) ->
        opts = _mergeOpts(opts, newOpts)
        _init()
      , true

    # Watch clearable flag
    if attrs.clearable
      $scope.$watch 'clearable', (newClearable) ->
        if newClearable
          opts = _mergeOpts(opts, {locale: {cancelLabel: opts.clearLabel}})
        _init()
        if newClearable
          el.on 'cancel.daterangepicker', () ->
            $scope.$apply () ->
              $scope.model = if opts.singleDatePicker then null else {startDate: null, endDate: null}

    $scope.$on '$destroy', ->
      _picker?.remove()
