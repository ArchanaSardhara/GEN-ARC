export function normalizeUrl(base: string, path: string = ''): string {
  if (!base) return '';

  try {
    // 1. Ensure base has a protocol (required by the URL constructor)
    const hasProtocol = /^[a-z]+:\/\//i.test(base);
    const context = hasProtocol ? base : `https://${base}`;

    // 2. Use the URL API to merge
    const url = new URL(path.trim(), context.trim());

    // 3. Return the string (stripping the temporary protocol if we added one)
    const result = url.toString();
    return hasProtocol ? result : result.replace(/^https:\/\//i, '');
  } catch (error) {
    console.error('Normalization failed:', error);
    // Fallback for invalid inputs
    return base;
  }
}
