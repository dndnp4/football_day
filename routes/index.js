var express = require('express');
var router = express.Router();
var db = require('./db')

/* GET home page. */
router.get('/main', function (req, res, next) {
  res.render('main')
})

//step1
router.get('/step1', function (req, res, next) {
  res.render('step1')
})
router.post('/step1', function (req, res, next) {
  res.render('step1')
})

//step2
router.get('/step2', function (req, res, next) {
  var a = req.query.team_name
  var b = req.query.isTeam
  console.log(b)
  res.render('step2', { team_name: a, isTeam: b })
})
router.post('/step2', function (req, res, next) {
  var a = req.body.team_name
  var b = req.body.isTeam

  db.insertMember(req.body, b)
  res.render('main')
})

//matching_board
router.get('/matching', function (req, res, next) {
  db.selectAllMatching(function (err, data) {
    res.render('matching', { list: data })
  })
})
router.get('/matching_write', function (req, res, next) {
  res.render('matching_write')
})
router.post('/matching_write', function (req, res, next) {
  db.insertMatching(req.body)
  res.redirect('/matching')
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
      db.selectMatchingByDate(value, value2, value3, function(err, result){
        res.json(result)
      })
      break;

    case 'time':
      
      db.selectMatchingByTime(value, value2, function(err, result){
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
    res.render('get', { list: list })
  })
})
router.get('/modify', function (req, res, next) {
  var no = req.query.no

  db.selectGetMatching(no, function (err, result) {
    res.render('modify', { list: result })
  })
})
router.post('/modify', function (req, res, next) {
  db.updateMatching(req.body)
  res.redirect('/get?no=' + req.body.no)
})
router.get('/delete', function (req, res, next) {
  db.deleteMatching(req.query)
  res.redirect('/matching')
})

//팀이름 유효성검사
router.post("/isVaildTeam", function (req, res, next) {
  var a = req.body.team_name
  db.isVaildTeam(a, function (err, result) {
    //console.log(err,result)
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
