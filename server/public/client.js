console.log('JS loaded');

var app = angular.module('EmployeeApp', []);

app.controller('EmployeeController', ['$http', function($http) {
    console.log('Employee Controller has been loaded!');
    var self = this;
    self.employees = [];

    self.getEmployees = function() {
        $http({ //angular ajax function
            method: 'GET',
            url: '/employee',
        }).then(function(response) {
            console.log(response.data);
            self.messages = response.data;
        }); // end $http
    }; // end self.getEmployees

    self.postEmployees = function() {
        $http({
            method: 'POST',
            url: '/employee',
            data: self.newEmployee
        }).then(function(response) {
            console.log(response);
            self.getEmployees();
        }); // end $http
    }; //end self.Post
    self.getEmployees();
}]); // end of app.controller