# Data structure

Data structure is a way to sore and organize data, so that it can be used efficiently. data structure is a collection of data values, relationship among them and functions or opeartions applied on that.

## Array

- it can hold collection of values
- it can contain a mix of different data types
- arrays are resizable (don't have to decalare the size before creating the array)
- arrays are zero-indexed and insertion order is mainteined.
- arrays are iterable.
- insert/remove at the end - O(1)
- insert/remove at the beginning - O(n)  --> index has to be reset for every element of that array.
- access - O(1)
- search - O(n)

## Object

- unordered collection of key value pairs
- the key must be either a sting or symbol data type, where as the value can be of any data type.
- we can use the corresponding key to retrieve the value, this can be achieved using the dot notation or bracket notation.
- the object is not an iterable, we cannot use it with a for of loop.
- insert - O(1)
- remove - O(1)
- access - O(1)
- search - O(n) --> search for a value

## Set

- it can hold a collection of values
- the must be unique.
- set can contain different data types.
- sets are dynamically sized,(don't have to decalare the size before creating the set)
- set does't maintain the insertion order.
- sets are iterable

## Map

- collection of key value pairs
- maps are iterable, they can be with a for of loop
- the keys in map are ordered in the order of insertion.
- keys can be any type (object only allos string and symbol)
- map dpes't contain any default keys (object has a prototype and may contain defualt keys)

## Stack

- stack is nothing but a list, it is defined by its behaviour rather than being a mathematical model.
- the last item inserted to the queue is the first element to be removed.
- sequential collection of elements
- follows the principle of LIFO
- supports two main operation `push`(adds elements to the collection list ) and `pop`(removes the most recently added items)
- Eg: browser history tracking, Undo operation, callstack in the JS runtime

```TS
class Stack<T> {
  private items: T[] = [];

  // O(1)
  // Add an element to the stack
  push(element: T): void {
    this.items.push(element);
  }
  // O(1)
  // Remove an element from the stack
  pop(): T | undefined {
    return this.items.pop();
  }
  // O(1)
  // Peek at the top element without removing it
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
  // O(1)
  // Check if the stack is empty
  isEmpty(): boolean {
    return this.items.length === 0;
  }
  // O(1)
  // Get the size of the stack
  size(): number {
    return this.items.length;
  }

  // Clear the stack
  clear(): void {
    this.items = [];
  }
  // O(1)
  // Print the stack (for debugging purposes)
  print(): void {
    console.log(this.items.toString());
  }
}

// Example Usage
const stack = new Stack<number>();

// Pushing elements onto the stack
stack.push(10);
stack.push(20);
stack.push(30);
stack.push(40);

console.log(stack.peek()); // 40
stack.print(); // 10,20,30,40

// Popping the top element
console.log(stack.pop()); // 40
stack.print(); // 10,20,30

// Checking the size and if the stack is empty
console.log(stack.size()); // 3
console.log(stack.isEmpty()); // false

// Clearing the stack
stack.clear();
console.log(stack.isEmpty()); // true

```

## Queue

- Queue is nothing but a list, it is defined by its behaviour rather than being a mathematical model.
- sequential collection of elements
- follows the principle of FIFO
- the first item inserted to the queue is the first element to be removed.
- supports two main operation `enqueue`(adds elements to the rear/tail of the collection list ) and `dequeue`(removes the head/front item)
- eg: printers, callback queue in JS runtime, ...

```TS
class Queue {
  private items: number[] = [];
  // O(1)
  // Add an element to the queue
  enqueue(element: number): void {
    this.items.push(element);
  }

  // Remove an element from the queue
  O(n)
  dequeue(): number | undefined {
    return this.items.shift();
  }


  // O(1)
  // Peek at the front element without removing it
  peek(): number | undefined {
    return this.items[0];
  }
  // O(1)
  // Check if the queue is empty
  isEmpty(): boolean {
    return this.items.length === 0;
  }
  // O(1)
  // Get the size of the queue
  size(): number {
    return this.items.length;
  }
  // O(1)
  // Clear the queue
  clear(): void {
    this.items = [];
  }

  // Print the queue (for debugging purposes)
  print(): void {
    console.log(this.items.toString());
  }
}

// Example Usage
const queue = new Queue();

// Enqueue elements into the queue
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
queue.enqueue(40);

console.log(queue.peek()); // 10 (front of the queue)
queue.print(); // 10,20,30,40

// Dequeue the front element
console.log(queue.dequeue()); // 10
queue.print(); // 20,30,40

// Checking the size and if the queue is empty
console.log(queue.size()); // 3
console.log(queue.isEmpty()); // false

// Clearing the queue
queue.clear();
console.log(queue.isEmpty()); // true

```

Optimised Queue implementation (using object, we can implement the same uisng linkedlist as well)  

```TS
class Queue {
  private items: {[key:number]:any} = {};
  private front:number;
  private rear:number;
  constructor(){
    this.front=0
    this.rear=0
  }
  // O(1)
  // Add an element to the queue
  enqueue(element: number): void {
    this.items[this.rear] = element
    this.rear++
  }

  // Remove an element from the queue 
  // O(1)
  dequeue(): number | undefined {
    const item = this.items[this.front]
    delete this.items[this.front]
    this.front++
    return item 
  }


  // O(1)
  // Peek at the front element without removing it
  peek(): number | undefined {
    return this.items[this.front];
  }
  // O(1)
  // Check if the queue is empty
  isEmpty(): boolean {
    return this.rear-this.front === 0;
  }
  // O(1)
  // Get the size of the queue
  size(): number {
    return this.rear-this.front;
  }
  // O(1)
  // Clear the queue
  clear(): void {
    this.items = {};
    this.rear=0
    this.front=0
  }

  // Print the queue (for debugging purposes)
  print(): void {
    console.log(this.items.toString());
  }
}

// Example Usage
const queue = new Queue();

// Enqueue elements into the queue
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
queue.enqueue(40);

console.log(queue.peek()); // 10 (front of the queue)
queue.print(); // 10,20,30,40

// Dequeue the front element
console.log(queue.dequeue()); // 10
queue.print(); // 20,30,40

// Checking the size and if the queue is empty
console.log(queue.size()); // 3
console.log(queue.isEmpty()); // false

// Clearing the queue
queue.clear();
console.log(queue.isEmpty()); // true

```

## Circular Queue

- the size of queue is fixed
- A Circular Queue is a type of queue in which the last position is connected back to the first position, forming a circle.
- circular queue will reuse the empty block created during the dequeue opeartion.
- supports two main operation `enqueue`(adds elements to the rear/tail of the collection list ) and `dequeue`(removes the head/front item)
- Eg: clock, streaming data, traffic lights.

```TS
class CircularQueue {
  private queue: number[];
  private front: number;
  private rear: number;
  private size: number;
  private count: number;

  constructor(size: number) {
    this.size = size;
    this.queue = new Array(size);
    this.front = -1;
    this.rear = -1;
    this.count = 0;
  }

  // Add an element to the queue
  enqueue(element: number): void {
    if (this.isFull()) {
      console.log("Queue is full!");
      return;
    }

    if (this.isEmpty()) {
      this.front = 0; // First element enqueued
    }

    // Move rear to the next position (circularly)
    this.rear = (this.rear + 1) % this.size;

    // Add element at the rear position
    this.queue[this.rear] = element;
    this.count++;
  }

  // Remove and return the front element
  dequeue(): number | null {
    if (this.isEmpty()) {
      console.log("Queue is empty!");
      return null;
    }

    const dequeuedElement = this.queue[this.front];

    // If there is only one element in the queue, reset the queue
    if (this.front === this.rear) {
      this.front = -1;
      this.rear = -1;
    } else {
      // Move front to the next position (circularly)
      this.front = (this.front + 1) % this.size;
    }

    this.count--;
    return dequeuedElement;
  }

  // Peek at the front element of the queue without dequeuing
  peek(): number | null {
    if (this.isEmpty()) {
      console.log("Queue is empty!");
      return null;
    }
    return this.queue[this.front];
  }

  // Check if the queue is empty
  isEmpty(): boolean {
    return this.count === 0;
  }

  // Check if the queue is full
  isFull(): boolean {
    return this.count === this.size;
  }

  // Get the size of the queue
  getSize(): number {
    return this.count;
  }

  // Print the queue (for debugging purposes)
  print(): void {
    if (this.isEmpty()) {
      console.log("Queue is empty!");
      return;
    }

    let current = this.front;
    const elements: number[] = [];

    for (let i = 0; i < this.count; i++) {
      elements.push(this.queue[current]);
      current = (current + 1) % this.size;
    }

    console.log(elements.join(" -> "));
  }
}

// Example Usage:
const queue = new CircularQueue(5);

// Enqueue elements
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
queue.enqueue(40);
queue.enqueue(50);

// Print the queue
queue.print(); // 10 -> 20 -> 30 -> 40 -> 50

// Try to enqueue when the queue is full
queue.enqueue(60); // Queue is full!

// Dequeue an element
console.log(queue.dequeue()); // 10

// Print the queue after dequeue
queue.print(); // 20 -> 30 -> 40 -> 50

// Enqueue an element after dequeue
queue.enqueue(60);
queue.print(); // 20 -> 30 -> 40 -> 50 -> 60

// Peek at the front element
console.log(queue.peek()); // 20

// Check if the queue is full
console.log(queue.isFull()); // true

// Check the size of the queue
console.log(queue.getSize()); // 5

```

## Linked list

- A linked list is a linear data structure that includes a series of connected nodes.
- each node consist of a data value and a pointer that points to the next node
- the list elements can be easily inserted or removed without reallocation.
- random access of elements is not feasible and accessing an element has linear time complexity.
- mainly 3 operations, `insertion`, `deletion`, `search`

`prepend`: In a Linked List, prepending refers to adding a new node at the beginning (or head) of the list.  
`append`: In a Linked List, appending refers to adding a new node at the end of the list.  
`insert`: 

```TS
class Creator {
  data: any
  next: Creator | null
  constructor(value: any) {
    this.data = value
    this.next = null
  }
}

class Linkedlist {
  count: number
  head: Creator | null
  constructor() {
    this.count = 0
    this.head = null
  }
  prepend(value: any) {
    const node = new Creator(value)
    node.next = this.head
    this.head = node
    this.count++
  }
  append(value: any) {
    const node = new Creator(value)
    if (this.isEmpty()) {
      this.head = node
    } else {
      let prev = this.head
      while (prev?.next) {
        prev = prev.next
      }
      prev!.next = node
    }
    this.count++
  }
  print() {
    let curr = this.head
    if (!curr) console.log("list is empty");

    while (curr) {
      console.log(curr.data);
      curr = curr.next
    }
  }

  size() {
    return this.count
  }
  isEmpty() {
    return this.count === 0
  }
}

const list = new Linkedlist()
// list.print()
// list.prepend(10)
// list.print()
// list.prepend(20)
// list.prepend(30)
// list.print()

list.print()
list.append(10)
list.print()
list.append(20)
list.append(30)
list.print()
```

