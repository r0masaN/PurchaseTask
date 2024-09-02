import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Customer} from "../models/Customer.ts";
import {Button} from "@consta/uikit/Button";
import {Checkbox} from "@consta/uikit/Checkbox";
import {Combobox} from "@consta/uikit/Combobox";
import {Text} from "@consta/uikit/Text";
import {Table} from "@consta/uikit/Table";

const CustomersPage: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [sortBy, setSortBy] = useState<string>("customerCode");
    const [ascending, setAscending] = useState<boolean>(true);
    const [filter, setFilter] = useState<string>("all");

    const [value, setValue] = useState<Item | null>({value: "all", label: "All"});
    const [value2, setValue2] = useState<Item | null>({value: "customerCode", label: "Customer Code"});

    const columns = [
        {
            title: <Text view="normal" size="l" weight="semibold">Customer Code</Text>,
            accessor: 'customerCode',
            align: 'center',
            sortable: true,
            width: "10%",
            renderCell: (row: Customer) => <Text view="primary" size="l">{row.customerCode}</Text>,
        },
        {
            title: <Text view="normal" size="l" weight="semibold">Customer Name</Text>,
            accessor: 'customerName',
            align: 'center',
            sortable: true,
            width: "10%",
            renderCell: (row: Customer) => <Text view="primary" size="l">{row.customerName}</Text>,
        },
        {
            title: <Text view="normal" size="l" weight="semibold">Customer INN</Text>,
            accessor: 'customerInn',
            align: 'center',
            sortable: true,
            width: "10%",
            renderCell: (row: Customer) => <Text view="primary" size="l">{row.customerInn}</Text>,
        },
        {
            title: <Text view="normal" size="l" weight="semibold">Customer KPP</Text>,
            accessor: 'customerKpp',
            align: 'center',
            sortable: true,
            width: "10%",
            renderCell: (row: Customer) => <Text view="primary" size="l">{row.customerKpp}</Text>,
        },
        {
            title: <Text view="normal" size="l" weight="semibold">Customer Legal Address</Text>,
            accessor: 'customerLegalAddress',
            align: 'center',
            sortable: true,
            width: "10%",
            renderCell: (row: Customer) => <Text view="primary" size="l">{row.customerLegalAddress}</Text>,
        },
        {
            title: <Text view="normal" size="l" weight="semibold">Customer Postal Address</Text>,
            accessor: 'customerPostalAddress',
            align: 'center',
            sortable: true,
            width: "10%",
            renderCell: (row: Customer) => <Text view="primary" size="l">{row.customerPostalAddress}</Text>,
        },
        {
            title: <Text view="normal" size="l" weight="semibold">Customer Email</Text>,
            accessor: 'customerEmail',
            align: 'center',
            sortable: true,
            width: "10%",
            renderCell: (row: Customer) => <Text view="primary" size="l">{row.customerEmail}</Text>,
        },
        {
            title: <Text view="normal" size="l" weight="semibold">Customer Code Main</Text>,
            accessor: 'customerCodeMain',
            align: 'center',
            sortable: true,
            width: "10%",
            renderCell: (row: Customer) => <Text view="primary" size="l">{row.customerCodeMain || "null"}</Text>,
        },
        {
            title: <Text view="normal" size="l" weight="semibold">Is Organization</Text>,
            accessor: 'isOrganization',
            align: 'center',
            width: "10%",
            renderCell: (row: Customer) => <Text view="primary" size="l">{row.isOrganization ? "Yes" : "No"}</Text>,
        },
        {
            title: <Text view="normal" size="l" weight="semibold">Is Person</Text>,
            accessor: 'isPerson',
            align: 'center',
            width: "10%",
            renderCell: (row: Customer) => <Text view="primary" size="l">{row.isPerson ? "Yes" : "No"}</Text>,
        },
        {
            title: <Text view="warning" size="l" weight="semibold">Edit</Text>,
            accessor: 'edit',
            align: 'center',
            width: "10%",
            renderCell: (row: Customer) => (
                <Link to={`edit/${row.id}`}>
                    <Button label="Edit" view="primary" form="round" />
                </Link>
            ),
        },
    ];

    type Item = {
        value: string;
        label: string;
    };

    const items: Item[] = [
        {value: "all", label: "All"},
        {value: "orgs", label: "Organizations"},
        {value: "persons", label: "Persons"}
    ];

    const items2: Item[] = [
        {value: "customerCode", label: "Customer Code"},
        {value: "customerName", label: "Customer Name"},
        {value: "customerInn", label: "Customer INN"},
        {value: "customerKpp", label: "Customer KPP"},
        {value: "customerLegalAddress", label: "Customer Legal Address"},
        {value: "customerPostalAddress", label: "Customer Postal Address"},
        {value: "customerEmail", label: "Customer Email"}
    ];

    const handleFilterChange = (newValue: Item | null) => {
        if (newValue) {
            setValue(newValue);
            setFilter(newValue.value);
        } else {
            setValue(null);
            setFilter("all");
        }
    };

    const handleFilterChange2 = (newValue: Item | null) => {
        if (newValue) {
            setValue2(newValue);
            setSortBy(newValue.value);
        } else {
            setValue2(null);
            setSortBy("all");
        }
    };

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const url = `http://localhost:8080/api/customer/filter-and-sort/${filter}/${sortBy}/${ascending}`;
                const response = await fetch(url);
                const data = await response.json();
                console.log("Fetched data:", data);
                setCustomers(data);
            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        };

        fetchCustomers();
    }, [sortBy, ascending, filter]);

    const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAscending(e.target.checked);
    };

    return (
        <div>
            <Text style={{textAlign: "center", marginTop: "20px"}}
                  view="brand" size="2xl" weight="semibold">Customers Table</Text>
            <div style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
                <Combobox
                    placeholder="Sort By"
                    items={items2}
                    value={value2}
                    onChange={handleFilterChange2}
                    style={{maxWidth: '300px', marginRight: '20px'}}
                />
                <Checkbox label="Ascending" checked={ascending} onChange={handleOrderChange} style={{marginBottom: "20px"}}/>
                <Combobox
                    placeholder="Filter"
                    items={items}
                    value={value}
                    onChange={handleFilterChange}
                    style={{maxWidth: '200px', marginRight: '20px', marginLeft: '20px'}}
                />
                <Link to={`add`}>
                    <Button label="Add Customer" view="primary" style={{marginBottom: "20px"}}/>
                </Link>
            </div>
            <Table
                columns={columns}
                rows={customers}
                zebraStriped="odd"
                borderBetweenColumns
                borderBetweenRows
                verticalAlign="center"
                size="m"
                stickyHeader
                style={{width: "100%", tableLayout: 'fixed'}}
            />
        </div>
    );
};

export default CustomersPage;