import express from 'express'
import {models} from './db'

const router = express.Router()

router.route('/models')
  .get(models.getAllModels)

export default {
  router
}
