import { createRequest, createResponse } from 'node-mocks-http'
import { budgets } from "../../mocks/budgets"
import { BudgetController } from '../../../controllers/BudgetController'
import Budget from '../../../models/Budget'
import Expense from '../../../models/Expense'

jest.mock('../../../models/Budget', () => ({
    findAll: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn(),
}))

describe('BudgetController.getAll', () => {

    beforeEach(() => {
        (Budget.findAll as jest.Mock).mockReset();
        // Mock the implementation of findAll to return budgets based on userId
        (Budget.findAll as jest.Mock).mockImplementation((options) => {
            const updatedBudgets = budgets.filter(budget => budget.userId === options.where.userId);
            return Promise.resolve(updatedBudgets);
        })
    });

    it('should retrive 2 budgets for user whit ID 1', async () => {

        const req = createRequest({
            method: 'GET',
            url: '/api/v1/budgets',
            user: { id: 1}
        })

        const res = createResponse();

        await  BudgetController.getAll(req, res)

        const data = res._getJSONData()
        expect(data).toHaveLength(2);
        expect(res.statusCode).toBe(200);
        expect(res.statusCode).not.toBe(404);

    })

    it('should retrive 1 budget for user whit ID 2', async () => {
        const req = createRequest({
            method: 'GET',
            url: '/api/v1/budgets',
            user: { id: 2 }
        })
        const res = createResponse();

        await BudgetController.getAll(req, res)
        const data = res._getJSONData()
        expect(data).toHaveLength(1);
        expect(res.statusCode).toBe(200);
        expect(res.statusCode).not.toBe(404);
    })

    it('should retrive 0 budget for user whit ID 10', async () => {
        const req = createRequest({
            method: 'GET',
            url: '/api/v1/budgets',
            user: { id: 10 }
        })
        const res = createResponse();

        await BudgetController.getAll(req, res)
        const data = res._getJSONData()
        expect(data).toHaveLength(0);
        expect(res.statusCode).toBe(200);
        expect(res.statusCode).not.toBe(404);
    })

    it('should handle errors when fetching budgets', async () => {

        const req = createRequest({
            method: 'GET',
            url: '/api/v1/budgets',
            user: { id: 100 }
        })

        const res = createResponse();

        (Budget.findAll as jest.Mock).mockRejectedValue(new Error);
        await BudgetController.getAll(req, res)

        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({  error: 'Internal server error' })
    })
})

describe('BudgetController.create', () => {

    it('should create a new budget and respond whit statusCode 201', async () => {
        
        const mockBudget = {
            save: jest.fn().mockResolvedValue(true),
        };

        // Mock the Budget.create method to return the mockBudget
        (Budget.create as jest.Mock).mockResolvedValue(mockBudget);

        const req = createRequest({
            method: 'POST',
            url: '/api/v1/budgets',
            user: { id: 1},
            body: { name: 'Test Budget', amount: 1000 }
        })

        const res = createResponse();
        await  BudgetController.createBudget(req, res)

        const data = res._getJSONData()

        // Check that the response contains the expected data
        expect(res.statusCode).toBe(201);
        expect(data).toEqual({ message: 'Budget created successfully' });
        expect(mockBudget.save).toHaveBeenCalled(); // Ensure that the save method was called
        expect(Budget.create).toHaveBeenCalledWith(req.body); // Ensure that Budget.create was called with the correct body
        expect(mockBudget.save).toHaveBeenCalledTimes(1); // Ensure that save was called exactly once

    })

    it('should handle budget creation error whit statusCode 500', async () => {

        const mockBudget = {
            save: jest.fn(),  // simulate the instance method save
        };
    
        // Mock the Budget.create method to return the mockBudget
        (Budget.create as jest.Mock).mockResolvedValue(new Error);

        const req = createRequest({
            method: 'POST',
            url: '/api/v1/budgets',
            user: { id: 1},
            body: { name: 'Test Budget', amount: 1000 }
        })

        const res = createResponse();
        await  BudgetController.createBudget(req, res)

        const data = res._getJSONData()

        expect(res.statusCode).toBe(500);
        expect(data).toEqual({ error: 'Internal server error' });

        expect(mockBudget.save).not.toHaveBeenCalled(); // Ensure that the save method was not called
        expect(Budget.create).toHaveBeenCalledWith(req.body); // Ensure that Budget.create was called with the correct body
        
        
    })

})

describe('BudgetController.getById', () => {

    beforeEach(() => {
        (Budget.findByPk as jest.Mock).mockReset();
        (Budget.findByPk as jest.Mock).mockImplementation(( id ) => {
            const budget = budgets.filter(b => b.id === id)[0]
            return Promise.resolve(budget);

        })
    })

    it('should return a budget whit ID 1 and 3 expenses', async () => {
        
        const req = createRequest({
            method: 'GET',
            url: '/api/v1/budgets/:budgetId',
            budget: { id: 1 }
        })

        const res = createResponse();
        await  BudgetController.getById(req, res)

        const data = res._getJSONData()
        expect(res.statusCode).toBe(200)
        expect(data.expenses).toHaveLength(3);
        expect(data.id).toBe(1);
        expect(Budget.findByPk).toHaveBeenCalled();
        expect(Budget.findByPk).toHaveBeenCalledTimes(1);
        expect(Budget.findByPk).toHaveBeenCalledWith(req.budget.id,{
            include: [Expense]
        })
    })

    it('should return a budget whit ID 2 and 2 expenses', async () => {
        
        const req = createRequest({
            method: 'GET',
            url: '/api/v1/budgets/:id',
            budget: { id: 2 }
        })

        const res = createResponse();
        await  BudgetController.getById(req, res)

        const data = res._getJSONData()
        expect(res.statusCode).toBe(200)
        expect(data.expenses).toHaveLength(2);
        expect(data.id).toBe(2);
    })

    it('should return a budget whit ID 3 and 0 expenses', async () => {
        
        const req = createRequest({
            method: 'GET',
            url: '/api/v1/budgets/:id',
            budget: { id: 3 }
        })

        const res = createResponse();
        await  BudgetController.getById(req, res)

        const data = res._getJSONData()
        expect(res.statusCode).toBe(200)
        expect(data.expenses).toHaveLength(0);
        expect(data.id).toBe(3);
    })
})

describe('BudgetController.updateById', () => {
    it('should update the budget and return a success message', async () => {
        const budgetMock = {
            update: jest.fn().mockResolvedValue(true),
        }

        const req = createRequest({
            method: 'PUT',
            url: '/api/v1/budgets/:BudgetId',
            budget: budgetMock,
            body: { name: 'Updated Budget', amount: 5000 }
        })

        const res = createResponse();
        await  BudgetController.updateById(req, res)

        const data = res._getJSONData()
        expect(res.statusCode).toBe(200)
        expect(data).toEqual({ message: 'Budget updated successfully' })
        expect(budgetMock.update).toHaveBeenCalled()
        expect(budgetMock.update).toHaveBeenCalledWith(req.body)
        expect(budgetMock.update).toHaveBeenCalledTimes(1)
    })
})

describe('BudgetController.deleteById', () => {
    it('should delete the budget and return a success message', async () => {
        const budgetMock = {
            destroy: jest.fn().mockResolvedValue(true),
        }

        const req = createRequest({
            method: 'DELETE',
            url: '/api/v1/budgets/:BudgetId',
            budget: budgetMock
        })

        const res = createResponse();
        await  BudgetController.deleteById(req, res)

        const data = res._getJSONData()
        expect(res.statusCode).toBe(200)
        expect(data).toEqual({ message: 'Budget deleted successfully' })
        expect(budgetMock.destroy).toHaveBeenCalled()
        expect(budgetMock.destroy).toHaveBeenCalledTimes(1)
    })
})
