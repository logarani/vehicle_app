const request = require('supertest');
const router = require('./router');
const assert = require('assert');
const express = require('express');
var agent = require('superagent');

const app = express();

const  credential = {
    username : "staff1",
    password : "12345"
}

const dealers_url ="https://bb61co4l22.execute-api.us-west-2.amazonaws.com/development/dealers"

/*describe('GET /dashboard', function () {
    it('Validate dealers url', function (done) {
        request(app)
            .get('/dealers')
            .set('Accept', 'application/json')
            .expect('Content-Type', "text/html; charset=utf-8")
            .expect(404, done);
    });
 });*/
/*describe('GET /dashboard', function () {
    it('Validate dealers url response code', function (done) {
        request("https://bb61co4l22.execute-api.us-west-2.amazonaws.com")
          .get('/development/vehicles/122345')
          .expect(200)
          .expect('Content-Type', 'application/json')
          .end(function(err, res) {
            if (err) throw err;
          });
    });
});*/

/*
describe('GET /login', function () {
it('Validate dealers url response code', function (done) {

var user1 = agent.agent();
user1
  .post('http://localhost:3000/')
  .send({ user: 'staff1', password: '12345' })
  .end(function(err, res) {
    // user1 will manage its own cookies
    // res.redirects contains an Array of redirects
  });

    });
});*/
