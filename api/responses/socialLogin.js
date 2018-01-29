// module.exports = function (profile) {
//     var req = this.req;
//     var res = this.res;
//     var sails = req._sails;
//     if (_.isEmpty(profile)) {
//         res.callback("Error fetching profile in Social Login", profile);
//         // res.serverError();
//     } else {
//         if (req.session.returnUrl) {
//             User.existsSocial(profile, function (err, data) {
//                 if (err || !data) {
//                     res.callback(err, data);
//                 } else {
//                     // if (data.accessLevel != "Admin") {
//                     //     data.accessToken[0] = "AccessNotAvailable";
//                     // }
//                     res.redirect(req.session.returnUrl + "/" + data.accessToken[0]);
//                     req.session.destroy(function () {});
//                 }
//             });
//         } else {
//             User.existsSocial(profile, res.callback);
//         }
//     }
// };


module.exports = function (profile) {
    var req = this.req;
    var res = this.res;
    var sails = req._sails;
    if (_.isEmpty(profile)) {
        console.log("My Profile inside if cond1111111111111111111111",profile);
    } else {
        console.log("My profile inside else cond22222222222222222222",profile);
        
//for returnUrl//
if(req.session.returnUrl=="http://localhost:8100/#!/login")
{
    console.log("inside if%%%%%%%%%%%")
req.session.returnUrl="http://localhost:8100/#/parampage?name="+profile.displayName+"&email="+profile.emails[0].value;

    console.log("res in returnurl",req.session.returnUrl);
}
else if(req.session.returnUrl=="")
{

req.session.returnUrl=""+profile.displayName+"&email="+profile.emails[0].value;

console.log("res in returnurl",req.session.returnUrl);
}
//for returnUrl end//

        console.log("req.session.returnUrl", req.session.returnUrl)
        if (req.session.returnUrl) {
            console.log(profile);
            User.existsSocial(profile, function (err, data) {
                if (err || !data) {
                    res.callback(err, data);
                } else {
                    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",req.session.returnUrl + "/" + data.accessToken[0]);
                    res.redirect(req.session.returnUrl);
                    req.session.destroy(function () {});
                }
            });
        } else {
            User.existsSocial(profile, res.callback);
        }
    }
};