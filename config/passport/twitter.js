// var TWITTER_CONSUMER_KEY = '60yPL9shMP2Gdc3TaAoSujVZE';
// var TWITTER_CONSUMER_SECRET = 'i2zstBQvzf19frCSctkZYFLSoDlEbzV8Hx7bkEGnqvU9NrCKwS';
var TWITTER_CONSUMER_KEY = 'EmOqfn53SPh2An0jzt1vRTqmf';
var TWITTER_CONSUMER_SECRET = 'tf7QsX2J4qgRUpRn9T4O61D4pmkTEKE4SEs6NO8LbhHDaSASGH';

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    //email: true,
    callbackURL: global["env"].realHost + "/api/User/loginTwitter" ,
    userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true"
  },
  function(token, tokenSecret, profile, cb) {
    profile.AccessToken = token;
    profile.RefreshToken = tokenSecret;
    return cb(profile);
  }
));