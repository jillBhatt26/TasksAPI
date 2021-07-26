// imports
const chai = require('chai');
const chaiHttp = require('chai-http');

// NOTE: Import the serve file as well
const server = require('../server');

// Assertion style definition
chai.expect(); // accepted: should, equals, assert

chai.use(chaiHttp);

// Fetch expect function from chai
const { expect } = chai;

// Tests Definitions

describe('Tasks API', () => {
    /**
     * Test: Get tasks all
     */
    describe('GET: /', () => {
        it('Should Fetch all the tasks from mongoDB', done => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    // errors test
                    expect(err).to.be.null;

                    // response status code test
                    expect(res.statusCode).to.equal(200);

                    // response body properties test
                    expect(res.body).to.have.property('tasks');

                    // response body data type test
                    expect(res.body.tasks).to.be.an('array');

                    // call the done method once the tests are completed
                    done();
                });
        });
    });

    /**
     * Test: Create a new task
     */
    describe('POST: /add', () => {
        it('Should create a new task document in mongoDB', done => {
            // send the request using chai http module
            chai.request(server)
                .post('/add')
                .send({
                    task: 'New Task 1',
                    subTasks: ['Sub Task 1'],
                    status: false
                })
                .end((err, res) => {
                    // errors test
                    expect(err).to.be.null;

                    // response status code test
                    expect(res.statusCode).to.equal(200);

                    // response body keys test
                    expect(res.body).to.have.any.keys('errMsg', 'msg');

                    // response body properties data type test
                    if (res.body.errMsg) {
                        expect(res.body.errMsg).to.be.a('string');
                    }

                    if (res.body.msg) {
                        expect(res.body.msg).to.be.a('string');
                    }

                    done();
                });
        });
    });

    /**
     * Test: Update a task
     */
    describe('PUT: /update/:id', () => {
        it('Should update the task with the given id', done => {
            // send the request using chaiHttp
            chai.request(server)
                .put('/update/:id')
                .send({
                    task: 'New Task 1',
                    subTasks: ['Sub Task 1', 'Sub Task 2'],
                    status: false
                })
                .end((err, res) => {
                    // check for no errors
                    expect(err).to.be.null;

                    // check for correct response status code
                    expect(res.statusCode).to.be.equal(200);

                    // check for correct properties
                    expect(res.body).to.have.any.keys('msg', 'errMsg');

                    // Check for correct properties data types
                    if (res.body.msg) {
                        expect(res.body.msg).to.be.a('string');
                    }
                    if (res.body.errMsg) {
                        expect(res.body.errMsg).to.be.a('string');
                    }

                    // Finish the test using done method
                    done();
                });
        });
    });

    /**
     * Test: Delete a task
     */
    describe('DELETE: /delete/:id', () => {
        it('Should delete a task with the given id', done => {
            chai.request(server)
                .delete('/delete/:id')
                .end((err, res) => {
                    // check for no errors
                    expect(err).to.be.null;

                    // check for correct response code
                    expect(res.statusCode).to.equal(200);

                    // check for correct properties in the response body
                    expect(res.body).to.have.any.keys('msg', 'errMsg');

                    // check for correct data types of the properties in the response body
                    if (res.body.msg) {
                        expect(res.body.msg).to.be.a('string');
                    }

                    if (res.body.errMsg) {
                        expect(res.body.errMsg).to.be.a('string');
                    }

                    // finish the end function with done method
                    done();
                });
        });
    });
});
