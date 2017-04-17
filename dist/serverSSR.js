/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 35);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Detect Electron renderer process, which is node, but we should
 * treat as a browser.
 */

if (typeof process !== 'undefined' && process.type === 'renderer') {
  module.exports = __webpack_require__(39);
} else {
  module.exports = __webpack_require__(40);
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * statuses
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var codes = __webpack_require__(85)

/**
 * Module exports.
 * @public
 */

module.exports = status

// array of status codes
status.codes = populateStatusesMap(status, codes)

// status codes for redirects
status.redirect = {
  300: true,
  301: true,
  302: true,
  303: true,
  305: true,
  307: true,
  308: true
}

// status codes for empty bodies
status.empty = {
  204: true,
  205: true,
  304: true
}

// status codes for when you should retry the request
status.retry = {
  502: true,
  503: true,
  504: true
}

/**
 * Populate the statuses map for given codes.
 * @private
 */

function populateStatusesMap (statuses, codes) {
  var arr = []

  Object.keys(codes).forEach(function forEachCode (code) {
    var message = codes[code]
    var status = Number(code)

    // Populate properties
    statuses[status] = message
    statuses[message] = status
    statuses[message.toLowerCase()] = status

    // Add to array
    arr.push(status)
  })

  return arr
}

/**
 * Get the status code.
 *
 * Given a number, this will throw if it is not a known status
 * code, otherwise the code will be returned. Given a string,
 * the string will be parsed for a number and return the code
 * if valid, otherwise will lookup the code assuming this is
 * the status message.
 *
 * @param {string|number} code
 * @returns {number}
 * @public
 */

function status (code) {
  if (typeof code === 'number') {
    if (!status[code]) throw new Error('invalid status code: ' + code)
    return code
  }

  if (typeof code !== 'string') {
    throw new TypeError('code must be a number or string')
  }

  // '403'
  var n = parseInt(code, 10)
  if (!isNaN(n)) {
    if (!status[n]) throw new Error('invalid status code: ' + n)
    return n
  }

  n = status[code.toLowerCase()]
  if (!n) throw new Error('invalid status message: "' + code + '"')
  return n
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(34)().Promise


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * depd
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var callSiteToString = __webpack_require__(16).callSiteToString
var eventListenerCount = __webpack_require__(16).eventListenerCount
var relative = __webpack_require__(0).relative

/**
 * Module exports.
 */

module.exports = depd

/**
 * Get the path to base files on.
 */

var basePath = process.cwd()

/**
 * Determine if namespace is contained in the string.
 */

function containsNamespace(str, namespace) {
  var val = str.split(/[ ,]+/)

  namespace = String(namespace).toLowerCase()

  for (var i = 0 ; i < val.length; i++) {
    if (!(str = val[i])) continue;

    // namespace contained
    if (str === '*' || str.toLowerCase() === namespace) {
      return true
    }
  }

  return false
}

/**
 * Convert a data descriptor to accessor descriptor.
 */

function convertDataDescriptorToAccessor(obj, prop, message) {
  var descriptor = Object.getOwnPropertyDescriptor(obj, prop)
  var value = descriptor.value

  descriptor.get = function getter() { return value }

  if (descriptor.writable) {
    descriptor.set = function setter(val) { return value = val }
  }

  delete descriptor.value
  delete descriptor.writable

  Object.defineProperty(obj, prop, descriptor)

  return descriptor
}

/**
 * Create arguments string to keep arity.
 */

function createArgumentsString(arity) {
  var str = ''

  for (var i = 0; i < arity; i++) {
    str += ', arg' + i
  }

  return str.substr(2)
}

/**
 * Create stack string from stack.
 */

function createStackString(stack) {
  var str = this.name + ': ' + this.namespace

  if (this.message) {
    str += ' deprecated ' + this.message
  }

  for (var i = 0; i < stack.length; i++) {
    str += '\n    at ' + callSiteToString(stack[i])
  }

  return str
}

/**
 * Create deprecate for namespace in caller.
 */

function depd(namespace) {
  if (!namespace) {
    throw new TypeError('argument namespace is required')
  }

  var stack = getStack()
  var site = callSiteLocation(stack[1])
  var file = site[0]

  function deprecate(message) {
    // call to self as log
    log.call(deprecate, message)
  }

  deprecate._file = file
  deprecate._ignored = isignored(namespace)
  deprecate._namespace = namespace
  deprecate._traced = istraced(namespace)
  deprecate._warned = Object.create(null)

  deprecate.function = wrapfunction
  deprecate.property = wrapproperty

  return deprecate
}

/**
 * Determine if namespace is ignored.
 */

function isignored(namespace) {
  /* istanbul ignore next: tested in a child processs */
  if (process.noDeprecation) {
    // --no-deprecation support
    return true
  }

  var str = process.env.NO_DEPRECATION || ''

  // namespace ignored
  return containsNamespace(str, namespace)
}

/**
 * Determine if namespace is traced.
 */

function istraced(namespace) {
  /* istanbul ignore next: tested in a child processs */
  if (process.traceDeprecation) {
    // --trace-deprecation support
    return true
  }

  var str = process.env.TRACE_DEPRECATION || ''

  // namespace traced
  return containsNamespace(str, namespace)
}

/**
 * Display deprecation message.
 */

function log(message, site) {
  var haslisteners = eventListenerCount(process, 'deprecation') !== 0

  // abort early if no destination
  if (!haslisteners && this._ignored) {
    return
  }

  var caller
  var callFile
  var callSite
  var i = 0
  var seen = false
  var stack = getStack()
  var file = this._file

  if (site) {
    // provided site
    callSite = callSiteLocation(stack[1])
    callSite.name = site.name
    file = callSite[0]
  } else {
    // get call site
    i = 2
    site = callSiteLocation(stack[i])
    callSite = site
  }

  // get caller of deprecated thing in relation to file
  for (; i < stack.length; i++) {
    caller = callSiteLocation(stack[i])
    callFile = caller[0]

    if (callFile === file) {
      seen = true
    } else if (callFile === this._file) {
      file = this._file
    } else if (seen) {
      break
    }
  }

  var key = caller
    ? site.join(':') + '__' + caller.join(':')
    : undefined

  if (key !== undefined && key in this._warned) {
    // already warned
    return
  }

  this._warned[key] = true

  // generate automatic message from call site
  if (!message) {
    message = callSite === site || !callSite.name
      ? defaultMessage(site)
      : defaultMessage(callSite)
  }

  // emit deprecation if listeners exist
  if (haslisteners) {
    var err = DeprecationError(this._namespace, message, stack.slice(i))
    process.emit('deprecation', err)
    return
  }

  // format and write message
  var format = process.stderr.isTTY
    ? formatColor
    : formatPlain
  var msg = format.call(this, message, caller, stack.slice(i))
  process.stderr.write(msg + '\n', 'utf8')

  return
}

/**
 * Get call site location as array.
 */

function callSiteLocation(callSite) {
  var file = callSite.getFileName() || '<anonymous>'
  var line = callSite.getLineNumber()
  var colm = callSite.getColumnNumber()

  if (callSite.isEval()) {
    file = callSite.getEvalOrigin() + ', ' + file
  }

  var site = [file, line, colm]

  site.callSite = callSite
  site.name = callSite.getFunctionName()

  return site
}

/**
 * Generate a default message from the site.
 */

function defaultMessage(site) {
  var callSite = site.callSite
  var funcName = site.name

  // make useful anonymous name
  if (!funcName) {
    funcName = '<anonymous@' + formatLocation(site) + '>'
  }

  var context = callSite.getThis()
  var typeName = context && callSite.getTypeName()

  // ignore useless type name
  if (typeName === 'Object') {
    typeName = undefined
  }

  // make useful type name
  if (typeName === 'Function') {
    typeName = context.name || typeName
  }

  return typeName && callSite.getMethodName()
    ? typeName + '.' + funcName
    : funcName
}

/**
 * Format deprecation message without color.
 */

function formatPlain(msg, caller, stack) {
  var timestamp = new Date().toUTCString()

  var formatted = timestamp
    + ' ' + this._namespace
    + ' deprecated ' + msg

  // add stack trace
  if (this._traced) {
    for (var i = 0; i < stack.length; i++) {
      formatted += '\n    at ' + callSiteToString(stack[i])
    }

    return formatted
  }

  if (caller) {
    formatted += ' at ' + formatLocation(caller)
  }

  return formatted
}

/**
 * Format deprecation message with color.
 */

function formatColor(msg, caller, stack) {
  var formatted = '\x1b[36;1m' + this._namespace + '\x1b[22;39m' // bold cyan
    + ' \x1b[33;1mdeprecated\x1b[22;39m' // bold yellow
    + ' \x1b[0m' + msg + '\x1b[39m' // reset

  // add stack trace
  if (this._traced) {
    for (var i = 0; i < stack.length; i++) {
      formatted += '\n    \x1b[36mat ' + callSiteToString(stack[i]) + '\x1b[39m' // cyan
    }

    return formatted
  }

  if (caller) {
    formatted += ' \x1b[36m' + formatLocation(caller) + '\x1b[39m' // cyan
  }

  return formatted
}

/**
 * Format call site location.
 */

function formatLocation(callSite) {
  return relative(basePath, callSite[0])
    + ':' + callSite[1]
    + ':' + callSite[2]
}

/**
 * Get the stack as array of call sites.
 */

function getStack() {
  var limit = Error.stackTraceLimit
  var obj = {}
  var prep = Error.prepareStackTrace

  Error.prepareStackTrace = prepareObjectStackTrace
  Error.stackTraceLimit = Math.max(10, limit)

  // capture the stack
  Error.captureStackTrace(obj)

  // slice this function off the top
  var stack = obj.stack.slice(1)

  Error.prepareStackTrace = prep
  Error.stackTraceLimit = limit

  return stack
}

/**
 * Capture call site stack from v8.
 */

function prepareObjectStackTrace(obj, stack) {
  return stack
}

/**
 * Return a wrapped function in a deprecation message.
 */

function wrapfunction(fn, message) {
  if (typeof fn !== 'function') {
    throw new TypeError('argument fn must be a function')
  }

  var args = createArgumentsString(fn.length)
  var deprecate = this
  var stack = getStack()
  var site = callSiteLocation(stack[1])

  site.name = fn.name

  var deprecatedfn = eval('(function (' + args + ') {\n'
    + '"use strict"\n'
    + 'log.call(deprecate, message, site)\n'
    + 'return fn.apply(this, arguments)\n'
    + '})')

  return deprecatedfn
}

/**
 * Wrap property in a deprecation message.
 */

function wrapproperty(obj, prop, message) {
  if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) {
    throw new TypeError('argument obj must be object')
  }

  var descriptor = Object.getOwnPropertyDescriptor(obj, prop)

  if (!descriptor) {
    throw new TypeError('must call property on owner object')
  }

  if (!descriptor.configurable) {
    throw new TypeError('property must be configurable')
  }

  var deprecate = this
  var stack = getStack()
  var site = callSiteLocation(stack[1])

  // set site name
  site.name = prop

  // convert data descriptor
  if ('value' in descriptor) {
    descriptor = convertDataDescriptorToAccessor(obj, prop, message)
  }

  var get = descriptor.get
  var set = descriptor.set

  // wrap getter
  if (typeof get === 'function') {
    descriptor.get = function getter() {
      log.call(deprecate, message, site)
      return get.apply(this, arguments)
    }
  }

  // wrap setter
  if (typeof set === 'function') {
    descriptor.set = function setter() {
      log.call(deprecate, message, site)
      return set.apply(this, arguments)
    }
  }

  Object.defineProperty(obj, prop, descriptor)
}

/**
 * Create DeprecationError for deprecation
 */

function DeprecationError(namespace, message, stack) {
  var error = new Error()
  var stackString

  Object.defineProperty(error, 'constructor', {
    value: DeprecationError
  })

  Object.defineProperty(error, 'message', {
    configurable: true,
    enumerable: false,
    value: message,
    writable: true
  })

  Object.defineProperty(error, 'name', {
    enumerable: false,
    configurable: true,
    value: 'DeprecationError',
    writable: true
  })

  Object.defineProperty(error, 'namespace', {
    configurable: true,
    enumerable: false,
    value: namespace,
    writable: true
  })

  Object.defineProperty(error, 'stack', {
    configurable: true,
    enumerable: false,
    get: function () {
      if (stackString !== undefined) {
        return stackString
      }

      // prepare stack trace
      return stackString = createStackString.call(this, stack)
    },
    set: function setter(val) {
      stackString = val
    }
  })

  return error
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * http-errors
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var deprecate = __webpack_require__(8)('http-errors')
var setPrototypeOf = __webpack_require__(84)
var statuses = __webpack_require__(4)
var inherits = __webpack_require__(18)

/**
 * Module exports.
 * @public
 */

module.exports = createError
module.exports.HttpError = createHttpErrorConstructor()

// Populate exports for all constructors
populateConstructorExports(module.exports, statuses.codes, module.exports.HttpError)

/**
 * Get the code class of a status code.
 * @private
 */

function codeClass (status) {
  return Number(String(status).charAt(0) + '00')
}

/**
 * Create a new HTTP Error.
 *
 * @returns {Error}
 * @public
 */

function createError () {
  // so much arity going on ~_~
  var err
  var msg
  var status = 500
  var props = {}
  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i]
    if (arg instanceof Error) {
      err = arg
      status = err.status || err.statusCode || status
      continue
    }
    switch (typeof arg) {
      case 'string':
        msg = arg
        break
      case 'number':
        status = arg
        if (i !== 0) {
          deprecate('non-first-argument status code; replace with createError(' + arg + ', ...)')
        }
        break
      case 'object':
        props = arg
        break
    }
  }

  if (typeof status === 'number' && (status < 400 || status >= 600)) {
    deprecate('non-error status code; use only 4xx or 5xx status codes')
  }

  if (typeof status !== 'number' ||
    (!statuses[status] && (status < 400 || status >= 600))) {
    status = 500
  }

  // constructor
  var HttpError = createError[status] || createError[codeClass(status)]

  if (!err) {
    // create error
    err = HttpError
      ? new HttpError(msg)
      : new Error(msg || statuses[status])
    Error.captureStackTrace(err, createError)
  }

  if (!HttpError || !(err instanceof HttpError) || err.status !== status) {
    // add properties to generic error
    err.expose = status < 500
    err.status = err.statusCode = status
  }

  for (var key in props) {
    if (key !== 'status' && key !== 'statusCode') {
      err[key] = props[key]
    }
  }

  return err
}

/**
 * Create HTTP error abstract base class.
 * @private
 */

function createHttpErrorConstructor () {
  function HttpError () {
    throw new TypeError('cannot construct abstract class')
  }

  inherits(HttpError, Error)

  return HttpError
}

/**
 * Create a constructor for a client error.
 * @private
 */

function createClientErrorConstructor (HttpError, name, code) {
  var className = name.match(/Error$/) ? name : name + 'Error'

  function ClientError (message) {
    // create the error object
    var msg = message != null ? message : statuses[code]
    var err = new Error(msg)

    // capture a stack trace to the construction point
    Error.captureStackTrace(err, ClientError)

    // adjust the [[Prototype]]
    setPrototypeOf(err, ClientError.prototype)

    // redefine the error message
    Object.defineProperty(err, 'message', {
      enumerable: true,
      configurable: true,
      value: msg,
      writable: true
    })

    // redefine the error name
    Object.defineProperty(err, 'name', {
      enumerable: false,
      configurable: true,
      value: className,
      writable: true
    })

    return err
  }

  inherits(ClientError, HttpError)

  ClientError.prototype.status = code
  ClientError.prototype.statusCode = code
  ClientError.prototype.expose = true

  return ClientError
}

/**
 * Create a constructor for a server error.
 * @private
 */

function createServerErrorConstructor (HttpError, name, code) {
  var className = name.match(/Error$/) ? name : name + 'Error'

  function ServerError (message) {
    // create the error object
    var msg = message != null ? message : statuses[code]
    var err = new Error(msg)

    // capture a stack trace to the construction point
    Error.captureStackTrace(err, ServerError)

    // adjust the [[Prototype]]
    setPrototypeOf(err, ServerError.prototype)

    // redefine the error message
    Object.defineProperty(err, 'message', {
      enumerable: true,
      configurable: true,
      value: msg,
      writable: true
    })

    // redefine the error name
    Object.defineProperty(err, 'name', {
      enumerable: false,
      configurable: true,
      value: className,
      writable: true
    })

    return err
  }

  inherits(ServerError, HttpError)

  ServerError.prototype.status = code
  ServerError.prototype.statusCode = code
  ServerError.prototype.expose = false

  return ServerError
}

/**
 * Populate the exports object with constructors for every error class.
 * @private
 */

function populateConstructorExports (exports, codes, HttpError) {
  codes.forEach(function forEachCode (code) {
    var CodeError
    var name = toIdentifier(statuses[code])

    switch (codeClass(code)) {
      case 400:
        CodeError = createClientErrorConstructor(HttpError, name, code)
        break
      case 500:
        CodeError = createServerErrorConstructor(HttpError, name, code)
        break
    }

    if (CodeError) {
      // export the constructor
      exports[code] = CodeError
      exports[name] = CodeError
    }
  })

  // backwards-compatibility
  exports["I'mateapot"] = deprecate.function(exports.ImATeapot,
    '"I\'mateapot"; use "ImATeapot" instead')
}

/**
 * Convert a string of words to a JavaScript identifier.
 * @private
 */

function toIdentifier (str) {
  return str.split(' ').map(function (token) {
    return token.slice(0, 1).toUpperCase() + token.slice(1)
  }).join('').replace(/[^ _0-9a-z]/gi, '')
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Promise = __webpack_require__(7)

/**
 * Expose compositor.
 */

module.exports = compose

/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */

function compose (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, function next () {
          return dispatch(i + 1)
        }))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var db = __webpack_require__(71)
var extname = __webpack_require__(0).extname

/**
 * Module variables.
 * @private
 */

var extractTypeRegExp = /^\s*([^;\s]*)(?:;|\s|$)/
var textTypeRegExp = /^text\//i

/**
 * Module exports.
 * @public
 */

exports.charset = charset
exports.charsets = { lookup: charset }
exports.contentType = contentType
exports.extension = extension
exports.extensions = Object.create(null)
exports.lookup = lookup
exports.types = Object.create(null)

// Populate the extensions/types maps
populateMaps(exports.extensions, exports.types)

/**
 * Get the default charset for a MIME type.
 *
 * @param {string} type
 * @return {boolean|string}
 */

function charset (type) {
  if (!type || typeof type !== 'string') {
    return false
  }

  // TODO: use media-typer
  var match = extractTypeRegExp.exec(type)
  var mime = match && db[match[1].toLowerCase()]

  if (mime && mime.charset) {
    return mime.charset
  }

  // default text/* to utf-8
  if (match && textTypeRegExp.test(match[1])) {
    return 'UTF-8'
  }

  return false
}

/**
 * Create a full Content-Type header given a MIME type or extension.
 *
 * @param {string} str
 * @return {boolean|string}
 */

function contentType (str) {
  // TODO: should this even be in this module?
  if (!str || typeof str !== 'string') {
    return false
  }

  var mime = str.indexOf('/') === -1
    ? exports.lookup(str)
    : str

  if (!mime) {
    return false
  }

  // TODO: use content-type or other module
  if (mime.indexOf('charset') === -1) {
    var charset = exports.charset(mime)
    if (charset) mime += '; charset=' + charset.toLowerCase()
  }

  return mime
}

/**
 * Get the default extension for a MIME type.
 *
 * @param {string} type
 * @return {boolean|string}
 */

function extension (type) {
  if (!type || typeof type !== 'string') {
    return false
  }

  // TODO: use media-typer
  var match = extractTypeRegExp.exec(type)

  // get extensions
  var exts = match && exports.extensions[match[1].toLowerCase()]

  if (!exts || !exts.length) {
    return false
  }

  return exts[0]
}

/**
 * Lookup the MIME type for a file path/extension.
 *
 * @param {string} path
 * @return {boolean|string}
 */

function lookup (path) {
  if (!path || typeof path !== 'string') {
    return false
  }

  // get the extension ("ext" or ".ext" or full path)
  var extension = extname('x.' + path)
    .toLowerCase()
    .substr(1)

  if (!extension) {
    return false
  }

  return exports.types[extension] || false
}

/**
 * Populate the extensions and types maps.
 * @private
 */

function populateMaps (extensions, types) {
  // source preference (least -> most)
  var preference = ['nginx', 'apache', undefined, 'iana']

  Object.keys(db).forEach(function forEachMimeType (type) {
    var mime = db[type]
    var exts = mime.extensions

    if (!exts || !exts.length) {
      return
    }

    // mime -> extensions
    extensions[type] = exts

    // extension -> mime
    for (var i = 0; i < exts.length; i++) {
      var extension = exts[i]

      if (types[extension]) {
        var from = preference.indexOf(db[types[extension]].source)
        var to = preference.indexOf(mime.source)

        if (types[extension] !== 'application/octet-stream' &&
          from > to || (from === to && types[extension].substr(0, 12) === 'application/')) {
          // skip the remapping
          continue
        }
      }

      // set the extension -> mime
      types[extension] = type
    }
  })
}


/***/ }),
/* 12 */
/***/ (function(module, exports) {


module.exports = function(obj, keys){
  obj = obj || {};
  if ('string' == typeof keys) keys = keys.split(/ +/);
  return keys.reduce(function(ret, key){
    if (null == obj[key]) return ret;
    ret[key] = obj[key];
    return ret;
  }, {});
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 14 */
/***/ (function(module, exports) {


/**
 * slice() reference.
 */

var slice = Array.prototype.slice;

/**
 * Expose `co`.
 */

module.exports = co['default'] = co.co = co;

/**
 * Wrap the given generator `fn` into a
 * function that returns a promise.
 * This is a separate function so that
 * every `co()` call doesn't create a new,
 * unnecessary closure.
 *
 * @param {GeneratorFunction} fn
 * @return {Function}
 * @api public
 */

co.wrap = function (fn) {
  createPromise.__generatorFunction__ = fn;
  return createPromise;
  function createPromise() {
    return co.call(this, fn.apply(this, arguments));
  }
};

/**
 * Execute the generator function or a generator
 * and return a promise.
 *
 * @param {Function} fn
 * @return {Promise}
 * @api public
 */

function co(gen) {
  var ctx = this;
  var args = slice.call(arguments, 1)

  // we wrap everything in a promise to avoid promise chaining,
  // which leads to memory leak errors.
  // see https://github.com/tj/co/issues/180
  return new Promise(function(resolve, reject) {
    if (typeof gen === 'function') gen = gen.apply(ctx, args);
    if (!gen || typeof gen.next !== 'function') return resolve(gen);

    onFulfilled();

    /**
     * @param {Mixed} res
     * @return {Promise}
     * @api private
     */

    function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

    /**
     * @param {Error} err
     * @return {Promise}
     * @api private
     */

    function onRejected(err) {
      var ret;
      try {
        ret = gen.throw(err);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

    /**
     * Get the next value in the generator,
     * return a promise.
     *
     * @param {Object} ret
     * @return {Promise}
     * @api private
     */

    function next(ret) {
      if (ret.done) return resolve(ret.value);
      var value = toPromise.call(ctx, ret.value);
      if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
      return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
        + 'but the following object was passed: "' + String(ret.value) + '"'));
    }
  });
}

/**
 * Convert a `yield`ed value into a promise.
 *
 * @param {Mixed} obj
 * @return {Promise}
 * @api private
 */

function toPromise(obj) {
  if (!obj) return obj;
  if (isPromise(obj)) return obj;
  if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj);
  if ('function' == typeof obj) return thunkToPromise.call(this, obj);
  if (Array.isArray(obj)) return arrayToPromise.call(this, obj);
  if (isObject(obj)) return objectToPromise.call(this, obj);
  return obj;
}

/**
 * Convert a thunk to a promise.
 *
 * @param {Function}
 * @return {Promise}
 * @api private
 */

function thunkToPromise(fn) {
  var ctx = this;
  return new Promise(function (resolve, reject) {
    fn.call(ctx, function (err, res) {
      if (err) return reject(err);
      if (arguments.length > 2) res = slice.call(arguments, 1);
      resolve(res);
    });
  });
}

/**
 * Convert an array of "yieldables" to a promise.
 * Uses `Promise.all()` internally.
 *
 * @param {Array} obj
 * @return {Promise}
 * @api private
 */

function arrayToPromise(obj) {
  return Promise.all(obj.map(toPromise, this));
}

/**
 * Convert an object of "yieldables" to a promise.
 * Uses `Promise.all()` internally.
 *
 * @param {Object} obj
 * @return {Promise}
 * @api private
 */

function objectToPromise(obj){
  var results = new obj.constructor();
  var keys = Object.keys(obj);
  var promises = [];
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var promise = toPromise.call(this, obj[key]);
    if (promise && isPromise(promise)) defer(promise, key);
    else results[key] = obj[key];
  }
  return Promise.all(promises).then(function () {
    return results;
  });

  function defer(promise, key) {
    // predefine the key in the result
    results[key] = undefined;
    promises.push(promise.then(function (res) {
      results[key] = res;
    }));
  }
}

/**
 * Check if `obj` is a promise.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isPromise(obj) {
  return 'function' == typeof obj.then;
}

/**
 * Check if `obj` is a generator.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */

function isGenerator(obj) {
  return 'function' == typeof obj.next && 'function' == typeof obj.throw;
}

/**
 * Check if `obj` is a generator function.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */
function isGeneratorFunction(obj) {
  var constructor = obj.constructor;
  if (!constructor) return false;
  if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) return true;
  return isGenerator(constructor.prototype);
}

/**
 * Check for plain object.
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isObject(val) {
  return Object == val.constructor;
}


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(72);

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (namespaces || '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * depd
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var Buffer = __webpack_require__(89)
var EventEmitter = __webpack_require__(24).EventEmitter

/**
 * Module exports.
 * @public
 */

lazyProperty(module.exports, 'bufferConcat', function bufferConcat() {
  return Buffer.concat || __webpack_require__(45)
})

lazyProperty(module.exports, 'callSiteToString', function callSiteToString() {
  var limit = Error.stackTraceLimit
  var obj = {}
  var prep = Error.prepareStackTrace

  function prepareObjectStackTrace(obj, stack) {
    return stack
  }

  Error.prepareStackTrace = prepareObjectStackTrace
  Error.stackTraceLimit = 2

  // capture the stack
  Error.captureStackTrace(obj)

  // slice the stack
  var stack = obj.stack.slice()

  Error.prepareStackTrace = prep
  Error.stackTraceLimit = limit

  return stack[0].toString ? toString : __webpack_require__(46)
})

lazyProperty(module.exports, 'eventListenerCount', function eventListenerCount() {
  return EventEmitter.listenerCount || __webpack_require__(47)
})

/**
 * Define a lazy property.
 */

function lazyProperty(obj, prop, getter) {
  function get() {
    var val = getter()

    Object.defineProperty(obj, prop, {
      configurable: true,
      enumerable: true,
      value: val
    })

    return val
  }

  Object.defineProperty(obj, prop, {
    configurable: true,
    enumerable: true,
    get: get
  })
}

/**
 * Call toString() on the obj
 */

function toString(obj) {
  return obj.toString()
}


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fs = __webpack_require__(2)

module.exports = clone(fs)

function clone (obj) {
  if (obj === null || typeof obj !== 'object')
    return obj

  if (obj instanceof Object)
    var copy = { __proto__: obj.__proto__ }
  else
    var copy = Object.create(null)

  Object.getOwnPropertyNames(obj).forEach(function (key) {
    Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key))
  })

  return copy
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

try {
  var util = __webpack_require__(6);
  if (typeof util.inherits !== 'function') throw '';
  module.exports = util.inherits;
} catch (e) {
  module.exports = __webpack_require__(59);
}


/***/ }),
/* 19 */
/***/ (function(module, exports) {


module.exports = isJSON;

/**
 * Check if `body` should be interpreted as json.
 */

function isJSON(body) {
  if (!body) return false;
  if ('string' == typeof body) return false;
  if ('function' == typeof body.pipe) return false;
  if (Buffer.isBuffer(body)) return false;
  return true;
}


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {


var Promise = __webpack_require__(7)
var fs
try {
  fs = __webpack_require__(53)
} catch(err) {
  fs = __webpack_require__(2)
}

var api = [
  'rename',
  'ftruncate',
  'chown',
  'fchown',
  'lchown',
  'chmod',
  'fchmod',
  'stat',
  'lstat',
  'fstat',
  'link',
  'symlink',
  'readlink',
  'realpath',
  'unlink',
  'rmdir',
  'mkdir',
  'readdir',
  'close',
  'open',
  'utimes',
  'futimes',
  'fsync',
  'fdatasync',
  'write',
  'read',
  'readFile',
  'writeFile',
  'appendFile',
  'truncate',
]

typeof fs.access === 'function' && api.push('access')
typeof fs.mkdtemp === 'function' && api.push('mkdtemp')

__webpack_require__(86).withCallback(fs, exports, api)

exports.exists = function (filename, callback) {
  // callback
  if (typeof callback === 'function') {
    return fs.stat(filename, function (err) {
      callback(null, !err);
    })
  }
  // or promise
  return new Promise(function (resolve) {
    fs.stat(filename, function (err) {
      resolve(!err)
    })
  })
}


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * on-finished
 * Copyright(c) 2013 Jonathan Ong
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

module.exports = onFinished
module.exports.isFinished = isFinished

/**
 * Module dependencies.
 * @private
 */

var first = __webpack_require__(49)

/**
 * Variables.
 * @private
 */

/* istanbul ignore next */
var defer = typeof setImmediate === 'function'
  ? setImmediate
  : function(fn){ process.nextTick(fn.bind.apply(fn, arguments)) }

/**
 * Invoke callback when the response has finished, useful for
 * cleaning up resources afterwards.
 *
 * @param {object} msg
 * @param {function} listener
 * @return {object}
 * @public
 */

function onFinished(msg, listener) {
  if (isFinished(msg) !== false) {
    defer(listener, null, msg)
    return msg
  }

  // attach the listener to the message
  attachListener(msg, listener)

  return msg
}

/**
 * Determine if message is already finished.
 *
 * @param {object} msg
 * @return {boolean}
 * @public
 */

function isFinished(msg) {
  var socket = msg.socket

  if (typeof msg.finished === 'boolean') {
    // OutgoingMessage
    return Boolean(msg.finished || (socket && !socket.writable))
  }

  if (typeof msg.complete === 'boolean') {
    // IncomingMessage
    return Boolean(msg.upgrade || !socket || !socket.readable || (msg.complete && !msg.readable))
  }

  // don't know
  return undefined
}

/**
 * Attach a finished listener to the message.
 *
 * @param {object} msg
 * @param {function} callback
 * @private
 */

function attachFinishedListener(msg, callback) {
  var eeMsg
  var eeSocket
  var finished = false

  function onFinish(error) {
    eeMsg.cancel()
    eeSocket.cancel()

    finished = true
    callback(error)
  }

  // finished on first message event
  eeMsg = eeSocket = first([[msg, 'end', 'finish']], onFinish)

  function onSocket(socket) {
    // remove listener
    msg.removeListener('socket', onSocket)

    if (finished) return
    if (eeMsg !== eeSocket) return

    // finished on first socket event
    eeSocket = first([[socket, 'error', 'close']], onFinish)
  }

  if (msg.socket) {
    // socket already assigned
    onSocket(msg.socket)
    return
  }

  // wait for socket to be assigned
  msg.on('socket', onSocket)

  if (msg.socket === undefined) {
    // node.js 0.8 patch
    patchAssignSocket(msg, onSocket)
  }
}

/**
 * Attach the listener to the message.
 *
 * @param {object} msg
 * @return {function}
 * @private
 */

function attachListener(msg, listener) {
  var attached = msg.__onFinished

  // create a private single listener with queue
  if (!attached || !attached.queue) {
    attached = msg.__onFinished = createListener(msg)
    attachFinishedListener(msg, attached)
  }

  attached.queue.push(listener)
}

/**
 * Create listener on message.
 *
 * @param {object} msg
 * @return {function}
 * @private
 */

function createListener(msg) {
  function listener(err) {
    if (msg.__onFinished === listener) msg.__onFinished = null
    if (!listener.queue) return

    var queue = listener.queue
    listener.queue = null

    for (var i = 0; i < queue.length; i++) {
      queue[i](err, msg)
    }
  }

  listener.queue = []

  return listener
}

/**
 * Patch ServerResponse.prototype.assignSocket for node.js 0.8.
 *
 * @param {ServerResponse} res
 * @param {function} callback
 * @private
 */

function patchAssignSocket(res, callback) {
  var assignSocket = res.assignSocket

  if (typeof assignSocket !== 'function') return

  // res.on('socket', callback) is broken in 0.8
  res.assignSocket = function _assignSocket(socket) {
    assignSocket.call(this, socket)
    callback(socket)
  }
}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * resolve-path
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var createError = __webpack_require__(82)
var normalize = __webpack_require__(0).normalize
var pathIsAbsolute = __webpack_require__(79)
var resolve = __webpack_require__(0).resolve
var sep = __webpack_require__(0).sep

/**
 * Module exports.
 * @public
 */

module.exports = resolvePath

/**
 * Module variables.
 * @private
 */

var UP_PATH_REGEXP = /(?:^|[\\/])\.\.(?:[\\/]|$)/

/**
 * Resolve relative path against a root path
 *
 * @param {string} rootPath
 * @param {string} relativePath
 * @return {string}
 * @public
 */

function resolvePath (rootPath, relativePath) {
  var path = relativePath
  var root = rootPath

  // root is optional, similar to root.resolve
  if (arguments.length === 1) {
    path = rootPath
    root = process.cwd()
  }

  if (root == null) {
    throw new TypeError('argument rootPath is required')
  }

  if (typeof root !== 'string') {
    throw new TypeError('argument rootPath must be a string')
  }

  if (path == null) {
    throw new TypeError('argument relativePath is required')
  }

  if (typeof path !== 'string') {
    throw new TypeError('argument relativePath must be a string')
  }

  // containing NULL bytes is malicious
  if (path.indexOf('\0') !== -1) {
    throw createError(400, 'Malicious Path')
  }

  // path should never be absolute
  if (pathIsAbsolute.posix(path) || pathIsAbsolute.win32(path)) {
    throw createError(400, 'Malicious Path')
  }

  // path outside root
  if (UP_PATH_REGEXP.test(normalize('.' + sep + path))) {
    throw createError(403)
  }

  // resolve & normalize the root path
  root = normalize(resolve(root) + sep)

  // resolve the path
  return resolve(root, path)
}


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * type-is
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var typer = __webpack_require__(68)
var mime = __webpack_require__(11)

/**
 * Module exports.
 * @public
 */

module.exports = typeofrequest
module.exports.is = typeis
module.exports.hasBody = hasbody
module.exports.normalize = normalize
module.exports.match = mimeMatch

/**
 * Compare a `value` content-type with `types`.
 * Each `type` can be an extension like `html`,
 * a special shortcut like `multipart` or `urlencoded`,
 * or a mime type.
 *
 * If no types match, `false` is returned.
 * Otherwise, the first `type` that matches is returned.
 *
 * @param {String} value
 * @param {Array} types
 * @public
 */

function typeis (value, types_) {
  var i
  var types = types_

  // remove parameters and normalize
  var val = tryNormalizeType(value)

  // no type or invalid
  if (!val) {
    return false
  }

  // support flattened arguments
  if (types && !Array.isArray(types)) {
    types = new Array(arguments.length - 1)
    for (i = 0; i < types.length; i++) {
      types[i] = arguments[i + 1]
    }
  }

  // no types, return the content type
  if (!types || !types.length) {
    return val
  }

  var type
  for (i = 0; i < types.length; i++) {
    if (mimeMatch(normalize(type = types[i]), val)) {
      return type[0] === '+' || type.indexOf('*') !== -1
        ? val
        : type
    }
  }

  // no matches
  return false
}

/**
 * Check if a request has a request body.
 * A request with a body __must__ either have `transfer-encoding`
 * or `content-length` headers set.
 * http://www.w3.org/Protocols/rfc2616/rfc2616-sec4.html#sec4.3
 *
 * @param {Object} request
 * @return {Boolean}
 * @public
 */

function hasbody (req) {
  return req.headers['transfer-encoding'] !== undefined ||
    !isNaN(req.headers['content-length'])
}

/**
 * Check if the incoming request contains the "Content-Type"
 * header field, and it contains any of the give mime `type`s.
 * If there is no request body, `null` is returned.
 * If there is no content type, `false` is returned.
 * Otherwise, it returns the first `type` that matches.
 *
 * Examples:
 *
 *     // With Content-Type: text/html; charset=utf-8
 *     this.is('html'); // => 'html'
 *     this.is('text/html'); // => 'text/html'
 *     this.is('text/*', 'application/json'); // => 'text/html'
 *
 *     // When Content-Type is application/json
 *     this.is('json', 'urlencoded'); // => 'json'
 *     this.is('application/json'); // => 'application/json'
 *     this.is('html', 'application/*'); // => 'application/json'
 *
 *     this.is('html'); // => false
 *
 * @param {String|Array} types...
 * @return {String|false|null}
 * @public
 */

function typeofrequest (req, types_) {
  var types = types_

  // no body
  if (!hasbody(req)) {
    return null
  }

  // support flattened arguments
  if (arguments.length > 2) {
    types = new Array(arguments.length - 1)
    for (var i = 0; i < types.length; i++) {
      types[i] = arguments[i + 1]
    }
  }

  // request content type
  var value = req.headers['content-type']

  return typeis(value, types)
}

/**
 * Normalize a mime type.
 * If it's a shorthand, expand it to a valid mime type.
 *
 * In general, you probably want:
 *
 *   var type = is(req, ['urlencoded', 'json', 'multipart']);
 *
 * Then use the appropriate body parsers.
 * These three are the most common request body types
 * and are thus ensured to work.
 *
 * @param {String} type
 * @private
 */

function normalize (type) {
  if (typeof type !== 'string') {
    // invalid type
    return false
  }

  switch (type) {
    case 'urlencoded':
      return 'application/x-www-form-urlencoded'
    case 'multipart':
      return 'multipart/*'
  }

  if (type[0] === '+') {
    // "+json" -> "*/*+json" expando
    return '*/*' + type
  }

  return type.indexOf('/') === -1
    ? mime.lookup(type)
    : type
}

/**
 * Check if `expected` mime type
 * matches `actual` mime type with
 * wildcard and +suffix support.
 *
 * @param {String} expected
 * @param {String} actual
 * @return {Boolean}
 * @private
 */

function mimeMatch (expected, actual) {
  // invalid type
  if (expected === false) {
    return false
  }

  // split types
  var actualParts = actual.split('/')
  var expectedParts = expected.split('/')

  // invalid format
  if (actualParts.length !== 2 || expectedParts.length !== 2) {
    return false
  }

  // validate type
  if (expectedParts[0] !== '*' && expectedParts[0] !== actualParts[0]) {
    return false
  }

  // validate suffix wildcard
  if (expectedParts[1].substr(0, 2) === '*+') {
    return expectedParts[1].length <= actualParts[1].length + 1 &&
      expectedParts[1].substr(1) === actualParts[1].substr(1 - expectedParts[1].length)
  }

  // validate subtype
  if (expectedParts[1] !== '*' && expectedParts[1] !== actualParts[1]) {
    return false
  }

  return true
}

/**
 * Normalize a type and remove parameters.
 *
 * @param {string} value
 * @return {string}
 * @private
 */

function normalizeType (value) {
  // parse the type
  var type = typer.parse(value)

  // remove the parameters
  type.parameters = undefined

  // reformat it
  return typer.format(type)
}

/**
 * Try to normalize a type and remove parameters.
 *
 * @param {string} value
 * @return {string}
 * @private
 */

function tryNormalizeType (value) {
  try {
    return normalizeType(value)
  } catch (err) {
    return null
  }
}


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * RESTful resource routing middleware for koa.
 *
 * @author Alex Mingoia <talk@alexmingoia.com>
 * @link https://github.com/alexmingoia/koa-router
 */

var debug = __webpack_require__(3)('koa-router');
var compose = __webpack_require__(10);
var HttpError = __webpack_require__(9);
var methods = __webpack_require__(69);
var Layer = __webpack_require__(63);

/**
 * @module koa-router
 */

module.exports = Router;

/**
 * Create a new router.
 *
 * @example
 *
 * Basic usage:
 *
 * ```javascript
 * var app = require('koa')();
 * var router = require('koa-router')();
 *
 * router.get('/', function (ctx, next) {...});
 *
 * app
 *   .use(router.routes())
 *   .use(router.allowedMethods());
 * ```
 *
 * @alias module:koa-router
 * @param {Object=} opts
 * @param {String=} opts.prefix prefix router paths
 * @constructor
 */

function Router(opts) {
  if (!(this instanceof Router)) {
    return new Router(opts);
  }

  this.opts = opts || {};
  this.methods = this.opts.methods || [
    'HEAD',
    'OPTIONS',
    'GET',
    'PUT',
    'PATCH',
    'POST',
    'DELETE'
  ];

  this.params = {};
  this.stack = [];
};

/**
 * Create `router.verb()` methods, where *verb* is one of the HTTP verbs such
 * as `router.get()` or `router.post()`.
 *
 * Match URL patterns to callback functions or controller actions using `router.verb()`,
 * where **verb** is one of the HTTP verbs such as `router.get()` or `router.post()`.
 *
 * ```javascript
 * router
 *   .get('/', function (ctx, next) {
 *     ctx.body = 'Hello World!';
 *   })
 *   .post('/users', function (ctx, next) {
 *     // ...
 *   })
 *   .put('/users/:id', function (ctx, next) {
 *     // ...
 *   })
 *   .del('/users/:id', function (ctx, next) {
 *     // ...
 *   });
 * ```
 *
 * Route paths will be translated to regular expressions using
 * [path-to-regexp](https://github.com/pillarjs/path-to-regexp).
 *
 * Query strings will not be considered when matching requests.
 *
 * #### Named routes
 *
 * Routes can optionally have names. This allows generation of URLs and easy
 * renaming of URLs during development.
 *
 * ```javascript
 * router.get('user', '/users/:id', function (ctx, next) {
 *  // ...
 * });
 *
 * router.url('user', 3);
 * // => "/users/3"
 * ```
 *
 * #### Multiple middleware
 *
 * Multiple middleware may be given:
 *
 * ```javascript
 * router.get(
 *   '/users/:id',
 *   function (ctx, next) {
 *     return User.findOne(ctx.params.id).then(function(user) {
 *       ctx.user = user;
 *       next();
 *     });
 *   },
 *   function (ctx) {
 *     console.log(ctx.user);
 *     // => { id: 17, name: "Alex" }
 *   }
 * );
 * ```
 *
 * ### Nested routers
 *
 * Nesting routers is supported:
 *
 * ```javascript
 * var forums = new Router();
 * var posts = new Router();
 *
 * posts.get('/', function (ctx, next) {...});
 * posts.get('/:pid', function (ctx, next) {...});
 * forums.use('/forums/:fid/posts', posts.routes(), posts.allowedMethods());
 *
 * // responds to "/forums/123/posts" and "/forums/123/posts/123"
 * app.use(forums.routes());
 * ```
 *
 * #### Router prefixes
 *
 * Route paths can be prefixed at the router level:
 *
 * ```javascript
 * var router = new Router({
 *   prefix: '/users'
 * });
 *
 * router.get('/', ...); // responds to "/users"
 * router.get('/:id', ...); // responds to "/users/:id"
 * ```
 *
 * #### URL parameters
 *
 * Named route parameters are captured and added to `ctx.params`.
 *
 * ```javascript
 * router.get('/:category/:title', function (ctx, next) {
 *   console.log(ctx.params);
 *   // => { category: 'programming', title: 'how-to-node' }
 * });
 * ```
 *
 * The [path-to-regexp](https://github.com/pillarjs/path-to-regexp) module is
 * used to convert paths to regular expressions.
 *
 * @name get|put|post|patch|delete
 * @memberof module:koa-router.prototype
 * @param {String} path
 * @param {Function=} middleware route middleware(s)
 * @param {Function} callback route callback
 * @returns {Router}
 */

methods.forEach(function (method) {
  Router.prototype[method] = function (name, path, middleware) {
    var middleware;

    if (typeof path === 'string' || path instanceof RegExp) {
      middleware = Array.prototype.slice.call(arguments, 2);
    } else {
      middleware = Array.prototype.slice.call(arguments, 1);
      path = name;
      name = null;
    }

    this.register(path, [method], middleware, {
      name: name
    });

    return this;
  };
});

// Alias for `router.delete()` because delete is a reserved word
Router.prototype.del = Router.prototype['delete'];

/**
 * Use given middleware.
 *
 * Middleware run in the order they are defined by `.use()`. They are invoked
 * sequentially, requests start at the first middleware and work their way
 * "down" the middleware stack.
 *
 * @example
 *
 * ```javascript
 * // session middleware will run before authorize
 * router
 *   .use(session())
 *   .use(authorize());
 *
 * // use middleware only with given path
 * router.use('/users', userAuth());
 *
 * // or with an array of paths
 * router.use(['/users', '/admin'], userAuth());
 *
 * app.use(router.routes());
 * ```
 *
 * @param {String=} path
 * @param {Function} middleware
 * @param {Function=} ...
 * @returns {Router}
 */

Router.prototype.use = function () {
  var router = this;
  var middleware = Array.prototype.slice.call(arguments);
  var path = '(.*)';

  // support array of paths
  if (Array.isArray(middleware[0]) && typeof middleware[0][0] === 'string') {
    middleware[0].forEach(function (p) {
      router.use.apply(router, [p].concat(middleware.slice(1)));
    });

    return this;
  }

  var hasPath = typeof middleware[0] === 'string';
  if (hasPath) {
    path = middleware.shift();
  }

  middleware.forEach(function (m) {
    if (m.router) {
      m.router.stack.forEach(function (nestedLayer) {
        if (path) nestedLayer.setPrefix(path);
        if (router.opts.prefix) nestedLayer.setPrefix(router.opts.prefix);
        router.stack.push(nestedLayer);
      });

      if (router.params) {
        Object.keys(router.params).forEach(function (key) {
          m.router.param(key, router.params[key]);
        });
      }
    } else {
      router.register(path, [], m, { end: false, ignoreCaptures: !hasPath });
    }
  });

  return this;
};

/**
 * Set the path prefix for a Router instance that was already initialized.
 *
 * @example
 *
 * ```javascript
 * router.prefix('/things/:thing_id')
 * ```
 *
 * @param {String} prefix
 * @returns {Router}
 */

Router.prototype.prefix = function (prefix) {
  prefix = prefix.replace(/\/$/, '');

  this.opts.prefix = prefix;

  this.stack.forEach(function (route) {
    route.setPrefix(prefix);
  });

  return this;
};

/**
 * Returns router middleware which dispatches a route matching the request.
 *
 * @returns {Function}
 */

Router.prototype.routes = Router.prototype.middleware = function () {
  var router = this;

  var dispatch = function dispatch(ctx, next) {
    debug('%s %s', ctx.method, ctx.path);

    var path = router.opts.routerPath || ctx.routerPath || ctx.path;
    var matched = router.match(path, ctx.method);
    var layerChain, layer, i;

    if (ctx.matched) {
      ctx.matched.push.apply(ctx.matched, matched.path);
    } else {
      ctx.matched = matched.path;
    }

    if (!matched.route) return next();

    var mostSpecificPath = matched.pathAndMethod[matched.pathAndMethod.length - 1].path;
    ctx._matchedRoute = mostSpecificPath;

    layerChain = matched.pathAndMethod.reduce(function(memo, layer) {
      memo.push(function(ctx, next) {
        ctx.captures = layer.captures(path, ctx.captures);
        ctx.params = layer.params(path, ctx.captures, ctx.params);
        return next();
      });
      return memo.concat(layer.stack);
    }, []);

    return compose(layerChain)(ctx, next);
  };

  dispatch.router = this;

  return dispatch;
};

/**
 * Returns separate middleware for responding to `OPTIONS` requests with
 * an `Allow` header containing the allowed methods, as well as responding
 * with `405 Method Not Allowed` and `501 Not Implemented` as appropriate.
 *
 * @example
 *
 * ```javascript
 * var app = koa();
 * var router = router();
 *
 * app.use(router.routes());
 * app.use(router.allowedMethods());
 * ```
 *
 * @param {Object=} options
 * @param {Boolean=} options.throw throw error instead of setting status and header
 * @param {Function=} options.notImplemented throw the returned value in place of the default NotImplemented error
 * @param {Function=} options.methodNotAllowed throw the returned value in place of the default MethodNotAllowed error
 * @returns {Function}
 */

Router.prototype.allowedMethods = function (options) {
  options = options || {};
  var implemented = this.methods;

  return function allowedMethods(ctx, next) {
    return next().then(function() {
      var allowed = {};

      if (!ctx.status || ctx.status === 404) {
        ctx.matched.forEach(function (route) {
          route.methods.forEach(function (method) {
            allowed[method] = method;
          });
        });

        var allowedArr = Object.keys(allowed);

        if (!~implemented.indexOf(ctx.method)) {
          if (options.throw) {
            var notImplementedThrowable;
            if (typeof options.notImplemented === 'function') {
              notImplementedThrowable = options.notImplemented(); // set whatever the user returns from their function
            } else {
              notImplementedThrowable = new HttpError.NotImplemented();
            }
            throw notImplementedThrowable;
          } else {
            ctx.status = 501;
            ctx.set('Allow', allowedArr);
          }
        } else if (allowedArr.length) {
          if (ctx.method === 'OPTIONS') {
            ctx.status = 204;
            ctx.set('Allow', allowedArr);
          } else if (!allowed[ctx.method]) {
            if (options.throw) {
              var notAllowedThrowable;
              if (typeof options.methodNotAllowed === 'function') {
                notAllowedThrowable = options.methodNotAllowed(); // set whatever the user returns from their function
              } else {
                notAllowedThrowable = new HttpError.MethodNotAllowed();
              }
              throw notAllowedThrowable;
            } else {
              ctx.status = 405;
              ctx.set('Allow', allowedArr);
            }
          }
        }
      }
    });
  };
};

/**
 * Register route with all methods.
 *
 * @param {String} name Optional.
 * @param {String} path
 * @param {Function=} middleware You may also pass multiple middleware.
 * @param {Function} callback
 * @returns {Router}
 * @private
 */

Router.prototype.all = function (name, path, middleware) {
  var middleware;

  if (typeof path === 'string') {
    middleware = Array.prototype.slice.call(arguments, 2);
  } else {
    middleware = Array.prototype.slice.call(arguments, 1);
    path = name;
    name = null;
  }

  this.register(path, methods, middleware, {
    name: name
  });

  return this;
};

/**
 * Redirect `source` to `destination` URL with optional 30x status `code`.
 *
 * Both `source` and `destination` can be route names.
 *
 * ```javascript
 * router.redirect('/login', 'sign-in');
 * ```
 *
 * This is equivalent to:
 *
 * ```javascript
 * router.all('/login', function (ctx) {
 *   ctx.redirect('/sign-in');
 *   ctx.status = 301;
 * });
 * ```
 *
 * @param {String} source URL or route name.
 * @param {String} destination URL or route name.
 * @param {Number} code HTTP status code (default: 301).
 * @returns {Router}
 */

Router.prototype.redirect = function (source, destination, code) {
  // lookup source route by name
  if (source[0] !== '/') {
    source = this.url(source);
  }

  // lookup destination route by name
  if (destination[0] !== '/') {
    destination = this.url(destination);
  }

  return this.all(source, function (ctx) {
    ctx.redirect(destination);
    ctx.status = code || 301;
  });
};

/**
 * Create and register a route.
 *
 * @param {String} path Path string.
 * @param {Array.<String>} methods Array of HTTP verbs.
 * @param {Function} middleware Multiple middleware also accepted.
 * @returns {Layer}
 * @private
 */

Router.prototype.register = function (path, methods, middleware, opts) {
  opts = opts || {};

  var router = this;
  var stack = this.stack;

  // support array of paths
  if (Array.isArray(path)) {
    path.forEach(function (p) {
      router.register.call(router, p, methods, middleware, opts);
    });

    return this;
  }

  // create route
  var route = new Layer(path, methods, middleware, {
    end: opts.end === false ? opts.end : true,
    name: opts.name,
    sensitive: opts.sensitive || this.opts.sensitive || false,
    strict: opts.strict || this.opts.strict || false,
    prefix: opts.prefix || this.opts.prefix || "",
    ignoreCaptures: opts.ignoreCaptures
  });

  if (this.opts.prefix) {
    route.setPrefix(this.opts.prefix);
  }

  // add parameter middleware
  Object.keys(this.params).forEach(function (param) {
    route.param(param, this.params[param]);
  }, this);

  stack.push(route);

  return route;
};

/**
 * Lookup route with given `name`.
 *
 * @param {String} name
 * @returns {Layer|false}
 */

Router.prototype.route = function (name) {
  var routes = this.stack;

  for (var len = routes.length, i=0; i<len; i++) {
    if (routes[i].name && routes[i].name === name) {
      return routes[i];
    }
  }

  return false;
};

/**
 * Generate URL for route. Takes a route name and map of named `params`.
 *
 * ```javascript
 * router.get('user', '/users/:id', function (ctx, next) {
 *  // ...
 * });
 *
 * router.url('user', 3);
 * // => "/users/3"
 *
 * router.url('user', { id: 3 });
 * // => "/users/3"
 * ```
 *
 * @param {String} name route name
 * @param {Object} params url parameters
 * @returns {String|Error}
 */

Router.prototype.url = function (name, params) {
  var route = this.route(name);

  if (route) {
    var args = Array.prototype.slice.call(arguments, 1);
    return route.url.apply(route, args);
  }

  return new Error("No route found for name: " + name);
};

/**
 * Match given `path` and return corresponding routes.
 *
 * @param {String} path
 * @param {String} method
 * @returns {Object.<path, pathAndMethod>} returns layers that matched path and
 * path and method.
 * @private
 */

Router.prototype.match = function (path, method) {
  var layers = this.stack;
  var layer;
  var matched = {
    path: [],
    pathAndMethod: [],
    route: false
  };

  for (var len = layers.length, i = 0; i < len; i++) {
    layer = layers[i];

    debug('test %s %s', layer.path, layer.regexp);

    if (layer.match(path)) {
      matched.path.push(layer);

      if (layer.methods.length === 0 || ~layer.methods.indexOf(method)) {
        matched.pathAndMethod.push(layer);
        if (layer.methods.length) matched.route = true;
      }
    }
  }

  return matched;
};

/**
 * Run middleware for named route parameters. Useful for auto-loading or
 * validation.
 *
 * @example
 *
 * ```javascript
 * router
 *   .param('user', function (id, ctx, next) {
 *     ctx.user = users[id];
 *     if (!ctx.user) return ctx.status = 404;
 *     return next();
 *   })
 *   .get('/users/:user', function (ctx) {
 *     ctx.body = ctx.user;
 *   })
 *   .get('/users/:user/friends', function (ctx) {
 *     return ctx.user.getFriends().then(function(friends) {
 *       ctx.body = friends;
 *     });
 *   })
 *   // /users/3 => {"id": 3, "name": "Alex"}
 *   // /users/3/friends => [{"id": 4, "name": "TJ"}]
 * ```
 *
 * @param {String} param
 * @param {Function} middleware
 * @returns {Router}
 */

Router.prototype.param = function (param, middleware) {
  this.params[param] = middleware;
  this.stack.forEach(function (route) {
    route.param(param, middleware);
  });
  return this;
};

/**
 * Generate URL from url pattern and given `params`.
 *
 * @example
 *
 * ```javascript
 * var url = Router.url('/users/:id', {id: 1});
 * // => "/users/1"
 * ```
 *
 * @param {String} path url pattern
 * @param {Object} params url parameters
 * @returns {String}
 */
Router.url = function (path, params) {
    return Layer.prototype.url.call({path: path}, params);
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

const debug = __webpack_require__(3)('koa-send');
const resolvePath = __webpack_require__(22);
const createError = __webpack_require__(9);
const assert = __webpack_require__(1);
const fs = __webpack_require__(20);

const {
  normalize,
  basename,
  extname,
  resolve,
  parse,
  sep
} = __webpack_require__(0);

/**
 * Expose `send()`.
 */

module.exports = send;

/**
 * Send file at `path` with the
 * given `options` to the koa `ctx`.
 *
 * @param {Context} ctx
 * @param {String} path
 * @param {Object} [opts]
 * @return {Function}
 * @api public
 */

async function send(ctx, path, opts = {}) {
  assert(ctx, 'koa context required');
  assert(path, 'pathname required');

  // options
  debug('send "%s" %j', path, opts);
  const root = opts.root ? normalize(resolve(opts.root)) : '';
  const trailingSlash = '/' == path[path.length - 1];
  path = path.substr(parse(path).root.length);
  const index = opts.index;
  const maxage = opts.maxage || opts.maxAge || 0;
  const hidden = opts.hidden || false;
  const format = opts.format === false ? false : true;
  const extensions = Array.isArray(opts.extensions) ? opts.extensions : false;
  const gzip = opts.gzip === false ? false : true;
  const setHeaders = opts.setHeaders;

  if (setHeaders && typeof setHeaders !== 'function') {
    throw new TypeError('option setHeaders must be function')
  }

  const encoding = ctx.acceptsEncodings('gzip', 'deflate', 'identity');

  // normalize path
  path = decode(path);

  if (-1 == path) return ctx.throw(400, 'failed to decode');

  // index file support
  if (index && trailingSlash) path += index;

  path = resolvePath(root, path);

  // hidden file support, ignore
  if (!hidden && isHidden(root, path)) return;

  // serve gzipped file when possible
  if (encoding === 'gzip' && gzip && (await fs.exists(path + '.gz'))) {
    path = path + '.gz';
    ctx.set('Content-Encoding', 'gzip');
    ctx.res.removeHeader('Content-Length');
  }

  if (extensions && !/\..*$/.exec(path)) {
    const list = [].concat(extensions);
    for (let i = 0; i < list.length; i++) {
      let ext = list[i];
      if (typeof ext !== 'string') {
        throw new TypeError('option extensions must be array of strings or false');
      }
      if (!/^\./.exec(ext)) ext = '.' + ext;
      if (await fs.exists(path + ext)) {
        path = path + ext;
        break;
      }
    }
  }

  // stat
  let stats
  try {
    stats = await fs.stat(path);

    // Format the path to serve static file servers
    // and not require a trailing slash for directories,
    // so that you can do both `/directory` and `/directory/`
    if (stats.isDirectory()) {
      if (format && index) {
        path += '/' + index;
        stats = await fs.stat(path);
      } else {
        return;
      }
    }
  } catch (err) {
    const notfound = ['ENOENT', 'ENAMETOOLONG', 'ENOTDIR'];
    if (notfound.includes(err.code)) {
      throw createError(404, err);
    }
    err.status = 500;
    throw err;
  }

  if (setHeaders) setHeaders(ctx.res, path, stats);

  // stream
  ctx.set('Content-Length', stats.size);
  if (!ctx.response.get('Last-Modified')) ctx.set('Last-Modified', stats.mtime.toUTCString());
  if (!ctx.response.get('Cache-Control')) ctx.set('Cache-Control', 'max-age=' + (maxage / 1000 | 0));
  ctx.type = type(path);
  ctx.body = fs.createReadStream(path);

  return path;
}

/**
 * Check if it's hidden.
 */

function isHidden(root, path) {
  path = path.substr(root.length).split(sep);
  for(let i = 0; i < path.length; i++) {
    if(path[i][0] === '.') return true;
  }
  return false;
}

/**
 * File type.
 */

function type(file) {
  return extname(basename(file, '.gz'));
}

/**
 * Decode `path`.
 */

function decode(path) {
  try {
    return decodeURIComponent(path);
  } catch (err) {
    return -1;
  }
}


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



/**
 * Module dependencies.
 */

const debug = __webpack_require__(3)('koa-static');
const resolve = __webpack_require__(0).resolve;
const assert = __webpack_require__(1);
const send = __webpack_require__(64);

/**
 * Expose `serve()`.
 */

module.exports = serve;

/**
 * Serve static files from `root`.
 *
 * @param {String} root
 * @param {Object} [opts]
 * @return {Function}
 * @api public
 */

function serve(root, opts) {
  opts = opts || {};

  assert(root, 'root directory is required to serve files');

  // options
  debug('static "%s" %j', root, opts);
  opts.root = resolve(root);
  if (opts.index !== false) opts.index = opts.index || 'index.html';

  if (!opts.defer) {
    return function serve(ctx, next){
      if (ctx.method == 'HEAD' || ctx.method == 'GET') {
        return send(ctx, ctx.path, opts).then(done => {
          if (!done) {
            return next();
          }
        });
      }
      return next();
    };
  }

  return function serve(ctx, next){
    return next().then(() => {
      if (ctx.method != 'HEAD' && ctx.method != 'GET') return;
      // response is already handled
      if (ctx.body != null || ctx.status != 404) return;

      return send(ctx, ctx.path, opts);
    });
  };
}


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



/**
 * Module dependencies.
 */

const isGeneratorFunction = __webpack_require__(60);
const debug = __webpack_require__(3)('koa:application');
const onFinished = __webpack_require__(21);
const response = __webpack_require__(67);
const compose = __webpack_require__(10);
const isJSON = __webpack_require__(19);
const context = __webpack_require__(65);
const request = __webpack_require__(66);
const statuses = __webpack_require__(4);
const Cookies = __webpack_require__(38);
const accepts = __webpack_require__(31);
const Emitter = __webpack_require__(24);
const assert = __webpack_require__(1);
const Stream = __webpack_require__(5);
const http = __webpack_require__(13);
const only = __webpack_require__(12);
const convert = __webpack_require__(62);
const deprecate = __webpack_require__(8)('koa');

/**
 * Expose `Application` class.
 * Inherits from `Emitter.prototype`.
 */

module.exports = class Application extends Emitter {
  /**
   * Initialize a new `Application`.
   *
   * @api public
   */

  constructor() {
    super();

    this.proxy = false;
    this.middleware = [];
    this.subdomainOffset = 2;
    this.env = "production" || 'development';
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }

  /**
   * Shorthand for:
   *
   *    http.createServer(app.callback()).listen(...)
   *
   * @param {Mixed} ...
   * @return {Server}
   * @api public
   */

  listen() {
    debug('listen');
    const server = http.createServer(this.callback());
    return server.listen.apply(server, arguments);
  }

  /**
   * Return JSON representation.
   * We only bother showing settings.
   *
   * @return {Object}
   * @api public
   */

  toJSON() {
    return only(this, [
      'subdomainOffset',
      'proxy',
      'env'
    ]);
  }

  /**
   * Inspect implementation.
   *
   * @return {Object}
   * @api public
   */

  inspect() {
    return this.toJSON();
  }

  /**
   * Use the given middleware `fn`.
   *
   * Old-style middleware will be converted.
   *
   * @param {Function} fn
   * @return {Application} self
   * @api public
   */

  use(fn) {
    if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
    if (isGeneratorFunction(fn)) {
      deprecate('Support for generators will be removed in v3. ' +
                'See the documentation for examples of how to convert old middleware ' +
                'https://github.com/koajs/koa/blob/master/docs/migration.md');
      fn = convert(fn);
    }
    debug('use %s', fn._name || fn.name || '-');
    this.middleware.push(fn);
    return this;
  }

  /**
   * Return a request handler callback
   * for node's native http server.
   *
   * @return {Function}
   * @api public
   */

  callback() {
    const fn = compose(this.middleware);

    if (!this.listeners('error').length) this.on('error', this.onerror);

    const handleRequest = (req, res) => {
      res.statusCode = 404;
      const ctx = this.createContext(req, res);
      const onerror = err => ctx.onerror(err);
      const handleResponse = () => respond(ctx);
      onFinished(res, onerror);
      return fn(ctx).then(handleResponse).catch(onerror);
    };

    return handleRequest;
  }

  /**
   * Initialize a new context.
   *
   * @api private
   */

  createContext(req, res) {
    const context = Object.create(this.context);
    const request = context.request = Object.create(this.request);
    const response = context.response = Object.create(this.response);
    context.app = request.app = response.app = this;
    context.req = request.req = response.req = req;
    context.res = request.res = response.res = res;
    request.ctx = response.ctx = context;
    request.response = response;
    response.request = request;
    context.originalUrl = request.originalUrl = req.url;
    context.cookies = new Cookies(req, res, {
      keys: this.keys,
      secure: request.secure
    });
    request.ip = request.ips[0] || req.socket.remoteAddress || '';
    context.accept = request.accept = accepts(req);
    context.state = {};
    return context;
  }

  /**
   * Default error handler.
   *
   * @param {Error} err
   * @api private
   */

  onerror(err) {
    assert(err instanceof Error, `non-error thrown: ${err}`);

    if (404 == err.status || err.expose) return;
    if (this.silent) return;

    const msg = err.stack || err.toString();
    console.error();
    console.error(msg.replace(/^/gm, '  '));
    console.error();
  }
};

/**
 * Response helper.
 */

function respond(ctx) {
  // allow bypassing koa
  if (false === ctx.respond) return;

  const res = ctx.res;
  if (!ctx.writable) return;

  let body = ctx.body;
  const code = ctx.status;

  // ignore body
  if (statuses.empty[code]) {
    // strip headers
    ctx.body = null;
    return res.end();
  }

  if ('HEAD' == ctx.method) {
    if (!res.headersSent && isJSON(body)) {
      ctx.length = Buffer.byteLength(JSON.stringify(body));
    }
    return res.end();
  }

  // status body
  if (null == body) {
    body = ctx.message || String(code);
    if (!res.headersSent) {
      ctx.type = 'text';
      ctx.length = Buffer.byteLength(body);
    }
    return res.end(body);
  }

  // responses
  if (Buffer.isBuffer(body)) return res.end(body);
  if ('string' == typeof body) return res.end(body);
  if (body instanceof Stream) return body.pipe(res);

  // body: json
  body = JSON.stringify(body);
  if (!res.headersSent) {
    ctx.length = Buffer.byteLength(body);
  }
  res.end(body);
}


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * accepts
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var Negotiator = __webpack_require__(73)
var mime = __webpack_require__(11)

/**
 * Module exports.
 * @public
 */

module.exports = Accepts

/**
 * Create a new Accepts object for the given req.
 *
 * @param {object} req
 * @public
 */

function Accepts(req) {
  if (!(this instanceof Accepts))
    return new Accepts(req)

  this.headers = req.headers
  this.negotiator = new Negotiator(req)
}

/**
 * Check if the given `type(s)` is acceptable, returning
 * the best match when true, otherwise `undefined`, in which
 * case you should respond with 406 "Not Acceptable".
 *
 * The `type` value may be a single mime type string
 * such as "application/json", the extension name
 * such as "json" or an array `["json", "html", "text/plain"]`. When a list
 * or array is given the _best_ match, if any is returned.
 *
 * Examples:
 *
 *     // Accept: text/html
 *     this.types('html');
 *     // => "html"
 *
 *     // Accept: text/*, application/json
 *     this.types('html');
 *     // => "html"
 *     this.types('text/html');
 *     // => "text/html"
 *     this.types('json', 'text');
 *     // => "json"
 *     this.types('application/json');
 *     // => "application/json"
 *
 *     // Accept: text/*, application/json
 *     this.types('image/png');
 *     this.types('png');
 *     // => undefined
 *
 *     // Accept: text/*;q=.5, application/json
 *     this.types(['html', 'json']);
 *     this.types('html', 'json');
 *     // => "json"
 *
 * @param {String|Array} types...
 * @return {String|Array|Boolean}
 * @public
 */

Accepts.prototype.type =
Accepts.prototype.types = function (types_) {
  var types = types_

  // support flattened arguments
  if (types && !Array.isArray(types)) {
    types = new Array(arguments.length)
    for (var i = 0; i < types.length; i++) {
      types[i] = arguments[i]
    }
  }

  // no types, return all requested types
  if (!types || types.length === 0) {
    return this.negotiator.mediaTypes()
  }

  if (!this.headers.accept) return types[0];
  var mimes = types.map(extToMime);
  var accepts = this.negotiator.mediaTypes(mimes.filter(validMime));
  var first = accepts[0];
  if (!first) return false;
  return types[mimes.indexOf(first)];
}

/**
 * Return accepted encodings or best fit based on `encodings`.
 *
 * Given `Accept-Encoding: gzip, deflate`
 * an array sorted by quality is returned:
 *
 *     ['gzip', 'deflate']
 *
 * @param {String|Array} encodings...
 * @return {String|Array}
 * @public
 */

Accepts.prototype.encoding =
Accepts.prototype.encodings = function (encodings_) {
  var encodings = encodings_

  // support flattened arguments
  if (encodings && !Array.isArray(encodings)) {
    encodings = new Array(arguments.length)
    for (var i = 0; i < encodings.length; i++) {
      encodings[i] = arguments[i]
    }
  }

  // no encodings, return all requested encodings
  if (!encodings || encodings.length === 0) {
    return this.negotiator.encodings()
  }

  return this.negotiator.encodings(encodings)[0] || false
}

/**
 * Return accepted charsets or best fit based on `charsets`.
 *
 * Given `Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5`
 * an array sorted by quality is returned:
 *
 *     ['utf-8', 'utf-7', 'iso-8859-1']
 *
 * @param {String|Array} charsets...
 * @return {String|Array}
 * @public
 */

Accepts.prototype.charset =
Accepts.prototype.charsets = function (charsets_) {
  var charsets = charsets_

  // support flattened arguments
  if (charsets && !Array.isArray(charsets)) {
    charsets = new Array(arguments.length)
    for (var i = 0; i < charsets.length; i++) {
      charsets[i] = arguments[i]
    }
  }

  // no charsets, return all requested charsets
  if (!charsets || charsets.length === 0) {
    return this.negotiator.charsets()
  }

  return this.negotiator.charsets(charsets)[0] || false
}

/**
 * Return accepted languages or best fit based on `langs`.
 *
 * Given `Accept-Language: en;q=0.8, es, pt`
 * an array sorted by quality is returned:
 *
 *     ['es', 'pt', 'en']
 *
 * @param {String|Array} langs...
 * @return {Array|String}
 * @public
 */

Accepts.prototype.lang =
Accepts.prototype.langs =
Accepts.prototype.language =
Accepts.prototype.languages = function (languages_) {
  var languages = languages_

  // support flattened arguments
  if (languages && !Array.isArray(languages)) {
    languages = new Array(arguments.length)
    for (var i = 0; i < languages.length; i++) {
      languages[i] = arguments[i]
    }
  }

  // no languages, return all requested languages
  if (!languages || languages.length === 0) {
    return this.negotiator.languages()
  }

  return this.negotiator.languages(languages)[0] || false
}

/**
 * Convert extnames to mime.
 *
 * @param {String} type
 * @return {String}
 * @private
 */

function extToMime(type) {
  return type.indexOf('/') === -1
    ? mime.lookup(type)
    : type
}

/**
 * Check if mime is valid.
 *
 * @param {String} type
 * @return {String}
 * @private
 */

function validMime(type) {
  return typeof type === 'string';
}


/***/ }),
/* 32 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 32;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

    // global key for user preferred registration
var REGISTRATION_KEY = '@@any-promise/REGISTRATION',
    // Prior registration (preferred or detected)
    registered = null

/**
 * Registers the given implementation.  An implementation must
 * be registered prior to any call to `require("any-promise")`,
 * typically on application load.
 *
 * If called with no arguments, will return registration in
 * following priority:
 *
 * For Node.js:
 *
 * 1. Previous registration
 * 2. global.Promise if node.js version >= 0.12
 * 3. Auto detected promise based on first sucessful require of
 *    known promise libraries. Note this is a last resort, as the
 *    loaded library is non-deterministic. node.js >= 0.12 will
 *    always use global.Promise over this priority list.
 * 4. Throws error.
 *
 * For Browser:
 *
 * 1. Previous registration
 * 2. window.Promise
 * 3. Throws error.
 *
 * Options:
 *
 * Promise: Desired Promise constructor
 * global: Boolean - Should the registration be cached in a global variable to
 * allow cross dependency/bundle registration?  (default true)
 */
module.exports = function(root, loadImplementation){
  return function register(implementation, opts){
    implementation = implementation || null
    opts = opts || {}
    // global registration unless explicitly  {global: false} in options (default true)
    var registerGlobal = opts.global !== false;

    // load any previous global registration
    if(registered === null && registerGlobal){
      registered = root[REGISTRATION_KEY] || null
    }

    if(registered !== null
        && implementation !== null
        && registered.implementation !== implementation){
      // Throw error if attempting to redefine implementation
      throw new Error('any-promise already defined as "'+registered.implementation+
        '".  You can only register an implementation before the first '+
        ' call to require("any-promise") and an implementation cannot be changed')
    }

    if(registered === null){
      // use provided implementation
      if(implementation !== null && typeof opts.Promise !== 'undefined'){
        registered = {
          Promise: opts.Promise,
          implementation: implementation
        }
      } else {
        // require implementation if implementation is specified but not provided
        registered = loadImplementation(implementation)
      }

      if(registerGlobal){
        // register preference globally in case multiple installations
        root[REGISTRATION_KEY] = registered
      }
    }

    return registered
  }
}


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = __webpack_require__(33)(global, loadImplementation);

/**
 * Node.js version of loadImplementation.
 *
 * Requires the given implementation and returns the registration
 * containing {Promise, implementation}
 *
 * If implementation is undefined or global.Promise, loads it
 * Otherwise uses require
 */
function loadImplementation(implementation){
  var impl = null

  if(shouldPreferGlobalPromise(implementation)){
    // if no implementation or env specified use global.Promise
    impl = {
      Promise: global.Promise,
      implementation: 'global.Promise'
    }
  } else if(implementation){
    // if implementation specified, require it
    var lib = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())
    impl = {
      Promise: lib.Promise || lib,
      implementation: implementation
    }
  } else {
    // try to auto detect implementation. This is non-deterministic
    // and should prefer other branches, but this is our last chance
    // to load something without throwing error
    impl = tryAutoDetect()
  }

  if(impl === null){
    throw new Error('Cannot find any-promise implementation nor'+
      ' global.Promise. You must install polyfill or call'+
      ' require("any-promise/register") with your preferred'+
      ' implementation, e.g. require("any-promise/register/bluebird")'+
      ' on application load prior to any require("any-promise").')
  }

  return impl
}

/**
 * Determines if the global.Promise should be preferred if an implementation
 * has not been registered.
 */
function shouldPreferGlobalPromise(implementation){
  if(implementation){
    return implementation === 'global.Promise'
  } else if(typeof global.Promise !== 'undefined'){
    // Load global promise if implementation not specified
    // Versions < 0.11 did not have global Promise
    // Do not use for version < 0.12 as version 0.11 contained buggy versions
    var version = (/v(\d+)\.(\d+)\.(\d+)/).exec(process.version)
    return !(version && +version[1] == 0 && +version[2] < 12)
  }

  // do not have global.Promise or another implementation was specified
  return false
}

/**
 * Look for common libs as last resort there is no guarantee that
 * this will return a desired implementation or even be deterministic.
 * The priority is also nearly arbitrary. We are only doing this
 * for older versions of Node.js <0.12 that do not have a reasonable
 * global.Promise implementation and we the user has not registered
 * the preference. This preserves the behavior of any-promise <= 0.1
 * and may be deprecated or removed in the future
 */
function tryAutoDetect(){
  var libs = [
      "es6-promise",
      "promise",
      "native-promise-only",
      "bluebird",
      "rsvp",
      "when",
      "q",
      "pinkie",
      "lie",
      "vow"]
  var i = 0, len = libs.length
  for(; i < len; i++){
    try {
      return loadImplementation(libs[i])
    } catch(e){}
  }
  return null
}


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {// import * as path from 'path'
// // import * as fs from 'fs'
// //
// // import * as React from 'react'
// // import { renderToString } from 'react-dom/server'
// // import LandingPage from '../src/components/LandingPage'
//
//
// import * as Koa from 'koa'
// import * as Router from 'koa-router'
// import * as serve from 'koa-static'
// import * as sendFile from 'koa-send'

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var path = __webpack_require__(0);
var fs = __webpack_require__(2);
var Koa = __webpack_require__(30);
var Router = __webpack_require__(27);
var serve = __webpack_require__(29);
var sendFile = __webpack_require__(28);
// import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';
// import App from './app'
var indexHtml = function (_a) {
    var body = _a.body, title = _a.title, cssStyles = _a.cssStyles;
    var css = "\n  <link rel=\"stylesheet\" href=\"./styles.css\" type=\"text/css\" media=\"all\" />\n  <link rel=\"stylesheet\" href=\"./stylesSSR.css\" type=\"text/css\" media=\"all\" />\n  ";
    return "\n<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <title>" + title + "</title>\n    <meta name=\"theme-color\" content=\"#222\" />\n    <styles>" + cssStyles + "</styles>\n    <link rel=\"stylesheet\" href=\"./styles.css\" type=\"text/css\" media=\"all\" />\n  </head>\n  <body>\n    <script>\n      var CACHE_NAME = 'pwa-cache-v1';\n      var urlsToCache = [\n        '/styles.css',\n        '/stylesSSR.css',\n        '/vendor.js',\n        '/manifest.json',\n        '/bundle.js',\n        '/localforage.min.js',\n        'https://cdnjs.cloudflare.com/ajax/libs/react/15.5.4/react.min.js',\n        'https://cdnjs.cloudflare.com/ajax/libs/react/15.5.4/react-dom.min.js',\n      ];\n      self.addEventListener('install', (event) => {\n        event.waitUntil(\n          caches.open(CACHE_NAME)\n            .then(cache => cache.addAll(urlsToCache))\n        );\n      });\n      self.addEventListener('fetch', (event) => {\n          const url = new URL(event.request.url)\n          event.respondWith(\n            caches.match(event.request)\n              .then(response => response || fetch(event.request))\n          );\n      });\n    </script>\n    <div id=\"root\">" + body + "</div>\n    <!-- Dependencies -->\n    <script src=\"./localforage.min.js\"></script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/react/15.5.4/react.min.js\"></script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/react/15.5.4/react-dom.min.js\"></script>\n    <script type=\"text/javascript\" src=\"./vendor.js\"></script>\n    <script type=\"text/javascript\" src=\"./bundle.js\"></script>\n    <script async src=\"https://maps.googleapis.com/maps/api/js?key=AIzaSyDoEtrs7w3fIHSDvbPB7sAUw7tY7bIuAAU&libraries=places\"></script>\n  </body>\n</html>\n  ";
};
var koa = new Koa();
var router = new Router();
var PORT = process.env.PORT || 9090;
router.get('/', function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            // const appString = renderToString(<LandingPage/>)
            // const cssString = fs.readFileSync(path.resolve(__dirname, 'dist', 'stylesSSR.css'), 'utf-8')
            // ctx.body = indexHtml({
            //   body: appString,
            //   title: 'Hayek - Server Side',
            //   cssStyles: '',
            // }));
            return [4 /*yield*/, sendFile(ctx, '/index.html', { root: 'dist' })];
            case 1:
                // const appString = renderToString(<LandingPage/>)
                // const cssString = fs.readFileSync(path.resolve(__dirname, 'dist', 'stylesSSR.css'), 'utf-8')
                // ctx.body = indexHtml({
                //   body: appString,
                //   title: 'Hayek - Server Side',
                //   cssStyles: '',
                // }));
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
koa.use(router.routes());
// serve all files in directory:
koa.use(serve(path.join(__dirname)));
koa.listen(PORT, function () {
    console.log("Koa serving: ./dist/index.html at http://localhost:" + PORT);
});

/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * content-disposition
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 */

module.exports = contentDisposition
module.exports.parse = parse

/**
 * Module dependencies.
 */

var basename = __webpack_require__(0).basename

/**
 * RegExp to match non attr-char, *after* encodeURIComponent (i.e. not including "%")
 */

var ENCODE_URL_ATTR_CHAR_REGEXP = /[\x00-\x20"'()*,/:;<=>?@[\\\]{}\x7f]/g // eslint-disable-line no-control-regex

/**
 * RegExp to match percent encoding escape.
 */

var HEX_ESCAPE_REGEXP = /%[0-9A-Fa-f]{2}/
var HEX_ESCAPE_REPLACE_REGEXP = /%([0-9A-Fa-f]{2})/g

/**
 * RegExp to match non-latin1 characters.
 */

var NON_LATIN1_REGEXP = /[^\x20-\x7e\xa0-\xff]/g

/**
 * RegExp to match quoted-pair in RFC 2616
 *
 * quoted-pair = "\" CHAR
 * CHAR        = <any US-ASCII character (octets 0 - 127)>
 */

var QESC_REGEXP = /\\([\u0000-\u007f])/g

/**
 * RegExp to match chars that must be quoted-pair in RFC 2616
 */

var QUOTE_REGEXP = /([\\"])/g

/**
 * RegExp for various RFC 2616 grammar
 *
 * parameter     = token "=" ( token | quoted-string )
 * token         = 1*<any CHAR except CTLs or separators>
 * separators    = "(" | ")" | "<" | ">" | "@"
 *               | "," | ";" | ":" | "\" | <">
 *               | "/" | "[" | "]" | "?" | "="
 *               | "{" | "}" | SP | HT
 * quoted-string = ( <"> *(qdtext | quoted-pair ) <"> )
 * qdtext        = <any TEXT except <">>
 * quoted-pair   = "\" CHAR
 * CHAR          = <any US-ASCII character (octets 0 - 127)>
 * TEXT          = <any OCTET except CTLs, but including LWS>
 * LWS           = [CRLF] 1*( SP | HT )
 * CRLF          = CR LF
 * CR            = <US-ASCII CR, carriage return (13)>
 * LF            = <US-ASCII LF, linefeed (10)>
 * SP            = <US-ASCII SP, space (32)>
 * HT            = <US-ASCII HT, horizontal-tab (9)>
 * CTL           = <any US-ASCII control character (octets 0 - 31) and DEL (127)>
 * OCTET         = <any 8-bit sequence of data>
 */

var PARAM_REGEXP = /;[\x09\x20]*([!#$%&'*+.0-9A-Z^_`a-z|~-]+)[\x09\x20]*=[\x09\x20]*("(?:[\x20!\x23-\x5b\x5d-\x7e\x80-\xff]|\\[\x20-\x7e])*"|[!#$%&'*+.0-9A-Z^_`a-z|~-]+)[\x09\x20]*/g // eslint-disable-line no-control-regex
var TEXT_REGEXP = /^[\x20-\x7e\x80-\xff]+$/
var TOKEN_REGEXP = /^[!#$%&'*+.0-9A-Z^_`a-z|~-]+$/

/**
 * RegExp for various RFC 5987 grammar
 *
 * ext-value     = charset  "'" [ language ] "'" value-chars
 * charset       = "UTF-8" / "ISO-8859-1" / mime-charset
 * mime-charset  = 1*mime-charsetc
 * mime-charsetc = ALPHA / DIGIT
 *               / "!" / "#" / "$" / "%" / "&"
 *               / "+" / "-" / "^" / "_" / "`"
 *               / "{" / "}" / "~"
 * language      = ( 2*3ALPHA [ extlang ] )
 *               / 4ALPHA
 *               / 5*8ALPHA
 * extlang       = *3( "-" 3ALPHA )
 * value-chars   = *( pct-encoded / attr-char )
 * pct-encoded   = "%" HEXDIG HEXDIG
 * attr-char     = ALPHA / DIGIT
 *               / "!" / "#" / "$" / "&" / "+" / "-" / "."
 *               / "^" / "_" / "`" / "|" / "~"
 */

var EXT_VALUE_REGEXP = /^([A-Za-z0-9!#$%&+\-^_`{}~]+)'(?:[A-Za-z]{2,3}(?:-[A-Za-z]{3}){0,3}|[A-Za-z]{4,8}|)'((?:%[0-9A-Fa-f]{2}|[A-Za-z0-9!#$&+.^_`|~-])+)$/

/**
 * RegExp for various RFC 6266 grammar
 *
 * disposition-type = "inline" | "attachment" | disp-ext-type
 * disp-ext-type    = token
 * disposition-parm = filename-parm | disp-ext-parm
 * filename-parm    = "filename" "=" value
 *                  | "filename*" "=" ext-value
 * disp-ext-parm    = token "=" value
 *                  | ext-token "=" ext-value
 * ext-token        = <the characters in token, followed by "*">
 */

var DISPOSITION_TYPE_REGEXP = /^([!#$%&'*+.0-9A-Z^_`a-z|~-]+)[\x09\x20]*(?:$|;)/ // eslint-disable-line no-control-regex

/**
 * Create an attachment Content-Disposition header.
 *
 * @param {string} [filename]
 * @param {object} [options]
 * @param {string} [options.type=attachment]
 * @param {string|boolean} [options.fallback=true]
 * @return {string}
 * @api public
 */

function contentDisposition (filename, options) {
  var opts = options || {}

  // get type
  var type = opts.type || 'attachment'

  // get parameters
  var params = createparams(filename, opts.fallback)

  // format into string
  return format(new ContentDisposition(type, params))
}

/**
 * Create parameters object from filename and fallback.
 *
 * @param {string} [filename]
 * @param {string|boolean} [fallback=true]
 * @return {object}
 * @api private
 */

function createparams (filename, fallback) {
  if (filename === undefined) {
    return
  }

  var params = {}

  if (typeof filename !== 'string') {
    throw new TypeError('filename must be a string')
  }

  // fallback defaults to true
  if (fallback === undefined) {
    fallback = true
  }

  if (typeof fallback !== 'string' && typeof fallback !== 'boolean') {
    throw new TypeError('fallback must be a string or boolean')
  }

  if (typeof fallback === 'string' && NON_LATIN1_REGEXP.test(fallback)) {
    throw new TypeError('fallback must be ISO-8859-1 string')
  }

  // restrict to file base name
  var name = basename(filename)

  // determine if name is suitable for quoted string
  var isQuotedString = TEXT_REGEXP.test(name)

  // generate fallback name
  var fallbackName = typeof fallback !== 'string'
    ? fallback && getlatin1(name)
    : basename(fallback)
  var hasFallback = typeof fallbackName === 'string' && fallbackName !== name

  // set extended filename parameter
  if (hasFallback || !isQuotedString || HEX_ESCAPE_REGEXP.test(name)) {
    params['filename*'] = name
  }

  // set filename parameter
  if (isQuotedString || hasFallback) {
    params.filename = hasFallback
      ? fallbackName
      : name
  }

  return params
}

/**
 * Format object to Content-Disposition header.
 *
 * @param {object} obj
 * @param {string} obj.type
 * @param {object} [obj.parameters]
 * @return {string}
 * @api private
 */

function format (obj) {
  var parameters = obj.parameters
  var type = obj.type

  if (!type || typeof type !== 'string' || !TOKEN_REGEXP.test(type)) {
    throw new TypeError('invalid type')
  }

  // start with normalized type
  var string = String(type).toLowerCase()

  // append parameters
  if (parameters && typeof parameters === 'object') {
    var param
    var params = Object.keys(parameters).sort()

    for (var i = 0; i < params.length; i++) {
      param = params[i]

      var val = param.substr(-1) === '*'
        ? ustring(parameters[param])
        : qstring(parameters[param])

      string += '; ' + param + '=' + val
    }
  }

  return string
}

/**
 * Decode a RFC 6987 field value (gracefully).
 *
 * @param {string} str
 * @return {string}
 * @api private
 */

function decodefield (str) {
  var match = EXT_VALUE_REGEXP.exec(str)

  if (!match) {
    throw new TypeError('invalid extended field value')
  }

  var charset = match[1].toLowerCase()
  var encoded = match[2]
  var value

  // to binary string
  var binary = encoded.replace(HEX_ESCAPE_REPLACE_REGEXP, pdecode)

  switch (charset) {
    case 'iso-8859-1':
      value = getlatin1(binary)
      break
    case 'utf-8':
      value = new Buffer(binary, 'binary').toString('utf8')
      break
    default:
      throw new TypeError('unsupported charset in extended field')
  }

  return value
}

/**
 * Get ISO-8859-1 version of string.
 *
 * @param {string} val
 * @return {string}
 * @api private
 */

function getlatin1 (val) {
  // simple Unicode -> ISO-8859-1 transformation
  return String(val).replace(NON_LATIN1_REGEXP, '?')
}

/**
 * Parse Content-Disposition header string.
 *
 * @param {string} string
 * @return {object}
 * @api private
 */

function parse (string) {
  if (!string || typeof string !== 'string') {
    throw new TypeError('argument string is required')
  }

  var match = DISPOSITION_TYPE_REGEXP.exec(string)

  if (!match) {
    throw new TypeError('invalid type format')
  }

  // normalize type
  var index = match[0].length
  var type = match[1].toLowerCase()

  var key
  var names = []
  var params = {}
  var value

  // calculate index to start at
  index = PARAM_REGEXP.lastIndex = match[0].substr(-1) === ';'
    ? index - 1
    : index

  // match parameters
  while ((match = PARAM_REGEXP.exec(string))) {
    if (match.index !== index) {
      throw new TypeError('invalid parameter format')
    }

    index += match[0].length
    key = match[1].toLowerCase()
    value = match[2]

    if (names.indexOf(key) !== -1) {
      throw new TypeError('invalid duplicate parameter')
    }

    names.push(key)

    if (key.indexOf('*') + 1 === key.length) {
      // decode extended value
      key = key.slice(0, -1)
      value = decodefield(value)

      // overwrite existing value
      params[key] = value
      continue
    }

    if (typeof params[key] === 'string') {
      continue
    }

    if (value[0] === '"') {
      // remove quotes and escapes
      value = value
        .substr(1, value.length - 2)
        .replace(QESC_REGEXP, '$1')
    }

    params[key] = value
  }

  if (index !== -1 && index !== string.length) {
    throw new TypeError('invalid parameter format')
  }

  return new ContentDisposition(type, params)
}

/**
 * Percent decode a single character.
 *
 * @param {string} str
 * @param {string} hex
 * @return {string}
 * @api private
 */

function pdecode (str, hex) {
  return String.fromCharCode(parseInt(hex, 16))
}

/**
 * Percent encode a single character.
 *
 * @param {string} char
 * @return {string}
 * @api private
 */

function pencode (char) {
  var hex = String(char)
    .charCodeAt(0)
    .toString(16)
    .toUpperCase()
  return hex.length === 1
    ? '%0' + hex
    : '%' + hex
}

/**
 * Quote a string for HTTP.
 *
 * @param {string} val
 * @return {string}
 * @api private
 */

function qstring (val) {
  var str = String(val)

  return '"' + str.replace(QUOTE_REGEXP, '\\$1') + '"'
}

/**
 * Encode a Unicode string for HTTP (RFC 5987).
 *
 * @param {string} val
 * @return {string}
 * @api private
 */

function ustring (val) {
  var str = String(val)

  // percent encode as UTF-8
  var encoded = encodeURIComponent(str)
    .replace(ENCODE_URL_ATTR_CHAR_REGEXP, pencode)

  return 'UTF-8\'\'' + encoded
}

/**
 * Class for parsed Content-Disposition header for v8 optimization
 */

function ContentDisposition (type, parameters) {
  this.type = type
  this.parameters = parameters
}


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * content-type
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * RegExp to match *( ";" parameter ) in RFC 7231 sec 3.1.1.1
 *
 * parameter     = token "=" ( token / quoted-string )
 * token         = 1*tchar
 * tchar         = "!" / "#" / "$" / "%" / "&" / "'" / "*"
 *               / "+" / "-" / "." / "^" / "_" / "`" / "|" / "~"
 *               / DIGIT / ALPHA
 *               ; any VCHAR, except delimiters
 * quoted-string = DQUOTE *( qdtext / quoted-pair ) DQUOTE
 * qdtext        = HTAB / SP / %x21 / %x23-5B / %x5D-7E / obs-text
 * obs-text      = %x80-FF
 * quoted-pair   = "\" ( HTAB / SP / VCHAR / obs-text )
 */
var paramRegExp = /; *([!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+) */g
var textRegExp = /^[\u000b\u0020-\u007e\u0080-\u00ff]+$/
var tokenRegExp = /^[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+$/

/**
 * RegExp to match quoted-pair in RFC 7230 sec 3.2.6
 *
 * quoted-pair = "\" ( HTAB / SP / VCHAR / obs-text )
 * obs-text    = %x80-FF
 */
var qescRegExp = /\\([\u000b\u0020-\u00ff])/g

/**
 * RegExp to match chars that must be quoted-pair in RFC 7230 sec 3.2.6
 */
var quoteRegExp = /([\\"])/g

/**
 * RegExp to match type in RFC 6838
 *
 * media-type = type "/" subtype
 * type       = token
 * subtype    = token
 */
var typeRegExp = /^[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+\/[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+$/

/**
 * Module exports.
 * @public
 */

exports.format = format
exports.parse = parse

/**
 * Format object to media type.
 *
 * @param {object} obj
 * @return {string}
 * @public
 */

function format(obj) {
  if (!obj || typeof obj !== 'object') {
    throw new TypeError('argument obj is required')
  }

  var parameters = obj.parameters
  var type = obj.type

  if (!type || !typeRegExp.test(type)) {
    throw new TypeError('invalid type')
  }

  var string = type

  // append parameters
  if (parameters && typeof parameters === 'object') {
    var param
    var params = Object.keys(parameters).sort()

    for (var i = 0; i < params.length; i++) {
      param = params[i]

      if (!tokenRegExp.test(param)) {
        throw new TypeError('invalid parameter name')
      }

      string += '; ' + param + '=' + qstring(parameters[param])
    }
  }

  return string
}

/**
 * Parse media type to object.
 *
 * @param {string|object} string
 * @return {Object}
 * @public
 */

function parse(string) {
  if (!string) {
    throw new TypeError('argument string is required')
  }

  if (typeof string === 'object') {
    // support req/res-like objects as argument
    string = getcontenttype(string)

    if (typeof string !== 'string') {
      throw new TypeError('content-type header is missing from object');
    }
  }

  if (typeof string !== 'string') {
    throw new TypeError('argument string is required to be a string')
  }

  var index = string.indexOf(';')
  var type = index !== -1
    ? string.substr(0, index).trim()
    : string.trim()

  if (!typeRegExp.test(type)) {
    throw new TypeError('invalid media type')
  }

  var key
  var match
  var obj = new ContentType(type.toLowerCase())
  var value

  paramRegExp.lastIndex = index

  while (match = paramRegExp.exec(string)) {
    if (match.index !== index) {
      throw new TypeError('invalid parameter format')
    }

    index += match[0].length
    key = match[1].toLowerCase()
    value = match[2]

    if (value[0] === '"') {
      // remove quotes and escapes
      value = value
        .substr(1, value.length - 2)
        .replace(qescRegExp, '$1')
    }

    obj.parameters[key] = value
  }

  if (index !== -1 && index !== string.length) {
    throw new TypeError('invalid parameter format')
  }

  return obj
}

/**
 * Get content-type from req/res objects.
 *
 * @param {object}
 * @return {Object}
 * @private
 */

function getcontenttype(obj) {
  if (typeof obj.getHeader === 'function') {
    // res-like
    return obj.getHeader('content-type')
  }

  if (typeof obj.headers === 'object') {
    // req-like
    return obj.headers && obj.headers['content-type']
  }
}

/**
 * Quote a string if necessary.
 *
 * @param {string} val
 * @return {string}
 * @private
 */

function qstring(val) {
  var str = String(val)

  // no need to quote tokens
  if (tokenRegExp.test(str)) {
    return str
  }

  if (str.length > 0 && !textRegExp.test(str)) {
    throw new TypeError('invalid parameter value')
  }

  return '"' + str.replace(quoteRegExp, '\\$1') + '"'
}

/**
 * Class to represent a content type.
 * @private
 */
function ContentType(type) {
  this.parameters = Object.create(null)
  this.type = type
}


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * cookies
 * Copyright(c) 2014 Jed Schmidt, http://jed.is/
 * Copyright(c) 2015-2016 Douglas Christopher Wilson
 * MIT Licensed
 */



var deprecate = __webpack_require__(8)('cookies')
var Keygrip = __webpack_require__(61)
var http = __webpack_require__(13)
var cache = {}

/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */

var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

/**
 * RegExp to match Same-Site cookie attribute value.
 */

var sameSiteRegExp = /^(?:lax|strict)$/i

function Cookies(request, response, options) {
  if (!(this instanceof Cookies)) return new Cookies(request, response, options)

  this.secure = undefined
  this.request = request
  this.response = response

  if (options) {
    if (Array.isArray(options)) {
      // array of key strings
      deprecate('"keys" argument; provide using options {"keys": [...]}')
      this.keys = new Keygrip(options)
    } else if (options.constructor && options.constructor.name === 'Keygrip') {
      // any keygrip constructor to allow different versions
      deprecate('"keys" argument; provide using options {"keys": keygrip}')
      this.keys = options
    } else {
      this.keys = Array.isArray(options.keys) ? new Keygrip(options.keys) : options.keys
      this.secure = options.secure
    }
  }
}

Cookies.prototype.get = function(name, opts) {
  var sigName = name + ".sig"
    , header, match, value, remote, data, index
    , signed = opts && opts.signed !== undefined ? opts.signed : !!this.keys

  header = this.request.headers["cookie"]
  if (!header) return

  match = header.match(getPattern(name))
  if (!match) return

  value = match[1]
  if (!opts || !signed) return value

  remote = this.get(sigName)
  if (!remote) return

  data = name + "=" + value
  if (!this.keys) throw new Error('.keys required for signed cookies');
  index = this.keys.index(data, remote)

  if (index < 0) {
    this.set(sigName, null, {path: "/", signed: false })
  } else {
    index && this.set(sigName, this.keys.sign(data), { signed: false })
    return value
  }
};

Cookies.prototype.set = function(name, value, opts) {
  var res = this.response
    , req = this.request
    , headers = res.getHeader("Set-Cookie") || []
    , secure = this.secure !== undefined ? !!this.secure : req.protocol === 'https' || req.connection.encrypted
    , cookie = new Cookie(name, value, opts)
    , signed = opts && opts.signed !== undefined ? opts.signed : !!this.keys

  if (typeof headers == "string") headers = [headers]

  if (!secure && opts && opts.secure) {
    throw new Error('Cannot send secure cookie over unencrypted connection')
  }

  cookie.secure = secure
  if (opts && "secure" in opts) cookie.secure = opts.secure

  if (opts && "secureProxy" in opts) {
    deprecate('"secureProxy" option; use "secure" option, provide "secure" to constructor if needed')
    cookie.secure = opts.secureProxy
  }

  headers = pushCookie(headers, cookie)

  if (opts && signed) {
    if (!this.keys) throw new Error('.keys required for signed cookies');
    cookie.value = this.keys.sign(cookie.toString())
    cookie.name += ".sig"
    headers = pushCookie(headers, cookie)
  }

  var setHeader = res.set ? http.OutgoingMessage.prototype.setHeader : res.setHeader
  setHeader.call(res, 'Set-Cookie', headers)
  return this
};

function Cookie(name, value, attrs) {
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError('argument name is invalid');
  }

  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError('argument value is invalid');
  }

  value || (this.expires = new Date(0))

  this.name = name
  this.value = value || ""

  for (var name in attrs) {
    this[name] = attrs[name]
  }

  if (this.path && !fieldContentRegExp.test(this.path)) {
    throw new TypeError('option path is invalid');
  }

  if (this.domain && !fieldContentRegExp.test(this.domain)) {
    throw new TypeError('option domain is invalid');
  }

  if (this.sameSite && this.sameSite !== true && !sameSiteRegExp.test(this.sameSite)) {
    throw new TypeError('option sameSite is invalid')
  }
}

Cookie.prototype.path = "/";
Cookie.prototype.expires = undefined;
Cookie.prototype.domain = undefined;
Cookie.prototype.httpOnly = true;
Cookie.prototype.sameSite = false;
Cookie.prototype.secure = false;
Cookie.prototype.overwrite = false;

Cookie.prototype.toString = function() {
  return this.name + "=" + this.value
};

Cookie.prototype.toHeader = function() {
  var header = this.toString()

  if (this.maxAge) this.expires = new Date(Date.now() + this.maxAge);

  if (this.path     ) header += "; path=" + this.path
  if (this.expires  ) header += "; expires=" + this.expires.toUTCString()
  if (this.domain   ) header += "; domain=" + this.domain
  if (this.sameSite ) header += "; samesite=" + (this.sameSite === true ? 'strict' : this.sameSite.toLowerCase())
  if (this.secure   ) header += "; secure"
  if (this.httpOnly ) header += "; httponly"

  return header
};

// back-compat so maxage mirrors maxAge
Object.defineProperty(Cookie.prototype, 'maxage', {
  configurable: true,
  enumerable: true,
  get: function () { return this.maxAge },
  set: function (val) { return this.maxAge = val }
});
deprecate.property(Cookie.prototype, 'maxage', '"maxage"; use "maxAge" instead')

function getPattern(name) {
  if (cache[name]) return cache[name]

  return cache[name] = new RegExp(
    "(?:^|;) *" +
    name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") +
    "=([^;]*)"
  )
}

function pushCookie(cookies, cookie) {
  if (cookie.overwrite) {
    cookies = cookies.filter(function(c) { return c.indexOf(cookie.name+'=') !== 0 })
  }
  cookies.push(cookie.toHeader())
  return cookies
}

Cookies.connect = Cookies.express = function(keys) {
  return function(req, res, next) {
    req.cookies = res.cookies = new Cookies(req, res, {
      keys: keys
    })

    next()
  }
}

Cookies.Cookie = Cookie

module.exports = Cookies


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(15);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window && typeof window.process !== 'undefined' && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document && 'WebkitAppearance' in document.documentElement.style) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window && window.console && (console.firebug || (console.exception && console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var tty = __webpack_require__(93);
var util = __webpack_require__(6);

/**
 * This is the Node.js implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(15);
exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(function (key) {
  return /^debug_/i.test(key);
}).reduce(function (obj, key) {
  // camel-case
  var prop = key
    .substring(6)
    .toLowerCase()
    .replace(/_([a-z])/g, function (_, k) { return k.toUpperCase() });

  // coerce string value into JS value
  var val = process.env[key];
  if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
  else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
  else if (val === 'null') val = null;
  else val = Number(val);

  obj[prop] = val;
  return obj;
}, {});

/**
 * The file descriptor to write the `debug()` calls to.
 * Set the `DEBUG_FD` env variable to override with another value. i.e.:
 *
 *   $ DEBUG_FD=3 node script.js 3>debug.log
 */

var fd = parseInt(process.env.DEBUG_FD, 10) || 2;

if (1 !== fd && 2 !== fd) {
  util.deprecate(function(){}, 'except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)')()
}

var stream = 1 === fd ? process.stdout :
             2 === fd ? process.stderr :
             createWritableStdioStream(fd);

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts
    ? Boolean(exports.inspectOpts.colors)
    : tty.isatty(fd);
}

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

exports.formatters.o = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts)
    .replace(/\s*\n\s*/g, ' ');
};

/**
 * Map %o to `util.inspect()`, allowing multiple lines if needed.
 */

exports.formatters.O = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var name = this.namespace;
  var useColors = this.useColors;

  if (useColors) {
    var c = this.color;
    var prefix = '  \u001b[3' + c + ';1m' + name + ' ' + '\u001b[0m';

    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push('\u001b[3' + c + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
  } else {
    args[0] = new Date().toUTCString()
      + ' ' + name + ' ' + args[0];
  }
}

/**
 * Invokes `util.format()` with the specified arguments and writes to `stream`.
 */

function log() {
  return stream.write(util.format.apply(util, arguments) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  if (null == namespaces) {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  } else {
    process.env.DEBUG = namespaces;
  }
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  return process.env.DEBUG;
}

/**
 * Copied from `node/src/node.js`.
 *
 * XXX: It's lame that node doesn't expose this API out-of-the-box. It also
 * relies on the undocumented `tty_wrap.guessHandleType()` which is also lame.
 */

function createWritableStdioStream (fd) {
  var stream;
  var tty_wrap = process.binding('tty_wrap');

  // Note stream._type is used for test-module-load-list.js

  switch (tty_wrap.guessHandleType(fd)) {
    case 'TTY':
      stream = new tty.WriteStream(fd);
      stream._type = 'tty';

      // Hack to have stream not keep the event loop alive.
      // See https://github.com/joyent/node/issues/1726
      if (stream._handle && stream._handle.unref) {
        stream._handle.unref();
      }
      break;

    case 'FILE':
      var fs = __webpack_require__(2);
      stream = new fs.SyncWriteStream(fd, { autoClose: false });
      stream._type = 'fs';
      break;

    case 'PIPE':
    case 'TCP':
      var net = __webpack_require__(25);
      stream = new net.Socket({
        fd: fd,
        readable: false,
        writable: true
      });

      // FIXME Should probably have an option in net.Socket to create a
      // stream from an existing fd which is writable only. But for now
      // we'll just add this hack and set the `readable` member to false.
      // Test: ./node test/fixtures/echo.js < /etc/passwd
      stream.readable = false;
      stream.read = null;
      stream._type = 'pipe';

      // FIXME Hack to have stream not keep the event loop alive.
      // See https://github.com/joyent/node/issues/1726
      if (stream._handle && stream._handle.unref) {
        stream._handle.unref();
      }
      break;

    default:
      // Probably an error on in uv_guess_handle()
      throw new Error('Implement me. Unknown stream file type!');
  }

  // For supporting legacy API we put the FD here.
  stream.fd = fd;

  stream._isStdio = true;

  return stream;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init (debug) {
  debug.inspectOpts = util._extend({}, exports.inspectOpts);
}

/**
 * Enable namespaces listed in `process.env.DEBUG` initially.
 */

exports.enable(load());


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var pSlice = Array.prototype.slice;
var objectKeys = __webpack_require__(43);
var isArguments = __webpack_require__(42);

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}


/***/ }),
/* 42 */
/***/ (function(module, exports) {

var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}


/***/ }),
/* 44 */
/***/ (function(module, exports) {


/**
 * Expose `Delegator`.
 */

module.exports = Delegator;

/**
 * Initialize a delegator.
 *
 * @param {Object} proto
 * @param {String} target
 * @api public
 */

function Delegator(proto, target) {
  if (!(this instanceof Delegator)) return new Delegator(proto, target);
  this.proto = proto;
  this.target = target;
  this.methods = [];
  this.getters = [];
  this.setters = [];
  this.fluents = [];
}

/**
 * Delegate method `name`.
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */

Delegator.prototype.method = function(name){
  var proto = this.proto;
  var target = this.target;
  this.methods.push(name);

  proto[name] = function(){
    return this[target][name].apply(this[target], arguments);
  };

  return this;
};

/**
 * Delegator accessor `name`.
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */

Delegator.prototype.access = function(name){
  return this.getter(name).setter(name);
};

/**
 * Delegator getter `name`.
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */

Delegator.prototype.getter = function(name){
  var proto = this.proto;
  var target = this.target;
  this.getters.push(name);

  proto.__defineGetter__(name, function(){
    return this[target][name];
  });

  return this;
};

/**
 * Delegator setter `name`.
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */

Delegator.prototype.setter = function(name){
  var proto = this.proto;
  var target = this.target;
  this.setters.push(name);

  proto.__defineSetter__(name, function(val){
    return this[target][name] = val;
  });

  return this;
};

/**
 * Delegator fluent accessor
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */

Delegator.prototype.fluent = function (name) {
  var proto = this.proto;
  var target = this.target;
  this.fluents.push(name);

  proto[name] = function(val){
    if ('undefined' != typeof val) {
      this[target][name] = val;
      return this;
    } else {
      return this[target][name];
    }
  };

  return this;
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * depd
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 */

module.exports = bufferConcat

/**
 * Concatenate an array of Buffers.
 */

function bufferConcat(bufs) {
  var length = 0

  for (var i = 0, len = bufs.length; i < len; i++) {
    length += bufs[i].length
  }

  var buf = new Buffer(length)
  var pos = 0

  for (var i = 0, len = bufs.length; i < len; i++) {
    bufs[i].copy(buf, pos)
    pos += bufs[i].length
  }

  return buf
}


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * depd
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 */

module.exports = callSiteToString

/**
 * Format a CallSite file location to a string.
 */

function callSiteFileLocation(callSite) {
  var fileName
  var fileLocation = ''

  if (callSite.isNative()) {
    fileLocation = 'native'
  } else if (callSite.isEval()) {
    fileName = callSite.getScriptNameOrSourceURL()
    if (!fileName) {
      fileLocation = callSite.getEvalOrigin()
    }
  } else {
    fileName = callSite.getFileName()
  }

  if (fileName) {
    fileLocation += fileName

    var lineNumber = callSite.getLineNumber()
    if (lineNumber != null) {
      fileLocation += ':' + lineNumber

      var columnNumber = callSite.getColumnNumber()
      if (columnNumber) {
        fileLocation += ':' + columnNumber
      }
    }
  }

  return fileLocation || 'unknown source'
}

/**
 * Format a CallSite to a string.
 */

function callSiteToString(callSite) {
  var addSuffix = true
  var fileLocation = callSiteFileLocation(callSite)
  var functionName = callSite.getFunctionName()
  var isConstructor = callSite.isConstructor()
  var isMethodCall = !(callSite.isToplevel() || isConstructor)
  var line = ''

  if (isMethodCall) {
    var methodName = callSite.getMethodName()
    var typeName = getConstructorName(callSite)

    if (functionName) {
      if (typeName && functionName.indexOf(typeName) !== 0) {
        line += typeName + '.'
      }

      line += functionName

      if (methodName && functionName.lastIndexOf('.' + methodName) !== functionName.length - methodName.length - 1) {
        line += ' [as ' + methodName + ']'
      }
    } else {
      line += typeName + '.' + (methodName || '<anonymous>')
    }
  } else if (isConstructor) {
    line += 'new ' + (functionName || '<anonymous>')
  } else if (functionName) {
    line += functionName
  } else {
    addSuffix = false
    line += fileLocation
  }

  if (addSuffix) {
    line += ' (' + fileLocation + ')'
  }

  return line
}

/**
 * Get constructor name of reviver.
 */

function getConstructorName(obj) {
  var receiver = obj.receiver
  return (receiver.constructor && receiver.constructor.name) || null
}


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * depd
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

module.exports = eventListenerCount

/**
 * Get the count of listeners on an event emitter of a specific type.
 */

function eventListenerCount(emitter, type) {
  return emitter.listeners(type).length
}


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * destroy
 * Copyright(c) 2014 Jonathan Ong
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var ReadStream = __webpack_require__(2).ReadStream
var Stream = __webpack_require__(5)

/**
 * Module exports.
 * @public
 */

module.exports = destroy

/**
 * Destroy a stream.
 *
 * @param {object} stream
 * @public
 */

function destroy(stream) {
  if (stream instanceof ReadStream) {
    return destroyReadStream(stream)
  }

  if (!(stream instanceof Stream)) {
    return stream
  }

  if (typeof stream.destroy === 'function') {
    stream.destroy()
  }

  return stream
}

/**
 * Destroy a ReadStream.
 *
 * @param {object} stream
 * @private
 */

function destroyReadStream(stream) {
  stream.destroy()

  if (typeof stream.close === 'function') {
    // node.js core bug work-around
    stream.on('open', onOpenClose)
  }

  return stream
}

/**
 * On open handler to close stream.
 * @private
 */

function onOpenClose() {
  if (typeof this.fd === 'number') {
    // actually close down the fd
    this.close()
  }
}


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * ee-first
 * Copyright(c) 2014 Jonathan Ong
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

module.exports = first

/**
 * Get the first event in a set of event emitters and event pairs.
 *
 * @param {array} stuff
 * @param {function} done
 * @public
 */

function first(stuff, done) {
  if (!Array.isArray(stuff))
    throw new TypeError('arg must be an array of [ee, events...] arrays')

  var cleanups = []

  for (var i = 0; i < stuff.length; i++) {
    var arr = stuff[i]

    if (!Array.isArray(arr) || arr.length < 2)
      throw new TypeError('each array member must be [ee, events...]')

    var ee = arr[0]

    for (var j = 1; j < arr.length; j++) {
      var event = arr[j]
      var fn = listener(event, callback)

      // listen to the event
      ee.on(event, fn)
      // push this listener to the list of cleanups
      cleanups.push({
        ee: ee,
        event: event,
        fn: fn,
      })
    }
  }

  function callback() {
    cleanup()
    done.apply(null, arguments)
  }

  function cleanup() {
    var x
    for (var i = 0; i < cleanups.length; i++) {
      x = cleanups[i]
      x.ee.removeListener(x.event, x.fn)
    }
  }

  function thunk(fn) {
    done = fn
  }

  thunk.cancel = cleanup

  return thunk
}

/**
 * Create the event listener.
 * @private
 */

function listener(event, done) {
  return function onevent(arg1) {
    var args = new Array(arguments.length)
    var ee = this
    var err = event === 'error'
      ? arg1
      : null

    // copy args to prevent arguments escaping scope
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i]
    }

    done(err, ee, event, args)
  }
}


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var Stream = __webpack_require__(5);

module.exports = function (stream, error) {
  if (stream instanceof Stream
    && !~stream.listeners('error').indexOf(error)) {
    stream.on('error', error);
  }
  return stream;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */



/**
 * Module variables.
 * @private
 */

var matchHtmlRegExp = /["'&<>]/;

/**
 * Module exports.
 * @public
 */

module.exports = escapeHtml;

/**
 * Escape special characters in the given string of html.
 *
 * @param  {string} string The string to escape for inserting into HTML
 * @return {string}
 * @public
 */

function escapeHtml(string) {
  var str = '' + string;
  var match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str;
  }

  var escape;
  var html = '';
  var index = 0;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = '&quot;';
        break;
      case 38: // &
        escape = '&amp;';
        break;
      case 39: // '
        escape = '&#39;';
        break;
      case 60: // <
        escape = '&lt;';
        break;
      case 62: // >
        escape = '&gt;';
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index
    ? html + str.substring(lastIndex, index)
    : html;
}


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * fresh
 * Copyright(c) 2012 TJ Holowaychuk
 * Copyright(c) 2016-2017 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * RegExp to check for no-cache token in Cache-Control.
 * @private
 */

var CACHE_CONTROL_NO_CACHE_REGEXP = /(?:^|,)\s*?no-cache\s*?(?:,|$)/

/**
 * Simple expression to split token list.
 * @private
 */

var TOKEN_LIST_REGEXP = / *, */

/**
 * Module exports.
 * @public
 */

module.exports = fresh

/**
 * Check freshness of the response using request and response headers.
 *
 * @param {Object} reqHeaders
 * @param {Object} resHeaders
 * @return {Boolean}
 * @public
 */

function fresh (reqHeaders, resHeaders) {
  // fields
  var modifiedSince = reqHeaders['if-modified-since']
  var noneMatch = reqHeaders['if-none-match']

  // unconditional request
  if (!modifiedSince && !noneMatch) {
    return false
  }

  // Always return stale when Cache-Control: no-cache
  // to support end-to-end reload requests
  // https://tools.ietf.org/html/rfc2616#section-14.9.4
  var cacheControl = reqHeaders['cache-control']
  if (cacheControl && CACHE_CONTROL_NO_CACHE_REGEXP.test(cacheControl)) {
    return false
  }

  // if-none-match
  if (noneMatch && noneMatch !== '*') {
    var etag = resHeaders['etag']
    var etagStale = !etag || noneMatch.split(TOKEN_LIST_REGEXP).every(function (match) {
      return match !== etag && match !== 'W/' + etag && 'W/' + match !== etag
    })

    if (etagStale) {
      return false
    }
  }

  // if-modified-since
  if (modifiedSince) {
    var lastModified = resHeaders['last-modified']
    var modifiedStale = !lastModified || Date.parse(lastModified) > Date.parse(modifiedSince)

    if (modifiedStale) {
      return false
    }
  }

  return true
}


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(2)
var polyfills = __webpack_require__(55)
var legacy = __webpack_require__(54)
var queue = []

var util = __webpack_require__(6)

function noop () {}

var debug = noop
if (util.debuglog)
  debug = util.debuglog('gfs4')
else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ''))
  debug = function() {
    var m = util.format.apply(util, arguments)
    m = 'GFS4: ' + m.split(/\n/).join('\nGFS4: ')
    console.error(m)
  }

if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || '')) {
  process.on('exit', function() {
    debug(queue)
    __webpack_require__(1).equal(queue.length, 0)
  })
}

module.exports = patch(__webpack_require__(17))
if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH) {
  module.exports = patch(fs)
}

// Always patch fs.close/closeSync, because we want to
// retry() whenever a close happens *anywhere* in the program.
// This is essential when multiple graceful-fs instances are
// in play at the same time.
module.exports.close =
fs.close = (function (fs$close) { return function (fd, cb) {
  return fs$close.call(fs, fd, function (err) {
    if (!err)
      retry()

    if (typeof cb === 'function')
      cb.apply(this, arguments)
  })
}})(fs.close)

module.exports.closeSync =
fs.closeSync = (function (fs$closeSync) { return function (fd) {
  // Note that graceful-fs also retries when fs.closeSync() fails.
  // Looks like a bug to me, although it's probably a harmless one.
  var rval = fs$closeSync.apply(fs, arguments)
  retry()
  return rval
}})(fs.closeSync)

function patch (fs) {
  // Everything that references the open() function needs to be in here
  polyfills(fs)
  fs.gracefulify = patch
  fs.FileReadStream = ReadStream;  // Legacy name.
  fs.FileWriteStream = WriteStream;  // Legacy name.
  fs.createReadStream = createReadStream
  fs.createWriteStream = createWriteStream
  var fs$readFile = fs.readFile
  fs.readFile = readFile
  function readFile (path, options, cb) {
    if (typeof options === 'function')
      cb = options, options = null

    return go$readFile(path, options, cb)

    function go$readFile (path, options, cb) {
      return fs$readFile(path, options, function (err) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$readFile, [path, options, cb]])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
          retry()
        }
      })
    }
  }

  var fs$writeFile = fs.writeFile
  fs.writeFile = writeFile
  function writeFile (path, data, options, cb) {
    if (typeof options === 'function')
      cb = options, options = null

    return go$writeFile(path, data, options, cb)

    function go$writeFile (path, data, options, cb) {
      return fs$writeFile(path, data, options, function (err) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$writeFile, [path, data, options, cb]])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
          retry()
        }
      })
    }
  }

  var fs$appendFile = fs.appendFile
  if (fs$appendFile)
    fs.appendFile = appendFile
  function appendFile (path, data, options, cb) {
    if (typeof options === 'function')
      cb = options, options = null

    return go$appendFile(path, data, options, cb)

    function go$appendFile (path, data, options, cb) {
      return fs$appendFile(path, data, options, function (err) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$appendFile, [path, data, options, cb]])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
          retry()
        }
      })
    }
  }

  var fs$readdir = fs.readdir
  fs.readdir = readdir
  function readdir (path, options, cb) {
    var args = [path]
    if (typeof options !== 'function') {
      args.push(options)
    } else {
      cb = options
    }
    args.push(go$readdir$cb)

    return go$readdir(args)

    function go$readdir$cb (err, files) {
      if (files && files.sort)
        files.sort()

      if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
        enqueue([go$readdir, [args]])
      else {
        if (typeof cb === 'function')
          cb.apply(this, arguments)
        retry()
      }
    }
  }

  function go$readdir (args) {
    return fs$readdir.apply(fs, args)
  }

  if (process.version.substr(0, 4) === 'v0.8') {
    var legStreams = legacy(fs)
    ReadStream = legStreams.ReadStream
    WriteStream = legStreams.WriteStream
  }

  var fs$ReadStream = fs.ReadStream
  ReadStream.prototype = Object.create(fs$ReadStream.prototype)
  ReadStream.prototype.open = ReadStream$open

  var fs$WriteStream = fs.WriteStream
  WriteStream.prototype = Object.create(fs$WriteStream.prototype)
  WriteStream.prototype.open = WriteStream$open

  fs.ReadStream = ReadStream
  fs.WriteStream = WriteStream

  function ReadStream (path, options) {
    if (this instanceof ReadStream)
      return fs$ReadStream.apply(this, arguments), this
    else
      return ReadStream.apply(Object.create(ReadStream.prototype), arguments)
  }

  function ReadStream$open () {
    var that = this
    open(that.path, that.flags, that.mode, function (err, fd) {
      if (err) {
        if (that.autoClose)
          that.destroy()

        that.emit('error', err)
      } else {
        that.fd = fd
        that.emit('open', fd)
        that.read()
      }
    })
  }

  function WriteStream (path, options) {
    if (this instanceof WriteStream)
      return fs$WriteStream.apply(this, arguments), this
    else
      return WriteStream.apply(Object.create(WriteStream.prototype), arguments)
  }

  function WriteStream$open () {
    var that = this
    open(that.path, that.flags, that.mode, function (err, fd) {
      if (err) {
        that.destroy()
        that.emit('error', err)
      } else {
        that.fd = fd
        that.emit('open', fd)
      }
    })
  }

  function createReadStream (path, options) {
    return new ReadStream(path, options)
  }

  function createWriteStream (path, options) {
    return new WriteStream(path, options)
  }

  var fs$open = fs.open
  fs.open = open
  function open (path, flags, mode, cb) {
    if (typeof mode === 'function')
      cb = mode, mode = null

    return go$open(path, flags, mode, cb)

    function go$open (path, flags, mode, cb) {
      return fs$open(path, flags, mode, function (err, fd) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$open, [path, flags, mode, cb]])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
          retry()
        }
      })
    }
  }

  return fs
}

function enqueue (elem) {
  debug('ENQUEUE', elem[0].name, elem[1])
  queue.push(elem)
}

function retry () {
  var elem = queue.shift()
  if (elem) {
    debug('RETRY', elem[0].name, elem[1])
    elem[0].apply(null, elem[1])
  }
}


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var Stream = __webpack_require__(5).Stream

module.exports = legacy

function legacy (fs) {
  return {
    ReadStream: ReadStream,
    WriteStream: WriteStream
  }

  function ReadStream (path, options) {
    if (!(this instanceof ReadStream)) return new ReadStream(path, options);

    Stream.call(this);

    var self = this;

    this.path = path;
    this.fd = null;
    this.readable = true;
    this.paused = false;

    this.flags = 'r';
    this.mode = 438; /*=0666*/
    this.bufferSize = 64 * 1024;

    options = options || {};

    // Mixin options into this
    var keys = Object.keys(options);
    for (var index = 0, length = keys.length; index < length; index++) {
      var key = keys[index];
      this[key] = options[key];
    }

    if (this.encoding) this.setEncoding(this.encoding);

    if (this.start !== undefined) {
      if ('number' !== typeof this.start) {
        throw TypeError('start must be a Number');
      }
      if (this.end === undefined) {
        this.end = Infinity;
      } else if ('number' !== typeof this.end) {
        throw TypeError('end must be a Number');
      }

      if (this.start > this.end) {
        throw new Error('start must be <= end');
      }

      this.pos = this.start;
    }

    if (this.fd !== null) {
      process.nextTick(function() {
        self._read();
      });
      return;
    }

    fs.open(this.path, this.flags, this.mode, function (err, fd) {
      if (err) {
        self.emit('error', err);
        self.readable = false;
        return;
      }

      self.fd = fd;
      self.emit('open', fd);
      self._read();
    })
  }

  function WriteStream (path, options) {
    if (!(this instanceof WriteStream)) return new WriteStream(path, options);

    Stream.call(this);

    this.path = path;
    this.fd = null;
    this.writable = true;

    this.flags = 'w';
    this.encoding = 'binary';
    this.mode = 438; /*=0666*/
    this.bytesWritten = 0;

    options = options || {};

    // Mixin options into this
    var keys = Object.keys(options);
    for (var index = 0, length = keys.length; index < length; index++) {
      var key = keys[index];
      this[key] = options[key];
    }

    if (this.start !== undefined) {
      if ('number' !== typeof this.start) {
        throw TypeError('start must be a Number');
      }
      if (this.start < 0) {
        throw new Error('start must be >= zero');
      }

      this.pos = this.start;
    }

    this.busy = false;
    this._queue = [];

    if (this.fd === null) {
      this._open = fs.open;
      this._queue.push([this._open, this.path, this.flags, this.mode, undefined]);
      this.flush();
    }
  }
}


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(17)
var constants = __webpack_require__(90)

var origCwd = process.cwd
var cwd = null

var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform

process.cwd = function() {
  if (!cwd)
    cwd = origCwd.call(process)
  return cwd
}
try {
  process.cwd()
} catch (er) {}

var chdir = process.chdir
process.chdir = function(d) {
  cwd = null
  chdir.call(process, d)
}

module.exports = patch

function patch (fs) {
  // (re-)implement some things that are known busted or missing.

  // lchmod, broken prior to 0.6.2
  // back-port the fix here.
  if (constants.hasOwnProperty('O_SYMLINK') &&
      process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
    patchLchmod(fs)
  }

  // lutimes implementation, or no-op
  if (!fs.lutimes) {
    patchLutimes(fs)
  }

  // https://github.com/isaacs/node-graceful-fs/issues/4
  // Chown should not fail on einval or eperm if non-root.
  // It should not fail on enosys ever, as this just indicates
  // that a fs doesn't support the intended operation.

  fs.chown = chownFix(fs.chown)
  fs.fchown = chownFix(fs.fchown)
  fs.lchown = chownFix(fs.lchown)

  fs.chmod = chmodFix(fs.chmod)
  fs.fchmod = chmodFix(fs.fchmod)
  fs.lchmod = chmodFix(fs.lchmod)

  fs.chownSync = chownFixSync(fs.chownSync)
  fs.fchownSync = chownFixSync(fs.fchownSync)
  fs.lchownSync = chownFixSync(fs.lchownSync)

  fs.chmodSync = chmodFixSync(fs.chmodSync)
  fs.fchmodSync = chmodFixSync(fs.fchmodSync)
  fs.lchmodSync = chmodFixSync(fs.lchmodSync)

  fs.stat = statFix(fs.stat)
  fs.fstat = statFix(fs.fstat)
  fs.lstat = statFix(fs.lstat)

  fs.statSync = statFixSync(fs.statSync)
  fs.fstatSync = statFixSync(fs.fstatSync)
  fs.lstatSync = statFixSync(fs.lstatSync)

  // if lchmod/lchown do not exist, then make them no-ops
  if (!fs.lchmod) {
    fs.lchmod = function (path, mode, cb) {
      if (cb) process.nextTick(cb)
    }
    fs.lchmodSync = function () {}
  }
  if (!fs.lchown) {
    fs.lchown = function (path, uid, gid, cb) {
      if (cb) process.nextTick(cb)
    }
    fs.lchownSync = function () {}
  }

  // on Windows, A/V software can lock the directory, causing this
  // to fail with an EACCES or EPERM if the directory contains newly
  // created files.  Try again on failure, for up to 60 seconds.

  // Set the timeout this long because some Windows Anti-Virus, such as Parity
  // bit9, may lock files for up to a minute, causing npm package install
  // failures. Also, take care to yield the scheduler. Windows scheduling gives
  // CPU to a busy looping process, which can cause the program causing the lock
  // contention to be starved of CPU by node, so the contention doesn't resolve.
  if (platform === "win32") {
    fs.rename = (function (fs$rename) { return function (from, to, cb) {
      var start = Date.now()
      var backoff = 0;
      fs$rename(from, to, function CB (er) {
        if (er
            && (er.code === "EACCES" || er.code === "EPERM")
            && Date.now() - start < 60000) {
          setTimeout(function() {
            fs.stat(to, function (stater, st) {
              if (stater && stater.code === "ENOENT")
                fs$rename(from, to, CB);
              else
                cb(er)
            })
          }, backoff)
          if (backoff < 100)
            backoff += 10;
          return;
        }
        if (cb) cb(er)
      })
    }})(fs.rename)
  }

  // if read() returns EAGAIN, then just try it again.
  fs.read = (function (fs$read) { return function (fd, buffer, offset, length, position, callback_) {
    var callback
    if (callback_ && typeof callback_ === 'function') {
      var eagCounter = 0
      callback = function (er, _, __) {
        if (er && er.code === 'EAGAIN' && eagCounter < 10) {
          eagCounter ++
          return fs$read.call(fs, fd, buffer, offset, length, position, callback)
        }
        callback_.apply(this, arguments)
      }
    }
    return fs$read.call(fs, fd, buffer, offset, length, position, callback)
  }})(fs.read)

  fs.readSync = (function (fs$readSync) { return function (fd, buffer, offset, length, position) {
    var eagCounter = 0
    while (true) {
      try {
        return fs$readSync.call(fs, fd, buffer, offset, length, position)
      } catch (er) {
        if (er.code === 'EAGAIN' && eagCounter < 10) {
          eagCounter ++
          continue
        }
        throw er
      }
    }
  }})(fs.readSync)
}

function patchLchmod (fs) {
  fs.lchmod = function (path, mode, callback) {
    fs.open( path
           , constants.O_WRONLY | constants.O_SYMLINK
           , mode
           , function (err, fd) {
      if (err) {
        if (callback) callback(err)
        return
      }
      // prefer to return the chmod error, if one occurs,
      // but still try to close, and report closing errors if they occur.
      fs.fchmod(fd, mode, function (err) {
        fs.close(fd, function(err2) {
          if (callback) callback(err || err2)
        })
      })
    })
  }

  fs.lchmodSync = function (path, mode) {
    var fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode)

    // prefer to return the chmod error, if one occurs,
    // but still try to close, and report closing errors if they occur.
    var threw = true
    var ret
    try {
      ret = fs.fchmodSync(fd, mode)
      threw = false
    } finally {
      if (threw) {
        try {
          fs.closeSync(fd)
        } catch (er) {}
      } else {
        fs.closeSync(fd)
      }
    }
    return ret
  }
}

function patchLutimes (fs) {
  if (constants.hasOwnProperty("O_SYMLINK")) {
    fs.lutimes = function (path, at, mt, cb) {
      fs.open(path, constants.O_SYMLINK, function (er, fd) {
        if (er) {
          if (cb) cb(er)
          return
        }
        fs.futimes(fd, at, mt, function (er) {
          fs.close(fd, function (er2) {
            if (cb) cb(er || er2)
          })
        })
      })
    }

    fs.lutimesSync = function (path, at, mt) {
      var fd = fs.openSync(path, constants.O_SYMLINK)
      var ret
      var threw = true
      try {
        ret = fs.futimesSync(fd, at, mt)
        threw = false
      } finally {
        if (threw) {
          try {
            fs.closeSync(fd)
          } catch (er) {}
        } else {
          fs.closeSync(fd)
        }
      }
      return ret
    }

  } else {
    fs.lutimes = function (_a, _b, _c, cb) { if (cb) process.nextTick(cb) }
    fs.lutimesSync = function () {}
  }
}

function chmodFix (orig) {
  if (!orig) return orig
  return function (target, mode, cb) {
    return orig.call(fs, target, mode, function (er) {
      if (chownErOk(er)) er = null
      if (cb) cb.apply(this, arguments)
    })
  }
}

function chmodFixSync (orig) {
  if (!orig) return orig
  return function (target, mode) {
    try {
      return orig.call(fs, target, mode)
    } catch (er) {
      if (!chownErOk(er)) throw er
    }
  }
}


function chownFix (orig) {
  if (!orig) return orig
  return function (target, uid, gid, cb) {
    return orig.call(fs, target, uid, gid, function (er) {
      if (chownErOk(er)) er = null
      if (cb) cb.apply(this, arguments)
    })
  }
}

function chownFixSync (orig) {
  if (!orig) return orig
  return function (target, uid, gid) {
    try {
      return orig.call(fs, target, uid, gid)
    } catch (er) {
      if (!chownErOk(er)) throw er
    }
  }
}


function statFix (orig) {
  if (!orig) return orig
  // Older versions of Node erroneously returned signed integers for
  // uid + gid.
  return function (target, cb) {
    return orig.call(fs, target, function (er, stats) {
      if (!stats) return cb.apply(this, arguments)
      if (stats.uid < 0) stats.uid += 0x100000000
      if (stats.gid < 0) stats.gid += 0x100000000
      if (cb) cb.apply(this, arguments)
    })
  }
}

function statFixSync (orig) {
  if (!orig) return orig
  // Older versions of Node erroneously returned signed integers for
  // uid + gid.
  return function (target) {
    var stats = orig.call(fs, target)
    if (stats.uid < 0) stats.uid += 0x100000000
    if (stats.gid < 0) stats.gid += 0x100000000
    return stats;
  }
}

// ENOSYS means that the fs doesn't support the op. Just ignore
// that, because it doesn't matter.
//
// if there's no getuid, or if getuid() is something other
// than 0, and the error is EINVAL or EPERM, then just ignore
// it.
//
// This specific case is a silent failure in cp, install, tar,
// and most other unix tools that manage permissions.
//
// When running as root, or if other types of errors are
// encountered, then it's strict.
function chownErOk (er) {
  if (!er)
    return true

  if (er.code === "ENOSYS")
    return true

  var nonroot = !process.getuid || process.getuid() !== 0
  if (nonroot) {
    if (er.code === "EINVAL" || er.code === "EPERM")
      return true
  }

  return false
}


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var createError = __webpack_require__(57);
var eql = __webpack_require__(41);

module.exports = assert;

function assert(value, status, msg, opts) {
  if (value) return;
  throw createError(status, msg, opts);
}

assert.equal = function(a, b, status, msg, opts) {
  assert(a == b, status, msg, opts);
};

assert.notEqual = function(a, b, status, msg, opts) {
  assert(a != b, status, msg, opts);
};

assert.strictEqual = function(a, b, status, msg, opts) {
  assert(a === b, status, msg, opts);
};

assert.notStrictEqual = function(a, b, status, msg, opts) {
  assert(a !== b, status, msg, opts);
};

assert.deepEqual = function(a, b, status, msg, opts) {
  assert(eql(a, b), status, msg, opts);
};

assert.notDeepEqual = function(a, b, status, msg, opts) {
  assert(!eql(a, b), status, msg, opts);
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {


var statuses = __webpack_require__(4);
var inherits = __webpack_require__(58);

function toIdentifier(str) {
  return str.split(' ').map(function (token) {
    return token.slice(0, 1).toUpperCase() + token.slice(1)
  }).join('').replace(/[^ _0-9a-z]/gi, '')
}

exports = module.exports = function httpError() {
  // so much arity going on ~_~
  var err;
  var msg;
  var status = 500;
  var props = {};
  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    if (arg instanceof Error) {
      err = arg;
      status = err.status || err.statusCode || status;
      continue;
    }
    switch (typeof arg) {
      case 'string':
        msg = arg;
        break;
      case 'number':
        status = arg;
        break;
      case 'object':
        props = arg;
        break;
    }
  }

  if (typeof status !== 'number' || !statuses[status]) {
    status = 500
  }

  // constructor
  var HttpError = exports[status]

  if (!err) {
    // create error
    err = HttpError
      ? new HttpError(msg)
      : new Error(msg || statuses[status])
    Error.captureStackTrace(err, httpError)
  }

  if (!HttpError || !(err instanceof HttpError)) {
    // add properties to generic error
    err.expose = status < 500
    err.status = err.statusCode = status
  }

  for (var key in props) {
    if (key !== 'status' && key !== 'statusCode') {
      err[key] = props[key]
    }
  }

  return err;
};

var HttpError = exports.HttpError = function HttpError() {
  throw new TypeError('cannot construct abstract class');
};

inherits(HttpError, Error);

// create generic error objects
var codes = statuses.codes.filter(function (num) {
  return num >= 400;
});

codes.forEach(function (code) {
  var name = toIdentifier(statuses[code])
  var className = name.match(/Error$/) ? name : name + 'Error'

  if (code >= 500) {
    var ServerError = function ServerError(msg) {
      var self = new Error(msg != null ? msg : statuses[code])
      Error.captureStackTrace(self, ServerError)
      self.__proto__ = ServerError.prototype
      Object.defineProperty(self, 'name', {
        enumerable: false,
        configurable: true,
        value: className,
        writable: true
      })
      return self
    }
    inherits(ServerError, HttpError);
    ServerError.prototype.status =
    ServerError.prototype.statusCode = code;
    ServerError.prototype.expose = false;
    exports[code] =
    exports[name] = ServerError
    return;
  }

  var ClientError = function ClientError(msg) {
    var self = new Error(msg != null ? msg : statuses[code])
    Error.captureStackTrace(self, ClientError)
    self.__proto__ = ClientError.prototype
    Object.defineProperty(self, 'name', {
      enumerable: false,
      configurable: true,
      value: className,
      writable: true
    })
    return self
  }
  inherits(ClientError, HttpError);
  ClientError.prototype.status =
  ClientError.prototype.statusCode = code;
  ClientError.prototype.expose = true;
  exports[code] =
  exports[name] = ClientError
  return;
});

// backwards-compatibility
exports["I'mateapot"] = exports.ImATeapot


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6).inherits


/***/ }),
/* 59 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;
var fnToStr = Function.prototype.toString;
var isFnRegex = /^\s*(?:function)?\*/;
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
var getProto = Object.getPrototypeOf;
var getGeneratorFunc = function () { // eslint-disable-line consistent-return
	if (!hasToStringTag) {
		return false;
	}
	try {
		return Function('return function*() {}')();
	} catch (e) {
	}
};
var generatorFunc = getGeneratorFunc();
var GeneratorFunction = generatorFunc ? getProto(generatorFunc) : {};

module.exports = function isGeneratorFunction(fn) {
	if (typeof fn !== 'function') {
		return false;
	}
	if (isFnRegex.test(fnToStr.call(fn))) {
		return true;
	}
	if (!hasToStringTag) {
		var str = toStr.call(fn);
		return str === '[object GeneratorFunction]';
	}
	return getProto(fn) === GeneratorFunction;
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var crypto = __webpack_require__(91)
  
function Keygrip(keys, algorithm, encoding) {
  if (!algorithm) algorithm = "sha1";
  if (!encoding) encoding = "base64";
  if (!(this instanceof Keygrip)) return new Keygrip(keys, algorithm, encoding)

  if (!keys || !(0 in keys)) {
    throw new Error("Keys must be provided.")
  }

  function sign(data, key) {
    return crypto
      .createHmac(algorithm, key)
      .update(data).digest(encoding)
      .replace(/\/|\+|=/g, function(x) {
        return ({ "/": "_", "+": "-", "=": "" })[x]
      })
  }

  this.sign = function(data){ return sign(data, keys[0]) }

  this.verify = function(data, digest) {
    return this.index(data, digest) > -1
  }

  this.index = function(data, digest) {
    for (var i = 0, l = keys.length; i < l; i++) {
      if (constantTimeCompare(digest, sign(data, keys[i]))) return i
    }

    return -1
  }
}

Keygrip.sign = Keygrip.verify = Keygrip.index = function() {
  throw new Error("Usage: require('keygrip')(<array-of-keys>)")
}

//http://codahale.com/a-lesson-in-timing-attacks/
var constantTimeCompare = function(val1, val2){
    if(val1 == null && val2 != null){
        return false;
    } else if(val2 == null && val1 != null){
        return false;
    } else if(val1 == null && val2 == null){
        return true;
    }

    if(val1.length !== val2.length){
        return false;
    }

    var matches = 1;

    for(var i = 0; i < val1.length; i++){
        matches &= (val1.charAt(i) === val2.charAt(i) ? 1 : 0); //Don't short circuit
    }

    return matches === 1;
};

module.exports = Keygrip


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const co = __webpack_require__(14)
const compose = __webpack_require__(10)

module.exports = convert

function convert (mw) {
  if (typeof mw !== 'function') {
    throw new TypeError('middleware must be a function')
  }
  if (mw.constructor.name !== 'GeneratorFunction') {
    // assume it's Promise-based middleware
    return mw
  }
  const converted = function (ctx, next) {
    return co.call(ctx, mw.call(ctx, createGenerator(next)))
  }
  converted._name = mw._name || mw.name
  return converted
}

function * createGenerator (next) {
  return yield next()
}

// convert.compose(mw, mw, mw)
// convert.compose([mw, mw, mw])
convert.compose = function (arr) {
  if (!Array.isArray(arr)) {
    arr = Array.from(arguments)
  }
  return compose(arr.map(convert))
}

convert.back = function (mw) {
  if (typeof mw !== 'function') {
    throw new TypeError('middleware must be a function')
  }
  if (mw.constructor.name === 'GeneratorFunction') {
    // assume it's generator middleware
    return mw
  }
  const converted = function * (next) {
    let ctx = this
    let called = false
    // no need try...catch here, it's ok even `mw()` throw exception
    yield Promise.resolve(mw(ctx, function () {
      if (called) {
        // guard against multiple next() calls
        // https://github.com/koajs/compose/blob/4e3e96baf58b817d71bd44a8c0d78bb42623aa95/index.js#L36
        return Promise.reject(new Error('next() called multiple times'))
      }
      called = true
      return co.call(ctx, next)
    }))
  }
  converted._name = mw._name || mw.name
  return converted
}


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var debug = __webpack_require__(3)('koa-router');
var pathToRegExp = __webpack_require__(80);

module.exports = Layer;

/**
 * Initialize a new routing Layer with given `method`, `path`, and `middleware`.
 *
 * @param {String|RegExp} path Path string or regular expression.
 * @param {Array} methods Array of HTTP verbs.
 * @param {Array} middleware Layer callback/middleware or series of.
 * @param {Object=} opts
 * @param {String=} opts.name route name
 * @param {String=} opts.sensitive case sensitive (default: false)
 * @param {String=} opts.strict require the trailing slash (default: false)
 * @returns {Layer}
 * @private
 */

function Layer(path, methods, middleware, opts) {
  this.opts = opts || {};
  this.name = this.opts.name || null;
  this.methods = [];
  this.paramNames = [];
  this.stack = Array.isArray(middleware) ? middleware : [middleware];

  methods.forEach(function(method) {
    var l = this.methods.push(method.toUpperCase());
    if (this.methods[l-1] === 'GET') {
      this.methods.unshift('HEAD');
    }
  }, this);

  // ensure middleware is a function
  this.stack.forEach(function(fn) {
    var type = (typeof fn);
    if (type !== 'function') {
      throw new Error(
        methods.toString() + " `" + (this.opts.name || path) +"`: `middleware` "
        + "must be a function, not `" + type + "`"
      );
    }
  }, this);

  this.path = path;
  this.regexp = pathToRegExp(path, this.paramNames, this.opts);

  debug('defined route %s %s', this.methods, this.opts.prefix + this.path);
};

/**
 * Returns whether request `path` matches route.
 *
 * @param {String} path
 * @returns {Boolean}
 * @private
 */

Layer.prototype.match = function (path) {
  return this.regexp.test(path);
};

/**
 * Returns map of URL parameters for given `path` and `paramNames`.
 *
 * @param {String} path
 * @param {Array.<String>} captures
 * @param {Object=} existingParams
 * @returns {Object}
 * @private
 */

Layer.prototype.params = function (path, captures, existingParams) {
  var params = existingParams || {};

  for (var len = captures.length, i=0; i<len; i++) {
    if (this.paramNames[i]) {
      var c = captures[i];
      params[this.paramNames[i].name] = c ? safeDecodeURIComponent(c) : c;
    }
  }

  return params;
};

/**
 * Returns array of regexp url path captures.
 *
 * @param {String} path
 * @returns {Array.<String>}
 * @private
 */

Layer.prototype.captures = function (path) {
  if (this.opts.ignoreCaptures) return [];
  return path.match(this.regexp).slice(1);
};

/**
 * Generate URL for route using given `params`.
 *
 * @example
 *
 * ```javascript
 * var route = new Layer(['GET'], '/users/:id', fn);
 *
 * route.url({ id: 123 }); // => "/users/123"
 * ```
 *
 * @param {Object} params url parameters
 * @returns {String}
 * @private
 */

Layer.prototype.url = function (params) {
  var args = params;
  var url = this.path;
  var toPath = pathToRegExp.compile(url);

  // argument is of form { key: val }
  if (typeof params != 'object') {
    args = Array.prototype.slice.call(arguments);
  }

  if (args instanceof Array) {
    var tokens = pathToRegExp.parse(url);
    var replace = {};
    for (var len = tokens.length, i=0, j=0; i<len; i++) {
      if (tokens[i].name) replace[tokens[i].name] = args[j++];
    }
    return toPath(replace);
  }
  else {
    return toPath(params);
  }
};

/**
 * Run validations on route named parameters.
 *
 * @example
 *
 * ```javascript
 * router
 *   .param('user', function (id, ctx, next) {
 *     ctx.user = users[id];
 *     if (!user) return ctx.status = 404;
 *     next();
 *   })
 *   .get('/users/:user', function (ctx, next) {
 *     ctx.body = ctx.user;
 *   });
 * ```
 *
 * @param {String} param
 * @param {Function} middleware
 * @returns {Layer}
 * @private
 */

Layer.prototype.param = function (param, fn) {
  var stack = this.stack;
  var params = this.paramNames;
  var middleware = function (ctx, next) {
    return fn.call(this, ctx.params[param], ctx, next);
  };
  middleware.param = param;

  var names = params.map(function (p) {
    return p.name;
  });

  var x = names.indexOf(param);
  if (x > -1) {
    // iterate through the stack, to figure out where to place the handler fn
    stack.some(function (fn, i) {
      // param handlers are always first, so when we find an fn w/o a param property, stop here
      // if the param handler at this part of the stack comes after the one we are adding, stop here
      if (!fn.param || names.indexOf(fn.param) > x) {
        // inject this param handler right before the current item
        stack.splice(i, 0, middleware);
        return true; // then break the loop
      }
    });
  }

  return this;
};

/**
 * Prefix route path.
 *
 * @param {String} prefix
 * @returns {Layer}
 * @private
 */

Layer.prototype.setPrefix = function (prefix) {
  if (this.path) {
    this.path = prefix + this.path;
    this.paramNames = [];
    this.regexp = pathToRegExp(this.path, this.paramNames, this.opts);
  }

  return this;
};

/**
 * Safe decodeURIComponent, won't throw any error.
 * If `decodeURIComponent` error happen, just return the original value.
 *
 * @param {String} text
 * @returns {String} URL decode original string.
 * @private
 */

function safeDecodeURIComponent(text) {
  try {
    return decodeURIComponent(text);
  } catch (e) {
    return text;
  }
}


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var debug = __webpack_require__(3)('koa-send');
var resolvePath = __webpack_require__(22);
var assert = __webpack_require__(1);
var path = __webpack_require__(0);
var normalize = path.normalize;
var basename = path.basename;
var extname = path.extname;
var resolve = path.resolve;
var parse = path.parse;
var sep = path.sep;
var fs = __webpack_require__(20);
var co = __webpack_require__(14);

/**
 * Expose `send()`.
 */

module.exports = send;

/**
 * Send file at `path` with the
 * given `options` to the koa `ctx`.
 *
 * @param {Context} ctx
 * @param {String} path
 * @param {Object} [opts]
 * @return {Function}
 * @api public
 */

function send(ctx, path, opts) {
  return co(function *(){

    assert(ctx, 'koa context required');
    assert(path, 'pathname required');
    opts = opts || {};

    // options
    debug('send "%s" %j', path, opts);
    var root = opts.root ? normalize(resolve(opts.root)) : '';
    var trailingSlash = '/' == path[path.length - 1];
    path = path.substr(parse(path).root.length);
    var index = opts.index;
    var maxage = opts.maxage || opts.maxAge || 0;
    var hidden = opts.hidden || false;
    var format = opts.format === false ? false : true;
    var extensions = Array.isArray(opts.extensions) ? opts.extensions : false;
    var gzip = opts.gzip === false ? false : true;
    var setHeaders = opts.setHeaders;

    if (setHeaders && typeof setHeaders !== 'function') {
      throw new TypeError('option setHeaders must be function')
    }

    var encoding = ctx.acceptsEncodings('gzip', 'deflate', 'identity');

    // normalize path
    path = decode(path);

    if (-1 == path) return ctx.throw('failed to decode', 400);

    // index file support
    if (index && trailingSlash) path += index;

    path = resolvePath(root, path);

    // hidden file support, ignore
    if (!hidden && isHidden(root, path)) return;

    // serve gzipped file when possible
    if (encoding === 'gzip' && gzip && (yield fs.exists(path + '.gz'))) {
      path = path + '.gz';
      ctx.set('Content-Encoding', 'gzip');
      ctx.res.removeHeader('Content-Length');
    }

    if (extensions && !/\..*$/.exec(path)) {
      var list = [].concat(extensions);
      for (var i = 0; i < list.length; i++) {
        var ext = list[i];
        if (typeof ext !== 'string') {
          throw new TypeError('option extensions must be array of strings or false');
        }
        if (!/^\./.exec(ext)) ext = '.' + ext;
        if (yield fs.exists(path + ext)) {
          path = path + ext;
          break;
        }
      }
    }

    // stat
    try {
      var stats = yield fs.stat(path);

      // Format the path to serve static file servers
      // and not require a trailing slash for directories,
      // so that you can do both `/directory` and `/directory/`
      if (stats.isDirectory()) {
        if (format && index) {
          path += '/' + index;
          stats = yield fs.stat(path);
        } else {
          return;
        }
      }
    } catch (err) {
      var notfound = ['ENOENT', 'ENAMETOOLONG', 'ENOTDIR'];
      if (~notfound.indexOf(err.code)) return;
      err.status = 500;
      throw err;
    }

    if (setHeaders) setHeaders(ctx.res, path, stats);

    // stream
    ctx.set('Content-Length', stats.size);
    if (!ctx.response.get('Last-Modified')) ctx.set('Last-Modified', stats.mtime.toUTCString());
    if (!ctx.response.get('Cache-Control')) ctx.set('Cache-Control', 'max-age=' + (maxage / 1000 | 0));
    ctx.type = type(path);
    ctx.body = fs.createReadStream(path);

    return path;
  });
}

/**
 * Check if it's hidden.
 */

function isHidden(root, path) {
  path = path.substr(root.length).split(sep);
  for(var i = 0; i < path.length; i++) {
    if(path[i][0] === '.') return true;
  }
  return false;
}

/**
 * File type.
 */

function type(file) {
  return extname(basename(file, '.gz'));
}

/**
 * Decode `path`.
 */

function decode(path) {
  try {
    return decodeURIComponent(path);
  } catch (err) {
    return -1;
  }
}


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



/**
 * Module dependencies.
 */

const createError = __webpack_require__(9);
const httpAssert = __webpack_require__(56);
const delegate = __webpack_require__(44);
const statuses = __webpack_require__(4);

/**
 * Context prototype.
 */

const proto = module.exports = {

  /**
   * util.inspect() implementation, which
   * just returns the JSON output.
   *
   * @return {Object}
   * @api public
   */

  inspect() {
    return this.toJSON();
  },

  /**
   * Return JSON representation.
   *
   * Here we explicitly invoke .toJSON() on each
   * object, as iteration will otherwise fail due
   * to the getters and cause utilities such as
   * clone() to fail.
   *
   * @return {Object}
   * @api public
   */

  toJSON() {
    return {
      request: this.request.toJSON(),
      response: this.response.toJSON(),
      app: this.app.toJSON(),
      originalUrl: this.originalUrl,
      req: '<original node req>',
      res: '<original node res>',
      socket: '<original node socket>'
    };
  },

  /**
   * Similar to .throw(), adds assertion.
   *
   *    this.assert(this.user, 401, 'Please login!');
   *
   * See: https://github.com/jshttp/http-assert
   *
   * @param {Mixed} test
   * @param {Number} status
   * @param {String} message
   * @api public
   */

  assert: httpAssert,

  /**
   * Throw an error with `msg` and optional `status`
   * defaulting to 500. Note that these are user-level
   * errors, and the message may be exposed to the client.
   *
   *    this.throw(403)
   *    this.throw('name required', 400)
   *    this.throw(400, 'name required')
   *    this.throw('something exploded')
   *    this.throw(new Error('invalid'), 400);
   *    this.throw(400, new Error('invalid'));
   *
   * See: https://github.com/jshttp/http-errors
   *
   * @param {String|Number|Error} err, msg or status
   * @param {String|Number|Error} [err, msg or status]
   * @param {Object} [props]
   * @api public
   */

  throw() {
    throw createError.apply(null, arguments);
  },

  /**
   * Default error handling.
   *
   * @param {Error} err
   * @api private
   */

  onerror(err) {
    // don't do anything if there is no error.
    // this allows you to pass `this.onerror`
    // to node-style callbacks.
    if (null == err) return;

    if (!(err instanceof Error)) err = new Error(`non-error thrown: ${err}`);

    let headerSent = false;
    if (this.headerSent || !this.writable) {
      headerSent = err.headerSent = true;
    }

    // delegate
    this.app.emit('error', err, this);

    // nothing we can do here other
    // than delegate to the app-level
    // handler and log.
    if (headerSent) {
      return;
    }

    const { res } = this;

    // first unset all headers
    if (typeof res.getHeaderNames === 'function') {
      res.getHeaderNames().forEach(name => res.removeHeader(name));
    } else {
      res._headers = {}; // Node < 7.7
    }

    // then set those specified
    this.set(err.headers);

    // force text/plain
    this.type = 'text';

    // ENOENT support
    if ('ENOENT' == err.code) err.status = 404;

    // default to 500
    if ('number' != typeof err.status || !statuses[err.status]) err.status = 500;

    // respond
    const code = statuses[err.status];
    const msg = err.expose ? err.message : code;
    this.status = err.status;
    this.length = Buffer.byteLength(msg);
    this.res.end(msg);
  }
};

/**
 * Response delegation.
 */

delegate(proto, 'response')
  .method('attachment')
  .method('redirect')
  .method('remove')
  .method('vary')
  .method('set')
  .method('append')
  .method('flushHeaders')
  .access('status')
  .access('message')
  .access('body')
  .access('length')
  .access('type')
  .access('lastModified')
  .access('etag')
  .getter('headerSent')
  .getter('writable');

/**
 * Request delegation.
 */

delegate(proto, 'request')
  .method('acceptsLanguages')
  .method('acceptsEncodings')
  .method('acceptsCharsets')
  .method('accepts')
  .method('get')
  .method('is')
  .access('querystring')
  .access('idempotent')
  .access('socket')
  .access('search')
  .access('method')
  .access('query')
  .access('path')
  .access('url')
  .getter('origin')
  .getter('href')
  .getter('subdomains')
  .getter('protocol')
  .getter('host')
  .getter('hostname')
  .getter('header')
  .getter('headers')
  .getter('secure')
  .getter('stale')
  .getter('fresh')
  .getter('ips')
  .getter('ip');


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



/**
 * Module dependencies.
 */

const net = __webpack_require__(25);
const contentType = __webpack_require__(37);
const stringify = __webpack_require__(26).format;
const parse = __webpack_require__(78);
const qs = __webpack_require__(92);
const typeis = __webpack_require__(23);
const fresh = __webpack_require__(52);
const only = __webpack_require__(12);

/**
 * Prototype.
 */

module.exports = {

  /**
   * Return request header.
   *
   * @return {Object}
   * @api public
   */

  get header() {
    return this.req.headers;
  },

  /**
   * Return request header, alias as request.header
   *
   * @return {Object}
   * @api public
   */

  get headers() {
    return this.req.headers;
  },

  /**
   * Get request URL.
   *
   * @return {String}
   * @api public
   */

  get url() {
    return this.req.url;
  },

  /**
   * Set request URL.
   *
   * @api public
   */

  set url(val) {
    this.req.url = val;
  },

  /**
   * Get origin of URL.
   *
   * @return {String}
   * @api public
   */

  get origin() {
    return `${this.protocol}://${this.host}`;
  },

  /**
   * Get full request URL.
   *
   * @return {String}
   * @api public
   */

  get href() {
    // support: `GET http://example.com/foo`
    if (/^https?:\/\//i.test(this.originalUrl)) return this.originalUrl;
    return this.origin + this.originalUrl;
  },

  /**
   * Get request method.
   *
   * @return {String}
   * @api public
   */

  get method() {
    return this.req.method;
  },

  /**
   * Set request method.
   *
   * @param {String} val
   * @api public
   */

  set method(val) {
    this.req.method = val;
  },

  /**
   * Get request pathname.
   *
   * @return {String}
   * @api public
   */

  get path() {
    return parse(this.req).pathname;
  },

  /**
   * Set pathname, retaining the query-string when present.
   *
   * @param {String} path
   * @api public
   */

  set path(path) {
    const url = parse(this.req);
    if (url.pathname === path) return;

    url.pathname = path;
    url.path = null;

    this.url = stringify(url);
  },

  /**
   * Get parsed query-string.
   *
   * @return {Object}
   * @api public
   */

  get query() {
    const str = this.querystring;
    const c = this._querycache = this._querycache || {};
    return c[str] || (c[str] = qs.parse(str));
  },

  /**
   * Set query-string as an object.
   *
   * @param {Object} obj
   * @api public
   */

  set query(obj) {
    this.querystring = qs.stringify(obj);
  },

  /**
   * Get query string.
   *
   * @return {String}
   * @api public
   */

  get querystring() {
    if (!this.req) return '';
    return parse(this.req).query || '';
  },

  /**
   * Set querystring.
   *
   * @param {String} str
   * @api public
   */

  set querystring(str) {
    const url = parse(this.req);
    if (url.search === `?${str}`) return;

    url.search = str;
    url.path = null;

    this.url = stringify(url);
  },

  /**
   * Get the search string. Same as the querystring
   * except it includes the leading ?.
   *
   * @return {String}
   * @api public
   */

  get search() {
    if (!this.querystring) return '';
    return `?${this.querystring}`;
  },

  /**
   * Set the search string. Same as
   * response.querystring= but included for ubiquity.
   *
   * @param {String} str
   * @api public
   */

  set search(str) {
    this.querystring = str;
  },

  /**
   * Parse the "Host" header field host
   * and support X-Forwarded-Host when a
   * proxy is enabled.
   *
   * @return {String} hostname:port
   * @api public
   */

  get host() {
    const proxy = this.app.proxy;
    let host = proxy && this.get('X-Forwarded-Host');
    host = host || this.get('Host');
    if (!host) return '';
    return host.split(/\s*,\s*/)[0];
  },

  /**
   * Parse the "Host" header field hostname
   * and support X-Forwarded-Host when a
   * proxy is enabled.
   *
   * @return {String} hostname
   * @api public
   */

  get hostname() {
    const host = this.host;
    if (!host) return '';
    return host.split(':')[0];
  },

  /**
   * Check if the request is fresh, aka
   * Last-Modified and/or the ETag
   * still match.
   *
   * @return {Boolean}
   * @api public
   */

  get fresh() {
    const method = this.method;
    const s = this.ctx.status;

    // GET or HEAD for weak freshness validation only
    if ('GET' != method && 'HEAD' != method) return false;

    // 2xx or 304 as per rfc2616 14.26
    if ((s >= 200 && s < 300) || 304 == s) {
      return fresh(this.header, this.ctx.response.header);
    }

    return false;
  },

  /**
   * Check if the request is stale, aka
   * "Last-Modified" and / or the "ETag" for the
   * resource has changed.
   *
   * @return {Boolean}
   * @api public
   */

  get stale() {
    return !this.fresh;
  },

  /**
   * Check if the request is idempotent.
   *
   * @return {Boolean}
   * @api public
   */

  get idempotent() {
    const methods = ['GET', 'HEAD', 'PUT', 'DELETE', 'OPTIONS', 'TRACE'];
    return !!~methods.indexOf(this.method);
  },

  /**
   * Return the request socket.
   *
   * @return {Connection}
   * @api public
   */

  get socket() {
    return this.req.socket;
  },

  /**
   * Get the charset when present or undefined.
   *
   * @return {String}
   * @api public
   */

  get charset() {
    let type = this.get('Content-Type');
    if (!type) return '';

    try {
      type = contentType.parse(type);
    } catch (e) {
      return '';
    }

    return type.parameters.charset || '';
  },

  /**
   * Return parsed Content-Length when present.
   *
   * @return {Number}
   * @api public
   */

  get length() {
    const len = this.get('Content-Length');
    if (len == '') return;
    return ~~len;
  },

  /**
   * Return the protocol string "http" or "https"
   * when requested with TLS. When the proxy setting
   * is enabled the "X-Forwarded-Proto" header
   * field will be trusted. If you're running behind
   * a reverse proxy that supplies https for you this
   * may be enabled.
   *
   * @return {String}
   * @api public
   */

  get protocol() {
    const proxy = this.app.proxy;
    if (this.socket.encrypted) return 'https';
    if (!proxy) return 'http';
    const proto = this.get('X-Forwarded-Proto') || 'http';
    return proto.split(/\s*,\s*/)[0];
  },

  /**
   * Short-hand for:
   *
   *    this.protocol == 'https'
   *
   * @return {Boolean}
   * @api public
   */

  get secure() {
    return 'https' == this.protocol;
  },

  /**
   * When `app.proxy` is `true`, parse
   * the "X-Forwarded-For" ip address list.
   *
   * For example if the value were "client, proxy1, proxy2"
   * you would receive the array `["client", "proxy1", "proxy2"]`
   * where "proxy2" is the furthest down-stream.
   *
   * @return {Array}
   * @api public
   */

  get ips() {
    const proxy = this.app.proxy;
    const val = this.get('X-Forwarded-For');
    return proxy && val
      ? val.split(/\s*,\s*/)
      : [];
  },

  /**
   * Return subdomains as an array.
   *
   * Subdomains are the dot-separated parts of the host before the main domain
   * of the app. By default, the domain of the app is assumed to be the last two
   * parts of the host. This can be changed by setting `app.subdomainOffset`.
   *
   * For example, if the domain is "tobi.ferrets.example.com":
   * If `app.subdomainOffset` is not set, this.subdomains is
   * `["ferrets", "tobi"]`.
   * If `app.subdomainOffset` is 3, this.subdomains is `["tobi"]`.
   *
   * @return {Array}
   * @api public
   */

  get subdomains() {
    const offset = this.app.subdomainOffset;
    const hostname = this.hostname;
    if (net.isIP(hostname)) return [];
    return hostname
      .split('.')
      .reverse()
      .slice(offset);
  },

  /**
   * Check if the given `type(s)` is acceptable, returning
   * the best match when true, otherwise `false`, in which
   * case you should respond with 406 "Not Acceptable".
   *
   * The `type` value may be a single mime type string
   * such as "application/json", the extension name
   * such as "json" or an array `["json", "html", "text/plain"]`. When a list
   * or array is given the _best_ match, if any is returned.
   *
   * Examples:
   *
   *     // Accept: text/html
   *     this.accepts('html');
   *     // => "html"
   *
   *     // Accept: text/*, application/json
   *     this.accepts('html');
   *     // => "html"
   *     this.accepts('text/html');
   *     // => "text/html"
   *     this.accepts('json', 'text');
   *     // => "json"
   *     this.accepts('application/json');
   *     // => "application/json"
   *
   *     // Accept: text/*, application/json
   *     this.accepts('image/png');
   *     this.accepts('png');
   *     // => false
   *
   *     // Accept: text/*;q=.5, application/json
   *     this.accepts(['html', 'json']);
   *     this.accepts('html', 'json');
   *     // => "json"
   *
   * @param {String|Array} type(s)...
   * @return {String|Array|false}
   * @api public
   */

  accepts() {
    return this.accept.types.apply(this.accept, arguments);
  },

  /**
   * Return accepted encodings or best fit based on `encodings`.
   *
   * Given `Accept-Encoding: gzip, deflate`
   * an array sorted by quality is returned:
   *
   *     ['gzip', 'deflate']
   *
   * @param {String|Array} encoding(s)...
   * @return {String|Array}
   * @api public
   */

  acceptsEncodings() {
    return this.accept.encodings.apply(this.accept, arguments);
  },

  /**
   * Return accepted charsets or best fit based on `charsets`.
   *
   * Given `Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5`
   * an array sorted by quality is returned:
   *
   *     ['utf-8', 'utf-7', 'iso-8859-1']
   *
   * @param {String|Array} charset(s)...
   * @return {String|Array}
   * @api public
   */

  acceptsCharsets() {
    return this.accept.charsets.apply(this.accept, arguments);
  },

  /**
   * Return accepted languages or best fit based on `langs`.
   *
   * Given `Accept-Language: en;q=0.8, es, pt`
   * an array sorted by quality is returned:
   *
   *     ['es', 'pt', 'en']
   *
   * @param {String|Array} lang(s)...
   * @return {Array|String}
   * @api public
   */

  acceptsLanguages() {
    return this.accept.languages.apply(this.accept, arguments);
  },

  /**
   * Check if the incoming request contains the "Content-Type"
   * header field, and it contains any of the give mime `type`s.
   * If there is no request body, `null` is returned.
   * If there is no content type, `false` is returned.
   * Otherwise, it returns the first `type` that matches.
   *
   * Examples:
   *
   *     // With Content-Type: text/html; charset=utf-8
   *     this.is('html'); // => 'html'
   *     this.is('text/html'); // => 'text/html'
   *     this.is('text/*', 'application/json'); // => 'text/html'
   *
   *     // When Content-Type is application/json
   *     this.is('json', 'urlencoded'); // => 'json'
   *     this.is('application/json'); // => 'application/json'
   *     this.is('html', 'application/*'); // => 'application/json'
   *
   *     this.is('html'); // => false
   *
   * @param {String|Array} types...
   * @return {String|false|null}
   * @api public
   */

  is(types) {
    if (!types) return typeis(this.req);
    if (!Array.isArray(types)) types = [].slice.call(arguments);
    return typeis(this.req, types);
  },

  /**
   * Return the request mime type void of
   * parameters such as "charset".
   *
   * @return {String}
   * @api public
   */

  get type() {
    const type = this.get('Content-Type');
    if (!type) return '';
    return type.split(';')[0];
  },

  /**
   * Return request header.
   *
   * The `Referrer` header field is special-cased,
   * both `Referrer` and `Referer` are interchangeable.
   *
   * Examples:
   *
   *     this.get('Content-Type');
   *     // => "text/plain"
   *
   *     this.get('content-type');
   *     // => "text/plain"
   *
   *     this.get('Something');
   *     // => undefined
   *
   * @param {String} field
   * @return {String}
   * @api public
   */

  get(field) {
    const req = this.req;
    switch (field = field.toLowerCase()) {
      case 'referer':
      case 'referrer':
        return req.headers.referrer || req.headers.referer || '';
      default:
        return req.headers[field] || '';
    }
  },

  /**
   * Inspect implementation.
   *
   * @return {Object}
   * @api public
   */

  inspect() {
    if (!this.req) return;
    return this.toJSON();
  },

  /**
   * Return JSON representation.
   *
   * @return {Object}
   * @api public
   */

  toJSON() {
    return only(this, [
      'method',
      'url',
      'header'
    ]);
  }
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



/**
 * Module dependencies.
 */

const contentDisposition = __webpack_require__(36);
const ensureErrorHandler = __webpack_require__(50);
const getType = __webpack_require__(11).contentType;
const onFinish = __webpack_require__(21);
const isJSON = __webpack_require__(19);
const escape = __webpack_require__(51);
const typeis = __webpack_require__(23).is;
const statuses = __webpack_require__(4);
const destroy = __webpack_require__(48);
const assert = __webpack_require__(1);
const extname = __webpack_require__(0).extname;
const vary = __webpack_require__(88);
const only = __webpack_require__(12);

/**
 * Prototype.
 */

module.exports = {

  /**
   * Return the request socket.
   *
   * @return {Connection}
   * @api public
   */

  get socket() {
    return this.ctx.req.socket;
  },

  /**
   * Return response header.
   *
   * @return {Object}
   * @api public
   */

  get header() {
    const { res } = this;
    return typeof res.getHeaders === 'function'
      ? res.getHeaders()
      : res._headers || {};  // Node < 7.7
  },

  /**
   * Return response header, alias as response.header
   *
   * @return {Object}
   * @api public
   */

  get headers() {
    return this.header;
  },

  /**
   * Get response status code.
   *
   * @return {Number}
   * @api public
   */

  get status() {
    return this.res.statusCode;
  },

  /**
   * Set response status code.
   *
   * @param {Number} code
   * @api public
   */

  set status(code) {
    assert('number' == typeof code, 'status code must be a number');
    assert(statuses[code], `invalid status code: ${code}`);
    assert(!this.res.headersSent, 'headers have already been sent');
    this._explicitStatus = true;
    this.res.statusCode = code;
    this.res.statusMessage = statuses[code];
    if (this.body && statuses.empty[code]) this.body = null;
  },

  /**
   * Get response status message
   *
   * @return {String}
   * @api public
   */

  get message() {
    return this.res.statusMessage || statuses[this.status];
  },

  /**
   * Set response status message
   *
   * @param {String} msg
   * @api public
   */

  set message(msg) {
    this.res.statusMessage = msg;
  },

  /**
   * Get response body.
   *
   * @return {Mixed}
   * @api public
   */

  get body() {
    return this._body;
  },

  /**
   * Set response body.
   *
   * @param {String|Buffer|Object|Stream} val
   * @api public
   */

  set body(val) {
    const original = this._body;
    this._body = val;

    if (this.res.headersSent) return;

    // no content
    if (null == val) {
      if (!statuses.empty[this.status]) this.status = 204;
      this.remove('Content-Type');
      this.remove('Content-Length');
      this.remove('Transfer-Encoding');
      return;
    }

    // set the status
    if (!this._explicitStatus) this.status = 200;

    // set the content-type only if not yet set
    const setType = !this.header['content-type'];

    // string
    if ('string' == typeof val) {
      if (setType) this.type = /^\s*</.test(val) ? 'html' : 'text';
      this.length = Buffer.byteLength(val);
      return;
    }

    // buffer
    if (Buffer.isBuffer(val)) {
      if (setType) this.type = 'bin';
      this.length = val.length;
      return;
    }

    // stream
    if ('function' == typeof val.pipe) {
      onFinish(this.res, destroy.bind(null, val));
      ensureErrorHandler(val, err => this.ctx.onerror(err));

      // overwriting
      if (null != original && original != val) this.remove('Content-Length');

      if (setType) this.type = 'bin';
      return;
    }

    // json
    this.remove('Content-Length');
    this.type = 'json';
  },

  /**
   * Set Content-Length field to `n`.
   *
   * @param {Number} n
   * @api public
   */

  set length(n) {
    this.set('Content-Length', n);
  },

  /**
   * Return parsed response Content-Length when present.
   *
   * @return {Number}
   * @api public
   */

  get length() {
    const len = this.header['content-length'];
    const body = this.body;

    if (null == len) {
      if (!body) return;
      if ('string' == typeof body) return Buffer.byteLength(body);
      if (Buffer.isBuffer(body)) return body.length;
      if (isJSON(body)) return Buffer.byteLength(JSON.stringify(body));
      return;
    }

    return ~~len;
  },

  /**
   * Check if a header has been written to the socket.
   *
   * @return {Boolean}
   * @api public
   */

  get headerSent() {
    return this.res.headersSent;
  },

  /**
   * Vary on `field`.
   *
   * @param {String} field
   * @api public
   */

  vary(field) {
    vary(this.res, field);
  },

  /**
   * Perform a 302 redirect to `url`.
   *
   * The string "back" is special-cased
   * to provide Referrer support, when Referrer
   * is not present `alt` or "/" is used.
   *
   * Examples:
   *
   *    this.redirect('back');
   *    this.redirect('back', '/index.html');
   *    this.redirect('/login');
   *    this.redirect('http://google.com');
   *
   * @param {String} url
   * @param {String} [alt]
   * @api public
   */

  redirect(url, alt) {
    // location
    if ('back' == url) url = this.ctx.get('Referrer') || alt || '/';
    this.set('Location', url);

    // status
    if (!statuses.redirect[this.status]) this.status = 302;

    // html
    if (this.ctx.accepts('html')) {
      url = escape(url);
      this.type = 'text/html; charset=utf-8';
      this.body = `Redirecting to <a href="${url}">${url}</a>.`;
      return;
    }

    // text
    this.type = 'text/plain; charset=utf-8';
    this.body = `Redirecting to ${url}.`;
  },

  /**
   * Set Content-Disposition header to "attachment" with optional `filename`.
   *
   * @param {String} filename
   * @api public
   */

  attachment(filename) {
    if (filename) this.type = extname(filename);
    this.set('Content-Disposition', contentDisposition(filename));
  },

  /**
   * Set Content-Type response header with `type` through `mime.lookup()`
   * when it does not contain a charset.
   *
   * Examples:
   *
   *     this.type = '.html';
   *     this.type = 'html';
   *     this.type = 'json';
   *     this.type = 'application/json';
   *     this.type = 'png';
   *
   * @param {String} type
   * @api public
   */

  set type(type) {
    type = getType(type) || false;
    if (type) {
      this.set('Content-Type', type);
    } else {
      this.remove('Content-Type');
    }
  },

  /**
   * Set the Last-Modified date using a string or a Date.
   *
   *     this.response.lastModified = new Date();
   *     this.response.lastModified = '2013-09-13';
   *
   * @param {String|Date} type
   * @api public
   */

  set lastModified(val) {
    if ('string' == typeof val) val = new Date(val);
    this.set('Last-Modified', val.toUTCString());
  },

  /**
   * Get the Last-Modified date in Date form, if it exists.
   *
   * @return {Date}
   * @api public
   */

  get lastModified() {
    const date = this.get('last-modified');
    if (date) return new Date(date);
  },

  /**
   * Set the ETag of a response.
   * This will normalize the quotes if necessary.
   *
   *     this.response.etag = 'md5hashsum';
   *     this.response.etag = '"md5hashsum"';
   *     this.response.etag = 'W/"123456789"';
   *
   * @param {String} etag
   * @api public
   */

  set etag(val) {
    if (!/^(W\/)?"/.test(val)) val = `"${val}"`;
    this.set('ETag', val);
  },

  /**
   * Get the ETag of a response.
   *
   * @return {String}
   * @api public
   */

  get etag() {
    return this.get('ETag');
  },

  /**
   * Return the response mime type void of
   * parameters such as "charset".
   *
   * @return {String}
   * @api public
   */

  get type() {
    const type = this.get('Content-Type');
    if (!type) return '';
    return type.split(';')[0];
  },

  /**
   * Check whether the response is one of the listed types.
   * Pretty much the same as `this.request.is()`.
   *
   * @param {String|Array} types...
   * @return {String|false}
   * @api public
   */

  is(types) {
    const type = this.type;
    if (!types) return type || false;
    if (!Array.isArray(types)) types = [].slice.call(arguments);
    return typeis(type, types);
  },

  /**
   * Return response header.
   *
   * Examples:
   *
   *     this.get('Content-Type');
   *     // => "text/plain"
   *
   *     this.get('content-type');
   *     // => "text/plain"
   *
   * @param {String} field
   * @return {String}
   * @api public
   */

  get(field) {
    return this.header[field.toLowerCase()] || '';
  },

  /**
   * Set header `field` to `val`, or pass
   * an object of header fields.
   *
   * Examples:
   *
   *    this.set('Foo', ['bar', 'baz']);
   *    this.set('Accept', 'application/json');
   *    this.set({ Accept: 'text/plain', 'X-API-Key': 'tobi' });
   *
   * @param {String|Object|Array} field
   * @param {String} val
   * @api public
   */

  set(field, val) {
    if (2 == arguments.length) {
      if (Array.isArray(val)) val = val.map(String);
      else val = String(val);
      this.res.setHeader(field, val);
    } else {
      for (const key in field) {
        this.set(key, field[key]);
      }
    }
  },

  /**
   * Append additional header `field` with value `val`.
   *
   * Examples:
   *
   * ```
   * this.append('Link', ['<http://localhost/>', '<http://localhost:3000/>']);
   * this.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly');
   * this.append('Warning', '199 Miscellaneous warning');
   * ```
   *
   * @param {String} field
   * @param {String|Array} val
   * @api public
   */

  append(field, val) {
    const prev = this.get(field);

    if (prev) {
      val = Array.isArray(prev)
        ? prev.concat(val)
        : [prev].concat(val);
    }

    return this.set(field, val);
  },

  /**
   * Remove header `field`.
   *
   * @param {String} name
   * @api public
   */

  remove(field) {
    this.res.removeHeader(field);
  },

  /**
   * Checks if the request is writable.
   * Tests for the existence of the socket
   * as node sometimes does not set it.
   *
   * @return {Boolean}
   * @api private
   */

  get writable() {
    // can't write any more after response finished
    if (this.res.finished) return false;

    const socket = this.res.socket;
    // There are already pending outgoing res, but still writable
    // https://github.com/nodejs/node/blob/v4.4.7/lib/_http_server.js#L486
    if (!socket) return true;
    return socket.writable;
  },

  /**
   * Inspect implementation.
   *
   * @return {Object}
   * @api public
   */

  inspect() {
    if (!this.res) return;
    const o = this.toJSON();
    o.body = this.body;
    return o;
  },

  /**
   * Return JSON representation.
   *
   * @return {Object}
   * @api public
   */

  toJSON() {
    return only(this, [
      'status',
      'message',
      'header'
    ]);
  },

  /**
   * Flush any set headers, and begin the body
   */
  flushHeaders() {
    this.res.flushHeaders();
  }
};


/***/ }),
/* 68 */
/***/ (function(module, exports) {

/*!
 * media-typer
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * RegExp to match *( ";" parameter ) in RFC 2616 sec 3.7
 *
 * parameter     = token "=" ( token | quoted-string )
 * token         = 1*<any CHAR except CTLs or separators>
 * separators    = "(" | ")" | "<" | ">" | "@"
 *               | "," | ";" | ":" | "\" | <">
 *               | "/" | "[" | "]" | "?" | "="
 *               | "{" | "}" | SP | HT
 * quoted-string = ( <"> *(qdtext | quoted-pair ) <"> )
 * qdtext        = <any TEXT except <">>
 * quoted-pair   = "\" CHAR
 * CHAR          = <any US-ASCII character (octets 0 - 127)>
 * TEXT          = <any OCTET except CTLs, but including LWS>
 * LWS           = [CRLF] 1*( SP | HT )
 * CRLF          = CR LF
 * CR            = <US-ASCII CR, carriage return (13)>
 * LF            = <US-ASCII LF, linefeed (10)>
 * SP            = <US-ASCII SP, space (32)>
 * SHT           = <US-ASCII HT, horizontal-tab (9)>
 * CTL           = <any US-ASCII control character (octets 0 - 31) and DEL (127)>
 * OCTET         = <any 8-bit sequence of data>
 */
var paramRegExp = /; *([!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) *= *("(?:[ !\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u0020-\u007e])*"|[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) */g;
var textRegExp = /^[\u0020-\u007e\u0080-\u00ff]+$/
var tokenRegExp = /^[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+$/

/**
 * RegExp to match quoted-pair in RFC 2616
 *
 * quoted-pair = "\" CHAR
 * CHAR        = <any US-ASCII character (octets 0 - 127)>
 */
var qescRegExp = /\\([\u0000-\u007f])/g;

/**
 * RegExp to match chars that must be quoted-pair in RFC 2616
 */
var quoteRegExp = /([\\"])/g;

/**
 * RegExp to match type in RFC 6838
 *
 * type-name = restricted-name
 * subtype-name = restricted-name
 * restricted-name = restricted-name-first *126restricted-name-chars
 * restricted-name-first  = ALPHA / DIGIT
 * restricted-name-chars  = ALPHA / DIGIT / "!" / "#" /
 *                          "$" / "&" / "-" / "^" / "_"
 * restricted-name-chars =/ "." ; Characters before first dot always
 *                              ; specify a facet name
 * restricted-name-chars =/ "+" ; Characters after last plus always
 *                              ; specify a structured syntax suffix
 * ALPHA =  %x41-5A / %x61-7A   ; A-Z / a-z
 * DIGIT =  %x30-39             ; 0-9
 */
var subtypeNameRegExp = /^[A-Za-z0-9][A-Za-z0-9!#$&^_.-]{0,126}$/
var typeNameRegExp = /^[A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126}$/
var typeRegExp = /^ *([A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126})\/([A-Za-z0-9][A-Za-z0-9!#$&^_.+-]{0,126}) *$/;

/**
 * Module exports.
 */

exports.format = format
exports.parse = parse

/**
 * Format object to media type.
 *
 * @param {object} obj
 * @return {string}
 * @api public
 */

function format(obj) {
  if (!obj || typeof obj !== 'object') {
    throw new TypeError('argument obj is required')
  }

  var parameters = obj.parameters
  var subtype = obj.subtype
  var suffix = obj.suffix
  var type = obj.type

  if (!type || !typeNameRegExp.test(type)) {
    throw new TypeError('invalid type')
  }

  if (!subtype || !subtypeNameRegExp.test(subtype)) {
    throw new TypeError('invalid subtype')
  }

  // format as type/subtype
  var string = type + '/' + subtype

  // append +suffix
  if (suffix) {
    if (!typeNameRegExp.test(suffix)) {
      throw new TypeError('invalid suffix')
    }

    string += '+' + suffix
  }

  // append parameters
  if (parameters && typeof parameters === 'object') {
    var param
    var params = Object.keys(parameters).sort()

    for (var i = 0; i < params.length; i++) {
      param = params[i]

      if (!tokenRegExp.test(param)) {
        throw new TypeError('invalid parameter name')
      }

      string += '; ' + param + '=' + qstring(parameters[param])
    }
  }

  return string
}

/**
 * Parse media type to object.
 *
 * @param {string|object} string
 * @return {Object}
 * @api public
 */

function parse(string) {
  if (!string) {
    throw new TypeError('argument string is required')
  }

  // support req/res-like objects as argument
  if (typeof string === 'object') {
    string = getcontenttype(string)
  }

  if (typeof string !== 'string') {
    throw new TypeError('argument string is required to be a string')
  }

  var index = string.indexOf(';')
  var type = index !== -1
    ? string.substr(0, index)
    : string

  var key
  var match
  var obj = splitType(type)
  var params = {}
  var value

  paramRegExp.lastIndex = index

  while (match = paramRegExp.exec(string)) {
    if (match.index !== index) {
      throw new TypeError('invalid parameter format')
    }

    index += match[0].length
    key = match[1].toLowerCase()
    value = match[2]

    if (value[0] === '"') {
      // remove quotes and escapes
      value = value
        .substr(1, value.length - 2)
        .replace(qescRegExp, '$1')
    }

    params[key] = value
  }

  if (index !== -1 && index !== string.length) {
    throw new TypeError('invalid parameter format')
  }

  obj.parameters = params

  return obj
}

/**
 * Get content-type from req/res objects.
 *
 * @param {object}
 * @return {Object}
 * @api private
 */

function getcontenttype(obj) {
  if (typeof obj.getHeader === 'function') {
    // res-like
    return obj.getHeader('content-type')
  }

  if (typeof obj.headers === 'object') {
    // req-like
    return obj.headers && obj.headers['content-type']
  }
}

/**
 * Quote a string if necessary.
 *
 * @param {string} val
 * @return {string}
 * @api private
 */

function qstring(val) {
  var str = String(val)

  // no need to quote tokens
  if (tokenRegExp.test(str)) {
    return str
  }

  if (str.length > 0 && !textRegExp.test(str)) {
    throw new TypeError('invalid parameter value')
  }

  return '"' + str.replace(quoteRegExp, '\\$1') + '"'
}

/**
 * Simply "type/subtype+siffx" into parts.
 *
 * @param {string} string
 * @return {Object}
 * @api private
 */

function splitType(string) {
  var match = typeRegExp.exec(string.toLowerCase())

  if (!match) {
    throw new TypeError('invalid media type')
  }

  var type = match[1]
  var subtype = match[2]
  var suffix

  // suffix after last +
  var index = subtype.lastIndexOf('+')
  if (index !== -1) {
    suffix = subtype.substr(index + 1)
    subtype = subtype.substr(0, index)
  }

  var obj = {
    type: type,
    subtype: subtype,
    suffix: suffix
  }

  return obj
}


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * methods
 * Copyright(c) 2013-2014 TJ Holowaychuk
 * Copyright(c) 2015-2016 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var http = __webpack_require__(13);

/**
 * Module exports.
 * @public
 */

module.exports = getCurrentNodeMethods() || getBasicNodeMethods();

/**
 * Get the current Node.js methods.
 * @private
 */

function getCurrentNodeMethods() {
  return http.METHODS && http.METHODS.map(function lowerCaseMethod(method) {
    return method.toLowerCase();
  });
}

/**
 * Get the "basic" Node.js methods, a snapshot from Node.js 0.10.
 * @private
 */

function getBasicNodeMethods() {
  return [
    'get',
    'post',
    'put',
    'head',
    'delete',
    'options',
    'trace',
    'copy',
    'lock',
    'mkcol',
    'move',
    'purge',
    'propfind',
    'proppatch',
    'unlock',
    'report',
    'mkactivity',
    'checkout',
    'merge',
    'm-search',
    'notify',
    'subscribe',
    'unsubscribe',
    'patch',
    'search',
    'connect'
  ];
}


/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = {
	"application/1d-interleaved-parityfec": {
		"source": "iana"
	},
	"application/3gpdash-qoe-report+xml": {
		"source": "iana"
	},
	"application/3gpp-ims+xml": {
		"source": "iana"
	},
	"application/a2l": {
		"source": "iana"
	},
	"application/activemessage": {
		"source": "iana"
	},
	"application/alto-costmap+json": {
		"source": "iana",
		"compressible": true
	},
	"application/alto-costmapfilter+json": {
		"source": "iana",
		"compressible": true
	},
	"application/alto-directory+json": {
		"source": "iana",
		"compressible": true
	},
	"application/alto-endpointcost+json": {
		"source": "iana",
		"compressible": true
	},
	"application/alto-endpointcostparams+json": {
		"source": "iana",
		"compressible": true
	},
	"application/alto-endpointprop+json": {
		"source": "iana",
		"compressible": true
	},
	"application/alto-endpointpropparams+json": {
		"source": "iana",
		"compressible": true
	},
	"application/alto-error+json": {
		"source": "iana",
		"compressible": true
	},
	"application/alto-networkmap+json": {
		"source": "iana",
		"compressible": true
	},
	"application/alto-networkmapfilter+json": {
		"source": "iana",
		"compressible": true
	},
	"application/aml": {
		"source": "iana"
	},
	"application/andrew-inset": {
		"source": "iana",
		"extensions": [
			"ez"
		]
	},
	"application/applefile": {
		"source": "iana"
	},
	"application/applixware": {
		"source": "apache",
		"extensions": [
			"aw"
		]
	},
	"application/atf": {
		"source": "iana"
	},
	"application/atfx": {
		"source": "iana"
	},
	"application/atom+xml": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"atom"
		]
	},
	"application/atomcat+xml": {
		"source": "iana",
		"extensions": [
			"atomcat"
		]
	},
	"application/atomdeleted+xml": {
		"source": "iana"
	},
	"application/atomicmail": {
		"source": "iana"
	},
	"application/atomsvc+xml": {
		"source": "iana",
		"extensions": [
			"atomsvc"
		]
	},
	"application/atxml": {
		"source": "iana"
	},
	"application/auth-policy+xml": {
		"source": "iana"
	},
	"application/bacnet-xdd+zip": {
		"source": "iana"
	},
	"application/batch-smtp": {
		"source": "iana"
	},
	"application/bdoc": {
		"compressible": false,
		"extensions": [
			"bdoc"
		]
	},
	"application/beep+xml": {
		"source": "iana"
	},
	"application/calendar+json": {
		"source": "iana",
		"compressible": true
	},
	"application/calendar+xml": {
		"source": "iana"
	},
	"application/call-completion": {
		"source": "iana"
	},
	"application/cals-1840": {
		"source": "iana"
	},
	"application/cbor": {
		"source": "iana"
	},
	"application/ccmp+xml": {
		"source": "iana"
	},
	"application/ccxml+xml": {
		"source": "iana",
		"extensions": [
			"ccxml"
		]
	},
	"application/cdfx+xml": {
		"source": "iana"
	},
	"application/cdmi-capability": {
		"source": "iana",
		"extensions": [
			"cdmia"
		]
	},
	"application/cdmi-container": {
		"source": "iana",
		"extensions": [
			"cdmic"
		]
	},
	"application/cdmi-domain": {
		"source": "iana",
		"extensions": [
			"cdmid"
		]
	},
	"application/cdmi-object": {
		"source": "iana",
		"extensions": [
			"cdmio"
		]
	},
	"application/cdmi-queue": {
		"source": "iana",
		"extensions": [
			"cdmiq"
		]
	},
	"application/cdni": {
		"source": "iana"
	},
	"application/cea": {
		"source": "iana"
	},
	"application/cea-2018+xml": {
		"source": "iana"
	},
	"application/cellml+xml": {
		"source": "iana"
	},
	"application/cfw": {
		"source": "iana"
	},
	"application/clue_info+xml": {
		"source": "iana"
	},
	"application/cms": {
		"source": "iana"
	},
	"application/cnrp+xml": {
		"source": "iana"
	},
	"application/coap-group+json": {
		"source": "iana",
		"compressible": true
	},
	"application/coap-payload": {
		"source": "iana"
	},
	"application/commonground": {
		"source": "iana"
	},
	"application/conference-info+xml": {
		"source": "iana"
	},
	"application/cose": {
		"source": "iana"
	},
	"application/cose-key": {
		"source": "iana"
	},
	"application/cose-key-set": {
		"source": "iana"
	},
	"application/cpl+xml": {
		"source": "iana"
	},
	"application/csrattrs": {
		"source": "iana"
	},
	"application/csta+xml": {
		"source": "iana"
	},
	"application/cstadata+xml": {
		"source": "iana"
	},
	"application/csvm+json": {
		"source": "iana",
		"compressible": true
	},
	"application/cu-seeme": {
		"source": "apache",
		"extensions": [
			"cu"
		]
	},
	"application/cybercash": {
		"source": "iana"
	},
	"application/dart": {
		"compressible": true
	},
	"application/dash+xml": {
		"source": "iana",
		"extensions": [
			"mpd"
		]
	},
	"application/dashdelta": {
		"source": "iana"
	},
	"application/davmount+xml": {
		"source": "iana",
		"extensions": [
			"davmount"
		]
	},
	"application/dca-rft": {
		"source": "iana"
	},
	"application/dcd": {
		"source": "iana"
	},
	"application/dec-dx": {
		"source": "iana"
	},
	"application/dialog-info+xml": {
		"source": "iana"
	},
	"application/dicom": {
		"source": "iana"
	},
	"application/dicom+json": {
		"source": "iana",
		"compressible": true
	},
	"application/dicom+xml": {
		"source": "iana"
	},
	"application/dii": {
		"source": "iana"
	},
	"application/dit": {
		"source": "iana"
	},
	"application/dns": {
		"source": "iana"
	},
	"application/docbook+xml": {
		"source": "apache",
		"extensions": [
			"dbk"
		]
	},
	"application/dskpp+xml": {
		"source": "iana"
	},
	"application/dssc+der": {
		"source": "iana",
		"extensions": [
			"dssc"
		]
	},
	"application/dssc+xml": {
		"source": "iana",
		"extensions": [
			"xdssc"
		]
	},
	"application/dvcs": {
		"source": "iana"
	},
	"application/ecmascript": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"ecma"
		]
	},
	"application/edi-consent": {
		"source": "iana"
	},
	"application/edi-x12": {
		"source": "iana",
		"compressible": false
	},
	"application/edifact": {
		"source": "iana",
		"compressible": false
	},
	"application/efi": {
		"source": "iana"
	},
	"application/emergencycalldata.comment+xml": {
		"source": "iana"
	},
	"application/emergencycalldata.deviceinfo+xml": {
		"source": "iana"
	},
	"application/emergencycalldata.providerinfo+xml": {
		"source": "iana"
	},
	"application/emergencycalldata.serviceinfo+xml": {
		"source": "iana"
	},
	"application/emergencycalldata.subscriberinfo+xml": {
		"source": "iana"
	},
	"application/emma+xml": {
		"source": "iana",
		"extensions": [
			"emma"
		]
	},
	"application/emotionml+xml": {
		"source": "iana"
	},
	"application/encaprtp": {
		"source": "iana"
	},
	"application/epp+xml": {
		"source": "iana"
	},
	"application/epub+zip": {
		"source": "iana",
		"extensions": [
			"epub"
		]
	},
	"application/eshop": {
		"source": "iana"
	},
	"application/exi": {
		"source": "iana",
		"extensions": [
			"exi"
		]
	},
	"application/fastinfoset": {
		"source": "iana"
	},
	"application/fastsoap": {
		"source": "iana"
	},
	"application/fdt+xml": {
		"source": "iana"
	},
	"application/fits": {
		"source": "iana"
	},
	"application/font-sfnt": {
		"source": "iana"
	},
	"application/font-tdpfr": {
		"source": "iana",
		"extensions": [
			"pfr"
		]
	},
	"application/font-woff": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"woff"
		]
	},
	"application/font-woff2": {
		"compressible": false,
		"extensions": [
			"woff2"
		]
	},
	"application/framework-attributes+xml": {
		"source": "iana"
	},
	"application/geo+json": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"geojson"
		]
	},
	"application/gml+xml": {
		"source": "iana",
		"extensions": [
			"gml"
		]
	},
	"application/gpx+xml": {
		"source": "apache",
		"extensions": [
			"gpx"
		]
	},
	"application/gxf": {
		"source": "apache",
		"extensions": [
			"gxf"
		]
	},
	"application/gzip": {
		"source": "iana",
		"compressible": false
	},
	"application/h224": {
		"source": "iana"
	},
	"application/held+xml": {
		"source": "iana"
	},
	"application/http": {
		"source": "iana"
	},
	"application/hyperstudio": {
		"source": "iana",
		"extensions": [
			"stk"
		]
	},
	"application/ibe-key-request+xml": {
		"source": "iana"
	},
	"application/ibe-pkg-reply+xml": {
		"source": "iana"
	},
	"application/ibe-pp-data": {
		"source": "iana"
	},
	"application/iges": {
		"source": "iana"
	},
	"application/im-iscomposing+xml": {
		"source": "iana"
	},
	"application/index": {
		"source": "iana"
	},
	"application/index.cmd": {
		"source": "iana"
	},
	"application/index.obj": {
		"source": "iana"
	},
	"application/index.response": {
		"source": "iana"
	},
	"application/index.vnd": {
		"source": "iana"
	},
	"application/inkml+xml": {
		"source": "iana",
		"extensions": [
			"ink",
			"inkml"
		]
	},
	"application/iotp": {
		"source": "iana"
	},
	"application/ipfix": {
		"source": "iana",
		"extensions": [
			"ipfix"
		]
	},
	"application/ipp": {
		"source": "iana"
	},
	"application/isup": {
		"source": "iana"
	},
	"application/its+xml": {
		"source": "iana"
	},
	"application/java-archive": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"jar",
			"war",
			"ear"
		]
	},
	"application/java-serialized-object": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"ser"
		]
	},
	"application/java-vm": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"class"
		]
	},
	"application/javascript": {
		"source": "iana",
		"charset": "UTF-8",
		"compressible": true,
		"extensions": [
			"js"
		]
	},
	"application/jose": {
		"source": "iana"
	},
	"application/jose+json": {
		"source": "iana",
		"compressible": true
	},
	"application/jrd+json": {
		"source": "iana",
		"compressible": true
	},
	"application/json": {
		"source": "iana",
		"charset": "UTF-8",
		"compressible": true,
		"extensions": [
			"json",
			"map"
		]
	},
	"application/json-patch+json": {
		"source": "iana",
		"compressible": true
	},
	"application/json-seq": {
		"source": "iana"
	},
	"application/json5": {
		"extensions": [
			"json5"
		]
	},
	"application/jsonml+json": {
		"source": "apache",
		"compressible": true,
		"extensions": [
			"jsonml"
		]
	},
	"application/jwk+json": {
		"source": "iana",
		"compressible": true
	},
	"application/jwk-set+json": {
		"source": "iana",
		"compressible": true
	},
	"application/jwt": {
		"source": "iana"
	},
	"application/kpml-request+xml": {
		"source": "iana"
	},
	"application/kpml-response+xml": {
		"source": "iana"
	},
	"application/ld+json": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"jsonld"
		]
	},
	"application/lgr+xml": {
		"source": "iana"
	},
	"application/link-format": {
		"source": "iana"
	},
	"application/load-control+xml": {
		"source": "iana"
	},
	"application/lost+xml": {
		"source": "iana",
		"extensions": [
			"lostxml"
		]
	},
	"application/lostsync+xml": {
		"source": "iana"
	},
	"application/lxf": {
		"source": "iana"
	},
	"application/mac-binhex40": {
		"source": "iana",
		"extensions": [
			"hqx"
		]
	},
	"application/mac-compactpro": {
		"source": "apache",
		"extensions": [
			"cpt"
		]
	},
	"application/macwriteii": {
		"source": "iana"
	},
	"application/mads+xml": {
		"source": "iana",
		"extensions": [
			"mads"
		]
	},
	"application/manifest+json": {
		"charset": "UTF-8",
		"compressible": true,
		"extensions": [
			"webmanifest"
		]
	},
	"application/marc": {
		"source": "iana",
		"extensions": [
			"mrc"
		]
	},
	"application/marcxml+xml": {
		"source": "iana",
		"extensions": [
			"mrcx"
		]
	},
	"application/mathematica": {
		"source": "iana",
		"extensions": [
			"ma",
			"nb",
			"mb"
		]
	},
	"application/mathml+xml": {
		"source": "iana",
		"extensions": [
			"mathml"
		]
	},
	"application/mathml-content+xml": {
		"source": "iana"
	},
	"application/mathml-presentation+xml": {
		"source": "iana"
	},
	"application/mbms-associated-procedure-description+xml": {
		"source": "iana"
	},
	"application/mbms-deregister+xml": {
		"source": "iana"
	},
	"application/mbms-envelope+xml": {
		"source": "iana"
	},
	"application/mbms-msk+xml": {
		"source": "iana"
	},
	"application/mbms-msk-response+xml": {
		"source": "iana"
	},
	"application/mbms-protection-description+xml": {
		"source": "iana"
	},
	"application/mbms-reception-report+xml": {
		"source": "iana"
	},
	"application/mbms-register+xml": {
		"source": "iana"
	},
	"application/mbms-register-response+xml": {
		"source": "iana"
	},
	"application/mbms-schedule+xml": {
		"source": "iana"
	},
	"application/mbms-user-service-description+xml": {
		"source": "iana"
	},
	"application/mbox": {
		"source": "iana",
		"extensions": [
			"mbox"
		]
	},
	"application/media-policy-dataset+xml": {
		"source": "iana"
	},
	"application/media_control+xml": {
		"source": "iana"
	},
	"application/mediaservercontrol+xml": {
		"source": "iana",
		"extensions": [
			"mscml"
		]
	},
	"application/merge-patch+json": {
		"source": "iana",
		"compressible": true
	},
	"application/metalink+xml": {
		"source": "apache",
		"extensions": [
			"metalink"
		]
	},
	"application/metalink4+xml": {
		"source": "iana",
		"extensions": [
			"meta4"
		]
	},
	"application/mets+xml": {
		"source": "iana",
		"extensions": [
			"mets"
		]
	},
	"application/mf4": {
		"source": "iana"
	},
	"application/mikey": {
		"source": "iana"
	},
	"application/mods+xml": {
		"source": "iana",
		"extensions": [
			"mods"
		]
	},
	"application/moss-keys": {
		"source": "iana"
	},
	"application/moss-signature": {
		"source": "iana"
	},
	"application/mosskey-data": {
		"source": "iana"
	},
	"application/mosskey-request": {
		"source": "iana"
	},
	"application/mp21": {
		"source": "iana",
		"extensions": [
			"m21",
			"mp21"
		]
	},
	"application/mp4": {
		"source": "iana",
		"extensions": [
			"mp4s",
			"m4p"
		]
	},
	"application/mpeg4-generic": {
		"source": "iana"
	},
	"application/mpeg4-iod": {
		"source": "iana"
	},
	"application/mpeg4-iod-xmt": {
		"source": "iana"
	},
	"application/mrb-consumer+xml": {
		"source": "iana"
	},
	"application/mrb-publish+xml": {
		"source": "iana"
	},
	"application/msc-ivr+xml": {
		"source": "iana"
	},
	"application/msc-mixer+xml": {
		"source": "iana"
	},
	"application/msword": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"doc",
			"dot"
		]
	},
	"application/mud+json": {
		"source": "iana",
		"compressible": true
	},
	"application/mxf": {
		"source": "iana",
		"extensions": [
			"mxf"
		]
	},
	"application/nasdata": {
		"source": "iana"
	},
	"application/news-checkgroups": {
		"source": "iana"
	},
	"application/news-groupinfo": {
		"source": "iana"
	},
	"application/news-transmission": {
		"source": "iana"
	},
	"application/nlsml+xml": {
		"source": "iana"
	},
	"application/nss": {
		"source": "iana"
	},
	"application/ocsp-request": {
		"source": "iana"
	},
	"application/ocsp-response": {
		"source": "iana"
	},
	"application/octet-stream": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"bin",
			"dms",
			"lrf",
			"mar",
			"so",
			"dist",
			"distz",
			"pkg",
			"bpk",
			"dump",
			"elc",
			"deploy",
			"exe",
			"dll",
			"deb",
			"dmg",
			"iso",
			"img",
			"msi",
			"msp",
			"msm",
			"buffer"
		]
	},
	"application/oda": {
		"source": "iana",
		"extensions": [
			"oda"
		]
	},
	"application/odx": {
		"source": "iana"
	},
	"application/oebps-package+xml": {
		"source": "iana",
		"extensions": [
			"opf"
		]
	},
	"application/ogg": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"ogx"
		]
	},
	"application/omdoc+xml": {
		"source": "apache",
		"extensions": [
			"omdoc"
		]
	},
	"application/onenote": {
		"source": "apache",
		"extensions": [
			"onetoc",
			"onetoc2",
			"onetmp",
			"onepkg"
		]
	},
	"application/oxps": {
		"source": "iana",
		"extensions": [
			"oxps"
		]
	},
	"application/p2p-overlay+xml": {
		"source": "iana"
	},
	"application/parityfec": {
		"source": "iana"
	},
	"application/patch-ops-error+xml": {
		"source": "iana",
		"extensions": [
			"xer"
		]
	},
	"application/pdf": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"pdf"
		]
	},
	"application/pdx": {
		"source": "iana"
	},
	"application/pgp-encrypted": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"pgp"
		]
	},
	"application/pgp-keys": {
		"source": "iana"
	},
	"application/pgp-signature": {
		"source": "iana",
		"extensions": [
			"asc",
			"sig"
		]
	},
	"application/pics-rules": {
		"source": "apache",
		"extensions": [
			"prf"
		]
	},
	"application/pidf+xml": {
		"source": "iana"
	},
	"application/pidf-diff+xml": {
		"source": "iana"
	},
	"application/pkcs10": {
		"source": "iana",
		"extensions": [
			"p10"
		]
	},
	"application/pkcs12": {
		"source": "iana"
	},
	"application/pkcs7-mime": {
		"source": "iana",
		"extensions": [
			"p7m",
			"p7c"
		]
	},
	"application/pkcs7-signature": {
		"source": "iana",
		"extensions": [
			"p7s"
		]
	},
	"application/pkcs8": {
		"source": "iana",
		"extensions": [
			"p8"
		]
	},
	"application/pkix-attr-cert": {
		"source": "iana",
		"extensions": [
			"ac"
		]
	},
	"application/pkix-cert": {
		"source": "iana",
		"extensions": [
			"cer"
		]
	},
	"application/pkix-crl": {
		"source": "iana",
		"extensions": [
			"crl"
		]
	},
	"application/pkix-pkipath": {
		"source": "iana",
		"extensions": [
			"pkipath"
		]
	},
	"application/pkixcmp": {
		"source": "iana",
		"extensions": [
			"pki"
		]
	},
	"application/pls+xml": {
		"source": "iana",
		"extensions": [
			"pls"
		]
	},
	"application/poc-settings+xml": {
		"source": "iana"
	},
	"application/postscript": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"ai",
			"eps",
			"ps"
		]
	},
	"application/ppsp-tracker+json": {
		"source": "iana",
		"compressible": true
	},
	"application/problem+json": {
		"source": "iana",
		"compressible": true
	},
	"application/problem+xml": {
		"source": "iana"
	},
	"application/provenance+xml": {
		"source": "iana"
	},
	"application/prs.alvestrand.titrax-sheet": {
		"source": "iana"
	},
	"application/prs.cww": {
		"source": "iana",
		"extensions": [
			"cww"
		]
	},
	"application/prs.hpub+zip": {
		"source": "iana"
	},
	"application/prs.nprend": {
		"source": "iana"
	},
	"application/prs.plucker": {
		"source": "iana"
	},
	"application/prs.rdf-xml-crypt": {
		"source": "iana"
	},
	"application/prs.xsf+xml": {
		"source": "iana"
	},
	"application/pskc+xml": {
		"source": "iana",
		"extensions": [
			"pskcxml"
		]
	},
	"application/qsig": {
		"source": "iana"
	},
	"application/raptorfec": {
		"source": "iana"
	},
	"application/rdap+json": {
		"source": "iana",
		"compressible": true
	},
	"application/rdf+xml": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"rdf"
		]
	},
	"application/reginfo+xml": {
		"source": "iana",
		"extensions": [
			"rif"
		]
	},
	"application/relax-ng-compact-syntax": {
		"source": "iana",
		"extensions": [
			"rnc"
		]
	},
	"application/remote-printing": {
		"source": "iana"
	},
	"application/reputon+json": {
		"source": "iana",
		"compressible": true
	},
	"application/resource-lists+xml": {
		"source": "iana",
		"extensions": [
			"rl"
		]
	},
	"application/resource-lists-diff+xml": {
		"source": "iana",
		"extensions": [
			"rld"
		]
	},
	"application/rfc+xml": {
		"source": "iana"
	},
	"application/riscos": {
		"source": "iana"
	},
	"application/rlmi+xml": {
		"source": "iana"
	},
	"application/rls-services+xml": {
		"source": "iana",
		"extensions": [
			"rs"
		]
	},
	"application/rpki-ghostbusters": {
		"source": "iana",
		"extensions": [
			"gbr"
		]
	},
	"application/rpki-manifest": {
		"source": "iana",
		"extensions": [
			"mft"
		]
	},
	"application/rpki-roa": {
		"source": "iana",
		"extensions": [
			"roa"
		]
	},
	"application/rpki-updown": {
		"source": "iana"
	},
	"application/rsd+xml": {
		"source": "apache",
		"extensions": [
			"rsd"
		]
	},
	"application/rss+xml": {
		"source": "apache",
		"compressible": true,
		"extensions": [
			"rss"
		]
	},
	"application/rtf": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"rtf"
		]
	},
	"application/rtploopback": {
		"source": "iana"
	},
	"application/rtx": {
		"source": "iana"
	},
	"application/samlassertion+xml": {
		"source": "iana"
	},
	"application/samlmetadata+xml": {
		"source": "iana"
	},
	"application/sbml+xml": {
		"source": "iana",
		"extensions": [
			"sbml"
		]
	},
	"application/scaip+xml": {
		"source": "iana"
	},
	"application/scim+json": {
		"source": "iana",
		"compressible": true
	},
	"application/scvp-cv-request": {
		"source": "iana",
		"extensions": [
			"scq"
		]
	},
	"application/scvp-cv-response": {
		"source": "iana",
		"extensions": [
			"scs"
		]
	},
	"application/scvp-vp-request": {
		"source": "iana",
		"extensions": [
			"spq"
		]
	},
	"application/scvp-vp-response": {
		"source": "iana",
		"extensions": [
			"spp"
		]
	},
	"application/sdp": {
		"source": "iana",
		"extensions": [
			"sdp"
		]
	},
	"application/sep+xml": {
		"source": "iana"
	},
	"application/sep-exi": {
		"source": "iana"
	},
	"application/session-info": {
		"source": "iana"
	},
	"application/set-payment": {
		"source": "iana"
	},
	"application/set-payment-initiation": {
		"source": "iana",
		"extensions": [
			"setpay"
		]
	},
	"application/set-registration": {
		"source": "iana"
	},
	"application/set-registration-initiation": {
		"source": "iana",
		"extensions": [
			"setreg"
		]
	},
	"application/sgml": {
		"source": "iana"
	},
	"application/sgml-open-catalog": {
		"source": "iana"
	},
	"application/shf+xml": {
		"source": "iana",
		"extensions": [
			"shf"
		]
	},
	"application/sieve": {
		"source": "iana"
	},
	"application/simple-filter+xml": {
		"source": "iana"
	},
	"application/simple-message-summary": {
		"source": "iana"
	},
	"application/simplesymbolcontainer": {
		"source": "iana"
	},
	"application/slate": {
		"source": "iana"
	},
	"application/smil": {
		"source": "iana"
	},
	"application/smil+xml": {
		"source": "iana",
		"extensions": [
			"smi",
			"smil"
		]
	},
	"application/smpte336m": {
		"source": "iana"
	},
	"application/soap+fastinfoset": {
		"source": "iana"
	},
	"application/soap+xml": {
		"source": "iana",
		"compressible": true
	},
	"application/sparql-query": {
		"source": "iana",
		"extensions": [
			"rq"
		]
	},
	"application/sparql-results+xml": {
		"source": "iana",
		"extensions": [
			"srx"
		]
	},
	"application/spirits-event+xml": {
		"source": "iana"
	},
	"application/sql": {
		"source": "iana"
	},
	"application/srgs": {
		"source": "iana",
		"extensions": [
			"gram"
		]
	},
	"application/srgs+xml": {
		"source": "iana",
		"extensions": [
			"grxml"
		]
	},
	"application/sru+xml": {
		"source": "iana",
		"extensions": [
			"sru"
		]
	},
	"application/ssdl+xml": {
		"source": "apache",
		"extensions": [
			"ssdl"
		]
	},
	"application/ssml+xml": {
		"source": "iana",
		"extensions": [
			"ssml"
		]
	},
	"application/tamp-apex-update": {
		"source": "iana"
	},
	"application/tamp-apex-update-confirm": {
		"source": "iana"
	},
	"application/tamp-community-update": {
		"source": "iana"
	},
	"application/tamp-community-update-confirm": {
		"source": "iana"
	},
	"application/tamp-error": {
		"source": "iana"
	},
	"application/tamp-sequence-adjust": {
		"source": "iana"
	},
	"application/tamp-sequence-adjust-confirm": {
		"source": "iana"
	},
	"application/tamp-status-query": {
		"source": "iana"
	},
	"application/tamp-status-response": {
		"source": "iana"
	},
	"application/tamp-update": {
		"source": "iana"
	},
	"application/tamp-update-confirm": {
		"source": "iana"
	},
	"application/tar": {
		"compressible": true
	},
	"application/tei+xml": {
		"source": "iana",
		"extensions": [
			"tei",
			"teicorpus"
		]
	},
	"application/thraud+xml": {
		"source": "iana",
		"extensions": [
			"tfi"
		]
	},
	"application/timestamp-query": {
		"source": "iana"
	},
	"application/timestamp-reply": {
		"source": "iana"
	},
	"application/timestamped-data": {
		"source": "iana",
		"extensions": [
			"tsd"
		]
	},
	"application/trig": {
		"source": "iana"
	},
	"application/ttml+xml": {
		"source": "iana"
	},
	"application/tve-trigger": {
		"source": "iana"
	},
	"application/ulpfec": {
		"source": "iana"
	},
	"application/urc-grpsheet+xml": {
		"source": "iana"
	},
	"application/urc-ressheet+xml": {
		"source": "iana"
	},
	"application/urc-targetdesc+xml": {
		"source": "iana"
	},
	"application/urc-uisocketdesc+xml": {
		"source": "iana"
	},
	"application/vcard+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vcard+xml": {
		"source": "iana"
	},
	"application/vemmi": {
		"source": "iana"
	},
	"application/vividence.scriptfile": {
		"source": "apache"
	},
	"application/vnd.3gpp-prose+xml": {
		"source": "iana"
	},
	"application/vnd.3gpp-prose-pc3ch+xml": {
		"source": "iana"
	},
	"application/vnd.3gpp.access-transfer-events+xml": {
		"source": "iana"
	},
	"application/vnd.3gpp.bsf+xml": {
		"source": "iana"
	},
	"application/vnd.3gpp.mid-call+xml": {
		"source": "iana"
	},
	"application/vnd.3gpp.pic-bw-large": {
		"source": "iana",
		"extensions": [
			"plb"
		]
	},
	"application/vnd.3gpp.pic-bw-small": {
		"source": "iana",
		"extensions": [
			"psb"
		]
	},
	"application/vnd.3gpp.pic-bw-var": {
		"source": "iana",
		"extensions": [
			"pvb"
		]
	},
	"application/vnd.3gpp.sms": {
		"source": "iana"
	},
	"application/vnd.3gpp.sms+xml": {
		"source": "iana"
	},
	"application/vnd.3gpp.srvcc-ext+xml": {
		"source": "iana"
	},
	"application/vnd.3gpp.srvcc-info+xml": {
		"source": "iana"
	},
	"application/vnd.3gpp.state-and-event-info+xml": {
		"source": "iana"
	},
	"application/vnd.3gpp.ussd+xml": {
		"source": "iana"
	},
	"application/vnd.3gpp2.bcmcsinfo+xml": {
		"source": "iana"
	},
	"application/vnd.3gpp2.sms": {
		"source": "iana"
	},
	"application/vnd.3gpp2.tcap": {
		"source": "iana",
		"extensions": [
			"tcap"
		]
	},
	"application/vnd.3lightssoftware.imagescal": {
		"source": "iana"
	},
	"application/vnd.3m.post-it-notes": {
		"source": "iana",
		"extensions": [
			"pwn"
		]
	},
	"application/vnd.accpac.simply.aso": {
		"source": "iana",
		"extensions": [
			"aso"
		]
	},
	"application/vnd.accpac.simply.imp": {
		"source": "iana",
		"extensions": [
			"imp"
		]
	},
	"application/vnd.acucobol": {
		"source": "iana",
		"extensions": [
			"acu"
		]
	},
	"application/vnd.acucorp": {
		"source": "iana",
		"extensions": [
			"atc",
			"acutc"
		]
	},
	"application/vnd.adobe.air-application-installer-package+zip": {
		"source": "apache",
		"extensions": [
			"air"
		]
	},
	"application/vnd.adobe.flash.movie": {
		"source": "iana"
	},
	"application/vnd.adobe.formscentral.fcdt": {
		"source": "iana",
		"extensions": [
			"fcdt"
		]
	},
	"application/vnd.adobe.fxp": {
		"source": "iana",
		"extensions": [
			"fxp",
			"fxpl"
		]
	},
	"application/vnd.adobe.partial-upload": {
		"source": "iana"
	},
	"application/vnd.adobe.xdp+xml": {
		"source": "iana",
		"extensions": [
			"xdp"
		]
	},
	"application/vnd.adobe.xfdf": {
		"source": "iana",
		"extensions": [
			"xfdf"
		]
	},
	"application/vnd.aether.imp": {
		"source": "iana"
	},
	"application/vnd.ah-barcode": {
		"source": "iana"
	},
	"application/vnd.ahead.space": {
		"source": "iana",
		"extensions": [
			"ahead"
		]
	},
	"application/vnd.airzip.filesecure.azf": {
		"source": "iana",
		"extensions": [
			"azf"
		]
	},
	"application/vnd.airzip.filesecure.azs": {
		"source": "iana",
		"extensions": [
			"azs"
		]
	},
	"application/vnd.amazon.ebook": {
		"source": "apache",
		"extensions": [
			"azw"
		]
	},
	"application/vnd.amazon.mobi8-ebook": {
		"source": "iana"
	},
	"application/vnd.americandynamics.acc": {
		"source": "iana",
		"extensions": [
			"acc"
		]
	},
	"application/vnd.amiga.ami": {
		"source": "iana",
		"extensions": [
			"ami"
		]
	},
	"application/vnd.amundsen.maze+xml": {
		"source": "iana"
	},
	"application/vnd.android.package-archive": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"apk"
		]
	},
	"application/vnd.anki": {
		"source": "iana"
	},
	"application/vnd.anser-web-certificate-issue-initiation": {
		"source": "iana",
		"extensions": [
			"cii"
		]
	},
	"application/vnd.anser-web-funds-transfer-initiation": {
		"source": "apache",
		"extensions": [
			"fti"
		]
	},
	"application/vnd.antix.game-component": {
		"source": "iana",
		"extensions": [
			"atx"
		]
	},
	"application/vnd.apache.thrift.binary": {
		"source": "iana"
	},
	"application/vnd.apache.thrift.compact": {
		"source": "iana"
	},
	"application/vnd.apache.thrift.json": {
		"source": "iana"
	},
	"application/vnd.api+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.apple.installer+xml": {
		"source": "iana",
		"extensions": [
			"mpkg"
		]
	},
	"application/vnd.apple.mpegurl": {
		"source": "iana",
		"extensions": [
			"m3u8"
		]
	},
	"application/vnd.apple.pkpass": {
		"compressible": false,
		"extensions": [
			"pkpass"
		]
	},
	"application/vnd.arastra.swi": {
		"source": "iana"
	},
	"application/vnd.aristanetworks.swi": {
		"source": "iana",
		"extensions": [
			"swi"
		]
	},
	"application/vnd.artsquare": {
		"source": "iana"
	},
	"application/vnd.astraea-software.iota": {
		"source": "iana",
		"extensions": [
			"iota"
		]
	},
	"application/vnd.audiograph": {
		"source": "iana",
		"extensions": [
			"aep"
		]
	},
	"application/vnd.autopackage": {
		"source": "iana"
	},
	"application/vnd.avistar+xml": {
		"source": "iana"
	},
	"application/vnd.balsamiq.bmml+xml": {
		"source": "iana"
	},
	"application/vnd.balsamiq.bmpr": {
		"source": "iana"
	},
	"application/vnd.bekitzur-stech+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.biopax.rdf+xml": {
		"source": "iana"
	},
	"application/vnd.blueice.multipass": {
		"source": "iana",
		"extensions": [
			"mpm"
		]
	},
	"application/vnd.bluetooth.ep.oob": {
		"source": "iana"
	},
	"application/vnd.bluetooth.le.oob": {
		"source": "iana"
	},
	"application/vnd.bmi": {
		"source": "iana",
		"extensions": [
			"bmi"
		]
	},
	"application/vnd.businessobjects": {
		"source": "iana",
		"extensions": [
			"rep"
		]
	},
	"application/vnd.cab-jscript": {
		"source": "iana"
	},
	"application/vnd.canon-cpdl": {
		"source": "iana"
	},
	"application/vnd.canon-lips": {
		"source": "iana"
	},
	"application/vnd.cendio.thinlinc.clientconf": {
		"source": "iana"
	},
	"application/vnd.century-systems.tcp_stream": {
		"source": "iana"
	},
	"application/vnd.chemdraw+xml": {
		"source": "iana",
		"extensions": [
			"cdxml"
		]
	},
	"application/vnd.chess-pgn": {
		"source": "iana"
	},
	"application/vnd.chipnuts.karaoke-mmd": {
		"source": "iana",
		"extensions": [
			"mmd"
		]
	},
	"application/vnd.cinderella": {
		"source": "iana",
		"extensions": [
			"cdy"
		]
	},
	"application/vnd.cirpack.isdn-ext": {
		"source": "iana"
	},
	"application/vnd.citationstyles.style+xml": {
		"source": "iana"
	},
	"application/vnd.claymore": {
		"source": "iana",
		"extensions": [
			"cla"
		]
	},
	"application/vnd.cloanto.rp9": {
		"source": "iana",
		"extensions": [
			"rp9"
		]
	},
	"application/vnd.clonk.c4group": {
		"source": "iana",
		"extensions": [
			"c4g",
			"c4d",
			"c4f",
			"c4p",
			"c4u"
		]
	},
	"application/vnd.cluetrust.cartomobile-config": {
		"source": "iana",
		"extensions": [
			"c11amc"
		]
	},
	"application/vnd.cluetrust.cartomobile-config-pkg": {
		"source": "iana",
		"extensions": [
			"c11amz"
		]
	},
	"application/vnd.coffeescript": {
		"source": "iana"
	},
	"application/vnd.collection+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.collection.doc+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.collection.next+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.comicbook+zip": {
		"source": "iana"
	},
	"application/vnd.commerce-battelle": {
		"source": "iana"
	},
	"application/vnd.commonspace": {
		"source": "iana",
		"extensions": [
			"csp"
		]
	},
	"application/vnd.contact.cmsg": {
		"source": "iana",
		"extensions": [
			"cdbcmsg"
		]
	},
	"application/vnd.coreos.ignition+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.cosmocaller": {
		"source": "iana",
		"extensions": [
			"cmc"
		]
	},
	"application/vnd.crick.clicker": {
		"source": "iana",
		"extensions": [
			"clkx"
		]
	},
	"application/vnd.crick.clicker.keyboard": {
		"source": "iana",
		"extensions": [
			"clkk"
		]
	},
	"application/vnd.crick.clicker.palette": {
		"source": "iana",
		"extensions": [
			"clkp"
		]
	},
	"application/vnd.crick.clicker.template": {
		"source": "iana",
		"extensions": [
			"clkt"
		]
	},
	"application/vnd.crick.clicker.wordbank": {
		"source": "iana",
		"extensions": [
			"clkw"
		]
	},
	"application/vnd.criticaltools.wbs+xml": {
		"source": "iana",
		"extensions": [
			"wbs"
		]
	},
	"application/vnd.ctc-posml": {
		"source": "iana",
		"extensions": [
			"pml"
		]
	},
	"application/vnd.ctct.ws+xml": {
		"source": "iana"
	},
	"application/vnd.cups-pdf": {
		"source": "iana"
	},
	"application/vnd.cups-postscript": {
		"source": "iana"
	},
	"application/vnd.cups-ppd": {
		"source": "iana",
		"extensions": [
			"ppd"
		]
	},
	"application/vnd.cups-raster": {
		"source": "iana"
	},
	"application/vnd.cups-raw": {
		"source": "iana"
	},
	"application/vnd.curl": {
		"source": "iana"
	},
	"application/vnd.curl.car": {
		"source": "apache",
		"extensions": [
			"car"
		]
	},
	"application/vnd.curl.pcurl": {
		"source": "apache",
		"extensions": [
			"pcurl"
		]
	},
	"application/vnd.cyan.dean.root+xml": {
		"source": "iana"
	},
	"application/vnd.cybank": {
		"source": "iana"
	},
	"application/vnd.d2l.coursepackage1p0+zip": {
		"source": "iana"
	},
	"application/vnd.dart": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"dart"
		]
	},
	"application/vnd.data-vision.rdz": {
		"source": "iana",
		"extensions": [
			"rdz"
		]
	},
	"application/vnd.dataresource+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.debian.binary-package": {
		"source": "iana"
	},
	"application/vnd.dece.data": {
		"source": "iana",
		"extensions": [
			"uvf",
			"uvvf",
			"uvd",
			"uvvd"
		]
	},
	"application/vnd.dece.ttml+xml": {
		"source": "iana",
		"extensions": [
			"uvt",
			"uvvt"
		]
	},
	"application/vnd.dece.unspecified": {
		"source": "iana",
		"extensions": [
			"uvx",
			"uvvx"
		]
	},
	"application/vnd.dece.zip": {
		"source": "iana",
		"extensions": [
			"uvz",
			"uvvz"
		]
	},
	"application/vnd.denovo.fcselayout-link": {
		"source": "iana",
		"extensions": [
			"fe_launch"
		]
	},
	"application/vnd.desmume-movie": {
		"source": "iana"
	},
	"application/vnd.desmume.movie": {
		"source": "apache"
	},
	"application/vnd.dir-bi.plate-dl-nosuffix": {
		"source": "iana"
	},
	"application/vnd.dm.delegation+xml": {
		"source": "iana"
	},
	"application/vnd.dna": {
		"source": "iana",
		"extensions": [
			"dna"
		]
	},
	"application/vnd.document+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.dolby.mlp": {
		"source": "apache",
		"extensions": [
			"mlp"
		]
	},
	"application/vnd.dolby.mobile.1": {
		"source": "iana"
	},
	"application/vnd.dolby.mobile.2": {
		"source": "iana"
	},
	"application/vnd.doremir.scorecloud-binary-document": {
		"source": "iana"
	},
	"application/vnd.dpgraph": {
		"source": "iana",
		"extensions": [
			"dpg"
		]
	},
	"application/vnd.dreamfactory": {
		"source": "iana",
		"extensions": [
			"dfac"
		]
	},
	"application/vnd.drive+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.ds-keypoint": {
		"source": "apache",
		"extensions": [
			"kpxx"
		]
	},
	"application/vnd.dtg.local": {
		"source": "iana"
	},
	"application/vnd.dtg.local.flash": {
		"source": "iana"
	},
	"application/vnd.dtg.local.html": {
		"source": "iana"
	},
	"application/vnd.dvb.ait": {
		"source": "iana",
		"extensions": [
			"ait"
		]
	},
	"application/vnd.dvb.dvbj": {
		"source": "iana"
	},
	"application/vnd.dvb.esgcontainer": {
		"source": "iana"
	},
	"application/vnd.dvb.ipdcdftnotifaccess": {
		"source": "iana"
	},
	"application/vnd.dvb.ipdcesgaccess": {
		"source": "iana"
	},
	"application/vnd.dvb.ipdcesgaccess2": {
		"source": "iana"
	},
	"application/vnd.dvb.ipdcesgpdd": {
		"source": "iana"
	},
	"application/vnd.dvb.ipdcroaming": {
		"source": "iana"
	},
	"application/vnd.dvb.iptv.alfec-base": {
		"source": "iana"
	},
	"application/vnd.dvb.iptv.alfec-enhancement": {
		"source": "iana"
	},
	"application/vnd.dvb.notif-aggregate-root+xml": {
		"source": "iana"
	},
	"application/vnd.dvb.notif-container+xml": {
		"source": "iana"
	},
	"application/vnd.dvb.notif-generic+xml": {
		"source": "iana"
	},
	"application/vnd.dvb.notif-ia-msglist+xml": {
		"source": "iana"
	},
	"application/vnd.dvb.notif-ia-registration-request+xml": {
		"source": "iana"
	},
	"application/vnd.dvb.notif-ia-registration-response+xml": {
		"source": "iana"
	},
	"application/vnd.dvb.notif-init+xml": {
		"source": "iana"
	},
	"application/vnd.dvb.pfr": {
		"source": "iana"
	},
	"application/vnd.dvb.service": {
		"source": "iana",
		"extensions": [
			"svc"
		]
	},
	"application/vnd.dxr": {
		"source": "iana"
	},
	"application/vnd.dynageo": {
		"source": "iana",
		"extensions": [
			"geo"
		]
	},
	"application/vnd.dzr": {
		"source": "iana"
	},
	"application/vnd.easykaraoke.cdgdownload": {
		"source": "iana"
	},
	"application/vnd.ecdis-update": {
		"source": "iana"
	},
	"application/vnd.ecowin.chart": {
		"source": "iana",
		"extensions": [
			"mag"
		]
	},
	"application/vnd.ecowin.filerequest": {
		"source": "iana"
	},
	"application/vnd.ecowin.fileupdate": {
		"source": "iana"
	},
	"application/vnd.ecowin.series": {
		"source": "iana"
	},
	"application/vnd.ecowin.seriesrequest": {
		"source": "iana"
	},
	"application/vnd.ecowin.seriesupdate": {
		"source": "iana"
	},
	"application/vnd.emclient.accessrequest+xml": {
		"source": "iana"
	},
	"application/vnd.enliven": {
		"source": "iana",
		"extensions": [
			"nml"
		]
	},
	"application/vnd.enphase.envoy": {
		"source": "iana"
	},
	"application/vnd.eprints.data+xml": {
		"source": "iana"
	},
	"application/vnd.epson.esf": {
		"source": "iana",
		"extensions": [
			"esf"
		]
	},
	"application/vnd.epson.msf": {
		"source": "iana",
		"extensions": [
			"msf"
		]
	},
	"application/vnd.epson.quickanime": {
		"source": "iana",
		"extensions": [
			"qam"
		]
	},
	"application/vnd.epson.salt": {
		"source": "iana",
		"extensions": [
			"slt"
		]
	},
	"application/vnd.epson.ssf": {
		"source": "iana",
		"extensions": [
			"ssf"
		]
	},
	"application/vnd.ericsson.quickcall": {
		"source": "iana"
	},
	"application/vnd.espass-espass+zip": {
		"source": "iana"
	},
	"application/vnd.eszigno3+xml": {
		"source": "iana",
		"extensions": [
			"es3",
			"et3"
		]
	},
	"application/vnd.etsi.aoc+xml": {
		"source": "iana"
	},
	"application/vnd.etsi.asic-e+zip": {
		"source": "iana"
	},
	"application/vnd.etsi.asic-s+zip": {
		"source": "iana"
	},
	"application/vnd.etsi.cug+xml": {
		"source": "iana"
	},
	"application/vnd.etsi.iptvcommand+xml": {
		"source": "iana"
	},
	"application/vnd.etsi.iptvdiscovery+xml": {
		"source": "iana"
	},
	"application/vnd.etsi.iptvprofile+xml": {
		"source": "iana"
	},
	"application/vnd.etsi.iptvsad-bc+xml": {
		"source": "iana"
	},
	"application/vnd.etsi.iptvsad-cod+xml": {
		"source": "iana"
	},
	"application/vnd.etsi.iptvsad-npvr+xml": {
		"source": "iana"
	},
	"application/vnd.etsi.iptvservice+xml": {
		"source": "iana"
	},
	"application/vnd.etsi.iptvsync+xml": {
		"source": "iana"
	},
	"application/vnd.etsi.iptvueprofile+xml": {
		"source": "iana"
	},
	"application/vnd.etsi.mcid+xml": {
		"source": "iana"
	},
	"application/vnd.etsi.mheg5": {
		"source": "iana"
	},
	"application/vnd.etsi.overload-control-policy-dataset+xml": {
		"source": "iana"
	},
	"application/vnd.etsi.pstn+xml": {
		"source": "iana"
	},
	"application/vnd.etsi.sci+xml": {
		"source": "iana"
	},
	"application/vnd.etsi.simservs+xml": {
		"source": "iana"
	},
	"application/vnd.etsi.timestamp-token": {
		"source": "iana"
	},
	"application/vnd.etsi.tsl+xml": {
		"source": "iana"
	},
	"application/vnd.etsi.tsl.der": {
		"source": "iana"
	},
	"application/vnd.eudora.data": {
		"source": "iana"
	},
	"application/vnd.ezpix-album": {
		"source": "iana",
		"extensions": [
			"ez2"
		]
	},
	"application/vnd.ezpix-package": {
		"source": "iana",
		"extensions": [
			"ez3"
		]
	},
	"application/vnd.f-secure.mobile": {
		"source": "iana"
	},
	"application/vnd.fastcopy-disk-image": {
		"source": "iana"
	},
	"application/vnd.fdf": {
		"source": "iana",
		"extensions": [
			"fdf"
		]
	},
	"application/vnd.fdsn.mseed": {
		"source": "iana",
		"extensions": [
			"mseed"
		]
	},
	"application/vnd.fdsn.seed": {
		"source": "iana",
		"extensions": [
			"seed",
			"dataless"
		]
	},
	"application/vnd.ffsns": {
		"source": "iana"
	},
	"application/vnd.filmit.zfc": {
		"source": "iana"
	},
	"application/vnd.fints": {
		"source": "iana"
	},
	"application/vnd.firemonkeys.cloudcell": {
		"source": "iana"
	},
	"application/vnd.flographit": {
		"source": "iana",
		"extensions": [
			"gph"
		]
	},
	"application/vnd.fluxtime.clip": {
		"source": "iana",
		"extensions": [
			"ftc"
		]
	},
	"application/vnd.font-fontforge-sfd": {
		"source": "iana"
	},
	"application/vnd.framemaker": {
		"source": "iana",
		"extensions": [
			"fm",
			"frame",
			"maker",
			"book"
		]
	},
	"application/vnd.frogans.fnc": {
		"source": "iana",
		"extensions": [
			"fnc"
		]
	},
	"application/vnd.frogans.ltf": {
		"source": "iana",
		"extensions": [
			"ltf"
		]
	},
	"application/vnd.fsc.weblaunch": {
		"source": "iana",
		"extensions": [
			"fsc"
		]
	},
	"application/vnd.fujitsu.oasys": {
		"source": "iana",
		"extensions": [
			"oas"
		]
	},
	"application/vnd.fujitsu.oasys2": {
		"source": "iana",
		"extensions": [
			"oa2"
		]
	},
	"application/vnd.fujitsu.oasys3": {
		"source": "iana",
		"extensions": [
			"oa3"
		]
	},
	"application/vnd.fujitsu.oasysgp": {
		"source": "iana",
		"extensions": [
			"fg5"
		]
	},
	"application/vnd.fujitsu.oasysprs": {
		"source": "iana",
		"extensions": [
			"bh2"
		]
	},
	"application/vnd.fujixerox.art-ex": {
		"source": "iana"
	},
	"application/vnd.fujixerox.art4": {
		"source": "iana"
	},
	"application/vnd.fujixerox.ddd": {
		"source": "iana",
		"extensions": [
			"ddd"
		]
	},
	"application/vnd.fujixerox.docuworks": {
		"source": "iana",
		"extensions": [
			"xdw"
		]
	},
	"application/vnd.fujixerox.docuworks.binder": {
		"source": "iana",
		"extensions": [
			"xbd"
		]
	},
	"application/vnd.fujixerox.docuworks.container": {
		"source": "iana"
	},
	"application/vnd.fujixerox.hbpl": {
		"source": "iana"
	},
	"application/vnd.fut-misnet": {
		"source": "iana"
	},
	"application/vnd.fuzzysheet": {
		"source": "iana",
		"extensions": [
			"fzs"
		]
	},
	"application/vnd.genomatix.tuxedo": {
		"source": "iana",
		"extensions": [
			"txd"
		]
	},
	"application/vnd.geo+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.geocube+xml": {
		"source": "iana"
	},
	"application/vnd.geogebra.file": {
		"source": "iana",
		"extensions": [
			"ggb"
		]
	},
	"application/vnd.geogebra.tool": {
		"source": "iana",
		"extensions": [
			"ggt"
		]
	},
	"application/vnd.geometry-explorer": {
		"source": "iana",
		"extensions": [
			"gex",
			"gre"
		]
	},
	"application/vnd.geonext": {
		"source": "iana",
		"extensions": [
			"gxt"
		]
	},
	"application/vnd.geoplan": {
		"source": "iana",
		"extensions": [
			"g2w"
		]
	},
	"application/vnd.geospace": {
		"source": "iana",
		"extensions": [
			"g3w"
		]
	},
	"application/vnd.gerber": {
		"source": "iana"
	},
	"application/vnd.globalplatform.card-content-mgt": {
		"source": "iana"
	},
	"application/vnd.globalplatform.card-content-mgt-response": {
		"source": "iana"
	},
	"application/vnd.gmx": {
		"source": "iana",
		"extensions": [
			"gmx"
		]
	},
	"application/vnd.google-apps.document": {
		"compressible": false,
		"extensions": [
			"gdoc"
		]
	},
	"application/vnd.google-apps.presentation": {
		"compressible": false,
		"extensions": [
			"gslides"
		]
	},
	"application/vnd.google-apps.spreadsheet": {
		"compressible": false,
		"extensions": [
			"gsheet"
		]
	},
	"application/vnd.google-earth.kml+xml": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"kml"
		]
	},
	"application/vnd.google-earth.kmz": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"kmz"
		]
	},
	"application/vnd.gov.sk.e-form+xml": {
		"source": "iana"
	},
	"application/vnd.gov.sk.e-form+zip": {
		"source": "iana"
	},
	"application/vnd.gov.sk.xmldatacontainer+xml": {
		"source": "iana"
	},
	"application/vnd.grafeq": {
		"source": "iana",
		"extensions": [
			"gqf",
			"gqs"
		]
	},
	"application/vnd.gridmp": {
		"source": "iana"
	},
	"application/vnd.groove-account": {
		"source": "iana",
		"extensions": [
			"gac"
		]
	},
	"application/vnd.groove-help": {
		"source": "iana",
		"extensions": [
			"ghf"
		]
	},
	"application/vnd.groove-identity-message": {
		"source": "iana",
		"extensions": [
			"gim"
		]
	},
	"application/vnd.groove-injector": {
		"source": "iana",
		"extensions": [
			"grv"
		]
	},
	"application/vnd.groove-tool-message": {
		"source": "iana",
		"extensions": [
			"gtm"
		]
	},
	"application/vnd.groove-tool-template": {
		"source": "iana",
		"extensions": [
			"tpl"
		]
	},
	"application/vnd.groove-vcard": {
		"source": "iana",
		"extensions": [
			"vcg"
		]
	},
	"application/vnd.hal+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.hal+xml": {
		"source": "iana",
		"extensions": [
			"hal"
		]
	},
	"application/vnd.handheld-entertainment+xml": {
		"source": "iana",
		"extensions": [
			"zmm"
		]
	},
	"application/vnd.hbci": {
		"source": "iana",
		"extensions": [
			"hbci"
		]
	},
	"application/vnd.hc+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.hcl-bireports": {
		"source": "iana"
	},
	"application/vnd.hdt": {
		"source": "iana"
	},
	"application/vnd.heroku+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.hhe.lesson-player": {
		"source": "iana",
		"extensions": [
			"les"
		]
	},
	"application/vnd.hp-hpgl": {
		"source": "iana",
		"extensions": [
			"hpgl"
		]
	},
	"application/vnd.hp-hpid": {
		"source": "iana",
		"extensions": [
			"hpid"
		]
	},
	"application/vnd.hp-hps": {
		"source": "iana",
		"extensions": [
			"hps"
		]
	},
	"application/vnd.hp-jlyt": {
		"source": "iana",
		"extensions": [
			"jlt"
		]
	},
	"application/vnd.hp-pcl": {
		"source": "iana",
		"extensions": [
			"pcl"
		]
	},
	"application/vnd.hp-pclxl": {
		"source": "iana",
		"extensions": [
			"pclxl"
		]
	},
	"application/vnd.httphone": {
		"source": "iana"
	},
	"application/vnd.hydrostatix.sof-data": {
		"source": "iana",
		"extensions": [
			"sfd-hdstx"
		]
	},
	"application/vnd.hyperdrive+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.hzn-3d-crossword": {
		"source": "iana"
	},
	"application/vnd.ibm.afplinedata": {
		"source": "iana"
	},
	"application/vnd.ibm.electronic-media": {
		"source": "iana"
	},
	"application/vnd.ibm.minipay": {
		"source": "iana",
		"extensions": [
			"mpy"
		]
	},
	"application/vnd.ibm.modcap": {
		"source": "iana",
		"extensions": [
			"afp",
			"listafp",
			"list3820"
		]
	},
	"application/vnd.ibm.rights-management": {
		"source": "iana",
		"extensions": [
			"irm"
		]
	},
	"application/vnd.ibm.secure-container": {
		"source": "iana",
		"extensions": [
			"sc"
		]
	},
	"application/vnd.iccprofile": {
		"source": "iana",
		"extensions": [
			"icc",
			"icm"
		]
	},
	"application/vnd.ieee.1905": {
		"source": "iana"
	},
	"application/vnd.igloader": {
		"source": "iana",
		"extensions": [
			"igl"
		]
	},
	"application/vnd.immervision-ivp": {
		"source": "iana",
		"extensions": [
			"ivp"
		]
	},
	"application/vnd.immervision-ivu": {
		"source": "iana",
		"extensions": [
			"ivu"
		]
	},
	"application/vnd.ims.imsccv1p1": {
		"source": "iana"
	},
	"application/vnd.ims.imsccv1p2": {
		"source": "iana"
	},
	"application/vnd.ims.imsccv1p3": {
		"source": "iana"
	},
	"application/vnd.ims.lis.v2.result+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.ims.lti.v2.toolconsumerprofile+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.ims.lti.v2.toolproxy+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.ims.lti.v2.toolproxy.id+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.ims.lti.v2.toolsettings+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.ims.lti.v2.toolsettings.simple+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.informedcontrol.rms+xml": {
		"source": "iana"
	},
	"application/vnd.informix-visionary": {
		"source": "iana"
	},
	"application/vnd.infotech.project": {
		"source": "iana"
	},
	"application/vnd.infotech.project+xml": {
		"source": "iana"
	},
	"application/vnd.innopath.wamp.notification": {
		"source": "iana"
	},
	"application/vnd.insors.igm": {
		"source": "iana",
		"extensions": [
			"igm"
		]
	},
	"application/vnd.intercon.formnet": {
		"source": "iana",
		"extensions": [
			"xpw",
			"xpx"
		]
	},
	"application/vnd.intergeo": {
		"source": "iana",
		"extensions": [
			"i2g"
		]
	},
	"application/vnd.intertrust.digibox": {
		"source": "iana"
	},
	"application/vnd.intertrust.nncp": {
		"source": "iana"
	},
	"application/vnd.intu.qbo": {
		"source": "iana",
		"extensions": [
			"qbo"
		]
	},
	"application/vnd.intu.qfx": {
		"source": "iana",
		"extensions": [
			"qfx"
		]
	},
	"application/vnd.iptc.g2.catalogitem+xml": {
		"source": "iana"
	},
	"application/vnd.iptc.g2.conceptitem+xml": {
		"source": "iana"
	},
	"application/vnd.iptc.g2.knowledgeitem+xml": {
		"source": "iana"
	},
	"application/vnd.iptc.g2.newsitem+xml": {
		"source": "iana"
	},
	"application/vnd.iptc.g2.newsmessage+xml": {
		"source": "iana"
	},
	"application/vnd.iptc.g2.packageitem+xml": {
		"source": "iana"
	},
	"application/vnd.iptc.g2.planningitem+xml": {
		"source": "iana"
	},
	"application/vnd.ipunplugged.rcprofile": {
		"source": "iana",
		"extensions": [
			"rcprofile"
		]
	},
	"application/vnd.irepository.package+xml": {
		"source": "iana",
		"extensions": [
			"irp"
		]
	},
	"application/vnd.is-xpr": {
		"source": "iana",
		"extensions": [
			"xpr"
		]
	},
	"application/vnd.isac.fcs": {
		"source": "iana",
		"extensions": [
			"fcs"
		]
	},
	"application/vnd.jam": {
		"source": "iana",
		"extensions": [
			"jam"
		]
	},
	"application/vnd.japannet-directory-service": {
		"source": "iana"
	},
	"application/vnd.japannet-jpnstore-wakeup": {
		"source": "iana"
	},
	"application/vnd.japannet-payment-wakeup": {
		"source": "iana"
	},
	"application/vnd.japannet-registration": {
		"source": "iana"
	},
	"application/vnd.japannet-registration-wakeup": {
		"source": "iana"
	},
	"application/vnd.japannet-setstore-wakeup": {
		"source": "iana"
	},
	"application/vnd.japannet-verification": {
		"source": "iana"
	},
	"application/vnd.japannet-verification-wakeup": {
		"source": "iana"
	},
	"application/vnd.jcp.javame.midlet-rms": {
		"source": "iana",
		"extensions": [
			"rms"
		]
	},
	"application/vnd.jisp": {
		"source": "iana",
		"extensions": [
			"jisp"
		]
	},
	"application/vnd.joost.joda-archive": {
		"source": "iana",
		"extensions": [
			"joda"
		]
	},
	"application/vnd.jsk.isdn-ngn": {
		"source": "iana"
	},
	"application/vnd.kahootz": {
		"source": "iana",
		"extensions": [
			"ktz",
			"ktr"
		]
	},
	"application/vnd.kde.karbon": {
		"source": "iana",
		"extensions": [
			"karbon"
		]
	},
	"application/vnd.kde.kchart": {
		"source": "iana",
		"extensions": [
			"chrt"
		]
	},
	"application/vnd.kde.kformula": {
		"source": "iana",
		"extensions": [
			"kfo"
		]
	},
	"application/vnd.kde.kivio": {
		"source": "iana",
		"extensions": [
			"flw"
		]
	},
	"application/vnd.kde.kontour": {
		"source": "iana",
		"extensions": [
			"kon"
		]
	},
	"application/vnd.kde.kpresenter": {
		"source": "iana",
		"extensions": [
			"kpr",
			"kpt"
		]
	},
	"application/vnd.kde.kspread": {
		"source": "iana",
		"extensions": [
			"ksp"
		]
	},
	"application/vnd.kde.kword": {
		"source": "iana",
		"extensions": [
			"kwd",
			"kwt"
		]
	},
	"application/vnd.kenameaapp": {
		"source": "iana",
		"extensions": [
			"htke"
		]
	},
	"application/vnd.kidspiration": {
		"source": "iana",
		"extensions": [
			"kia"
		]
	},
	"application/vnd.kinar": {
		"source": "iana",
		"extensions": [
			"kne",
			"knp"
		]
	},
	"application/vnd.koan": {
		"source": "iana",
		"extensions": [
			"skp",
			"skd",
			"skt",
			"skm"
		]
	},
	"application/vnd.kodak-descriptor": {
		"source": "iana",
		"extensions": [
			"sse"
		]
	},
	"application/vnd.las.las+xml": {
		"source": "iana",
		"extensions": [
			"lasxml"
		]
	},
	"application/vnd.liberty-request+xml": {
		"source": "iana"
	},
	"application/vnd.llamagraphics.life-balance.desktop": {
		"source": "iana",
		"extensions": [
			"lbd"
		]
	},
	"application/vnd.llamagraphics.life-balance.exchange+xml": {
		"source": "iana",
		"extensions": [
			"lbe"
		]
	},
	"application/vnd.lotus-1-2-3": {
		"source": "iana",
		"extensions": [
			"123"
		]
	},
	"application/vnd.lotus-approach": {
		"source": "iana",
		"extensions": [
			"apr"
		]
	},
	"application/vnd.lotus-freelance": {
		"source": "iana",
		"extensions": [
			"pre"
		]
	},
	"application/vnd.lotus-notes": {
		"source": "iana",
		"extensions": [
			"nsf"
		]
	},
	"application/vnd.lotus-organizer": {
		"source": "iana",
		"extensions": [
			"org"
		]
	},
	"application/vnd.lotus-screencam": {
		"source": "iana",
		"extensions": [
			"scm"
		]
	},
	"application/vnd.lotus-wordpro": {
		"source": "iana",
		"extensions": [
			"lwp"
		]
	},
	"application/vnd.macports.portpkg": {
		"source": "iana",
		"extensions": [
			"portpkg"
		]
	},
	"application/vnd.mapbox-vector-tile": {
		"source": "iana"
	},
	"application/vnd.marlin.drm.actiontoken+xml": {
		"source": "iana"
	},
	"application/vnd.marlin.drm.conftoken+xml": {
		"source": "iana"
	},
	"application/vnd.marlin.drm.license+xml": {
		"source": "iana"
	},
	"application/vnd.marlin.drm.mdcf": {
		"source": "iana"
	},
	"application/vnd.mason+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.maxmind.maxmind-db": {
		"source": "iana"
	},
	"application/vnd.mcd": {
		"source": "iana",
		"extensions": [
			"mcd"
		]
	},
	"application/vnd.medcalcdata": {
		"source": "iana",
		"extensions": [
			"mc1"
		]
	},
	"application/vnd.mediastation.cdkey": {
		"source": "iana",
		"extensions": [
			"cdkey"
		]
	},
	"application/vnd.meridian-slingshot": {
		"source": "iana"
	},
	"application/vnd.mfer": {
		"source": "iana",
		"extensions": [
			"mwf"
		]
	},
	"application/vnd.mfmp": {
		"source": "iana",
		"extensions": [
			"mfm"
		]
	},
	"application/vnd.micro+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.micrografx.flo": {
		"source": "iana",
		"extensions": [
			"flo"
		]
	},
	"application/vnd.micrografx.igx": {
		"source": "iana",
		"extensions": [
			"igx"
		]
	},
	"application/vnd.microsoft.portable-executable": {
		"source": "iana"
	},
	"application/vnd.miele+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.mif": {
		"source": "iana",
		"extensions": [
			"mif"
		]
	},
	"application/vnd.minisoft-hp3000-save": {
		"source": "iana"
	},
	"application/vnd.mitsubishi.misty-guard.trustweb": {
		"source": "iana"
	},
	"application/vnd.mobius.daf": {
		"source": "iana",
		"extensions": [
			"daf"
		]
	},
	"application/vnd.mobius.dis": {
		"source": "iana",
		"extensions": [
			"dis"
		]
	},
	"application/vnd.mobius.mbk": {
		"source": "iana",
		"extensions": [
			"mbk"
		]
	},
	"application/vnd.mobius.mqy": {
		"source": "iana",
		"extensions": [
			"mqy"
		]
	},
	"application/vnd.mobius.msl": {
		"source": "iana",
		"extensions": [
			"msl"
		]
	},
	"application/vnd.mobius.plc": {
		"source": "iana",
		"extensions": [
			"plc"
		]
	},
	"application/vnd.mobius.txf": {
		"source": "iana",
		"extensions": [
			"txf"
		]
	},
	"application/vnd.mophun.application": {
		"source": "iana",
		"extensions": [
			"mpn"
		]
	},
	"application/vnd.mophun.certificate": {
		"source": "iana",
		"extensions": [
			"mpc"
		]
	},
	"application/vnd.motorola.flexsuite": {
		"source": "iana"
	},
	"application/vnd.motorola.flexsuite.adsi": {
		"source": "iana"
	},
	"application/vnd.motorola.flexsuite.fis": {
		"source": "iana"
	},
	"application/vnd.motorola.flexsuite.gotap": {
		"source": "iana"
	},
	"application/vnd.motorola.flexsuite.kmr": {
		"source": "iana"
	},
	"application/vnd.motorola.flexsuite.ttc": {
		"source": "iana"
	},
	"application/vnd.motorola.flexsuite.wem": {
		"source": "iana"
	},
	"application/vnd.motorola.iprm": {
		"source": "iana"
	},
	"application/vnd.mozilla.xul+xml": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"xul"
		]
	},
	"application/vnd.ms-3mfdocument": {
		"source": "iana"
	},
	"application/vnd.ms-artgalry": {
		"source": "iana",
		"extensions": [
			"cil"
		]
	},
	"application/vnd.ms-asf": {
		"source": "iana"
	},
	"application/vnd.ms-cab-compressed": {
		"source": "iana",
		"extensions": [
			"cab"
		]
	},
	"application/vnd.ms-color.iccprofile": {
		"source": "apache"
	},
	"application/vnd.ms-excel": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"xls",
			"xlm",
			"xla",
			"xlc",
			"xlt",
			"xlw"
		]
	},
	"application/vnd.ms-excel.addin.macroenabled.12": {
		"source": "iana",
		"extensions": [
			"xlam"
		]
	},
	"application/vnd.ms-excel.sheet.binary.macroenabled.12": {
		"source": "iana",
		"extensions": [
			"xlsb"
		]
	},
	"application/vnd.ms-excel.sheet.macroenabled.12": {
		"source": "iana",
		"extensions": [
			"xlsm"
		]
	},
	"application/vnd.ms-excel.template.macroenabled.12": {
		"source": "iana",
		"extensions": [
			"xltm"
		]
	},
	"application/vnd.ms-fontobject": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"eot"
		]
	},
	"application/vnd.ms-htmlhelp": {
		"source": "iana",
		"extensions": [
			"chm"
		]
	},
	"application/vnd.ms-ims": {
		"source": "iana",
		"extensions": [
			"ims"
		]
	},
	"application/vnd.ms-lrm": {
		"source": "iana",
		"extensions": [
			"lrm"
		]
	},
	"application/vnd.ms-office.activex+xml": {
		"source": "iana"
	},
	"application/vnd.ms-officetheme": {
		"source": "iana",
		"extensions": [
			"thmx"
		]
	},
	"application/vnd.ms-opentype": {
		"source": "apache",
		"compressible": true
	},
	"application/vnd.ms-package.obfuscated-opentype": {
		"source": "apache"
	},
	"application/vnd.ms-pki.seccat": {
		"source": "apache",
		"extensions": [
			"cat"
		]
	},
	"application/vnd.ms-pki.stl": {
		"source": "apache",
		"extensions": [
			"stl"
		]
	},
	"application/vnd.ms-playready.initiator+xml": {
		"source": "iana"
	},
	"application/vnd.ms-powerpoint": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"ppt",
			"pps",
			"pot"
		]
	},
	"application/vnd.ms-powerpoint.addin.macroenabled.12": {
		"source": "iana",
		"extensions": [
			"ppam"
		]
	},
	"application/vnd.ms-powerpoint.presentation.macroenabled.12": {
		"source": "iana",
		"extensions": [
			"pptm"
		]
	},
	"application/vnd.ms-powerpoint.slide.macroenabled.12": {
		"source": "iana",
		"extensions": [
			"sldm"
		]
	},
	"application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
		"source": "iana",
		"extensions": [
			"ppsm"
		]
	},
	"application/vnd.ms-powerpoint.template.macroenabled.12": {
		"source": "iana",
		"extensions": [
			"potm"
		]
	},
	"application/vnd.ms-printdevicecapabilities+xml": {
		"source": "iana"
	},
	"application/vnd.ms-printing.printticket+xml": {
		"source": "apache"
	},
	"application/vnd.ms-printschematicket+xml": {
		"source": "iana"
	},
	"application/vnd.ms-project": {
		"source": "iana",
		"extensions": [
			"mpp",
			"mpt"
		]
	},
	"application/vnd.ms-tnef": {
		"source": "iana"
	},
	"application/vnd.ms-windows.devicepairing": {
		"source": "iana"
	},
	"application/vnd.ms-windows.nwprinting.oob": {
		"source": "iana"
	},
	"application/vnd.ms-windows.printerpairing": {
		"source": "iana"
	},
	"application/vnd.ms-windows.wsd.oob": {
		"source": "iana"
	},
	"application/vnd.ms-wmdrm.lic-chlg-req": {
		"source": "iana"
	},
	"application/vnd.ms-wmdrm.lic-resp": {
		"source": "iana"
	},
	"application/vnd.ms-wmdrm.meter-chlg-req": {
		"source": "iana"
	},
	"application/vnd.ms-wmdrm.meter-resp": {
		"source": "iana"
	},
	"application/vnd.ms-word.document.macroenabled.12": {
		"source": "iana",
		"extensions": [
			"docm"
		]
	},
	"application/vnd.ms-word.template.macroenabled.12": {
		"source": "iana",
		"extensions": [
			"dotm"
		]
	},
	"application/vnd.ms-works": {
		"source": "iana",
		"extensions": [
			"wps",
			"wks",
			"wcm",
			"wdb"
		]
	},
	"application/vnd.ms-wpl": {
		"source": "iana",
		"extensions": [
			"wpl"
		]
	},
	"application/vnd.ms-xpsdocument": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"xps"
		]
	},
	"application/vnd.msa-disk-image": {
		"source": "iana"
	},
	"application/vnd.mseq": {
		"source": "iana",
		"extensions": [
			"mseq"
		]
	},
	"application/vnd.msign": {
		"source": "iana"
	},
	"application/vnd.multiad.creator": {
		"source": "iana"
	},
	"application/vnd.multiad.creator.cif": {
		"source": "iana"
	},
	"application/vnd.music-niff": {
		"source": "iana"
	},
	"application/vnd.musician": {
		"source": "iana",
		"extensions": [
			"mus"
		]
	},
	"application/vnd.muvee.style": {
		"source": "iana",
		"extensions": [
			"msty"
		]
	},
	"application/vnd.mynfc": {
		"source": "iana",
		"extensions": [
			"taglet"
		]
	},
	"application/vnd.ncd.control": {
		"source": "iana"
	},
	"application/vnd.ncd.reference": {
		"source": "iana"
	},
	"application/vnd.nearst.inv+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.nervana": {
		"source": "iana"
	},
	"application/vnd.netfpx": {
		"source": "iana"
	},
	"application/vnd.neurolanguage.nlu": {
		"source": "iana",
		"extensions": [
			"nlu"
		]
	},
	"application/vnd.nintendo.nitro.rom": {
		"source": "iana"
	},
	"application/vnd.nintendo.snes.rom": {
		"source": "iana"
	},
	"application/vnd.nitf": {
		"source": "iana",
		"extensions": [
			"ntf",
			"nitf"
		]
	},
	"application/vnd.noblenet-directory": {
		"source": "iana",
		"extensions": [
			"nnd"
		]
	},
	"application/vnd.noblenet-sealer": {
		"source": "iana",
		"extensions": [
			"nns"
		]
	},
	"application/vnd.noblenet-web": {
		"source": "iana",
		"extensions": [
			"nnw"
		]
	},
	"application/vnd.nokia.catalogs": {
		"source": "iana"
	},
	"application/vnd.nokia.conml+wbxml": {
		"source": "iana"
	},
	"application/vnd.nokia.conml+xml": {
		"source": "iana"
	},
	"application/vnd.nokia.iptv.config+xml": {
		"source": "iana"
	},
	"application/vnd.nokia.isds-radio-presets": {
		"source": "iana"
	},
	"application/vnd.nokia.landmark+wbxml": {
		"source": "iana"
	},
	"application/vnd.nokia.landmark+xml": {
		"source": "iana"
	},
	"application/vnd.nokia.landmarkcollection+xml": {
		"source": "iana"
	},
	"application/vnd.nokia.n-gage.ac+xml": {
		"source": "iana"
	},
	"application/vnd.nokia.n-gage.data": {
		"source": "iana",
		"extensions": [
			"ngdat"
		]
	},
	"application/vnd.nokia.n-gage.symbian.install": {
		"source": "iana",
		"extensions": [
			"n-gage"
		]
	},
	"application/vnd.nokia.ncd": {
		"source": "iana"
	},
	"application/vnd.nokia.pcd+wbxml": {
		"source": "iana"
	},
	"application/vnd.nokia.pcd+xml": {
		"source": "iana"
	},
	"application/vnd.nokia.radio-preset": {
		"source": "iana",
		"extensions": [
			"rpst"
		]
	},
	"application/vnd.nokia.radio-presets": {
		"source": "iana",
		"extensions": [
			"rpss"
		]
	},
	"application/vnd.novadigm.edm": {
		"source": "iana",
		"extensions": [
			"edm"
		]
	},
	"application/vnd.novadigm.edx": {
		"source": "iana",
		"extensions": [
			"edx"
		]
	},
	"application/vnd.novadigm.ext": {
		"source": "iana",
		"extensions": [
			"ext"
		]
	},
	"application/vnd.ntt-local.content-share": {
		"source": "iana"
	},
	"application/vnd.ntt-local.file-transfer": {
		"source": "iana"
	},
	"application/vnd.ntt-local.ogw_remote-access": {
		"source": "iana"
	},
	"application/vnd.ntt-local.sip-ta_remote": {
		"source": "iana"
	},
	"application/vnd.ntt-local.sip-ta_tcp_stream": {
		"source": "iana"
	},
	"application/vnd.oasis.opendocument.chart": {
		"source": "iana",
		"extensions": [
			"odc"
		]
	},
	"application/vnd.oasis.opendocument.chart-template": {
		"source": "iana",
		"extensions": [
			"otc"
		]
	},
	"application/vnd.oasis.opendocument.database": {
		"source": "iana",
		"extensions": [
			"odb"
		]
	},
	"application/vnd.oasis.opendocument.formula": {
		"source": "iana",
		"extensions": [
			"odf"
		]
	},
	"application/vnd.oasis.opendocument.formula-template": {
		"source": "iana",
		"extensions": [
			"odft"
		]
	},
	"application/vnd.oasis.opendocument.graphics": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"odg"
		]
	},
	"application/vnd.oasis.opendocument.graphics-template": {
		"source": "iana",
		"extensions": [
			"otg"
		]
	},
	"application/vnd.oasis.opendocument.image": {
		"source": "iana",
		"extensions": [
			"odi"
		]
	},
	"application/vnd.oasis.opendocument.image-template": {
		"source": "iana",
		"extensions": [
			"oti"
		]
	},
	"application/vnd.oasis.opendocument.presentation": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"odp"
		]
	},
	"application/vnd.oasis.opendocument.presentation-template": {
		"source": "iana",
		"extensions": [
			"otp"
		]
	},
	"application/vnd.oasis.opendocument.spreadsheet": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"ods"
		]
	},
	"application/vnd.oasis.opendocument.spreadsheet-template": {
		"source": "iana",
		"extensions": [
			"ots"
		]
	},
	"application/vnd.oasis.opendocument.text": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"odt"
		]
	},
	"application/vnd.oasis.opendocument.text-master": {
		"source": "iana",
		"extensions": [
			"odm"
		]
	},
	"application/vnd.oasis.opendocument.text-template": {
		"source": "iana",
		"extensions": [
			"ott"
		]
	},
	"application/vnd.oasis.opendocument.text-web": {
		"source": "iana",
		"extensions": [
			"oth"
		]
	},
	"application/vnd.obn": {
		"source": "iana"
	},
	"application/vnd.oftn.l10n+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.oipf.contentaccessdownload+xml": {
		"source": "iana"
	},
	"application/vnd.oipf.contentaccessstreaming+xml": {
		"source": "iana"
	},
	"application/vnd.oipf.cspg-hexbinary": {
		"source": "iana"
	},
	"application/vnd.oipf.dae.svg+xml": {
		"source": "iana"
	},
	"application/vnd.oipf.dae.xhtml+xml": {
		"source": "iana"
	},
	"application/vnd.oipf.mippvcontrolmessage+xml": {
		"source": "iana"
	},
	"application/vnd.oipf.pae.gem": {
		"source": "iana"
	},
	"application/vnd.oipf.spdiscovery+xml": {
		"source": "iana"
	},
	"application/vnd.oipf.spdlist+xml": {
		"source": "iana"
	},
	"application/vnd.oipf.ueprofile+xml": {
		"source": "iana"
	},
	"application/vnd.oipf.userprofile+xml": {
		"source": "iana"
	},
	"application/vnd.olpc-sugar": {
		"source": "iana",
		"extensions": [
			"xo"
		]
	},
	"application/vnd.oma-scws-config": {
		"source": "iana"
	},
	"application/vnd.oma-scws-http-request": {
		"source": "iana"
	},
	"application/vnd.oma-scws-http-response": {
		"source": "iana"
	},
	"application/vnd.oma.bcast.associated-procedure-parameter+xml": {
		"source": "iana"
	},
	"application/vnd.oma.bcast.drm-trigger+xml": {
		"source": "iana"
	},
	"application/vnd.oma.bcast.imd+xml": {
		"source": "iana"
	},
	"application/vnd.oma.bcast.ltkm": {
		"source": "iana"
	},
	"application/vnd.oma.bcast.notification+xml": {
		"source": "iana"
	},
	"application/vnd.oma.bcast.provisioningtrigger": {
		"source": "iana"
	},
	"application/vnd.oma.bcast.sgboot": {
		"source": "iana"
	},
	"application/vnd.oma.bcast.sgdd+xml": {
		"source": "iana"
	},
	"application/vnd.oma.bcast.sgdu": {
		"source": "iana"
	},
	"application/vnd.oma.bcast.simple-symbol-container": {
		"source": "iana"
	},
	"application/vnd.oma.bcast.smartcard-trigger+xml": {
		"source": "iana"
	},
	"application/vnd.oma.bcast.sprov+xml": {
		"source": "iana"
	},
	"application/vnd.oma.bcast.stkm": {
		"source": "iana"
	},
	"application/vnd.oma.cab-address-book+xml": {
		"source": "iana"
	},
	"application/vnd.oma.cab-feature-handler+xml": {
		"source": "iana"
	},
	"application/vnd.oma.cab-pcc+xml": {
		"source": "iana"
	},
	"application/vnd.oma.cab-subs-invite+xml": {
		"source": "iana"
	},
	"application/vnd.oma.cab-user-prefs+xml": {
		"source": "iana"
	},
	"application/vnd.oma.dcd": {
		"source": "iana"
	},
	"application/vnd.oma.dcdc": {
		"source": "iana"
	},
	"application/vnd.oma.dd2+xml": {
		"source": "iana",
		"extensions": [
			"dd2"
		]
	},
	"application/vnd.oma.drm.risd+xml": {
		"source": "iana"
	},
	"application/vnd.oma.group-usage-list+xml": {
		"source": "iana"
	},
	"application/vnd.oma.lwm2m+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.oma.lwm2m+tlv": {
		"source": "iana"
	},
	"application/vnd.oma.pal+xml": {
		"source": "iana"
	},
	"application/vnd.oma.poc.detailed-progress-report+xml": {
		"source": "iana"
	},
	"application/vnd.oma.poc.final-report+xml": {
		"source": "iana"
	},
	"application/vnd.oma.poc.groups+xml": {
		"source": "iana"
	},
	"application/vnd.oma.poc.invocation-descriptor+xml": {
		"source": "iana"
	},
	"application/vnd.oma.poc.optimized-progress-report+xml": {
		"source": "iana"
	},
	"application/vnd.oma.push": {
		"source": "iana"
	},
	"application/vnd.oma.scidm.messages+xml": {
		"source": "iana"
	},
	"application/vnd.oma.xcap-directory+xml": {
		"source": "iana"
	},
	"application/vnd.omads-email+xml": {
		"source": "iana"
	},
	"application/vnd.omads-file+xml": {
		"source": "iana"
	},
	"application/vnd.omads-folder+xml": {
		"source": "iana"
	},
	"application/vnd.omaloc-supl-init": {
		"source": "iana"
	},
	"application/vnd.onepager": {
		"source": "iana"
	},
	"application/vnd.openblox.game+xml": {
		"source": "iana"
	},
	"application/vnd.openblox.game-binary": {
		"source": "iana"
	},
	"application/vnd.openeye.oeb": {
		"source": "iana"
	},
	"application/vnd.openofficeorg.extension": {
		"source": "apache",
		"extensions": [
			"oxt"
		]
	},
	"application/vnd.openstreetmap.data+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.custom-properties+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.drawing+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.extended-properties+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.presentationml-template": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.presentationml.presentation": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"pptx"
		]
	},
	"application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.presentationml.slide": {
		"source": "iana",
		"extensions": [
			"sldx"
		]
	},
	"application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
		"source": "iana",
		"extensions": [
			"ppsx"
		]
	},
	"application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.presentationml.template": {
		"source": "apache",
		"extensions": [
			"potx"
		]
	},
	"application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml-template": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"xlsx"
		]
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
		"source": "apache",
		"extensions": [
			"xltx"
		]
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.theme+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.themeoverride+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.vmldrawing": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.wordprocessingml-template": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"docx"
		]
	},
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
		"source": "apache",
		"extensions": [
			"dotx"
		]
	},
	"application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-package.core-properties+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-package.relationships+xml": {
		"source": "iana"
	},
	"application/vnd.oracle.resource+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.orange.indata": {
		"source": "iana"
	},
	"application/vnd.osa.netdeploy": {
		"source": "iana"
	},
	"application/vnd.osgeo.mapguide.package": {
		"source": "iana",
		"extensions": [
			"mgp"
		]
	},
	"application/vnd.osgi.bundle": {
		"source": "iana"
	},
	"application/vnd.osgi.dp": {
		"source": "iana",
		"extensions": [
			"dp"
		]
	},
	"application/vnd.osgi.subsystem": {
		"source": "iana",
		"extensions": [
			"esa"
		]
	},
	"application/vnd.otps.ct-kip+xml": {
		"source": "iana"
	},
	"application/vnd.oxli.countgraph": {
		"source": "iana"
	},
	"application/vnd.pagerduty+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.palm": {
		"source": "iana",
		"extensions": [
			"pdb",
			"pqa",
			"oprc"
		]
	},
	"application/vnd.panoply": {
		"source": "iana"
	},
	"application/vnd.paos+xml": {
		"source": "iana"
	},
	"application/vnd.paos.xml": {
		"source": "apache"
	},
	"application/vnd.pawaafile": {
		"source": "iana",
		"extensions": [
			"paw"
		]
	},
	"application/vnd.pcos": {
		"source": "iana"
	},
	"application/vnd.pg.format": {
		"source": "iana",
		"extensions": [
			"str"
		]
	},
	"application/vnd.pg.osasli": {
		"source": "iana",
		"extensions": [
			"ei6"
		]
	},
	"application/vnd.piaccess.application-licence": {
		"source": "iana"
	},
	"application/vnd.picsel": {
		"source": "iana",
		"extensions": [
			"efif"
		]
	},
	"application/vnd.pmi.widget": {
		"source": "iana",
		"extensions": [
			"wg"
		]
	},
	"application/vnd.poc.group-advertisement+xml": {
		"source": "iana"
	},
	"application/vnd.pocketlearn": {
		"source": "iana",
		"extensions": [
			"plf"
		]
	},
	"application/vnd.powerbuilder6": {
		"source": "iana",
		"extensions": [
			"pbd"
		]
	},
	"application/vnd.powerbuilder6-s": {
		"source": "iana"
	},
	"application/vnd.powerbuilder7": {
		"source": "iana"
	},
	"application/vnd.powerbuilder7-s": {
		"source": "iana"
	},
	"application/vnd.powerbuilder75": {
		"source": "iana"
	},
	"application/vnd.powerbuilder75-s": {
		"source": "iana"
	},
	"application/vnd.preminet": {
		"source": "iana"
	},
	"application/vnd.previewsystems.box": {
		"source": "iana",
		"extensions": [
			"box"
		]
	},
	"application/vnd.proteus.magazine": {
		"source": "iana",
		"extensions": [
			"mgz"
		]
	},
	"application/vnd.publishare-delta-tree": {
		"source": "iana",
		"extensions": [
			"qps"
		]
	},
	"application/vnd.pvi.ptid1": {
		"source": "iana",
		"extensions": [
			"ptid"
		]
	},
	"application/vnd.pwg-multiplexed": {
		"source": "iana"
	},
	"application/vnd.pwg-xhtml-print+xml": {
		"source": "iana"
	},
	"application/vnd.qualcomm.brew-app-res": {
		"source": "iana"
	},
	"application/vnd.quarantainenet": {
		"source": "iana"
	},
	"application/vnd.quark.quarkxpress": {
		"source": "iana",
		"extensions": [
			"qxd",
			"qxt",
			"qwd",
			"qwt",
			"qxl",
			"qxb"
		]
	},
	"application/vnd.quobject-quoxdocument": {
		"source": "iana"
	},
	"application/vnd.radisys.moml+xml": {
		"source": "iana"
	},
	"application/vnd.radisys.msml+xml": {
		"source": "iana"
	},
	"application/vnd.radisys.msml-audit+xml": {
		"source": "iana"
	},
	"application/vnd.radisys.msml-audit-conf+xml": {
		"source": "iana"
	},
	"application/vnd.radisys.msml-audit-conn+xml": {
		"source": "iana"
	},
	"application/vnd.radisys.msml-audit-dialog+xml": {
		"source": "iana"
	},
	"application/vnd.radisys.msml-audit-stream+xml": {
		"source": "iana"
	},
	"application/vnd.radisys.msml-conf+xml": {
		"source": "iana"
	},
	"application/vnd.radisys.msml-dialog+xml": {
		"source": "iana"
	},
	"application/vnd.radisys.msml-dialog-base+xml": {
		"source": "iana"
	},
	"application/vnd.radisys.msml-dialog-fax-detect+xml": {
		"source": "iana"
	},
	"application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
		"source": "iana"
	},
	"application/vnd.radisys.msml-dialog-group+xml": {
		"source": "iana"
	},
	"application/vnd.radisys.msml-dialog-speech+xml": {
		"source": "iana"
	},
	"application/vnd.radisys.msml-dialog-transform+xml": {
		"source": "iana"
	},
	"application/vnd.rainstor.data": {
		"source": "iana"
	},
	"application/vnd.rapid": {
		"source": "iana"
	},
	"application/vnd.rar": {
		"source": "iana"
	},
	"application/vnd.realvnc.bed": {
		"source": "iana",
		"extensions": [
			"bed"
		]
	},
	"application/vnd.recordare.musicxml": {
		"source": "iana",
		"extensions": [
			"mxl"
		]
	},
	"application/vnd.recordare.musicxml+xml": {
		"source": "iana",
		"extensions": [
			"musicxml"
		]
	},
	"application/vnd.renlearn.rlprint": {
		"source": "iana"
	},
	"application/vnd.rig.cryptonote": {
		"source": "iana",
		"extensions": [
			"cryptonote"
		]
	},
	"application/vnd.rim.cod": {
		"source": "apache",
		"extensions": [
			"cod"
		]
	},
	"application/vnd.rn-realmedia": {
		"source": "apache",
		"extensions": [
			"rm"
		]
	},
	"application/vnd.rn-realmedia-vbr": {
		"source": "apache",
		"extensions": [
			"rmvb"
		]
	},
	"application/vnd.route66.link66+xml": {
		"source": "iana",
		"extensions": [
			"link66"
		]
	},
	"application/vnd.rs-274x": {
		"source": "iana"
	},
	"application/vnd.ruckus.download": {
		"source": "iana"
	},
	"application/vnd.s3sms": {
		"source": "iana"
	},
	"application/vnd.sailingtracker.track": {
		"source": "iana",
		"extensions": [
			"st"
		]
	},
	"application/vnd.sbm.cid": {
		"source": "iana"
	},
	"application/vnd.sbm.mid2": {
		"source": "iana"
	},
	"application/vnd.scribus": {
		"source": "iana"
	},
	"application/vnd.sealed.3df": {
		"source": "iana"
	},
	"application/vnd.sealed.csf": {
		"source": "iana"
	},
	"application/vnd.sealed.doc": {
		"source": "iana"
	},
	"application/vnd.sealed.eml": {
		"source": "iana"
	},
	"application/vnd.sealed.mht": {
		"source": "iana"
	},
	"application/vnd.sealed.net": {
		"source": "iana"
	},
	"application/vnd.sealed.ppt": {
		"source": "iana"
	},
	"application/vnd.sealed.tiff": {
		"source": "iana"
	},
	"application/vnd.sealed.xls": {
		"source": "iana"
	},
	"application/vnd.sealedmedia.softseal.html": {
		"source": "iana"
	},
	"application/vnd.sealedmedia.softseal.pdf": {
		"source": "iana"
	},
	"application/vnd.seemail": {
		"source": "iana",
		"extensions": [
			"see"
		]
	},
	"application/vnd.sema": {
		"source": "iana",
		"extensions": [
			"sema"
		]
	},
	"application/vnd.semd": {
		"source": "iana",
		"extensions": [
			"semd"
		]
	},
	"application/vnd.semf": {
		"source": "iana",
		"extensions": [
			"semf"
		]
	},
	"application/vnd.shana.informed.formdata": {
		"source": "iana",
		"extensions": [
			"ifm"
		]
	},
	"application/vnd.shana.informed.formtemplate": {
		"source": "iana",
		"extensions": [
			"itp"
		]
	},
	"application/vnd.shana.informed.interchange": {
		"source": "iana",
		"extensions": [
			"iif"
		]
	},
	"application/vnd.shana.informed.package": {
		"source": "iana",
		"extensions": [
			"ipk"
		]
	},
	"application/vnd.simtech-mindmapper": {
		"source": "iana",
		"extensions": [
			"twd",
			"twds"
		]
	},
	"application/vnd.siren+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.smaf": {
		"source": "iana",
		"extensions": [
			"mmf"
		]
	},
	"application/vnd.smart.notebook": {
		"source": "iana"
	},
	"application/vnd.smart.teacher": {
		"source": "iana",
		"extensions": [
			"teacher"
		]
	},
	"application/vnd.software602.filler.form+xml": {
		"source": "iana"
	},
	"application/vnd.software602.filler.form-xml-zip": {
		"source": "iana"
	},
	"application/vnd.solent.sdkm+xml": {
		"source": "iana",
		"extensions": [
			"sdkm",
			"sdkd"
		]
	},
	"application/vnd.spotfire.dxp": {
		"source": "iana",
		"extensions": [
			"dxp"
		]
	},
	"application/vnd.spotfire.sfs": {
		"source": "iana",
		"extensions": [
			"sfs"
		]
	},
	"application/vnd.sss-cod": {
		"source": "iana"
	},
	"application/vnd.sss-dtf": {
		"source": "iana"
	},
	"application/vnd.sss-ntf": {
		"source": "iana"
	},
	"application/vnd.stardivision.calc": {
		"source": "apache",
		"extensions": [
			"sdc"
		]
	},
	"application/vnd.stardivision.draw": {
		"source": "apache",
		"extensions": [
			"sda"
		]
	},
	"application/vnd.stardivision.impress": {
		"source": "apache",
		"extensions": [
			"sdd"
		]
	},
	"application/vnd.stardivision.math": {
		"source": "apache",
		"extensions": [
			"smf"
		]
	},
	"application/vnd.stardivision.writer": {
		"source": "apache",
		"extensions": [
			"sdw",
			"vor"
		]
	},
	"application/vnd.stardivision.writer-global": {
		"source": "apache",
		"extensions": [
			"sgl"
		]
	},
	"application/vnd.stepmania.package": {
		"source": "iana",
		"extensions": [
			"smzip"
		]
	},
	"application/vnd.stepmania.stepchart": {
		"source": "iana",
		"extensions": [
			"sm"
		]
	},
	"application/vnd.street-stream": {
		"source": "iana"
	},
	"application/vnd.sun.wadl+xml": {
		"source": "iana"
	},
	"application/vnd.sun.xml.calc": {
		"source": "apache",
		"extensions": [
			"sxc"
		]
	},
	"application/vnd.sun.xml.calc.template": {
		"source": "apache",
		"extensions": [
			"stc"
		]
	},
	"application/vnd.sun.xml.draw": {
		"source": "apache",
		"extensions": [
			"sxd"
		]
	},
	"application/vnd.sun.xml.draw.template": {
		"source": "apache",
		"extensions": [
			"std"
		]
	},
	"application/vnd.sun.xml.impress": {
		"source": "apache",
		"extensions": [
			"sxi"
		]
	},
	"application/vnd.sun.xml.impress.template": {
		"source": "apache",
		"extensions": [
			"sti"
		]
	},
	"application/vnd.sun.xml.math": {
		"source": "apache",
		"extensions": [
			"sxm"
		]
	},
	"application/vnd.sun.xml.writer": {
		"source": "apache",
		"extensions": [
			"sxw"
		]
	},
	"application/vnd.sun.xml.writer.global": {
		"source": "apache",
		"extensions": [
			"sxg"
		]
	},
	"application/vnd.sun.xml.writer.template": {
		"source": "apache",
		"extensions": [
			"stw"
		]
	},
	"application/vnd.sus-calendar": {
		"source": "iana",
		"extensions": [
			"sus",
			"susp"
		]
	},
	"application/vnd.svd": {
		"source": "iana",
		"extensions": [
			"svd"
		]
	},
	"application/vnd.swiftview-ics": {
		"source": "iana"
	},
	"application/vnd.symbian.install": {
		"source": "apache",
		"extensions": [
			"sis",
			"sisx"
		]
	},
	"application/vnd.syncml+xml": {
		"source": "iana",
		"extensions": [
			"xsm"
		]
	},
	"application/vnd.syncml.dm+wbxml": {
		"source": "iana",
		"extensions": [
			"bdm"
		]
	},
	"application/vnd.syncml.dm+xml": {
		"source": "iana",
		"extensions": [
			"xdm"
		]
	},
	"application/vnd.syncml.dm.notification": {
		"source": "iana"
	},
	"application/vnd.syncml.dmddf+wbxml": {
		"source": "iana"
	},
	"application/vnd.syncml.dmddf+xml": {
		"source": "iana"
	},
	"application/vnd.syncml.dmtnds+wbxml": {
		"source": "iana"
	},
	"application/vnd.syncml.dmtnds+xml": {
		"source": "iana"
	},
	"application/vnd.syncml.ds.notification": {
		"source": "iana"
	},
	"application/vnd.tableschema+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.tao.intent-module-archive": {
		"source": "iana",
		"extensions": [
			"tao"
		]
	},
	"application/vnd.tcpdump.pcap": {
		"source": "iana",
		"extensions": [
			"pcap",
			"cap",
			"dmp"
		]
	},
	"application/vnd.tmd.mediaflex.api+xml": {
		"source": "iana"
	},
	"application/vnd.tml": {
		"source": "iana"
	},
	"application/vnd.tmobile-livetv": {
		"source": "iana",
		"extensions": [
			"tmo"
		]
	},
	"application/vnd.tri.onesource": {
		"source": "iana"
	},
	"application/vnd.trid.tpt": {
		"source": "iana",
		"extensions": [
			"tpt"
		]
	},
	"application/vnd.triscape.mxs": {
		"source": "iana",
		"extensions": [
			"mxs"
		]
	},
	"application/vnd.trueapp": {
		"source": "iana",
		"extensions": [
			"tra"
		]
	},
	"application/vnd.truedoc": {
		"source": "iana"
	},
	"application/vnd.ubisoft.webplayer": {
		"source": "iana"
	},
	"application/vnd.ufdl": {
		"source": "iana",
		"extensions": [
			"ufd",
			"ufdl"
		]
	},
	"application/vnd.uiq.theme": {
		"source": "iana",
		"extensions": [
			"utz"
		]
	},
	"application/vnd.umajin": {
		"source": "iana",
		"extensions": [
			"umj"
		]
	},
	"application/vnd.unity": {
		"source": "iana",
		"extensions": [
			"unityweb"
		]
	},
	"application/vnd.uoml+xml": {
		"source": "iana",
		"extensions": [
			"uoml"
		]
	},
	"application/vnd.uplanet.alert": {
		"source": "iana"
	},
	"application/vnd.uplanet.alert-wbxml": {
		"source": "iana"
	},
	"application/vnd.uplanet.bearer-choice": {
		"source": "iana"
	},
	"application/vnd.uplanet.bearer-choice-wbxml": {
		"source": "iana"
	},
	"application/vnd.uplanet.cacheop": {
		"source": "iana"
	},
	"application/vnd.uplanet.cacheop-wbxml": {
		"source": "iana"
	},
	"application/vnd.uplanet.channel": {
		"source": "iana"
	},
	"application/vnd.uplanet.channel-wbxml": {
		"source": "iana"
	},
	"application/vnd.uplanet.list": {
		"source": "iana"
	},
	"application/vnd.uplanet.list-wbxml": {
		"source": "iana"
	},
	"application/vnd.uplanet.listcmd": {
		"source": "iana"
	},
	"application/vnd.uplanet.listcmd-wbxml": {
		"source": "iana"
	},
	"application/vnd.uplanet.signal": {
		"source": "iana"
	},
	"application/vnd.uri-map": {
		"source": "iana"
	},
	"application/vnd.valve.source.material": {
		"source": "iana"
	},
	"application/vnd.vcx": {
		"source": "iana",
		"extensions": [
			"vcx"
		]
	},
	"application/vnd.vd-study": {
		"source": "iana"
	},
	"application/vnd.vectorworks": {
		"source": "iana"
	},
	"application/vnd.vel+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.verimatrix.vcas": {
		"source": "iana"
	},
	"application/vnd.vidsoft.vidconference": {
		"source": "iana"
	},
	"application/vnd.visio": {
		"source": "iana",
		"extensions": [
			"vsd",
			"vst",
			"vss",
			"vsw"
		]
	},
	"application/vnd.visionary": {
		"source": "iana",
		"extensions": [
			"vis"
		]
	},
	"application/vnd.vividence.scriptfile": {
		"source": "iana"
	},
	"application/vnd.vsf": {
		"source": "iana",
		"extensions": [
			"vsf"
		]
	},
	"application/vnd.wap.sic": {
		"source": "iana"
	},
	"application/vnd.wap.slc": {
		"source": "iana"
	},
	"application/vnd.wap.wbxml": {
		"source": "iana",
		"extensions": [
			"wbxml"
		]
	},
	"application/vnd.wap.wmlc": {
		"source": "iana",
		"extensions": [
			"wmlc"
		]
	},
	"application/vnd.wap.wmlscriptc": {
		"source": "iana",
		"extensions": [
			"wmlsc"
		]
	},
	"application/vnd.webturbo": {
		"source": "iana",
		"extensions": [
			"wtb"
		]
	},
	"application/vnd.wfa.p2p": {
		"source": "iana"
	},
	"application/vnd.wfa.wsc": {
		"source": "iana"
	},
	"application/vnd.windows.devicepairing": {
		"source": "iana"
	},
	"application/vnd.wmc": {
		"source": "iana"
	},
	"application/vnd.wmf.bootstrap": {
		"source": "iana"
	},
	"application/vnd.wolfram.mathematica": {
		"source": "iana"
	},
	"application/vnd.wolfram.mathematica.package": {
		"source": "iana"
	},
	"application/vnd.wolfram.player": {
		"source": "iana",
		"extensions": [
			"nbp"
		]
	},
	"application/vnd.wordperfect": {
		"source": "iana",
		"extensions": [
			"wpd"
		]
	},
	"application/vnd.wqd": {
		"source": "iana",
		"extensions": [
			"wqd"
		]
	},
	"application/vnd.wrq-hp3000-labelled": {
		"source": "iana"
	},
	"application/vnd.wt.stf": {
		"source": "iana",
		"extensions": [
			"stf"
		]
	},
	"application/vnd.wv.csp+wbxml": {
		"source": "iana"
	},
	"application/vnd.wv.csp+xml": {
		"source": "iana"
	},
	"application/vnd.wv.ssp+xml": {
		"source": "iana"
	},
	"application/vnd.xacml+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.xara": {
		"source": "iana",
		"extensions": [
			"xar"
		]
	},
	"application/vnd.xfdl": {
		"source": "iana",
		"extensions": [
			"xfdl"
		]
	},
	"application/vnd.xfdl.webform": {
		"source": "iana"
	},
	"application/vnd.xmi+xml": {
		"source": "iana"
	},
	"application/vnd.xmpie.cpkg": {
		"source": "iana"
	},
	"application/vnd.xmpie.dpkg": {
		"source": "iana"
	},
	"application/vnd.xmpie.plan": {
		"source": "iana"
	},
	"application/vnd.xmpie.ppkg": {
		"source": "iana"
	},
	"application/vnd.xmpie.xlim": {
		"source": "iana"
	},
	"application/vnd.yamaha.hv-dic": {
		"source": "iana",
		"extensions": [
			"hvd"
		]
	},
	"application/vnd.yamaha.hv-script": {
		"source": "iana",
		"extensions": [
			"hvs"
		]
	},
	"application/vnd.yamaha.hv-voice": {
		"source": "iana",
		"extensions": [
			"hvp"
		]
	},
	"application/vnd.yamaha.openscoreformat": {
		"source": "iana",
		"extensions": [
			"osf"
		]
	},
	"application/vnd.yamaha.openscoreformat.osfpvg+xml": {
		"source": "iana",
		"extensions": [
			"osfpvg"
		]
	},
	"application/vnd.yamaha.remote-setup": {
		"source": "iana"
	},
	"application/vnd.yamaha.smaf-audio": {
		"source": "iana",
		"extensions": [
			"saf"
		]
	},
	"application/vnd.yamaha.smaf-phrase": {
		"source": "iana",
		"extensions": [
			"spf"
		]
	},
	"application/vnd.yamaha.through-ngn": {
		"source": "iana"
	},
	"application/vnd.yamaha.tunnel-udpencap": {
		"source": "iana"
	},
	"application/vnd.yaoweme": {
		"source": "iana"
	},
	"application/vnd.yellowriver-custom-menu": {
		"source": "iana",
		"extensions": [
			"cmp"
		]
	},
	"application/vnd.zul": {
		"source": "iana",
		"extensions": [
			"zir",
			"zirz"
		]
	},
	"application/vnd.zzazz.deck+xml": {
		"source": "iana",
		"extensions": [
			"zaz"
		]
	},
	"application/voicexml+xml": {
		"source": "iana",
		"extensions": [
			"vxml"
		]
	},
	"application/vq-rtcpxr": {
		"source": "iana"
	},
	"application/watcherinfo+xml": {
		"source": "iana"
	},
	"application/whoispp-query": {
		"source": "iana"
	},
	"application/whoispp-response": {
		"source": "iana"
	},
	"application/widget": {
		"source": "iana",
		"extensions": [
			"wgt"
		]
	},
	"application/winhlp": {
		"source": "apache",
		"extensions": [
			"hlp"
		]
	},
	"application/wita": {
		"source": "iana"
	},
	"application/wordperfect5.1": {
		"source": "iana"
	},
	"application/wsdl+xml": {
		"source": "iana",
		"extensions": [
			"wsdl"
		]
	},
	"application/wspolicy+xml": {
		"source": "iana",
		"extensions": [
			"wspolicy"
		]
	},
	"application/x-7z-compressed": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"7z"
		]
	},
	"application/x-abiword": {
		"source": "apache",
		"extensions": [
			"abw"
		]
	},
	"application/x-ace-compressed": {
		"source": "apache",
		"extensions": [
			"ace"
		]
	},
	"application/x-amf": {
		"source": "apache"
	},
	"application/x-apple-diskimage": {
		"source": "apache",
		"extensions": [
			"dmg"
		]
	},
	"application/x-authorware-bin": {
		"source": "apache",
		"extensions": [
			"aab",
			"x32",
			"u32",
			"vox"
		]
	},
	"application/x-authorware-map": {
		"source": "apache",
		"extensions": [
			"aam"
		]
	},
	"application/x-authorware-seg": {
		"source": "apache",
		"extensions": [
			"aas"
		]
	},
	"application/x-bcpio": {
		"source": "apache",
		"extensions": [
			"bcpio"
		]
	},
	"application/x-bdoc": {
		"compressible": false,
		"extensions": [
			"bdoc"
		]
	},
	"application/x-bittorrent": {
		"source": "apache",
		"extensions": [
			"torrent"
		]
	},
	"application/x-blorb": {
		"source": "apache",
		"extensions": [
			"blb",
			"blorb"
		]
	},
	"application/x-bzip": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"bz"
		]
	},
	"application/x-bzip2": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"bz2",
			"boz"
		]
	},
	"application/x-cbr": {
		"source": "apache",
		"extensions": [
			"cbr",
			"cba",
			"cbt",
			"cbz",
			"cb7"
		]
	},
	"application/x-cdlink": {
		"source": "apache",
		"extensions": [
			"vcd"
		]
	},
	"application/x-cfs-compressed": {
		"source": "apache",
		"extensions": [
			"cfs"
		]
	},
	"application/x-chat": {
		"source": "apache",
		"extensions": [
			"chat"
		]
	},
	"application/x-chess-pgn": {
		"source": "apache",
		"extensions": [
			"pgn"
		]
	},
	"application/x-chrome-extension": {
		"extensions": [
			"crx"
		]
	},
	"application/x-cocoa": {
		"source": "nginx",
		"extensions": [
			"cco"
		]
	},
	"application/x-compress": {
		"source": "apache"
	},
	"application/x-conference": {
		"source": "apache",
		"extensions": [
			"nsc"
		]
	},
	"application/x-cpio": {
		"source": "apache",
		"extensions": [
			"cpio"
		]
	},
	"application/x-csh": {
		"source": "apache",
		"extensions": [
			"csh"
		]
	},
	"application/x-deb": {
		"compressible": false
	},
	"application/x-debian-package": {
		"source": "apache",
		"extensions": [
			"deb",
			"udeb"
		]
	},
	"application/x-dgc-compressed": {
		"source": "apache",
		"extensions": [
			"dgc"
		]
	},
	"application/x-director": {
		"source": "apache",
		"extensions": [
			"dir",
			"dcr",
			"dxr",
			"cst",
			"cct",
			"cxt",
			"w3d",
			"fgd",
			"swa"
		]
	},
	"application/x-doom": {
		"source": "apache",
		"extensions": [
			"wad"
		]
	},
	"application/x-dtbncx+xml": {
		"source": "apache",
		"extensions": [
			"ncx"
		]
	},
	"application/x-dtbook+xml": {
		"source": "apache",
		"extensions": [
			"dtb"
		]
	},
	"application/x-dtbresource+xml": {
		"source": "apache",
		"extensions": [
			"res"
		]
	},
	"application/x-dvi": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"dvi"
		]
	},
	"application/x-envoy": {
		"source": "apache",
		"extensions": [
			"evy"
		]
	},
	"application/x-eva": {
		"source": "apache",
		"extensions": [
			"eva"
		]
	},
	"application/x-font-bdf": {
		"source": "apache",
		"extensions": [
			"bdf"
		]
	},
	"application/x-font-dos": {
		"source": "apache"
	},
	"application/x-font-framemaker": {
		"source": "apache"
	},
	"application/x-font-ghostscript": {
		"source": "apache",
		"extensions": [
			"gsf"
		]
	},
	"application/x-font-libgrx": {
		"source": "apache"
	},
	"application/x-font-linux-psf": {
		"source": "apache",
		"extensions": [
			"psf"
		]
	},
	"application/x-font-otf": {
		"source": "apache",
		"compressible": true,
		"extensions": [
			"otf"
		]
	},
	"application/x-font-pcf": {
		"source": "apache",
		"extensions": [
			"pcf"
		]
	},
	"application/x-font-snf": {
		"source": "apache",
		"extensions": [
			"snf"
		]
	},
	"application/x-font-speedo": {
		"source": "apache"
	},
	"application/x-font-sunos-news": {
		"source": "apache"
	},
	"application/x-font-ttf": {
		"source": "apache",
		"compressible": true,
		"extensions": [
			"ttf",
			"ttc"
		]
	},
	"application/x-font-type1": {
		"source": "apache",
		"extensions": [
			"pfa",
			"pfb",
			"pfm",
			"afm"
		]
	},
	"application/x-font-vfont": {
		"source": "apache"
	},
	"application/x-freearc": {
		"source": "apache",
		"extensions": [
			"arc"
		]
	},
	"application/x-futuresplash": {
		"source": "apache",
		"extensions": [
			"spl"
		]
	},
	"application/x-gca-compressed": {
		"source": "apache",
		"extensions": [
			"gca"
		]
	},
	"application/x-glulx": {
		"source": "apache",
		"extensions": [
			"ulx"
		]
	},
	"application/x-gnumeric": {
		"source": "apache",
		"extensions": [
			"gnumeric"
		]
	},
	"application/x-gramps-xml": {
		"source": "apache",
		"extensions": [
			"gramps"
		]
	},
	"application/x-gtar": {
		"source": "apache",
		"extensions": [
			"gtar"
		]
	},
	"application/x-gzip": {
		"source": "apache"
	},
	"application/x-hdf": {
		"source": "apache",
		"extensions": [
			"hdf"
		]
	},
	"application/x-httpd-php": {
		"compressible": true,
		"extensions": [
			"php"
		]
	},
	"application/x-install-instructions": {
		"source": "apache",
		"extensions": [
			"install"
		]
	},
	"application/x-iso9660-image": {
		"source": "apache",
		"extensions": [
			"iso"
		]
	},
	"application/x-java-archive-diff": {
		"source": "nginx",
		"extensions": [
			"jardiff"
		]
	},
	"application/x-java-jnlp-file": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"jnlp"
		]
	},
	"application/x-javascript": {
		"compressible": true
	},
	"application/x-latex": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"latex"
		]
	},
	"application/x-lua-bytecode": {
		"extensions": [
			"luac"
		]
	},
	"application/x-lzh-compressed": {
		"source": "apache",
		"extensions": [
			"lzh",
			"lha"
		]
	},
	"application/x-makeself": {
		"source": "nginx",
		"extensions": [
			"run"
		]
	},
	"application/x-mie": {
		"source": "apache",
		"extensions": [
			"mie"
		]
	},
	"application/x-mobipocket-ebook": {
		"source": "apache",
		"extensions": [
			"prc",
			"mobi"
		]
	},
	"application/x-mpegurl": {
		"compressible": false
	},
	"application/x-ms-application": {
		"source": "apache",
		"extensions": [
			"application"
		]
	},
	"application/x-ms-shortcut": {
		"source": "apache",
		"extensions": [
			"lnk"
		]
	},
	"application/x-ms-wmd": {
		"source": "apache",
		"extensions": [
			"wmd"
		]
	},
	"application/x-ms-wmz": {
		"source": "apache",
		"extensions": [
			"wmz"
		]
	},
	"application/x-ms-xbap": {
		"source": "apache",
		"extensions": [
			"xbap"
		]
	},
	"application/x-msaccess": {
		"source": "apache",
		"extensions": [
			"mdb"
		]
	},
	"application/x-msbinder": {
		"source": "apache",
		"extensions": [
			"obd"
		]
	},
	"application/x-mscardfile": {
		"source": "apache",
		"extensions": [
			"crd"
		]
	},
	"application/x-msclip": {
		"source": "apache",
		"extensions": [
			"clp"
		]
	},
	"application/x-msdos-program": {
		"extensions": [
			"exe"
		]
	},
	"application/x-msdownload": {
		"source": "apache",
		"extensions": [
			"exe",
			"dll",
			"com",
			"bat",
			"msi"
		]
	},
	"application/x-msmediaview": {
		"source": "apache",
		"extensions": [
			"mvb",
			"m13",
			"m14"
		]
	},
	"application/x-msmetafile": {
		"source": "apache",
		"extensions": [
			"wmf",
			"wmz",
			"emf",
			"emz"
		]
	},
	"application/x-msmoney": {
		"source": "apache",
		"extensions": [
			"mny"
		]
	},
	"application/x-mspublisher": {
		"source": "apache",
		"extensions": [
			"pub"
		]
	},
	"application/x-msschedule": {
		"source": "apache",
		"extensions": [
			"scd"
		]
	},
	"application/x-msterminal": {
		"source": "apache",
		"extensions": [
			"trm"
		]
	},
	"application/x-mswrite": {
		"source": "apache",
		"extensions": [
			"wri"
		]
	},
	"application/x-netcdf": {
		"source": "apache",
		"extensions": [
			"nc",
			"cdf"
		]
	},
	"application/x-ns-proxy-autoconfig": {
		"compressible": true,
		"extensions": [
			"pac"
		]
	},
	"application/x-nzb": {
		"source": "apache",
		"extensions": [
			"nzb"
		]
	},
	"application/x-perl": {
		"source": "nginx",
		"extensions": [
			"pl",
			"pm"
		]
	},
	"application/x-pilot": {
		"source": "nginx",
		"extensions": [
			"prc",
			"pdb"
		]
	},
	"application/x-pkcs12": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"p12",
			"pfx"
		]
	},
	"application/x-pkcs7-certificates": {
		"source": "apache",
		"extensions": [
			"p7b",
			"spc"
		]
	},
	"application/x-pkcs7-certreqresp": {
		"source": "apache",
		"extensions": [
			"p7r"
		]
	},
	"application/x-rar-compressed": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"rar"
		]
	},
	"application/x-redhat-package-manager": {
		"source": "nginx",
		"extensions": [
			"rpm"
		]
	},
	"application/x-research-info-systems": {
		"source": "apache",
		"extensions": [
			"ris"
		]
	},
	"application/x-sea": {
		"source": "nginx",
		"extensions": [
			"sea"
		]
	},
	"application/x-sh": {
		"source": "apache",
		"compressible": true,
		"extensions": [
			"sh"
		]
	},
	"application/x-shar": {
		"source": "apache",
		"extensions": [
			"shar"
		]
	},
	"application/x-shockwave-flash": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"swf"
		]
	},
	"application/x-silverlight-app": {
		"source": "apache",
		"extensions": [
			"xap"
		]
	},
	"application/x-sql": {
		"source": "apache",
		"extensions": [
			"sql"
		]
	},
	"application/x-stuffit": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"sit"
		]
	},
	"application/x-stuffitx": {
		"source": "apache",
		"extensions": [
			"sitx"
		]
	},
	"application/x-subrip": {
		"source": "apache",
		"extensions": [
			"srt"
		]
	},
	"application/x-sv4cpio": {
		"source": "apache",
		"extensions": [
			"sv4cpio"
		]
	},
	"application/x-sv4crc": {
		"source": "apache",
		"extensions": [
			"sv4crc"
		]
	},
	"application/x-t3vm-image": {
		"source": "apache",
		"extensions": [
			"t3"
		]
	},
	"application/x-tads": {
		"source": "apache",
		"extensions": [
			"gam"
		]
	},
	"application/x-tar": {
		"source": "apache",
		"compressible": true,
		"extensions": [
			"tar"
		]
	},
	"application/x-tcl": {
		"source": "apache",
		"extensions": [
			"tcl",
			"tk"
		]
	},
	"application/x-tex": {
		"source": "apache",
		"extensions": [
			"tex"
		]
	},
	"application/x-tex-tfm": {
		"source": "apache",
		"extensions": [
			"tfm"
		]
	},
	"application/x-texinfo": {
		"source": "apache",
		"extensions": [
			"texinfo",
			"texi"
		]
	},
	"application/x-tgif": {
		"source": "apache",
		"extensions": [
			"obj"
		]
	},
	"application/x-ustar": {
		"source": "apache",
		"extensions": [
			"ustar"
		]
	},
	"application/x-wais-source": {
		"source": "apache",
		"extensions": [
			"src"
		]
	},
	"application/x-web-app-manifest+json": {
		"compressible": true,
		"extensions": [
			"webapp"
		]
	},
	"application/x-www-form-urlencoded": {
		"source": "iana",
		"compressible": true
	},
	"application/x-x509-ca-cert": {
		"source": "apache",
		"extensions": [
			"der",
			"crt",
			"pem"
		]
	},
	"application/x-xfig": {
		"source": "apache",
		"extensions": [
			"fig"
		]
	},
	"application/x-xliff+xml": {
		"source": "apache",
		"extensions": [
			"xlf"
		]
	},
	"application/x-xpinstall": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"xpi"
		]
	},
	"application/x-xz": {
		"source": "apache",
		"extensions": [
			"xz"
		]
	},
	"application/x-zmachine": {
		"source": "apache",
		"extensions": [
			"z1",
			"z2",
			"z3",
			"z4",
			"z5",
			"z6",
			"z7",
			"z8"
		]
	},
	"application/x400-bp": {
		"source": "iana"
	},
	"application/xacml+xml": {
		"source": "iana"
	},
	"application/xaml+xml": {
		"source": "apache",
		"extensions": [
			"xaml"
		]
	},
	"application/xcap-att+xml": {
		"source": "iana"
	},
	"application/xcap-caps+xml": {
		"source": "iana"
	},
	"application/xcap-diff+xml": {
		"source": "iana",
		"extensions": [
			"xdf"
		]
	},
	"application/xcap-el+xml": {
		"source": "iana"
	},
	"application/xcap-error+xml": {
		"source": "iana"
	},
	"application/xcap-ns+xml": {
		"source": "iana"
	},
	"application/xcon-conference-info+xml": {
		"source": "iana"
	},
	"application/xcon-conference-info-diff+xml": {
		"source": "iana"
	},
	"application/xenc+xml": {
		"source": "iana",
		"extensions": [
			"xenc"
		]
	},
	"application/xhtml+xml": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"xhtml",
			"xht"
		]
	},
	"application/xhtml-voice+xml": {
		"source": "apache"
	},
	"application/xml": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"xml",
			"xsl",
			"xsd",
			"rng"
		]
	},
	"application/xml-dtd": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"dtd"
		]
	},
	"application/xml-external-parsed-entity": {
		"source": "iana"
	},
	"application/xml-patch+xml": {
		"source": "iana"
	},
	"application/xmpp+xml": {
		"source": "iana"
	},
	"application/xop+xml": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"xop"
		]
	},
	"application/xproc+xml": {
		"source": "apache",
		"extensions": [
			"xpl"
		]
	},
	"application/xslt+xml": {
		"source": "iana",
		"extensions": [
			"xslt"
		]
	},
	"application/xspf+xml": {
		"source": "apache",
		"extensions": [
			"xspf"
		]
	},
	"application/xv+xml": {
		"source": "iana",
		"extensions": [
			"mxml",
			"xhvml",
			"xvml",
			"xvm"
		]
	},
	"application/yang": {
		"source": "iana",
		"extensions": [
			"yang"
		]
	},
	"application/yang-data+json": {
		"source": "iana",
		"compressible": true
	},
	"application/yang-data+xml": {
		"source": "iana"
	},
	"application/yang-patch+json": {
		"source": "iana",
		"compressible": true
	},
	"application/yang-patch+xml": {
		"source": "iana"
	},
	"application/yin+xml": {
		"source": "iana",
		"extensions": [
			"yin"
		]
	},
	"application/zip": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"zip"
		]
	},
	"application/zlib": {
		"source": "iana"
	},
	"audio/1d-interleaved-parityfec": {
		"source": "iana"
	},
	"audio/32kadpcm": {
		"source": "iana"
	},
	"audio/3gpp": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"3gpp"
		]
	},
	"audio/3gpp2": {
		"source": "iana"
	},
	"audio/ac3": {
		"source": "iana"
	},
	"audio/adpcm": {
		"source": "apache",
		"extensions": [
			"adp"
		]
	},
	"audio/amr": {
		"source": "iana"
	},
	"audio/amr-wb": {
		"source": "iana"
	},
	"audio/amr-wb+": {
		"source": "iana"
	},
	"audio/aptx": {
		"source": "iana"
	},
	"audio/asc": {
		"source": "iana"
	},
	"audio/atrac-advanced-lossless": {
		"source": "iana"
	},
	"audio/atrac-x": {
		"source": "iana"
	},
	"audio/atrac3": {
		"source": "iana"
	},
	"audio/basic": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"au",
			"snd"
		]
	},
	"audio/bv16": {
		"source": "iana"
	},
	"audio/bv32": {
		"source": "iana"
	},
	"audio/clearmode": {
		"source": "iana"
	},
	"audio/cn": {
		"source": "iana"
	},
	"audio/dat12": {
		"source": "iana"
	},
	"audio/dls": {
		"source": "iana"
	},
	"audio/dsr-es201108": {
		"source": "iana"
	},
	"audio/dsr-es202050": {
		"source": "iana"
	},
	"audio/dsr-es202211": {
		"source": "iana"
	},
	"audio/dsr-es202212": {
		"source": "iana"
	},
	"audio/dv": {
		"source": "iana"
	},
	"audio/dvi4": {
		"source": "iana"
	},
	"audio/eac3": {
		"source": "iana"
	},
	"audio/encaprtp": {
		"source": "iana"
	},
	"audio/evrc": {
		"source": "iana"
	},
	"audio/evrc-qcp": {
		"source": "iana"
	},
	"audio/evrc0": {
		"source": "iana"
	},
	"audio/evrc1": {
		"source": "iana"
	},
	"audio/evrcb": {
		"source": "iana"
	},
	"audio/evrcb0": {
		"source": "iana"
	},
	"audio/evrcb1": {
		"source": "iana"
	},
	"audio/evrcnw": {
		"source": "iana"
	},
	"audio/evrcnw0": {
		"source": "iana"
	},
	"audio/evrcnw1": {
		"source": "iana"
	},
	"audio/evrcwb": {
		"source": "iana"
	},
	"audio/evrcwb0": {
		"source": "iana"
	},
	"audio/evrcwb1": {
		"source": "iana"
	},
	"audio/evs": {
		"source": "iana"
	},
	"audio/fwdred": {
		"source": "iana"
	},
	"audio/g711-0": {
		"source": "iana"
	},
	"audio/g719": {
		"source": "iana"
	},
	"audio/g722": {
		"source": "iana"
	},
	"audio/g7221": {
		"source": "iana"
	},
	"audio/g723": {
		"source": "iana"
	},
	"audio/g726-16": {
		"source": "iana"
	},
	"audio/g726-24": {
		"source": "iana"
	},
	"audio/g726-32": {
		"source": "iana"
	},
	"audio/g726-40": {
		"source": "iana"
	},
	"audio/g728": {
		"source": "iana"
	},
	"audio/g729": {
		"source": "iana"
	},
	"audio/g7291": {
		"source": "iana"
	},
	"audio/g729d": {
		"source": "iana"
	},
	"audio/g729e": {
		"source": "iana"
	},
	"audio/gsm": {
		"source": "iana"
	},
	"audio/gsm-efr": {
		"source": "iana"
	},
	"audio/gsm-hr-08": {
		"source": "iana"
	},
	"audio/ilbc": {
		"source": "iana"
	},
	"audio/ip-mr_v2.5": {
		"source": "iana"
	},
	"audio/isac": {
		"source": "apache"
	},
	"audio/l16": {
		"source": "iana"
	},
	"audio/l20": {
		"source": "iana"
	},
	"audio/l24": {
		"source": "iana",
		"compressible": false
	},
	"audio/l8": {
		"source": "iana"
	},
	"audio/lpc": {
		"source": "iana"
	},
	"audio/midi": {
		"source": "apache",
		"extensions": [
			"mid",
			"midi",
			"kar",
			"rmi"
		]
	},
	"audio/mobile-xmf": {
		"source": "iana"
	},
	"audio/mp3": {
		"compressible": false,
		"extensions": [
			"mp3"
		]
	},
	"audio/mp4": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"m4a",
			"mp4a"
		]
	},
	"audio/mp4a-latm": {
		"source": "iana"
	},
	"audio/mpa": {
		"source": "iana"
	},
	"audio/mpa-robust": {
		"source": "iana"
	},
	"audio/mpeg": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"mpga",
			"mp2",
			"mp2a",
			"mp3",
			"m2a",
			"m3a"
		]
	},
	"audio/mpeg4-generic": {
		"source": "iana"
	},
	"audio/musepack": {
		"source": "apache"
	},
	"audio/ogg": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"oga",
			"ogg",
			"spx"
		]
	},
	"audio/opus": {
		"source": "iana"
	},
	"audio/parityfec": {
		"source": "iana"
	},
	"audio/pcma": {
		"source": "iana"
	},
	"audio/pcma-wb": {
		"source": "iana"
	},
	"audio/pcmu": {
		"source": "iana"
	},
	"audio/pcmu-wb": {
		"source": "iana"
	},
	"audio/prs.sid": {
		"source": "iana"
	},
	"audio/qcelp": {
		"source": "iana"
	},
	"audio/raptorfec": {
		"source": "iana"
	},
	"audio/red": {
		"source": "iana"
	},
	"audio/rtp-enc-aescm128": {
		"source": "iana"
	},
	"audio/rtp-midi": {
		"source": "iana"
	},
	"audio/rtploopback": {
		"source": "iana"
	},
	"audio/rtx": {
		"source": "iana"
	},
	"audio/s3m": {
		"source": "apache",
		"extensions": [
			"s3m"
		]
	},
	"audio/silk": {
		"source": "apache",
		"extensions": [
			"sil"
		]
	},
	"audio/smv": {
		"source": "iana"
	},
	"audio/smv-qcp": {
		"source": "iana"
	},
	"audio/smv0": {
		"source": "iana"
	},
	"audio/sp-midi": {
		"source": "iana"
	},
	"audio/speex": {
		"source": "iana"
	},
	"audio/t140c": {
		"source": "iana"
	},
	"audio/t38": {
		"source": "iana"
	},
	"audio/telephone-event": {
		"source": "iana"
	},
	"audio/tone": {
		"source": "iana"
	},
	"audio/uemclip": {
		"source": "iana"
	},
	"audio/ulpfec": {
		"source": "iana"
	},
	"audio/vdvi": {
		"source": "iana"
	},
	"audio/vmr-wb": {
		"source": "iana"
	},
	"audio/vnd.3gpp.iufp": {
		"source": "iana"
	},
	"audio/vnd.4sb": {
		"source": "iana"
	},
	"audio/vnd.audiokoz": {
		"source": "iana"
	},
	"audio/vnd.celp": {
		"source": "iana"
	},
	"audio/vnd.cisco.nse": {
		"source": "iana"
	},
	"audio/vnd.cmles.radio-events": {
		"source": "iana"
	},
	"audio/vnd.cns.anp1": {
		"source": "iana"
	},
	"audio/vnd.cns.inf1": {
		"source": "iana"
	},
	"audio/vnd.dece.audio": {
		"source": "iana",
		"extensions": [
			"uva",
			"uvva"
		]
	},
	"audio/vnd.digital-winds": {
		"source": "iana",
		"extensions": [
			"eol"
		]
	},
	"audio/vnd.dlna.adts": {
		"source": "iana"
	},
	"audio/vnd.dolby.heaac.1": {
		"source": "iana"
	},
	"audio/vnd.dolby.heaac.2": {
		"source": "iana"
	},
	"audio/vnd.dolby.mlp": {
		"source": "iana"
	},
	"audio/vnd.dolby.mps": {
		"source": "iana"
	},
	"audio/vnd.dolby.pl2": {
		"source": "iana"
	},
	"audio/vnd.dolby.pl2x": {
		"source": "iana"
	},
	"audio/vnd.dolby.pl2z": {
		"source": "iana"
	},
	"audio/vnd.dolby.pulse.1": {
		"source": "iana"
	},
	"audio/vnd.dra": {
		"source": "iana",
		"extensions": [
			"dra"
		]
	},
	"audio/vnd.dts": {
		"source": "iana",
		"extensions": [
			"dts"
		]
	},
	"audio/vnd.dts.hd": {
		"source": "iana",
		"extensions": [
			"dtshd"
		]
	},
	"audio/vnd.dvb.file": {
		"source": "iana"
	},
	"audio/vnd.everad.plj": {
		"source": "iana"
	},
	"audio/vnd.hns.audio": {
		"source": "iana"
	},
	"audio/vnd.lucent.voice": {
		"source": "iana",
		"extensions": [
			"lvp"
		]
	},
	"audio/vnd.ms-playready.media.pya": {
		"source": "iana",
		"extensions": [
			"pya"
		]
	},
	"audio/vnd.nokia.mobile-xmf": {
		"source": "iana"
	},
	"audio/vnd.nortel.vbk": {
		"source": "iana"
	},
	"audio/vnd.nuera.ecelp4800": {
		"source": "iana",
		"extensions": [
			"ecelp4800"
		]
	},
	"audio/vnd.nuera.ecelp7470": {
		"source": "iana",
		"extensions": [
			"ecelp7470"
		]
	},
	"audio/vnd.nuera.ecelp9600": {
		"source": "iana",
		"extensions": [
			"ecelp9600"
		]
	},
	"audio/vnd.octel.sbc": {
		"source": "iana"
	},
	"audio/vnd.qcelp": {
		"source": "iana"
	},
	"audio/vnd.rhetorex.32kadpcm": {
		"source": "iana"
	},
	"audio/vnd.rip": {
		"source": "iana",
		"extensions": [
			"rip"
		]
	},
	"audio/vnd.rn-realaudio": {
		"compressible": false
	},
	"audio/vnd.sealedmedia.softseal.mpeg": {
		"source": "iana"
	},
	"audio/vnd.vmx.cvsd": {
		"source": "iana"
	},
	"audio/vnd.wave": {
		"compressible": false
	},
	"audio/vorbis": {
		"source": "iana",
		"compressible": false
	},
	"audio/vorbis-config": {
		"source": "iana"
	},
	"audio/wav": {
		"compressible": false,
		"extensions": [
			"wav"
		]
	},
	"audio/wave": {
		"compressible": false,
		"extensions": [
			"wav"
		]
	},
	"audio/webm": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"weba"
		]
	},
	"audio/x-aac": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"aac"
		]
	},
	"audio/x-aiff": {
		"source": "apache",
		"extensions": [
			"aif",
			"aiff",
			"aifc"
		]
	},
	"audio/x-caf": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"caf"
		]
	},
	"audio/x-flac": {
		"source": "apache",
		"extensions": [
			"flac"
		]
	},
	"audio/x-m4a": {
		"source": "nginx",
		"extensions": [
			"m4a"
		]
	},
	"audio/x-matroska": {
		"source": "apache",
		"extensions": [
			"mka"
		]
	},
	"audio/x-mpegurl": {
		"source": "apache",
		"extensions": [
			"m3u"
		]
	},
	"audio/x-ms-wax": {
		"source": "apache",
		"extensions": [
			"wax"
		]
	},
	"audio/x-ms-wma": {
		"source": "apache",
		"extensions": [
			"wma"
		]
	},
	"audio/x-pn-realaudio": {
		"source": "apache",
		"extensions": [
			"ram",
			"ra"
		]
	},
	"audio/x-pn-realaudio-plugin": {
		"source": "apache",
		"extensions": [
			"rmp"
		]
	},
	"audio/x-realaudio": {
		"source": "nginx",
		"extensions": [
			"ra"
		]
	},
	"audio/x-tta": {
		"source": "apache"
	},
	"audio/x-wav": {
		"source": "apache",
		"extensions": [
			"wav"
		]
	},
	"audio/xm": {
		"source": "apache",
		"extensions": [
			"xm"
		]
	},
	"chemical/x-cdx": {
		"source": "apache",
		"extensions": [
			"cdx"
		]
	},
	"chemical/x-cif": {
		"source": "apache",
		"extensions": [
			"cif"
		]
	},
	"chemical/x-cmdf": {
		"source": "apache",
		"extensions": [
			"cmdf"
		]
	},
	"chemical/x-cml": {
		"source": "apache",
		"extensions": [
			"cml"
		]
	},
	"chemical/x-csml": {
		"source": "apache",
		"extensions": [
			"csml"
		]
	},
	"chemical/x-pdb": {
		"source": "apache"
	},
	"chemical/x-xyz": {
		"source": "apache",
		"extensions": [
			"xyz"
		]
	},
	"font/opentype": {
		"compressible": true,
		"extensions": [
			"otf"
		]
	},
	"image/bmp": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"bmp"
		]
	},
	"image/cgm": {
		"source": "iana",
		"extensions": [
			"cgm"
		]
	},
	"image/dicom-rle": {
		"source": "iana"
	},
	"image/emf": {
		"source": "iana"
	},
	"image/fits": {
		"source": "iana"
	},
	"image/g3fax": {
		"source": "iana",
		"extensions": [
			"g3"
		]
	},
	"image/gif": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"gif"
		]
	},
	"image/ief": {
		"source": "iana",
		"extensions": [
			"ief"
		]
	},
	"image/jls": {
		"source": "iana"
	},
	"image/jp2": {
		"source": "iana"
	},
	"image/jpeg": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"jpeg",
			"jpg",
			"jpe"
		]
	},
	"image/jpm": {
		"source": "iana"
	},
	"image/jpx": {
		"source": "iana"
	},
	"image/ktx": {
		"source": "iana",
		"extensions": [
			"ktx"
		]
	},
	"image/naplps": {
		"source": "iana"
	},
	"image/pjpeg": {
		"compressible": false
	},
	"image/png": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"png"
		]
	},
	"image/prs.btif": {
		"source": "iana",
		"extensions": [
			"btif"
		]
	},
	"image/prs.pti": {
		"source": "iana"
	},
	"image/pwg-raster": {
		"source": "iana"
	},
	"image/sgi": {
		"source": "apache",
		"extensions": [
			"sgi"
		]
	},
	"image/svg+xml": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"svg",
			"svgz"
		]
	},
	"image/t38": {
		"source": "iana"
	},
	"image/tiff": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"tiff",
			"tif"
		]
	},
	"image/tiff-fx": {
		"source": "iana"
	},
	"image/vnd.adobe.photoshop": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"psd"
		]
	},
	"image/vnd.airzip.accelerator.azv": {
		"source": "iana"
	},
	"image/vnd.cns.inf2": {
		"source": "iana"
	},
	"image/vnd.dece.graphic": {
		"source": "iana",
		"extensions": [
			"uvi",
			"uvvi",
			"uvg",
			"uvvg"
		]
	},
	"image/vnd.djvu": {
		"source": "iana",
		"extensions": [
			"djvu",
			"djv"
		]
	},
	"image/vnd.dvb.subtitle": {
		"source": "iana",
		"extensions": [
			"sub"
		]
	},
	"image/vnd.dwg": {
		"source": "iana",
		"extensions": [
			"dwg"
		]
	},
	"image/vnd.dxf": {
		"source": "iana",
		"extensions": [
			"dxf"
		]
	},
	"image/vnd.fastbidsheet": {
		"source": "iana",
		"extensions": [
			"fbs"
		]
	},
	"image/vnd.fpx": {
		"source": "iana",
		"extensions": [
			"fpx"
		]
	},
	"image/vnd.fst": {
		"source": "iana",
		"extensions": [
			"fst"
		]
	},
	"image/vnd.fujixerox.edmics-mmr": {
		"source": "iana",
		"extensions": [
			"mmr"
		]
	},
	"image/vnd.fujixerox.edmics-rlc": {
		"source": "iana",
		"extensions": [
			"rlc"
		]
	},
	"image/vnd.globalgraphics.pgb": {
		"source": "iana"
	},
	"image/vnd.microsoft.icon": {
		"source": "iana"
	},
	"image/vnd.mix": {
		"source": "iana"
	},
	"image/vnd.mozilla.apng": {
		"source": "iana"
	},
	"image/vnd.ms-modi": {
		"source": "iana",
		"extensions": [
			"mdi"
		]
	},
	"image/vnd.ms-photo": {
		"source": "apache",
		"extensions": [
			"wdp"
		]
	},
	"image/vnd.net-fpx": {
		"source": "iana",
		"extensions": [
			"npx"
		]
	},
	"image/vnd.radiance": {
		"source": "iana"
	},
	"image/vnd.sealed.png": {
		"source": "iana"
	},
	"image/vnd.sealedmedia.softseal.gif": {
		"source": "iana"
	},
	"image/vnd.sealedmedia.softseal.jpg": {
		"source": "iana"
	},
	"image/vnd.svf": {
		"source": "iana"
	},
	"image/vnd.tencent.tap": {
		"source": "iana"
	},
	"image/vnd.valve.source.texture": {
		"source": "iana"
	},
	"image/vnd.wap.wbmp": {
		"source": "iana",
		"extensions": [
			"wbmp"
		]
	},
	"image/vnd.xiff": {
		"source": "iana",
		"extensions": [
			"xif"
		]
	},
	"image/vnd.zbrush.pcx": {
		"source": "iana"
	},
	"image/webp": {
		"source": "apache",
		"extensions": [
			"webp"
		]
	},
	"image/wmf": {
		"source": "iana"
	},
	"image/x-3ds": {
		"source": "apache",
		"extensions": [
			"3ds"
		]
	},
	"image/x-cmu-raster": {
		"source": "apache",
		"extensions": [
			"ras"
		]
	},
	"image/x-cmx": {
		"source": "apache",
		"extensions": [
			"cmx"
		]
	},
	"image/x-freehand": {
		"source": "apache",
		"extensions": [
			"fh",
			"fhc",
			"fh4",
			"fh5",
			"fh7"
		]
	},
	"image/x-icon": {
		"source": "apache",
		"compressible": true,
		"extensions": [
			"ico"
		]
	},
	"image/x-jng": {
		"source": "nginx",
		"extensions": [
			"jng"
		]
	},
	"image/x-mrsid-image": {
		"source": "apache",
		"extensions": [
			"sid"
		]
	},
	"image/x-ms-bmp": {
		"source": "nginx",
		"compressible": true,
		"extensions": [
			"bmp"
		]
	},
	"image/x-pcx": {
		"source": "apache",
		"extensions": [
			"pcx"
		]
	},
	"image/x-pict": {
		"source": "apache",
		"extensions": [
			"pic",
			"pct"
		]
	},
	"image/x-portable-anymap": {
		"source": "apache",
		"extensions": [
			"pnm"
		]
	},
	"image/x-portable-bitmap": {
		"source": "apache",
		"extensions": [
			"pbm"
		]
	},
	"image/x-portable-graymap": {
		"source": "apache",
		"extensions": [
			"pgm"
		]
	},
	"image/x-portable-pixmap": {
		"source": "apache",
		"extensions": [
			"ppm"
		]
	},
	"image/x-rgb": {
		"source": "apache",
		"extensions": [
			"rgb"
		]
	},
	"image/x-tga": {
		"source": "apache",
		"extensions": [
			"tga"
		]
	},
	"image/x-xbitmap": {
		"source": "apache",
		"extensions": [
			"xbm"
		]
	},
	"image/x-xcf": {
		"compressible": false
	},
	"image/x-xpixmap": {
		"source": "apache",
		"extensions": [
			"xpm"
		]
	},
	"image/x-xwindowdump": {
		"source": "apache",
		"extensions": [
			"xwd"
		]
	},
	"message/cpim": {
		"source": "iana"
	},
	"message/delivery-status": {
		"source": "iana"
	},
	"message/disposition-notification": {
		"source": "iana"
	},
	"message/external-body": {
		"source": "iana"
	},
	"message/feedback-report": {
		"source": "iana"
	},
	"message/global": {
		"source": "iana"
	},
	"message/global-delivery-status": {
		"source": "iana"
	},
	"message/global-disposition-notification": {
		"source": "iana"
	},
	"message/global-headers": {
		"source": "iana"
	},
	"message/http": {
		"source": "iana",
		"compressible": false
	},
	"message/imdn+xml": {
		"source": "iana",
		"compressible": true
	},
	"message/news": {
		"source": "iana"
	},
	"message/partial": {
		"source": "iana",
		"compressible": false
	},
	"message/rfc822": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"eml",
			"mime"
		]
	},
	"message/s-http": {
		"source": "iana"
	},
	"message/sip": {
		"source": "iana"
	},
	"message/sipfrag": {
		"source": "iana"
	},
	"message/tracking-status": {
		"source": "iana"
	},
	"message/vnd.si.simp": {
		"source": "iana"
	},
	"message/vnd.wfa.wsc": {
		"source": "iana"
	},
	"model/gltf+json": {
		"source": "iana",
		"compressible": true
	},
	"model/iges": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"igs",
			"iges"
		]
	},
	"model/mesh": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"msh",
			"mesh",
			"silo"
		]
	},
	"model/vnd.collada+xml": {
		"source": "iana",
		"extensions": [
			"dae"
		]
	},
	"model/vnd.dwf": {
		"source": "iana",
		"extensions": [
			"dwf"
		]
	},
	"model/vnd.flatland.3dml": {
		"source": "iana"
	},
	"model/vnd.gdl": {
		"source": "iana",
		"extensions": [
			"gdl"
		]
	},
	"model/vnd.gs-gdl": {
		"source": "apache"
	},
	"model/vnd.gs.gdl": {
		"source": "iana"
	},
	"model/vnd.gtw": {
		"source": "iana",
		"extensions": [
			"gtw"
		]
	},
	"model/vnd.moml+xml": {
		"source": "iana"
	},
	"model/vnd.mts": {
		"source": "iana",
		"extensions": [
			"mts"
		]
	},
	"model/vnd.opengex": {
		"source": "iana"
	},
	"model/vnd.parasolid.transmit.binary": {
		"source": "iana"
	},
	"model/vnd.parasolid.transmit.text": {
		"source": "iana"
	},
	"model/vnd.rosette.annotated-data-model": {
		"source": "iana"
	},
	"model/vnd.valve.source.compiled-map": {
		"source": "iana"
	},
	"model/vnd.vtu": {
		"source": "iana",
		"extensions": [
			"vtu"
		]
	},
	"model/vrml": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"wrl",
			"vrml"
		]
	},
	"model/x3d+binary": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"x3db",
			"x3dbz"
		]
	},
	"model/x3d+fastinfoset": {
		"source": "iana"
	},
	"model/x3d+vrml": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"x3dv",
			"x3dvz"
		]
	},
	"model/x3d+xml": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"x3d",
			"x3dz"
		]
	},
	"model/x3d-vrml": {
		"source": "iana"
	},
	"multipart/alternative": {
		"source": "iana",
		"compressible": false
	},
	"multipart/appledouble": {
		"source": "iana"
	},
	"multipart/byteranges": {
		"source": "iana"
	},
	"multipart/digest": {
		"source": "iana"
	},
	"multipart/encrypted": {
		"source": "iana",
		"compressible": false
	},
	"multipart/form-data": {
		"source": "iana",
		"compressible": false
	},
	"multipart/header-set": {
		"source": "iana"
	},
	"multipart/mixed": {
		"source": "iana",
		"compressible": false
	},
	"multipart/parallel": {
		"source": "iana"
	},
	"multipart/related": {
		"source": "iana",
		"compressible": false
	},
	"multipart/report": {
		"source": "iana"
	},
	"multipart/signed": {
		"source": "iana",
		"compressible": false
	},
	"multipart/voice-message": {
		"source": "iana"
	},
	"multipart/x-mixed-replace": {
		"source": "iana"
	},
	"text/1d-interleaved-parityfec": {
		"source": "iana"
	},
	"text/cache-manifest": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"appcache",
			"manifest"
		]
	},
	"text/calendar": {
		"source": "iana",
		"extensions": [
			"ics",
			"ifb"
		]
	},
	"text/calender": {
		"compressible": true
	},
	"text/cmd": {
		"compressible": true
	},
	"text/coffeescript": {
		"extensions": [
			"coffee",
			"litcoffee"
		]
	},
	"text/css": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"css"
		]
	},
	"text/csv": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"csv"
		]
	},
	"text/csv-schema": {
		"source": "iana"
	},
	"text/directory": {
		"source": "iana"
	},
	"text/dns": {
		"source": "iana"
	},
	"text/ecmascript": {
		"source": "iana"
	},
	"text/encaprtp": {
		"source": "iana"
	},
	"text/enriched": {
		"source": "iana"
	},
	"text/fwdred": {
		"source": "iana"
	},
	"text/grammar-ref-list": {
		"source": "iana"
	},
	"text/hjson": {
		"extensions": [
			"hjson"
		]
	},
	"text/html": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"html",
			"htm",
			"shtml"
		]
	},
	"text/jade": {
		"extensions": [
			"jade"
		]
	},
	"text/javascript": {
		"source": "iana",
		"compressible": true
	},
	"text/jcr-cnd": {
		"source": "iana"
	},
	"text/jsx": {
		"compressible": true,
		"extensions": [
			"jsx"
		]
	},
	"text/less": {
		"extensions": [
			"less"
		]
	},
	"text/markdown": {
		"source": "iana"
	},
	"text/mathml": {
		"source": "nginx",
		"extensions": [
			"mml"
		]
	},
	"text/mizar": {
		"source": "iana"
	},
	"text/n3": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"n3"
		]
	},
	"text/parameters": {
		"source": "iana"
	},
	"text/parityfec": {
		"source": "iana"
	},
	"text/plain": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"txt",
			"text",
			"conf",
			"def",
			"list",
			"log",
			"in",
			"ini"
		]
	},
	"text/provenance-notation": {
		"source": "iana"
	},
	"text/prs.fallenstein.rst": {
		"source": "iana"
	},
	"text/prs.lines.tag": {
		"source": "iana",
		"extensions": [
			"dsc"
		]
	},
	"text/prs.prop.logic": {
		"source": "iana"
	},
	"text/raptorfec": {
		"source": "iana"
	},
	"text/red": {
		"source": "iana"
	},
	"text/rfc822-headers": {
		"source": "iana"
	},
	"text/richtext": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"rtx"
		]
	},
	"text/rtf": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"rtf"
		]
	},
	"text/rtp-enc-aescm128": {
		"source": "iana"
	},
	"text/rtploopback": {
		"source": "iana"
	},
	"text/rtx": {
		"source": "iana"
	},
	"text/sgml": {
		"source": "iana",
		"extensions": [
			"sgml",
			"sgm"
		]
	},
	"text/slim": {
		"extensions": [
			"slim",
			"slm"
		]
	},
	"text/stylus": {
		"extensions": [
			"stylus",
			"styl"
		]
	},
	"text/t140": {
		"source": "iana"
	},
	"text/tab-separated-values": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"tsv"
		]
	},
	"text/troff": {
		"source": "iana",
		"extensions": [
			"t",
			"tr",
			"roff",
			"man",
			"me",
			"ms"
		]
	},
	"text/turtle": {
		"source": "iana",
		"extensions": [
			"ttl"
		]
	},
	"text/ulpfec": {
		"source": "iana"
	},
	"text/uri-list": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"uri",
			"uris",
			"urls"
		]
	},
	"text/vcard": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"vcard"
		]
	},
	"text/vnd.a": {
		"source": "iana"
	},
	"text/vnd.abc": {
		"source": "iana"
	},
	"text/vnd.ascii-art": {
		"source": "iana"
	},
	"text/vnd.curl": {
		"source": "iana",
		"extensions": [
			"curl"
		]
	},
	"text/vnd.curl.dcurl": {
		"source": "apache",
		"extensions": [
			"dcurl"
		]
	},
	"text/vnd.curl.mcurl": {
		"source": "apache",
		"extensions": [
			"mcurl"
		]
	},
	"text/vnd.curl.scurl": {
		"source": "apache",
		"extensions": [
			"scurl"
		]
	},
	"text/vnd.debian.copyright": {
		"source": "iana"
	},
	"text/vnd.dmclientscript": {
		"source": "iana"
	},
	"text/vnd.dvb.subtitle": {
		"source": "iana",
		"extensions": [
			"sub"
		]
	},
	"text/vnd.esmertec.theme-descriptor": {
		"source": "iana"
	},
	"text/vnd.fly": {
		"source": "iana",
		"extensions": [
			"fly"
		]
	},
	"text/vnd.fmi.flexstor": {
		"source": "iana",
		"extensions": [
			"flx"
		]
	},
	"text/vnd.graphviz": {
		"source": "iana",
		"extensions": [
			"gv"
		]
	},
	"text/vnd.in3d.3dml": {
		"source": "iana",
		"extensions": [
			"3dml"
		]
	},
	"text/vnd.in3d.spot": {
		"source": "iana",
		"extensions": [
			"spot"
		]
	},
	"text/vnd.iptc.newsml": {
		"source": "iana"
	},
	"text/vnd.iptc.nitf": {
		"source": "iana"
	},
	"text/vnd.latex-z": {
		"source": "iana"
	},
	"text/vnd.motorola.reflex": {
		"source": "iana"
	},
	"text/vnd.ms-mediapackage": {
		"source": "iana"
	},
	"text/vnd.net2phone.commcenter.command": {
		"source": "iana"
	},
	"text/vnd.radisys.msml-basic-layout": {
		"source": "iana"
	},
	"text/vnd.si.uricatalogue": {
		"source": "iana"
	},
	"text/vnd.sun.j2me.app-descriptor": {
		"source": "iana",
		"extensions": [
			"jad"
		]
	},
	"text/vnd.trolltech.linguist": {
		"source": "iana"
	},
	"text/vnd.wap.si": {
		"source": "iana"
	},
	"text/vnd.wap.sl": {
		"source": "iana"
	},
	"text/vnd.wap.wml": {
		"source": "iana",
		"extensions": [
			"wml"
		]
	},
	"text/vnd.wap.wmlscript": {
		"source": "iana",
		"extensions": [
			"wmls"
		]
	},
	"text/vtt": {
		"charset": "UTF-8",
		"compressible": true,
		"extensions": [
			"vtt"
		]
	},
	"text/x-asm": {
		"source": "apache",
		"extensions": [
			"s",
			"asm"
		]
	},
	"text/x-c": {
		"source": "apache",
		"extensions": [
			"c",
			"cc",
			"cxx",
			"cpp",
			"h",
			"hh",
			"dic"
		]
	},
	"text/x-component": {
		"source": "nginx",
		"extensions": [
			"htc"
		]
	},
	"text/x-fortran": {
		"source": "apache",
		"extensions": [
			"f",
			"for",
			"f77",
			"f90"
		]
	},
	"text/x-gwt-rpc": {
		"compressible": true
	},
	"text/x-handlebars-template": {
		"extensions": [
			"hbs"
		]
	},
	"text/x-java-source": {
		"source": "apache",
		"extensions": [
			"java"
		]
	},
	"text/x-jquery-tmpl": {
		"compressible": true
	},
	"text/x-lua": {
		"extensions": [
			"lua"
		]
	},
	"text/x-markdown": {
		"compressible": true,
		"extensions": [
			"markdown",
			"md",
			"mkd"
		]
	},
	"text/x-nfo": {
		"source": "apache",
		"extensions": [
			"nfo"
		]
	},
	"text/x-opml": {
		"source": "apache",
		"extensions": [
			"opml"
		]
	},
	"text/x-pascal": {
		"source": "apache",
		"extensions": [
			"p",
			"pas"
		]
	},
	"text/x-processing": {
		"compressible": true,
		"extensions": [
			"pde"
		]
	},
	"text/x-sass": {
		"extensions": [
			"sass"
		]
	},
	"text/x-scss": {
		"extensions": [
			"scss"
		]
	},
	"text/x-setext": {
		"source": "apache",
		"extensions": [
			"etx"
		]
	},
	"text/x-sfv": {
		"source": "apache",
		"extensions": [
			"sfv"
		]
	},
	"text/x-suse-ymp": {
		"compressible": true,
		"extensions": [
			"ymp"
		]
	},
	"text/x-uuencode": {
		"source": "apache",
		"extensions": [
			"uu"
		]
	},
	"text/x-vcalendar": {
		"source": "apache",
		"extensions": [
			"vcs"
		]
	},
	"text/x-vcard": {
		"source": "apache",
		"extensions": [
			"vcf"
		]
	},
	"text/xml": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"xml"
		]
	},
	"text/xml-external-parsed-entity": {
		"source": "iana"
	},
	"text/yaml": {
		"extensions": [
			"yaml",
			"yml"
		]
	},
	"video/1d-interleaved-parityfec": {
		"source": "apache"
	},
	"video/3gpp": {
		"source": "apache",
		"extensions": [
			"3gp",
			"3gpp"
		]
	},
	"video/3gpp-tt": {
		"source": "apache"
	},
	"video/3gpp2": {
		"source": "apache",
		"extensions": [
			"3g2"
		]
	},
	"video/bmpeg": {
		"source": "apache"
	},
	"video/bt656": {
		"source": "apache"
	},
	"video/celb": {
		"source": "apache"
	},
	"video/dv": {
		"source": "apache"
	},
	"video/encaprtp": {
		"source": "apache"
	},
	"video/h261": {
		"source": "apache",
		"extensions": [
			"h261"
		]
	},
	"video/h263": {
		"source": "apache",
		"extensions": [
			"h263"
		]
	},
	"video/h263-1998": {
		"source": "apache"
	},
	"video/h263-2000": {
		"source": "apache"
	},
	"video/h264": {
		"source": "apache",
		"extensions": [
			"h264"
		]
	},
	"video/h264-rcdo": {
		"source": "apache"
	},
	"video/h264-svc": {
		"source": "apache"
	},
	"video/h265": {
		"source": "apache"
	},
	"video/iso.segment": {
		"source": "apache"
	},
	"video/jpeg": {
		"source": "apache",
		"extensions": [
			"jpgv"
		]
	},
	"video/jpeg2000": {
		"source": "apache"
	},
	"video/jpm": {
		"source": "apache",
		"extensions": [
			"jpm",
			"jpgm"
		]
	},
	"video/mj2": {
		"source": "apache",
		"extensions": [
			"mj2",
			"mjp2"
		]
	},
	"video/mp1s": {
		"source": "apache"
	},
	"video/mp2p": {
		"source": "apache"
	},
	"video/mp2t": {
		"source": "apache",
		"extensions": [
			"ts"
		]
	},
	"video/mp4": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"mp4",
			"mp4v",
			"mpg4"
		]
	},
	"video/mp4v-es": {
		"source": "apache"
	},
	"video/mpeg": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"mpeg",
			"mpg",
			"mpe",
			"m1v",
			"m2v"
		]
	},
	"video/mpeg4-generic": {
		"source": "apache"
	},
	"video/mpv": {
		"source": "apache"
	},
	"video/nv": {
		"source": "apache"
	},
	"video/ogg": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"ogv"
		]
	},
	"video/parityfec": {
		"source": "apache"
	},
	"video/pointer": {
		"source": "apache"
	},
	"video/quicktime": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"qt",
			"mov"
		]
	},
	"video/raptorfec": {
		"source": "apache"
	},
	"video/raw": {
		"source": "apache"
	},
	"video/rtp-enc-aescm128": {
		"source": "apache"
	},
	"video/rtploopback": {
		"source": "apache"
	},
	"video/rtx": {
		"source": "apache"
	},
	"video/smpte292m": {
		"source": "apache"
	},
	"video/ulpfec": {
		"source": "apache"
	},
	"video/vc1": {
		"source": "apache"
	},
	"video/vnd.cctv": {
		"source": "apache"
	},
	"video/vnd.dece.hd": {
		"source": "apache",
		"extensions": [
			"uvh",
			"uvvh"
		]
	},
	"video/vnd.dece.mobile": {
		"source": "apache",
		"extensions": [
			"uvm",
			"uvvm"
		]
	},
	"video/vnd.dece.mp4": {
		"source": "apache"
	},
	"video/vnd.dece.pd": {
		"source": "apache",
		"extensions": [
			"uvp",
			"uvvp"
		]
	},
	"video/vnd.dece.sd": {
		"source": "apache",
		"extensions": [
			"uvs",
			"uvvs"
		]
	},
	"video/vnd.dece.video": {
		"source": "apache",
		"extensions": [
			"uvv",
			"uvvv"
		]
	},
	"video/vnd.directv.mpeg": {
		"source": "apache"
	},
	"video/vnd.directv.mpeg-tts": {
		"source": "apache"
	},
	"video/vnd.dlna.mpeg-tts": {
		"source": "apache"
	},
	"video/vnd.dvb.file": {
		"source": "apache",
		"extensions": [
			"dvb"
		]
	},
	"video/vnd.fvt": {
		"source": "apache",
		"extensions": [
			"fvt"
		]
	},
	"video/vnd.hns.video": {
		"source": "apache"
	},
	"video/vnd.iptvforum.1dparityfec-1010": {
		"source": "apache"
	},
	"video/vnd.iptvforum.1dparityfec-2005": {
		"source": "apache"
	},
	"video/vnd.iptvforum.2dparityfec-1010": {
		"source": "apache"
	},
	"video/vnd.iptvforum.2dparityfec-2005": {
		"source": "apache"
	},
	"video/vnd.iptvforum.ttsavc": {
		"source": "apache"
	},
	"video/vnd.iptvforum.ttsmpeg2": {
		"source": "apache"
	},
	"video/vnd.motorola.video": {
		"source": "apache"
	},
	"video/vnd.motorola.videop": {
		"source": "apache"
	},
	"video/vnd.mpegurl": {
		"source": "apache",
		"extensions": [
			"mxu",
			"m4u"
		]
	},
	"video/vnd.ms-playready.media.pyv": {
		"source": "apache",
		"extensions": [
			"pyv"
		]
	},
	"video/vnd.nokia.interleaved-multimedia": {
		"source": "apache"
	},
	"video/vnd.nokia.videovoip": {
		"source": "apache"
	},
	"video/vnd.objectvideo": {
		"source": "apache"
	},
	"video/vnd.radgamettools.bink": {
		"source": "apache"
	},
	"video/vnd.radgamettools.smacker": {
		"source": "apache"
	},
	"video/vnd.sealed.mpeg1": {
		"source": "apache"
	},
	"video/vnd.sealed.mpeg4": {
		"source": "apache"
	},
	"video/vnd.sealed.swf": {
		"source": "apache"
	},
	"video/vnd.sealedmedia.softseal.mov": {
		"source": "apache"
	},
	"video/vnd.uvvu.mp4": {
		"source": "apache",
		"extensions": [
			"uvu",
			"uvvu"
		]
	},
	"video/vnd.vivo": {
		"source": "apache",
		"extensions": [
			"viv"
		]
	},
	"video/vp8": {
		"source": "apache"
	},
	"video/webm": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"webm"
		]
	},
	"video/x-f4v": {
		"source": "apache",
		"extensions": [
			"f4v"
		]
	},
	"video/x-fli": {
		"source": "apache",
		"extensions": [
			"fli"
		]
	},
	"video/x-flv": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"flv"
		]
	},
	"video/x-m4v": {
		"source": "apache",
		"extensions": [
			"m4v"
		]
	},
	"video/x-matroska": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"mkv",
			"mk3d",
			"mks"
		]
	},
	"video/x-mng": {
		"source": "apache",
		"extensions": [
			"mng"
		]
	},
	"video/x-ms-asf": {
		"source": "apache",
		"extensions": [
			"asf",
			"asx"
		]
	},
	"video/x-ms-vob": {
		"source": "apache",
		"extensions": [
			"vob"
		]
	},
	"video/x-ms-wm": {
		"source": "apache",
		"extensions": [
			"wm"
		]
	},
	"video/x-ms-wmv": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"wmv"
		]
	},
	"video/x-ms-wmx": {
		"source": "apache",
		"extensions": [
			"wmx"
		]
	},
	"video/x-ms-wvx": {
		"source": "apache",
		"extensions": [
			"wvx"
		]
	},
	"video/x-msvideo": {
		"source": "apache",
		"extensions": [
			"avi"
		]
	},
	"video/x-sgi-movie": {
		"source": "apache",
		"extensions": [
			"movie"
		]
	},
	"video/x-smv": {
		"source": "apache",
		"extensions": [
			"smv"
		]
	},
	"x-conference/x-cooltalk": {
		"source": "apache",
		"extensions": [
			"ice"
		]
	},
	"x-shader/x-fragment": {
		"compressible": true
	},
	"x-shader/x-vertex": {
		"compressible": true
	}
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * MIT Licensed
 */

/**
 * Module exports.
 */

module.exports = __webpack_require__(70)


/***/ }),
/* 72 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000
var m = s * 60
var h = m * 60
var d = h * 24
var y = d * 365.25

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {}
  var type = typeof val
  if (type === 'string' && val.length > 0) {
    return parse(val)
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ?
			fmtLong(val) :
			fmtShort(val)
  }
  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val))
}

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str)
  if (str.length > 10000) {
    return
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str)
  if (!match) {
    return
  }
  var n = parseFloat(match[1])
  var type = (match[2] || 'ms').toLowerCase()
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y
    case 'days':
    case 'day':
    case 'd':
      return n * d
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n
    default:
      return undefined
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd'
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h'
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm'
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's'
  }
  return ms + 'ms'
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms'
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name
  }
  return Math.ceil(ms / n) + ' ' + name + 's'
}


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * negotiator
 * Copyright(c) 2012 Federico Romero
 * Copyright(c) 2012-2014 Isaac Z. Schlueter
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Cached loaded submodules.
 * @private
 */

var modules = Object.create(null);

/**
 * Module exports.
 * @public
 */

module.exports = Negotiator;
module.exports.Negotiator = Negotiator;

/**
 * Create a Negotiator instance from a request.
 * @param {object} request
 * @public
 */

function Negotiator(request) {
  if (!(this instanceof Negotiator)) {
    return new Negotiator(request);
  }

  this.request = request;
}

Negotiator.prototype.charset = function charset(available) {
  var set = this.charsets(available);
  return set && set[0];
};

Negotiator.prototype.charsets = function charsets(available) {
  var preferredCharsets = loadModule('charset').preferredCharsets;
  return preferredCharsets(this.request.headers['accept-charset'], available);
};

Negotiator.prototype.encoding = function encoding(available) {
  var set = this.encodings(available);
  return set && set[0];
};

Negotiator.prototype.encodings = function encodings(available) {
  var preferredEncodings = loadModule('encoding').preferredEncodings;
  return preferredEncodings(this.request.headers['accept-encoding'], available);
};

Negotiator.prototype.language = function language(available) {
  var set = this.languages(available);
  return set && set[0];
};

Negotiator.prototype.languages = function languages(available) {
  var preferredLanguages = loadModule('language').preferredLanguages;
  return preferredLanguages(this.request.headers['accept-language'], available);
};

Negotiator.prototype.mediaType = function mediaType(available) {
  var set = this.mediaTypes(available);
  return set && set[0];
};

Negotiator.prototype.mediaTypes = function mediaTypes(available) {
  var preferredMediaTypes = loadModule('mediaType').preferredMediaTypes;
  return preferredMediaTypes(this.request.headers.accept, available);
};

// Backwards compatibility
Negotiator.prototype.preferredCharset = Negotiator.prototype.charset;
Negotiator.prototype.preferredCharsets = Negotiator.prototype.charsets;
Negotiator.prototype.preferredEncoding = Negotiator.prototype.encoding;
Negotiator.prototype.preferredEncodings = Negotiator.prototype.encodings;
Negotiator.prototype.preferredLanguage = Negotiator.prototype.language;
Negotiator.prototype.preferredLanguages = Negotiator.prototype.languages;
Negotiator.prototype.preferredMediaType = Negotiator.prototype.mediaType;
Negotiator.prototype.preferredMediaTypes = Negotiator.prototype.mediaTypes;

/**
 * Load the given module.
 * @private
 */

function loadModule(moduleName) {
  var module = modules[moduleName];

  if (module !== undefined) {
    return module;
  }

  // This uses a switch for static require analysis
  switch (moduleName) {
    case 'charset':
      module = __webpack_require__(74);
      break;
    case 'encoding':
      module = __webpack_require__(75);
      break;
    case 'language':
      module = __webpack_require__(76);
      break;
    case 'mediaType':
      module = __webpack_require__(77);
      break;
    default:
      throw new Error('Cannot find module \'' + moduleName + '\'');
  }

  // Store to prevent invoking require()
  modules[moduleName] = module;

  return module;
}


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

module.exports = preferredCharsets;
module.exports.preferredCharsets = preferredCharsets;

/**
 * Module variables.
 * @private
 */

var simpleCharsetRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;

/**
 * Parse the Accept-Charset header.
 * @private
 */

function parseAcceptCharset(accept) {
  var accepts = accept.split(',');

  for (var i = 0, j = 0; i < accepts.length; i++) {
    var charset = parseCharset(accepts[i].trim(), i);

    if (charset) {
      accepts[j++] = charset;
    }
  }

  // trim accepts
  accepts.length = j;

  return accepts;
}

/**
 * Parse a charset from the Accept-Charset header.
 * @private
 */

function parseCharset(str, i) {
  var match = simpleCharsetRegExp.exec(str);
  if (!match) return null;

  var charset = match[1];
  var q = 1;
  if (match[2]) {
    var params = match[2].split(';')
    for (var i = 0; i < params.length; i ++) {
      var p = params[i].trim().split('=');
      if (p[0] === 'q') {
        q = parseFloat(p[1]);
        break;
      }
    }
  }

  return {
    charset: charset,
    q: q,
    i: i
  };
}

/**
 * Get the priority of a charset.
 * @private
 */

function getCharsetPriority(charset, accepted, index) {
  var priority = {o: -1, q: 0, s: 0};

  for (var i = 0; i < accepted.length; i++) {
    var spec = specify(charset, accepted[i], index);

    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
      priority = spec;
    }
  }

  return priority;
}

/**
 * Get the specificity of the charset.
 * @private
 */

function specify(charset, spec, index) {
  var s = 0;
  if(spec.charset.toLowerCase() === charset.toLowerCase()){
    s |= 1;
  } else if (spec.charset !== '*' ) {
    return null
  }

  return {
    i: index,
    o: spec.i,
    q: spec.q,
    s: s
  }
}

/**
 * Get the preferred charsets from an Accept-Charset header.
 * @public
 */

function preferredCharsets(accept, provided) {
  // RFC 2616 sec 14.2: no header = *
  var accepts = parseAcceptCharset(accept === undefined ? '*' : accept || '');

  if (!provided) {
    // sorted list of all charsets
    return accepts
      .filter(isQuality)
      .sort(compareSpecs)
      .map(getFullCharset);
  }

  var priorities = provided.map(function getPriority(type, index) {
    return getCharsetPriority(type, accepts, index);
  });

  // sorted list of accepted charsets
  return priorities.filter(isQuality).sort(compareSpecs).map(function getCharset(priority) {
    return provided[priorities.indexOf(priority)];
  });
}

/**
 * Compare two specs.
 * @private
 */

function compareSpecs(a, b) {
  return (b.q - a.q) || (b.s - a.s) || (a.o - b.o) || (a.i - b.i) || 0;
}

/**
 * Get full charset string.
 * @private
 */

function getFullCharset(spec) {
  return spec.charset;
}

/**
 * Check if a spec has any quality.
 * @private
 */

function isQuality(spec) {
  return spec.q > 0;
}


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

module.exports = preferredEncodings;
module.exports.preferredEncodings = preferredEncodings;

/**
 * Module variables.
 * @private
 */

var simpleEncodingRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;

/**
 * Parse the Accept-Encoding header.
 * @private
 */

function parseAcceptEncoding(accept) {
  var accepts = accept.split(',');
  var hasIdentity = false;
  var minQuality = 1;

  for (var i = 0, j = 0; i < accepts.length; i++) {
    var encoding = parseEncoding(accepts[i].trim(), i);

    if (encoding) {
      accepts[j++] = encoding;
      hasIdentity = hasIdentity || specify('identity', encoding);
      minQuality = Math.min(minQuality, encoding.q || 1);
    }
  }

  if (!hasIdentity) {
    /*
     * If identity doesn't explicitly appear in the accept-encoding header,
     * it's added to the list of acceptable encoding with the lowest q
     */
    accepts[j++] = {
      encoding: 'identity',
      q: minQuality,
      i: i
    };
  }

  // trim accepts
  accepts.length = j;

  return accepts;
}

/**
 * Parse an encoding from the Accept-Encoding header.
 * @private
 */

function parseEncoding(str, i) {
  var match = simpleEncodingRegExp.exec(str);
  if (!match) return null;

  var encoding = match[1];
  var q = 1;
  if (match[2]) {
    var params = match[2].split(';');
    for (var i = 0; i < params.length; i ++) {
      var p = params[i].trim().split('=');
      if (p[0] === 'q') {
        q = parseFloat(p[1]);
        break;
      }
    }
  }

  return {
    encoding: encoding,
    q: q,
    i: i
  };
}

/**
 * Get the priority of an encoding.
 * @private
 */

function getEncodingPriority(encoding, accepted, index) {
  var priority = {o: -1, q: 0, s: 0};

  for (var i = 0; i < accepted.length; i++) {
    var spec = specify(encoding, accepted[i], index);

    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
      priority = spec;
    }
  }

  return priority;
}

/**
 * Get the specificity of the encoding.
 * @private
 */

function specify(encoding, spec, index) {
  var s = 0;
  if(spec.encoding.toLowerCase() === encoding.toLowerCase()){
    s |= 1;
  } else if (spec.encoding !== '*' ) {
    return null
  }

  return {
    i: index,
    o: spec.i,
    q: spec.q,
    s: s
  }
};

/**
 * Get the preferred encodings from an Accept-Encoding header.
 * @public
 */

function preferredEncodings(accept, provided) {
  var accepts = parseAcceptEncoding(accept || '');

  if (!provided) {
    // sorted list of all encodings
    return accepts
      .filter(isQuality)
      .sort(compareSpecs)
      .map(getFullEncoding);
  }

  var priorities = provided.map(function getPriority(type, index) {
    return getEncodingPriority(type, accepts, index);
  });

  // sorted list of accepted encodings
  return priorities.filter(isQuality).sort(compareSpecs).map(function getEncoding(priority) {
    return provided[priorities.indexOf(priority)];
  });
}

/**
 * Compare two specs.
 * @private
 */

function compareSpecs(a, b) {
  return (b.q - a.q) || (b.s - a.s) || (a.o - b.o) || (a.i - b.i) || 0;
}

/**
 * Get full encoding string.
 * @private
 */

function getFullEncoding(spec) {
  return spec.encoding;
}

/**
 * Check if a spec has any quality.
 * @private
 */

function isQuality(spec) {
  return spec.q > 0;
}


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

module.exports = preferredLanguages;
module.exports.preferredLanguages = preferredLanguages;

/**
 * Module variables.
 * @private
 */

var simpleLanguageRegExp = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;

/**
 * Parse the Accept-Language header.
 * @private
 */

function parseAcceptLanguage(accept) {
  var accepts = accept.split(',');

  for (var i = 0, j = 0; i < accepts.length; i++) {
    var langauge = parseLanguage(accepts[i].trim(), i);

    if (langauge) {
      accepts[j++] = langauge;
    }
  }

  // trim accepts
  accepts.length = j;

  return accepts;
}

/**
 * Parse a language from the Accept-Language header.
 * @private
 */

function parseLanguage(str, i) {
  var match = simpleLanguageRegExp.exec(str);
  if (!match) return null;

  var prefix = match[1],
      suffix = match[2],
      full = prefix;

  if (suffix) full += "-" + suffix;

  var q = 1;
  if (match[3]) {
    var params = match[3].split(';')
    for (var i = 0; i < params.length; i ++) {
      var p = params[i].split('=');
      if (p[0] === 'q') q = parseFloat(p[1]);
    }
  }

  return {
    prefix: prefix,
    suffix: suffix,
    q: q,
    i: i,
    full: full
  };
}

/**
 * Get the priority of a language.
 * @private
 */

function getLanguagePriority(language, accepted, index) {
  var priority = {o: -1, q: 0, s: 0};

  for (var i = 0; i < accepted.length; i++) {
    var spec = specify(language, accepted[i], index);

    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
      priority = spec;
    }
  }

  return priority;
}

/**
 * Get the specificity of the language.
 * @private
 */

function specify(language, spec, index) {
  var p = parseLanguage(language)
  if (!p) return null;
  var s = 0;
  if(spec.full.toLowerCase() === p.full.toLowerCase()){
    s |= 4;
  } else if (spec.prefix.toLowerCase() === p.full.toLowerCase()) {
    s |= 2;
  } else if (spec.full.toLowerCase() === p.prefix.toLowerCase()) {
    s |= 1;
  } else if (spec.full !== '*' ) {
    return null
  }

  return {
    i: index,
    o: spec.i,
    q: spec.q,
    s: s
  }
};

/**
 * Get the preferred languages from an Accept-Language header.
 * @public
 */

function preferredLanguages(accept, provided) {
  // RFC 2616 sec 14.4: no header = *
  var accepts = parseAcceptLanguage(accept === undefined ? '*' : accept || '');

  if (!provided) {
    // sorted list of all languages
    return accepts
      .filter(isQuality)
      .sort(compareSpecs)
      .map(getFullLanguage);
  }

  var priorities = provided.map(function getPriority(type, index) {
    return getLanguagePriority(type, accepts, index);
  });

  // sorted list of accepted languages
  return priorities.filter(isQuality).sort(compareSpecs).map(function getLanguage(priority) {
    return provided[priorities.indexOf(priority)];
  });
}

/**
 * Compare two specs.
 * @private
 */

function compareSpecs(a, b) {
  return (b.q - a.q) || (b.s - a.s) || (a.o - b.o) || (a.i - b.i) || 0;
}

/**
 * Get full language string.
 * @private
 */

function getFullLanguage(spec) {
  return spec.full;
}

/**
 * Check if a spec has any quality.
 * @private
 */

function isQuality(spec) {
  return spec.q > 0;
}


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

module.exports = preferredMediaTypes;
module.exports.preferredMediaTypes = preferredMediaTypes;

/**
 * Module variables.
 * @private
 */

var simpleMediaTypeRegExp = /^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;

/**
 * Parse the Accept header.
 * @private
 */

function parseAccept(accept) {
  var accepts = splitMediaTypes(accept);

  for (var i = 0, j = 0; i < accepts.length; i++) {
    var mediaType = parseMediaType(accepts[i].trim(), i);

    if (mediaType) {
      accepts[j++] = mediaType;
    }
  }

  // trim accepts
  accepts.length = j;

  return accepts;
}

/**
 * Parse a media type from the Accept header.
 * @private
 */

function parseMediaType(str, i) {
  var match = simpleMediaTypeRegExp.exec(str);
  if (!match) return null;

  var params = Object.create(null);
  var q = 1;
  var subtype = match[2];
  var type = match[1];

  if (match[3]) {
    var kvps = splitParameters(match[3]).map(splitKeyValuePair);

    for (var j = 0; j < kvps.length; j++) {
      var pair = kvps[j];
      var key = pair[0].toLowerCase();
      var val = pair[1];

      // get the value, unwrapping quotes
      var value = val && val[0] === '"' && val[val.length - 1] === '"'
        ? val.substr(1, val.length - 2)
        : val;

      if (key === 'q') {
        q = parseFloat(value);
        break;
      }

      // store parameter
      params[key] = value;
    }
  }

  return {
    type: type,
    subtype: subtype,
    params: params,
    q: q,
    i: i
  };
}

/**
 * Get the priority of a media type.
 * @private
 */

function getMediaTypePriority(type, accepted, index) {
  var priority = {o: -1, q: 0, s: 0};

  for (var i = 0; i < accepted.length; i++) {
    var spec = specify(type, accepted[i], index);

    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
      priority = spec;
    }
  }

  return priority;
}

/**
 * Get the specificity of the media type.
 * @private
 */

function specify(type, spec, index) {
  var p = parseMediaType(type);
  var s = 0;

  if (!p) {
    return null;
  }

  if(spec.type.toLowerCase() == p.type.toLowerCase()) {
    s |= 4
  } else if(spec.type != '*') {
    return null;
  }

  if(spec.subtype.toLowerCase() == p.subtype.toLowerCase()) {
    s |= 2
  } else if(spec.subtype != '*') {
    return null;
  }

  var keys = Object.keys(spec.params);
  if (keys.length > 0) {
    if (keys.every(function (k) {
      return spec.params[k] == '*' || (spec.params[k] || '').toLowerCase() == (p.params[k] || '').toLowerCase();
    })) {
      s |= 1
    } else {
      return null
    }
  }

  return {
    i: index,
    o: spec.i,
    q: spec.q,
    s: s,
  }
}

/**
 * Get the preferred media types from an Accept header.
 * @public
 */

function preferredMediaTypes(accept, provided) {
  // RFC 2616 sec 14.2: no header = */*
  var accepts = parseAccept(accept === undefined ? '*/*' : accept || '');

  if (!provided) {
    // sorted list of all types
    return accepts
      .filter(isQuality)
      .sort(compareSpecs)
      .map(getFullType);
  }

  var priorities = provided.map(function getPriority(type, index) {
    return getMediaTypePriority(type, accepts, index);
  });

  // sorted list of accepted types
  return priorities.filter(isQuality).sort(compareSpecs).map(function getType(priority) {
    return provided[priorities.indexOf(priority)];
  });
}

/**
 * Compare two specs.
 * @private
 */

function compareSpecs(a, b) {
  return (b.q - a.q) || (b.s - a.s) || (a.o - b.o) || (a.i - b.i) || 0;
}

/**
 * Get full type string.
 * @private
 */

function getFullType(spec) {
  return spec.type + '/' + spec.subtype;
}

/**
 * Check if a spec has any quality.
 * @private
 */

function isQuality(spec) {
  return spec.q > 0;
}

/**
 * Count the number of quotes in a string.
 * @private
 */

function quoteCount(string) {
  var count = 0;
  var index = 0;

  while ((index = string.indexOf('"', index)) !== -1) {
    count++;
    index++;
  }

  return count;
}

/**
 * Split a key value pair.
 * @private
 */

function splitKeyValuePair(str) {
  var index = str.indexOf('=');
  var key;
  var val;

  if (index === -1) {
    key = str;
  } else {
    key = str.substr(0, index);
    val = str.substr(index + 1);
  }

  return [key, val];
}

/**
 * Split an Accept header into media types.
 * @private
 */

function splitMediaTypes(accept) {
  var accepts = accept.split(',');

  for (var i = 1, j = 0; i < accepts.length; i++) {
    if (quoteCount(accepts[j]) % 2 == 0) {
      accepts[++j] = accepts[i];
    } else {
      accepts[j] += ',' + accepts[i];
    }
  }

  // trim accepts
  accepts.length = j + 1;

  return accepts;
}

/**
 * Split a string of parameters.
 * @private
 */

function splitParameters(str) {
  var parameters = str.split(';');

  for (var i = 1, j = 0; i < parameters.length; i++) {
    if (quoteCount(parameters[j]) % 2 == 0) {
      parameters[++j] = parameters[i];
    } else {
      parameters[j] += ';' + parameters[i];
    }
  }

  // trim parameters
  parameters.length = j + 1;

  for (var i = 0; i < parameters.length; i++) {
    parameters[i] = parameters[i].trim();
  }

  return parameters;
}


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * parseurl
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 */

var url = __webpack_require__(26)
var parse = url.parse
var Url = url.Url

/**
 * Pattern for a simple path case.
 * See: https://github.com/joyent/node/pull/7878
 */

var simplePathRegExp = /^(\/\/?(?!\/)[^\?#\s]*)(\?[^#\s]*)?$/

/**
 * Exports.
 */

module.exports = parseurl
module.exports.original = originalurl

/**
 * Parse the `req` url with memoization.
 *
 * @param {ServerRequest} req
 * @return {Object}
 * @api public
 */

function parseurl(req) {
  var url = req.url

  if (url === undefined) {
    // URL is undefined
    return undefined
  }

  var parsed = req._parsedUrl

  if (fresh(url, parsed)) {
    // Return cached URL parse
    return parsed
  }

  // Parse the URL
  parsed = fastparse(url)
  parsed._raw = url

  return req._parsedUrl = parsed
};

/**
 * Parse the `req` original url with fallback and memoization.
 *
 * @param {ServerRequest} req
 * @return {Object}
 * @api public
 */

function originalurl(req) {
  var url = req.originalUrl

  if (typeof url !== 'string') {
    // Fallback
    return parseurl(req)
  }

  var parsed = req._parsedOriginalUrl

  if (fresh(url, parsed)) {
    // Return cached URL parse
    return parsed
  }

  // Parse the URL
  parsed = fastparse(url)
  parsed._raw = url

  return req._parsedOriginalUrl = parsed
};

/**
 * Parse the `str` url with fast-path short-cut.
 *
 * @param {string} str
 * @return {Object}
 * @api private
 */

function fastparse(str) {
  // Try fast path regexp
  // See: https://github.com/joyent/node/pull/7878
  var simplePath = typeof str === 'string' && simplePathRegExp.exec(str)

  // Construct simple URL
  if (simplePath) {
    var pathname = simplePath[1]
    var search = simplePath[2] || null
    var url = Url !== undefined
      ? new Url()
      : {}
    url.path = str
    url.href = str
    url.pathname = pathname
    url.search = search
    url.query = search && search.substr(1)

    return url
  }

  return parse(str)
}

/**
 * Determine if parsed is still fresh for url.
 *
 * @param {string} url
 * @param {object} parsedUrl
 * @return {boolean}
 * @api private
 */

function fresh(url, parsedUrl) {
  return typeof parsedUrl === 'object'
    && parsedUrl !== null
    && (Url === undefined || parsedUrl instanceof Url)
    && parsedUrl._raw === url
}


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function posix(path) {
	return path.charAt(0) === '/';
}

function win32(path) {
	// https://github.com/nodejs/node/blob/b3fcc245fb25539909ef1d5eaa01dbf92e168633/lib/path.js#L56
	var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
	var result = splitDeviceRe.exec(path);
	var device = result[1] || '';
	var isUnc = Boolean(device && device.charAt(1) !== ':');

	// UNC paths are always absolute
	return Boolean(result[2] || isUnc);
}

module.exports = process.platform === 'win32' ? win32 : posix;
module.exports.posix = posix;
module.exports.win32 = win32;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var isarray = __webpack_require__(81)

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp
module.exports.parse = parse
module.exports.compile = compile
module.exports.tokensToFunction = tokensToFunction
module.exports.tokensToRegExp = tokensToRegExp

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var defaultDelimiter = options && options.delimiter || '/'
  var res

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      continue
    }

    var next = str[index]
    var prefix = res[2]
    var name = res[3]
    var capture = res[4]
    var group = res[5]
    var modifier = res[6]
    var asterisk = res[7]

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
    }

    var partial = prefix != null && next != null && next !== prefix
    var repeat = modifier === '+' || modifier === '*'
    var optional = modifier === '?' || modifier === '*'
    var delimiter = res[2] || defaultDelimiter
    var pattern = capture || group

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    })
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index)
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path)
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
    }
  }

  return function (obj, opts) {
    var path = ''
    var data = obj || {}
    var options = opts || {}
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token

        continue
      }

      var value = data[token.name]
      var segment

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j])

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value)

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      })
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options)
    keys = []
  }

  options = options || {}

  var strict = options.strict
  var end = options.end !== false
  var route = ''

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
    } else {
      var prefix = escapeString(token.prefix)
      var capture = '(?:' + token.pattern + ')'

      keys.push(token)

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*'
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?'
        } else {
          capture = prefix + '(' + capture + ')?'
        }
      } else {
        capture = prefix + '(' + capture + ')'
      }

      route += capture
    }
  }

  var delimiter = escapeString(options.delimiter || '/')
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?'
  }

  if (end) {
    route += '$'
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)'
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options)
    keys = []
  }

  options = options || {}

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}


/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * http-errors
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var setPrototypeOf = __webpack_require__(83)
var statuses = __webpack_require__(4)
var inherits = __webpack_require__(18)

/**
 * Module exports.
 * @public
 */

module.exports = createError
module.exports.HttpError = createHttpErrorConstructor()

// Populate exports for all constructors
populateConstructorExports(module.exports, statuses.codes, module.exports.HttpError)

/**
 * Create a new HTTP Error.
 *
 * @returns {Error}
 * @public
 */

function createError () {
  // so much arity going on ~_~
  var err
  var msg
  var status = 500
  var props = {}
  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i]
    if (arg instanceof Error) {
      err = arg
      status = err.status || err.statusCode || status
      continue
    }
    switch (typeof arg) {
      case 'string':
        msg = arg
        break
      case 'number':
        status = arg
        break
      case 'object':
        props = arg
        break
    }
  }

  if (typeof status !== 'number' || !statuses[status]) {
    status = 500
  }

  // constructor
  var HttpError = createError[status]

  if (!err) {
    // create error
    err = HttpError
      ? new HttpError(msg)
      : new Error(msg || statuses[status])
    Error.captureStackTrace(err, createError)
  }

  if (!HttpError || !(err instanceof HttpError)) {
    // add properties to generic error
    err.expose = status < 500
    err.status = err.statusCode = status
  }

  for (var key in props) {
    if (key !== 'status' && key !== 'statusCode') {
      err[key] = props[key]
    }
  }

  return err
}

/**
 * Create HTTP error abstract base class.
 * @private
 */

function createHttpErrorConstructor () {
  function HttpError () {
    throw new TypeError('cannot construct abstract class')
  }

  inherits(HttpError, Error)

  return HttpError
}

/**
 * Create a constructor for a client error.
 * @private
 */

function createClientErrorConstructor (HttpError, name, code) {
  var className = name.match(/Error$/) ? name : name + 'Error'

  function ClientError (message) {
    // create the error object
    var err = new Error(message != null ? message : statuses[code])

    // capture a stack trace to the construction point
    Error.captureStackTrace(err, ClientError)

    // adjust the [[Prototype]]
    setPrototypeOf(err, ClientError.prototype)

    // redefine the error name
    Object.defineProperty(err, 'name', {
      enumerable: false,
      configurable: true,
      value: className,
      writable: true
    })

    return err
  }

  inherits(ClientError, HttpError)

  ClientError.prototype.status = code
  ClientError.prototype.statusCode = code
  ClientError.prototype.expose = true

  return ClientError
}

/**
 * Create a constructor for a server error.
 * @private
 */

function createServerErrorConstructor (HttpError, name, code) {
  var className = name.match(/Error$/) ? name : name + 'Error'

  function ServerError (message) {
    // create the error object
    var err = new Error(message != null ? message : statuses[code])

    // capture a stack trace to the construction point
    Error.captureStackTrace(err, ServerError)

    // adjust the [[Prototype]]
    setPrototypeOf(err, ServerError.prototype)

    // redefine the error name
    Object.defineProperty(err, 'name', {
      enumerable: false,
      configurable: true,
      value: className,
      writable: true
    })

    return err
  }

  inherits(ServerError, HttpError)

  ServerError.prototype.status = code
  ServerError.prototype.statusCode = code
  ServerError.prototype.expose = false

  return ServerError
}

/**
 * Populate the exports object with constructors for every error class.
 * @private
 */

function populateConstructorExports (exports, codes, HttpError) {
  codes.forEach(function forEachCode (code) {
    var CodeError
    var name = toIdentifier(statuses[code])

    switch (String(code).charAt(0)) {
      case '4':
        CodeError = createClientErrorConstructor(HttpError, name, code)
        break
      case '5':
        CodeError = createServerErrorConstructor(HttpError, name, code)
        break
    }

    if (CodeError) {
      // export the constructor
      exports[code] = CodeError
      exports[name] = CodeError
    }
  })

  // backwards-compatibility
  exports["I'mateapot"] = exports.ImATeapot
}

/**
 * Convert a string of words to a JavaScript identifier.
 * @private
 */

function toIdentifier (str) {
  return str.split(' ').map(function (token) {
    return token.slice(0, 1).toUpperCase() + token.slice(1)
  }).join('').replace(/[^ _0-9a-z]/gi, '')
}


/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = Object.setPrototypeOf || ({__proto__:[]} instanceof Array ? setProtoOf : mixinProperties);

function setProtoOf(obj, proto) {
	obj.__proto__ = proto;
	return obj;
}

function mixinProperties(obj, proto) {
	for (var prop in proto) {
		obj[prop] = proto[prop];
	}
	return obj;
}


/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = Object.setPrototypeOf || ({__proto__:[]} instanceof Array ? setProtoOf : mixinProperties);

function setProtoOf(obj, proto) {
	obj.__proto__ = proto;
	return obj;
}

function mixinProperties(obj, proto) {
	for (var prop in proto) {
		if (!obj.hasOwnProperty(prop)) {
			obj[prop] = proto[prop];
		}
	}
	return obj;
}


/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = {
	"100": "Continue",
	"101": "Switching Protocols",
	"102": "Processing",
	"200": "OK",
	"201": "Created",
	"202": "Accepted",
	"203": "Non-Authoritative Information",
	"204": "No Content",
	"205": "Reset Content",
	"206": "Partial Content",
	"207": "Multi-Status",
	"208": "Already Reported",
	"226": "IM Used",
	"300": "Multiple Choices",
	"301": "Moved Permanently",
	"302": "Found",
	"303": "See Other",
	"304": "Not Modified",
	"305": "Use Proxy",
	"306": "(Unused)",
	"307": "Temporary Redirect",
	"308": "Permanent Redirect",
	"400": "Bad Request",
	"401": "Unauthorized",
	"402": "Payment Required",
	"403": "Forbidden",
	"404": "Not Found",
	"405": "Method Not Allowed",
	"406": "Not Acceptable",
	"407": "Proxy Authentication Required",
	"408": "Request Timeout",
	"409": "Conflict",
	"410": "Gone",
	"411": "Length Required",
	"412": "Precondition Failed",
	"413": "Payload Too Large",
	"414": "URI Too Long",
	"415": "Unsupported Media Type",
	"416": "Range Not Satisfiable",
	"417": "Expectation Failed",
	"418": "I'm a teapot",
	"421": "Misdirected Request",
	"422": "Unprocessable Entity",
	"423": "Locked",
	"424": "Failed Dependency",
	"425": "Unordered Collection",
	"426": "Upgrade Required",
	"428": "Precondition Required",
	"429": "Too Many Requests",
	"431": "Request Header Fields Too Large",
	"451": "Unavailable For Legal Reasons",
	"500": "Internal Server Error",
	"501": "Not Implemented",
	"502": "Bad Gateway",
	"503": "Service Unavailable",
	"504": "Gateway Timeout",
	"505": "HTTP Version Not Supported",
	"506": "Variant Also Negotiates",
	"507": "Insufficient Storage",
	"508": "Loop Detected",
	"509": "Bandwidth Limit Exceeded",
	"510": "Not Extended",
	"511": "Network Authentication Required"
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {


var thenify = __webpack_require__(87)

module.exports = thenifyAll
thenifyAll.withCallback = withCallback
thenifyAll.thenify = thenify

/**
 * Promisifies all the selected functions in an object.
 *
 * @param {Object} source the source object for the async functions
 * @param {Object} [destination] the destination to set all the promisified methods
 * @param {Array} [methods] an array of method names of `source`
 * @return {Object}
 * @api public
 */

function thenifyAll(source, destination, methods) {
  return promisifyAll(source, destination, methods, thenify)
}

/**
 * Promisifies all the selected functions in an object and backward compatible with callback.
 *
 * @param {Object} source the source object for the async functions
 * @param {Object} [destination] the destination to set all the promisified methods
 * @param {Array} [methods] an array of method names of `source`
 * @return {Object}
 * @api public
 */

function withCallback(source, destination, methods) {
  return promisifyAll(source, destination, methods, thenify.withCallback)
}

function promisifyAll(source, destination, methods, promisify) {
  if (!destination) {
    destination = {};
    methods = Object.keys(source)
  }

  if (Array.isArray(destination)) {
    methods = destination
    destination = {}
  }

  if (!methods) {
    methods = Object.keys(source)
  }

  if (typeof source === 'function') destination = promisify(source)

  methods.forEach(function (name) {
    // promisify only if it's a function
    if (typeof source[name] === 'function') destination[name] = promisify(source[name])
  })

  // proxy the rest
  Object.keys(source).forEach(function (name) {
    if (deprecated(source, name)) return
    if (destination[name]) return
    destination[name] = source[name]
  })

  return destination
}

function deprecated(source, name) {
  var desc = Object.getOwnPropertyDescriptor(source, name)
  if (!desc || !desc.get) return false
  if (desc.get.name === 'deprecated') return true
  return false
}


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {


var Promise = __webpack_require__(7)
var assert = __webpack_require__(1)

module.exports = thenify

/**
 * Turn async functions into promises
 *
 * @param {Function} $$__fn__$$
 * @return {Function}
 * @api public
 */

function thenify($$__fn__$$) {
  assert(typeof $$__fn__$$ === 'function')
  return eval(createWrapper($$__fn__$$.name))
}

/**
 * Turn async functions into promises and backward compatible with callback
 *
 * @param {Function} $$__fn__$$
 * @return {Function}
 * @api public
 */

thenify.withCallback = function ($$__fn__$$) {
  assert(typeof $$__fn__$$ === 'function')
  return eval(createWrapper($$__fn__$$.name, true))
}

function createCallback(resolve, reject) {
  return function(err, value) {
    if (err) return reject(err)
    var length = arguments.length
    if (length <= 2) return resolve(value)
    var values = new Array(length - 1)
    for (var i = 1; i < length; ++i) values[i - 1] = arguments[i]
    resolve(values)
  }
}

function createWrapper(name, withCallback) {
  name = (name || '').replace(/\s|bound(?!$)/g, '')
  withCallback = withCallback ?
    'var lastType = typeof arguments[len - 1]\n'
    + 'if (lastType === "function") return $$__fn__$$.apply(self, arguments)\n'
   : ''

  return '(function ' + name + '() {\n'
    + 'var self = this\n'
    + 'var len = arguments.length\n'
    + withCallback
    + 'var args = new Array(len + 1)\n'
    + 'for (var i = 0; i < len; ++i) args[i] = arguments[i]\n'
    + 'var lastIndex = i\n'
    + 'return new Promise(function (resolve, reject) {\n'
      + 'args[lastIndex] = createCallback(resolve, reject)\n'
      + '$$__fn__$$.apply(self, args)\n'
    + '})\n'
  + '})'
}


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * vary
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 */

module.exports = vary;
module.exports.append = append;

/**
 * RegExp to match field-name in RFC 7230 sec 3.2
 *
 * field-name    = token
 * token         = 1*tchar
 * tchar         = "!" / "#" / "$" / "%" / "&" / "'" / "*"
 *               / "+" / "-" / "." / "^" / "_" / "`" / "|" / "~"
 *               / DIGIT / ALPHA
 *               ; any VCHAR, except delimiters
 */

var fieldNameRegExp = /^[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+$/

/**
 * Append a field to a vary header.
 *
 * @param {String} header
 * @param {String|Array} field
 * @return {String}
 * @api public
 */

function append(header, field) {
  if (typeof header !== 'string') {
    throw new TypeError('header argument is required');
  }

  if (!field) {
    throw new TypeError('field argument is required');
  }

  // get fields array
  var fields = !Array.isArray(field)
    ? parse(String(field))
    : field;

  // assert on invalid field names
  for (var i = 0; i < fields.length; i++) {
    if (!fieldNameRegExp.test(fields[i])) {
      throw new TypeError('field argument contains an invalid header name');
    }
  }

  // existing, unspecified vary
  if (header === '*') {
    return header;
  }

  // enumerate current values
  var val = header;
  var vals = parse(header.toLowerCase());

  // unspecified vary
  if (fields.indexOf('*') !== -1 || vals.indexOf('*') !== -1) {
    return '*';
  }

  for (var i = 0; i < fields.length; i++) {
    var fld = fields[i].toLowerCase();

    // append value (case-preserving)
    if (vals.indexOf(fld) === -1) {
      vals.push(fld);
      val = val
        ? val + ', ' + fields[i]
        : fields[i];
    }
  }

  return val;
}

/**
 * Parse a vary header into an array.
 *
 * @param {String} header
 * @return {Array}
 * @api private
 */

function parse(header) {
  return header.trim().split(/ *, */);
}

/**
 * Mark that a request is varied on a header field.
 *
 * @param {Object} res
 * @param {String|Array} field
 * @api public
 */

function vary(res, field) {
  if (!res || !res.getHeader || !res.setHeader) {
    // quack quack
    throw new TypeError('res argument is required');
  }

  // get existing header
  var val = res.getHeader('Vary') || ''
  var header = Array.isArray(val)
    ? val.join(', ')
    : String(val);

  // set new header
  if ((val = append(header, field))) {
    res.setHeader('Vary', val);
  }
}


/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports = require("buffer");

/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = require("constants");

/***/ }),
/* 91 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports = require("querystring");

/***/ }),
/* 93 */
/***/ (function(module, exports) {

module.exports = require("tty");

/***/ })
/******/ ]);