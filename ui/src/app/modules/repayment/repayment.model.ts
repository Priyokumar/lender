import { IAccount } from "../account/account.model";

export interface IRepayment {
    id: number;
    repaymentId?: string;
    dateOfPayment: Date;
    amountPaid: number;
    dueAmount: number;
    status: string;
    account: IAccount;
}

export interface IRepaymentParam {
    accountNo: string;
}