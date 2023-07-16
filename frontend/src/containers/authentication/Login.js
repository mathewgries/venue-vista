import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useDispatch } from 'react-redux'
import { fetchUser } from '../../redux/slices/userSlice'
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import LoaderButton from "../../components/LoaderButton";
import { useAppContext } from "../../lib/contextLib";
import { useFormFields } from "../../lib/hooksLib";
import { onError } from "../../lib/errorLib";
import "./authentication.css";

export default function Login() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const { userHasAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",
    });

    function validateForm() {
        return fields.email.length > 0 && fields.password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        try {
            await Auth.signIn(fields.email, fields.password);
            userHasAuthenticated(true);
            await loadUser()
            nav("/dashboard");
        } catch (error) {
            onError(error);
            setIsLoading(false);
        }
    }

    async function loadUser(){
        setIsLoading(true)
        try {
            await dispatch(fetchUser()).unwrap()
        }catch(error){
            onError(error);
            setIsLoading(false)
        }
    }

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={fields.email}
                        onChange={handleFieldChange}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={fields.password}
                        onChange={handleFieldChange}
                    />
                </Form.Group>
                <LoaderButton
                    block="true"
                    size="lg"
                    type="submit"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Login
                </LoaderButton>
                <Form.Group>
                    <Link to="/reset-password">
                        Reset Password
                    </Link>
                </Form.Group>
            </Form>
        </div>
    );
}