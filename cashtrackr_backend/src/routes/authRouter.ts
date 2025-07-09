import { Router } from 'express';
import { body, param } from 'express-validator';
import { AuthController } from '../controllers/AuthController';
import { handleInputErrors } from '../middlewares/validation';
import { limiter } from '../config/limiter';
import { authenticate } from '../middlewares/auth';

const router = Router();

// Apply rate limiting to the entire router
router.use(limiter);

router.post('/create-account', 
    body('name').notEmpty().withMessage('Name is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('email').isEmail().withMessage('Email is not valid'),
    handleInputErrors,
    AuthController.createAccount)

router.post('/confirm-account',
    body('token').isLength({min: 6, max: 6}).withMessage('Token is not valid'),
    handleInputErrors,
    AuthController.confirmAccount)

router.post('/login',
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').notEmpty().withMessage('Password is required'),
    handleInputErrors,
    AuthController.login)

router.post('/forgot-password',
    body('email').isEmail().withMessage('Email is not valid'),
    handleInputErrors,
    AuthController.forgotPassword)

router.post('/validate-token',
    body('token').notEmpty().isLength({min: 6, max: 6}).withMessage('Token is required'),
    handleInputErrors,
    AuthController.validateToken)

router.post('/reset-password/:token',
    param('token').notEmpty().isLength({ min: 6 , max: 6 }).withMessage('Token is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 6 characters long'),
    handleInputErrors,
    AuthController.resetPasswordWithToken)

router.get('/user',authenticate, AuthController.user)

router.post('/update-password',
    authenticate,
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 8 }).withMessage('New password must be at least 8 characters long'),
    handleInputErrors,
    AuthController.updateCurrentUserPassword)

router.post('/check-password',
    authenticate,
    body('password').notEmpty().withMessage('Password is required'),
    handleInputErrors,
    AuthController.checkPassword)

export default router;