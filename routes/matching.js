var express = require('express');
var router = express.Router();
var db = require('./db')

//matching_board
router.get('/', function (req, res, next) {
    db.selectAllMatching(function (err, data) {
        res.render('matching/list', { list: data })
    })
})

router.post('/search', function (req, res, next) {
    var key = req.body.key
    var value = req.body.value
    var value2 = req.body.value2
    var value3 = req.body.value3
    switch (key) {
        case 'writer':
            db.selectMatchingByWriter(value, function (err, result) {
                res.json(result)
            })
            break;

        case 'title':
            db.selectMatchingByTitle(value, function (err, result) {
                res.json(result)
            })
            break;

        case 'place':
            db.selectMatchingByPlace(value, function (err, result) {
                res.json(result)
            })
            break;

        case 'date':
            db.selectMatchingByDate(value, value2, value3, function (err, result) {
                res.json(result)
            })
            break;

        case 'time':

            db.selectMatchingByTime(value, value2, function (err, result) {
                res.json(result)
            })
            break;

        case 'person':
            db.selectMatchingByPerson(value, function (err, result) {
                res.json(result)
            })
            break;

        case 'age':
            db.selectMatchingByAge(value, function (err, result) {
                res.json(result)
            })
            break;

        case 'level':
            db.selectMatchingByLevel(value, function (err, result) {
                res.json(result)
            })
            break;
    }

})
//board_one
router.get('/get', function (req, res, next) {
    var a = req.query.no;
    db.selectGetMatching(a, function (err, list) {
        res.render('matching/get', { list: list })
    })
})
router.get('/modify', function (req, res, next) {
    var no = req.query.no

    db.selectGetMatching(no, function (err, result) {
        res.render('matching/modify', { list: result })
    })
})
router.post('/modify', function (req, res, next) {
    db.updateMatching(req.body)
    res.redirect('/matching/get?no=' + req.body.no)
})
router.get('/delete', function (req, res, next) {
    db.deleteMatching(req.query)
    res.redirect('/matching')
})
router.get('/write', function (req, res, next) {
    res.render('matching/write')
})
router.post('/write', function (req, res, next) {
    db.insertMatching(req.body)
    res.redirect('/matching')
})

//code for AJAX
router.post("/isVaildTeam", function (req, res, next) {
    var a = req.body.team_name
    db.isVaildTeam(a, function (err, result) {
        res.json(result);
    })
})
router.post('/isVaildId', function (req, res, next) {
    var a = req.body.id
    db.isVaildId(a, function (err, result) {
        res.json(result)
    })
})

module.exports = router;
