const express = require('express')
const multer = require('multer')
const moment = require('moment')
const { Photo } = require('../../models')

const router = express.Router()

module.exports = photoDir => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, photoDir)
    },
    filename: (req, file, cb) => {
      const today = moment(new Date()).format('YYYY-MM-DD')
      cb(null, `${file.fieldname}_${today}.jpg`)
    },
  })

  const upload = multer({ storage })

  // https://levelup.gitconnected.com/how-to-upload-files-with-react-and-node-js-a622b4594bb9

  router.get('/', async (req, res, next) => {
    const photos = await Photo.findAll()
    res.json(photos)
  })

  router.post('/add', upload.single('photo'), async (req, res, next) => {
    try {
      const { path } = req.file
      const { name, description } = req.body
      const entry = await Photo.create({
        name,
        description,
        photoPath: path,
      })
      res.json(entry)
    } catch (ex) {
      res.status(400).send({ error: ex })
    }
  })

  router.put('/edit', upload.single('photo'), async (req, res, next) => {
    try {
      const path = req.file && req.file.path
      const { id, name, description } = req.body
      let params = {}
      if (path) {
        params = {
          name,
          description,
          photoPath: path,
        }
      } else {
        params = {
          name,
          description,
        }
      }
      const photo = await Photo.update(params, {
        where: {
          id,
        },
      })
      res.json(photo)
    } catch (ex) {
      res.status(400).send({ error: ex })
    }
  })

  router.delete('/delete/:id', async (req, res, next) => {
    const { id } = req.params
    await Photo.destroy({
      where: {
        id,
      },
    })
    res.json({ deleted: id })
  })

  return router
}
