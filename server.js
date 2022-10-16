const express = require('express');
const mongoose = require('mongoose');
const Articles = require('./models/articleSchema');
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');
const app = express();

mongoose.connect('mongodb://localhost/blog')


app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use('/articles', articleRouter);

app.get('/', async (req, res) => {
  const articles = await Articles.find().sort({createdAt:'desc'}); 
  res.render('articles/index', { text: 'hallo markdwoonny!', articles });
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`)); 