import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../server'
import {init as db} from '../db'

chai.use(chaiHttp)

const expect = chai.expect
const request = chai.request(server)

function runTests (model, properties, postAttributes, putAttributes) {
  clearModels(model)
  checkData(model)
  postTest(model, postAttributes)
  getAllTest(model, properties)
  updateTest(model, putAttributes)
  getSingleTest(model, properties)
  removeTest(model)
}

function clearModels (model) {
  it('should clear data', function (done) {
    db.none('TRUNCATE ' + model + ' RESTART IDENTITY')
    .then(function () {
      done()
    })
    .catch(function (err) {
      return done(err)
    })
  })
}

function checkData (model) {
  it('should not see data', function (done) {
    db.any('select * from ' + model)
    .then(function (data) {
      expect(data).to.deep.equal([])
      done()
    })
    .catch(function (err) {
      return done(err)
    })
  })
}

function postTest (model, object) {
  const name = model.slice(0, model.length - 1)
  it('should create a ' + name + ' at /api/' + model + ' POST', function (done) {
    request
    .post('/api/' + model)
    .send(object)
    .end(function (err, res) {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(res.body).to.have.status('success')
      done()
    })
  })
}

function getAllTest (model, properties) {
  it('should get all ' + model + ' at /api/' + model + ' GET', function (done) {
    request
    .get('/api/' + model)
    .end(function (err, res) {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      for (var i; i < properties.length; i++) {
        expect(res.body[0]).to.have.property(properties[i])
      }
      done()
    })
  })
}

function getSingleTest (model, properties) {
  const name = model.slice(0, model.length - 1)
  it('should get a single ' + name + ' at /api/' + model + ' GET', function (done) {
    request
    .get('/api/' + model)
    .end(function (error, response) {
      expect(error).to.be.null
      request
      .get('/api/' + model + '/' + response.body[0].id)
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        for (var i = 0; i < properties.length; i++) {
          expect(res.body).to.have.property(properties[i])
          expect(res.body + properties[i]).to.equal(response.body[0] + properties[i])
        }
        done()
      })
    })
  })
}

function updateTest (model, object) {
  const name = model.slice(0, model.length - 1)
  it('should update a single ' + name + ' at /api/' + model + ' PUT', function (done) {
    request
    .get('/api/' + model)
    .end(function (error, response) {
      expect(error).to.be.null
      request
      .put('/api/' + model + '/' + response.body[0].id)
      .send(object)
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body).to.have.status('success')
        done()
      })
    })
  })
}

function removeTest (model) {
  const name = model.slice(0, model.length - 1)
  it('should remove a single ' + name + ' at /api/' + model + ' DELETE', function (done) {
    request
    .get('/api/' + model)
    .end(function (error, response) {
      expect(error).to.be.null
      request
      .delete('/api/' + model + '/' + response.body[0].id)
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        done()
      })
    })
  })
}

export default runTests
