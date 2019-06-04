export function get<T>(getter: () => T, defaultValue: any = undefined) {
  try {
    return getter();
  } catch (_) {
    return defaultValue;
  }
}

export const length = (arr: any[]) => arr.length;
