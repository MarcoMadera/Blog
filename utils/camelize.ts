export const camelize = (string: string): string =>
  string.replace(/-([a-z])/gi, (_, group) => group.toUpperCase());

export default camelize;
