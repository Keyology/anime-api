module.exports = (app) => {


    app.get('/', (req, res) => {
        const currentUser = req.user;

        //This route will render the home page 
        res.render('index.ejs', {
            currentUser
        })
    })

    app.get('/docs', (req, res) => {
        //this route will send users to the documentation page 
        res.redirect('https://stackoverflow.com/questions/17755147/displaying-an-image-with-ejs-in-node-js-express')
    })

    app.get('/about', (req, res) => {
        //this route will render the about page
    })

}