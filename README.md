# [postjson][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] 

> Transforming JSON with plugins.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]

## Install
```
npm i postjson --save
```

## Usage
> For more use-cases see the [tests](./test.js)

```js
const postjson = require('postjson')
```

### [PostJSON](index.js#L20)

> Initialize a PostJSON optionally with `plugins` and `options`.

**Params**

* `plugins` **{Array|Function}**    
* `options` **{Object}**    

### [.use](index.js#L40)

> Add a `fn` as plugin.

**Params**

* `fn` **{Functio|Array}**    
* `options` **{Object}**    
* `returns` **{PostJSON}**: instance for chaining  

### [.parse](index.js#L56)

> Parse a `str` to abstract syntax tree (AST) and writes
it to `.tree` property of the `this` instance.

**Params**

* `str` **{String}**    
* `options` **{Object}**    
* `returns` **{PostJSON}**: instance for chaining  

### [.render](index.js#L78)

> Render a given `tree`. Or you can just use it in combination
with `.parse(str)` which writes the `tree` to instance, then `.render`
will use it. If only one argument is passed it is assumed as `options`.

**Params**

* `tree` **{Object}**: (optional) Abstract Syntax Tree, otherwise will use `this.tree`    
* `options` **{Object}**    
* `returns` **{PostJSON}**: instance for chaining  

### [.toString](index.js#L93)

> Returns stringified and already modified JSON.

**Params**

* `indent` **{Object}**    
* `returns` **{String}**  

### [.process](index.js#L107)

> Transforms a `val` using previously passed plugins. Think for it
like `.parse` plus `.render` combination.

**Params**

* `val` **{String}**    
* `options` **{Object}**    
* `returns` **{PostJSON}**  

### [.walk](index.js#L126)

> Temporary here. Part of future API sugars for working with AST.

**Params**

* `tree` **{Object|Array}**    
* `fn` **{Function}**    
* `returns` **{PostJSON}**  

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/postjson/postjson/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.

## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckoCore.tk][author-www-img]][author-www-url] [![keybase tunnckoCore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]

[extend-shallow]: https://github.com/jonschlinkert/extend-shallow
[for-own]: https://github.com/jonschlinkert/for-own
[kind-of]: https://github.com/jonschlinkert/kind-of
[lazy-cache]: https://github.com/jonschlinkert/lazy-cache

[npmjs-url]: https://www.npmjs.com/package/postjson
[npmjs-img]: https://img.shields.io/npm/v/postjson.svg?label=postjson

[license-url]: https://github.com/postjson/postjson/blob/master/LICENSE
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg

[codeclimate-url]: https://codeclimate.com/github/postjson/postjson
[codeclimate-img]: https://img.shields.io/codeclimate/github/postjson/postjson.svg

[travis-url]: https://travis-ci.org/postjson/postjson
[travis-img]: https://img.shields.io/travis/postjson/postjson/master.svg

[coveralls-url]: https://coveralls.io/r/postjson/postjson
[coveralls-img]: https://img.shields.io/coveralls/postjson/postjson.svg

[david-url]: https://david-dm.org/postjson/postjson
[david-img]: https://img.shields.io/david/postjson/postjson.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/ama
[new-message-img]: https://img.shields.io/badge/ask%20me-anything-green.svg

