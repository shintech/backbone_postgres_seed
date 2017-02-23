import chai from 'chai'
import chaiHttp from 'chai-http'
import initServer from '../server'
import {init} from '../db'

chai.use(chaiHttp)

const {server} = initServer
const {db} = init
const expect = chai.expect
const request = chai.request(server)

describe('Clear days ...', function (done) {
  beforeEach(function (done) {
    db.none('TRUNCATE models RESTART IDENTITY')
    done()
  })

  it('should not see data', function (done) {
    db.any('select * from models')
    .then(function (data) {
      expect(data).to.deep.equal([])
      done()
    })
  })
})

describe('Models', function () {
  it('should get all models at /api/models GET', function (done) {
    request
    .get('/api/models')
    .end(function (err, res) {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      done()
    })
  })
})
