const usersCtrl = {};

const User = require('../models/User');
const crypto = require('crypto');

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

function hashPassword(pwd) {
    return crypto.scryptSync(pwd, 'salt', 24);
};

usersCtrl.signup = async (req, res) => {
    const errors = [];

    const {name, email, password, confirm_password} = req.body;
    if(password != confirm_password) {
        errors.push({text: 'Contraseñas no coinciden'});
    }
    if(password.length < 4) {
        errors.push({text: 'Contraseña demasiado corta'});
    }
    if (errors.length > 0) {
        res.render('users/signup', {
            errors,
            name, 
            email
        })
    }
    else {
        const emailUser = await User.findOne({email: email});
        if (emailUser) {
            req.flash('error_msg', 'El email ya está en uso');
            res.redirect('/users/signup');
        } else {
            const newUser = new User({name, email, password: hashPassword(password)});
            await newUser.save();
            req.flash('success_msg','Usuario registrado satisfactoriamente');
            res.redirect('/users/signin');
        }
    }
};

usersCtrl.renderSininForm = (req, res) => {
    res.render('users/signin');
};

usersCtrl.signin = (req, res) => {
    res.send('signin');
};

usersCtrl.logout =(req, res) => {
    res.send('logout');
}

module.exports = usersCtrl;