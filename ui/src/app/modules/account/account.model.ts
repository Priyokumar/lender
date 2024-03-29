import { ILead } from "../lead/lead.model";

export interface IAccount {
    id: number;
    accountNo: string;
    dateOfCreation:Date;
    repaymentDate: Date;
    closingBalance: number;
    status: string;
    lead: ILead;
    emis: IEmi[];

}

export interface IEmi {
    id: number;
    emiAmount: number;
    dueDate: Date;
    status: String;
}

export interface IAccountQueryParams {
    accountNo?: string;
    status?: string;
    customerId?: string;
}