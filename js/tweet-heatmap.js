var app = angular.module('tweet-heatmap', ['daterangepicker']);

app.controller('search', function ($scope, $http) {
  $scope.datePicker = {startDate: null, endDate: null};
  $scope.loaded = false;

  $scope.data = new ol.source.Vector();

  // Create new map
  map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.MapQuest({ layer: 'sat' })
      })
    ],
    view: new ol.View({
      center: ol.proj.transform([37.41, 8.82], 'EPSG:4326', 'EPSG:3857'),
      zoom: 2
    })
  });

  // create the layer
  heatMapLayer = new ol.layer.Heatmap({
    source: $scope.data,
    radius: 25
  });

  // add to the map
  map.addLayer(heatMapLayer);

  var parseTime = function(input) {
    var hours, minutes, buffer;
    hours = -1;
    minutes = -1;
    buffer = '';
    for (var i = 0; i < (input.length - 2); i++) {
      if (input[i] != ':' && input[i] != ' ') {
        buffer += input[i]
      } else {
        if (hours == -1) {
          hours = parseInt(buffer);
        } else {
          minutes = parseInt(buffer);
        }
        buffer = '';
      }
    }
    if (input.slice(-2) == 'PM') {
      hours += 12;
    }
    return hours + ':' + minutes;
  }

  $scope.search = function() {
    query = $scope.query;
    if (!query) {
      return;
    }

    var startDatetime, endDatetime;
    sinceDatetime = '';
    untilDatetime = '';

    if ($scope.datePicker.startDate && $scope.datePicker.endDate) {
      sinceDate = $scope.datePicker.startDate.toArray();
      sinceDatetime += 'since:'
      sinceDatetime += sinceDate[0] + '-' + (sinceDate[1] + 1) + '-' +  sinceDate[2];
      sinceDatetime += '_';

      untilDate = $scope.datePicker.endDate.toArray();
      untilDatetime += 'until:'
      untilDatetime += untilDate[0] + '-' + (untilDate[1] + 1) + '-' +  untilDate[2];
      untilDatetime += '_';
    }

    if ($scope.sinceTime && sinceDatetime) {
      sinceDatetime += parseTime($scope.sinceTime);
    } else if (sinceDatetime) {
      sinceDatetime += '00:00';
    }

    if ($scope.untilTime && untilDatetime) {
      untilDatetime += parseTime($scope.untilTime);
    } else if (untilDatetime) {
      untilDatetime += '00:00';
    }

    if (sinceDatetime) {
      query += ' ' + sinceDatetime;
    }
    if (untilDatetime) {
      query += ' ' + untilDatetime;
    }

    // Clear current points in map
    $scope.data.clear();
    $scope.loading = 'Loading...'
    $scope.loaded = false;
    timezoneOffset = new Date().getTimezoneOffset();
    $http.jsonp('http://loklak.org/api/search.json?callback=JSON_CALLBACK&q=' + query + '&timezoneOffset=' + timezoneOffset)
    .success(function(data, status, headers, config) {
      //$scope.result = data;
      for (var i = 0; i < data.statuses.length; i++) {
        //$scope.places.push(data.statuses[i].text);
        if (data.statuses[i].location_point) {
          // created for owl range of data
          var coord = ol.proj.transform(data.statuses[i].location_point, 'EPSG:4326', 'EPSG:3857');

          var lonLat = new ol.geom.Point(coord);

          var pointFeature = new ol.Feature({
            geometry: lonLat
          });

          $scope.data.addFeature(pointFeature);
          $scope.loaded = true;
          $scope.loading = '';
        }
      }
    })
    .error(function (err) {
      $scope.loading = "Error while loading tweets. Try again later";
      console.log(err);
    });
  }
});
