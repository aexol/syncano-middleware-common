import { HandlerFn, HandlerReturn } from '@aexol/syncano-middleware';
import Server, { Context } from '@syncano/core';

/**
 * Attempts to cast certain fields in request to number.
 * Can be useful to handling both GET and POST input on endpoint
 * as GET endpoints will always have a string.
 *
 * @param {function} fn Next function in chain
 * @param {Array} fields fields to cast to number
 */
export function toNumber(fn: HandlerFn, fields: string[]) {
  return async (ctx: Context, syncano: Server) => {
    const args = ctx.args || {};
    for (const k of fields) {
      if (k in args) {
        if (typeof args[k] === 'number') {
          continue;
        }
        if (typeof args[k] === 'string' && !isNaN(+args[k])) {
          args[k] = +args[k];
        }
      }
    }
    return fn(ctx, syncano);
  };
}
