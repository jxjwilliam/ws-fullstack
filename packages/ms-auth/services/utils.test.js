const fetch = require('node-fetch')
const { expect } = require('chai')

describe('crud', () => {
  describe('create', () => {
    it('test status', done => {
      fetch('https://jsonplaceholder.typicode.com/todos/1').then(res => {
        // status=200, statusCode=undefined
        expect(res.status).to.equal(200)
        expect(res.statusText).to.equal('OK')
        done()
      })
    })
  })

  describe('read', () => {
    it('read', () => {
      expect(1 + 1).to.equal(2)
    })
  })

  describe('update', () => {
    it('update', () => {
      expect(1 + 1).to.equal(2)
    })
  })

  describe('delete', () => {
    it('delete', () => {
      expect(1 + 1).to.equal(2)
    })
  })
})
