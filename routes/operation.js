const { Router } = require('express');
const { check } = require('express-validator');

const { listOperations, createOperation, updateOperation, removeOperation } = require('../controllers/operation');
const { isDate } = require('../helpers/isDate');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.use(validateJWT);

router.get('/', listOperations);

router.post(
    '/',
    [
        check('concept', 'Concept is required').not().isEmpty(),
        check('amount', 'Amount is required').not().isEmpty(),
        check('date', 'Date is required').custom(isDate),
        check('type', 'Type is required').not().isEmpty(),
        validateFields
    ],
    createOperation
);

router.put(
    '/:id',
    [
        check('concept', 'Concept is required').not().isEmpty(),
        check('amount', 'Amount is required').not().isEmpty(),
        check('date', 'Date is required').custom(isDate),
        check('type', 'Type is required').not().isEmpty(),
        validateFields
    ],
    updateOperation
);

router.delete('/:id', removeOperation);

module.exports = router;