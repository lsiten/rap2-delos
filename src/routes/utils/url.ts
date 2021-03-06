let pathToRegexp = require('path-to-regexp')

export default class Pkg {

  public static getRelative = url => {
    if (!url || typeof url !== 'string') return
    url = url.toLowerCase()
    const prefixes = ['https://', 'http://']
    for (let item of prefixes) {
      if (url.indexOf(item) > -1) {
        url = url.substring(item.length)
        if (url.indexOf('/') > -1) {
          url = url.substring(url.indexOf('/'))
        } else {
          url = '/'
        }
        break
      }
    }
    if (url.indexOf('?') > -1) {
      url = url.substring(0, url.indexOf('?'))
    }
    return url
  }

  public static urlMatchesPattern = (url, pattern) => {
    url = Pkg.getRelative(url)
    pattern = Pkg.getRelative(pattern)
    let re = pathToRegexp(pattern)
    return re.test(url)
  }

}