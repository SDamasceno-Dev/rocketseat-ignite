/**
 * @file: index
 * @description: Initial file of API
 */

// Dependencies import
const express = require('express');
const { v4: uuidv4 } = require('uuid');

// Fake BD
const customers = []

/**
 * Midlleware
 * function middleware01 (req, res, next) {
 *  ...code
 * }
 * 1- Pode ser usado diretamente nas requisições
 * Ex.: app.get('/route', middleware01, middleware02,(req, res) => {...})
 * 
 * 2- Pode ser aplicado diretamente em todas as chamadas abaixo do app.use()
 * Ex.: 
 * app.use(middleware01)
 * app.get (...)
 * app.post (...)
 * 
 * Obs.: nas requisições abaixo do app.use automaticamente tem o middleware aplicado
 */

// Middleware
function verifyIfExistsAccountITR (req, res, next) {
    const {itr} = req.headers;

    const customer = customers.find((i) => i.itr === itr);

    if (!customer) {
        return res.status(400).json({error: `Customer not found`});
    }

    req.customer = customer;

    return next();
}

/**  Functions  * */

function getBalance (statement) {
    const balance = statement.reduce((acc, operation) => {
        if (operation.type === 'Credit') {
            return acc + operation.amount;
        } else {
            return acc - operation.amount;
        }
    }, 0);

    return balance;
}

const app = express();

app.use(express.json());

/**  Routes  * */

// Create an account
app.post(`/account`, (req, res) => {
    const {itr, name} = req.body;

    // Verify if itr is already used
    const customerAlreadyExists = customers.some((i) => i.itr === itr);
    if (customerAlreadyExists) {
        return res.status(400).json({error: `Customer already exists.`})
    }

    customers.push({
        itr, name, 
        id: uuidv4(), 
        statement: []
    })
    
    return res.status(201).send()
});

// Update account
app.put('/account', verifyIfExistsAccountITR, (req, res) => {
    const { name } = req.body;
    const { customer } = req;

    customer.name = name;

    return res.status(201).send();
});

// Get an account info
app.get('/account', verifyIfExistsAccountITR, (req, res) => {
    const { customer } = req;

    return res.json(customer);
});

// Get all accounts
app.get('/account/all', (req, res) => {

    return res.json(customers);
});

// Delete an account
app.delete('/account', verifyIfExistsAccountITR, (req, res) => {
    const { customer } = req;

    const indexCustomer = customers.findIndex(item => item.itr === customer.itr);

    customers.splice(indexCustomer, 1);

    return res.status(200).json(customers);
});

// Get user statement
app.get(`/statement`, verifyIfExistsAccountITR, (req,res) => {
    
    const {customer} = req;

    return res.json(customer.statement);
});

// Get user statement on Date
app.get(`/statement/date`, verifyIfExistsAccountITR, (req,res) => {
    const { customer } = req;
    const { date } = req.query;
    const dateFormat = new Date(date + ' 00:00');    // Allow search a item in all time of date
    const statementFound = customer.statement.filter((statement) => statement.created_at.toDateString() === new Date(dateFormat).toDateString());

    return res.json(statementFound);
});

// Make a deposit
app.post('/deposit', verifyIfExistsAccountITR, (req, res) => {
    const { amount, description } = req.body;

    const { customer } = req;

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: 'Credit',
    };

    customer.statement.push(statementOperation);

    return res.status(201).send();

});

// Make a withdraw
app.post('/withdraw', verifyIfExistsAccountITR, (req, res) => {
    const { amount } = req.body;

    const { customer } = req;

    const balance = getBalance(customer.statement);

    if (balance < amount) {
        return res.status(400).json({error: `Insuficiente funds.`})
    }

    const statementOperantion = {
        amount,
        create_at: new Date(),
        type: 'Debit'
    }

    customer.statement.push(statementOperantion);

    return res.status(201).send();
});

// Get Balance
app.get('/balance', verifyIfExistsAccountITR, (req, res) => {
    const { customer } = req;

    const balance = getBalance(customer.statement);

    return res.json(balance);
});


app.listen(3333);