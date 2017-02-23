import {init as db} from '../'

function getAllModels (req, res, next) {
  db.any('select * from models')
  .then(function (data) {
    res.status(200)
    .json(data)
  })
}

function createModel (req, res, next) {
  db.none('insert into models( name )' + 'values( ${name} )', req.body) // eslint-disable-line
  .then(function () {
    res.status(200)
    .json({
      status: 'success',
      message: 'Inserted one model...'
    })
  })
  .catch(function (err) {
    return next(err)
  })
}

export default {
  getAllModels,
  createModel
}
