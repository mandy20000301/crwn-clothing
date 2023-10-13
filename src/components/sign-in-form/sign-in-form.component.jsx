import { useState } from "react";

import { signInWithGooglePopup, createUserDocumentFromAuth,signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.styles.scss'
const defaultFormFields = {
    email: '',
    password: '',
}
const SignInForm = () => {
    const [formFileds, setFormFileds] = useState(defaultFormFields)
    const { email, password } = formFileds;


    const resetFormFields = () => {
        setFormFileds(defaultFormFields);
    }
    const signWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email,password);
            resetFormFields();
        } catch (error) {
            alert('incorrect password or email');
            console.log(error.message);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFileds({ ...formFileds, [name]: value })
    }
    return (
        <div className="sign-up-container">
            <h2>Already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput label='Password' type="password" required onChange={handleChange} name="password" value={password} />
                <div className="button-box">
                    <Button type="submit">Sign In</Button >
                    <Button type="button" buttonType='google' onClick={signWithGoogle}>Google Sign In</Button >
                </div>
            </form>
        </div>
    )
}
export default SignInForm;