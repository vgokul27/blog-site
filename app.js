const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
require('dotenv').config();

//express app
const app = express();

const port = process.env.PORT;

//connect to mongodb
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI)
    .then((result) => app.listen(port))
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // for parsing form data
app.use(morgan('tiny'));

//mongoose and mongo sandbox routes
app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/single-blog', (req, res) => {
    Blog.findById('68432a7150206f8389ee6034')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/',(req,res) => {
    res.redirect('/blogs');
});

app.get('/about',(req,res) => {
    res.render('about',{ title: 'About' });
});

//blog routes
app.use('/blogs', blogRoutes);

//404 page
app.use((req, res) => {
    // res.status(404).sendFile('./view/404.html', { root: __dirname });
    res.status(404).render('404',{ title: '404'});
});