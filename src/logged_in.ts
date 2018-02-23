import {HandlerFn, HandlerReturn, response} from '@aexol/syncano-middleware';
import Server, { Context } from '@syncano/core';
import get from 'lodash.get';

export interface ILoggedInOpts {
  message?: string;
}

/**
 * Checks if user is logged in, returning response with 403 and message if not.
 * @param {Function} fn - Next function in request chain
 * @param {Object} opts - Additional options. Optional
 * @param {String} opts.message - Alternative message if user is not logged in.
 *
 * @return {Object}
 * @public
 */
export function loggedIn( fn: HandlerFn,
                          opts: ILoggedInOpts = {}) {
  return async (ctx: Context, syncano: Server): Promise<HandlerReturn> => {
    const message = opts.message || 'You must be logged in to perfrom this action.';
    if (!get(ctx, 'meta.user')) {
      return response.json({message: opts.message}, 403);
    }
    return fn(ctx, syncano);
  };
}
