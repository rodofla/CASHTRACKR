import type { Request, Response, NextFunction } from "express";
import { param, validationResult, body } from "express-validator";
import Budget from "../models/Budget";

declare global {
    namespace Express {
        interface Request {
            budget?: Budget;
        }
    }
}

export const validateBudgetId = async (req: Request, res: Response, next: NextFunction) => {

    await param('budgetId').isInt({ gt: 0 }).withMessage('Id not valid').run(req)

    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}

export const validateBudgeExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { budgetId } = req.params
        const budget = await Budget.findByPk(budgetId)
        if (!budget) {
            return res.status(404).json({ error: 'Budget not found' })
        }
        req.budget = budget
        next()
    } catch (error) {
        //console.error('Error fetching budget:', error)
        return res.status(500).json({ error: 'Internal server error' })
    }
}

export const validateBudgetInput = async (req: Request, res: Response, next: NextFunction) => {
    await body('name')
        .notEmpty().withMessage('Name is required')
        .run(req)

    await body('amount').notEmpty().withMessage('Amount is required')
        .isNumeric().withMessage('Amount must be a number')
        .custom((value) => value > 0).withMessage('Amount must be a positive number greater than 0')
        .run(req)

    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}

export function hasAccessToBudget(req: Request, res: Response, next: NextFunction) {
    if (req.budget.userId !== req.user.id) {
        const error = new Error('You do not have access to this budget')
        return res.status(401).json({ error: error.message })
    }
    next()
}