export const pick = <T extends object, K extends keyof T>(
  obj: T,
  ...propNames: K[]
): Pick<T, K> => {
  const result = {} as Pick<T, K>;

  propNames.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    } else {
      throw new Error(
        `Property "${String(key)}" does not exist on the object.`
      );
    }
  });

  return result;
};

export const debounce = <T extends (...args: any[]) => void>(
  fn: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: number | null = null;

  return (...args: Parameters<T>) => {
    const later = () => {
      timeout = -1;
      fn(...args);
    };

    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = window.setTimeout(later, wait);
  };
};

export const isNumber = (value: unknown): value is number =>
  typeof value === 'number';

export const parseJSON = <T = unknown>(value: string): T | null => {
  if (!value) {
    return null;
  }

  const result = JSON.parse(value);
  return typeof result === 'string' ? JSON.parse(result) : result;
};
