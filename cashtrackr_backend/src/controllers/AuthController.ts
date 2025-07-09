import { checkPassword, hashPassword } from './../utils/auth';
import type { Request, Response } from 'express'
import User from '../models/User'
import { AuthEmail } from '../emails/AuthEmail';
import { generateJWT } from '../utils/jwt';
import { generateToken } from '../utils/token';

export class AuthController {
   static createAccount = async (req: Request, res: Response) => {
    const { email, password } = req.body

    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
        const error = new Error('Email already exists')
        return res.status(409).json({ error: error.message })
    }

    try {
        const user = await User.create(req.body)
        // Hash the password before saving
        user.password = await hashPassword(password)
        // Generate a token for the user
        const token = generateToken()
        user.token = token

        if (process.env.NODE_ENV !== 'production') {
            globalThis.cashTrackrConfirmationToken = token
        }

        await user.save()

        // Send confirmation email
        await AuthEmail.sendConfirmationEmail({
            name: user.name,
            email: user.email,
            token: user.token
        })

        res.status(201).json({ message: 'Account created successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }

   }


   static confirmAccount = async (req: Request, res: Response) => {
    const { token } = req.body

    // Find the user by token
    const user = await User.findOne({ where: { token } })

    if (!user) {
        const error = new Error('Invalid token')
        return res.status(401).json({ error: error.message })
    }

    user.confirmed = true
    user.token = null // Clear the token after confirmation
    await user.save()

    res.status(200).json({ message: 'Account confirmed successfully' })
   }


   static login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    // Check if the email already exists
    const user = await User.findOne({ where: { email } })

    if (!user) {
        const error = new Error('User not found')
        return res.status(404).json({ error: error.message })
    }

    // Check if the user is confirmed
    if (!user.confirmed) {
        const error = new Error('User account not confirmed')
        return res.status(403).json({ error: error.message })
    }

    const isPasswordCorrect = await checkPassword(password, user.password)
    if (!isPasswordCorrect) {
        const error = new Error('Incorrect password')
        return res.status(401).json({ error: error.message })
    }

    // Generate a JWT token
    const token =  generateJWT(user.id)
    res.json(token)
   }


   static forgotPassword = async (req: Request, res: Response) => {
        const { email } = req.body

        // check if user exists
        const user = await User.findOne({ where: { email } })
        if (!user) {
            const error = new Error('User not found')
            return res.status(404).json({ error: error.message })
        }

        // Generate a new token
        user.token = generateToken()
        await user.save()

        // Send password reset email
        await AuthEmail.sendPasswordResetToken({
            name: user.name,
            email: user.email,
            token: user.token
        })

        res.status(200).json({ message: 'Password reset email sent successfully' })
   }

   static validateToken = async (req: Request, res: Response) => {
        const { token } = req.body
    
        // Check if the token exists in the database
        const tokenExists = await User.findOne({ where: { token } })
        if (!tokenExists) {
            const error = new Error('Invalid token')
            return res.status(404).json({ error: error.message })
        }
    
          res.status(200).json({ message: 'Token is valid' })
   }

   static resetPasswordWithToken = async (req: Request, res: Response) => {
    const { token } = req.params
    const { password } = req.body

    // Check if the token exists in the database
    const user = await User.findOne({ where: { token } })
    if (!user) {
        const error = new Error('Invalid token')
        return res.status(404).json({ error: error.message })
    }

    // Hash the new password
    user.password = await hashPassword(password)
    user.token = null // Clear the token after resetting password
    await user.save()

    res.status(200).json({ message: 'Password reset successfully' })
   }

   static user = async (req: Request, res: Response) => {
    res.json(req.user)
   }

   static updateCurrentUserPassword = async (req: Request, res: Response) => {
    const { currentPassword, newPassword } = req.body
    const { id } = req.user

    const user = await User.findByPk(id)

    const isCurrentPasswordCorrect = await checkPassword(currentPassword, user.password)
    if (!isCurrentPasswordCorrect) {
        const error = new Error('Current password is incorrect')
        return res.status(401).json({ error: error.message })
    }
    // Hash the new password
    user.password = await hashPassword(newPassword)
    await user.save()
    
    res.status(200).json({ message: 'Password updated successfully' })
   }

   static checkPassword = async (req: Request, res: Response) => {
    const { password } = req.body
    const { id } = req.user

    const user = await User.findByPk(id)

    const IsPasswordCorrect = await checkPassword(password, user.password)
    if (!IsPasswordCorrect) {
        const error = new Error('Current password is incorrect')
        return res.status(401).json({ error: error.message })
    }
    
    res.status(200).json({ message: 'Correct Password' })
   }
}