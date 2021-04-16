import { ICustomer } from "../customer/customer.model";
import { IProduct } from "../product/product.model";

export interface ILead {
    id: number;
    leadId: string;
    requestedAmount: number;
    monthlyInterest: number;
    emi: number;
    status: string;
    tenure: number;
    customer: ICustomer;
    product: IProduct;
}