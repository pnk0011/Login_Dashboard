var app = angular.module('MyAwesomeApp', ['chart.js']);

app.controller('cnt', function ($scope, $http,$window) {


  // verrify user 
  $scope.USERNAME == '';
  $scope.PASSWORD == '';
  $scope.loginsuccessful = '';

  $scope.verifyLogin = function () {
    if ($scope.USERNAME == 'user1' && $scope.PASSWORD == 'password'){
      $scope.loginsuccessful = 'successful';
      $window.location = 'DashBoard.html';
    }
  }
  
  //Graph Container Method Call 
  $scope.labels = [];
  $scope.series = ['Load Power', 'Solar Power'];
  $scope.data = [[],[]];
  $scope.colours = [{
    fillColor: "#ff0000",
    strokeColor: "#ff0000",
    pointColor: "#ff0000",
    pointStrokeColor: "#ff0000",
    pointHighlightFill: "#ff0000",
    pointHighlightStroke: "#ff0000"
  }];
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

  $scope.proData1 = [];
  $scope.proData2 = [];
  $scope.proData3 = [];
  $scope.proData4 = [];

  $scope.GraphContainerMethod = function () {

     $http.get("https://cors-anywhere.herokuapp.com/http://13.234.38.186/v1/graph/1")
      .then(function (response) {
        console.log(response.data.graph_value);
        //console.log(response.data);
        $scope.proData = response.data.graph_value;
        $scope.proData1 = response.data.graph_value[0];
        $scope.proData2 = response.data.graph_value[1];
        $scope.proData3 = response.data.graph_value[2];
        $scope.proData4 = response.data.graph_value[3];
        console.log('resonse from git API : ' + JSON.stringify(response.data));
        $scope.labels = [];
     
         $scope.data = [[],[]];

        for(var i =0;i<$scope.proData1.values.length;i++){
          $scope.data[0].push($scope.proData1.values[i].value);
          $scope.data[1].push($scope.proData2.values[i].value);
          $scope.labels.push($scope.proData1.values[i].timestamp.substring(11));
        }

      })
      .catch(function (data) {

        $scope.proData = [];


      });

     


  }

 



});






