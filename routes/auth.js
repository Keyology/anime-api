const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user')


module.exports = (app) => {

    app.get('/signup', (req, res) => {
        //this route will render the signup page
        res.render('signup.ejs')


    });

    app.get('/login', (req, res) => {
        // this route will render the the login page 
        res.render('login.ejs')
    })

    app.post('/signup', (req, res) => {
        //this route will signup user
        const user = new User(req.body);

        user.save()
            .then(user => {
                let token = jwt.sign({
                    _id: user._id
                }, process.env.SECRET, {
                    expiresIn: "60 days"
                })
                res.cookie('nToken', token, {
                    maxAge: 900000,
                    httpOnly: true
                });
                console.log(req.cookies);
                res.redirect('/');
            })
            .catch(err => {
                console.log(err.message);
                return res.status(400).send({
                    err: err
                });
            });
    });



    app.post('/login', (req, res) => {
        // this route will login users

    })
}