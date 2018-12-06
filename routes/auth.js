const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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

        User.findOne({
                //checks database to see if email is a match
                email: req.body.email
            })
            .exec()
            .then(user => {
                //decrypts password in database and compares password user submit to find match 
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        //if the email or password dose't match throw error 
                        return res.status(401).json({
                            failed: 'Unauthorized Acess'
                        });
                    }
                    if (result) {
                        //if password and email exist in database create a jwt token
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
                    }



                });
            }).catch(error => {
                //handles error on server side
                res.status(500).json({
                    error: "hitting catch"
                });
                console.log('this is an error:', error)
            });


    })
}