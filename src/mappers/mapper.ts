export interface Mapper<I, O> {
  mapTo: (input: I) => O;
  multiMapTo: (input: I[]) => O[];
}
