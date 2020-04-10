//Load the environment variables
require('dotenv').config()

// Require needed modules
let express = require('express')
let fetch = require('node-fetch')

//Declare new express app
let app = express()

//set template language to ejs
app.set('view engine', 'ejs')

//Declare routes
app.get('/', (req, res) => {
    res.render('Home')
})

app.get('/search', (req, res) => {
    console.log(req.query.query, process.env.OMDB_API_KEY)
    let url = `http://www.omdbapi.com/?s=${req.query.query}&apikey=${process.env.OMDB_API_KEY}`
    console.log(url)
    //grab the url from the input
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        res.render('results', { results: data.Search, query: req.query.query})
    })
    .catch(ERR => {
        console.log('an error!~', err)
    })
})

app.get('/results', (req, res) => {
    res.send('results page')
})

//Pick a port for it to listen on
app.listen(3000, () => {
    console.log('Ready to rock and roll!🙌')
})