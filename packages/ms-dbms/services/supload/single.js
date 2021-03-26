const express = require('express')
const multer = require('multer')
const fs = require('fs')
const Upload = require('../../models').Single

const router = express.Router()

const uploadTempDir = multer({ dest: '/tmp/' })

module.exports = uploadDir => {
  if (!fs.existsSync(uploadDir)) {
    console.log('creating dir: ', uploadDir)
    fs.mkdirSync(uploadDir, { recursive: true })
  }

  router.get('/', (req, res, next) => {
    Upload.findAll({ raw: true })
      .then(data => res.json(data))
      .catch(next)
  })

  router.get('/:id', (req, res, next) => {
    const { id } = req.params
    Upload.findByPk(id, { raw: true })
      .then(data => res.json(data))
      .catch(next)
  })

  router.get('/name/:name', (req, res, next) => {
    Upload.findAll(
      {
        where: { name: req.params.name },
        include: [{ all: true }],
      },
      { raw: true },
    )
      .then(data => res.json(data))
      .catch(next)
  })

  router.post('/', uploadTempDir.single('picture'), (req, res) => {
    /**
     * {  fieldname: 'picture',
          originalname: 'sample.png',
          encoding: '7bit',
          mimetype: 'image/png',
          destination: '/tmp/',
          filename: '0dc53d86843b19c1ed542f7fecfb6d39',
          path: '\\tmp\\0dc53d86843b19c1ed542f7fecfb6d39',
          size: 6410 }
     */
    const file = `${uploadDir}/${req.file.originalname}`
    fs.rename(req.file.path, file, function (err) {
      if (err) {
        console.log(err)
        res.sendStatus(500)
      } else {
        const fstat = req.file
        Upload.create({
          name: fstat.originalname,
          fieldname: fstat.fieldname,
          mimetype: fstat.mimetype,
          path: file,
          size: fstat.size,
        }).then(picture => {
          console.log('created: ', picture.get({ plain: true }))
          res.json(picture.get({ plain: true }))
        })
      }
    })
  })

  return router
}
