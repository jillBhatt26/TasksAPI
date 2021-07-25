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

// swagger documentation

// COMPONENTS DECLARATION (SCHEMA DECLARATION)

/**
 * @swagger
 * components:
 *      schemas:
 *          Task:
 *              type: object
 *              required:
 *                  - id
 *                  - title
 *                  - status
 *                  - subtasks
 *                  - time
 *              properties:
 *                  id:
 *                      type: string
 *                      description: The auto-generated id from mongodb to identify a doc
 *                  title:
 *                      type: string
 *                      description: Task title
 *                  subtasks:
 *                      type: [string]
 *                      description: Array of sub tasks belonging to a task
 *                  time:
 *                      type: Date
 *                      description: Date timestamp when the task is created
 *
 */

// Tags are used to group the apis. There can be multiple tags in one project depending on the models

/**
 * @swagger
 * tags:
 *      name: Tasks
 *      description: The Tasks management API
 */

// API DOCUMENTATION

// NOTE: The route has to be exactly like the route specified in the application middleware
// EG: If the middleware has route like /api/tasks: that will be the home route here.

/**
 * @swagger
 * /:
 *      get:
 *          summary: Fetches all tasks documents
 *          tags: [Tasks]
 *          responses:
 *              200:
 *                  description: The list of all the tasks documents
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Task'
 */

router.get('/', FetchTasksAll);

/**
 * @swagger
 * /add:
 *      post:
 *          summary: Creates a new record of the Task
 *          tags: [Tasks]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Task'
 *                      example:
 *                          task: 'Go for a swim'
 *                          subtasks: 
 *                              - 'Do not forget your goggles'
 *                          status: true
 *          responses:
 *              200:
 *                  description: The new task object created in the mongoDB
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Task'

 *              500:
 *                  description: Error creating a new task document in the mongoDB
 */

router.post('/add', verifyAdmin, AddNewTask);

/**
 * @swagger
 * /update/{id}:
 *      put:
 *          summary: Finds a task and updates it with the values from the body
 *          tags: [Tasks]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: The id of the task document
 *
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Task'
 *
 *          responses:
 *              200:
 *                  description: The book was updated
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Task'
 *              404:
 *                  description: The book was not found
 *              500:
 *                  description: There was some error updating the book
 */

router.put('/update/:id', verifyAdmin, UpdateTask);

/**
 * @swagger
 * /delete/{id}:
 *      delete:
 *          summary: Delete the the task matching the id from the request params
 *          tags: [Tasks]
 *
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: The id of the task document to be deleted
 *
 *          responses:
 *              200:
 *                  description: The task was deleted successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Task'
 *
 *              404:
 *                  description: No tasks with the id found
 *
 *              500:
 *                  description: Error occurred while deleting the task
 */

router.delete('/delete/:id', verifyAdmin, DeleteTask);

router.put('/update/:id/sub/:sub_id', verifyAdmin, UpdateSubTask);

router.delete('/delete/:id/sub/:sub_id', verifyAdmin, DeleteSubTask);

module.exports = router;
