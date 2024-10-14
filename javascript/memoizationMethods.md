# Memoization

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
