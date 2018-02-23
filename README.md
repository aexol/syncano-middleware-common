# Syncano Middleware Common

## About
Collection of common utilities for sockets in syncano that can be used in conjunction with @aexol/syncano-middleware lib.

## Installation
npm install @aexol/syncano-middleware-common

## Usage
```javascript
import serve, {response} from '@aexol/syncano-middleware'
import {loggedIn} from '@aexol/syncano-middleware-common'

async function hello(ctx, syncano) {
    return response.success({message: `Hello, ${ctx.meta.user.username}`)
}

export default ctx => serve(ctx, loggedIn(hello))
```

## Avilable middleware

* loggedIn
* rootAccount
* replaceBuffers

## Reference
[API](https://github.com/aexol/syncano-middleware-common#documentation)