# Memoization

Memoization is a performance optimization technique used to speed up programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again


* When a function is called, it checks if the result for the given input is already stored (cached).
* If the result is cached, it returns the cached result, skipping the actual computation.
* This ensures that the recursive calls for the same input are executed only once.

```javascript
function memoize(fn) {
    const cache = new Map();

    return function (...args) {
        const key = args.join(','); // Simple key generation for demonstration
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

// Example usage
const multiply = (a, b) => a * b;
const memoizedMultiply = memoize(multiply);

console.log(memoizedMultiply(2, 3)); // Computes and caches the result
console.log(memoizedMultiply(2, 3)); // Returns the cached result
```
