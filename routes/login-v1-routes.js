'use strict';
const rc = require('../constant/RC');
const db = require('../components/database/query')

const api = (app) => {
    app.post('/cloud-ace/login', (req, res) => {
        try {
            let {username, password} = req.body
            if (!username || !password) {
                res.sendInvalidUserCredentials();
            } else {
                let paramUser = []
                paramUser.push(username)
                paramUser.push(password)
                db.getUser(paramUser, function (result) {
                    if (result.err) {
                        console.log(result);
                        res.sendError();
                    } else {
                        if (!result) {
                            res.sendInvalidUserCredentials();
                        } else {
                            res.sendOk(result[0]);
                        }
                    }
                })
            }
        } catch (error) {
            console.log({
                event: `Error`,
                message: `Error login`,
                err: error
            })
            res.sendError();
        }
    });

    app.post('/cloud-ace/registration', (req, res) => {
        try {
            let {
                username,
                password,
                full_name,
                gender
            } = req.body
            let paramUser = []
            paramUser.push(username)
            paramUser.push(password)
            paramUser.push(full_name)
            paramUser.push(gender)
            db.saveUser(paramUser, function (result) {
                try {
                    if (result === true) {
                        console.log({
                            event: `Save user`,
                            message: `success save user`
                        })
                        res.sendOk('success add user with username = ' +username);
                    } else {
                        console.log({
                            event: `Error`,
                            message: `Error save user`
                        })
                        res.send({
                            code: rc.codes['500'].rc,
                            message: rc.i18n('500').rm
                        });
                    }
                } catch (err) {
                    console.log({
                        event: `Error`,
                        message: `Error save user`,
                        err : err
                    })
                    res.sendError();
                }
            })
        } catch (error) {
            console.log({
                event: `Error`,
                message: `Error add user`,
                err: error
            })
            res.sendError();
        }
    });

    app.get('/cloud-ace/list-user', (req, res) => {
        try {
            db.getAllUser(function (result) {
                if (result.err) {
                    console.log(result);
                    res.sendError();
                } else {
                    res.sendOk(result);
                }
            })
        } catch (error) {
            console.log({
                event: `Error`,
                message: `Error add user`,
                err: error
            })
            res.sendError();
        }
    });
}

function checkForValue(data) {
    if (data !== null && data !== '') {
        return false
    }
    return true;
}
module.exports = api;