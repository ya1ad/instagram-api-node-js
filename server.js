const express = require('express');
const baseUrl = 'http://localhost:3000'
var app = express()
var api = require('instagram-node').instagram()
api.use({
    client_id:'98391824cdde42618742176f99ad7d47',
    client_secret:'47c7052859f14159959b0570a07a920d'
})
var redirect_uri = baseUrl + '/handleauth'
/**
 * Log
 */
app.use((req,res,next) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    next();
})

// This is where you would initially send users to authorize
app.get('/authorize_user',(req, res) => {
    res.redirect(
        api.get_authorization_url(redirect_uri, {
             scope: ['likes'],
             state: 'a state' 
        })
      );
  });
  
  // This is your redirect URI
  app.get('/handleauth', function(req, res) {
    api.authorize_user(req.query.code, redirect_uri, (err, result) => {
      if (err) {
        console.log(err.body);
        res.send("Didn't work");
      }
      res.send(`Your access_token is ${result.access_token}`);
    });
  });


app.get('/', function(req, res){
    res.send('Server is working well ...');
})

var port = 3000

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})