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
                .end((err, res) => {
                    // errors test
                    expect(err).to.be.null;

                    // response status code test
                    expect(res.statusCode).to.equal(200);

                    // response body property test
                    expect(res.body).to.have.property('msg');

                    // response body property data type test
                    expect(res.body.msg).to.be.a('string');

                    done();
                });
        });
    });

    /**
     * Test: Update a task
     */
    describe('PUT: /update/:id', () => {});

    /**
     * Test: Delete a task
     */
    describe('DELETE: /delete/:id', () => {});
});
