/*!
 * postjson <https://github.com/postjson/postjson>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

// // var postjson = require('./index')
// var PostJSON = require('./index').PostJSON
// var forOwn = require('for-own')
// var stringify = require('stringify-author')
// var set = require('set-value')
// var get = require('get-value')

// var fixture = {
//   name: 'postjson',
//   version: '0.1.1',
//   description: 'Transforming JSON with plugins.',
//   repository: 'postjson/postjson',
//   'verb.run': true,
//   'verb.lint.reflinks': true,
//   'verb.tasks': ['readme'],
//   date: Date.now(),
//   toUpperCase: function (input) {
//     if (typeof input !== 'string') throw new TypeError('expect a string')
//     return input.toUpperCase()
//   },
//   author: {
//     name: 'Charlike Mike Reagent',
//     url: 'http://www.tunnckocore.tk'
//   }
// }

// // var app = postjson.process(obj)

// // console.log(app.toString(2)) // modified indented with JSON.stringify
// // console.log(app.value) // incoming value, not modified
// // console.log(app.json) // modified
// // console.log(app.json.license) // Apache2

// var app = new PostJSON({
//   parser: function customParser (input, app) {
//     app.plugins.forEach(function (plugin) {
//       forOwn(input, plugin)
//     })
//     return input
//   }
// })

/*

app
  .use(function stringifyAuthor () {
    return function (value, key, obj) {
      if (key === 'author') {
        set(obj, key, stringify(value))
      }
    }
  })
  .use(function expandDotNotation (app) {
    return function (value, key, obj) {
      if (key.indexOf('.') !== -1) {
        set(obj, key, value)
        delete obj[key]
      }
    }
  })
  .use(function transformFunctions (app) {
    return function (val, key, o, done) {
      if (typeof val !== 'function') return
      val.apply(app, arguments)
    }
  })
  .use(plugin(opts))

*/

// var fs = require('fs')
var ctrl = require('async')
var AsyncBaseIterator = require('async-base-iterator').AsyncBaseIterator
var ctx = {foo: 'app'}
var base = new AsyncBaseIterator({
  settle: true,
  context: ctx,
  params: [{bar: 'qux'}],
  letta: require('letta')
})

ctrl.mapSeries([
  function one (/* app, done */) { return 1 },
  function two (app/*, done */, done) { done(null, 2) },
  function three (app/*, done */) { return 3 },
  function four (app/*, done */) {
    return function (comment/*, done */) {
      app.four = 'four'
      comment.first = 111
      // throw new TypeError('msg')
      return comment
    }
  },
  function five (app/*, done */) {
    return function (comment, done) {
      comment.second = 222
      done(null, comment)
    }
  },
  function six (app/*, done */) {
    return function big (/* comment, done */) {
      app.six = 'six'
      return function deep (comment/*, done */) {
        comment.third = 333
        return comment
      }
    }
  },
  // throws as expected, as expected priority:
  // won't go deeper if error
  function seven (app/*, done */) {
    app.qux = 'qux'
    // throw new TypeError('err:seven')
    return function freakin (/* comment, done */) {
      // throw new TypeError('err:freakin')
      return function awesome (/* comment, done */) {
        // throw new TypeError('err:awesome')
        return function inTheDeep (comment, done) {
          // throw new TypeError('err:inTheDeep')
          comment.deep = true
          done(null, comment)
        }
      }
    }
  }
], base.makeIterator({
  // error: function onError (err, res, fn, next) {
  //   console.log('err', err)
  // }
  // afterEach: function (err, res, fn, next) {
  //   console.log('after each', res)
  // }
}), function (e, results) {
  // => `e` is always null on `.map/.mapSeries`
  // => `results` is [1, 2, 3]
  console.log('end:', results)
  console.log(ctx)
})
