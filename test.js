/*
sudo gem install oauth
oauth \
  --verbose \
   --query-string \
   --consumer-key 49831ee0f671106fc08da4aaea42dcd0 \
   --consumer-secret 5a9277172226a8bb9b5bb7df29f3ee37 \
   --access-token-url http://172.17.0.6/oauth/token \
   --authorize-url http://172.17.0.6/admin/oauth_authorize \
   --request-token-url http://172.17.0.6/oauth/initiate \
   authorize

// user--authorize-url http://172.17.0.6/oauth/authorize \




*/

//getT = require('./getToken')

var myCon = {
      consumer: {
        key: '49831ee0f671106fc08da4aaea42dcd0',
        secret: '5a9277172226a8bb9b5bb7df29f3ee37'
      },
      token: null, // If you already got a token,
      secret: null, // The secret for the supplyed token
      url: 'http://172.17.0.6/oauth/initiate',
      storeId: 1
  };

var m = require('./')(myCon);
var state;

m.getAuthToken
  .then(function(AuthToken) {
    state = AuthToken;
    var authorize = myCon.url.split('/oauth')[0]+'/admin/oauth_authorize?oauth_token='+state.oauth_token+'&oauth_token_secret='+state.oauth_token_secret;
    console.log(authorize);
    // call http://172.17.0.6/index.php/admin/oauth_authorize?oauth_token=6a868303df8130426478718010efda58&oauth_token_secret=24528d35c99867f23f7e8622024d97df
    // call confirm url http://172.17.0.6/index.php/admin/oauth_authorize/confirm?oauth_token=98491760b5428801adab86889f91dd80
    // get https://bb025a8f.ngrok.io/?oauth_token=6a868303df8130426478718010efda58&oauth_verifier=38cdf06d12bf4f427d3eb199a5da79ec
    // http://172.17.0.6/index.php/admin/oauth_authorize/confirm/?oauth_token=be8b598d514f0308b8f90459fd184cd4
    // call http://172.17.0.6/oauth/token?oauth_verifier=04cec6e1d74c428ba040a93a82e67a5b&oauth_token=be50b10bab8908e43fab56f507f8e060&oauth_token_secret=45151498a421c117d17af4262089a026&consumer_key=49831ee0f671106fc08da4aaea42dcd0&consumer_secret=5a9277172226a8bb9b5bb7df29f3ee37
    //       &consumer_key=49831ee0f671106fc08da4aaea42dcd0&consumer_secret=5a9277172226a8bb9b5bb7df29f3ee37
  }).then(function (){
    console.log(state);
  });
