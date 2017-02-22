import init from '../init'

const {db} = init

function getAllModels (req, res, next) {
  db.any('select * from models')
  .then(function (data) {
    res.status(200)
    .json(data)
  })
}

export default {
  getAllModels
}
