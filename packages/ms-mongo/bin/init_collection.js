const mongoose = require('mongoose')
const config = require('../config')
const InterestRates = require('../models/interest_rates')

const MONGO_URL = config['shanmei-rongdan']
mongoose
  .connect(MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log(`連接成功：${MONGO_URL}`))
  .then(() => {
    const irs = new InterestRates({
      rates: [
        { min_amount: 0, max_amount: 1000000, synthesis_rate: '10' },
        { min_amount: 1000000, max_amount: 5000000, synthesis_rate: '12' },
        { min_amount: 5000000, max_amount: '', synthesis_rate: '13' },
      ],
      auth: {},
    })

    irs.save((err, doc) => {
      if (err) console.log(err)
      else console.log(doc, doc === irs)
      mongoose.connection.close()
    })
  })
  .catch(function (reason) {
    console.log('Unable to connect to the mongodb instance. Error: ', reason)
  })
