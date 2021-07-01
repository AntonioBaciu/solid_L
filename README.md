# solid_L
### Use 'npm start dev' to start the web server then go to 'localhost:1234' in your browser.

### Working steps:

- Create the work environment
- Divide code into classes
- Research **import** / **interface** / **implements**
- Create constructors for the classes

### Documentation:

**TS Modules:** [https://www.typescriptlang.org/docs/handbook/modules.html#import](https://www.typescriptlang.org/docs/handbook/modules.html#import)

**Interfaces:** [https://www.youtube.com/watch?v=VbW6vWTaHOY&t=131s](https://www.youtube.com/watch?v=VbW6vWTaHOY&t=131s)

**Liskov substitution principle** [https://www.youtube.com/watch?v=ObHQHszbIcE](https://www.youtube.com/watch?v=ObHQHszbIcE)


# Liskov substitution principle
"Objects in a program should be replaceable with instances of their subtypes without altering the correctness of that program." See also [design by contract](https://en.wikipedia.org/wiki/Design_by_contract).

### Polymorphism
If you followed the Symfony course from BeCode you should already be aware of Polymorphism, but just to remind you, her is the short summary:
If 2 different classes use **the same interface**, so they have the same function names: the code that uses this class does not care about which one class it receives.
In short: When two objects have the same interface, they are functionally interchangeable = polymorphism.

## Your mission
Look at the old.ts file and open the index.html file, refactor the Discount class in 3 different classes with the same interface "VariableDiscount" & "FixedDiscount" & "NoDiscount"

### Discuss
Do you understand what the use is of having the class NoDiscount? This prevents us from having to write extra if-statements inside product to check if we actually have a Discount dependency. It might look strange but these null or void classes are very common in a lot of popular libraries!
