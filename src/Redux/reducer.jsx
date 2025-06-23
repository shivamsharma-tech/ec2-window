import {
  Add_Book,
  Add_Token,
  Delete_Book,
  Deleted_Book,
  Deleted_User,
  Login_User,
  Remove_Token,
  Set_Book,
  Set_Books,
  Set_User,
  Set_Users,
  Update_Book,
  Updated_Book,
  Updated_User,
} from "./constant";

export const BooksData = (data = null, action) => {
  data = localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : [];
  console.log(action);

  switch (action.type) {
    case Set_Books:
      localStorage.setItem(
        "data",
        JSON.stringify([...data, ...action.data.books])
      );
      return [...data, ...action.data.books];
    case Deleted_Book:
      const result = data.filter((book) => book.id !== action.data.book.id);
      console.log(result);

      localStorage.setItem("data", JSON.stringify([...result]));
      return result;
    case Updated_Book:
      const updateObject = data.findIndex(
        (book) => book.id == action.data.book.id
      );
      data[updateObject] = action.data.book;
      console.log(data);
      localStorage.setItem("data", JSON.stringify(data));
      return data;
    case Set_Book:
      localStorage.setItem(
        "data",
        JSON.stringify([...data, action?.data?.book])
      );

      return [...data, action?.data?.book];
    default:
      return data;
  }
};


export const UsersData = (data = null, action) => {
  data = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : [];

  switch (action.type) {
    case Set_Users:
      localStorage.setItem(
        "user",
        JSON.stringify([...data, ...action.data.user])
      );
      return [...data, ...action.data.user];
    case Deleted_User:
      const result = data.filter((user) => user.id !== action.data.user.id);
      console.log(result);

      localStorage.setItem("user", JSON.stringify([...result]));
      return result;
    case Updated_User:
      const updateObject = data.findIndex(
        (user) => user.id == action.data.user.id
      );
      data[updateObject] = action.data.user;
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    case Set_User:
      localStorage.setItem(
        "user",
        JSON.stringify([...data, action?.data?.user])
      );

      return [...data, action?.data?.user];
    default:
      return data;
  }
};

export const LoginData = (data = null, action) => {
  console.log(action);

  switch (action.type) {
    case Add_Token:
      console.log("login cahlo");
      if (action.data?.token) {
        localStorage.setItem("token", action.data?.token);
      }
      return action.data;
      case Remove_Token:
        console.log("logout cahlo");
        if (action.data.sucess == true) {
          localStorage.removeItem("token");
          return {logout:true}
        }
        return action.data;
    default:
      return data;
  }
};
