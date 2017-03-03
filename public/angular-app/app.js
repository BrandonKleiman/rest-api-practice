var app = angular.module('app', []);

app.controller('ctrl', ['$scope', '$http', function($scope, $http) {
  $scope.displayTeachers = false;
  $scope.displayStudents= false;
  $scope.displayClasses = false;
  $scope.addRecord = false;
  $scope.addOther = true;
  $scope.addClass = false;
  $scope.newUser = function() {
    $scope.displayTeachers = false;
    $scope.displayStudents= false;
    $scope.displayClasses = false;
    $scope.addRecord = true;
  }
   $scope.data = {
    availableOptions: ["Teachers", "Students", "Classes"],
    selectedOption: "Teachers"
   }
   $scope.ts = function() {
    $scope.addClass =  false;
    $scope.addOther = true;
   }
   $scope.cls = function() {
    $scope.addClass =  true;
    $scope.addOther = false;
   }

   $scope.handleClick = function() {
     if ($scope.data.userinput !== undefined) {
      if ($scope.data.selectedOption === "Teachers") {
        $scope.getTeacherByID($scope.data.userinput);
      } else if ($scope.data.selectedOption === "Students") {
        $scope.getStudentByID($scope.data.userinput);
      } else if ($scope.data.selectedOption === "Classes") {
        $scope.getClassByID($scope.data.userinput);
      }
     }
   }

  $scope.getTeachers = function() {
    $http.get('/api/teachers').then(function(result) {
    $scope.tester = result.data;
    $scope.displayStudents= false;
    $scope.addRecord = false;
    $scope.displayClasses = false;
    $scope.displayTeachers = true;
  })
}
  $scope.getTeacherByID = function(id) {
    $http.get('/api/teachers/'+id).then(function(result) {
    $scope.tester = [result.data];
    $scope.displayStudents= false;
    $scope.displayClasses = false;
    $scope.addRecord = false;
    $scope.displayTeachers = true;
    console.log($scope.tester)
  })
}

  $scope.getClasses = function() {
    $http.get('/api/classes').then(function(result) {
    $scope.classes = result.data;
    $scope.displayTeachers = false;
    $scope.addRecord = false;
    $scope.displayStudents= false;
    $scope.displayClasses = true;
  })
  }

  $scope.getClassByID = function(id) {
    $http.get('/api/classes/'+id).then(function(result) {
    $scope.classes = [result.data];
    $scope.displayTeachers = false;
    $scope.addRecord = false;
    $scope.displayStudents= false;
    $scope.displayClasses = true;
  })
  }
  $scope.getStudents = function() {
    $http.get('/api/students').then(function(result) {
    $scope.students = result.data;
    $scope.displayTeachers = false;
    $scope.displayClasses = false;
    $scope.addRecord = false;
    $scope.displayStudents = true;
  })
  }
  $scope.getStudentByID = function(id) {
    $http.get('/api/students/'+id).then(function(result) {
    $scope.students = [result.data];
    $scope.displayTeachers = false;
    $scope.displayClasses = false;
    $scope.addRecord = false;
    $scope.displayStudents = true;
  })
  }
}])