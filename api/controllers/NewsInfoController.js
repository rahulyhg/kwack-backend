module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {

       search1: function (req, res) {
    console.log("inside newsinfo ctrl")
        if (req.body) {
            console.log("inside if")
            NewsInfo.search1(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

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


    /**
     * for Get all news by Fillter    
     */

    IsPollKwackIf: function (req, res) {
        if (req.body) {
            NewsInfo.IsPollKwackIf(req.body.startDate, req.body.endDate, req.body.interest, req.body.userId, req.body.polls, req.body.kwacks,req.body,res.callback);
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
     * for Get all news By serching in searchbox
     */
    globalSearchForNews: function (req, res) {
        var searchResult = {};
        async.parallel({
            //this is for finding news by title
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
            //this is for finding news by Description
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
            NewsInfo.getTrendingNews(req.body.userId,res.callback);
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
     * for Get
     */
    getAllNewsJustNow: function (req, res) {
        if (req.body) {
            NewsInfo.getAllNewsJustNow(req.body,req.body.userId, res.callback);
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
    getNewsByInterestWithoutOneNews: function (req, res) {
        if (req.body) {
            NewsInfo.getNewsByInterestWithoutOneNews(req.body,req.body.newsId,req.body.userId, res.callback);
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
            NewsInfo.getNewsByInterest(req.body,req.body.userId, res.callback);
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
     * for Get Explore News
     */
    getExploreNews: function (req, res) {
        if (req.body) {
            NewsInfo.getExploreNews(req.body,req.body.userId, res.callback);
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
     * for Get Social News
     */
    getSocialNews: function (req, res) {
        if (req.body) {
            NewsInfo.getSocialNews(req.body,req.body.userId, res.callback);
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
            NewsInfo.getAllNews1(req.body,req.body.userId, res.callback);
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
            NewsInfo.getOneNews(req.body.newsId,req.body.userId,res.callback);
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
     * This API gets news from newsapi & stores it in database
     */
   

};
module.exports = _.assign(module.exports, controller);