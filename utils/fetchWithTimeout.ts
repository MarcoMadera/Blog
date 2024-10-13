export const fetchWithTimeout = async (
  url: string,
  timeout: number = 5000
): Promise<Response> => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(url, { signal: controller.signal });
  clearTimeout(id);
  return response;
};
