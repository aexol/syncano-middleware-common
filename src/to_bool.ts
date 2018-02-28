import { HandlerFn } from '@aexol/syncano-middleware';
import Server, { Context } from '@syncano/core';

/**
 * Attempts to cast certain fields in request to bool.
 * Can be useful to handling both GET and POST input on endpoint
 * as GET endpoints will always have a string.
 *
 * Fields that are either `true` or `'true'` will evaluate to true.
 * Everything else will be considered false.
 *
 * @param {function} fn Next function in chain
 * @param {Array} fields fields to cast to bool
 */
export function toBool(fn: HandlerFn, fields: string[]) {
  return async (ctx: Context, syncano: Server) => {
    const args = ctx.args || {};
    for (const k of fields) {
      if (k in args) {
        if (typeof args[k] === 'boolean') {
          continue;
        }
        if (typeof args[k] === 'string' && args[k] === 'true') {
          args[k] = true;
        }
        args[k] = false;
      }
    }
  };
}
