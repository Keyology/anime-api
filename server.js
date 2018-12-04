const express = require('express');
const app = express();
const port = process.env.port || 3000

require('./db/anime-api-db')

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index.ejs')
})

//Tonight I am going to build out the Front end of the site
//set up docsify for documentation
/*make sure to write good descriptive comments on everything
to make writing the documentation easier.
*/

/* In the front-end there will be a nav bar witch will have a

A Home About Docs , signup and login 
user will have to signup to view docs

Will not be writing documentation tonight just setting it up




*/
app.listen(port, () => console.log(`listening on port ${port}`))