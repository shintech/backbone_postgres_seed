import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../server'
import {init as db} from '../db'

chai.use(chaiHttp)

const expect = chai.expect
const request = chai.request(server)

let runTest = true

function crudTest (props) {
  const { model, url, postUrl, postAttributes, putAttributes, extProperties } = props
  const properties = Object.keys(postAttributes)

  before(function (done) {
    clearModels(model, done)
    checkData(model)
    if (!runTest) {
      throw new Error('Tests did not run...')
    }
  })

  beforeEach(function (done) {
    checkData(model)
    if (!runTest) {
      throw new Error('Tests did not run...')
    }
    createModel(model, postUrl, postAttributes, done)
  })

  afterEach(function (done) {
    clearModels(model, done)
    checkData(model)
    if (!runTest) {
      throw new Error('Tests did not run...')
    }
  })

  postTest(model, postUrl, postAttributes)
  getAllTest(model, url, properties, postAttributes, extProperties)
  putTest(model, url, postUrl, putAttributes)
  getSingleTest(model, url, postUrl, properties, postAttributes, extProperties)
  deleteTest(model, url, postUrl)
}

function clearModels (model, done) {
  db.none('TRUNCATE ' + model + ' RESTART IDENTITY')
  .then(function () {
    done()
  })
  .catch(function (err) {
    return done(err)
  })
}

function checkData (model) {
  return db.any('select * from ' + model)
  .then(function (data) {
    if (data.length > 0) {
      runTest = false
    }
  })
}

function createModel (model, url, object, done) {
  chai.request(server)
  .post(url)
  .send(object)
  .end(function (err, data) {
    if (err) console.log(err)
    done()
  })
}

/*eslint-disable */

function postTest (model, url, object) {
  const name = model.slice(0, model.length - 1)
  it('should create a ' + name + ' at ' + url + ' POST', function (done) {
    request
    .post(url)
    .send(object)
    .end(function (err, res) {
      expect(err).to.be.null 
      expect(res).to.have.status(200)
      expect(res).to.be.json
      expect(res.body).to.have.status('success')
      done()
    })
  })
}

function getAllTest (model, url, properties, object, extProperties) {
  it('should get all ' + model + ' at ' + url + ' GET', function (done) {
    request
    .get(url)
    .end(function (err, res) {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(res).to.be.json
      expect(res.body.models[0]).to.have.property('id')

      for (var i = 0; i < properties.length; i++) {
        expect(res.body.models[0]).to.have.property(properties[i])
        expect(res.body.models[0][properties[i]]).to.equal(object[properties[i]])
      }

      if (extProperties) {
        for (var t = 0; t < extProperties.length; t++) {
          expect(res.body.models[0]).to.have.property(extProperties[t])
        }
      }

      done()
    })
  })
}

function putTest (model, url, postUrl, object) {
  const name = model.slice(0, model.length - 1)
  it('should update a single ' + name + ' at ' + postUrl + ' PUT', function (done) {
    request
    .get(url)
    .end(function (error, response) {
      expect(error).to.be.null
      request
      .put(postUrl + response.body.models[0].id)
      .send(object)
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.have.status('success')
        done()
      })
    })
  })
}

function getSingleTest (model, url, postUrl, properties, object, extProperties) {
  const name = model.slice(0, model.length - 1)
  it('should get a single ' + name + ' at ' + url + ' GET', function (done) {
    request
    .get(url)
    .end(function (error, response) {
      expect(error).to.be.null
      request
      .get(postUrl + response.body.models[0].id)
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.have.property('id')

        for (var i = 0; i < properties.length; i++) {
          expect(res.body).to.have.property(properties[i])
          expect(res.body[properties[i]]).to.equal(object[properties[i]])
        }

        if (extProperties) {
          for (var t = 0; t < extProperties.length; t++) {
            expect(res.body).to.have.property(extProperties[t])
          }
        }

        done()
      })
    })
  })
}

function deleteTest (model, url, postUrl) {
  const name = model.slice(0, model.length - 1)
  it('should remove a single ' + name + ' at ' + url + ' DELETE', function (done) {
    request
    .get(url)
    .end(function (error, response) {
      expect(error).to.be.null
      request
      .delete(postUrl + response.body.models[0].id)
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res).to.be.json
        done()
      })
    })
  })
}

export default crudTest
