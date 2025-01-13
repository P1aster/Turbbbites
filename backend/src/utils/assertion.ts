type Dict<T = any> = Record<string, T>;

export class Assertion {
  public static isArray<T>(value: any): value is Array<T> {
    return Array.isArray(value);
  }

  public static isEmptyArray(value: any[]): boolean {
    return this.isArray(value) && value.length === 0;
  }

  public static isString(value: any): value is string {
    return typeof value === 'string';
  }

  public static isEmptyString(value: any): boolean {
    return this.isString(value) && value.trim().length === 0;
  }

  public static isObject(value: any): value is Dict {
    const type = typeof value;

    return (
      value != null &&
      (type === 'object' || type === 'function') &&
      !this.isArray(value)
    );
  }

  public static isEmptyObject(value: any): boolean {
    return this.isObject(value) && Object.keys(value).length === 0;
  }

  public static isEmpty(value: any): boolean {
    if (this.isArray(value)) return this.isEmptyArray(value);
    if (this.isObject(value)) return this.isEmptyObject(value);
    if (value == null || value === '') return true;

    return false;
  }

  public static isFunction<T extends (...args: any[]) => any>(
    value: any,
  ): value is T {
    return typeof value === 'function';
  }
}
