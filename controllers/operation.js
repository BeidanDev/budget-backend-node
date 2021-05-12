const { response, request } = require('express');

const Operation = require('../models/operation');

const listOperations = async(req = request, res = response) => {
    try {
        const operations = await Operation.findAll({
            where: {
                state: 1,
                user_id: req.uid
            }
        });
        // console.log(req.uid);
        res.json({
            ok: true,
            msg: 'getOperations',
            operations
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk to administrator'
        });
    }
}

const createOperation = async(req = request, res = response) => {
    const { body } = req;

    try {
        const operationSave = await Operation.create(body);

        res.json({
            ok: true,
            operation: operationSave
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk to administrator'
        });
    }
}

const updateOperation = async(req = request, res = response) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const operation = await Operation.findByPk(id);

        if(!operation) {
            return res.status(404).json({
                ok: false,
                msg: `There is no operation with the id ${ id }`
            });
        }

        await operation.update(body);

        res.json({
            ok: true,
            msg: 'putOperation',
            operation
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk to administrator'
        });
    }
}

const removeOperation = async(req = request, res = response) => {
    const { id } = req.params;

    try {
        const operation = await Operation.findByPk(id);

        if(!operation) {
            return res.status(404).json({
                ok: false,
                msg: `There is no operation with the id ${ id }`
            });
        }

        await operation.update({ state: false });

        res.json({
            ok: true,
            msg: 'deleteOperation',
            operation
        });        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk to administrator'
        });
    }
}

module.exports = {
    listOperations,
    createOperation,
    updateOperation,
    removeOperation
}