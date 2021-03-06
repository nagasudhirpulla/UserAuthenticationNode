var bcrypt = require('bcryptjs');
var db = require('../../config/db');
var SQLHelper = require('../helpers/sqlHelper');

exports.create = function (userName, password, done) {
    var values = [userName, password];

    db.get().query('INSERT INTO users (username, password) VALUES(?, ?)', values, function (err, result) {
        if (err) return done(err);
        //console.log("created user with name " + userName + " with ID " + result.insertId);
        done(null, result.insertId);
    })
};

exports.get = function (id, done) {
    var values = [id];

    db.get().query('SELECT * FROM users WHERE id = ?', values, function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    })
};

exports.getAll = function (done) {
    db.get().query(SQLHelper.createSQLGetString('users', ['username', 'password'], [], []), function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    })
};

exports.getByName = function (name, done) {
    var values = [name];

    db.get().query('SELECT * FROM users WHERE username = ?', values, function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    })
};

exports.deleteByName = function (name, done) {
    var values = [name];

    db.get().query('DELETE FROM users WHERE username = ?', values, function (err, result) {
        if (err) return done(err);
        //console.log("Number of rows deleted is " + result.affectedRows);
        done(null, result);
    })
};

exports.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
};

exports.validPassword = function (password, encryptedPassword) {
    return bcrypt.compareSync(password, encryptedPassword);
};