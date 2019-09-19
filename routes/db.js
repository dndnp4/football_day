var mysql = require('mysql')

exports.insertMember = (data, team) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'football_day'
    })

    connection.connect((err) => {
        if (err) {
            console.log(err)
        } else {

            if (team === 'true') {
                this.updateTeamMember(data.team_name)
            } else {
                this.insertTeam(data.team_name)
            }
            let sql = `insert into member(team_name,id,pw,name,account,wallet) values(?,?,?,?,?,?)`
            connection.query(sql, [data.team_name, data.id, data.pw, data.name, data.account, data.wallet], (err, result) => {
                connection.end()
            })
        }
    })
}
exports.insertTeam = (data) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'football_day'
    })
    console.log(data)
    connection.connect((err) => {
        if (err) {
            console.log(err)
        } else {
            let sql = `insert into team(team_name) values (?)`

            connection.query(sql, [data], (err, result) => {
                connection.end()
            })
            this.updateTeamMember(data.team_name)
        }
    })
}

exports.insertMatching = (data) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'football_day'
    })

    connection.connect((err) => {
        if (err) {
            console.log(err)
        } else {
            let sql = `insert into matching_board (title,content,writer,place,year,month,day,time_from,time_to,person,age,level,due)
                     values (?,?,?,?,?,?,?,?,?,?,?,?,?)`
            connection.query(sql, [data.title, data.content, data.writer, data.place, data.year, data.month, data.day, data.time_from, data.time_to, data.person, data.age, data.level, data.due], (err, result) => {
                connection.end()
            })
        }
    })
}

exports.updateTeamMember = (team) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'football_day'
    })
    connection.connect((err) => {
        if (err) {
            console.log(err)
        } else {
            let sql = `update team set member = member + 1 where team_name = ?`

            connection.query(sql, [team], (err, result) => {

                connection.end()
            })
        }
    })
}

exports.selectAllMatching = (cb) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'football_day'
    })
    connection.connect((err) => {
        if (err) {
            console.log(err)
        } else {
            let sql = `select * from matching_board`

            connection.query(sql, (err, result) => {
                cb(err, result)
                connection.end()
            })
        }
    })
}

exports.selectGetMatching = (data, cb) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'football_day'
    })
    connection.connect((err) => {
        if (err) {
            console.log(err)
        } else {
            let sql = `select * from matching_board where no = ?`

            connection.query(sql, [data], (err, result) => {
                cb(err, result)
                connection.end()
            })
        }
    })
}

exports.selectMatchingByTitle = (data, cb) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'football_day'
    })
    connection.connect((err) => {
        if (err) {
            console.log(err)
        } else {
            data = `%${data}%`
            let sql = `select * from matching_board where title like ?`
            connection.query(sql, [data], (err, result) => {
                cb(err, result)
                connection.end()
            })
        }
    })
}
exports.selectMatchingByContent = (data, cb) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'football_day'
    })
    connection.connect((err) => {
        if (err) {
            console.log(err)
        } else {
            data = `%${data}%`
            let sql = `select * from matching_board where content like ?`
            connection.query(sql, [data], (err, result) => {
                cb(err, result)
                connection.end()
            })
        }
    })
}
exports.selectMatchingByWriter = (data, cb) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'football_day'
    })
    connection.connect((err) => {
        if (err) {
            console.log(err)
        } else {
            data = `%${data}%`
            let sql = `select * from matching_board where writer like ?`
            connection.query(sql, [data], (err, result) => {
                cb(err, result)
                connection.end()
            })
        }
    })
}
exports.selectMatchingByPlace = (data, cb) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'football_day'
    })
    connection.connect((err) => {
        if (err) {
            console.log(err)
        } else {
            data = `%${data}%`
            let sql = `select * from matching_board where place like ?`
            connection.query(sql, [data], (err, result) => {
                cb(err, result)
                connection.end()
            })
        }
    })
}
exports.selectMatchingByDate = (a, b, c, cb) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'football_day'
    })
    connection.connect((err) => {
        if (err) {
            console.log(err)
        } else {
            a = parseInt(a)
            b = parseInt(b)
            c = parseInt(c)
            let sql = `select * from matching_board where `
            let condition = ``
            let data = []
            if (a > 0) {
                condition += `year=? `
                data.push(a)
            }
            if (b > 0) {
                condition += `month=? `
                data.push(b)
            }
            if (c > 0) {
                condition += `day=? `
                data.push(c)
            }
            condition = condition.split(' ')
            console.log(data)
            for (var i = 0; i < condition.length; i++) {
                sql += condition[i]
                if (i == condition.length - 2) break;
                sql += ' and '
            }

            connection.query(sql, data, (err, result) => {
                cb(err, result)
                connection.end()
            })
        }
    })
}
exports.selectMatchingByTime = (a, b, cb) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'football_day'
    })
    connection.connect((err) => {
        if (err) {
            console.log(err)
        } else {
            a = parseInt(a)
            b = parseInt(b)
            let sql = `select * from matching_board where `
            let condition = ``
            let data = []
            if (a > 0) {
                condition += `time_from>=? `
                data.push(a)
            }
            if (b > 0) {
                condition += `time_to<=? `
                data.push(b)
            }

            condition = condition.split(' ')
            console.log(data)
            for (var i = 0; i < condition.length; i++) {
                sql += condition[i]
                if (i == condition.length - 2) break;
                sql += ' and '
            }
            connection.query(sql,data, (err, result) => {
                cb(err, result)
                connection.end()
            })
        }
    })
}

exports.selectMatchingByPerson = (data, cb) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'football_day'
    })
    connection.connect((err) => {
        if (err) {
            console.log(err)
        } else {
            let sql = `select * from matching_board where person = ?`
            connection.query(sql, [data], (err, result) => {
                cb(err, result)
                connection.end()
            })
        }
    })
}
exports.selectMatchingByAge = (data, cb) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'football_day'
    })
    connection.connect((err) => {
        if (err) {
            console.log(err)
        } else {
            let sql = `select * from matching_board where age = ?`
            connection.query(sql, [data], (err, result) => {
                cb(err, result)
                connection.end()
            })
        }
    })
}
exports.selectMatchingByLevel = (data, cb) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'football_day'
    })
    connection.connect((err) => {
        if (err) {
            console.log(err)
        } else {
            let sql = `select * from matching_board where level = ?`
            connection.query(sql, [data], (err, result) => {
                cb(err, result)
                connection.end()
            })
        }
    })
}

exports.updateMatching = (data) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'football_day'
    })
    connection.connect((err) => {
        if (err) {
            console.log(err)
        } else {
            let sql = `update matching_board set title = ?,content = ?, place = ?, year = ?, month = ?, day = ?, time_from = ?, time_to = ?, person = ?, age = ?, level = ?, due = ? where no = ?`

            connection.query(sql, [data.title, data.content, data.place, data.year, data.month, data.day, data.time_from, data.time_to, data.person, data.age, data.level, data.due, data.no], (err, result) => {
                connection.end()
            })
        }
    })
}
exports.deleteMatching = (data) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'football_day'
    })
    connection.connect((err) => {
        if (err) {
            console.log(err)
        } else {
            let sql = `delete from matching_board where no = ?`
            connection.query(sql, [data.no], (err, result) => {
                connection.end()
            })
        }
    })
}

exports.updateMember = (data) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'football_day'
    })
    connection.connect((err) => {
        if (err) {
            console.log(err)
        } else {
            let sql = `update member set pw = ?, account = ? where id = ?`
            
            connection.query(sql, [data.pw, data.account, data.id], (err, result) => {
                
                connection.end()
            })
        }
    })
}

//테스트용 케이스 생성
exports.selectRandTeam = (cb) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'football_day'
    })
    connection.connect((err) => {
        if (err) {
            console.log(err)
        } else {
            let sql = `select * from team order by rand() limit 1`

            connection.query(sql, (err, result) => {
                cb(err, result)
                connection.end()
            })
        }
    })
}
exports.selectRandMember = (cb) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'football_day'
    })
    connection.connect((err) => {
        if (err) {
            console.log(err)
        } else {
            let sql = `select * from member order by rand() limit 1`

            connection.query(sql, (err, result) => {
                cb(err, result)
                connection.end()
            })
        }
    })
}
exports.requestLogin = (mid,mpw, cb) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'football_day'
    })

    connection.connect((err) => {
        if (err) {
            console.log(err)
        } else {
            const sql = 'select * from member where id = ? and pw = ?'
            connection.query(sql, [mid,mpw], (err, rows) => {
                cb(err, rows)
            })
            connection.end()
        }
    })
}
//유효성 검사
exports.isVaildId = (tid, cb) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'football_day'
    })

    connection.connect((err) => {
        if (err) {
            console.log(err)
        } else {
            const sql = 'select * from member where id = ?'
            connection.query(sql, [tid], (err, rows) => {
                cb(err, rows)
            })
            connection.end()
        }
    })
}
exports.isVaildTeam = (tname, cb) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'football_day'
    })

    connection.connect((err) => {
        if (err) {
            console.log(err)
        } else {
            const sql = 'select * from team where team_name = ?'
            connection.query(sql, [tname], (err, rows) => {
                cb(err, rows)
            })
            connection.end()
        }
    })

}

exports.test = (sql, cb) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'football_day'
    })

    connection.connect((err) => {
        if (err) {
            console.log(err)
        } else {
            connection.query(sql, [], (err, rows) => {
                cb(err, rows)
                connection.end()
            })
        }
    })
}
exports.isVaildtTable = (tname, cb) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'football_day'
    })

    connection.connect((err) => {
        if (err) {
            console.log(err)
        } else {
            const sql = 'SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = "football_day" AND TABLE_NAME = ?'
            connection.query(sql, [tname], (err,rows) => {
                cb(rows,err)
                connection.end()
            })
        }
    })
}