import { Router } from 'express'
import { BudgetController } from '../controllers/BudgetController'
import { hasAccessToBudget, validateBudgeExists, validateBudgetId, validateBudgetInput } from '../middlewares/budget'
import { validateExpensetInput, validateExpenseId, validateExpenseExists, BelongsToBudget } from '../middlewares/expense'
import { ExpensesController } from '../controllers/ExpenseController'
import { handleInputErrors } from '../middlewares/validation'
import { authenticate } from '../middlewares/auth'

const router = Router()

// GENERAL MIDDLEWARES FOR ALL ROUTES
router.use(authenticate) // Authenticate the user for all routes

router.param('budgetId', validateBudgetId) // Validate the budgetId parameter for all routes that have it
router.param('budgetId', validateBudgeExists) // Validate if the budget exists for all routes that have it
router.param('budgetId', hasAccessToBudget) // Check if the user has access to the budget for all routes that have it

router.param('expenseId', validateExpenseId) // Validate the expenseId parameter for all routes that have it
router.param('expenseId', validateExpenseExists) // Validate if the expense exists for all routes that have it
router.param('expenseId', BelongsToBudget) // Check if the expense belongs to the budget for all routes that have it

/** ----- Budget routes -----  */
router.get('/', BudgetController.getAll)

router.post('/', validateBudgetInput, BudgetController.createBudget)

router.get('/:budgetId', BudgetController.getById)

router.put('/:budgetId', validateBudgetInput, BudgetController.updateById)

router.delete('/:budgetId', BudgetController.deleteById)


/** ----- Routes for expenses ----- */

router.post('/:budgetId/expenses', validateExpensetInput, handleInputErrors, ExpensesController.createExpense)
router.get('/:budgetId/expenses/:expenseId', ExpensesController.getById)
router.put('/:budgetId/expenses/:expenseId', validateExpensetInput, handleInputErrors, ExpensesController.updateById)
router.delete('/:budgetId/expenses/:expenseId', ExpensesController.deleteById)


export default router