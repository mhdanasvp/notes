# Function Declaration vs Expression  

## Function Declaration

* Defines a function using the function keyword, followed by the function name.
* Hoisted to the top of their scope.

```javascript
function myFunction() {
  console.log("This is a function declaration");
}
```

## Function Expression

* Assigns a function (anonymous or named) to a variable or constant.
* Not hoisted.
* Can be either anonymous or named.
* **Arrow functions** always expressions because they are typically assigned to a variable, passed as arguments, or returned from other functions.

```javascript
const myFunction = function() {
  console.log("This is a function expression");
};
```



