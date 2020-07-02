const model = require('./model')
const mysql = require('mysql')
let con = require('./db');

function getUser(email, callback) {
    con.query(model.getUser, email, function (err, results, fields) {
        if (err) {
            console.log(err.message);
            return callback(err);
        } else {
            if (results.length != 0) {
                return callback(results)
            } else {
                return callback(false);
            }
        }
    })
}

function saveUser(user, callback) {
    con.query(model.saveUser, user, function (err, results, fields) {
        if (err) {
            console.log(err.message);
            callback(err);
        } else {
            return callback(true)
        }
    })
}

function getAllUser(callback) {
    con.query(model.getAllUser, function (err, results, fields) {
        if (err) {
            console.log(err.message);
            return callback(err);
        } else {
            if (results.length != 0) {
                return callback(results)
            } else {
                return callback(false);
            }
        }
    })
}

function deleteUser(email, callback) {
    con.query(model.deleteUser, email, function (err, results, fields) {
        if (err) {
            console.log(err.message);
            return callback(err);
        } else {
            return callback(true);
        }
    })
}


function updateUser(user, callback) {
    con.query(model.updateUser, user, function (err, results, fields) {
        if (err) {
            console.log(err);
            return callback(err);
        } else {
            return callback(true);
        }
    })
}

function getUserById(user, callback) {
    con.query(model.getUserById, user, function (err, results, fields) {
        if (err) {
            console.log(err);
            return callback(err);
        } else {
            return callback(results);
        }
    })
}

module.exports = {
    getUser,
    saveUser,
    getAllUser,
    deleteUser,
    updateUser,
    getUserById
}