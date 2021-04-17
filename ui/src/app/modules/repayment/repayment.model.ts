import { IAccount } from "../account/account.model";

export interface IRepayment {
    id: string;
    repaymentId: string;
    dateOfPayment: Date;
    amountPaid: number;
    dueAmount: number;
    status: string;
    account: IAccount;
}
