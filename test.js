/*!
 * postjson <https://github.com/postjson/postjson>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var postjson = require('./index')

postjson
  .use(function (app, tree) {
    app.walk(tree, function (node) {
      if (node.key === 'license') node.value = 'Apache2'
    })
  })

var app = postjson.process(require('./package.json'))

console.log(app.toString(2)) // modified indented with JSON.stringify
console.log(app.value) // incoming value, not modified
console.log(app.json) // modified
console.log(app.json.license) // Apache2

