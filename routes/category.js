const { Router } = require('express');
const { check } = require('express-validator');

const { listCategories, createCategory, updateCategory, removeCategory } = require('../controllers/category');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.use(validateJWT);

router.get('/', listCategories);

router.post(
    '/',
    [
        check('name', 'Name is required').not().isEmpty(),
        validateFields
    ],
    createCategory
);

router.put(
    '/:id',
    [
        check('name', 'Name is required').not().isEmpty(),
        validateFields
    ],
    updateCategory
);

router.delete('/:id', removeCategory);

module.exports = router;