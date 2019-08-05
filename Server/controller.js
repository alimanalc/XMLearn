const User = require('../Server/model');
var mongoose = require('mongoose');

exports.getUser = function (req, res) {
    User.where({
        username: req.body.username
    }).findOne(function (err, user) {
        if (user) {
            if (user.password == req.body.password) {
                res.send(user);
            } else {
                res.status(400).send({ 'message': 'no coincide contrasena' });
            }
        } else {
            res.status(400).send({ 'message': 'no existe ese usuario' });
        }
    });
}

exports.getUsers = function (req, res) {
    User.find({}, function (err, user) {
        if (err) {
            res.send(err);
        }
        res.send(user);
    });
}

exports.createUser = function (req, res) {
    User.where({
        username: req.body.username
    }).findOne(function (err, user) {
        if (user) {
            res.status(400).send({ 'message': 'usuario ya cogido' });
        } else {
            let user = new User({
                _id: new mongoose.mongo.ObjectId(),
                username: req.body.username,
                password: req.body.password
            });

            user.save(function (err, userCreate) {
                if (err) {
                    res.send(err);
                }
                res.status(200).send(userCreate);
            });
        }
    });
}


exports.createRequest = function (req, res) {

    User.findById(req.body._id, function (err, user) {
        if (err) {
            res.send(err);
        } else {
            var attributes = JSON.parse(req.body.attributes);
            var request = {
                name: req.body.name,
                url: req.body.url,
                attributes: attributes
            };

            user.requests.push(request);

            user.save(function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ 'user': user, 'request': request });
                }
            });
        }
    });

}

exports.allRequestUser = function (req, res) {
    User.findById(req.body._id, function (err, user) {
        if (err) {
            res.send(err);
        } else {
            res.send({ 'requests': user.requests });
        }
    });
}