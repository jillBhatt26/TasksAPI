const { Router } = require('express');
const {
    FetchTasksAll,
    AddNewTask,
    UpdateTask,
    DeleteTask,
    UpdateSubTask,
    DeleteSubTask
} = require('../controllers/taskControllers');

const verifyAdmin = require('../middleware/VerifyAdmin');

const router = Router();

router.get('/', FetchTasksAll);

router.post('/add', verifyAdmin, AddNewTask);

router.put('/update/:id', verifyAdmin, UpdateTask);

router.delete('/delete/:id', verifyAdmin, DeleteTask);

router.put('/update/:id/sub/:sub_id', verifyAdmin, UpdateSubTask);

router.delete('/delete/:id/sub/:sub_id', verifyAdmin, DeleteSubTask);

module.exports = router;
