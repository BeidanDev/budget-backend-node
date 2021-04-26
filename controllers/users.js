const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usersGet = async(req = request, res = response) => {
    try {
        const users = await User.findAll();

        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk to the administrator'
        });
    }
}

const userGet = async(req = request, res = response) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
    
        if(user) {
            res.json(user);
        } else {
            res.status(404).json({
                msg: `There is no user with the id ${ id }`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk to the administrator'
        });
    }
}

const userPost = async(req = request, res = response) => {
    const { body } = req;

    try {
        // Encrypt password
        const salt = bcryptjs.genSaltSync();
        body.password = bcryptjs.hashSync(body.password, salt);

        // Save in DB
        const user = await User.create(body);

        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk to the administrator'
        });
    }
}

const userPut = async(req = request, res = response) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const user = await User.findByPk(id);

        if(!user) {
            return res.status(404).json({
                msg: `There is no user with the id ${ id }`
            });
        }

        if(body.password) {
            // Encrypt password
            const salt = bcryptjs.genSaltSync();
            body.password = bcryptjs.hashSync(body.password, salt);
        }

        await user.update(body);

        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk to the administrator'
        });
    }
}

const userDelete = async(req = request, res = response) => {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if(!user) {
        return res.status(404).json({
            msg: `There is no user with the id ${ id }`
        });
    }

    await user.update({ status: false });

    res.json(user);
}

module.exports = {
    usersGet,
    userGet,
    userPost,
    userPut,
    userDelete
}