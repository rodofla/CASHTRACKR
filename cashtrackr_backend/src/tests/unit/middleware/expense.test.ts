import { createRequest, createResponse} from 'node-mocks-http'
import { validateExpenseExists } from '../../../middlewares/expense'
import Expense from '../../../models/Expense'
import { expenses } from '../../mocks/expenses'
import { hasAccessToBudget } from '../../../middlewares/budget'
import { budgets } from '../../mocks/budgets'

jest.mock('../../../models/Expense', () => ({
    findByPk: jest.fn()
}))

describe ('Expenses Middleware - validateExpenseExists', () => {

    beforeEach(() => {
        (Expense.findByPk as jest.Mock).mockImplementation((id) => {
            const expense = expenses.filter(e => e.id === id)[0] ?? null;
            return Promise.resolve(expense);
        })
    })

    it('should handle a non-existing budget', async () => {

        const req = createRequest({
            params: { expenseId: 120 }, 
        });

        const res = createResponse();
        const next = jest.fn();

        await validateExpenseExists(req, res, next);

        const data = res._getJSONData();
        expect(res.statusCode).toBe(404);
        expect(data).toEqual({ error: 'Expense not found' });
        expect(next).not.toHaveBeenCalled();
    })

    it('should call next middleware if expense exists', async () => {

        const req = createRequest({
            params: { expenseId: 1 }, 
        });

        const res = createResponse();
        const next = jest.fn();

        await validateExpenseExists(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledTimes(1);
        expect(req.expense).toEqual(expenses[0]);
    })

    it('should handle internal server error', async () => {
        (Expense.findByPk as jest.Mock).mockRejectedValue(new Error)

        const req = createRequest({
            params: { expenseId: 1 }, 
        });

        const res = createResponse();
        const next = jest.fn();

        await validateExpenseExists(req, res, next);

        const data = res._getJSONData();
        expect(next).not.toHaveBeenCalled();
        expect(res.statusCode).toBe(500);
        expect(data).toEqual({ error: 'Internal server error'});
    })

    it('should prevent unauthorized users from adding expenses', async () => {
        const req = createRequest({
            method: 'POST',
            url: '/api/v1/:budgetId/expenses',
            budget: budgets[0],
            user: { id: 20 }, // User not authorized for this budget
            body: { name: 'Expense Test', amount: 3000 }
        });

        const res = createResponse();
        const next = jest.fn();

        hasAccessToBudget(req, res, next);

        const data = res._getJSONData();
        expect(res.statusCode).toBe(401);
        expect(data).toEqual({ error: 'You do not have access to this budget' });
        expect(next).not.toHaveBeenCalled();
    })
})