const library = {
  name: "Sat Japan Library",
  books: [],
  users: [],
  addBooks,
  findBook,
  removeBook,
  listsBooks,
  Objectassign,
  torunForKey,
  getApiData,
  setdataInTable,
  deleteUser,
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
            <i class="fa fa-edit" onclick="EditUser(${e})"></i>
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
