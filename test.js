/// <reference types="cypress" />

const request = require('supertest')('https://jsonplaceholder.typicode.com');
const requestHttpBin = require('supertest')('https://httpbin.org');
const assert = require('chai').assert;
const { expect } = require('chai')

describe('JsonPlaceHolder - Users API', () => {

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

describe('HttpBin - HTTP Methods', () => {

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

describe('HttpBin - AUTH Methods', () => {
  // Basic Auth
  it('GET /basic-auth/{user}/{passwd}', () => {
    const data = {
      user: 'luanalmeida',
      passwd: '10Fev1955*'
    }
    return requestHttpBin
    .get(`/basic-auth/${data.user}/${data.passwd}`)
    .auth(data.user, data.passwd)
    .expect(200)
  }).timeout(5000)

  // Digest Auth (not working)
  it.skip('GET /digest-auth/{qop}/{user}/{passwd}', () => {
    const data = {
      qop: 'auth',
      user: 'luanalmeida',
      passwd: '10Fev1955*'
    }
    return requestHttpBin
    .get(`/digest-auth/${data.qop}/${data.user}/${data.passwd}`, {
      'auth' : {
        'user': data.user,
        'pass': data.passwd,
        'sendImmediately': false
      }
    })
    .expect(200)
  }).timeout(5000)
})

describe('Status Code', () => {
  // Status Code Test - GET
  it('GET /status/{code}', () => {
    const data = {
      code: 200
    }

    return requestHttpBin
    .get(`/status/${data.code}`)
    .expect(data.code)
  }).timeout(5000)

  // Status Code Test - POST
  it('POST /status/{code}', () => {
    const data = {
      code: 200
    }

    return requestHttpBin
    .post(`/status/${data.code}`)
    .expect(data.code)
  }).timeout(5000)

  // Status Code Test - DELETE
  it('DELETE /status/{code}', () => {
    const data = {
      code: 300
    }

    return requestHttpBin
    .delete(`/status/${data.code}`)
    .expect(data.code)
  }).timeout(5000)

  // Status Code Test - PATCH
  it('PATCH /status/{code}', () => {
    const data = {
      code: 400
    }

    return requestHttpBin
    .patch(`/status/${data.code}`)
    .expect(data.code)
  }).timeout(5000)

  // Status Code Test - PUT
  it('PUT /status/{code}', () => {
    const data = {
      code: 500
    }

    return requestHttpBin
    .put(`/status/${data.code}`)
    .expect(data.code)
  }).timeout(5000)
})

describe('Request Inspection', () => {
  const dataProperty = {
    encoding: 'Accept-Encoding',
    origin: 'origin',
    userAgent: 'user-agent'
  }
  const dataValue = {
    encoding: 'gzip, deflate',
    ip1: '177.201.114.244',
    ip2: '187.4.158.252',
    agent: null // Its null because there is no agent for this test
  }

  // Return the incoming request's HTTP headers
  it('Headers', () => {
    return requestHttpBin
    .get('/headers')
    .expect(200)
    .then((res) => {
      // Assert that exists a body and it's not empty
      assert.isNotEmpty(res.body)
      // Assert that exists a property called Accept-Encoding
      assert.property(res.body.headers, dataProperty.encoding)
      // Assert value from property
      expect(res.body.headers).to.have.property(dataProperty.encoding).that.equals(dataValue.encoding)
    })
  }).timeout(5000)

  // Returns the requester's IP Address.
  it('IP', () => {
    return requestHttpBin
    .get('/ip')
    .expect(200)
    .then((res) => {
      // Assert that exists a body and it's not empty
      assert.isNotEmpty(res.body)
      // Assert that exists a property
      assert.property(res.body, dataProperty.origin)
      // Assert value from property (for some reason, there is two ip)
      expect(res.body).to.have.property(dataProperty.origin).that.is.oneOf([dataValue.ip1, dataValue.ip2])
    })
  }).timeout(5000)

  // Return the incoming requests's User-Agent header.
  it('User-Agent', () => {
    return requestHttpBin
    .get('/user-agent')
    .expect(200)
    .then((res) => {
      // Assert that exists a body and it's not empty
      assert.isNotEmpty(res.body)
      // Assert that exists a property
      assert.property(res.body, dataProperty.userAgent)
      // Assert value from property (for some reason, there is two ip)
      expect(res.body).to.have.property(dataProperty.userAgent).that.equals(dataValue.agent)
    })
  }).timeout(5000)

})