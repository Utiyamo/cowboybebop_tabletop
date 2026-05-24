declare global {
  interface Array<T> {
    /** Similar ao C# List.Contains */
    contains(element: T): boolean;

    /** Similar ao C# List.AddRange (mutável) */
    addRange(items: readonly T[]): void;

    /** Similar ao C# List.Find */
    findByExpression(predicate: (item: T, index: number, array: T[]) => boolean): T | undefined;

    /** Acesso seguro por índice (evita ReferenceError) */
    findByIndex(index: number): T | undefined;

    /** Similar ao C# LINQ Where / List.FindAll */
    filter(predicate: (item: T, index: number, array: T[]) => boolean): T[];
  }
}
export {};