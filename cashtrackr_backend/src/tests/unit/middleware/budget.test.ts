import { createRequest, createResponse } from "node-mocks-http"
import { hasAccessToBudget, validateBudgeExists } from "../../../middlewares/budget"
import Budget from "../../../models/Budget"
import { budgets } from "../../mocks/budgets"

jest.mock('../../../models/Budget', () => ({
    findByPk: jest.fn(),
}))

describe('budget - validateBudgeExists', () => {

    it('should handle non-existent budget', async () => {

        (Budget.findByPk as jest.Mock).mockResolvedValue(null)

        const req = createRequest({
            params: { 
                budgetId: 1 
            } 
        })
        const res = createResponse()
        const next = jest.fn() // Mock next function 

        await validateBudgeExists(req, res, next)

        const data = res._getJSONData()
        expect(res.statusCode).toBe(404)
        expect(data).toEqual({ error: 'Budget not found' })
        expect(next).not.toHaveBeenCalled()        
    })

    it('should handle internal server error', async () => {

        (Budget.findByPk as jest.Mock).mockRejectedValue(new Error) // reject force to simulate an error (catch block)

        const req = createRequest({
            params: { 
                budgetId: 1 
            } 
        })
        const res = createResponse()
        const next = jest.fn() // Mock next function 

        await validateBudgeExists(req, res, next)

        const data = res._getJSONData()
        expect(res.statusCode).toBe(500)
        expect(data).toEqual({ error: 'Internal server error' })
        expect(next).not.toHaveBeenCalled()        
    })

    it('should proceed to next middleware if budget exists', async () => {
        (Budget.findByPk as jest.Mock).mockResolvedValue(budgets[0]) // Mocking a budget object

        const req = createRequest({
            params: { 
                budgetId: 1 
            } 
        })
        const res = createResponse()
        const next = jest.fn() 

        await validateBudgeExists(req, res, next)
        expect(next).toHaveBeenCalled() // Ensure next is called
        expect(req.budget).toEqual(budgets[0]) // Ensure budget is set
        expect(res.statusCode).toBe(200) // Ensure no error response is sent
    })
})

describe('budget - hasAccessToBudget', () => {
    it('should call next() if user access to budget', () => {
        const req = createRequest({
            budget: budgets[0], // Mocking a budget object
            user: { id: 1 } // Mocking a user object with matching id
        })
        const res = createResponse()
        const next = jest.fn()

        hasAccessToBudget(req, res, next)

        expect(next).toHaveBeenCalled() // Ensure next is called
        expect(next).toHaveBeenCalledTimes(1) // Ensure next is called only once
    })

    it('should return 401 error if userId does not have access to budget', () => {
        const req = createRequest({
            budget:budgets[0],
            user: { id: 2 }
        })
        const res = createResponse()
        const next = jest.fn()

        hasAccessToBudget(req, res, next)

        const data = res._getJSONData()
        expect(res.statusCode).toBe(401)
        expect(data).toEqual({ error: 'You do not have access to this budget'  })
        expect(next).not.toHaveBeenCalled() // Ensure next is not called
    })
})