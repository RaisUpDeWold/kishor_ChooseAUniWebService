const KisCourse = require('../models/KisCourse');
const logger = require('../modules/logger.js');

// Get Data By the Search Parameter
function getSearchResultWithParams(req, res, next) {
    let page = -1, count = -1, sorting = {}, search = "", filters = "[]";
    if (req.query) {
        if (req.query.page) page = parseInt(req.query.page, 10);
        if (req.query.count) count = parseInt(req.query.page, 10);
        if (req.query.sorting) sorting = JSON.parse(req.query.sorting);
        if (req.query.search) search = req.query.search;
        if (req.query.filters) filters = req.query.filters;
    }
    count = parseInt(req.query.count, 10);
    var query = null;
    var andSearchQuery = [];
    var searchArr = search.split(" ");
    for (var i = 0; i < searchArr.length; i ++) {
        if (searchArr[i].length < 2) continue;
        if (i == 0 && searchArr[i].length < 3) continue;
        var regSearch = new RegExp(searchArr[i], 'i');
        andSearchQuery.push({
            $or: [
                { "uniName": regSearch },
                { "courseName": regSearch },
                { "courseQualification": regSearch },
                { "courseStudyMode": regSearch },
                { "courseStudyAbroad": regSearch },
                { "courseSandwich": regSearch },
                { "uniGroup": regSearch },
                { "courseSatisfactionLevel": regSearch },
                { "courseEntryStandardsLevel": regSearch }
            ]
        });
    }
    filters = JSON.parse(filters);
    for (var i = 0; i < filters.length; i ++) {
        var key = Object.keys(filters[i])[0];
        var filter = {};
        var regSearch = new RegExp(filters[i][key], 'i');
        filter[key] = regSearch;
        andSearchQuery.push(filter);
    }
    logger.info("SearchAPI AndSearchQuery");
    logger.info(andSearchQuery);
    if (andSearchQuery.length == 0) query = KisCourse.find({});
    else query = KisCourse.find({ $and: andSearchQuery });
    query.sort(sorting).limit(count).skip((page - 1) * count).then(courses => {
        res.send(courses);
    }).catch (e => {
        res.status(503).send(e);
    });
}

// Get Data Length By the Search Parameter
function getSearchResultCounts(req, res, next) {
    let search = "";
    let filters = "[]";
    if (req.query) {
        if (req.query.search) search = req.query.search;
        if (req.query.filters) filters = req.query.filters;
    }
    var query = null;
    if (search == "" && (filters == "" || filters == "[]")) query = KisCourse.find();
    else {
        var andSearchQuery = [];
        var searchArr = search.split(" ");
        for (var i = 0; i < searchArr.length; i ++) {
            if (searchArr[i].length < 2) continue;
            if (i == 0 && searchArr[i].length < 3) continue;
            var regSearch = new RegExp(searchArr[i], 'i');
            andSearchQuery.push({
                $or: [
                    { "uniName": regSearch },
                    { "courseName": regSearch },
                    { "courseQualification": regSearch },
                    { "courseStudyMode": regSearch },
                    { "courseStudyAbroad": regSearch },
                    { "courseSandwich": regSearch },
                    { "uniGroup": regSearch },
                    { "courseSatisfactionLevel": regSearch },
                    { "courseEntryStandardsLevel": regSearch }
                ]
            });
        }
        filters = JSON.parse(filters);
        for (var i = 0; i < filters.length; i ++) {
            var key = Object.keys(filters[i])[0];
            var filter = {};
            var regSearch = new RegExp(filters[i][key], 'i');
            filter[key] = regSearch;
            andSearchQuery.push(filter);
        }
        logger.info("SearchAPICount AndSearchQuery");
        logger.info(andSearchQuery);
        query = KisCourse.find({ $and: andSearchQuery });
    }
    
    if (query == null) res.send({total: 0});
    else query.count(function(err, total) { res.send({total: total}); });
}

module.exports = {
    getSearchResultWithParams: getSearchResultWithParams,
    getSearchResultCounts: getSearchResultCounts
};