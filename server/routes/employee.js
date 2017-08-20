var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

console.log('employee route is connected EMPLOYEE.JS'); // working

router.get('/', function(req, res) {
    console.log('Get was hit employee.js')
        // Add a SELECT query
    pool.connect(function(errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            //when connecting to database failed
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // when connecting to database worked aka HAPPYPATH!
            client.query('SELECT * FROM employee;', function(errorMakingQuery, result) {
                done(); //needed
                if (errorMakingQuery) {
                    console.log('Error making database query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                } // end else
            }); // end client.query
        } // end if
    }); // end pool.connect
}); // end router.get

router.post('/', function(req, res) {
    var newEmployee = req.body;
    console.log('employees.js post was hit!');
    // Add an INSERT query
    pool.connect(function(errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            //when connecting to database failed
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // when connecting to database worked aka HAPPYPATH!
            client.query('INSERT INTO employee (first_name, last_name, job_title, salary) VALUES ($1, $2, $3, $4);', [req.body.firstName, req.body.lastName, req.body.jobTitle, req.body.annualSalary], function(errorMakingQuery, result) {
                done(); //needed
                if (errorMakingQuery) {
                    console.log('Error making database query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                } // end else
            }); // end client.query
        } // end if
    }); // end pool.connect
}); // end router.post

router.put('/:id', function(req, res) {
    var messageId = req.params.id; // messageId is 7
    console.log('message put was hit!');
    // Add an INSERT query
    pool.connect(function(errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            // when connecting to database failed
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // when connecting to database worked!
            // query like this: UPDATE messages SET message='Have a really terrific day!' WHERE id=1;
            client.query('UPDATE messages SET first_name=$1 WHERE id=$2;', [req.body.firstName, messageId],
                function(errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        console.log('Error making database query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(200);
                    } // end else
                }); // end client.query
        } // end if
    }); // end pool.connect
}); // end router.put
module.exports = router;