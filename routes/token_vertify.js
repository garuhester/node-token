var jwt = require("jsonwebtoken")
var signkey = 'mes_qdhd_mobile_xhykjyxgs'

function setToken(username, userid) {
    return new Promise((resolve, reject) => {
        var token = 'Bearer ' + jwt.sign({
            name: username,
            _id: userid
        }, signkey, { expiresIn: 5 });
        resolve(token)
    })
}

function verToken(token) {
    return new Promise((resolve, reject) => {
        var info = jwt.verify(token.split(' ')[1], signkey);
        resolve(info)
    })
}

module.exports = {
    setToken,
    verToken,
    signkey,
}