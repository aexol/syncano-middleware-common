# [@aexol/syncano-middleware-common](https://github.com/aexol/syncano-middleware-common#readme) *0.1.0*

> Collection of common middlewares for syncano sockets.


### lib/logged_in.js


#### loggedIn(fn, opts) 

Checks if user is logged in, returning response with 403 and message if not.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| fn | `Function`  | - Next function in request chain | &nbsp; |
| opts | `Object`  | - Additional options. Optional | &nbsp; |
| opts.message | `String`  | - Alternative message if user is not logged in. | &nbsp; |




##### Returns


- `Object`  




### lib/replace_buffers.js


#### replaceBuffers(fn, opts) 

Replace all buffers in socket args.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| fn | `Function`  | - Handler function | &nbsp; |
| opts | `Object`  | - Aditional opts. Optional | &nbsp; |
| opts.replaceFn | `Function`  | - If set, will be used to replace buffer contents instead of default behaviour. | &nbsp; |
| opts.exclude | `Array`  | - List of args to skip from replacing. | &nbsp; |
| opts.encoding | `String`  | - Input encoding of buffer in args. | &nbsp; |
| opts.inputEncoding | `String`  | - Output encoding of buffer in args. <br>Unless, replaceFn was set, this middleware replaces all buffers with it's<br>string content in place. Modifies ctx.args. | &nbsp; |




##### Returns


- `Object`  




### lib/root_acount.js


#### rootAccount(fn, opts) 

Root account check middleware.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| fn | `Function`  | - Next function in chain. | &nbsp; |
| opts | `Object`  | - Additional options. Optional. | &nbsp; |
| opts.message | `String`  | - Custom error message if not root account. | &nbsp; |
| opts.condFn | `Function`  | - Check for root only if function evaluates to true. | &nbsp; |




##### Returns


- `Object`  




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
