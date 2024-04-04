import {InputController} from "../../ui/InputController";
import {validPassword} from "./email.rgx";
import React from "react";

export const Signin = ({control}: any) => {
    return (
        <>
            <InputController
                control={control}
                name='email'
                label='Email or name'
                placeholder='Enter ur email or name'
                rules={{
                    required: "Email/name is required",
                }}
            />

            <InputController
                control={control}
                name='password'
                label='Password'
                placeholder='Enter ur password'
                rules={{
                    required: "Password is required",
                    pattern: {
                        value: validPassword,
                        message: "Ur password is invalid"
                    },
                }}
            /></>
    )
}