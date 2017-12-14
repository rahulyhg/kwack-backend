// global["GoogleKey"] = "AIzaSyDMgwXi6D38isibUfShc9C2mJyaHZZ2LpE";
// global["GoogleclientId"] = "529279279497-hdm2ul03erq4kitk7qlqbf41h6pl8f7p.apps.googleusercontent.com";
// global["GoogleclientSecret"] = "nNZiqXW5U2364QI9--sVIR8B";
global["GoogleKey"] = "AIzaSyDMgwXi6D38isibUfShc9C2mJyaHZZ2LpE";
global["GoogleclientId"] = "437851181506-0oq5avdl2i51fj48t38ddkj1fa9hub9o.apps.googleusercontent.com";
global["GoogleclientSecret"] = "ATREC-XhmHPK7dpTNJATRP8Q";


passport.use(new GoogleStrategy({
        clientId: GoogleclientId,
        clientSecret: GoogleclientSecret,
        profileFields: ['id', 'emails', 'name','displayName'],
        callbackURL: global["env"].realHost + "/api/User/loginGoogle",
        accessType: "offline"
    },
    function (accessToken, refreshToken, profile, cb) {
        profile.AccessToken = accessToken;
        profile.RefreshToken = refreshToken;
        return cb(profile);
    }
));