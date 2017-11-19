const KisCourse = require('../models/KisCourse');

// Get data per page
function getAllByPage(req, res, next) {
    KisCourse.find({}).limit(50).then(courses => {
        res.send(courses);
    }).catch (e => {
        res.status(503).send(e);
    });
}

module.exports = {
    getAllByPage: getAllByPage
};