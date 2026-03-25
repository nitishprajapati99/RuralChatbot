const app = require('express');
const router = app.Router();
const viewProfile = require('../Controllers/ViewProfile.js');
const authMiddleware = require('../Middlewares/token.js');
const GolbalErrorHandler = require('../Middlewares/GlobalErrorHandler.js');

router.get('/profile', authMiddleware,GolbalErrorHandler, viewProfile);

//module exporting
module.exports = router;