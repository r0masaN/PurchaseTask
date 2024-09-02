import React, {useEffect, useState} from "react";
import {useParams, useNavigate, Link} from "react-router-dom";
import {Customer} from "../models/Customer.ts";
import {Button} from "@consta/uikit/Button";
import {Checkbox} from "@consta/uikit/Checkbox";
import {Combobox} from "@consta/uikit/Combobox";
import {Text} from "@consta/uikit/Text";
import {TextField} from "@consta/uikit/TextField";

const EditCustomer: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [customer, setCustomer] = useState<Customer | null>(null);
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
        fetch(`http://localhost:8080/api/customer/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setCustomer(data);

                setValue(data.customerCodeMain ? {value: data.customerCodeMain, label: data.customerCodeMain} : {
                    value: "null",
                    label: "Null"
                });
            })
            .catch((error) => console.error("Error fetching customer:", error));

        fetch("http://localhost:8080/api/customer/all")
            .then((response) => response.json())
            .then((data: Customer[]) => {
                const filteredCodes = Array.from(new Set(
                    data
                        .filter((customer) => customer.id !== parseInt(id as string))
                        .map((customer) => customer.customerCode)
                ));
                setCustomerCodes(filteredCodes);
            })
            .catch((error) => console.error("Error fetching customers:", error));
    }, [id]);

    const handleFieldChange = (fieldName: keyof Customer) => (value: string | null) => {
        setCustomer((prevCostumer) => {
            if (prevCostumer) {
                return {
                    ...prevCostumer,
                    [fieldName]: value
                } as Customer;
            }
            return prevCostumer;
        });
    };

    const handleFilterChange = (newValue: Item | null) => {
        if (newValue) {
            setValue(newValue);
        } else {
            setValue(null);
        }

        const {value} = newValue;
        setCustomer((prevCostumer) => {
            if (prevCostumer) {
                return {
                    ...prevCostumer,
                    customerCodeMain: value === "null" ? "" : value
                } as Customer;
            }
            return prevCostumer;
        });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = e.target;
        setCustomer((prevCostumer) => {
            if (prevCostumer) {
                return {
                    ...prevCostumer,
                    [name]: checked
                } as Customer;
            }
            return prevCostumer;
        });
    };

    const handleSave = () => {
        if (customer) {
            fetch("http://localhost:8080/api/customer/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(customer),
            })
                .then(() => navigate("/customers"))
                .catch((error) => console.error("Error updating customer:", error));
        }
    };

    const handleDelete = () => {
        fetch(`http://localhost:8080/api/customer/delete/${id}`, {
            method: "DELETE",
        })
            .then(() => navigate("/customers"))
            .catch((error) => console.error("Error deleting customer:", error));
    };

    const handleCancel = () => {
        navigate("/customers");
    };

    if (!customer) {
        return <div>Loading...</div>;
    }

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
                <Text view="brand" size="2xl" weight="semibold" style={{marginBottom: '10px'}}>Edit Customer</Text>
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
                        <Checkbox label="Is Organization" name="isOrganization" checked={customer?.isOrganization || false}
                                  onChange={handleCheckboxChange}/>
                    </div>
                    <div style={{marginBottom: '10px'}}>
                        <Checkbox label="Is Person" name="isPerson" checked={customer?.isPerson || false}
                                  onChange={handleCheckboxChange}/>
                    </div>
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
        </div>
    );
};

export default EditCustomer;