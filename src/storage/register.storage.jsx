import { create } from "zustand";

export const useUserStore = create(set=>({
    fullname:"",
    pass:"",
    phone:"",

    setFullname : (fullname)=> set({fullname}),
    setPass : (pass)=> set({pass}),
    setPhone: (phone)=> set({phone}),
}))