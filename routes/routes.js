const express = require('express');
const Article = require('../models/article');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/new', (req, res)=>{
    res.render('articles/new', {article : new Article()});
})


router.get('/edit/:id', async (req, res)=>{
    const article = await Article.findById(req.params.id);

    res.render('articles/edit', {article : article});
})



router.get('/:slug', async (req, res)=>{
    let article = await Article.findOne({slug : req.params.slug});

    // console.log(article);

    if(article === null) res.redirect('/');

    res.render('articles/show', {article : article});
})


router.post('/', async (req, res)=>{
    const article = new Article({
        title : req.body.title,
        description : req.body.description,
        markdown : req.body.markdown
    })

    try{
        artcile = await article.save();
        res.redirect(`/articles/${artcile.slug}`);

    }catch(err){
        console.log(err);
        res.render('articles/new', {article : article});
    }
    

});


router.delete('/:id', async(req, res)=>{
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
})

router.put(':/id', async (req, res)=>{
    const article = new Article({
        title : req.body.title,
        description : req.body.description,
        markdown : req.body.markdown
    })

    try{
        artcile = await article.save();
        res.redirect(`/articles/${artcile.slug}`);

    }catch(err){
        console.log(err);
        res.render('articles/new', {article : article});
    }
})


module.exports = router;