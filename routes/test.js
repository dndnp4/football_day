var express = require('express');
var router = express.Router();
var db = require('./db')

function makingSQL(DML, table, data) {
    let sql = ''
    sql += DML + ' '
    db.isVaildtTable(table, function (result, err) {
        if (!result[0]) {
            console.log('\u001b[' + 31 + 'm' + 'Failed makingSQL : invaild table name' + '\u001b[0m')
            return null
        }
    })

    switch (DML) {
        case 'select':
            if(data){
                if(data.column){
                    for(var i = 0 ; i < data.column.length; i++){
                        sql += data.column[i]
                        if(data.column[i+1]) sql+=', '
                    }
                }
                sql += ' FROM ' + table
                
                if(data.condition){
                    sql += " WHERE "
                    for(var i = 0 ; i < data.condition.length; i++){
                        sql += data.condition[i].variable + ' ' + data.condition[i].sign + " '" + data.condition[i].value + "'"
                        if(data.condition[i+1]) sql+=' AND '
                    }
                }
            }
            break;
        case 'insert':
            sql += 'INTO ' + table
            if(data){
                if(data.column) {
                    sql += " ("
                    for(var i = 0 ; i < data.column.length; i++){
                        sql += data.column[i]
                        if(data.column[i+1]) sql+=', ' 
                    }
                    sql += ") "
                }
                if(data.value){
                    sql += 'VALUES ('
                    for(var i = 0; i < data.value.length; i++){
                        sql += `'${data.value[i]}'`
                        if(data.value[i+1]) sql+=', '
                    }
                    sql += ")"
                }
            }
            break;
        case 'update':
            sql += table + ' SET '
            if(data){
                if(data.column && data.value) {
                    for(var i = 0; i < data.column.length; i++){
                        sql += data.column[i] + ' = ' + data.value[i]
                        if(data.column[i+1]) sql += ', '
                    }
                }

                if(data.condition){
                    sql += ' WHERE '
                    for(var i = 0; i < data.condition.length; i++){
                        sql += data.condition[i].variable + ' ' + data.condition[i].sign + " '" + data.condition[i].value + "'"
                        if(data.condition[i+1]) sql+=' AND '
                    }
                }
            }
            break;
        case 'delete':
            sql += 'FROM ' + table
            if (data) {
                if (data.condition) {
                    sql += ' WHERE '
                    let buf = data.condition
                    for (var i = 0; i < buf.length; i++) {
                        sql += buf[i].variable + " " + buf[i].sign + " '" + buf[i].value + "'"
                        if (buf[i + 1]) sql += ' AND '
                    }
                }
            }
            break;
    }
    return sql;

}

router.get('/', function (req, res, next) {
    var del = {
        column: 1,
        condition: [
            {
                variable: 'month',
                sign: '=',
                value: '5'
            },
            {
                variable: 'day',
                sign: '>=',
                value: '20'
            }
        ],
        value: 1,
    }
    var up = {
        column : ['title','content'],
        value : ['test1','test_content'],
        condition : [
            {
                variable : 'month',
                sign : '=',
                value : '5'
            }
        ]
    }
    var ins = {
        column : ['team_name','grade'],
        value : ['TTEASDAM','30']
    }
    var sel = {
        column : ['month'],
        condition : [
            {
                variable:'month',
                sign:'>=',
                value:'5'
            }
        ]
    }
    var sql = makingSQL('select', 'matching_board', sel)
    db.test(sql,function(err, result){
        console.log(result)
    })

    // db.selectMatchingByTitle('1344',function(err, res){
    //     console.log(err,res)
    // })

    // db.selectGetMatching(1,function(err, result){
    //     //month는 getMonth값의 +1 해야 그 날짜 나옴
    //     var a = new Date(result[0].date)
    //     console.log(a.getHours())

    // })
})
router.post('/', function (req, res, next) {
    db.selectMatchingByTitle(req.body.test, function (err, result) {
        res.send(result)
    })
    // db.selectMatchingByTitle('1344',function(err, res){
    //     console.log(err,res)
    // })

    // db.selectGetMatching(1,function(err, result){
    //     //month는 getMonth값의 +1 해야 그 날짜 나옴
    //     var a = new Date(result[0].date)
    //     console.log(a.getHours())

    // })
})
router.get('/board', function (req, res, next) {
    var chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    for (var a = 0; a < 10; a++) {
        var data = {}
        var result = ''
        for (let i = 0; i < 10; i++) {
            result += chars[Math.floor(Math.random() * chars.length)]
        }
        data.title = result

        result = ''
        for (let i = 0; i < 100; i++) {
            result += chars[Math.floor(Math.random() * chars.length)]
        }
        data.content = result
        data.writer = 'dndnp4'

        result = ''
        for (let i = 0; i < 15; i++) {
            result += chars[Math.floor(Math.random() * chars.length)]
        }
        data.place = result

        result = 2019
        data.year = result

        result = Math.floor(Math.random() * 12) + 1
        data.month = result

        result = Math.floor(Math.random() * 30) + 1
        data.day = result

        result = Math.floor(Math.random() * 20) + 1
        data.time_from = result

        result = Math.floor(Math.random() * 20) + 1
        data.time_to = result

        result = Math.floor(Math.random() * 12) + 1
        data.person = result

        result = Math.floor(Math.random() * 12) + 1
        data.age = result

        result = Math.floor(Math.random() * 100) + 1
        data.level = result

        result = Math.floor(Math.random() * 100) + 1
        data.due = result

        db.insertMatching(data)
        //db.insertTeam(result)
    }
    res.render('clone')
})
router.get('/team', function (req, res, next) {
    var chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    for (var a = 0; a < 10; a++) {
        var data = {}
        var result = ''
        for (let i = 0; i < 10; i++) {
            result += chars[Math.floor(Math.random() * chars.length)]
        }

        db.insertTeam(result)
    }
    res.render('clone')
})
router.get('/user', function (req, res, next) {
    var chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    for (var a = 0; a < 10; a++) {
        db.selectRandTeam(function (err, res1) {

            var data = {}
            data.team_name = res1[0].team_name

            let result = ''
            for (let i = 0; i < 10; i++) {
                result += chars[Math.floor(Math.random() * chars.length)]
            }
            data.id = result

            result = ''
            for (let i = 0; i < 10; i++) {
                result += chars[Math.floor(Math.random() * chars.length)]
            }
            data.pw = result

            result = ''
            for (let i = 0; i < 5; i++) {
                result += chars[Math.floor(Math.random() * chars.length)]
            }
            data.name = result

            result = ''
            for (let i = 0; i < 20; i++) {
                result += chars[Math.floor(Math.random() * chars.length)]
            }
            data.account = result

            result = ''
            for (let i = 0; i < 15; i++) {
                result += chars[Math.floor(Math.random() * chars.length)]
            }
            data.wallet = result

            db.insertMember(data, 'true')

        })
    }
    res.render('clone')
})
module.exports = router;
