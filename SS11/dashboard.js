// Hiển thị tên người dùng
let userShow = document.getElementById("show-username");
userShow.innerText = localStorage.username;
let listProduct = document.getElementById("list-product");

let productList;

if (!localStorage.productList) {
  // Nếu như chưa có thì khởi tạo = []
  localStorage.productList = JSON.stringify([]);
  productList = [];
} else {
  productList = JSON.parse(localStorage.productList);
}

showListProduct(productList);

// // Định nghĩa hàm
function createNewProduct() {
  let newProduct = {
    id: 1,
    name: "new product",
    price: 20000,
  };
  // Thay đổi biến productList
  productList.push(newProduct);
  // Gán lại giá trị thay đổi vào localStorage
  localStorage.productList = JSON.stringify(productList);

  showListProduct(productList);
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
}

// Classname luôn trả về 1 mảng
let editBtn = document.getElementsByClassName("edit-btn");
console.log(editBtn);

for (let i = 0; i < editBtn.length; i++) {
  editBtn[i].addEventListener("click", (event) => {
    if(event.target.parentNode.parentNode.children[1].getAttribute('contenteditable')) {
        event.target.parentNode.parentNode.children[1].setAttribute(
            "contenteditable",
            "false"
          );
          event.target.parentNode.parentNode.children[2].setAttribute(
            "contenteditable",
            "false"
          );

          console.log(event.target.parentNode.parentNode.children[1].innerText)
          console.log(event.target.parentNode.parentNode.children[2].innerText)

          console.log("Trước khi thay đổi",productList[i])
          productList[i].name = event.target.parentNode.parentNode.children[1].innerText
          productList[i].price = event.target.parentNode.parentNode.children[2].innerText
          console.log("Sau khi thay đổi",productList[i])

          localStorage.productList = JSON.stringify(productList)

    } else {
        event.target.parentNode.parentNode.children[1].setAttribute(
            "contenteditable",
            "true"
          );
          event.target.parentNode.parentNode.children[2].setAttribute(
            "contenteditable",
            "true"
          );
    }
  });
}
