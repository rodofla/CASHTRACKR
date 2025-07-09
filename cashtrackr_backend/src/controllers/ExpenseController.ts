import type { Request, Response } from 'express'
import Expense from '../models/Expense'

export class ExpensesController {

    static createExpense = async (req: Request, res: Response) => {
       
        try {
            const expense = await Expense.create(req.body)
            expense.budgetId = req.budget.id

            await expense.save()
            res.status(201).json({ message: 'Expense created successfully', expense })
            
        } catch (error) {
            // console.error('Error creating expense:', error)
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    static getById = async (req: Request, res: Response) => {
        res.json(req.expense)
    }

    static updateById = async (req: Request, res: Response) => {
        await req.expense.update(req.body)
        res.json({ message: 'Expense updated successfully', expense: req.expense })
    }

    static deleteById = async (req: Request, res: Response) => {
        await req.expense.destroy()
        res.json({ message: 'Expense deleted successfully' })
    }
}