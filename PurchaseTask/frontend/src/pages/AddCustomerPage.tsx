import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import {Customer} from "../models/Customer.ts";
import {Text} from "@consta/uikit/Text";
import {Button} from "@consta/uikit/Button";
import {Checkbox} from "@consta/uikit/Checkbox";
import {Combobox} from "@consta/uikit/Combobox";
import {TextField} from "@consta/uikit/TextField";

const AddCustomer: React.FC = () => {
    const navigate = useNavigate();

    const [customer, setCustomer] = useState<Customer>(
        new Customer(
            0,
            "Test Customer Code",
            "Test Customer Name",
            "Test Customer INN",
            "Test Customer KPP",
            "Test Customer Legal Address",
            "Test Customer Postal Address",
            "Test Customer Email",
            null,
            false,
            true
        )
    );
    const [customerCodes, setCustomerCodes] = useState<string[]>([]);

    const [value, setValue] = useState<Item | null>({value: "null", label: "Null"});

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
        setCustomer((prevCustomer) => ({
            ...prevCustomer,
            customerCodeMain: value === "null" ? "" : value
        }));
    };

    const handleFieldChange = (fieldName: keyof Customer) => (value: string | null) => {
        setCustomer((prevCustomer) => ({
            ...prevCustomer,
            [fieldName]: value,
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = e.target;
        setCustomer((prevCustomer) => ({
            ...prevCustomer,
            [name]: checked
        }));
    };

    const handleSave = () => {
        fetch("http://localhost:8080/api/customer/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(customer),
        })
            .then(() => navigate("/customers"))
            .catch((error) => console.error("Error saving customer:", error));
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
                <Text view="brand" size="2xl" weight="semibold" style={{marginBottom: '10px'}}>Add Customer</Text>
                <form>
                    <div style={{marginBottom: '10px'}}>
                        <TextField
                            type="text"
                            value={customer.customerCode}
                            onChange={handleFieldChange('customerCode')}
                            placeholder="Customer Code"
                            style={{maxWidth: '300px'}}
                            withClearButton
                        />
                    </div>
                    <div style={{marginBottom: '10px'}}>
                        <TextField
                            type="text"
                            value={customer.customerName}
                            onChange={handleFieldChange('customerName')}
                            placeholder="Customer Name"
                            style={{maxWidth: '300px'}}
                            withClearButton
                        />
                    </div>
                    <div style={{marginBottom: '10px'}}>
                        <TextField
                            type="text"
                            value={customer.customerInn}
                            onChange={handleFieldChange('customerInn')}
                            placeholder="Customer INN"
                            style={{maxWidth: '300px'}}
                            withClearButton
                        />
                    </div>
                    <div style={{marginBottom: '10px'}}>
                        <TextField
                            type="text"
                            value={customer.customerKpp}
                            onChange={handleFieldChange('customerKpp')}
                            placeholder="Customer KPP"
                            style={{maxWidth: '300px'}}
                            withClearButton
                        />
                    </div>
                    <div style={{marginBottom: '10px'}}>
                        <TextField
                            type="text"
                            value={customer.customerLegalAddress}
                            onChange={handleFieldChange('customerLegalAddress')}
                            placeholder="Customer Legal Address"
                            style={{maxWidth: '300px'}}
                            withClearButton
                        />
                    </div>
                    <div style={{marginBottom: '10px'}}>
                        <TextField
                            type="text"
                            value={customer.customerPostalAddress}
                            onChange={handleFieldChange('customerPostalAddress')}
                            placeholder="Customer Postal Address"
                            style={{maxWidth: '300px'}}
                            withClearButton
                        />
                    </div>
                    <div style={{marginBottom: '10px'}}>
                        <TextField
                            type="text"
                            value={customer.customerEmail}
                            onChange={handleFieldChange('customerEmail')}
                            placeholder="Customer Email"
                            style={{maxWidth: '300px'}}
                            withClearButton
                        />
                    </div>
                    <div style={{marginBottom: '10px'}}>
                        <Combobox
                            placeholder="Customer Code Main"
                            name="customerCodeMain"
                            items={items}
                            value={value}
                            onChange={handleFilterChange}
                            style={{maxWidth: '300px'}}
                        />
                    </div>
                    <div style={{marginBottom: '10px'}}>
                        <Checkbox label="Is Organization" name="isOrganization" checked={customer.isOrganization} onChange={handleCheckboxChange}/>
                    </div>
                    <div style={{marginBottom: '10px'}}>
                        <Checkbox label="Is Person" name="isPerson" checked={customer.isPerson} onChange={handleCheckboxChange}/>
                    </div>
                    <div style={{marginBottom: '10px'}}>
                        <Button label="Save" view="primary" onClick={handleSave}/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCustomer;