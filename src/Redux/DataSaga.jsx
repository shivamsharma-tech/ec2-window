import { put, take, takeEvery } from "redux-saga/effects";
import {
  Get_Books,
  Set_Books,
  Delete_Book,
  Add_Book,
  Set_Book,
  Update_Book,
  Login_User,
  Updated_Book,
  Deleted_Book,
  Add_Token,
  Logout_User,
  Remove_Token,
  Set_Users,
  Set_User,
  Updated_User,
  Deleted_User,
  Get_Users,
  Delete_User,
  Add_User,
  Update_User,
} from "./constant";
import { useEffect, useState } from "react";


function* GetBooks(data) {
  const token = localStorage.getItem("token");

  console.log(data, "*******");
  const url = `${import.meta.env.VITE_BASE_URL}/api/get-books?page=${data?.page}`;
  let result = yield fetch(url, {
    method: "GET",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
  })
    .then((resp) => resp.json())
    .then(function (data) {
      // console.log(data);

      return data;
    });
  yield put({ type: Set_Books, data: result });
}

function* AddBook(data) {
  const token = localStorage.getItem("token");

  console.log(data, "*******");
  const value = data.data;
  const formData = new FormData();
  formData.append("title", value.title);
  formData.append("description", value.description);
  formData.append("price", value.price);
  formData.append("image", value.image);
  // console.log(formData);
  const url = `${import.meta.env.VITE_BASE_URL}/api/add-book`;
  let result = yield fetch(url, {
    method: "POST",
    withCredentials: true,
    body: formData,
    headers: {
      token: token,
    },
  })
    .then((resp) => resp.json())
    .then(function (data) {
      // console.log(data);

      return data;
    });
  yield put({ type: Set_Book, data: result });
}

function* UpdateBook(data) {
  const token = localStorage.getItem("token");

  console.log(data, "*******");
  const value = data.data;
  const formData = new FormData();
  formData.append("title", value.title);
  formData.append("description", value.description);
  formData.append("price", value.price);
  formData.append("image", value.image);
  // console.log(formData);
  const url = `${import.meta.env.VITE_BASE_URL}/api/update-book/${value.id}`;
  let result = yield fetch(url, {
    method: "PUT",
    withCredentials: true,
    body: formData,
    headers: {
      token: token,
    },
  })
    .then((resp) => resp.json())
    .then(function (data) {
      // console.log(data);

      return data;
    });
  yield put({ type: Updated_Book, data: result });
}

function* DeleteBook(data) {
  console.log(data, "*******");
  const token = localStorage.getItem("token");

  console.log(token);

  const url = `${import.meta.env.VITE_BASE_URL}/api/delete-book?id=${data?.id}`;
  let result = yield fetch(url, {
    method: "DELETE",
    withCredentials: true,
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then(function (data) {
      // console.log(data);

      return data;
    });
    
  yield put({ type: Deleted_Book, data: result });
}



function* GetUsers(data) {
  const token = localStorage.getItem("token");
  console.log(data, "*******");
  const url = `${import.meta.env.VITE_BASE_URL}/api/get-users?page=${data?.page}`;
  let result = yield fetch(url, {
    method: "GET",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
  })
    .then((resp) => resp.json())
    .then(function (data) {
      // console.log(data);

      return data;
    });
  yield put({ type: Set_Users, data: result });
}

function* AddUser(data) {
  const token = localStorage.getItem("token");

  console.log(data, "*******");

  // console.log(formData);
  const url = `${import.meta.env.VITE_BASE_URL}/api/add-user`;
  let result = yield fetch(url, {
    method: "POST",
    withCredentials: true,
    body: JSON.stringify(data.data),
    headers: {
      "Content-Type": "application/json",
      // token: token,
    },
  })
    .then((resp) => resp.json())
    .then(function (data) {
      // console.log(data);

      return data;
    });
  yield put({ type: Set_User, data: result });
}

function* UpdateUser(data) {
  const token = localStorage.getItem("token");

  console.log(data, "*******");
  // console.log(formData);
  const url = `${import.meta.env.VITE_BASE_URL}/api/update-user/${data.data.id}`;
  let result = yield fetch(url, {
    method: "PUT",
    withCredentials: true,
    body: JSON.stringify(data.data),
    headers: {
      "Content-Type": "application/json",

      // token: token,
    },
  })
    .then((resp) => resp.json())
    .then(function (data) {
      // console.log(data);

      return data;
    });
  yield put({ type: Updated_User, data: result });
}

function* DeleteUser(data) {
  console.log(data, "*******");
  // const token = localStorage.getItem("token");

  // console.log(token);

  const url = `${import.meta.env.VITE_BASE_URL}/api/delete-user?id=${data?.id}`;
  let result = yield fetch(url, {
    method: "DELETE",
    withCredentials: true,
    headers: {
      // token: token,
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then(function (data) {
      // console.log(data);

      return data;
    });
    
  yield put({ type: Deleted_User, data: result });
}






function* Login(data) {
  const alldata = data.data
  console.log(data.data, "*******");
  const url = `${import.meta.env.VITE_BASE_URL}/api/login`;
  let result = yield fetch(url, {
    method: "POST",
    body: JSON.stringify(alldata.data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then(function (data) {
      if (data?.sucess) {
        alldata.callback()        
      }
      return data;
    });
    // console.log(result);
    
  yield put({ type: Add_Token, data: result });
}


function* Logout(data) {
  console.log(data,"**********");
  const alldata = data;
  const token = localStorage.getItem("token")
  const url = `${import.meta.env.VITE_BASE_URL}/api/logout`;
  let result = yield fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "token":token
    },
  })
    .then((resp) => resp.json())
    .then(function (data) {
      console.log(data);
      if (data?.sucess) {
        alldata.callback()
      }
      return data;
    });
    console.log(result,"-----");
    
  yield put({ type: Remove_Token, data: result });
}


function* DataSaga() {
  yield takeEvery(Get_Books, GetBooks);
  yield takeEvery(Delete_Book, DeleteBook);
  yield takeEvery(Add_Book, AddBook);
  yield takeEvery(Update_Book, UpdateBook);

  yield takeEvery(Get_Users, GetUsers);
  yield takeEvery(Delete_User, DeleteUser);
  yield takeEvery(Add_User, AddUser);
  yield takeEvery(Update_User, UpdateUser);

  yield takeEvery(Login_User, Login);
  yield takeEvery(Logout_User, Logout);
}

export default DataSaga;
