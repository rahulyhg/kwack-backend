// global["GoogleKey"] = "AIzaSyDMgwXi6D38isibUfShc9C2mJyaHZZ2LpE";
// global["GoogleclientId"] = "1066475903870-n5femohfcbjmq2u08quj3pddhjl016pi.apps.googleusercontent.com";
// global["GoogleclientSecret"] = "euJR62epvEOzqSkI_mEIKavS";


global["GoogleKey"] = "AIzaSyDMgwXi6D38isibUfShc9C2mJyaHZZ2LpE";
global["GoogleclientId"] = "565505397392-6vg7t9r0nduomp1mkih5jpc0nm3hdecl.apps.googleusercontent.com";
global["GoogleclientSecret"] = "lkiA8qSBs5aYReT-B5gd7MBP";

passport.use(new GoogleStrategy({
        clientId: GoogleclientId,
        clientSecret: GoogleclientSecret,
        callbackURL: global["env"].realHost + "/api/User/loginGoogle",
        accessType: "offline"
    },
    function (accessToken, refreshToken, profile, cb) {
        profile.AccessToken = accessToken;
        profile.RefreshToken = refreshToken;
        return cb(profile);
    }
));