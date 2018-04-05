import { HandlerFn, response  } from '@aexol/syncano-middleware';
import Server, { Context } from '@syncano/core';
import get from 'lodash.get';

/**
 * Checks if request is allowed based on request method.
 * @param {Function|Object} fn - Either next function in chain or object with
 *  `key: value` pairs of method and handler function for method type.
 * @param {Array} allowed - List of allowed methods in case of fn being function. Optional.
 * @example
 * ```javascript
 * import serve, {response} from '@aexol/syncano-middleware'
 * import {allowedMethods} from '@aexol/syncano-middleware-common'
 *
 * async function hello(ctx, syncano) {
 *     return response.success({message: `Hello, ${ctx.meta.user.username}`)
 * }
 *
 * export default ctx => serve(ctx, allowedMethods(hello, ['GET']))
 * ```
 * @example
 * ```javascript
 * import serve, {response} from '@aexol/syncano-middleware'
 * import {allowedMethods} from '@aexol/syncano-middleware-common'
 *
 * async function hello(ctx, syncano) {
 *     return response.success({message: `Hello, ${ctx.meta.user.username}`)
 * }
 *
 * export default ctx => serve(ctx, allowedMethods({
 *  GET: hello,
 *  POST: hello
 * }))
 * ```
 * @returns {Function}
 * @public
 */
export function allowedMethods( fn: HandlerFn | {
                                  [k: string]: HandlerFn | undefined,
                                },
                                allowed?: string[]): HandlerFn {
  return async (ctx: Context, syncano: Server) => {
    let handlerFn: HandlerFn|undefined;
    const meth = get(ctx, 'meta.request.REQUEST_METHOD');
    if (typeof fn === 'function') {
      if (typeof allowed === 'undefined') {
        throw new Error('Missing allowed methods list');
      }
      if (!allowed.find(meth)) {
        return response.json(
          {
            details: {
              allowed_methods: allowed,
            },
            error: `Method ${meth} not allowed`,
          },
          405,
        );
      }
      handlerFn = fn;
    } else {
      handlerFn = fn[meth];
      if (!handlerFn) {
        return response.json(
          {
            details: {
              allowed_methods: Object.keys(fn),
            },
            error: `Method ${meth} not allowed`,
          },
          405,
        );
      }
    }
    return handlerFn(ctx, syncano);
  };
}
