// global["GoogleKey"] = "AIzaSyDMgwXi6D38isibUfShc9C2mJyaHZZ2LpE";
// global["GoogleclientId"] = "529279279497-hdm2ul03erq4kitk7qlqbf41h6pl8f7p.apps.googleusercontent.com";
// global["GoogleclientSecret"] = "nNZiqXW5U2364QI9--sVIR8B";
global["GoogleKey"] = "AIzaSyDMgwXi6D38isibUfShc9C2mJyaHZZ2LpE";
global["GoogleclientId"] = "1066475903870-n5femohfcbjmq2u08quj3pddhjl016pi.apps.googleusercontent.com";
global["GoogleclientSecret"] = "euJR62epvEOzqSkI_mEIKavS";


// passport.use(new GoogleStrategy({
//         clientId: GoogleclientId,
//         clientSecret: GoogleclientSecret,
//         profileFields: ['id', 'emails', 'name','displayName'],
//         callbackURL: global["env"].realHost + "/api/user/loginGoogle",
//         accessType: "offline"
//     },
//     function (accessToken, refreshToken, profile, cb) {
//         profile.AccessToken = accessToken;
//         profile.RefreshToken = refreshToken;
//         return cb(profile);
//     }
// ));
passport.use(new GoogleStrategy({
        clientId: GoogleclientId,
        clientSecret: GoogleclientSecret,
        profileFields: ['id', 'emails', 'name','displayName'],
        callbackURL: global["env"].realHost + "/api/user/loginGoogle",
        accessType: "offline"
    },
    function (accessToken, refreshToken, profile, cb) {
        profile.googleAccessToken = accessToken;
        profile.googleRefreshToken = refreshToken;
        return cb(profile);
    }
));