// var TWITTER_CONSUMER_KEY = '60yPL9shMP2Gdc3TaAoSujVZE';
// var TWITTER_CONSUMER_SECRET = 'i2zstBQvzf19frCSctkZYFLSoDlEbzV8Hx7bkEGnqvU9NrCKwS';
var TWITTER_CONSUMER_KEY = 'DlRP2BEFp61qcfuI737cHcM6Z';
var TWITTER_CONSUMER_SECRET = 'lXDZgJcU3P8mPokP8TCOvwE6r4U8tZvCZ1Yz9LvhaPLhN1EgSF';

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