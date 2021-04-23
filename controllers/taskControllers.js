const Task = require('../models/Task');
const { subscribe } = require('../routes/taskRoutes');

const FetchTasksAll = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.json({ tasks });
    } catch (err) {
        res.json({ errMsg: err.message });
    }
};

const AddNewTask = async (req, res) => {
    // fetch admin info
    const isAdmin = req.isAdmin;

    if (isAdmin) {
        const { title, subtasks, status } = req.body;

        try {
            const newTask = await Task.create({
                title,
                status
            });

            // ['subTask', 'subtask1', 'subtask2']

            subtasks.forEach(async task => {
                await Task.findByIdAndUpdate(newTask._id, {
                    $addToSet: {
                        subtasks: {
                            title: task
                        }
                    }
                });
            });

            res.json({ msg: 'Task Added!' });
        } catch (err) {
            res.json({ errMsg: err.message });
        }
    } else {
        res.json({ errMsg: 'Admin rights only.' });
    }
};

const DeleteTask = async (req, res) => {
    const isAdmin = req.isAdmin;

    if (isAdmin) {
        const task_id = req.params.id;

        if (task_id) {
            try {
                await Task.findByIdAndDelete(task_id);

                res.json({ msg: 'Task deleted' });
            } catch (err) {
                res.json({ errMsg: err.message });
            }
        } else {
            res.json({ errMsg: 'Please send task id' });
        }
    } else {
        res.json({ errMsg: 'Admin rights only.' });
    }
};

const UpdateTask = async (req, res) => {
    const isAdmin = req.isAdmin;

    if (isAdmin) {
        const task_id = req.params.id;

        if (task_id) {
            const { toEditTitle, toEditStatus, toEditSubtasks } = req.body;

            try {
                await Task.findByIdAndUpdate(task_id, {
                    title: toEditTitle,
                    status: toEditStatus
                });

                toEditSubtasks.forEach(async task => {
                    await Task.findOneAndUpdate(
                        { _id: task_id },
                        {
                            $set: {
                                'subtasks.$.title': task
                            }
                        }
                    );
                });

                res.json({ msg: 'Task updated!' });
            } catch (err) {
                res.json({ errMsg: err.message });
            }
        } else {
            res.json({ errMsg: 'Please send task id.' });
        }
    } else {
        res.json({ errMsg: 'Admin rights only.' });
    }
};

const UpdateSubTask = async (req, res) => {
    const isAdmin = req.isAdmin;

    if (isAdmin) {
        const task_id = req.params.id;
        const sub_task_id = req.params.sub_id;

        const { toEditTask } = req.body;

        try {
            await Task.findOneAndUpdate(
                { _id: task_id, 'subtasks.id': sub_task_id },
                {
                    $set: {
                        'subtasks.$.title': toEditTask
                    }
                }
            );

            res.json({ msg: 'Sub task updated!' });
        } catch (err) {
            res.json({ errMsg: err.message });
        }
    } else {
        res.json({ errMsg: 'Admin rights only.' });
    }
};

const DeleteSubTask = async (req, res) => {};

module.exports = {
    FetchTasksAll,
    AddNewTask,
    DeleteTask,
    UpdateTask,
    UpdateSubTask,
    DeleteSubTask
};
