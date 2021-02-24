const errorCodes = require('../constant/errorCodes.enum');
const errorMessages = require('../error/error.messages');

module.exports = {
    checkIsEmailValid: (req, res, next) => {
        try {
            const {email, preferLanguage = 'en'} = req.body;
            if (!email) {
                throw new Error(errorMessages.REPEAT_email[preferLanguage]);
            }
            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    isUserValid: (req, res, next) => {
        try {
            const {email, password, preferLanguage = 'en'} = req.body;

            if (!email || !password) {
                throw new Error('Some filed is empty');
            }

            if (password.length < 6) {
                throw new Error(errorMessages.TOO_WEAK_Password[preferLanguage]);
            }
            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
}
