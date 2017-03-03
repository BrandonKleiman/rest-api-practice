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
   $scope.teach = function() {
    $scope.addClass =  false;
    $scope.addOther = true;
    $scope.userType = "teachers"
   }
   $scope.stud = function() {
    $scope.addClass =  false;
    $scope.addOther = true;
    $scope.userType = "students";
   }
   $scope.cls = function() {
    $scope.addClass =  true;
    $scope.addOther = false;
    $scope.userType = "classes";
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
  $scope.postUser = function() {
    var name = $scope.newName
    var email = $scope.newEmail
    var code = $scope.newCode
    console.log($scope.userType)
    if ($scope.userType === "students" && name && email) {
      console.log("12")
      var data = {"name": name, "email": email};
      
      console.log(data);
      $http.post('api/students/', data, 
        {headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
      })
      console.log(data);
    } else if ($scope.userType === "teachers") {
      var data = {name: name, email: email};
      $http.post('api/teachers/', data)
    } else if ($scope.userType === "classes") {
      var data = {name:name,code:code}
      $http.post('api/classes/', data)
    }
    

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