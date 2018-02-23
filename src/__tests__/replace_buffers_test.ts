import { IResponse } from '@aexol/syncano-middleware';
import Server, {Context} from '@syncano/core';
import {replaceBuffers} from '../replace_buffers';

describe('buffers replace test', () => {
  it('replace buffers', async () => {
    const buffString = 'buffer content';
    const ctx: Context = {args: {buffArg: Buffer.from(buffString),
                        buffArg2: Buffer.from(buffString)}};
    const mockFn = jest.fn();
    mockFn.mockReturnValue(200);
    expect(await replaceBuffers(mockFn)(ctx, new Server())).toBe(200);
    expect(mockFn.mock.calls.length).toBe(1);
    expect(mockFn.mock.calls[0][0].args.buffArg).toBe(buffString);
    expect(typeof mockFn.mock.calls[0][0].args.buffArg).toEqual('string');
    expect(typeof mockFn.mock.calls[0][0].args.buffArg2).toEqual('string');
  });
  it('replace buffers custom', async () => {
    const buffString = 'buffer content';
    const b64BuffString = Buffer.from(buffString).toString('base64');
    const replaceFn = (b: Buffer) => {
      const b64String = b.toString();
      return Buffer.from(b64String, 'base64').toString('ascii');
    };
    const ctx: Context = {args: {buffArg: Buffer.from(b64BuffString),
                        buffArg2: Buffer.from(b64BuffString)}};
    const mockFn = jest.fn();
    mockFn.mockReturnValue(200);
    expect(await replaceBuffers(mockFn, {replaceFn})(ctx, new Server())).toBe(200);
    expect(mockFn.mock.calls.length).toBe(1);
    expect(mockFn.mock.calls[0][0].args.buffArg).toBe(buffString);
    expect(typeof mockFn.mock.calls[0][0].args.buffArg).toEqual('string');
    expect(typeof mockFn.mock.calls[0][0].args.buffArg2).toEqual('string');
  });
  it('replace buffers base64 input', async () => {
    const buffString = 'buffer content';
    const b64BuffString = Buffer.from(buffString).toString('base64');
    const encoding = 'base64';
    const ctx: Context = {args: {buffArg: Buffer.from(b64BuffString),
                        buffArg2: Buffer.from(b64BuffString)}};
    const mockFn = jest.fn();
    mockFn.mockReturnValue(200);
    expect(await replaceBuffers(mockFn, {encoding})(ctx, new Server())).toBe(200);
    expect(mockFn.mock.calls.length).toBe(1);
    expect(mockFn.mock.calls[0][0].args.buffArg).toBe(buffString);
    expect(typeof mockFn.mock.calls[0][0].args.buffArg).toEqual('string');
    expect(typeof mockFn.mock.calls[0][0].args.buffArg2).toEqual('string');
  });
  it('replace buffers base64 input', async () => {
    const buffString = 'buffer content';
    const b64BuffString = Buffer.from(buffString).toString('base64');
    const encoding = 'base64';
    const outputEncoding = 'utf-8';
    const ctx: Context = {args: {buffArg: Buffer.from(b64BuffString),
                        buffArg2: Buffer.from(b64BuffString)}};
    const mockFn = jest.fn();
    mockFn.mockReturnValue(200);
    expect(await replaceBuffers(mockFn, {encoding, outputEncoding})(ctx, new Server())).toBe(200);
    expect(mockFn.mock.calls.length).toBe(1);
    expect(mockFn.mock.calls[0][0].args.buffArg).toBe(buffString);
    expect(typeof mockFn.mock.calls[0][0].args.buffArg).toEqual('string');
    expect(typeof mockFn.mock.calls[0][0].args.buffArg2).toEqual('string');
  });
});
