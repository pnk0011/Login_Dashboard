var app = angular.module('MyAwesomeApp', ['chart.js']);
app.controller('cnt', function ($scope, $http,$interval)  {

  // scope variables 
  $scope.putloader = false;
  $scope.USERNAME == '';
  $scope.PASSWORD == '';
  $scope.proData1 = [];
  $scope.proData2 = [];
  $scope.proData3 = [];
  $scope.proData4 = [];
  $scope.batteryPercentage = 0;
  $scope.loadPoweAvg = 0;
  $scope.solarPowerAvg = 0;
  $scope.currentPage = 'page-login';

  $scope.verifyLogin = function () {
    if ($scope.USERNAME == 'user1' && $scope.PASSWORD == 'password') {
      $scope.updateGraphAfterOneMinute();
      $scope.currentPage = 'Graph';
      $scope.putLoader();
      $scope.USERNAME = '';
      $scope.PASSWORD = '';

    }
  }
  $scope.backToLoginPage = function () {
    $scope.currentPage = 'page-login';
    $scope.data = [[], []];
    $scope.labels = [];
    $scope.batteryPercentage = 0;
    $scope.loadPoweAvg = 0;
    $scope.solarPowerAvg = 0;
  }

  $scope.putLoader = function () {
    $scope.putloader = true;
  }
  
  //Graph Container Method Call 
  $scope.labels = [];
  $scope.series = ['Load Power', 'Solar Power'];
  $scope.data = [[], []];

  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        }
      ]
    }
  };

  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
   var GraphContainerMethod = function () {
    $scope.putLoader();
    $http.get("https://cors-anywhere.herokuapp.com/http://13.234.38.186/v1/graph/1")
      .then(function (response) {
        $scope.proData = response.data.graph_value;
        $scope.proData1 = response.data.graph_value[0];
        $scope.proData2 = response.data.graph_value[1];
        $scope.proData3 = response.data.graph_value[2];
        $scope.proData4 = response.data.graph_value[3];
        $scope.labels = [];
        $scope.data = [[], []];
        var toatalLoadPower = 0;
        var toatalSolarPower = 0;
        for (var i = 0; i < $scope.proData1.values.length; i++) {
          $scope.data[0].push($scope.proData1.values[i].value);
          toatalLoadPower = toatalLoadPower + $scope.proData1.values[i].value;
          $scope.data[1].push($scope.proData2.values[i].value);
          toatalSolarPower = toatalSolarPower + $scope.proData2.values[i].value;
          $scope.labels.push($scope.proData1.values[i].timestamp.substring(11));
        }
        $scope.loadPoweAvg = toatalLoadPower / 288;
        $scope.solarPowerAvg = toatalSolarPower / 288;
      })
      .catch(function (data) {
        $scope.proData = [];
      });
    $http.get("https://cors-anywhere.herokuapp.com/http://13.234.38.186/v1/boxVal/1")
      .then(function (response) {
        $scope.batteryPercentage = response.data.value;
        $scope.putloader = false;
      })
      .catch(function (data) {
        $scope.batteryPercentage = 0;
      });
  }

   $scope.updateGraphAfterOneMinute = function(){
    $interval(GraphContainerMethod, 60000);
  }
 
  



});






