# Solid Principles

## 1. Single Responsibility Principle (SRP)

A class should have only one reason to change, meaning it should have only one job or responsibility.

```typescript
class Invoice {
  private amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  // This method is responsible only for calculation
  calculateTotal() {
    return this.amount * 1.15; // 15% tax
  }
}

// Separate the responsibility of invoice printing
class InvoicePrinter {
  printInvoice(invoice: Invoice) {
    console.log(`Invoice Total: ${invoice.calculateTotal()}`);
  }
}
```

## 2. Open/Closed Principle (OCP)

Software entities (classes, modules, functions) should be open for extension but closed for modification.

``` typescript
interface PaymentProcessor {
  processPayment(amount: number): void;
}

class StripeProcessor implements PaymentProcessor {
  processPayment(amount: number): void {
    console.log(`Processing $${amount} payment through Stripe`);
  }
}

class RazorpayProcessor implements PaymentProcessor {
  processPayment(amount: number): void {
    console.log(`Processing $${amount} payment through Razorpay`);
  }
}

// Now we can easily extend this with new payment methods
class PaymentService {
  private processor: PaymentProcessor;

  constructor(processor: PaymentProcessor) {
    this.processor = processor;
  }

  makePayment(amount: number) {
    this.processor.processPayment(amount);
  }
}

```

## 3.Liskov Substitution Principle (LSP)

Subtypes must be substitutable for their base types without altering the correctness of the program.

```typescript
class Bird {
  fly() {
    console.log('Flying...');
  }
}

class Penguin extends Bird {
  // Violating LSP if Penguin can't fly
  fly() {
    throw new Error("Penguins can't fly");
  }
}

```

## 4.Interface Segregation Principle (ISP)

Clients should not be forced to depend on interfaces they do not use.

```typescript
interface Worker {
  work(): void;
  eat(): void;
}

class Developer implements Worker {
  work() {
    console.log('Coding...');
  }
  
  eat() {
    console.log('Eating...');
  }
}

// Better way is to segregate interfaces
interface Workable {
  work(): void;
}

interface Eatable {
  eat(): void;
}

class Developer implements Workable {
  work() {
    console.log('Coding...');
  }
}

class Human implements Workable, Eatable {
  work() {
    console.log('Working...');
  }

  eat() {
    console.log('Eating...');
  }
}
```

## 5. Dependency Inversion Principle (DIP)

High-level modules should not depend on low-level modules. Both should depend on abstractions.

```typescript
// Low-level module
class MySQLDatabase {
  connect() {
    console.log('Connecting to MySQL...');
  }
}

// High-level module
class Application {
  private database: MySQLDatabase;

  constructor(database: MySQLDatabase) {
    this.database = database;
  }

  run() {
    this.database.connect();
  }
}

// To follow DIP, we should depend on an abstraction
interface Database {
  connect(): void;
}

class MySQLDatabase implements Database {
  connect() {
    console.log('Connecting to MySQL...');
  }
}

class MongoDBDatabase implements Database {
  connect() {
    console.log('Connecting to MongoDB...');
  }
}

class Application {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  run() {
    this.database.connect();
  }
}
```
