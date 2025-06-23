import { Add_Book ,Add_User,Delete_Book,Delete_User,Get_Books, Get_Users, Login_User, Logout_User, Update_Book, Update_User } from "./constant"

export const LoginUser = (data,callback) => {
    return {
        type:Login_User,
        data:{data,callback},
    }
}

export const LogoutUser = (callback) => {
    return {
        type:Logout_User,
        callback:callback
    }
}

export const GetUsers = (page) => {
    return {
        type:Get_Users,
        page:page
    }
}

export const DeleteUser = (id) => {
    return {
        type:Delete_User,
        id:id
    }
}

export const AddUser = (data) => {
    return {
        type:Add_User,
        data:data
    }
}

export const UpdateUser = (data) => {
    return {
        type:Update_User,
        data:data
    }
}




export const GetBooks = (page) => {
    return {
        type:Get_Books,
        page:page
    }
}

export const DeleteBook = (id) => {
    return {
        type:Delete_Book,
        id:id
    }
}

export const AddBook = (data) => {
    return {
        type:Add_Book,
        data:data
    }
}

export const UpdateBook = (data) => {
    return {
        type:Update_Book,
        data:data
    }
}

