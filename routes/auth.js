const express = require('express')
const router = express.Router();
const authController = require('../controllers/authController')
const authMiddleware = require('../middlewares/auth.middleware.js')


router.post('/login', authController.handleLogin);

// Secure Authorized routes
router.route('/logout')
    .post(authMiddleware.verifyJWT ,authController.handleLogout)

router.route('/refresh-token')
    .post(authController.refreshAccessToken)

router.route('/isAuthenticated')
    .get(authMiddleware.isAuthenticated, (req, res)=>{
        return res.status(200).json({"isAuthenticated": req.isAuthenticated});
})



module.exports = router