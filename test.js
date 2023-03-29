/// <reference types="cypress" />

const request = require('supertest')('https://jsonplaceholder.typicode.com');
const requestHttpBin = require('supertest')('https://httpbin.org');
const requestDemoQA = require('supertest')('https://demoqa.com')
const assert = require('chai').assert;
const { expect } = require('chai')
const fs = require('fs')

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
  }).timeout(10000)

  // Basic method - POST
  it('POST /post', () => {
    return requestHttpBin
    .post('/post')
    .expect(200)
  }).timeout(10000)

  // Basic method - DELETE
  it('DELETE /delete', () => {
    return requestHttpBin
    .delete('/delete')
    .expect(200)
  }).timeout(10000)

  // Basic method - PATCH
  it('PATCH /patch', () => {
    return requestHttpBin
    .patch('/patch')
    .expect(200)
  }).timeout(10000)

  // Basic method - PUT
  it('PUT /put', () => {
    return requestHttpBin
    .put('/put')
    .expect(200)
  }).timeout(10000)
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
  }).timeout(15000)

  // Status Code Test - POST
  it('POST /status/{code}', () => {
    const data = {
      code: 200
    }

    return requestHttpBin
    .post(`/status/${data.code}`)
    .expect(data.code)
  }).timeout(10000)

  // Status Code Test - DELETE
  it('DELETE /status/{code}', () => {
    const data = {
      code: 300
    }

    return requestHttpBin
    .delete(`/status/${data.code}`)
    .expect(data.code)
  }).timeout(10000)

  // Status Code Test - PATCH
  it('PATCH /status/{code}', () => {
    const data = {
      code: 400
    }

    return requestHttpBin
    .patch(`/status/${data.code}`)
    .expect(data.code)
  }).timeout(10000)

  // Status Code Test - PUT
  it('PUT /status/{code}', () => {
    const data = {
      code: 500
    }

    return requestHttpBin
    .put(`/status/${data.code}`)
    .expect(data.code)
  }).timeout(10000)
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
  it('GET /headers', () => {
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
  }).timeout(10000)

  // Returns the requester's IP Address.
  it('GET /ip', () => {
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
  }).timeout(10000)

  // Return the incoming requests's User-Agent header.
  it('GET /user-agent', () => {
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
  }).timeout(10000)

})

describe('Response Inspection', () => {
  const dataProperty = {
    cacheControl: 'cache-control'
  }
  const dataValue = {
    ttl: 10,
    cacheControl: 'public, max-age=10'
  }

  // Sets a Cache-Control header for n seconds
  it('GET /cache/{value} - Store Cache/Value', () => {
    return requestHttpBin
    .get(`/cache/${dataValue.ttl}`)
    .expect(200)
    .then(function(res){
      // Assert that exists the cache property
      assert.property(res.headers, dataProperty.cacheControl)
      // Assert cache value
      expect(res.headers).to.have.property(dataProperty.cacheControl).that.equals(dataValue.cacheControl)
    })
  }).timeout(15000)

  it('GET /cache/{value} - Return stored Cache/Value', () => {
    return requestHttpBin
    .get(`/cache/${dataValue.ttl}`)
    .expect(200)
    .then(function(res){
      // Assert that exists the cache property
      assert.property(res.headers, dataProperty.cacheControl)
      // Assert cache value
      expect(res.headers).to.have.property(dataProperty.cacheControl).that.equals(dataValue.cacheControl)
      // Send request again before cache timespan end
      return new Promise(function(resolve){
        setTimeout(function(){
          return requestHttpBin
          .get(`/cache/${dataValue.ttl}`)
          .expect(200)
          .then(function(res){
            // Assert that exists the cache property
            assert.property(res.headers, dataProperty.cacheControl)
            // Assert cache value
            expect(res.headers).to.have.property(dataProperty.cacheControl).that.equals(dataValue.cacheControl)
            resolve()
          })
        }, dataValue.ttl * 1000 / 2) // Send request again after half cache timespan
      })
    })
  }).timeout(15000)
})

describe('Response Formats', () => {
  const dataProperty = {
    slideshow: 'slideshow',
    slides: 'slides',
    deflate: 'deflated'
  }
  const dataValue = {
    expectedJson: require('./filesapi/slideshow.json'),
    deflate: true,
    allowedRobot: fs.readFileSync('./filesapi/allowedRobot.txt', 'utf8'),
    deniedRobot: fs.readFileSync('./filesapi/deniedRobot.txt', 'utf8')
  }

  it('GET /json - Read a simple JSON document', async () => {
    return requestHttpBin
    .get('/json')
    .expect(200)
    .then(function(res){
      // Assert that its an object
      expect(res.body).to.be.an('object')
      // Assert that slideshow property exists
      expect(res.body).to.have.property(dataProperty.slideshow)
      // Assert that slides property exists
      expect(res.body.slideshow).to.have.property(dataProperty.slides)
      // Assert content from previous json its equal the response
      expect(res.body.slideshow.slides).to.deep.equal(dataValue.expectedJson)
    })
  }).timeout(10000)

  it('GET /deflate - Returns Deflate-encoded data.', async () => {
    return requestHttpBin
    .get('/deflate')
    .expect(200)
    .then(function(res){
      // Assert that exists a body and it's not empty
      assert.isNotEmpty(res.body)
      // Assert that exists deflate property
      assert.property(res.body, dataProperty.deflate)
      // Assert that deflate is true
      expect(res.body).to.have.property(dataProperty.deflate).that.equals(dataValue.deflate)
    })
  }).timeout(10000)

  it('GET /robots.txt - Returns some robots.txt rules.', async () => {
    return requestHttpBin
    .get('/robots.txt')
    .expect(200)
    .expect('Content-Type', 'text/plain')
    .then(function(res){
      // Assert that exists a text and it's not empty
      assert.isNotEmpty(res.text)
      // Assert that the response text its the same as provided in the test
      expect(res.text).to.deep.equal(dataValue.allowedRobot)
      // Should have necessary directives
      assert.include(dataValue.allowedRobot, 'User-agent: *')
      assert.include(dataValue.allowedRobot, 'Disallow:')
      // Shouldn't have thoses directives
      assert.notInclude(dataValue.allowedRobot, 'Disallow: /\n')
      assert.notInclude(dataValue.allowedRobot, 'User-agent: BadBot')
    })
  }).timeout(10000)

  it('GET /deny - Returns page denied by robots.txt rules.', async () => {
    return requestHttpBin
    .get('/deny')
    .expect(200)
    .expect('Content-Type', 'text/plain')
    .then(function(res){
      // Assert that exists a text and it's not empty
      assert.isNotEmpty(res.text)
      // Assert that the response text its the same as provided in the test
      expect(res.text).to.deep.equal(dataValue.deniedRobot)
      // Should have text included
      assert.include(dataValue.deniedRobot, `YOU SHOULDN'T BE HERE`)
    })
  }).timeout(10000)
})

describe('Dynamic data', () => {
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
  const dataValue = {
    originalValue: 'SFRUUEJJTiBpcyBhd2Vzb21l',
    anyOtherValue: 'anyOtherValue'
  }

  // Test base64 with an valid value 
  it('GET /base64/{value} - Decodes base64url-encoded - Valid Value', async () => {
    return requestHttpBin
    .get(`/base64/${dataValue.originalValue}`)
    .expect(200)
    .then(function(res){
      // Assert the text with the correct value
      expect(res.text).to.deep.equal('HTTPBIN is awesome')
    })
  }).timeout(10000)

  // Test base64 with an invalid value 
  it('GET /base64/{value} - Decodes base64url-encoded - Invalid Value', async () => {
    return requestHttpBin
    .get(`/base64/${dataValue.anyOtherValue}`)
    .expect(200)
    .then(function(res){
      // Assert the text with the incorrect value
      expect(res.text).to.deep.equal('Incorrect Base64 data try: SFRUUEJJTiBpcyBhd2Vzb21l')
    })
  }).timeout(10000)

  // Return an UUID4 and assert if its valid
  it('GET /uuid - Return a UUID4', async () => {
    return requestHttpBin
    .get(`/uuid`)
    .expect(200)
    .then(function(res){
      // Assert its in 8-4-4-4-12 format
      assert.match(res.body.uuid, uuidRegex)
      // Assert its UUID version 4
      const version = res.body.uuid.charAt(14)
      assert.equal(version, '4')
    })
  }).timeout(10000)
})

describe('Cookies', () => {
  const dataValue = {
    cookieValue: 'luanAlmeida'
  }

  // Sets cookie(s) as provided by the query string and redirects to cookie list.
  it('GET /cookies/set - Set cookie(s)', function() {
    return requestHttpBin
    .get(`/cookies/set`)
    .query({nomeDoUsuario: dataValue.cookieValue})
    .expect(302)
    .then(function(res){
      assert.equal(res.header['set-cookie'][0],
       `nomeDoUsuario=${dataValue.cookieValue}; Path=/`)
    })
  }).timeout(10000)

  // Returns cookie data (couldn`t retrieve data from previously test block)
  it('GET /cookies - Returns cookie(s) data setted previously', function() {
    return requestHttpBin
    .get(`/cookies`)
    .set('Cookie', `nomeDoUsuario=${dataValue.cookieValue}`)
    .expect(200)
    .then(function(res){
      assert.property(res.body.cookies, 'nomeDoUsuario')
      assert.equal(res.body.cookies.nomeDoUsuario, dataValue.cookieValue)
    })
  }).timeout(10000)
})

describe('Images', () => {
  const dataValue = {
    cType: 'content-type',
    cLength: 'content-length',
    png: 'image/png',
    jpeg: 'image/jpeg',
    svg: 'image/svg',
    webp: 'image/webp',
  }

  // Returns a simple image of the type suggest by the Accept header.
  it('GET /image - Return a PNG image', function() {
    return requestHttpBin
    .get(`/image`)
    .expect(200)
    .then(function(res){
      // Assert that property content type exists
      assert.property(res.header, dataValue.cType)
      // Assert what content type the image is (in this case, png)
      assert.equal(res.header[dataValue.cType], dataValue.png)
      // Assert that the image has the same length in the header
      assert.equal(res.body.length, res.header[dataValue.cLength])
    })
  }).timeout(100000)

  // Returns a simple image from any imageType (jpeg, png, svg and webp)
  it('GET /image - Return a selected type image', function() {
    const imageType = 'png'
    const imageTypeValue = 'image/'+imageType

    return requestHttpBin
    .get(`/image/${imageType}`)
    .expect(200)
    .then(function(res){
      // Assert that property content type exists
      assert.property(res.header, dataValue.cType)
      // Assert what content type the image is
      assert.equal(res.header[dataValue.cType], imageTypeValue)
      // Assert that the image has the same length in the header
      assert.equal(res.body.length, res.header[dataValue.cLength])
    })
  }).timeout(100000)
})

describe('Redirect', () => {
  const targetUrl = 'https://www.google.com/'

  // 302/3XX Redirects to the given URL.
  it('GET /redirect-to - ', function() {
    return requestHttpBin
    .get(`/redirect-to?url=${targetUrl}`)
    .expect(302)
    .then(function(res){
      assert.equal(res.header['location'], targetUrl)
    })
  }).timeout(100000)
})

describe.only('Book Store API', () => {
  const userData = {
    userName: 'luanalmeida',
    password: '10Fev1955*'
  }
  const invalidUserData = {
    userName: 'teste',
    password: 'teste'
  }

  before(async function(){
    // API authentication to get valid access token
    const response = await requestDemoQA
    .post('/Account/v1/GenerateToken')
    .send(userData)
    // Store token for tests
    token = response.body.token
  })

  it('User Authentication - Valid User', function(){
    return requestDemoQA
    .post(`/Account/v1/Authorized`)
    .send(userData)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect(200) // Assert status code OK
  }).timeout(50000)

  it('User Authentication - Invalid User', function(){
    return requestDemoQA
    .post(`/Account/v1/Authorized`)
    .send(invalidUserData)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect(404) // Assert status code NOT FOUND
  }).timeout(50000)

  it('Generate Token - Valid User', function(){
    return requestDemoQA
    .post(`/Account/v1/GenerateToken`)
    .send(userData)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect(200)
    .then(function(res){
      // Assert that token exists
      assert.exists(res.body.token)
      // Assert that token has time to expires
      assert.exists(res.body.expires)
      // Assert that the request was successful
      assert.equal(res.body.status, 'Success')
      assert.equal(res.body.result, 'User authorized successfully.')
    })
  }).timeout(50000)

  it('Generate Token - Invalid User', function(){
    return requestDemoQA
    .post(`/Account/v1/GenerateToken`)
    .send(invalidUserData)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect(200)
    .then(function(res){
      // Assert that token doesn`t exists
      assert.notExists(res.body.token)
      // Assert that token expires time doesn`t exists
      assert.notExists(res.body.expires)
      // Assert that request failed
      assert.equal(res.body.status, 'Failed')
      assert.equal(res.body.result, 'User authorization failed.')
    })
  }).timeout(50000)
})