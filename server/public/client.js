console.log('JS loaded');

var app = angular.module('EmployeeApp', []);

app.controller('EmployeeController', ['$http', function($http) {
    console.log('Employee Controller has been loaded!');
    var self = this;
    self.employees = [];
    self.user = { is_active: true };
    self.getEmployees = function() {
        $http({ //angular ajax function
            method: 'GET',
            url: '/employee',
        }).then(function(response) {
            console.log(response.data);
            self.employees = response.data;
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
            self.newEmployee = {};
        }); // end $http
    }; //end self.Post
    self.getEmployees();

    self.putEmployees = function(index) {
        console.log('edit button clicked' + index);
        self.enabledEdit[self.employees.length - 1] = true;

        $http({
            method: 'PUT',
            url: '/employee',
            data: self.employees
        }).then(function(response) {
            console.log(response);
            self.getEmployees();
        })
    }

    self.isActive = true;
    self.activeButton = function() {
        if (self.isActive === true) {
            self.isActive === false;
        } else {
            self.isActive === true;
        }
    }

    self.getSum = function() {
        var total = 0;
        for (var i = 0; i < self.employees.length; i++) {
            var salarySum = self.employees[i];
            total += (salarySum.salary / 12);
        }
        return total;
    }
}]); // end of app.controller