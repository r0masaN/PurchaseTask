export class Lot {
    id: number;
    lotName: string;
    customerCode: string;
    price: number;
    currencyCode: string;
    ndsRate: string;
    placeDelivery: string;
    dateDelivery: Date;

    constructor(id: number, lotName: string, customerCode: string, price: number, currencyMode: string,
                ndsRate: string, placeDelivery: string, dateDelivery: Date) {
        this.id = id;
        this.lotName = lotName;
        this.customerCode = customerCode;
        this.price = price;
        this.currencyCode = currencyMode;
        this.ndsRate = ndsRate;
        this.placeDelivery = placeDelivery;
        this.dateDelivery = dateDelivery;
    }
}