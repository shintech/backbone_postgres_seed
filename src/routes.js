import express from 'express'
import {models} from './db'

const router = express.Router()

router.route('/models')
  .get(models.getAllModels)
  .post(models.createModel)

router.route('/models/:id')
  .get(models.getSingleModel)

export default router
