const Animeshows = require('../models/anime-data')

module.exports = (app) => {


    app.get('/', (req, res) => {
        const currentUser = req.user;
        //might not be able to use req.body because im using a get request

        //This route will render the home page 
        res.render('index.ejs', {
            currentUser
        })
    })

    app.get('/docs', (req, res) => {
        //this route will send users to the documentation page 
        res.redirect('https://keyology.github.io/keyology.notes.github.io/#/')
    })

    app.get('/about', (req, res) => {
        //this route will render the about page
    })

    app.get('/search-page', (req, res) => {
        res.render('search')
    })

    app.post('/search/:animename', (req, res) => {
        //this route will query db for anime
        let newBody = req.body;
        console.log('this is the value of req.body.search', newBody.search)


        Animeshows.find({
            name: req.body.search


        }, (err, anime) => {
            if (err) {
                res.json({
                    error: err
                })
            } else {
                res.json(anime)
                console.log(anime)

            }
        })


    })



}

//How to include  a nested route in this project