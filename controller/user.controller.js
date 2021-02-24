const userService = require('../service/user.service');
const errorCodes = require('../constant/errorCodes.enum');

module.exports = {
    getAllUsers: (req, res) => {
        try {
            const users = userService.getAllUsers();

            res.json(users);
        } catch (e) {
            res.status(418).json(e.message);
        }
    },

    getUserByEmail: (req, res) => {
        try {
            const {email} = req.params;
            const user = userService.getUserByEmail(email);
            res.json(user);
        } catch (e) {
            res.status(errorCodes.OK).json(e.message);
        }
    },
    createUser: (req, res) => {
        try {
            userService.createUser(req.body);

        } catch (e) {
            res.status(errorCodes.CREATED).json(e.message);
        }
    },
    deleteUser: (req, res) => {
        try {
            const {email} = req.params;
            const deleteUser = userService.deleteUser(email);

            res.json(deleteUser);

        } catch (e) {
            res.status(errorCodes.NOT_FOUND).json(e.message);
        }
    }
};
