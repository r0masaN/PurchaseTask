import React, {useEffect, useState} from "react";
import {Lot} from "../models/Lot";
import {Link} from "react-router-dom";
import {Text} from "@consta/uikit/Text";
import {Combobox} from "@consta/uikit/Combobox";
import {Checkbox} from "@consta/uikit/Checkbox";
import {Button} from "@consta/uikit/Button";
import {Table} from "@consta/uikit/Table";

const LotsPage: React.FC = () => {
    const [lots, setLots] = useState<Lot[]>([]);
    const [sortBy, setSortBy] = useState<string>("lotName");
    const [ascending, setAscending] = useState<boolean>(true);
    const [currencyFilter, setCurrencyFilter] = useState<string>("all");
    const [ndsFilter, setNdsFilter] = useState<string>("all");

    const [value, setValue] = useState<Item | null>({value: "all", label: "All"});
    const [value2, setValue2] = useState<Item | null>({value: "lotName", label: "Lot Name"});
    const [value1, setValue1] = useState<Item | null>({value: "all", label: "All"});

    const columns = [
        {
            title: <Text view="normal" size="l" weight="semibold">Lot Name</Text>,
            accessor: 'lotName',
            align: 'center',
            sortable: true,
            width: "10%",
            renderCell: (row: Lot) => <Text view="primary" size="l">{row.lotName}</Text>,
        },
        {
            title: <Text view="normal" size="l" weight="semibold">Customer Code</Text>,
            accessor: 'customerCode',
            align: 'center',
            sortable: true,
            width: "10%",
            renderCell: (row: Lot) => <Text view="primary" size="l">{row.customerCode}</Text>,
        },
        {
            title: <Text view="normal" size="l" weight="semibold">Price</Text>,
            accessor: 'price',
            align: 'center',
            sortable: true,
            width: "10%",
            renderCell: (row: Lot) => <Text view="primary" size="l">{row.price}</Text>,
        },
        {
            title: <Text view="normal" size="l" weight="semibold">Currency Code</Text>,
            accessor: 'currencyCode',
            align: 'center',
            width: "10%",
            renderCell: (row: Lot) => <Text view="primary" size="l">{row.currencyCode}</Text>,
        },
        {
            title: <Text view="normal" size="l" weight="semibold">NDS Rate</Text>,
            accessor: 'ndsRate',
            align: 'center',
            width: "10%",
            renderCell: (row: Lot) => <Text view="primary" size="l">{row.ndsRate}</Text>,
        },
        {
            title: <Text view="normal" size="l" weight="semibold">Place Delivery</Text>,
            accessor: 'placeDelivery',
            align: 'center',
            sortable: true,
            width: "10%",
            renderCell: (row: Lot) => <Text view="primary" size="l">{row.placeDelivery}</Text>,
        },
        {
            title: <Text view="normal" size="l" weight="semibold">Date Delivery</Text>,
            accessor: 'dateDelivery',
            align: 'center',
            sortable: true,
            width: "10%",
            renderCell: (row: Lot) => <Text view="primary" size="l">{new Date(row.dateDelivery).toLocaleDateString()}</Text>,
        },
        {
            title: <Text view="warning" size="l" weight="semibold">Edit</Text>,
            accessor: 'edit',
            align: 'center',
            width: "10%",
            renderCell: (row: Lot) => (
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
        {value: "RUB", label: "RUB"},
        {value: "USD", label: "USD"},
        {value: "EUR", label: "EUR"}
    ];

    const items2: Item[] = [
        {value: "lotName", label: "Lot Name"},
        {value: "customerCode", label: "Customer Code"},
        {value: "price", label: "Price"},
        {value: "placeDelivery", label: "Place Delivery"},
        {value: "dateDelivery", label: "Date Delivery"}
    ];

    const items1: Item[] = [
        {value: "all", label: "All"},
        {value: "without", label: "Without NDS"},
        {value: "18", label: "18%"},
        {value: "20", label: "20%"}
    ];

    const fetchLots = () => {
        const url = `http://localhost:8080/api/lot/filter-and-sort/${currencyFilter}/${ndsFilter}/${sortBy}/${ascending}`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => setLots(data))
            .catch((error) => console.error("Error fetching lots:", error));
    };

    useEffect(() => {
        fetchLots();
    }, [sortBy, ascending, currencyFilter, ndsFilter]);

    const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAscending(e.target.checked);
    };

    const handleFilterChange = (newValue: Item | null) => {
        if (newValue) {
            setValue(newValue);
            setCurrencyFilter(newValue.value);
        } else {
            setValue(null);
            setCurrencyFilter("all");
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

    const handleFilterChange1 = (newValue: Item | null) => {
        if (newValue) {
            setValue1(newValue);
            setNdsFilter(newValue.value);
        } else {
            setValue1(null);
            setNdsFilter("all");
        }
    };

    return (
        <div>
            <Link to={`/`}>
                <Button label="Home" view="secondary" style={{marginBottom: "20px"}}/>
            </Link>
            <Text style={{textAlign: "center", marginTop: "20px"}}
                  view="brand" size="2xl" weight="semibold">Lots Table</Text>
            <div style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
                <Combobox
                    placeholder="Sort By"
                    items={items2}
                    value={value2}
                    onChange={handleFilterChange2}
                    style={{maxWidth: '250px', marginRight: '20px'}}
                />
                <Checkbox label="Ascending" checked={ascending} onChange={handleOrderChange} style={{marginBottom: "20px"}}/>
                <Combobox
                    placeholder="Currency Filter"
                    items={items}
                    value={value}
                    onChange={handleFilterChange}
                    style={{maxWidth: '200px', marginLeft: '20px'}}
                />
                <Combobox
                    placeholder="NDS Filter"
                    items={items1}
                    value={value1}
                    onChange={handleFilterChange1}
                    style={{maxWidth: '200px', marginLeft: '20px', marginRight: '20px'}}
                />
                <Link to={`add`}>
                    <Button label="Add Lot" view="primary" style={{marginBottom: "20px"}}/>
                </Link>
            </div>

            <Table
                columns={columns}
                rows={lots}
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

export default LotsPage;