const express = require('express');
const taskRoutes = require('./routes/taskRoutes');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
