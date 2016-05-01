'use strict'

/**
 * Module dependencies
 */

var utils = require('lazy-cache')(require)

/**
 * Temporarily re-assign `require` to trick browserify and
 * webpack into reconizing lazy dependencies.
 *
 * This tiny bit of ugliness has the huge dual advantage of
 * only loading modules that are actually called at some
 * point in the lifecycle of the application, whilst also
 * allowing browserify and webpack to find modules that
 * are depended on but never actually called.
 */

var fn = require
require = utils // eslint-disable-line no-undef, no-native-reassign

/**
 * Lazily required module dependencies
 */

require('extend-shallow', 'extend')
require('for-own')
require('kind-of')
require('use-ware', 'use')

/**
 * Restore `require`
 */

require = fn // eslint-disable-line no-undef, no-native-reassign

utils.postjsonParser = function postjsonParser (input) {
  function parse (value, tr) {
    utils.forOwn(value, function (val, key) {
      var node = {key: key, type: utils.kindOf(val)}
      if (node.type === 'array') {
        node.value = []
        val.forEach(function (item, idx) {
          item = utils.arrayify(item)
          node.value.push({key: idx, type: utils.kindOf(val), value: item})
        })
      } else if (node.type === 'object') {
        node.value = parse(val, [])
      } else {
        node.value = [val]
      }
      tr.push(node)
    })
    return tr
  }

  var tree = []
  return parse(input, tree)
}

/**
 * Render
 * @param  {[type]} tree [description]
 * @return {[type]}      [description]
 */
utils.postjsonRender = function postjsonRender (tree) {
  function render (tr, res) {
    utils.arrayify(tr).forEach(function (node, idx) {
      if (node.type === 'object') {
        res[node.key] = render(node.value, {})
        return
      }
      if (node.type === 'array') {
        res[node.key] = []
        node.value.forEach(function (item) {
          res[node.key].push(item.value[0])
        })
        return
      }
      if (node.value && node.value.length === 1) {
        res[node.key] = node.value[0]
        return
      }
      res[node.key] = node.value
    })
    return res
  }

  var json = {}
  return render(tree, json)
}

utils.arrayify = function arrayify (val) {
  if (!val) return []
  if (Array.isArray(val)) return val
  return [val]
}

/**
 * Expose `utils` modules
 */

module.exports = utils
