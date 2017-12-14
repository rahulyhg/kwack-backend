var FACEBOOK_APP_ID = '524845611226910';
var FACEBOOK_APP_SECRET = '9b238c24e9cef9d05840de0aef5c285f';
// var FACEBOOK_APP_ID = '384307402018669';
// var FACEBOOK_APP_SECRET = 'b55fb30a00da3ee0023ee661c4e7096d';
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    profileFields: ['id', 'emails', 'name','displayName'],
    callbackURL: global["env"].realHost + "/api/User/loginFacebook" 
  },
//profileFields: ['emails', 'displayName', 'username']
  function(accessToken, refreshToken, profile, cb) {
  
    profile.AccessToken = accessToken;
    profile.RefreshToken = refreshToken;
    return cb(profile);
    
  }
));
