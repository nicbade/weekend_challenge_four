console.log('JS loaded');

var app = angular.module('EmployeeApp', []);

app.controller('EmployeeController', ['$http', function($http) {
    console.log('Employee Controller has been loaded!');
    var self = this;
    self.employees = [];


}]); // end of app.controller