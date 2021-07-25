const express = require('express');
const taskRoutes = require('./routes/taskRoutes');
const mongoose = require('mongoose');

// swagger ui imports
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// swagger setup
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Tasks API',
            version: '1.0.0',
            description: 'Simple API to create TODO tasks'
        },
        servers: [
            {
                url: 'http://localhost:5000'
            }
        ]
    },
    apis: ['./routes/*.js']
};

const specs = swaggerJsDoc(options);

const dbURI = `mongodb://localhost:27017/tasks`;

mongoose
    .connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => {
        const PORT = 5000;

        app.listen(PORT, err => {
            if (err) console.log(err);
            else console.log('Server started on port 5000.');
        });
    })
    .catch(err => console.log(err));

app.use('/', taskRoutes);

// documentation route
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

module.exports = app;
