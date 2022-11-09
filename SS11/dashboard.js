// Hiển thị tên người dùng
let userShow = document.getElementById("show-username");
userShow.innerText = localStorage.username;
let listProduct = document.getElementById("list-product");
const BASE_URL = "https://6367c73fedc85dbc84db832b.mockapi.io/products";

// HTTP/HTTPS Method: GET, POST, PUT, DELETE

// GET
fetch(BASE_URL)
  .then((response) => response.json())
  .then((productList) => {
    showListProduct(productList);
  });

// GET BY ID
// console.log(BASE_URL + "/2");
// fetch(BASE_URL + "/2")
//   .then((response) => response.json())
//   .then((productList) => {
//     console.log(productList);
//     showListProduct(productList);
//   });

// // // Định nghĩa hàm

// POST
function createNewProduct() {
  let newProduct = {
    name: "new product",
    price: 20000,
  };
  fetch(BASE_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  });
}

function showListProduct(productList) {
  listProduct.innerHTML = "";
  for (let i in productList) {
    listProduct.innerHTML += `
          <tr>
              <td>${productList[i].id}</td>
              <td>${productList[i].name}</td>
              <td>${productList[i].price}</td>
              <td>
                  <button class="edit-btn">Edit</button>
                  <button class="delete-btn">Delete</button>
              </td>
          </tr>
          `;
  }

  let editBtn = document.getElementsByClassName("edit-btn");
  for (let i = 0; i < editBtn.length; i++) {
    editBtn[i].addEventListener("click", (event) => {
      let currentNode = event.target.parentNode.parentNode.children;
      let currentEditableValue = currentNode[1].getAttribute("contenteditable");

      if (currentEditableValue) {
        currentNode[1].removeAttribute("contenteditable");
        currentNode[2].removeAttribute("contenteditable");

        // Cập nhật dữ liệu lại - PUT
        console.log(currentNode[1].value);
        console.log(currentNode[2].value);
        let updatedProduct = {
          name: currentNode[1].innerText,
          price: currentNode[2].innerText,
        };
        fetch(BASE_URL + `/${i + 1}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        });
      } else {
        currentNode[1].setAttribute("contenteditable", true);
        currentNode[2].setAttribute("contenteditable", true);
      }
    });
  }

  let deleteBtn = document.getElementsByClassName("delete-btn");
  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener("click", (event) => {
      let currentNodeId =
        event.target.parentNode.parentNode.children[0].innerText;

      fetch(BASE_URL + `/${currentNodeId}`, {
        method: "DELETE",
      }).then(() => window.location.reload());
    });
  }
}
