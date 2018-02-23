import { IResponse } from '@aexol/syncano-middleware';
import Server, {Context} from '@syncano/core';
import {rootAccount} from '../root_acount';

describe('rootAccount middleware test', () => {
  it('test is root', async () => {
    const ctx: Context = {meta: {admin: {username: 'user'}}};
    const mockFn = jest.fn();
    mockFn.mockReturnValue(200);
    expect(await rootAccount(mockFn)(ctx, new Server())).toBe(200);
    expect(mockFn.mock.calls.length).toBe(1);
  });
  it('test is not root', async () => {
    const ctx: Context = {meta: {}};
    const mockFn = jest.fn();
    const resp = await rootAccount(mockFn)(ctx, new Server());
    expect(mockFn.mock.calls.length).toBe(0);
    expect((resp as IResponse).status).toBe(403);
  });
});
