import {validEmail, validLatin, validPassword} from "./email.rgx";
import {InputController} from "../../ui/InputController";

export const Signup = ({control, watch}: any) => {

    const password = watch("password");

    return (
        <>
            <InputController
                control={control}
                name='email'
                label='Email'
                placeholder='Enter ur email'
                rules={{
                    required: "Email is required",
                    pattern: {
                        value: validEmail,
                        message: "Ur Email is invalid"
                    },
                }}
            />

            <InputController
                control={control}
                name='firstname'
                label='First name'
                placeholder='Enter ur first name'
                rules={{
                    required: "first name is required",
                    pattern: {
                        value: validLatin,
                        message: "Ur first name is invalid"
                    },
                }}
            />
            <InputController
                control={control}
                name='surename'
                label='Sure name'
                placeholder='Enter ur sure name'
                rules={{
                    required: "Sure name is required",
                    pattern: {
                        value: validLatin,
                        message: "Ur sure name is invalid"
                    },
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
            />
            <InputController
                control={control}
                name='confirmpassword'
                label='Confirmation assword'
                placeholder='Enter ur confirmation password'
                rules={{
                    required: "Password confirmation is required",
                    validate: value =>
                        value === password || "Passwords do not match"
                }}
            />

        </>
    )
}