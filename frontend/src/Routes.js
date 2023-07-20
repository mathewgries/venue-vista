import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./containers/authentication/Login";
import Signup from "./containers/authentication/Signup";
import ConfirmSignup from "./containers/authentication/ConfirmSignup";
import ResetPassword from "./containers/authentication/ResetPassword"

import Dashboard from "./containers/dashboard/Dashboard"

import NotFound from "./containers/app/NotFound";

export default function Links() {
    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/confirm-signup" element={<ConfirmSignup />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            {
                /* Finally, catch all unmatched routes */
            }
            <Route path="*" element={<NotFound />} />;
        </Routes>
    );
}