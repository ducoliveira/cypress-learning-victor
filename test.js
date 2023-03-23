/// <reference types="cypress" />

const request = require('supertest')('https://jsonplaceholder.typicode.com');
const requestHttpBin = require('supertest')('https://httpbin.org/');
const assert = require('chai').assert;

describe('Users API - JsonPlaceHolder', () => {

  // Make a GET request to the users route
  it('GET /users', () => {
    return request
    .get('/users')
    .expect(200)
    .then((res) => {
      assert.isNotEmpty(res.body)
    })
  })

  // Make a POST request to the users route
  it('POST /users', () => {
    const data ={
      name: 'Luan Almeida',
      email: 'luan_almeida@gmail.com'
    }
    return request
    .post('/users')
    .send(data) // send payload data
    .then((res) => {
      assert.hasAnyKeys(res.body, 'id')
      assert.equal(res.body.name, data.name)
      assert.equal(res.body.email, data.email)
    })
  })

  // Make a PUT request to the users route within User 1
  it('PUT /users/:id', () => {
    const data ={
      email: 'luanalmeida@gmail.com'
    }
    return request
    .put('/users/1')
    .send(data)
    .then((res) => {
      assert.equal(res.body.email, data.email)
    })
  })

  // Make a DELETE request to the users route within User 1
  it('DELETE /users/:id', () => {
    return request
    .delete('/users/1')
    .then((res) => {
      assert.isEmpty(res.body)
    })
  })
})

describe('HttpBin', () => {

  // Basic method - GET
  it('GET /get', () => {
    return requestHttpBin
    .get('/get')
    .expect(200)
  })

  // Basic method - POST
  it('POST /post', () => {
    return requestHttpBin
    .post('/post')
    .expect(200)
  })

  // Basic method - DELETE
  it('DELETE /delete', () => {
    return requestHttpBin
    .delete('/delete')
    .expect(200)
  })

  // Basic method - PATCH
  it('PATCH /patch', () => {
    return requestHttpBin
    .patch('/patch')
    .expect(200)
  })

  // Basic method - PUT
  it('PUT /put', () => {
    return requestHttpBin
    .put('/put')
    .expect(200)
  })
})