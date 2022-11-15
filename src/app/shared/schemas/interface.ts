export interface User{
    fullname: string,
    email:string,
    password: string,
    confirmpassword:string
}

export interface Expense {
    date: Date,
    type: string,
    method: string,
    description: string,
    amount: number
}