const { response, request } = require('express');

const User = require('../models/user');

const usersGet = async(req = request, res = response) => {
    const users = await User.findAll();

    res.json(users);
}

const userGet = async(req = request, res = response) => {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if(user) {
        res.json(user);
    } else {
        res.status(404).json({
            msg: `There is no user with the id ${ id }`
        });
    }
}

const userPost = async(req = request, res = response) => {
    const { body } = req;

    try {
        const existsEmail = await User.findOne({
            where: {
                email: body.email
            }
        });

        if(existsEmail) {
            return res.status(400).json({
                msg: 'There is already a user with the email ' + body.email
            });
        }

        const user = await User.create(body);

        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk to the administrator'
        });
    }
}

const userPut = (req, res = response) => {
    const { id } = req.params;

    res.json({
        msg: 'put API - usuariosPut',
        id
    });
}

const userDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - usuariosDelete'
    });
}

module.exports = {
    usersGet,
    userGet,
    userPost,
    userPut,
    userDelete
}