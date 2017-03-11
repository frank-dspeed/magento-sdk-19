/*
  Gets a Application token from magento

 */
//TODO: use the token or make a function that returns it maybe this should only return a promis that sets and gets reused
 const crypto = require('crypto');
 const Request = require('request');
 const OAuth   = require('oauth-1.0a');


 // Servers
 const ngrok = require('ngrok');
 const app = require('express')();
 const server = require('http').createServer(app).listen();
 const debug = require('debug')('magento::1.9::');
  // Lets listen on Random port localhost
 app.set('port', server.address().port);



  // Lets save our new token that we get
 app.use(function oauthServer(req,res,next){
      // ?oauth_token=6a868303df8130426478718010efda58&oauth_verifier=38cdf06d12bf4f427d3eb199a5da79ec
   if (!req.query.oauth_token) {
     return next();
   }
   console.log(req.query.oauth_token, req.query.oauth_verifier);

   app.set('oauth_token', req.query['oauth_token']);
   app.set('oauth_verifier', req.query['oauth_verifier']);
   console.log(req.headers.referer.split('/admin')[0]+'/oauth/token?oauth_token='+app.get('oauth_token')+'&oauth_verifier='+app.get('oauth_verifier')+'&oauth_token_secret='+app.get('oauth_token_secret'));
   res.json({ 'status': 'OK', 'query': req.query, 'headers': req.headers, call: app.get('oauth_token_secret')});
 });

 var token = {};
 var callBackUrl;


 var startOAuthCallbackServerPromise = new Promise(
    function(resolve, reject) {
      // nur ein Beispiel, wie Asynchronität erstellt werden kann
      // Lets Create a Valid Templ Call Back Url For me
      // ngrok.connect(function (err, url) {}); // https://757c1652.ngrok.io -> http://localhost:server.address().port
      ngrok.connect(server.address().port, function (err, url) {
        debug({ error: err, url: url, target: 'localhost:'+ app.get('port')});
        resolve({ error: err, url: url, target: 'localhost:'+ app.get('port')});
      });
    }
  );



 const getTokenPromis = function (connection) {

   var oauth = OAuth({
     consumer: connection.consumer,
     signature_method: 'HMAC-SHA1',
     hash_function: function hashFunctionSha1(baseString, key) {
       return crypto.createHmac('sha1', key).update(baseString).digest('base64');
     }
   });

   var getAuthToken = function(callBackUrl) {
     return new Promise(
      function (resolve, reject) {
        //console.log(callBackUrl);

        Request({
          url: connection.url,
          method: 'POST',
          form: oauth.authorize({
            url: connection.url,
            method: 'POST',
            data: {
              oauth_callback: callBackUrl
            }
          }, token)
        }, function(err, res, body) {
            //expect(body).to.be.a('string');
          body = oauth.deParam(body);
            // expect(body).to.have.property('oauth_callback_confirmed', 'true');
            // expect(body).to.have.property('oauth_token');
            // expect(body).to.have.property('oauth_token_secret');
            // debug(JSON.stringify(body));

          app.set('oauth_token', body.oauth_token);
          app.set('oauth_token_secret', body.oauth_token_secret);
          app.set('oauth_callback_confirmed', body.oauth_callback_confirmed);

          resolve(body);
        });
      }
    );

   };


   return startOAuthCallbackServerPromise.then(function(oauthServer) {
     callBackUrl = oauthServer.url;
     return getAuthToken(callBackUrl);
   });


 };


 module.exports = getTokenPromis;

  //      this.opt.token= connection.token;
  //      this.opt.secret= connection.tokenSecret;
