const { Router } = require('express');

const { usersGet, userGet, userPost, userPut, userDelete } = require('../controllers/users');

const router = Router();

router.get('/', usersGet);
router.get('/:id', userGet);
router.post('/', userPost);
router.put('/:id', userPut);
router.delete('/', userDelete);

module.exports = router;