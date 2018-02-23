import { IResponse } from '@aexol/syncano-middleware';
import Server, {Context} from '@syncano/core';
import {loggedIn} from '../logged_in';

describe('loggedIn middleware test', () => {
  it('test logged in', async () => {
    const ctx: Context = {meta: {user: {username: 'user'}}};
    const mockFn = jest.fn();
    mockFn.mockReturnValue(200);
    expect(await loggedIn(mockFn)(ctx, new Server())).toBe(200);
    expect(mockFn.mock.calls.length).toBe(1);
  });
  it('test not logged in', async () => {
    const ctx: Context = {meta: {}};
    const mockFn = jest.fn();
    const resp = await loggedIn(mockFn)(ctx, new Server());
    expect(mockFn.mock.calls.length).toBe(0);
    expect((resp as IResponse).status).toBe(403);
  });
});
