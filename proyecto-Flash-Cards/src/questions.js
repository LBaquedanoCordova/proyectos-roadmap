const questions = [
    {
      question: "What is the difference between var, let, and const?",
      answer:
        "In JavaScript, var is function-scoped and can be re-declared; let and const are block-scoped, with let allowing re-assignment and const preventing it. However, const objects can have their contents modified.",
    },
    {
      question: "What is the difference between == and === in JavaScript?",
      answer:
        "== compares values after performing type coercion, while === compares both value and type without coercion.",
    },
    {
      question:
        "What are arrow functions, and how are they different from regular functions?",
      answer:
        "Arrow functions are a shorter syntax for writing functions in JavaScript. They do not have their own this, arguments object, or prototype, and are often used for concise callbacks or when this binding isn't needed.",
    },
    {
      question: "What is the purpose of the this keyword in JavaScript?",
      answer:
        "The this keyword refers to the object that is executing the current function. Its value is determined dynamically based on how the function is called.",
    },
    {
      question: "What are JavaScript closures, and why are they useful?",
      answer:
        "A closure is a function that retains access to its lexical scope, even when the function is executed outside that scope. They are useful for data encapsulation and creating private variables.",
    },
    {
      question: "What is the event loop in JavaScript?",
      answer:
        "The event loop is a mechanism in JavaScript that handles asynchronous operations by dequeuing tasks from the event queue and executing them in the main thread after the current execution stack is cleared.",
    },
    {
      question:
        "What is the difference between null and undefined in JavaScript?",
      answer:
        "null is an explicitly assigned value that represents 'no value', while undefined indicates that a variable has been declared but not assigned a value.",
    },
    {
      question: "What is the purpose of JavaScript's Promise object?",
      answer:
        " A Promise represents the eventual completion (or failure) of an asynchronous operation and provides methods like .then() and .catch() for handling its resolution or rejection.",
    },
    {
      question:
        "What is the difference between synchronous and asynchronous code in JavaScript?",
      answer:
        "Synchronous code is executed sequentially, blocking subsequent operations until the current task finishes. Asynchronous code allows other operations to continue while waiting for a task to complete (e.g., using callbacks, promises, or async/await).",
    },
    {
      question: "What is hoisting in JavaScript?",
      answer:
        "Hoisting is JavaScript's default behavior of moving variable and function declarations to the top of their scope during the compilation phase, allowing them to be used before their declaration in the code.",
    },
  ];

  export default  questions;