const mongoose = require('mongoose');
const server = 'http://localhost:8080';
const request = require('supertest');


describe('Route Integration', () => {
  describe('/', () => {
    describe ('GET', () => {
      it('responds with a 200 status and text/html content type', () => { \
        return request(server)
        .get('/')
        .expect('Content-Type', /text\/html/)
        .expect(200);
      })
    })
  })
  describe('/api', () => {
    describe('GET', ()=> {
        it('responds with a 200 status and a json object', () => { request(server)
          
        })
    })
  })
})