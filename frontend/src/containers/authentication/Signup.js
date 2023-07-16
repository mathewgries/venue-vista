import React, { useState } from "react";
import { Auth } from "aws-amplify";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import LoaderButton from "../../components/LoaderButton";
import { useAppContext } from "../../lib/contextLib";
import { useFormFields } from "../../lib/hooksLib";
import { onError } from "../../lib/errorLib";
import "./authentication.css";

export default function Signup() {
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const nav = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return (
            fields.email.length > 0 &&
            fields.password.length > 0 &&
            fields.password === fields.confirmPassword
        );
    }
    
    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        const newUser = {
          username: fields.email,
          password: fields.password,
        };
      
        try {
          await signUp(newUser);
          nav("/confirm-signup", { state: { ...newUser } });
        } catch (error) {
          if (error.code === 'UsernameExistsException') {
            try {
              await resendConfirmationCode(newUser);
              alert('Confirmation code resent. Please check your email');
              nav("/confirm-signup", { state: { ...newUser } });
            } catch (resendError) {
              handleResendError(resendError);
            }
          } else {
            handleSignUpError(error);
          }
        }
      
        setIsLoading(false);
      }
      
      async function signUp(newUser) {
        try {
          await Auth.signUp({ ...newUser });
        } catch (error) {
          throw error;
        }
      }
      
      async function resendConfirmationCode(user) {
        try {
          await Auth.resendSignUp(user.username);
        } catch (error) {
          throw error;
        }
      }
      
      function handleSignUpError(error) {
        onError(error);
        setIsLoading(false);
      }
      
      function handleResendError(error) {
        if (error.code === 'InvalidParameterException' && error.message === 'User is already confirmed.') {
          alert('An account with this username already exists');
          nav("/login");
        } else {
          onError(error);
        }
        setIsLoading(false);
      }
      

    return (
        <div className="Signup">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email" size="lg">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={fields.email}
                        onChange={handleFieldChange}
                    />
                </Form.Group>
                <Form.Group controlId="password" size="lg">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={fields.password}
                        onChange={handleFieldChange}
                    />
                </Form.Group>
                <Form.Group controlId="confirmPassword" size="lg">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        onChange={handleFieldChange}
                        value={fields.confirmPassword}
                    />
                </Form.Group>
                <LoaderButton
                    block="true"
                    size="lg"
                    type="submit"
                    variant="success"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Signup
                </LoaderButton>
            </Form>
        </div>
    );
}