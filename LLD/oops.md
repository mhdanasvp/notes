# OOPS

## Polymorphism

Polymorphism allows objects of different types to be treated as instances of the same type, typically through interfaces or inheritance.

```ts
class Animal {
  speak(): void {
    console.log("Animal makes a sound.");
  }
}

class Dog extends Animal {
  speak(): void {
    console.log("Dog barks.");
  }
}

class Cat extends Animal {
  speak(): void {
    console.log("Cat meows.");
  }
}

function makeAnimalSpeak(animal: Animal): void {
  animal.speak(); // Different behavior depending on the type
}

const dog = new Dog();
const cat = new Cat();

makeAnimalSpeak(dog); // Dog barks.
makeAnimalSpeak(cat); // Cat meows.

```
## Inheritance

Inheritance allows one class (child) to inherit properties and methods from another class (parent). This promotes code reuse and establishes a hierarchical relationship between classes.

```ts
class Vehicle {
  constructor(public make: string, public model: string) {}

  displayInfo(): void {
    console.log(`Make: ${this.make}, Model: ${this.model}`);
  }
}

class Car extends Vehicle {
  constructor(make: string, model: string, public doors: number) {
    super(make, model); // Calls the parent class constructor
  }

  displayInfo(): void {
    super.displayInfo(); // Call the parent class method
    console.log(`Doors: ${this.doors}`);
  }
}

const myCar = new Car("Toyota", "Corolla", 4);
myCar.displayInfo();
// Output:
// Make: Toyota, Model: Corolla
// Doors: 4


```
## Encapsulation

Encapsulation restricts direct access to some of an object's components, typically through access modifiers like private, protected, and public. This helps in controlling how data within a class is accessed and modified.



```ts
class BankAccount {
  private balance: number;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  public deposit(amount: number): void {
    this.balance += amount;
  }

  public getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount(1000);
account.deposit(500);
console.log(account.getBalance()); // 1500
// console.log(account.balance); // Error: Property 'balance' is private and only accessible within class 'BankAccount'.

```
## Abstraction

Abstraction hides the complexity of an object's internal workings and only exposes essential functionalities. In TypeScript, abstraction can be achieved through abstract classes or interfaces.

```ts
abstract class Shape {
  abstract getArea(): number;

  public displayArea(): void {
    console.log(`Area: ${this.getArea()}`);
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number) {
    super();
  }

  getArea(): number {
    return this.width * this.height;
  }
}

const circle = new Circle(5);
circle.displayArea(); // Area: 78.53981633974483

const rectangle = new Rectangle(4, 5);
rectangle.displayArea(); // Area: 20

// Example with Interfaces:

interface Printable {
  print(): void;
}

class Report implements Printable {
  print(): void {
    console.log("Printing report...");
  }
}

class Invoice implements Printable {
  print(): void {
    console.log("Printing invoice...");
  }
}

function printDocument(doc: Printable) {
  doc.print(); // Polymorphic call
}

const report = new Report();
const invoice = new Invoice();

printDocument(report);  // Printing report...
printDocument(invoice); // Printing invoice...

```

![TS classes](./TypeScript%20Classes.png)
![TS Control flow](./TypeScript%20Control%20Flow%20Analysis.png)
![TS interface](./TypeScript%20Interfaces.png)
![TS types](./TypeScript%20Types.png)