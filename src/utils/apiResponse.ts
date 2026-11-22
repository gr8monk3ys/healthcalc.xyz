export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/** Reads the `{ success, message?, error? }` envelope our form endpoints return. Throws on a non-object body. */
export async function readApiResponse(response: Response): Promise<ApiResponse> {
  const body = await response.json();
  if (typeof body !== 'object' || body === null) {
    throw new TypeError('Expected a JSON object response');
  }
  const { success, message, error } = body as Record<string, unknown>;
  return {
    success: success === true,
    message: typeof message === 'string' ? message : undefined,
    error: typeof error === 'string' ? error : undefined,
  };
}
