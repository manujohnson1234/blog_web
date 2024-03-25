const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Articles = require('./models/article');

const app = express();

mongoose.connect('mongodb://localhost/blog');

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use('/articles', require('./routes/routes'));


app.get('/', async (req, res) =>{
   
    const articles = await Articles.find().sort({createdAt : -1});

    res.render('articles/index', {articles : articles});
})

const PORT = 3000;

app.listen(PORT, ()=> console.log(`server is listening in ${PORT}`));