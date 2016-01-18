/**
 * Copyright (C) 2014-2015, HARTWIG Communication & Events GmbH & Co. KG
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 * Created: 2014-01-07 15:49
 *
 * @author Oliver Salzburg <oliver.salzburg@gmail.com>
 * @copyright Copyright (C) 2014-2015, HARTWIG Communication & Events GmbH & Co. KG
 * @license http://opensource.org/licenses/mit-license.php MIT License
 */

(function() {
	"use strict";

	/* globals $, angular, Hamster, moment */

	angular.module( "fmTimepicker", [] );

	angular.module( "fmTimepicker" )
		.filter( "fmTimeFormat", fmTimeFormat )
		.filter( "fmTimeInterval", fmTimeInterval )
		.controller( "fmTimepickerController", fmTimepickerController )
		.directive( "fmTimepickerToggle", fmTimepickerToggle )
		.directive( "fmTimepicker", fmTimepicker );

	function fmTimeFormat() {
		return function fmTimeFormatFilter( input, format ) {
			if( typeof input === "number" ) {
				input = moment( input );
			}
			return moment( input ).format( format );
		};
	}

	function fmTimeInterval() {
		return function fmTimeIntervalFilter( input, start, end, interval ) {
			if( !start || !end ) {
				return input;
			}

			start    = moment( start );
			end      = moment( end );
			interval = interval || moment.duration( 30, "minutes" );

			for( var time = start.clone(); +time <= +end; time.add( interval ) ) {
				// We're using the UNIX offset integer value here.
				// When trying to return the actual moment instance (and then later format it through a filter),
				// you will get an infinite digest loop, because the returned objects in the resulting array
				// will always be new, unique instances. We always need to return the identical, literal values for each input.
				input.push( +time );
			}
			return input;
		};
	}

	/* @ngInject */
	function fmTimepickerController( $scope ) {

		// Create day of reference
		$scope.fmReference = $scope.fmReference ? moment( $scope.fmReference ) : moment();

		$scope.fmStyle         = $scope.fmStyle || "dropdown";
		$scope.fmIsOpen        = $scope.fmIsOpen || false;
		$scope.fmFormat        = $scope.fmFormat || "LT";
		$scope.fmStartTime     = $scope.fmStartTime || moment( $scope.fmReference ).startOf( "day" );
		$scope.fmEndTime       = $scope.fmEndTime || moment( $scope.fmReference ).endOf( "day" );
		$scope.fmInterval      = $scope.fmInterval || moment.duration( 30, "minutes" );
		$scope.fmLargeInterval = $scope.fmLargeInterval || moment.duration( 60, "minutes" );
		$scope.fmStrict        = $scope.fmStrict || false;
		$scope.fmBtnClass      = $scope.fmBtnClass || "btn btn-default";
		$scope.fmIconClasses   = $scope.fmIconClasses || {
				plus  : "glyphicon glyphicon-plus",
				minus : "glyphicon glyphicon-minus",
				time  : "glyphicon glyphicon-time"
			};

		if( moment.tz ) {
			$scope.fmStartTime.tz( $scope.fmReference.tz() );
			$scope.fmEndTime.tz( $scope.fmReference.tz() );
		}

		if( $scope.fmStrict ) {
			// Round the model value up to the next valid time that fits the configured interval.
			var modelMilliseconds    = $scope.ngModel.valueOf();
			var intervalMilliseconds = $scope.fmInterval.asMilliseconds();

			modelMilliseconds -= modelMilliseconds % intervalMilliseconds;
			modelMilliseconds += intervalMilliseconds;

			$scope.ngModel = moment( modelMilliseconds );
		}

		/**
		 * Makes sure that the moment instances we work with all use the same day as fmReference.
		 * We need this because we might construct moment instances from all kinds of sources,
		 * in the time picker, we only care about time values though and we still want to compare
		 * them through the moment mechanics (which respect the full date).
		 * @param {Moment} [day] If day is given, it will be constrained to the fmReference day, otherwise all members will be constrained.
		 * @return {Moment} If day was provided as parameter, it will be returned as well.
		 */
		$scope.constrainToReference = function( day ) {
			if( day ) {
				if( moment.tz ) {
					day.tz( $scope.fmReference.tz() );
				}

				if( !day.isSame( $scope.fmReference, "day" ) ) {
					day.year( $scope.fmReference.year() ).month( $scope.fmReference.month() ).date( $scope.fmReference.date() );
				}
				return day;

			} else {
				if( !$scope.fmStartTime.isSame( $scope.fmReference, "day" ) ) {
					$scope.fmStartTime.year( $scope.fmReference.year() ).month( $scope.fmReference.month() ).date(
						$scope.fmReference.date() );
				}
				if( !$scope.fmEndTime.isSame( $scope.fmReference, "day" ) ) {
					$scope.fmEndTime.year( $scope.fmReference.year() ).month( $scope.fmReference.month() ).date( $scope.fmReference.date() );
				}
				if( $scope.ngModel && !$scope.ngModel.isSame( $scope.fmReference, "day" ) ) {
					$scope.ngModel.year( $scope.fmReference.year() ).month( $scope.fmReference.month() ).date( $scope.fmReference.date() );
				}
			}
			return null;
		};
		$scope.constrainToReference();

		/**
		 * Returns a time value that is within the bounds given by the start and end time parameters.
		 * @param {Moment} time The time value that should be constrained to be within the given bounds.
		 * @returns {Moment} A new time value within the bounds, or the input instance.
		 */
		$scope.ensureTimeIsWithinBounds = function( time ) {
			// We expect "time" to be a Moment instance; otherwise bail.
			if( !time || !moment.isMoment( time ) ) {
				return time;
			}
			// Constrain model value to be in given bounds.
			if( time.isBefore( $scope.fmStartTime ) ) {
				return moment( $scope.fmStartTime );
			}
			if( time.isAfter( $scope.fmEndTime ) ) {
				return moment( $scope.fmEndTime );
			}
			return time;
		};
		$scope.ngModel = $scope.ensureTimeIsWithinBounds( $scope.ngModel );

		/**
		 * Utility method to find the index of an item, in our collection of possible values, that matches a given time value.
		 * @param {Moment} model A moment instance to look for in our possible values.
		 */
		$scope.findActiveIndex = function( model ) {
			$scope.activeIndex = 0;
			if( !model ) {
				return;
			}

			// We step through each possible value instead of calculating the index directly,
			// to make sure we account for DST changes in the reference day.
			for( var time = $scope.fmStartTime.clone(); +time <= +$scope.fmEndTime; time.add( $scope.fmInterval ), ++$scope.activeIndex ) {
				if( time.isSame( model ) ) {
					break;
				}
				// Check if we've already passed the time value that would fit our current model.
				if( time.isAfter( model ) ) {
					// If we're in strict mode, set an invalid index.
					if( $scope.fmStrict ) {
						$scope.activeIndex = -1;
					}
					// If we're not in strict mode, decrease the index to select the previous item (the one we just passed).
					$scope.activeIndex -= 1;
					// Now bail out and use whatever index we determined.
					break;
				}
			}
		};
		// The index of the last element in our time value collection.
		$scope.largestPossibleIndex = Number.MAX_VALUE;
		// The amount of list items we should skip when we perform a large jump through the collection.
		$scope.largeIntervalIndexJump = Number.MAX_VALUE;
		// Seed the active index based on the current model value.
		$scope.findActiveIndex( $scope.ngModel );

		// Check the supplied interval for validity.
		$scope.$watch( "fmInterval", function intervalWatcher( newInterval, oldInterval ) {
			if( newInterval.asMilliseconds() < 1 ) {
				console.error(
					"[fm-timepicker] Error: Supplied interval length is smaller than 1ms! Reverting to default." );
				$scope.fmInterval = moment.duration( 30, "minutes" );
			}
		} );
		// Check the supplied large interval for validity.
		$scope.$watch( "fmLargeInterval", function largeIntervalWatcher( newInterval, oldInterval ) {
			if( newInterval.asMilliseconds() < 10 ) {
				console.error(
					"[fm-timepicker] Error: Supplied large interval length is smaller than 10ms! Reverting to default." );
				$scope.fmLargeInterval = moment.duration( 60, "minutes" );
			}
		} );
		// Watch the given interval values.
		$scope.$watchCollection( "[fmInterval,fmLargeInterval]", function intervalsWatcher( newValues ) {
			// Pick array apart.
			var newInterval      = newValues[ 0 ];
			var newLargeInterval = newValues[ 1 ];
			// Get millisecond values for the intervals.
			var newIntervalMilliseconds      = newInterval.asMilliseconds();
			var newLargeIntervalMilliseconds = newLargeInterval.asMilliseconds();
			// Check if the large interval is a multiple of the interval.
			if( 0 !== ( newLargeIntervalMilliseconds % newIntervalMilliseconds ) ) {
				console.warn(
					"[fm-timepicker] Warning: Large interval is not a multiple of interval! Using internally computed value instead." );
				$scope.fmLargeInterval       = moment.duration( newIntervalMilliseconds * 5 );
				newLargeIntervalMilliseconds = $scope.fmLargeInterval.asMilliseconds();
			}
			// Calculate how many indices we need to skip for a large jump through our collection.
			$scope.largeIntervalIndexJump = newLargeIntervalMilliseconds / newIntervalMilliseconds;
		} );
	}

	function fmTimepickerToggle() {
		return {
			restrict : "A",
			link     : function postLink( scope, element, attributes ) {
				// Toggle the popup when the toggle button is clicked.
				element.bind( "click", function onClick() {
					if( scope.fmIsOpen ) {
						scope.focusInputElement();
						scope.closePopup();
					} else {
						// Focusing the input element will automatically open the popup
						scope.focusInputElement();
					}
				} );
			}
		};
	}

	/* @ngInject */
	function fmTimepicker( $timeout ) {
		return {
			templateUrl : "fmTimepicker.html",
			replace     : true,
			restrict    : "EA",
			scope       : {
				ngModel         : "=",
				fmFormat        : "=?",
				fmStartTime     : "=?",
				fmEndTime       : "=?",
				fmReference     : "=?",
				fmInterval      : "=?",
				fmLargeInterval : "=?",
				fmIsOpen        : "=?",
				fmStyle         : "=?",
				fmStrict        : "=?",
				fmBtnClass      : "=?",
				fmIconClasses   : "=?",
				fmDisabled      : "=?"
			},
			controller  : "fmTimepickerController",
			require     : "ngModel",
			link        : function postLink( scope, element, attributes, controller ) {
				// Watch our input parameters and re-validate our view when they change.
				scope.$watchCollection( "[fmStartTime,fmEndTime,fmInterval,fmStrict]", function inputWatcher() {
					scope.constrainToReference();
					validateView();
				} );

				// Watch all time related parameters.
				scope.$watchCollection( "[fmStartTime,fmEndTime,fmInterval,ngModel]", function timeWatcher() {
					// When they change, find the index of the element in the dropdown that relates to the current model value.
					scope.findActiveIndex( scope.ngModel );
				} );

				/**
				 * Invoked when we need to update the view due to a changed model value.
				 */
				controller.$render = function render() {
					// Convert the moment instance we got to a string in our desired format.
					var time = moment( controller.$modelValue ).format( scope.fmFormat );
					// Check if the given time is valid.
					var timeValid = checkTimeValueValid( time );
					if( scope.fmStrict ) {
						timeValid = timeValid && checkTimeValueWithinBounds( time ) && checkTimeValueFitsInterval(
								time );
					}

					if( timeValid ) {
						// If the time is valid, store the time string in the scope used by the input box.
						scope.time = time;
					} else {
						throw new Error( "The provided time value is invalid." );
					}
				};

				/**
				 * Reset the validity of the directive.
				 * @param {Boolean} to What to set the validity to?
				 */
				function resetValidity( to ) {
					controller.$setValidity( "time", to );
					controller.$setValidity( "bounds", to );
					controller.$setValidity( "interval", to );
					controller.$setValidity( "start", to );
					controller.$setValidity( "end", to );
				}

				/**
				 * Check if the value in the view is valid.
				 * It has to represent a valid time in itself and it has to fit within the constraints defined through our input parameters.
				 */
				function validateView() {
					resetValidity( true );
					// Check if the string in the input box represents a valid date according to the rules set through parameters in our scope.
					var timeValid = checkTimeValueValid( scope.time );
					if( scope.fmStrict ) {
						timeValid = timeValid && checkTimeValueWithinBounds( scope.time ) && checkTimeValueFitsInterval(
								scope.time );
					}

					if( !scope.fmStartTime.isValid() ) {
						controller.$setValidity( "start", false );
					}
					if( !scope.fmEndTime.isValid() ) {
						controller.$setValidity( "end", false );
					}

					if( timeValid ) {
						// If the string is valid, convert it to a moment instance, store in the model and...
						var newTime;
						if( moment.tz ) {
							newTime = moment.tz(
								scope.time,
								scope.fmFormat,
								scope.fmReference.tz() );
						} else {
							newTime = moment( scope.time, scope.fmFormat );
						}
						newTime = scope.constrainToReference( newTime );
						controller.$setViewValue( newTime );
						// ...convert it back to a string in our desired format.
						// This allows the user to input any partial format that moment accepts and we'll convert it to the format we expect.
						if( moment.tz ) {
							scope.time = moment.tz(
								scope.time,
								scope.fmFormat,
								scope.fmReference.tz() ).format( scope.fmFormat );
						} else {
							scope.time = moment( scope.time, scope.fmFormat ).format( scope.fmFormat );
						}
					}
				}

				/**
				 * Check if a given string represents a valid time in our expected format.
				 * @param {String} timeString The timestamp is the expected format.
				 * @returns {boolean} true if the string is a valid time; false otherwise.
				 */
				function checkTimeValueValid( timeString ) {
					var time;
					if( moment.tz ) {
						time = timeString ? moment.tz(
							timeString,
							scope.fmFormat,
							scope.fmReference.tz() ) : moment.invalid();
					} else {
						time = timeString ? moment( timeString, scope.fmFormat ) : moment.invalid();
					}
					if( !time.isValid() ) {
						controller.$setValidity( "time", false );
						controller.$setViewValue( null );
						return false;
					} else {
						controller.$setValidity( "time", true );
						return true;
					}
				}

				/**
				 * Check if a given string represents a time within the bounds specified through our start and end times.
				 * @param {String} timeString The timestamp is the expected format.
				 * @returns {boolean} true if the string represents a valid time and the time is within the defined bounds; false otherwise.
				 */
				function checkTimeValueWithinBounds( timeString ) {
					var time;
					if( moment.tz ) {
						time = timeString ? moment.tz(
							timeString,
							scope.fmFormat,
							scope.fmReference.tz() ) : moment.invalid();
					} else {
						time = timeString ? moment( timeString, scope.fmFormat ) : moment.invalid();
					}
					time = scope.constrainToReference( time );
					if( !time.isValid() || time.isBefore( scope.fmStartTime ) || time.isAfter( scope.fmEndTime ) ) {
						controller.$setValidity( "bounds", false );
						controller.$setViewValue( null );
						return false;
					} else {
						controller.$setValidity( "bounds", true );
						return true;
					}
				}

				/**
				 * Check if a given string represents a time that lies on a the boundary of a time interval.
				 * @param {String} timeString The timestamp in the expected format.
				 * @returns {boolean} true if the string represents a valid time and that time lies on an interval boundary; false otherwise.
				 */
				function checkTimeValueFitsInterval( timeString ) {
					var time;
					if( moment.tz ) {
						time = timeString ? moment.tz(
							timeString,
							scope.fmFormat,
							scope.fmReference.tz() ) : moment.invalid();
					} else {
						time = timeString ? moment( timeString, scope.fmFormat ) : moment.invalid();
					}
					// Check first if the time string could be parsed as a valid timestamp.
					var isValid = time.isValid();
					if( isValid ) {
						// Calculate the amount of milliseconds that passed since the specified start time.
						var durationSinceStartTime = time.diff( scope.fmStartTime );
						// Calculate how many milliseconds are within the given time interval.
						var intervalMilliseconds = scope.fmInterval.asMilliseconds();
						// Check if the modulo operation has a remainder.
						isValid = ( 0 === ( durationSinceStartTime % intervalMilliseconds ) );
					}

					if( !isValid ) {
						controller.$setValidity( "interval", false );
						controller.$setViewValue( null );
						return false;
					} else {
						controller.$setValidity( "interval", true );
						return true;
					}
				}

				function ensureUpdatedView() {
					$timeout( function runDigest() {
						scope.$apply();
					} );

					// Scroll the selected list item into view if the popup is open.
					if( scope.fmIsOpen ) {
						// Use $timeout to give the DOM time to catch up.
						$timeout( scrollSelectedItemIntoView );
					}
				}

				/**
				 * Scroll the time that is currently selected into view.
				 * This applies to the dropdown below the input element.
				 */
				function scrollSelectedItemIntoView() {
					// Find the popup.
					var popupListElement = element.find( "ul" );
					// Scroll it to the top, so that we can then get the correct relative offset for all list items.
					$( popupListElement ).scrollTop( 0 );
					// Find the selected list item.
					var selectedListElement = $( "li.active", popupListElement );
					// Retrieve offset from the top and height of the list element.
					var top    = selectedListElement.length ? selectedListElement.position().top : 0;
					var height = selectedListElement.length ? selectedListElement.outerHeight( true ) : 0;
					// Scroll the list to bring the selected list element into the view.
					$( popupListElement ).scrollTop( top - height );
				}

				/**
				 * Open the popup dropdown list.
				 */
				function openPopup() {
					if( !scope.fmIsOpen ) {
						scope.fmIsOpen     = true;
						scope.modelPreview = scope.ngModel ? scope.ngModel.clone() : scope.fmStartTime.clone();
						$timeout( ensureUpdatedView );
					}
				}

				// --------------- Scope methods ---------------

				/**
				 * Close the popup dropdown list.
				 */
				scope.closePopup = function( delayed ) {
					if( delayed ) {
						// Delay closing the popup by 200ms to ensure selection of
						// list items can happen before the popup is hidden.
						$timeout(
							function closeDropdown() {
								scope.fmIsOpen = false;
							}, 200 );
					} else {
						scope.fmIsOpen = false;
						$timeout( ensureUpdatedView );
					}
				};

				scope.handleListClick = function handleListClick( $event ) {
					// When the list scrollbar is clicked, this can cause the list to lose focus.
					// Preventing the default behavior here has no undesired effects, it just stops
					// the input from losing focus.
					$event.preventDefault();
					return false;
				};

				/**
				 * Selects a given timestamp as the new value of the timepicker.
				 * @param {Number} timestamp UNIX timestamp
				 * @param {Number} elementIndex The index of the time element in the dropdown list.
				 */
				scope.select = function select( timestamp, elementIndex ) {
					// Construct a moment instance from the UNIX offset.
					var time;
					if( moment.tz && scope.fmReference.tz() ) {
						time = moment( timestamp ).tz( scope.fmReference.tz() );
					} else {
						time = moment( timestamp );
					}
					// Format the time to store it in the input box.
					scope.time = time.format( scope.fmFormat );

					// Store the selected index
					scope.activeIndex = elementIndex;

					scope.update();
					scope.closePopup();
				};

				scope.increment = function increment() {
					if( scope.fmIsOpen ) {
						scope.modelPreview.add( scope.fmInterval );
						scope.modelPreview = scope.ensureTimeIsWithinBounds( scope.modelPreview );
					} else {
						scope.ngModel.add( scope.fmInterval );
						scope.ngModel = scope.ensureTimeIsWithinBounds( scope.ngModel );
						scope.time    = scope.ngModel.format( scope.fmFormat );
					}
					scope.activeIndex = Math.min( scope.largestPossibleIndex, scope.activeIndex + 1 );
				};

				scope.decrement = function decrement() {
					if( scope.fmIsOpen ) {
						scope.modelPreview.subtract( scope.fmInterval );
						scope.modelPreview = scope.ensureTimeIsWithinBounds( scope.modelPreview );
					} else {
						scope.ngModel.subtract( scope.fmInterval );
						scope.ngModel = scope.ensureTimeIsWithinBounds( scope.ngModel );
						scope.time    = scope.ngModel.format( scope.fmFormat );
					}
					scope.activeIndex = Math.max( 0, scope.activeIndex - 1 );
				};

				/**
				 * Check if the value in the input control is a valid timestamp.
				 */
				scope.update = function update() {
					var timeValid = checkTimeValueValid( scope.time ) && checkTimeValueWithinBounds( scope.time );
					if( timeValid ) {
						var newTime;
						if( moment.tz ) {
							newTime = moment.tz( scope.time,
								scope.fmFormat,
								scope.fmReference.tz() );
						} else {
							newTime = moment( scope.time, scope.fmFormat );
						}
						newTime = scope.constrainToReference( newTime );
						controller.$setViewValue( newTime );
					}
				};

				scope.handleKeyboardInput = function handleKeyboardInput( event ) {
					switch( event.keyCode ) {
						case 13:
							// Enter
							if( scope.modelPreview ) {
								scope.ngModel  = scope.modelPreview;
								scope.fmIsOpen = false;
							}
							break;
						case 27:
							// Escape
							scope.closePopup();
							break;
						case 33:
							// Page up
							openPopup();
							scope.modelPreview.subtract( scope.fmLargeInterval );
							scope.modelPreview = scope.ensureTimeIsWithinBounds( scope.modelPreview );
							scope.activeIndex  = Math.max( 0,
								scope.activeIndex - scope.largeIntervalIndexJump );
							break;
						case 34:
							// Page down
							openPopup();
							scope.modelPreview.add( scope.fmLargeInterval );
							scope.modelPreview = scope.ensureTimeIsWithinBounds( scope.modelPreview );
							scope.activeIndex  = Math.min( scope.largestPossibleIndex,
								scope.activeIndex + scope.largeIntervalIndexJump );
							break;
						case 38:
							// Up arrow
							openPopup();
							scope.decrement();
							break;
						case 40:
							// Down arrow
							openPopup();
							scope.increment();
							break;
						default:
					}
					$timeout( ensureUpdatedView );
				};

				/**
				 * Prevent default behavior from happening.
				 * @param event
				 */
				scope.preventDefault = function preventDefault( event ) {
					event.preventDefault();
				};

				/**
				 * Remember the highest index of the existing list items.
				 * We use this to constrain the possible values for the index that marks a list item as active.
				 * @param {Number} index
				 */
				scope.largestPossibleIndexIs = function largestPossibleIndexIs( index ) {
					scope.largestPossibleIndex = index;
				};

				scope.focusInputElement = function focusInputElement() {
					$( inputElement ).focus();
				};

				var inputElement     = element.find( "input" );
				var popupListElement = element.find( "ul" );

				/**
				 * Open the popup when the input box gets focus.
				 */
				inputElement.bind( "focus", function onFocus() {
					// Without delay the popup can glitch close itself instantly after being opened.
					$timeout( openPopup, 150 );
					scope.isFocused = true;
				} );

				/**
				 * Invoked when the input box loses focus.
				 */
				inputElement.bind( "blur", function onBlur() {
					// Delay any action by 150ms
					$timeout( function checkFocusState() {
						// Check if we didn't get refocused in the meantime.
						// This can happen if the input box is selected and the user toggles the dropdown.
						// This would cause a hide and close in rapid succession, so don't do it.
						if( !$( inputElement ).is( ":focus" ) ) {
							scope.closePopup();
							validateView();
						}
					}, 150 );
					scope.isFocused = false;
				} );

				popupListElement.bind( "mousedown", function onMousedown( event ) {
					event.preventDefault();
				} );

				if( typeof Hamster === "function" ) {
					Hamster( inputElement[ 0 ] ).wheel( function onMousewheel( event, delta, deltaX, deltaY ) {
						if( scope.isFocused ) {
							event.preventDefault();

							scope.activeIndex -= delta;
							scope.activeIndex = Math.min( scope.largestPossibleIndex,
								Math.max( 0, scope.activeIndex ) );

							scope.select( scope.dropDownOptions[ scope.activeIndex ], scope.activeIndex );
							$timeout( ensureUpdatedView );
						}
					} );
				}

			}
		};
	}

})();
