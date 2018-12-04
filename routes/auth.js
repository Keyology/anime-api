module.exports = (app) => {

    app.get('/signup', (req, res) => {
        //this route will render the signup page
    })

    app.get('/login', (req, res) => {
        // this route will render the the login page 
    })

    app.post('/signup', (req, res) => {
        //this route will signup user
    })

    app.post('/login', (req, res) => {
        // this route will login users
    })
}