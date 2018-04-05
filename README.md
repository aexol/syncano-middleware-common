# Syncano Middleware Common

## About
Collection of common utilities for sockets in syncano that can be used in conjunction with @aexol/syncano-middleware lib.

## Installation
npm install @aexol/syncano-middleware-common

## Usage

## API Reference
## Modules

<dl>
<dt><a href="#module_@aexol/syncano-middleware-common">@aexol/syncano-middleware-common</a></dt>
<dd><p>Common middlewares for syncano.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#allowedMethods">allowedMethods(fn, allowed)</a> ⇒ <code>function</code></dt>
<dd><p>Checks if request is allowed based on request method.</p>
</dd>
<dt><a href="#loggedIn">loggedIn(fn, opts)</a> ⇒ <code>Object</code></dt>
<dd><p>Checks if user is logged in, returning response with 403 and message if not.</p>
</dd>
<dt><a href="#parseGETFields">parseGETFields(fn)</a> ⇒ <code>function</code></dt>
<dd><p>Parses args in GET request as json if possible. If not, leaves them unchanged.</p>
</dd>
<dt><a href="#replaceBuffers">replaceBuffers(fn, opts)</a> ⇒ <code>Object</code></dt>
<dd><p>Replace all buffers in socket args.</p>
</dd>
<dt><a href="#rootAccount">rootAccount(fn, opts)</a> ⇒ <code>Object</code></dt>
<dd><p>Root account check middleware.</p>
</dd>
<dt><a href="#toBool">toBool(fn, fields)</a></dt>
<dd><p>Attempts to cast certain fields in request to bool.
Can be useful to handling both GET and POST input on endpoint
as GET endpoints will always have a string.</p>
<p>Fields that are either <code>true</code> or <code>&#39;true&#39;</code> will evaluate to true.
Everything else will be considered false.</p>
</dd>
<dt><a href="#toNumber">toNumber(fn, fields)</a></dt>
<dd><p>Attempts to cast certain fields in request to number.
Can be useful to handling both GET and POST input on endpoint
as GET endpoints will always have a string.</p>
</dd>
</dl>

<a name="module_@aexol/syncano-middleware-common"></a>

## @aexol/syncano-middleware-common
Common middlewares for syncano.

<a name="allowedMethods"></a>

## allowedMethods(fn, allowed) ⇒ <code>function</code>
Checks if request is allowed based on request method.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> \| <code>Object</code> | Either next function in chain or object with  `key: value` pairs of method and handler function for method type. |
| allowed | <code>Array</code> | List of allowed methods in case of fn being function. Optional. |

**Example**  
```javascript
import serve, {response} from '@aexol/syncano-middleware'
import {allowedMethods} from '@aexol/syncano-middleware-common'

async function hello(ctx, syncano) {
    return response.success({message: `Hello, ${ctx.meta.user.username}`)
}

export default ctx => serve(ctx, allowedMethods(hello, ['GET']))
```
**Example**  
```javascript
import serve, {response} from '@aexol/syncano-middleware'
import {allowedMethods} from '@aexol/syncano-middleware-common'

async function hello(ctx, syncano) {
    return response.success({message: `Hello, ${ctx.meta.user.username}`)
}

export default ctx => serve(ctx, allowedMethods({
 GET: hello,
 POST: hello
}))
```
<a name="loggedIn"></a>

## loggedIn(fn, opts) ⇒ <code>Object</code>
Checks if user is logged in, returning response with 403 and message if not.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Next function in request chain |
| opts | <code>Object</code> | Additional options. Optional |
| opts.message | <code>String</code> | Alternative message if user is not logged in. |

**Example**  
```javascript
import serve, {response} from '@aexol/syncano-middleware'
import {loggedIn} from '@aexol/syncano-middleware-common'

async function hello(ctx, syncano) {
    return response.success({message: `Hello, ${ctx.meta.user.username}`)
}

export default ctx => serve(ctx, loggedIn(hello))
```
<a name="parseGETFields"></a>

## parseGETFields(fn) ⇒ <code>function</code>
Parses args in GET request as json if possible. If not, leaves them unchanged.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Next function in request chain |

**Example**  
```javascript
import serve, {response} from '@aexol/syncano-middleware'
import {parseGETFields} from '@aexol/syncano-middleware-common'

async function hello(ctx, syncano) {
    return response.success({message: `Hello, ${ctx.meta.user.username}`)
}

export default ctx => serve(ctx, parseGETFields(hello))
```
<a name="replaceBuffers"></a>

## replaceBuffers(fn, opts) ⇒ <code>Object</code>
Replace all buffers in socket args.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Handler function |
| opts | <code>Object</code> | Aditional opts. Optional |
| opts.replaceFn | <code>function</code> | If set, will be used to replace buffer contents instead of default behaviour. |
| opts.exclude | <code>Array</code> | List of args to skip from replacing. |
| opts.encoding | <code>String</code> | Input encoding of buffer in args. |
| opts.inputEncoding | <code>String</code> | Output encoding of buffer in args. Unless, replaceFn was set, this middleware replaces all buffers with it's string content in place. Modifies ctx.args. |

**Example**  
```javascript
import serve, {response} from '@aexol/syncano-middleware'
import {replaceBuffers} from '@aexol/syncano-middleware-common'

async function hello(ctx, syncano) {
    return response.success({message: 'ok'})
}

export default ctx => serve(ctx, replaceBuffers(hello))
```
<a name="rootAccount"></a>

## rootAccount(fn, opts) ⇒ <code>Object</code>
Root account check middleware.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Next function in chain. |
| opts | <code>Object</code> | Additional options. Optional. |
| opts.message | <code>String</code> | Custom error message if not root account. |
| opts.condFn | <code>function</code> | Check for root only if function evaluates to true. |

**Example**  
```javascript
import serve, {response} from '@aexol/syncano-middleware'
import {rootAccount} from '@aexol/syncano-middleware-common'

async function hello(ctx, syncano) {
    return response.success({message: `Hello, ${ctx.meta.admin.email}`)
}

export default ctx => serve(ctx, rootAccount(hello))
```
<a name="toBool"></a>

## toBool(fn, fields)
Attempts to cast certain fields in request to bool.
Can be useful to handling both GET and POST input on endpoint
as GET endpoints will always have a string.

Fields that are either `true` or `'true'` will evaluate to true.
Everything else will be considered false.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Next function in chain |
| fields | <code>Array</code> | fields to cast to bool |

<a name="toNumber"></a>

## toNumber(fn, fields)
Attempts to cast certain fields in request to number.
Can be useful to handling both GET and POST input on endpoint
as GET endpoints will always have a string.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Next function in chain |
| fields | <code>Array</code> | fields to cast to number |

