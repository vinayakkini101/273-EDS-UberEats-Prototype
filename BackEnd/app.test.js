let assert = require('assert');
let should = require('should');
let supertest = require('supertest');

let server = supertest.agent('http://localhost:3000');

describe('Backend Test', function() {
    it('should login', function(done) {
        server
            .post('/login')
            .send({
                email: 'vinayakkini101@gmail.com',
                password: 'password@123'
            })
            .expect(200)
            .end(function(err, res) {
                console.log('Status: ', res.status);
                res.status.should.equal(200);
                done();
            });
    });

    it('should view customer profile', function(done) {
        server
            .post('/getCustomerProfile')
            .send({
                customerEmail: 'johnsmith@gmail.com'
            })
            .expect(200)
            .end(function(err, res) {
                console.log('Status: ', res.status);
                res.status.should.equal(200);
                done();
            })
    })

    it('should get dishes', function(done) {
        server
            .get('/getAllDishes')
            .send({
                restaurantEmail: 'chipotle@gmail.com'
            })
            .expect(200)
            .end(function(err, res) {
                console.log('Status: ', res.status);
                res.status.should.equal(200);
                done();
            })
    })

    it('should get orders', function(done) {
        server
            .post('/getOrders')
            .send({
                customerEmail: 'akshayjain@gmail.com',
                restaurantName: 'chipotle@gmail.com'
            })
            .expect(200)
            .end(function(err, res) {
                console.log('Status: ', res.status);
                console.log('Response text: ', res.text);
                res.status.should.equal(200);
                done();
            })
    })

    it('should get restaurants', function(done) {
        server
            .post('/getAllRestaurants')
            .expect(200)
            .end(function(err, res) {
                console.log('Status: ', res.status);
                // console.log('Response text: ', res.text);
                res.status.should.equal(200);
                done();
            })
    })
})