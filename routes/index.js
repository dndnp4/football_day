var express = require('express');
var router = express.Router();
var db = require('./db')

/* GET home page. */
router.get('/main', function (req, res, next) {
  res.render('main')
})

//step1
router.get('/step1', function (req, res, next) {
  res.render('signup/step1')
})
router.post('/step1', function (req, res, next) {
  res.render('signup/step1')
})

//step2
router.get('/step2', function (req, res, next) {
  var a = req.query.team_name
  var b = req.query.isTeam
  res.render('signup/step2', { team_name: a, isTeam: b })
})
router.post('/step2', function (req, res, next) {
  var a = req.body.team_name
  var b = req.body.isTeam

  db.insertMember(req.body, b)
  res.render('main')
})

//code for AJAX
//팀이름 유효성검사
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
