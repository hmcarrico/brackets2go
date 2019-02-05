const bcrypt = require('bcrypt');
const saltRounds = 12;

module.exports = {
    login: (req, res) => {
    const db = req.app.get('db');
    const { username, password } = req.params;
    db.find_user([username]).then(users => {
        if (users.length) {
        bcrypt.compare(password, users[0].password).then(passwordsMatch => {
            if (passwordsMatch) {
            req.session.user = { username: users[0].username };
            res.json({ user: req.session.user });
            } else {
            res.status(200).json({ message: 'Wrong email or password' })
            }
        })
            } else {
            res.status(200).json({ message: "Email does not exist" })
            }
        });
    },
    register: (req, res) => {
        const db = req.app.get('db');
        const { username, password } = req.params;
        bcrypt.hash(password, saltRounds).then(hash => {
            db.create_user([username, hash]).then(() => {
            req.session.user = { username };
            res.json({ user: req.session.user })
            }).catch(error => {
            console.log('error', error);
            res.status(200).json({ message: 'Email already taken'})
            });
        });
    },
    logout: (req, res) => {
        req.session.destroy();
        res.status(200).send();
    }
}