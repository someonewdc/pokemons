export type LoaderFields<T> = keyof MapWithLoaderFieldsAsKeys<T>;

type IsLoaderField<T> = T extends `${string}Loading` ? T : never;

type MapWithLoaderFieldsAsKeys<T> = {
  [K in keyof T as IsLoaderField<K>]: T[K];
};
