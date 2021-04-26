const { Router } = require('express');
const { check } = require('express-validator');

const { usersGet, userGet, userPost, userPut, userDelete } = require('../controllers/users');
const { existsEmail } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/', usersGet);
router.get('/:id', userGet);
router.post('/',[
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is not valid').isEmail(),
    check('email').custom(existsEmail),
    check('password', 'The password must be more than 6 characters').isLength({ min: 6 }),
    validateFields
], userPost);
router.put('/:id', userPut);
router.delete('/', userDelete);

module.exports = router;