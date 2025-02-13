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
  setdataInTable,
  deleteUser,
  editUser,
  createUser,
  recursion,
};

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
function SetInterviewQuestions() {
  let html = "";
  console.log(JsonData);
  JsonData.forEach((e, i) => {
    html += `<div class="card">
              <h1>${++i}:${e.question || "none"}</h1>
              <p>${e.answer || "none"}</p>
              ${e.code ? `<div class="codeblock">${e.code}</div>` : ""}
            </div>`;
  });
  let data = document.getElementById("card_items");
  data.innerHTML = html;
}
let JsonData = [
  {
    question: "What is Lexical Scope or Lexical Environment",
    answer: `A lexical environment in JavaScript is a data structure that stores variables and functions defined in the current scope
along with references to all outer scopes. It is also known as the lexical scope.`,
  },
  {
    question: `“var” has no block scope`,
    answer: `Variables, declared with var, are either function-scoped or global-scoped. They are visible through blocks.
For instance:`,
    code: `<code class="language-javascript"><code class="token keyword">if</code> <code class="token punctuation">(</code><code class="token boolean">true</code><code class="token punctuation">)</code> <code class="token punctuation">{</code>
  <code class="token keyword">var</code> test <code class="token operator">=</code> <code class="token boolean">true</code><code class="token punctuation">;</code> <code class="token comment">// use "var" instead of "let"</code>
<code class="token punctuation">}</code><em class="block-highlight">
<code class="token function">alert</code><code class="token punctuation">(</code>test<code class="token punctuation">)</code><code class="token punctuation">;</code> <code class="token comment">// true, the variable lives after if</code></em></code>`,
  },
  {
    question: `Global object`,
    answer: `The global object provides variables and functions that are available anywhere. By default, those that are built into the language or the environment.In a browser it is named window, for Node.js it is global, for other environments it may have another name.`,
  },
];
