var express = require('express');
var router = express.Router();
var db = require('./db')


//all에 걸리지않는 페이지 리스트 존재하면 참 아니면 거짓
function execption_url(url) {
  var list = new Map()
  list.set('/step1',true)
  list.set('/step2',true)
  list.set('/login',true)
  list.set('/test',true)
  list.set('/test/board',true)
  list.set('/test/user',true)
  list.set('/test/team',true)
  list.set('/isVaildTeam',true)
  list.set('/isVaildId',true)
  if(list.get(url)) return true
  else return false
}

router.all('*', function (req, res, next) {
  console.log('\u001b[33m','user session : ',req.session.user)
  //get으로 넘어온 파라미터가 있을경우 예외리스트에서 검색을 못함.. url에서 파라미터를 지운 string을 만듬
  var point = req.url.indexOf('?')
  var url = req.url
  if(point > 0)  url = req.url.substring(0,point)
  
  if(!req.session.user && !execption_url(url)){
    res.redirect('/login')
  }else {
    next()
  }
})
/* GET home page. */
router.get('/main', function (req, res, next) {
  res.render('main')
})

//step1
router.get('/step1', function (req, res, next) {
  if(req.session.user) res.redirect('/main')  //세션이 있는데 굳이 가입페이지에 들어갈 필요없다
  else res.render('signup/step1')
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
  res.redirect('/login')
})
router.get('/reconfirm', function (req, res, next) {
  res.render('reconfirm', { uid: req.session.user.id })
})
router.post('/reconfirm', function (req, res, next) {
  var uid = req.body.id
  var upw = req.body.pw

  if (req.session.user.id == uid) {
    db.requestLogin(uid, upw, function (err, result) {
      if (!result[0]) {
        res.render('message', { msg: "incorrect your data", url: '/reconfirm' })
      } else {
        res.redirect('/mypage')
      }
    })
  } else {
    res.redirect('/login')
  }
})
router.get('/mypage', function (req, res, next) {
  db.isVaildId(req.session.user.id, function(err, result){
    res.render('mypage',{list:result[0]})
  })
  
})

router.post('/mypage', function (req, res, next) {
  var id = req.body.id
  var pw = req.body.pw
  var account = req.body.account
  var data = {
    id : id,
    pw : pw,
    account : account
  }
  db.updateMember(data)
  res.redirect('/reconfirm')
})

router.get('/login', function (req, res, next) {
  if (req.session.user) {
    res.render('message', { msg: "already exist your Session", url: '/main' })
  }
  else res.render('login')
})

router.post('/login', function (req, res, next) {
  var a = req.body.id;
  var b = req.body.pw;

  db.requestLogin(a, b, function (err, result) {

    if (!result[0]) {
      res.render('message', { msg: "로그인정보 확인", url: '/login' })
    } else {
      req.session.user = {
        id: a,
        name: result[0].name,
        team_name: result[0].team_name
      }

      res.redirect('/main')
    }
  })

})
router.get('/logout', function (req, res, next) {
  req.session.destroy(function (err) {
    res.redirect('/login')
  })
})
//code for AJAX
//팀이름 유효성검사
router.post("/isVaildTeam", function (req, res, next) {
  var a = req.body.team_name
  console.log(a)
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

//stadium
router.get('/get_area',function(req,res,next){
  db.selectArea(function(err, data){
    res.json(data);
  })  
})
router.get('/get_name',function(req,res,next){
  var area = req.query.area;
  db.selectStadiumName(area, function(err, data){
    res.json(data);
  })  
})
module.exports = router;
