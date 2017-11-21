const KisCourse = require('../models/KisCourse');
const logger = require('../modules/logger.js');

// Get Data By the Search Parameter
function getSearchResultWithParams(req, res, next) {
    let page = -1, count = -1, sorting = {}, search = "";
    if (req.query) {
        if (req.query.page) page = parseInt(req.query.page, 10);
        if (req.query.count) count = parseInt(req.query.page, 10);
        if (req.query.sorting) sorting = JSON.parse(req.query.sorting);
        if (req.query.search) search = req.query.search;
    }
    count = parseInt(req.query.count, 10);
    var query = null;
    if (search == "") query = KisCourse.find({});
    else {
        var regSearch = new RegExp(search);
        query = KisCourse.find({
            $or: [
                { "uniName": regSearch },
                { "courseQualification": regSearch },
                { "courseDuration": regSearch },
                { "courseStudyMode": regSearch },
                { "courseStudyAbroad": regSearch },
                { "courseSandwich": regSearch },
                { "uniGroup": regSearch }
            ]
        });
    }
    
    query.sort(sorting).limit(count).skip((page - 1) * count).then(courses => {
        res.send(courses);
    }).catch (e => {
        res.status(503).send(e);
    });
}

// Get Data Length By the Search Parameter
function getSearchResultCounts(req, res, next) {
    let search = "";
    if (req.query) {
        if (req.query.search) search = req.query.search;
    }
    var query = null;
    if (search == "") query = KisCourse.find();
    else {
        var regSearch = new RegExp(search);
        query = KisCourse.find({
            $or: [
                { "uniName": regSearch },
                { "courseQualification": regSearch },
                { "courseDuration": regSearch },
                { "courseStudyMode": regSearch },
                { "courseStudyAbroad": regSearch },
                { "courseSandwich": regSearch },
                { "uniGroup": regSearch }
            ]
        });
    }
    
    if (query == null) res.send({total: 0});
    else query.count(function(err, total) { res.send({total: total}); });
}

module.exports = {
    getSearchResultWithParams: getSearchResultWithParams,
    getSearchResultCounts: getSearchResultCounts
};