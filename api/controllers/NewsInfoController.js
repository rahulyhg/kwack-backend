module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {

//  demo: function (req, res) {
//         if (req.body) {
//             NewsInfo.demo(req.body.startDate,req.body.endDate,req.body.interest,req.body.kwack,req.body.poll,res.callback);
//         } else {
//             res.json({
//                 value: false,
//                 data: {
//                     message: "Invalid Request"
//                 }
//             })
//         }
//     },

 IsPollKwackIf: function (req, res) {
        if (req.body) {
            NewsInfo.IsPollKwackIf(req.body.startDate,req.body.endDate,req.body.interest,req.body.userId,req.body.poll,req.body.kwack,res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },


           /**
     * for Get all news by search
     */
        globalSearchForNews: function (req, res) {
        var searchResult = {};
        async.parallel({
             NewsInfoByTitle: function (cb) {
                NewsInfo.searchNewsByTitle(req.body, function (error, data) {
                    if (error || data == undefined) {
                        cb(error, null);
                    } else {
                        searchResult.NewsInfo = data;
                        cb();
                    }
                })
            },
            NewsInfoByDesc: function (cb) {
                NewsInfo.searchNewsByDesc(req.body, function (error, data) {
                    if (error || data == undefined) {
                        cb(error, null);
                    } else {
                        searchResult.newsInfoDesc = data;
                        cb();
                    }
                })
            },
         
        }, function (error) {
            if (error) {
                res.callback(error, null);
            } else {
                res.callback(null, searchResult);
            }
        })
    },
               /**
     * for Get all Trending News
     */
 getTrendingNews: function (req, res) {
        if (req.body) {
            NewsInfo.getTrendingNews(res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
              /**
     * for Get all news
     */
 getAllNews: function (req, res) {
        if (req.body) {
            NewsInfo.getAllNews(res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    }, 
                  /**
     * for Get Nes By Interest
     */
 getNewsByInterest: function (req, res) {
        if (req.body) {
            NewsInfo.getNewsByInterest(req.body,res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
                /**
     * for Get all Just Now news
     */
 getAllNewsJustNow: function (req, res) {
        if (req.body) {
            NewsInfo.getAllNewsJustNow(req.body,res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
             /**
     * for Get all news
     */
 getAllNews1: function (req, res) {
        if (req.body) {
            NewsInfo.getAllNews1(req.body,res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
               /**
     * for Get one news by NewsId
     */
 getOneNews: function (req, res) {
        if (req.body) {
            NewsInfo.getOneNews(req.body.newsId,res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    }, 
    
};
module.exports = _.assign(module.exports, controller);