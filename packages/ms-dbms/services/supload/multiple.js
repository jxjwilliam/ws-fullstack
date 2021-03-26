const express = require('express')
const multer = require('multer')
const moment = require('moment')
const Uploads = require('../../models').Multiple

const router = express.Router()

module.exports = uploadsDir => {
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, uploadsDir)
    },
    filename: (req, file, callback) => {
      const today = moment(new Date()).format('YYYY-MM-DD')
      callback(null, `${file.originalname}_${today}`)
    },
  })

  const uploads = multer({ storage })

  router.get('/', (req, res, next) => {
    Uploads.findAll({ raw: true })
      .then(data => res.json(data))
      .catch(next)
  })

  router.get('/:id', (req, res, next) => {
    const { id } = req.params
    Uploads.findByPk(id, { raw: true })
      .then(data => res.json(data))
      .catch(next)
  })

  // 一次上载的文件查询。
  router.get('/name/:name', (req, res, next) => {
    Uploads.findAll(
      {
        where: { name: req.params.name },
        include: [{ all: true }],
      },
      { raw: true },
    )
      .then(data => res.json(data))
      .catch(next)
  })

  router.post('/', uploads.array('images', 4), (req, res, next) => {
    const { files } = req
    if (!files) {
      const error = new Error('请选择上传文件')
      error.httpStatusCode = 400
      return next(error)
    }

    res.send(files)

    //   files.forEach(file => {
    //     const fstat = {
    //       name: file.originalname,
    //       file_path: uploadsDir + '/uloads/' + file.originalname,
    //       field_name: file.fieldname,
    //       size: file.size,
    //       type: file.mimetype,
    //     };
    //     Uploads.create(fstat).then(r => console.log(fstat));
    //   });
  })

  return router
}
