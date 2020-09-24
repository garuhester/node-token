var jwt = require('./token_vertify')

module.exports = function (app) {

    app.use(function (req, res, next) {
        var token = req.headers['authorization']
        if (token == undefined) {
            return next()
        } else {
            jwt.verToken(token).then((data) => {
                req.data = data;
                return next()
            }).catch((error) => {
                return res.json({ msg: -1 })
            })
        }
    });

    app.get("/login", function (req, res) {
        res.render("login");
    })

    app.get("/index", function (req, res) {
        res.render("index");
    })

    // app.post("/verify", function (req, res, next) {
    //     if (req.data) {
    //         res.json({ msg: 1 })
    //     } else {
    //         res.json({ msg: -1 })
    //     }
    // })

    app.post("/login", (req, res, next) => {
        var name = req.body.name
        var password = req.body.password
        jwt.setToken(name, password).then((data) => {
            res.json({ token: data })
        })
    })

    app.post("/register", (req, res) => {
        res.json({ result: 1 })
    })
}