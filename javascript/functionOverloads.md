# Function Overloads

In TypeScript, function overloading is a mechanism where you can define multiple function signatures for a single function. These multiple signatures are called overload signatures. They allow the function to accept different argument types or argument combinations while still having a single implementation.

```typescript
// Function overloads (Overload Signatures)
export function hello():number;
export function hello(n:number):number;
export function hello(n:number,a:string): string | number;

// Function implementation (common logic)
export function hello(n?:number,a?:string): string | number{
    let x=20
    return a?a:x+(n||0)
}


hello(10,"20")

```

- hello(): number; — No arguments, return number.
- hello(n: number): number; — One number argument, return number.
- hello(n: number, a: string): string; — Two arguments (number and string), return string.