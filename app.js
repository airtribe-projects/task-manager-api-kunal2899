const express = require('express');
require('dotenv').config({ path: './.env' });
const app = express();

const tasksRouter = require('./routes/tasks/tasks.router');

const PORT = process.env.PORT || 3000;

// Routes
app.use('/v1/tasks', tasksRouter);

app.listen(PORT, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${PORT}`);
});



module.exports = app;