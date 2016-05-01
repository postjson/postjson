/*!
 * postjson <https://github.com/postjson/postjson>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var utils = require('./utils')

/**
 * > Initialize a PostJSON optionally with `plugins` and `options`.
 *
 * @param {Array|Function} `plugins`
 * @param {Object} `options`
 * @api public
 */

function PostJSON (plugins, options) {
  if (!(this instanceof PostJSON)) {
    return new PostJSON(plugins, options)
  }
  utils.use(this, {
    fn: function (app, options) {
      this.options = utils.extend(this.options, options)
    }
  })

  this.options = utils.extend({
    parser: utils.postjsonParser,
    render: utils.postjsonRender
  }, options || this.options)
  this.plugins = utils.arrayify(plugins)
}

/**
 * > Add a `fn` as plugin.
 *
 * @name   .use
 * @param  {Functio|Array} `fn`
 * @param  {Object}   `options`
 * @return {PostJSON} instance for chaining
 * @api public
 */

/**
 * > Parse a `str` to abstract syntax tree (AST) and writes
 * it to `.tree` property of the `this` instance.
 *
 * @param  {String} `str`
 * @param  {Object} `options`
 * @return {PostJSON} instance for chaining
 * @api public
 */

PostJSON.prototype.parse = function parse (val, options) {
  if (typeof val !== 'string' && typeof val !== 'object') {
    throw new TypeError('postjson.parse: expect `val` be string or object')
  }

  this.options = options ? utils.extend(this.options, options) : this.options
  this.value = typeof val === 'string' ? JSON.parse(val) : val
  this.tree = this.options.parser(this.value, this.options)
  return this
}

/**
 * > Render a given `tree`. Or you can just use it in combination
 * with `.parse(str)` which writes the `tree` to instance, then `.render`
 * will use it. If only one argument is passed it is assumed as `options`.
 *
 * @param  {Object} `tree` (optional) Abstract Syntax Tree, otherwise will use `this.tree`
 * @param  {Object} `options`
 * @return {PostJSON} instance for chaining
 * @api public
 */

PostJSON.prototype.render = function render (tree, options) {
  this.tree = typeof tree === 'object' && arguments.length > 1 ? tree : this.tree
  this.options = options ? utils.extend(this.options, options) : this.options
  this.json = this.options.render(this.tree, this.options)
  return this
}

/**
 * > Returns stringified and already modified JSON.
 *
 * @param  {Object} `indent`
 * @return {String}
 * @api public
 */

PostJSON.prototype.toString = function toString (indent) {
  return JSON.stringify(this.json, null, indent)
}

/**
 * > Transforms a `val` using previously passed plugins. Think for it
 * like `.parse` plus `.render` combination.
 *
 * @param  {String} `val`
 * @param  {Object} `options`
 * @return {PostJSON}
 * @api public
 */

PostJSON.prototype.process = function process (val, options) {
  this.parse(val, options)
  this.run(this.tree)
  return this.render(this.tree, this.options)
}

/**
 * > Temporary here, could be plugin. Part of future API sugars for working with AST.
 *
 * @param  {Object|Array} `tree`
 * @param  {Function} `fn`
 * @return {PostJSON}
 * @api public
 */

PostJSON.prototype.walk = function walk (tree, fn) {
  var self = this
  utils.arrayify(tree).forEach(function (node) {
    if (Array.isArray(node)) return self.walk(node, fn)
    fn(node)
  })
  return this
}

/**
 * Expose `PostJSON` instance
 *
 * @type {Object}
 * @api private
 */

module.exports = new PostJSON()

/**
 * Expose `PostJSON` constructor
 *
 * @type {Function}
 * @api private
 */

module.exports.PostJSON = PostJSON
