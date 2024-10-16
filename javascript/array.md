# Array

## constructor
>
> Note: Array() can be called with or without new. Both create a new Array instance.

```js
let a= new Array(10) //[ <10 empty items> ]
let b= new Array("a","b","c") //[a,b,c]
let c= [1,2,3] //[1,2,3]
```

## static methods

### Array.from()

Return value A new Array instance.

```js
Array.from(arrayLike) 
Array.from(arrayLike, mapFn)
Array.from(arrayLike, mapFn, thisArg)
```

`arrayLike`*: An iterable or array-like object to convert to an array.  
`mapFn`: A function to call on every element of the array.  
`thisArg`: Value to use as this when executing mapFn.  

#### examples

```js
Array.from("foo"); // [ "f", "o", "o" ]
Array.from(new Set(["foo", "bar", "baz", "foo"])); // [ "foo", "bar", "baz" ]
const map = new Map([
  ["1", "a"],
  ["2", "b"]
]);
Array.from(map); // [[1, a], [2, b]]
Array.from(mapper.values()); // ['a', 'b'];
Array.from(mapper.keys()); // ['1', '2'];
function f() {
  return Array.from(arguments);
}
f(1, 2, 3); // [ 1, 2, 3 ]
```