import { BelongsTo } from 'sequelize-typescript';
import type { Request, Response, NextFunction } from "express";
import { param, validationResult, body } from "express-validator";
import Expense from "../models/Expense";


declare global {
    namespace Express {
        interface Request {
            expense?: Expense;
        }
    }
}

export const validateExpensetInput = async (req: Request, res: Response, next: NextFunction) => {
    await body('name')
        .notEmpty().withMessage('Expense is required')
        .run(req)

    await body('amount').notEmpty().withMessage('Expense is required')
        .isNumeric().withMessage('Expense must be a number')
        .custom((value) => value > 0).withMessage('Expense must be a positive number greater than 0')
        .run(req)

    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}

export const validateExpenseId = async (req: Request, res: Response, next: NextFunction) => {
    await param('expenseId').isInt({ gt: 0 }).withMessage('Id not valid').run(req)

    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}

export const validateExpenseExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { expenseId } = req.params
        const expense = await Expense.findByPk(expenseId)
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' })
        }
        req.expense = expense
        next()
    } catch (error) {
        //console.error('Error fetching budget:', error)
        return res.status(500).json({ error: 'Internal server error' })
    }
}

export const BelongsToBudget = async (req: Request, res: Response, next: NextFunction) => {
    if (req.budget.id !== req.expense.budgetId) {
        return res.status(403).json({ error: 'Acción no válida' })
    }

    next()
    
}