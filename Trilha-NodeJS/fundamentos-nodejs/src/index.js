const express = require('express');

const app = express();

app.use(express.json());

app.get('/courses', (req, res) => {
    const query = req.query;
    console.log(query);
    return res.json(['curso01', 'curso02', 'curso03']);
})

app.post('/courses', (req, res) => {
    const body = req.body;
    console.log(body);
    return res.json(['curso01', 'curso02', 'curso03', 'curso04'])
})

app.put('/courses/:id', (req, res) => {
    const {id} = req.params;
    console.log(id);
    return res.json(['curso06', 'curso02', 'curso03', 'curso04'])
})

app.patch('/courses/:id', (req, res) => {
    return res.json(['curso01', 'curso07', 'curso03', 'curso04'])
})

app.delete('/courses/:id', (req, res) => {
    return res.json(['curso01', 'curso02', 'curso04'])
})

app.listen(3333)

