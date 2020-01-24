const express = require('express');

const router = express.Router();

const harsh = require('../models/db').modelClass;

const multer = require('multer');
const path = require('path');

router.get('/list', (req,res) => {

   
    harsh.find((err,docs) => {

        if(!err){
            console.log("DATA FIND HO GAYA ");

            res.render('list.ejs',{
                    data : docs

            })
        }
        else {
            console.log('error aagaya bro not found data');
        }
    })
})



router.get('/', (req,res) => {

   
    harsh.find((err,docs) => {

        if(!err){
            console.log("DATA FIND HO GAYA ");

            res.render('index.ejs',{
                    data : docs

            })
        }
        else {
            console.log('error aagaya bro not found data');
        }
    })
})


router.get('/admin', (req,res) => {

    res.render('admin.ejs');
})


router.get('/addproject', (req,res) => {

    res.render('addproject.ejs',{data:' '});
})


router.post('/admin',(req,res) => {
    const email = req.body.email
    const pass = req.body.password
    
    if(email =='arya' && pass == 'hello'){
        res.redirect('addproject')
    }
    else{
        res.redirect('admin')
    }
})


router.get('/deleteRecord/:id',(req,res) => {

    harsh.findByIdAndDelete(req.params.id,(err,docs) => {

        if(!err){
            console.log("Successfully delete ho gaya")
            res.redirect('/list')
        }
    })

})






var Storage = multer.diskStorage({
    destination: "./views/uploads/",
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() +path.extname( file.originalname));
    }
});

var upload = multer({
    storage: Storage
}).single('file'); 

router.post('/addproject',upload,(req,res) => {
   
        var arya = new harsh();
        arya.imagename = req.file.filename;
        arya.link = req.body.link;
        arya.title= req.body.title;
        arya.description = req.body.description;
        arya.githublink = req.body.githublink;
        arya.save((err,docs) => {

            if(!err){
                console.log("badiya bro write hogaya");
                console.log(arya.link)
                console.log(req.body.title)
                console.log(arya.description)
                res.redirect('/');
            }
            else{
                console.log("WRITE NHI HUA BRO" + err)
            }
        })
})






module.exports = router;