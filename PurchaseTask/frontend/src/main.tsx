import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import CustomersPage from "./pages/CustomersPage";
import EditCustomerPage from "./pages/EditCustomerPage";
import AddCustomerPage from "./pages/AddCustomerPage";
import LotsPage from "./pages/LotsPage";
import EditLotPage from "./pages/EditLotPage";
import AddLotPage from "./pages/AddLotPage";

import {presetGpnDefault, Theme} from "@consta/uikit/Theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Theme preset={presetGpnDefault}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App/>}>
                        <Route index element={<HomePage/>}/>
                        <Route path="customers" element={<CustomersPage/>}/>
                        <Route path="customers/edit/:id" element={<EditCustomerPage/>}/>
                        <Route path="customers/add" element={<AddCustomerPage/>}/>
                        <Route path="lots" element={<LotsPage/>}/>
                        <Route path="lots/edit/:id" element={<EditLotPage/>}/>
                        <Route path="lots/add" element={<AddLotPage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Theme>
    </React.StrictMode>
);