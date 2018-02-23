import {HandlerFn, HandlerReturn, response} from '@aexol/syncano-middleware';
import Server, { Context } from '@syncano/core';
import get from 'lodash.get';

export interface IRootAccount {
  message?: string;
  condFn?: (ctx: Context, syncano: Server) => boolean;
}

/**
 * Root account check middleware.
 * @param {Function} fn - Next function in chain.
 * @param {Object} opts - Additional options. Optional.
 * @param {String} opts.message - Custom error message if not root account.
 * @param {Function} opts.condFn - Check for root only if function evaluates to true.
 *
 * @return {Object}
 * @public
 */
export function rootAccount(fn: HandlerFn,
                            opts: IRootAccount = {}) {
  return async (ctx: Context, syncano: Server): Promise<HandlerReturn> => {
    const message = opts.message || '';
    const condFn = opts.condFn || ((c: Context, s: Server) => true);
    if (condFn && !get(ctx, 'meta.admin')) {
      return response.json({message: opts.message}, 403);
    }
    return fn(ctx, syncano);
  };
}
