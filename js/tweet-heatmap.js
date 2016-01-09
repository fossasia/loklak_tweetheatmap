var app = angular.module('tweet-heatmap', []);

app.controller('search', function ($scope, $http) {
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

  $scope.search = function() {
    if ($scope.query != '') {
      // Clear current points in map
      $scope.data.clear();
      $scope.loading = 'Loading...'
      $http.jsonp('http://loklak.org/api/search.json?callback=JSON_CALLBACK&q=' + $scope.query).
      success(function(data, status, headers, config) {
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
            $scope.loading = '';
          }
        }
      }).
      error(function (err) {
        $scope.loading = "Error while loading tweets. Try again later";
        console.log(err);
      });
    }
  }
});
