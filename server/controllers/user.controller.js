const User = require('../models/user');


module.exports.register = (req, res) => {
    console.log('register');

    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            throw  new Error('error register user');
        }

        res.json(user);
    });
}


module.exports.login = (req, res) => {
    const {email, password} = req.body;

    User.findOne({email, password}).exec((err, user) => {
        if (err) {
            return res.status(404).send({error: 'user not found'});
        }
        res.json(user);
    })
}

module.exports.checkIfIdExist = (req, res) => {
    const userId = req.params.userId;
    User.findOne({userId: userId}).exec((err, user) => {
        if (err) {
            throw new Error('Error get user by userId')
        }

        res.json(user);
    })
}
