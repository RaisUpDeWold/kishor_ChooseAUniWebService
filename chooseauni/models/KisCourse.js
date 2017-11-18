'use strict';

const mongoose = require('mongoose');

const KisCourseSchema = new mongoose.Schema({
    uniName: { type: String, required: true },
    courseName: { type: String, required: true },
    courseCode: { type: String, required: true },
    courseQualification: { type: String, required: true },
    courseDuration: { type: String, required: true },
    courseStudyMode: { type: String, required: true },
    courseTypicalOffer: { type: String, required: true },
    courseStudyAbroad: { type: String, required: true },
    courseSandwich: { type: String, required: true },
    uniNationalRanking: { type: String, required: true },
    uniWorldRanking: { type: String, required: true },
    uniGroup: { type: String, required: true },
    courseExams: { type: String, required: true },
    courseCoursework: { type: String, required: true },
    courseContact: { type: String, required: true },
    courseSuccessScore: { type: String, required: true },
    courseSatisfactionLevel: { type: String, required: true },
    courseEntryStandardsLevel: { type: String, required: true },
    courseCauRating: { type: String, required: true }
}, {
    versionKey: false
});

const KisCourse = mongoose.model('kiscourse', KisCourseSchema);

module.exports = KisCourse;