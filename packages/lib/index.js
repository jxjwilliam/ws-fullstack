function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

function showGroup(content, title = '') {
  console.group(`👋 👏 ${title}`)
  console.log('%c prev', 'color: gray', content)
  console.log('%c current', 'color: red', content)
  console.log('%c next', 'color: green', content)
  console.groupEnd()
}

// object is empty?
const isEmpty = prop =>
  prop === null ||
  prop === undefined ||
  // eslint-disable-next-line no-prototype-builtins
  (prop.hasOwnProperty('length') && prop.length === 0) ||
  (prop.constructor === Object && Object.keys(prop).length === 0)

function defer(callback, ms = 2000) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        if (typeof callback === 'function') callback()
        resolve()
      }, ms)
    } catch (error) {
      reject(error)
    }
  })
}

export { showGroup, capitalize, isEmpty, defer }
