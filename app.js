const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
   User.findById('5d8ba542f768b0413ecb90c4')
      .then(user => {
        req.user = user;
          //console.log(user)
        next();
      })
     .catch(err => console.log(err));
  
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
mongoose.connect('mongodb+srv://akshay:python123@cluster0-5k6tz.mongodb.net/shop?retryWrites=true&w=majority')
  .then( result => {
    User.findOne().then(user => {
      if(!user) {
        const user = new User({
          name: 'Akshay',
          email: 'akshay@test.com',
          cart: {
            items: []
          }
        })
        user.save();
      }
    })    
    app.listen(3000);
  })
  .catch(err => {
    console.log(err)
  })