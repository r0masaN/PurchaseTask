import React from "react";
import {Outlet} from "react-router-dom";
import {Theme, presetGpnDefault} from '@consta/uikit/Theme';

const App: React.FC = () => {
    return (
        <Theme preset={presetGpnDefault}>
            <div>
                <Outlet/>
            </div>
        </Theme>
    );
};

export default App;