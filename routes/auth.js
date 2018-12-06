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
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: err

                });
            } else {
                const user = new User({
                    //might throw error 
                    email: req.body.email,
                    password: hash
                });
                user.save().then(user => {
                    let token = jwt.sign({
                        id: user.Account_id
                    }, process.env.SECRET, {
                        expiresIn: "60 days"
                    });
                    res.cookie('nToken', token, {
                        maxAge: 900000,
                        httpOnly: true
                    });
                    console.log(req.cookies);
                    res.redirect('/')
                    console.log(user);

                }).catch(error => {
                    res.status(500).json({
                        error: err
                    });
                });
            }

        });



    });



    app.post('/login', (req, res) => {
        // this route will login users

    })
}