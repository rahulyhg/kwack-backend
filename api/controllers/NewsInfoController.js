module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    // globalSearch: function (req, res) {
    //     var searchResult = {};
    //     async.parallel({
    //         getNewsInfo: function (cb) {
    //             NewsInfo.searchNews(req.body, function (error, data) {
    //                 if (error || data == undefined) {
    //                     cb(error, null);
    //                 } else {
    //                     searchResult.NewsInfo = data;
    //                     cb();
    //                 }
    //             })
    //         }
    //     }, function (error) {
    //         if (error) {
    //             res.callback(error, null);
    //         } else {
    //             res.callback(null, searchResult);
    //         }
    //     })
    // },
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
                console.log("CompanyController >>> gobalSearch >>> finalError >>> ", error);
                res.callback(error, null);
            } else {
                res.callback(null, searchResult);
            }
        })
    },
               /**
     * for Get all news
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
     console.log("inside ctrl")
        if (req.body) {
            console.log("getNewsByInterest",req.body)
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
     console.log("inside ctrl")
        if (req.body) {
            console.log("getAllNewsJustNow",req.body)
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
     * for Get one news
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
              /**
     * for save vote
     */
 addVote: function (req, res) {
        if (req.body) {
            NewsInfo.addVote(req.body.pollname,req.body.newsId, res.callback);
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