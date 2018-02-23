import {HandlerFn, HandlerReturn, NamedResponse, response} from '@aexol/syncano-middleware';
import Server, { Context } from '@syncano/core';
import get from 'lodash.get';

export interface IReplaceBuffersOpts {
  replaceFn?: (buffer: Buffer) => any;
  exclude?: string[];
  encoding?: string;
  outputEncoding?: string;
}

function defaultReplace(b: Buffer,
                        inputEncoding: string,
                        outputEncoding: string = 'ascii') {
  return Buffer.from(b.toString(), inputEncoding).toString(outputEncoding);
}

/**
 * Replace all buffers in socket args.
 * @param {Function} fn - Handler function
 * @param {Object} opts - Aditional opts. Optional
 * @param {Function} opts.replaceFn - If set, will be used to replace buffer contents instead of default behaviour.
 * @param {Array} opts.exclude - List of args to skip from replacing.
 * @param {String} opts.encoding - Input encoding of buffer in args.
 * @param {String} opts.inputEncoding - Output encoding of buffer in args.
 *
 * Unless, replaceFn was set, this middleware replaces all buffers with it's
 * string content in place. Modifies ctx.args.
 *
 * @example
 * ```javascript
 * import serve, {response} from '@aexol/syncano-middleware'
 * import {replaceBuffers} from '@aexol/syncano-middleware-common'
 *
 * async function hello(ctx, syncano) {
 *     return response.success({message: `Hello, ${ctx.meta.user.username}`)
 * }
 *
 * export default ctx => serve(ctx, replaceBuffers(hello))
 * ```
 * @returns {Object}
 * @public
 */
export function replaceBuffers( fn: HandlerFn,
                                opts: IReplaceBuffersOpts = {}) {
  return async (ctx: Context, syncano: Server): Promise<HandlerReturn> => {
    const encoding = opts.encoding || 'ascii';
    const replaceFn = opts.replaceFn ||
                      ((b: Buffer) => defaultReplace(b,
                        encoding,
                        opts.outputEncoding));
    const exclude = opts.exclude || [];
    if (ctx.args) {
      const args = ctx.args;
      for (const k of Object.keys(args)) {
        if (exclude.find(v => v === args[k])) {
          continue;
        }
        if (Buffer.isBuffer(args[k])) {
          args[k] = replaceFn(args[k]);
        }
      }
    }
    return fn(ctx, syncano);
  };
}
