module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
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