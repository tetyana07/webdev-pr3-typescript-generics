export function FrozenEntity() {
  return function <T extends abstract new (...args: any[]) => object>(constructor: T): void {
    Object.freeze(constructor);
    Object.freeze(constructor.prototype);
  };
}


