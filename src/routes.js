import express from 'express'
import {models, users} from './db'

export default function getRouter (options) {
  const router = express.Router()

// Models

  router.route('/models')
    .get(function (req, res, next) {
      models.getAllModels(req, res, next, options)
    })
    .post(function (req, res, next) {
      models.createModel(req, res, next, options)
    })

  router.route('/models/:id')
    .get(function (req, res, next) {
      models.getSingleModel(req, res, next, options)
    })
    .put(function (req, res, next) {
      models.updateSingleModel(req, res, next, options)
    })
    .delete(function (req, res, next) {
      models.removeModel(req, res, next, options)
    })

// Users

  router.route('/users')
    .get(function (req, res, next) {
      users.getAllUsers(req, res, next, options)
    })
    .post(function (req, res, next) {
      users.createUser(req, res, next, options)
    })

  router.route('/users/:id')
    .get(function (req, res, next) {
      users.getSingleUser(req, res, next, options)
    })
    .put(function (req, res, next) {
      users.updateUser(req, res, next, options)
    })
    .delete(function (req, res, next) {
      users.removeUser(req, res, next, options)
    })

  return router
}
