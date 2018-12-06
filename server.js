const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 7000;


const checkAuth = (req, res, next) => {
    console.log("Checking authentication");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {

        req.user = null;
        console.log('"checkAuth if statement is running')
    } else {
        console.log('"checkAuth else statement is running')
        const token = req.cookies.nToken;
        const decodedToken = jwt.decode(token, {
            complete: true
        }) || {};
        req.user = decodedToken.payload;
    }

    next();
};



require('./db/anime-api-db')

require('dotenv').config()


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json())
app.use(cookieParser());
app.use(checkAuth);


app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

require('./routes/client.js')(app);
require('./routes/auth.js')(app);



app.listen(port, () => console.log(`listening on port ${port}`))