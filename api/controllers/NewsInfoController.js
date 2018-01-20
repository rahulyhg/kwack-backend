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


    /**
     * for Get all news by Fillter    
     */

    IsPollKwackIf: function (req, res) {
        if (req.body) {
            NewsInfo.IsPollKwackIf(req.body.startDate, req.body.endDate, req.body.interest, req.body.userId, req.body.polls, req.body.kwacks, res.callback);
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
            NewsInfo.getNewsByInterest(req.body, res.callback);
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
            NewsInfo.getExploreNews(req.body, res.callback);
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
            NewsInfo.getSocialNews(req.body, res.callback);
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
            NewsInfo.getAllNews1(req.body, res.callback);
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
            NewsInfo.getOneNews(req.body.newsId, res.callback);
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
    storeNews: function (req, res) {
        request.get({
            url: "https://newsapi.org/v2/top-headlines?sources=google-news-in&apiKey=1e3a77df57424c7e9ae1b65a2a0b696f",
            withCredentials: false,
        }, function (err, response, body) {
            // console.log("err",err)
            //  console.log("responseresponse",response)
            console.log("bodybodybodybodybodybody", response.status)
            if (err) {
                res.callback(err, null);
            } else if (body) {
                try {
                    body = JSON.parse(body);
                } catch (e) {
                    //
                }
                if (body.status.toUpperCase() == 'OK') {
                    console.log("&&&&&&&&&&&&&", body.totalResults);
                    res.callback(null, body.totalResults);
                    _.each(body.articles, function (value, index) {
                        var dataToSave = {}
                        dataToSave.title = value.title,
                            dataToSave.description = value.description
                        dataToSave.url = value.url
                        dataToSave.imageUrl = value.imageUrl
                        NewsInfo.saveData(dataToSave, function (err, created) {
                            if (err) {
                                console.log("Error occurred while storing news: ", err);
                            } else if (_.isEmpty(created)) {
                                console.log("no data created for article no: ", index);
                            } else {
                                console.log("article " + index + " saved successfully");
                            }

                        });
                    });
                }
            }
        });
    }

};
module.exports = _.assign(module.exports, controller);