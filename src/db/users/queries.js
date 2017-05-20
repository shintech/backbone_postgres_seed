import {init as db} from '../'
import bcrypt from 'bcryptjs'

function getAllUsers (req, res, next, options) {
  db.any('select * from users')
  .then(function (data) {
    res.status(200)
    .json(data)
  })
  .catch(function (err) {
    return next(err)
  })
}

function getSingleUser (req, res, next, options) {
  var userID = parseInt(req.params.id)
  db.one('select * from users where id = $1', userID)
    .then(function (data) {
      res.status(200)
       .json(data)
    })
    .catch(function (err) {
      return next(err)
    })
}

function createUser (req, res, next, options) {
  const encryptedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)

  db.none('insert into users( username, password )' + 'values( $1, $2 )', [req.body.username, encryptedPassword]) // eslint-disable-line
  .then(function () {
    res.status(200)
    .json({
      status: 'success',
      message: 'Inserted ONE user'
    })
  })
  .catch(function (err) {
    return next(err)
  })
}

function updateUser (req, res, next, options) {
  const encryptedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)

  db.none('update users set password=$1 where id=$2', [encryptedPassword, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated user'
        })
    })
    .catch(function (err) {
      return next(err)
    })
}

function removeUser (req, res, next, options) {
  var userID = parseInt(req.params.id)
  db.result('delete from users where id = $1', userID)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} user`
        })
    })
    .catch(function (err) {
      return next(err)
    })
}

export default {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  removeUser
}