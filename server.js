const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const { checkEnvVariable } = require('./utils/helper.util')
require('dotenv').config({ path: './configs/.env' })
const app = express()
const PORT = process.env.PORT

checkEnvVariable('PORT', PORT)

mongoose.connect('mongodb://localhost/blog')

// set up server to render ejs template
app.set('view engine', 'ejs')

// allow form fields to be accessed in req.body object
app.use(express.urlencoded({ extended: false}))

// override the http method of form
app.use(methodOverride('_method'))

// create base route
app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/index', { articles })
})

app.use('/articles', articleRouter)

app.listen(PORT)