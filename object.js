const library = {
  name: "Sat Japan Library",
  JsInterview: [],
  books: [],
  users: [],
  SetInterviewQuestions,
  addBooks,
  findBook,
  removeBook,
  listsBooks,
  Objectassign,
  torunForKey,
  getApiData,
  getFilteredUsers,
  setdataInTable,
  deleteUser,
  editUser,
  createUser,
  recursion,
};
// getApiData();
function listsBooks() {
  let b = this.books;
  return b;
}

function findBook(bookfind) {
  return this.books.filter((e) => e === bookfind);
}

function addBooks(bookname) {
  let arr = bookname.split(",");
  if (arr.length > 1) {
    for (let i = 0; i < arr.length; i++) {
      this.books.push(arr[i]);
    }
  } else {
    this.books.push(bookname);
  }
}

function torunForKey() {
  for (key in library) {
    console.log(library[key]);
  }
}

function removeBook(title) {
  this.books = this.books.filter((e) => e != title);
  console.log(this.books);
  return console.log("done");
}

function Objectassign() {
  let object1 = { Name: "Hassan" };
  let object2 = { age: 25 };
  let object3 = { is_Admin: true };
  Object.assign(object1, object2, object3);
  console.log(object1);
}

function callFunctionInObject(key) {
  let ls = library[key]();
  return ls;
}

library.sayHi = function () {
  alert("Hello!");
};

async function getApiData() {
  this.users = [];
  let data = await fetch("http://localhost:5000/api/users")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  this.users.push(...data);
  if (data.length > 0) {
    this.setdataInTable();
  } else {
    alert("no data found", data);
  }
}

function setdataInTable() {
  let tablebody = document.getElementById("listing_user_data");
  tablebody.innerHTML = ""; // Clear existing rows

  let fragment = document.createDocumentFragment();

  this.users.forEach((e, i) => {
    let row = document.createElement("tr");
    row.innerHTML = `
            <td>${++i || "N/A"}</td>
            <td>${e.id || "N/A"}</td>
            <td>${e.name || "N/A"}</td>
            <td>${e.email || "N/A"}</td>
            <td>${e.age || "N/A"}</td>
            <td>${e.createdAt || "N/A"}</td>
            <td>${e.updatedAt || "N/A"}</td>
            <td>
            <i class="fa fa-trash" onclick="deleteUser(${e.id})"></i>
            <i class="fa fa-edit" onclick="editUser('${[
              e.id,
              e.name,
              e.email,
              e.age,
              e.createdAt,
              e.updatedAt,
            ].toString()}')"></i>
            </td>
        `;
    fragment.appendChild(row);
  });

  tablebody.appendChild(fragment); // Append new rows
}

function getFilteredUsers($this) {
  let value = $this?.toLowerCase();
  let filtered = this.users.filter(
    (e) => e.name.includes(value) || e.email.includes(value)
  );
  let tablebody = document.getElementById("listing_user_data");
  tablebody.innerHTML = ""; // Clear existing rows

  let fragment = document.createDocumentFragment();

  filtered.forEach((e, i) => {
    let row = document.createElement("tr");
    row.innerHTML = `
            <td>${++i || "N/A"}</td>
            <td>${e.id || "N/A"}</td>
            <td>${e.name || "N/A"}</td>
            <td>${e.email || "N/A"}</td>
            <td>${e.age || "N/A"}</td>
            <td>${e.createdAt || "N/A"}</td>
            <td>${e.updatedAt || "N/A"}</td>
            <td>
            <i class="fa fa-trash" onclick="deleteUser(${e.id})"></i>
            <i class="fa fa-edit" onclick="editUser('${[
              e.id,
              e.name,
              e.email,
              e.age,
              e.createdAt,
              e.updatedAt,
            ].toString()}')"></i>
            </td>
        `;
    fragment.appendChild(row);
  });

  tablebody.appendChild(fragment); // Append new rows
}

async function deleteUser(id) {
  let data = await fetch(`http://localhost:5000/api/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  alert(data.message);
  this.getApiData();
}

async function editUser(e, bool, create) {
  let updatedData = await getInputvalues();
  if (create) {
    this.createUser({
      name: updatedData.name,
      email: updatedData.email,
      age: updatedData.age,
    });
  } else {
    if (!bool) {
      let [id, name, email, age, createdAt, updatedAt] = e.split(",");
      document.getElementById("ID").value = id;
      document.getElementById("Name").value = name;
      document.getElementById("Age").value = age;
      document.getElementById("Email").value = email;
      document.getElementById("CreatedAt").value = createdAt;
      document.getElementById("UpdateddAt").value = updatedAt;
    } else {
      let data = await fetch(
        `http://localhost:5000/api/users/${updatedData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
      alert(data.id ? "User Updated" : "User not Updated");
      this.getApiData();
    }
  }
}

async function createUser(e) {
  let data = await fetch(`http://localhost:5000/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(e),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  alert(data.id ? "Created" : "Not Created");
  this.getApiData();
}

function getInputvalues() {
  let id = document.getElementById("ID").value;
  let name = document.getElementById("Name").value;
  let age = document.getElementById("Age").value;
  let email = document.getElementById("Email").value;
  let createdAt = document.getElementById("CreatedAt").value;
  let updatedAt = document.getElementById("UpdateddAt").value;
  let updatedData = { id, name, email, age, createdAt, updatedAt };
  return updatedData;
}

function toggleInputs(mode) {
  // Get the inputs
  const idField = document.getElementById("ID");
  const createdAtField = document.getElementById("CreatedAt");
  const updatedAtField = document.getElementById("UpdateddAt");

  if (mode === "edit") {
    // Show edit-specific fields
    idField.hidden = true;
    createdAtField.hidden = true;
    updatedAtField.hidden = true;
    document.getElementById("Submit").style.display = "inline-block";
    document.getElementById("Create").style.display = "none";
  } else if (mode === "new") {
    // Hide edit-specific fields
    idField.hidden = false;
    createdAtField.hidden = false;
    updatedAtField.hidden = false;
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Create").style.display = "inline-block";
  }
}

function clearInputs() {
  document.getElementById("ID").value = "";
  document.getElementById("Name").value = "";
  document.getElementById("Age").value = "";
  document.getElementById("Email").value = "";
  document.getElementById("CreatedAt").value = "";
  document.getElementById("UpdateddAt").value = "";
}

// library.getApiData();
function recursion(...arg) {
  console.log(arg);
}

let data = document.getElementById("card_items");
let html;
function SetInterviewQuestions() {
  data.innerHTML = `<div id="container">
  <div class="spinner">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</div>`;
  html = "";
  console.log(JsonData);
  JsonData.forEach((e, i) => {
    html += `<div class="card">
              <h1>${++i}:${e.question || "none"}</h1>
              <p>${e.answer || "none"}</p>
              ${e.code ? `<div class="codeblock">${e.code}</div>` : ""}
            </div>`;
  });
  setTimeout(() => {
    data.innerHTML = html;
  }, 2000);
}
function filterdata($this) {
  html = "";
  let value = $this?.trim("");
  let filteredata;
  if (!value) {
    SetInterviewQuestions();
  } else {
    filteredata = JsonData.filter((e) =>
      e.title.includes(value?.toLowerCase())
    );
    filteredata.forEach((e, i) => {
      html += `<div class="card">
                <h1>${++i}:${e.question || "none"}</h1>
                <p>${e.answer || "none"}</p>
                ${e.code ? `<div class="codeblock">${e.code}</div>` : ""}
              </div>`;
    });
    data.innerHTML = html;
  }
}
let JsonData = [
  {
    title: "lexical",
    question: "What is Lexical Scope or Lexical Environment?",
    answer: `A lexical environment in JavaScript is a data structure that stores variables and functions defined in the current scope along with references to all outer scopes. It is also known as the lexical scope.`,
  },
  {
    title: "var",
    question: "What is the scope of 'var' in JavaScript?",
    answer: `Variables declared with 'var' are either function-scoped or global-scoped. They do not have block scope, meaning they are accessible outside of blocks such as loops or conditionals.`,
    code: `if (true) {
  var test = true;
}
console.log(test); // true`,
  },
  {
    title: "closure",
    question: "What is a Closure in JavaScript?",
    answer: `A closure is a function that has access to its outer function's variables, even after the outer function has returned. It remembers the environment in which it was created.`,
    code: `function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  };
}
const counter = outer();
counter(); // 1
counter(); // 2`,
  },
  {
    title: "event loop",
    question: "What is the Event Loop in JavaScript?",
    answer: `The event loop is a mechanism that continuously checks the call stack and callback queue. If the call stack is empty, it dequeues a callback from the queue and executes it.`,
    code: `console.log('Start');
setTimeout(() => console.log('Timeout'), 0);
console.log('End');
// Output: Start, End, Timeout`,
  },
  {
    title: "promise",
    question: "What are Promises in JavaScript?",
    answer: `Promises are used to handle asynchronous operations. A Promise is an object representing the eventual completion or failure of an asynchronous operation.`,
    code: `const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Done!"), 1000);
});
promise.then(result => console.log(result)); // Output: Done!`,
  },
  {
    title: "async await",
    question: "What is 'async/await' in JavaScript?",
    answer: `The 'async/await' syntax simplifies handling asynchronous operations. 'async' makes a function return a Promise, and 'await' pauses execution until the Promise resolves.`,
    code: `async function fetchData() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  console.log(data);
}`,
  },
  {
    title: "hoisting",
    question: "What is Hoisting in JavaScript?",
    answer: `Hoisting is JavaScript's default behavior of moving declarations to the top of their scope during the compile phase. This applies to both variables and functions.`,
    code: `console.log(a); // undefined
var a = 10;`,
  },
  {
    title: "prototype",
    question: "What is Prototype in JavaScript?",
    answer: `Every JavaScript object has a prototype. A prototype is also an object. All JavaScript objects inherit their properties and methods from their prototype.`,
    code: `function Person(name) {
  this.name = name;
}
Person.prototype.sayHello = function() {
  console.log('Hello, ' + this.name);
};
const person = new Person('Alice');
person.sayHello(); // Hello, Alice`,
  },
  {
    title: "this keyword",
    question: "What does 'this' refer to in JavaScript?",
    answer: `The value of 'this' depends on how a function is called. In general, it refers to the object that is currently executing the code.`,
    code: `const obj = {
  name: 'Alice',
  greet: function() {
    console.log('Hello, ' + this.name);
  }
};
obj.greet(); // Output: Hello, Alice`,
  },
  {
    title: "call, apply, bind",
    question: "What are 'call', 'apply', and 'bind' methods?",
    answer: `'call' and 'apply' invoke a function with a specified 'this' context. 'bind' returns a new function with 'this' set.`,
    code: `function greet(greeting) {
  console.log(greeting + ', ' + this.name);
}
const user = { name: 'Alice' };
greet.call(user, 'Hello'); // Output: Hello, Alice
greet.apply(user, ['Hi']); // Output: Hi, Alice
const boundGreet = greet.bind(user, 'Hey');
boundGreet(); // Output: Hey, Alice`,
  },
  {
    title: "destructuring",
    question: "What is Destructuring in JavaScript?",
    answer: `Destructuring is a syntax for unpacking values from arrays or properties from objects into distinct variables.`,
    code: `const obj = { name: 'Alice', age: 25 };
const { name, age } = obj;
console.log(name, age); // Alice 25`,
  },
  {
    title: "spread operator",
    question: "What is the Spread Operator?",
    answer: `The spread operator (...) allows an iterable (like an array or object) to expand where multiple elements or properties are expected.`,
    code: `const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];
console.log(arr2); // [1, 2, 3, 4, 5]`,
  },
  {
    title: "currying",
    question: "What is Currying in JavaScript?",
    answer: `Currying is a technique of converting a function with multiple arguments into a sequence of functions, each taking a single argument.`,
    code: `function curry(f) {
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}
const sum = (a, b) => a + b;
const curriedSum = curry(sum);
console.log(curriedSum(2)(3)); // 5`,
  },
  {
    title: "debounce",
    question: "What is Debouncing?",
    answer: `Debouncing ensures that a function is executed only after a specified time has elapsed since the last time it was invoked.`,
    code: `function debounce(func, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}`,
  },
  {
    title: "throttle",
    question: "What is Throttling?",
    answer: `Throttling ensures that a function is executed at most once in a specified time interval.`,
    code: `function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function(...args) {
    const context = this;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}`,
  },
];
