import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../server'
import {init as db} from '../db'

chai.use(chaiHttp)

const expect = chai.expect
const request = chai.request(server)

describe('Clear days ...', function (done) {
  beforeEach(function (done) {
    db.none('TRUNCATE models RESTART IDENTITY')
    .then(function () {
      done()
    })
    .catch(function (err) {
      return done(err)
    })
  })

  it('should not see data', function (done) {
    db.any('select * from models')
    .then(function (data) {
      expect(data).to.deep.equal([])
      done()
    })
    .catch(function (err) {
      return done(err)
    })
  })
})

describe('Models', function () {
  it('should create a model at /api/models POST', function (done) {
    request
    .post('/api/models')
    .send({ 'name': 'test' })
    .end(function (err, res) {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(res.body).to.have.status('success')
      done()
    })
  })

  it('should get all models at /api/models GET', function (done) {
    request
    .get('/api/models')
    .end(function (err, res) {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(res.body[0]).to.have.property('id')
      done()
    })
  })
})
