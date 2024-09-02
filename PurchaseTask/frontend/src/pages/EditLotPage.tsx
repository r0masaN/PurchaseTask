import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {Lot} from "../models/Lot";
import {Customer} from "../models/Customer";
import {Button} from "@consta/uikit/Button";
import {Text} from "@consta/uikit/Text";
import {TextField} from "@consta/uikit/TextField";
import {Combobox} from "@consta/uikit/Combobox";
import {DatePicker} from "@consta/uikit/DatePicker";

const EditLot: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [lot, setLot] = useState<Lot | null>(null);

    const [customerCodes, setCustomerCodes] = useState<string[]>([]);
    const [dateDelivery, setDateDelivery] = useState<Date | null>(new Date());

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
        fetch(`http://localhost:8080/api/lot/${id}`)
            .then((response) => response.json())
            .then((data) => {
                const dateDelivery = data.dateDelivery ? new Date(data.dateDelivery) : null;
                setLot({
                    ...data,
                    dateDelivery
                });

                setValue(data.customerCode ? {value: data.customerCode, label: data.customerCode} : {
                    value: "null",
                    label: "Null"
                });
                setValue1(data.currencyCode ? {value: data.currencyCode, label: data.currencyCode} : {
                    value: "RUB",
                    label: "RUB"
                });
                setValue2(data.ndsRate ? {value: data.ndsRate, label: data.ndsRate} : {
                    value: "without",
                    label: "Without NDS"
                });
            })
            .catch((error) => console.error("Error fetching lot:", error));

        fetch("http://localhost:8080/api/customer/all")
            .then((response) => response.json())
            .then((data: Customer[]) => {
                const filteredCodes = Array.from(new Set(
                    data.map((customer) => customer.customerCode)
                ));
                setCustomerCodes(filteredCodes);
            })
            .catch((error) => console.error("Error fetching customers:", error));
    }, [id]);

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

    const handleSave = () => {
        if (dateDelivery) {
            const utcDate = new Date(dateDelivery.getTime() - dateDelivery.getTimezoneOffset() * 60000);

            fetch("http://localhost:8080/api/lot/update", {
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

    const handleDelete = () => {
        fetch(`http://localhost:8080/api/lot/delete/${id}`, {
            method: "DELETE",
        })
            .then(() => navigate("/lots"))
            .catch((error) => console.error("Error deleting lot:", error));
    };

    const handleCancel = () => {
        navigate("/lots");
    };

    if (!lot) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px"
        }}>
            <Text view="brand" size="2xl" weight="semibold" style={{marginBottom: '10px'}}>Edit Lot</Text>
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
                <div>
                    <div style={{marginTop: '10px'}}>
                        <Button label="Save" view="primary" form="round" onClick={handleSave}
                                style={{marginRight: '20px'}}/>
                        <Button label="Cancel" view="ghost" form="round" onClick={handleCancel}
                                style={{marginRight: '20px'}}/>
                        <Button label="Delete" view="primary" form="round" onClick={handleDelete}/>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditLot;