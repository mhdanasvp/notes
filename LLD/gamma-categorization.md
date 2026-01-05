# Gamma Categorization

Gamma categorization most commonly refers to the Gang of Four (Erich Gamma and colleagues') classification of software design patterns into **Creational, Structural, and Behavioral** groups.

- Creational: Patterns for object creation (e.g., Singleton, Factory Method).  
- Structural: Patterns for composing classes and objects (e.g., Adapter, Facade).  
- Behavioral: Patterns for algorithms and assignment of responsibilities (e.g., Observer, Strategy).  

## 1. Creational Design Pattern

creational pattern is a design pattern that focuses on the mechanisms of object creation.They help in making a system independent of how its objects are created, composed, and represented. Creational patterns give a lot of flexibility in what gets created, who creates it, and how it gets created.

There are two main themes in these patterns:

- They keep information about the specific classes used in the system hidden.  
- They hide the details of how instances of these classes are created and assembled.
- Control the number of instances or recycle expensive objects (like database connections) to improve performance.

### Explicit Creation

Explicit creation occurs when a developer specifically instructs the system to create an instance of a particular class

- Mechanism: Typically involves the direct use of a constructor or the new keyword.
- Characteristics:

  - High Control: You decide exactly when and how the object is initialized.  
  - Clarity: All initialization happens in one place. Other developers can easily see what type of object is being created and what data is being passed to it.  
  - Tight Coupling: Often binds the code to a concrete class, making it harder to swap implementations later without refactoring.
- Example: Car myCar = new Car("Electric");

### Implicit Creation

Implicit creation happens "behind the scenes" or automatically by the runtime, framework, or another object.

- Mechanism: Objects are created by the runtime, framework, or another object.
- Characteristics:
  - Automation: The system provides objects automatically based on context, such as a default constructor provided by Java if you don't write one.
  - Loose Coupling: The client code often doesn't know the exact concrete class it is receiving, only the interface it implements.
  - Convenience: Reduces boilerplate code and repetitive declarations.
- Example: Dependency Injection (DI) frameworks automatically "injecting" a database service into a controller without the controller calling new DatabaseService().

### Common Creational Patterns

- Singleton: Ensures only one instance of a class exists and provides a global access point.
- Factory Method: Defines an interface for object creation in a superclass, allowing subclasses to specify the object type.
- Abstract Factory: Creates families of related objects without specifying their concrete classes.
- Builder: Separates a complex object's construction from its representation, enabling step-by-step creation.
- Prototype: Creates new objects by cloning an existing instance, useful when creation is costly.
- Object Pool: Manages a collection of pre-initialized, reusable objects that are expensive to create.

## 2. Structural Design Pattern

Structural patterns are design patterns that focus on how classes and objects are composed to form larger, more complex structures while remaining flexible and efficient. They help simplify the relationships between entities and ensure that changes in one part of a system do not require a complete overhaul of the entire structure.

- class composition: How classes are built from classes through inheritance and composition relationships.  
- Interface design: How objects exposed their functionality through well designed intutive interfaces.  
- Object Relationships: How objects relate to and collabrate with each other in your architecture.  

### The Seven GoF Structural Patterns

- Adapter: Acts as a connector between two incompatible interfaces, allowing them to collaborate.
- Bridge: Decouples an abstraction from its implementation so that the two can vary independently.
- Composite: Composes objects into tree structures to represent part-whole hierarchies, treating individual objects and compositions uniformly.
- Decorator: Adds new responsibilities to an object dynamically by wrapping it, without altering its original structure.
- Facade: Provides a simplified, high-level interface to a complex subsystem or library.
- Flyweight: Minimizes memory usage by sharing common parts of state among multiple similar objects.
- Proxy: Provides a surrogate or placeholder for another object to control access, such as for lazy loading or security.

## 3. Behavioral patterns

Behavioral design patterns are a category of design patterns that focus on the interactions and communication between objects. They help define how objects collaborate and distribute responsibility among them, making it easier to manage complex control flow and communication in a system.

- Object communication
- Object collabration
- Responsibility assignment.
- Algorithm Distribution.
- Loose coupling.
- Flexibility.

### The 11 GoF Behavioral Patterns

- Observer: Implements a subscription mechanism to notify objects of events happening to the object they observe.
- Strategy: Encapsulates interchangeable algorithms that can be selected at runtime.
- Command: Turns requests into objects, allowing for flexible parameterization, queuing, or undoable operations.
- State: Allows an object to change its behavior based on its internal state.
- Chain of Responsibility: Passes requests through a chain of potential handlers.
- Mediator: Centralizes communication between objects to reduce direct dependencies.
- Iterator: Provides sequential access to collection elements without revealing the internal structure.
- Memento: Saves and restores an object's internal state without breaking encapsulation.
- Template Method: Defines an algorithm's structure in a superclass, letting subclasses implement specific steps.
- Visitor: Separates algorithms from object structures, allowing new operations without modifying the objects.
- Interpreter: Provides an interpreter for a language's grammatical representation.
