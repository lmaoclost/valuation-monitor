import { vi } from 'vitest';

/**
 * Mock successful fetch response with text body
 * @param text - Response text content
 * @returns Mocked fetch function
 */
export function mockFetchSuccess(text: string) {
  global.fetch = vi.fn().mockResolvedValueOnce({
    ok: true,
    text: vi.fn().mockResolvedValueOnce(text),
  });
}

/**
 * Mock fetch with custom response object
 * @param response - Custom response properties
 * @returns Mocked fetch function
 */
export function mockFetchWithResponse(response: {
  ok?: boolean;
  status?: number;
  text?: string;
  json?: Record<string, unknown>;
}) {
  const mockResponse: any = { ok: response.ok ?? true };

  if (response.text !== undefined) {
    mockResponse.text = vi.fn().mockResolvedValueOnce(response.text);
  }

  if (response.json !== undefined) {
    mockResponse.json = vi.fn().mockResolvedValueOnce(response.json);
  }

  if (response.status !== undefined) {
    mockResponse.status = response.status;
  }

  global.fetch = vi.fn().mockResolvedValueOnce(mockResponse);
}

/**
 * Mock fetch network error
 * @param error - Error message or Error object
 * @returns Mocked fetch function
 */
export function mockFetchError(error: string | Error) {
  const errorObj = typeof error === 'string' ? new Error(error) : error;
  global.fetch = vi.fn().mockRejectedValueOnce(errorObj);
}

/**
 * Mock fetch HTTP error response
 * @param status - HTTP status code
 * @param text - Response text (default: 'Not found')
 * @returns Mocked fetch function
 */
export function mockFetchHttpError(status: number, text: string = 'Not found') {
  global.fetch = vi.fn().mockResolvedValueOnce({
    ok: false,
    status,
    text: vi.fn().mockResolvedValueOnce(text),
  });
}

/**
 * Mock successful CSV fetch response
 * @param csvData - CSV data string (e.g., "TICKER,PRECO\nPETR4,25.5")
 * @returns Mocked fetch function
 */
export function mockFetchCSV(csvData: string) {
  mockFetchSuccess(csvData);
}

/**
 * Mock successful HTML response with text
 * @param html - HTML content
 * @returns Mocked fetch function
 */
export function mockFetchHTML(html: string) {
  mockFetchSuccess(html);
}
