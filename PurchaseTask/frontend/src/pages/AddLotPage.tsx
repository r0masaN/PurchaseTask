import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Lot} from "../models/Lot.ts";
import {Customer} from "../models/Customer.ts";
import {Button} from "@consta/uikit/Button";
import {Combobox} from "@consta/uikit/Combobox";
import {TextField} from "@consta/uikit/TextField";
import {DatePicker} from "@consta/uikit/DatePicker";
import {Text} from "@consta/uikit/Text";

const AddLot: React.FC = () => {
    const navigate = useNavigate();

    const [lot, setLot] = useState<Lot>(
        new Lot(
            0,
            "Test Lot Name",
            "Test Customer Code",
            0,
            "RUB",
            "Without NDS",
            "Test Place Delivery",
            new Date()
        )
    );
    const [customerCodes, setCustomerCodes] = useState<string[]>([]);
    const [dateDelivery, setDateDelivery] = useState<Date | null>(null);

    const [value, setValue] = useState<Item | null>({value: "null", label: "Null"});
    const [value1, setValue1] = useState<Item | null>({value: "RUB", label: "RUB"});
    const [value2, setValue2] = useState<Item | null>({value: "without", label: "Without NDS"});

    type Item = {
        value: string;
        label: string;
    };

    const items: Item[] = [
        {value: "null", label: "Null"},
        ...customerCodes.map((code) => ({
            value: code,
            label: code,
        }))
    ];

    const items1: Item[] = [
        {value: "RUB", label: "RUB"},
        {value: "USD", label: "USD"},
        {value: "EUR", label: "EUR"}
    ];

    const items2: Item[] = [
        {value: "Without NDS", label: "Without NDS"},
        {value: "18%", label: "18%"},
        {value: "20%", label: "20%"}
    ];

    useEffect(() => {
        fetch("http://localhost:8080/api/customer/all")
            .then((response) => response.json())
            .then((data: Customer[]) => {
                const filteredCodes = Array.from(new Set(
                    data.map((customer) => customer.customerCode)
                ));
                setCustomerCodes(filteredCodes);
            })
            .catch((error) => console.error("Error fetching customers:", error));
    }, []);

    const handleFilterChange = (newValue: Item | null) => {
        if (newValue) {
            setValue(newValue);
        } else {
            setValue(null);
        }

        const {value} = newValue;
        setLot((prevCustomer) => ({
            ...prevCustomer,
            customerCode: value === "null" ? "" : value
        }));
    };

    const handleFilterChange1 = (newValue: Item | null) => {
        if (newValue) {
            setValue1(newValue);
        } else {
            setValue1(null);
        }

        const {value} = newValue;
        setLot((prevCustomer) => ({
            ...prevCustomer,
            currencyCode: value === "null" ? "" : value
        }));
    };

    const handleFilterChange2 = (newValue: Item | null) => {
        if (newValue) {
            setValue2(newValue);
        } else {
            setValue2(null);
        }

        const {value} = newValue;
        setLot((prevCustomer) => ({
            ...prevCustomer,
            ndsRate: value === "null" ? "" : value
        }));
    };

    const handleFieldChange = (fieldName: keyof Lot) => (value: string | null) => {
        setLot((prevLot) => ({
            ...prevLot,
            [fieldName]: value,
        }));
    };

    const handleDateChange = (newDate: Date | null) => {
        setDateDelivery(newDate);
        const {value} = newDate;
        const date = new Date(value);
        setLot((prevLot) => ({
            ...prevLot,
            dateDelivery: date
        }));
    };

    const handleSave = () => {
        if (dateDelivery) {
            const utcDate = new Date(dateDelivery.getTime() - dateDelivery.getTimezoneOffset() * 60000);

            fetch("http://localhost:8080/api/lot/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...lot,
                    dateDelivery: utcDate.toISOString()
                }),
            })
                .then(() => navigate("/lots"))
                .catch((error) => console.error("Error saving lot:", error));
        } else {
            console.error("Date is not selected.");
        }
    };

    return (
        <div>
            <Link to={`/`}>
                <Button label="Home" view="secondary" style={{marginBottom: "20px"}}/>
            </Link>
            <div style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "20px"
            }}>
                <Text view="brand" size="2xl" weight="semibold" style={{marginBottom: '10px'}}>Add Lot</Text>
                <form>
                    <div style={{marginBottom: '10px'}}>
                        <TextField
                            type="text"
                            value={lot.lotName}
                            onChange={handleFieldChange('lotName')}
                            placeholder="Lot Name"
                            style={{maxWidth: '300px'}}
                            withClearButton
                        />
                    </div>
                    <div style={{marginBottom: '10px'}}>
                        <Combobox
                            placeholder="Customer Code"
                            name="customerCode"
                            items={items}
                            value={value}
                            onChange={handleFilterChange}
                            style={{maxWidth: '300px'}}
                        />
                    </div>
                    <div style={{marginBottom: '10px'}}>
                        <TextField
                            type="text"
                            value={lot.price as string}
                            onChange={handleFieldChange('price')}
                            placeholder="Price"
                            style={{maxWidth: '300px'}}
                            withClearButton
                        />
                    </div>
                    <div style={{marginBottom: '10px'}}>
                        <Combobox
                            placeholder="Currency Code"
                            name="currencyCode"
                            items={items1}
                            value={value1}
                            onChange={handleFilterChange1}
                            style={{maxWidth: '300px'}}
                        />
                    </div>
                    <div style={{marginBottom: '10px'}}>
                        <Combobox
                            placeholder="NDS Rate"
                            name="ndsRate"
                            items={items2}
                            value={value2}
                            onChange={handleFilterChange2}
                            style={{maxWidth: '300px'}}
                        />
                    </div>
                    <DatePicker
                        placeholder="Date of Delivery"
                        value={dateDelivery}
                        onChange={handleDateChange}
                        withClearButton
                        style={{marginBottom: '10px'}}
                    />
                    <div style={{marginBottom: '10px'}}>
                        <Button label="Save" view="primary" onClick={handleSave}/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLot;