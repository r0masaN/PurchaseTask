export class Customer {
    id: number;
    customerCode: string;
    customerName: string;
    customerInn: string;
    customerKpp: string;
    customerLegalAddress: string;
    customerPostalAddress: string;
    customerEmail: string;
    customerCodeMain: string | null;
    isOrganization: boolean;
    isPerson: boolean;

    constructor(id: number, customerCode: string, customerName: string, customerInn: string, customerKpp: string,
                customerLegalAddress: string, customerPostalAddress: string, customerEmail: string,
                customerCodeMain: string | null, isOrganization: boolean, isPerson: boolean) {
        this.id = id;
        this.customerCode = customerCode;
        this.customerName = customerName;
        this.customerInn = customerInn;
        this.customerKpp = customerKpp;
        this.customerLegalAddress = customerLegalAddress;
        this.customerPostalAddress = customerPostalAddress;
        this.customerEmail = customerEmail;
        this.customerCodeMain = customerCodeMain;
        this.isOrganization = isOrganization;
        this.isPerson = isPerson;
    }
}