const {Router} = require('express');
const sessionController = require('../controller/session.Controller')

const router = Router();

router.post('/login' , sessionController.sessionLogin);
router.post('/register', sessionController.register)


module.exports = router;