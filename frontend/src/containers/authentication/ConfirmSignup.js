import React, { useState, useEffect } from "react";
import { Auth, API } from "aws-amplify";
import Form from "react-bootstrap/Form";
import { useNavigate, useLocation } from "react-router-dom";
import LoaderButton from "../../components/LoaderButton";
import { useAppContext } from "../../lib/contextLib";
import { useFormFields } from "../../lib/hooksLib";
import { onError } from "../../lib/errorLib";
import "./authentication.css";

export default function ConfirmSignup(props) {
    const location = useLocation()

    const [fields, handleFieldChange] = useFormFields({
        username: location.state.username,
        password: location.state.password,
        confirmationCode: "",
    });
    const nav = useNavigate();
    const { userHasAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (fields.username && fields.password) {
            setIsLoading(false);
        }
    }, [fields.username, fields.password]);

    function validateConfirmationForm() {
        return fields.confirmationCode.length > 0;
    }

    async function handleConfirmationSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        try {
            await Auth.confirmSignUp(fields.username, fields.confirmationCode);
            await Auth.signIn(fields.username, fields.password);
            await createUserMeta(fields.username);
            userHasAuthenticated(true);
            nav("/dashboard");
        } catch (error) {
            onError(error);
            setIsLoading(false);
        }
    }

    async function createUserMeta(username) {
        try {
            const userMetaData = {
                EmailAddress: username,
                FirstName: username
            };

            const response = await API.post('venue-vista', '/users', {
                body: userMetaData
            });
        } catch (error) {
            onError(error);
        }
    }

    if (isLoading) {
        return <div>Loading...</div>; // Render a loading state
    }

    return (
        <div className="Signup">
            <Form onSubmit={handleConfirmationSubmit}>
                <Form.Group controlId="confirmationCode" size="lg">
                    <Form.Label>Confirmation Code</Form.Label>
                    <Form.Control
                        autoFocus
                        type="tel"
                        onChange={handleFieldChange}
                        value={fields.confirmationCode}
                    />
                    <Form.Text muted>Please check your email for the code.</Form.Text>
                </Form.Group>
                <LoaderButton
                    block="true"
                    size="lg"
                    type="submit"
                    variant="success"
                    isLoading={isLoading}
                    disabled={!validateConfirmationForm()}
                >
                    Verify
                </LoaderButton>
            </Form>
        </div>
    );
}