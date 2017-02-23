import express from 'express'
import {models} from './db'

const router = express.Router()

router.route('/models')
  .get(models.getAllModels)
  .post(models.createModel)

export default router
