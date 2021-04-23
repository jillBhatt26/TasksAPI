const { Schema, model } = require('mongoose');

const TaskSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        subtasks: [
            {
                title: String
            }
        ],
        time: {
            type: Date,
            default: Date.now
        }
    },
    { timestamp: true }
);

const Task = model('Task', TaskSchema);

module.exports = Task;
