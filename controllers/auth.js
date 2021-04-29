const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const createUser = async(req = request, res = response) => {
    const { body } = req;

    try {
        const existsEmail = await User.findOne({
            where: {
                email: body.email
            }
        });

        if(existsEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'The user already exists'
            });
        }
        
        // Encrypt password
        const salt = bcrypt.genSaltSync();
        body.password = bcrypt.hashSync(body.password, salt);

        const user = await User.create(body);

        // Generate JWT
        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator'
        });
    }
}

const loginUser = async(req = request, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ 
            where: {
                email
            }
        });

        if(!user) {
            return res.status(400).json({
                ok: false,
                msg: 'The user does not exist with that email'
            });
        }

        // Confirm passwords
        const validatePassword = bcrypt.compareSync(password, user.password);

        if(!validatePassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect password'
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id, user.name);

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator'
        });
    }
}

const revalidateToken = async(req = request, res = response) => {
    const { uid, name } = req;

    // Generate JWT
    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    });
}

module.exports = {
    createUser,
    loginUser,
    revalidateToken
}