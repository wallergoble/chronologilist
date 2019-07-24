
export function safeGet<T>(getter: () => T, defaultValue: any = undefined) {
  try {
    return getter();
  } catch (_) {
    return defaultValue;
  }
}

export function spread<T, U>(a: U) {
  return (b: T) => ({ ...b, ...a });
}

export function preventDefaultAndCall(
  cb: (...args: any[]) => any,
  ...args: any[]
) {
  return (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    cb(...args);
  };
}

export const length = (arr: any[]) => arr.length;

// const interleave = <T, U>(as: T[]) => (bs: U[]) =>
//   as.reduce((acc, val, i) => [...acc, val, bs[i]], []);

// function pluck<T, K extends keyof T>(...names: K[]) {
//   return (obj: T) => names.map(n => obj[n]);
// }

// function head<T>(arr: T[]) {
//   if (arr[0]) {
//     return arr[0];
//   }
// }

// function tail<T>(arr: T[]) {
//   if (arr[arr.length - 1]) {
//     return arr[arr.length - 1];
//   }
// }

export function show<T>(arg: T): T {
  console.log(arg);
  return arg;
}

export type Predicate<T> = (...args: T[]) => boolean;

export function negate<T>(predicate: Predicate<T>) {
  return (...args: T[]) => !predicate.apply(null, args);
}

export function combinePredicates<T>(...predicates: Predicate<T>[]) {
  return function test(...args: T[]) {};
}

type LogLevel = "error" | "info" | "log" | "trace" | "warn";

export function log(message?: string, level: LogLevel = "log") {
  return (...args: any) => {
    if (message) {
      console[level](message, ...args);
    } else {
      console[level](...args);
    }
  };
}

// function composePredicates(...preds =)
// function compose<T extends Function>(...fns: T[]) {
//   return fns.reduceRight((fn1, fn2) => (...args) => fn2(fn1(...args)));
// }

// function reverseArgs<T extends Function>(fn) {
//   return (...args) => fn(...args.reverse());
// }

// export const pipe = reverseArgs(compose);
// export function pipe();
// const id = < T extends {} >(arg: T): T => { return arg; }
