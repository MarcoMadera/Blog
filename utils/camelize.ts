export const camelize = (string: string): string =>
  string.replace(/-([a-z0-9])/gi, (_, group) => group.toUpperCase());

export default camelize;
