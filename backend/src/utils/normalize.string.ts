export function normalizeString(
  value?: string,
  fallback = '',
): string {
  if (!value) return fallback;

  return value.trim().toLowerCase();
}