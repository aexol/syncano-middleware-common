# Syncano Middleware Common

## About
Collection of common utilities for sockets in syncano that can be used in conjunction with @aexol/syncano-middleware lib.

## Installation
npm install @aexol/syncano-middleware-common

## Usage

## Avilable middleware

* loggedIn
* rootAccount
* replaceBuffers

## API Reference
## Modules

<dl>
<dt><a href="#module_@aexol/syncano-middleware-common">@aexol/syncano-middleware-common</a></dt>
<dd><p>Common middlewares for syncano.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#loggedIn">loggedIn(fn, opts)</a> ⇒ <code>Object</code></dt>
<dd><p>Checks if user is logged in, returning response with 403 and message if not.</p>
</dd>
<dt><a href="#replaceBuffers">replaceBuffers(fn, opts)</a> ⇒ <code>Object</code></dt>
<dd><p>Replace all buffers in socket args.</p>
</dd>
<dt><a href="#rootAccount">rootAccount(fn, opts)</a> ⇒ <code>Object</code></dt>
<dd><p>Root account check middleware.</p>
</dd>
</dl>

<a name="module_@aexol/syncano-middleware-common"></a>

## @aexol/syncano-middleware-common
Common middlewares for syncano.

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
