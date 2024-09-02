import React from "react";
import {Link} from "react-router-dom";
import {Button} from '@consta/uikit/Button';
import {Text} from '@consta/uikit/Text';

const HomePage: React.FC = () => {
    return (
        <div style={{textAlign: "center", marginTop: "60px"}}>
            <Text view="brand" size="3xl" weight="semibold">Purchase Web-Application</Text>
            <div style={{marginTop: "40px", display: "flex", justifyContent: "center", gap: "10px"}}>
                <Link to="/customers">
                    <Button label="Customers Table" view="primary" size="l" style={{marginRight: '20px'}}/>
                </Link>
                <Link to="/lots">
                    <Button label="Lots table" view="primary" size="l"/>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;