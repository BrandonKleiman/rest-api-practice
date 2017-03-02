var app = angular.module('app', []);

app.controller('ctrl', ['$scope', '$http', function($scope, $http) {
  $scope.displayTeachers = false;
  $scope.displayStudents= false;
  $scope.displayClasses = false;
  
  $scope.getTeachers = function() {
    $http.get('/api/teachers').then(function(result) {
    $scope.tester = result;
    $scope.displayTeachers = true;
  })
  }
  $http.get('/api/students').then(function(result) {
    $scope.students = result;
  })
  $http.get('/api/classes').then(function(result) {
    $scope.classes = result;
  })
}])

// function config($routeProvider) {
//   $routeProvider
//     .when('/', {
//       templateUrl: 'angular-app/hotel-list/teacher.html',
//       controller: myController,
//       controllerAs: 'vm'
//     })
