import { HandlerFn } from '@aexol/syncano-middleware';
import Server, { Context } from '@syncano/core';
import get from 'lodash.get';

/**
 * Parses args in GET request as json if possible. If not, leaves them unchanged.
 * @param {Function} fn - Next function in request chain
 * @example
 * ```javascript
 * import serve, {response} from '@aexol/syncano-middleware'
 * import {parseGETFields} from '@aexol/syncano-middleware-common'
 *
 * async function hello(ctx, syncano) {
 *     return response.success({message: `Hello, ${ctx.meta.user.username}`)
 * }
 *
 * export default ctx => serve(ctx, parseGETFields(hello))
 * ```
 * @returns {Function}
 * @public
 */
export function parseGETFields(fn: HandlerFn): HandlerFn {
  return async (ctx: Context, syncano: Server) => {
    if (get(ctx, 'meta.request.REQUEST_METHOD') === 'GET') {
      const args = ctx.args || {};
      ctx.args = Object.keys(args).reduce((acc: {[k: string]: any}, val: any) => {
        try {
          acc[val] = JSON.parse(args[val]);
        } catch (e) {
          // If not parsable, leave it.
          acc[val] = args[val];
        }
        return acc;
      }, {});
    }
    return fn(ctx, syncano);
  };
}
