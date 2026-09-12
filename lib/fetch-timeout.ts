/**
 * Fetch with timeout and abort signal
 *
 * Sends a browser User-Agent by default: several data sources
 * (StatusInvest, Fundamentus) reject non-browser clients with 403.
 */
export const BROWSER_USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

export const fetchWithTimeout = async (
  url: string,
  options: RequestInit & { timeout?: number } = {},
): Promise<Response> => {
  const { timeout = 30000, headers, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers: { "User-Agent": BROWSER_USER_AGENT, ...headers },
      signal: controller.signal,
    });
    return response;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(`Request timeout after ${timeout}ms`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};
