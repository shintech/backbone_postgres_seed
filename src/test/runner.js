import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../server'
import {init as db} from '../db'

chai.use(chaiHttp)

const expect = chai.expect
const request = chai.request(server)

function crudTest (props) {
  const model = props.model
  const url = props.url
  const properties = props.properties
  const postAttributes = props.postAttributes
  const putAttributes = props.putAttributes

  clearModels(model)
  checkData(model)
  postTest(model, url, postAttributes)
  getAllTest(model, url, properties, postAttributes)
  putTest(model, url, putAttributes)
  getSingleTest(model, url, properties, putAttributes)
  deleteTest(model, url)
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

function getAllTest (model, url, properties, object) {
  it('should get all ' + model + ' at ' + url + ' GET', function (done) {
    request
    .get(url)
    .end(function (err, res) {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(res).to.be.json
      expect(res.body[0]).to.have.property('id')
      for (var i = 0; i < properties.length; i++) {
        expect(res.body[0]).to.have.property(properties[i])
        expect(res.body[0][properties[i]]).to.equal(object[properties[i]])
      }
      done()
    })
  })
}

function putTest (model, url, object) {
  const name = model.slice(0, model.length - 1)
  it('should update a single ' + name + ' at ' + url + ' PUT', function (done) {
    request
    .get(url)
    .end(function (error, response) {
      expect(error).to.be.null
      request
      .put(url + response.body[0].id)
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

function getSingleTest (model, url, properties, object) {
  const name = model.slice(0, model.length - 1)
  it('should get a single ' + name + ' at ' + url + ' GET', function (done) {
    request
    .get(url)
    .end(function (error, response) {
      expect(error).to.be.null
      request
      .get(url + response.body[0].id)
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.have.property('id')
        for (var i = 0; i < properties.length; i++) {
          expect(res.body).to.have.property(properties[i])
          expect(res.body[properties[i]]).to.equal(object[properties[i]])
        }
        done()
      })
    })
  })
}

function deleteTest (model, url) {
  const name = model.slice(0, model.length - 1)
  it('should remove a single ' + name + ' at ' + url + ' DELETE', function (done) {
    request
    .get(url)
    .end(function (error, response) {
      expect(error).to.be.null
      request
      .delete(url + response.body[0].id)
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
