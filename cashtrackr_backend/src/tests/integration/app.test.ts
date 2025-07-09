import request from 'supertest';
import server from '../../server';
import { AuthController } from '../../controllers/AuthController';
import { AuthEmail } from '../../emails/AuthEmail';
import User from '../../models/User';
import * as authUtils from '../../utils/auth';
import * as jwtUtils from '../../utils/jwt';



describe('Authentication - Create Account', () => {
    
    it('should display validation errors when form is empty', async () => {
        const response = await request(server)
            .post('/api/v1/auth/create-account')
            .send({});
        const createAccountMock = jest.spyOn(AuthController, 'createAccount');

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(3);
        expect(createAccountMock).not.toHaveBeenCalled();
    })

    it('should return 400 when the email is invalid', async () => {
        const response = await request(server)
            .post('/api/v1/auth/create-account')
            .send({
                name: 'Test User',
                email: 'invalid-email',
                password: '12345678'
            });
        const createAccountMock = jest.spyOn(AuthController, 'createAccount');

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('Email is not valid');
        expect(createAccountMock).not.toHaveBeenCalled();
    })

    it('should return 400 status code when the password is less than 8 characters', async () => {
        const response = await request(server)
            .post('/api/v1/auth/create-account')
            .send({
                name: 'Test User',
                email: 'test@test.com',
                password: 'short'
            });
        const createAccountMock = jest.spyOn(AuthController, 'createAccount');

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('Password must be at least 8 characters long');
        expect(createAccountMock).not.toHaveBeenCalled();
    })

    it('should register a new user successfully', async () => {
        const userData = {
                name: 'Test User',
                email: 'test@test.com',
                password: 'password'
            };

        jest.spyOn(AuthEmail, 'sendConfirmationEmail').mockImplementation(() => Promise.resolve());

        const response = await request(server)
            .post('/api/v1/auth/create-account')
            .send(userData);


        expect(response.statusCode).toBe(201);
        expect(response.statusCode).not.toBe(400);
        expect(response.body).not.toHaveProperty('errors');
        
    })

    it('should return 409 conflict when a user is already registered', async () => {
        const userData = {
                name: 'Test User',
                email: 'test@test.com',
                password: 'password'
            };

        const response = await request(server)
            .post('/api/v1/auth/create-account')
            .send(userData);

        expect(response.statusCode).toBe(409);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Email already exists');
        expect(response.statusCode).not.toBe(400);
        expect(response.statusCode).not.toBe(201);
        expect(response.body).not.toHaveProperty('errors');
        
    })
})

describe('Authentication - Account Confirmation with Token', () => {
    
    it('should display error if token is empty or token is not valid', async () => {
        const response = await request(server)
            .post('/api/v1/auth/confirm-account')
            .send({
                token: 'not_valid_token'
            });
        
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('Token is not valid');
    })

    it('should display error if token doesnt exists', async () => {
        const response = await request(server)
            .post('/api/v1/auth/confirm-account')
            .send({
                token: '123456'
            });
        
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Invalid token');
        expect(response.statusCode).not.toBe(200);
    })

    it('should confirm account with a valid token', async () => {
        const token = globalThis.cashTrackrConfirmationToken

        const response = await request(server)
            .post('/api/v1/auth/confirm-account')
            .send({ token });
        
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('Account confirmed successfully');
            expect(response.statusCode).not.toBe(400);

    }) 
})

describe('Authentication - Login', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it('should display validation errors when form is empty', async () => {
        const response = await request(server)
            .post('/api/v1/auth/login')
            .send({});
        
        const loginMock = jest.spyOn(AuthController, 'login');

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(2);

        expect(response.body.errors).not.toHaveLength(1);
        expect(loginMock).not.toHaveBeenCalled();
    })

    it('should return 400 bad request when the email is invalid', async () => {
        const response = await request(server)
            .post('/api/v1/auth/login')
            .send({
                email: 'invalid-email',
                password: 'password'
            });
        
        const loginMock = jest.spyOn(AuthController, 'login');

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('Email is not valid');

        expect(response.body.errors).not.toHaveLength(2);
        expect(loginMock).not.toHaveBeenCalled();
    })

    it('should return a 400 error if the user is not found', async () => {
        const response = await request(server)
            .post('/api/v1/auth/login')
            .send({
                email: 'user_not_found@test.com',
                password: 'password'
            });
        
       

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('User not found');

        expect(response.statusCode).not.toBe(200);
        
    })

    // This test assumes that the user is not confirmed whit mock User
    it('should return a 403 error if the user account is not confirmed', async () => {

        (jest.spyOn(User, 'findOne') as jest.Mock)
            .mockResolvedValue({
                id: 1,
                confirmed: false,
                password: 'hashedPassword',
                email: 'user_not_confirmed@test.com'
            })

        const response = await request(server)
            .post('/api/v1/auth/login')
            .send({
                email: 'user_not_confirmed@test.com',
                password: 'password'
            });
        
       

        expect(response.statusCode).toBe(403);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('User account not confirmed');

        expect(response.statusCode).not.toBe(200);
        expect(response.statusCode).not.toBe(404);
        
    })

    /** this test assumes that the user is not confirmed
     * but creating a user in the database
     * i dont know when use mock or create a user in the database jet
     * investigate this later
     */
    it('should return a 403 error if the user account is not confirmed', async () => {

        const userData = {
            name: 'Test User',
            password: 'password',
            email: 'user_not_confirmed@test.com'
        }

        await request(server)
            .post('/api/v1/auth/create-account')
            .send(userData);

        const response = await request(server)
            .post('/api/v1/auth/login')
            .send({
                email: userData.email,
                password: userData.password
            });
        
       

        expect(response.statusCode).toBe(403);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('User account not confirmed');

        expect(response.statusCode).not.toBe(200);
        expect(response.statusCode).not.toBe(404);
        
    })

    it('should return a 401 error if the password is incorrect', async () => {

       const findOne = (jest.spyOn(User, 'findOne') as jest.Mock)
            .mockResolvedValue({
                id: 1,
                confirmed: true,
                password: 'hashedPassword',
            })
        
        const checkPassword = jest.spyOn(authUtils, 'checkPassword').mockResolvedValue(false);

        const response = await request(server)
            .post('/api/v1/auth/login')
            .send({
                email: 'test@test.com',
                password: 'wrongPassword'
            });
        
       

        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Incorrect password');

        expect(response.statusCode).not.toBe(200);
        expect(response.statusCode).not.toBe(404);
        expect(response.statusCode).not.toBe(403);

        expect(findOne).toHaveBeenCalledTimes(1);
        expect(checkPassword).toHaveBeenCalledTimes(1);
        
    })

    it('should return a jwt', async () => {

       const findOne = (jest.spyOn(User, 'findOne') as jest.Mock)
            .mockResolvedValue({
                id: 1,
                confirmed: true,
                password: 'hashedPassword',
            })
        
        const checkPassword = jest.spyOn(authUtils, 'checkPassword').mockResolvedValue(true);
        const generateJWT = jest.spyOn(jwtUtils, 'generateJWT').mockReturnValue('jwt_token');

        const response = await request(server)
            .post('/api/v1/auth/login')
            .send({
                email: 'test@test.com',
                password: 'correctPassword'
            });
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual('jwt_token');
        
        expect(findOne).toHaveBeenCalled();
        expect(findOne).toHaveBeenCalledTimes(1);

        expect(checkPassword).toHaveBeenCalled();
        expect(checkPassword).toHaveBeenCalledTimes(1);
        expect(checkPassword).toHaveBeenCalledWith('correctPassword', 'hashedPassword');

        expect(generateJWT).toHaveBeenCalled();
        expect(generateJWT).toHaveBeenCalledTimes(1);
        expect(generateJWT).toHaveBeenCalledWith(1); // Assuming the user ID is 1
        
    })
})


let jwt: string;

async function authenticateUser() {
        const response = await request(server)
            .post('/api/v1/auth/login')
            .send({
                email: 'test@test.com',
                password: 'password'
            });
        
            jwt = response.body; 
            expect(response.statusCode).toBe(200);
}

describe('GET /api/v1/budgets', () => {

    beforeAll(() => {
        jest.restoreAllMocks(); // Restores jest.spy functions to their original implementation
    })

    beforeAll( async () => {
        await authenticateUser();
    })

   
    it('should reject unauthenticated access to budgets without a jwt', async () => {

        const response = await request(server)
            .get('/api/v1/budgets');

        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Unauthorized');
    });

    it('should reject unauthenticated access to budgets without a valid jwt', async () => {

        const response = await request(server)
            .get('/api/v1/budgets')
            .auth('invalid_jwt', { type: 'bearer' });

        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Token is not valid');
    });

    it('should allow authenticated acces to budget with a valid jwt', async () => {

        const response = await request(server)
            .get('/api/v1/budgets')
            .auth(jwt, { type: 'bearer' });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(0); // Assuming no budgets are present
        expect(response.statusCode).not.toBe(401);
        expect(response.body.error).not.toBe('Unauthorized');
    });
})

describe('POST /api/v1/budgets', () => {

    beforeAll( async () => {
        await authenticateUser();
    })

    it('should reject unauthenticated POST req to budgets without a jwt', async () => {

        const response = await request(server)
            .post('/api/v1/budgets');

        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Unauthorized');
    });

    it('should display validation when the form is submitted with ivalid data', async () => {
        const response = await request(server)
            .post('/api/v1/budgets')
            .auth(jwt, { type: 'bearer' })
            .send({});

        const Errorslen = response.body.errors.length;

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(Errorslen).toBeGreaterThanOrEqual(1);
        expect(Errorslen).toBeLessThanOrEqual(4);
    })

    it('should create a budget if the user is authenticate with a 200 success', async () => {

        const response = await request(server)
            .post('/api/v1/budgets')
            .auth(jwt, { type: 'bearer' })
            .send({
                name: 'Test Budget',
                amount: 1000,
            });


        expect(response.statusCode).toBe(201);
        expect(response.statusCode).not.toBe(400);
        expect(response.body).not.toHaveProperty('errors');
    })

})

describe('GET /api/v1/budgets/:budgetId', () => {

    beforeAll( async () => {
        await authenticateUser();
    })

    it('should reject unauthenticated GET req to budget ID without a jwt', async () => {

        const response = await request(server)
            .get('/api/v1/budgets/1');

        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Unauthorized');
    });

    it('should return 400 bad request when id is not valid', async () => {

        const response = await request(server)
            .get('/api/v1/budgets/not_valid_id')
            .auth(jwt, { type: 'bearer' });


        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        
        expect(response.statusCode).not.toBe(401);
        expect(response.body.error).not.toBe('Unauthorized');
    });

    it('should return 404 not found when budget ID doest exist', async () => {

        const response = await request(server)
            .get('/api/v1/budgets/3000')
            .auth(jwt, { type: 'bearer' });


        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Budget not found');
        
        expect(response.statusCode).not.toBe(400);
        expect(response.statusCode).not.toBe(401);
    });

    it('should return a single budget by id', async () => {

        const response = await request(server)
            .get('/api/v1/budgets/1')
            .auth(jwt, { type: 'bearer' });

        
        expect(response.statusCode).toBe(200);


        expect(response.body).not.toHaveProperty('error');
        expect(response.body.error).not.toBe('Budget not found');   
        expect(response.statusCode).not.toBe(400);
        expect(response.statusCode).not.toBe(401);
        expect(response.statusCode).not.toBe(404);
    });
})

describe('PUT /api/v1/budgets/:budgetId', () => {

    beforeAll( async () => {
        await authenticateUser();
    })

    it('should reject unauthenticated PUT req to budget ID without a jwt', async () => {

        const response = await request(server)
            .put('/api/v1/budgets/1');

        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Unauthorized');
    });

    it('should display validation errors if the form is empty', async () => {

        const response = await request(server)
            .put('/api/v1/budgets/1')
            .auth(jwt, { type: 'bearer' })
            .send({});


        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('errors');

        const Errorslen = response.body.errors.length;
        expect(Errorslen).toBeGreaterThanOrEqual(1);
        expect(Errorslen).toBeLessThanOrEqual(4);
    });

    it('should update a budget by ID and return a success message', async () => {

        const response = await request(server)
            .put('/api/v1/budgets/1')
            .auth(jwt, { type: 'bearer' })
            .send({
                name: 'Updated Budget',
                amount: 1500,
            });


        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Budget updated successfully');
        expect(response.statusCode).not.toBe(400);

    });
})

describe('DELETE /api/v1/budgets/:budgetId', () => {

    beforeAll( async () => {
        await authenticateUser();
    })

    it('should reject unauthenticated DELETE req to budget ID without a jwt', async () => {

        const response = await request(server)
            .delete('/api/v1/budgets/1');

        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Unauthorized');
    });

    it('should return 404 not found when a budget doest exists', async () => {

        const response = await request(server)
            .delete('/api/v1/budgets/3000')
            .auth(jwt, { type: 'bearer' });



        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Budget not found');
    });

    it('should delete a budget and return a success message', async () => {

        const response = await request(server)
            .delete('/api/v1/budgets/1')
            .auth(jwt, { type: 'bearer' });



        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Budget deleted successfully');
        expect(response.statusCode).not.toBe(400);
        expect(response.statusCode).not.toBe(401);
        expect(response.statusCode).not.toBe(404);

    });
})