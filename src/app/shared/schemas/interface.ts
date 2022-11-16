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

export interface Asset {
    date: Date,
    type: string,
    description: string,
    amount: number
}

export interface Stock {
    date: Date,
    ticker: string,
    actionType: 'Buy' | 'Sell',
    quantity: number|null,
    charges:number|null,
    costPrice?: number,
    netCostPrice?: number,
    stockType?:string,
    soldPrice?:number,
    taxes?:number
}