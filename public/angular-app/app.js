var app = angular.module('app', []);

app.controller('ctrl', ['$scope', '$http', function($scope, $http) {
  $scope.displayTeachers = false;
  $scope.displayStudents= false;
  $scope.displayClasses = false;
  
  $scope.getTeachers = function() {
    $http.get('/api/teachers').then(function(result) {
    $scope.tester = result;
    $scope.displayStudents= false;
    $scope.displayClasses = false;
    $scope.displayTeachers = true;
  })
  }
  $scope.getClasses = function() {
    $http.get('/api/classes').then(function(result) {
    $scope.classes = result;
    $scope.displayTeachers = false;
    $scope.displayStudents= false;
    $scope.displayClasses = true;
  })
  }
  $scope.getStudents = function() {
    $http.get('/api/students').then(function(result) {
    $scope.students = result;
    $scope.displayTeachers = false;
    $scope.displayClasses = false;
    $scope.displayStudents = true;
  })
  }
}])