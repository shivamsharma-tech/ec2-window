import * as Yup from "yup"

export const Validation = Yup.object({
    email: Yup.string().min(2).max(30).required("enter your email"),
    password: Yup.string().min(4).max(15).required("enter valid password")
})