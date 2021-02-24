const router = require('express').Router();

const userController = require('../controller/user.controller');
const userMiddleware = require('../middleware/user.middleware');

router.get('/', userController.getAllUsers);

router.get('/:email', userMiddleware.checkIsEmailValid, userController.getUserByEmail);

router.post('/', userMiddleware.isUserValid, userController.createUser);

router.delete('/:userId', userController.deleteUser);

module.exports = router;
