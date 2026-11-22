import { describe, expect, it } from 'vitest';
import { readApiResponse } from './apiResponse';

describe('readApiResponse', () => {
  it('reads the success envelope', async () => {
    const res = Response.json({ success: true, message: 'ok' });
    expect(await readApiResponse(res)).toEqual({ success: true, message: 'ok', error: undefined });
  });

  it('treats a non-true success and non-string fields as absent', async () => {
    const res = Response.json({ success: 'yes', message: 3, error: 'bad' });
    expect(await readApiResponse(res)).toEqual({
      success: false,
      message: undefined,
      error: 'bad',
    });
  });

  it('rejects a non-object body', async () => {
    await expect(readApiResponse(Response.json(null))).rejects.toThrow(TypeError);
  });
});
