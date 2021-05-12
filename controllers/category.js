const { response, request } = require('express');

const Category = require('../models/category');

const listCategories = async(req = request, res = response) => {
    try {
        const categories = await Category.findAll({
            where: {
                state: 1,
                user_id: req.uid
            },
            order: [
                ['id', 'DESC']
            ]
        });

        res.json({
            ok: true,
            msg: 'getCategories',
            categories
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk to administrator'
        });
    }
}

const createCategory = async(req = request, res = response) => {
    const { body } = req;

    try {
        const categorySave = await Category.create(body);

        res.json({
            ok: true,
            category: categorySave
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk to administrator'
        });
    }
}

const updateCategory = async(req = request, res = response) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const category = await Category.findByPk(id);

        if(!category) {
            return res.status(404).json({
                ok: false,
                msg: `There is no category with the id ${ id }`
            });
        }

        await category.update(body);

        res.json({
            ok: true,
            msg: 'putCategory',
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk to administrator'
        });
    }
}

const removeCategory = async(req = request, res = response) => {
    const { id } = req.params;

    try {
        const category = await Category.findByPk(id);

        if(!category) {
            return res.status(404).json({
                ok: false,
                msg: `There is no category with the id ${ id }`
            });
        }

        await category.update({ state: false });

        res.json({
            ok: true,
            msg: 'deleteCategory',
            category
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
    listCategories,
    createCategory,
    updateCategory,
    removeCategory
}