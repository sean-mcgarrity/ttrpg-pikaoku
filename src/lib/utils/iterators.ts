type ObjectWithLevel = {
  level: number;
};

export const whereKeyOverlap =
  <O, K extends keyof O>(key: K, values: unknown[]) =>
  (obj: O): boolean => {
    const target = obj[key];
    if (Array.isArray(target)) {
      return target.some((value) => !!values?.includes(value));
    }
    return false;
  };

export const whereKeyEq =
  <O, K extends keyof O>(key: K, value: O[K]) =>
  (obj: O): boolean =>
    obj[key] === value;

export const whereKeyGt =
  <O, K extends keyof O>(key: K, greaterThan: O[K]) =>
  (obj: O): boolean =>
    obj[key] > greaterThan;

export const whereKeyGte =
  <O, K extends keyof O>(key: K, greaterThanOrEqual: O[K]) =>
  (obj: O): boolean =>
    obj[key] >= greaterThanOrEqual;

export const whereKeyLt =
  <O, K extends keyof O>(key: K, lessThan: O[K]) =>
  (obj: O): boolean =>
    obj[key] < lessThan;

export const whereKeyLte =
  <O, K extends keyof O>(key: K, lessThanOrEqual: O[K]) =>
  (obj: O): boolean =>
    obj[key] <= lessThanOrEqual;

export const whereKeyNeq =
  <O, K extends keyof O>(key: K, value: O[K]) =>
  (obj: O): boolean =>
    obj[key] !== value;

export const whereKeyIn =
  <O, K extends keyof O>(key: K, values: O[K][]) =>
  (obj: O): boolean =>
    values.includes(obj[key]);

/**
 * Find, Filter -> where
 * Reduce       ->
 * Find Index   -> where
 * map          -> to
 * sort         -> by
 *
 */

export const byKeyAsc =
  <O, K extends keyof O>(key: K) =>
  (a: O, b: O): number => {
    if (a[key] > b[key]) return 1;
    if (a[key] < b[key]) return -1;
    return 0;
  };

export const byKeyDesc =
  <O, K extends keyof O>(key: K) =>
  (a: O, b: O): number => {
    if (a[key] > b[key]) return -1;
    if (a[key] < b[key]) return 1;
    return 0;
  };

export const filterByLevelGt =
  <O extends ObjectWithLevel = ObjectWithLevel>(greaterThan: number) =>
  (obj: O): boolean =>
    obj.level > greaterThan;

export const filterByLevelGte = <O extends ObjectWithLevel = ObjectWithLevel>(
  greaterThanOrEqual: number
) => filterByLevelGt<O>(greaterThanOrEqual - 1);

export const filterByLevelLt =
  <O extends ObjectWithLevel = ObjectWithLevel>(lessThan: number) =>
  (obj: O): boolean =>
    obj.level < lessThan;

export const filterByLevelLte = <O extends ObjectWithLevel = ObjectWithLevel>(
  lessThanOrEqual: number
) => filterByLevelLt<O>(lessThanOrEqual + 1);

export const reduceToHighestLevelLte =
  <O extends ObjectWithLevel = ObjectWithLevel>(lessThan: number) =>
  (highest: O, current: O): O =>
    current.level > (highest?.level ?? 0) && current.level <= lessThan ? current : highest;
