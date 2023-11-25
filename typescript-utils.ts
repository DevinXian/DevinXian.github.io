// Retrieve element type information from array type

type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType> ? ElementType : never;
// type ElementType<T extends readonly unknown[]> = T extends (infer Elem)[] ? Elem : never;

type Bar = { name: string }[];
type Foo = [number, string];

type DemoType = ElementType<Bar>; // { name: string }
type DemoType2 = ElementType<Foo>; // string | number

