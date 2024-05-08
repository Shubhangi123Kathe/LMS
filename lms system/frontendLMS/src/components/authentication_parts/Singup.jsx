import { useRef } from "react";
import axios from 'axios';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

export default function Signup() {
    const formRef = useRef(null);

    const onSignupSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        const formData = new FormData(formRef.current);

        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            school: formData.get('school'),
            education: formData.get('education'),
            role: formData.get('role'),
            mobileNumber: formData.get('mobileNumber'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword')
        };

        axios.post("http://localhost:3000/user/signup", data, { withCredentials: true })
            .then((response) => {
                alert(response.data.message);
                formRef.current.reset(); // Reset the form after successful submission
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="signup-cont">
            <form ref={formRef} onSubmit={onSignupSubmit}>
                <div className="form-group">
                    <label htmlFor="InputName11">Name</label>
                    <input type="text" className="form-control" id="InputName11" name="name" aria-describedby="nameHelp" placeholder="Enter name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="InputEmail1">Email address</label>
                    <input type="email" className="form-control" id="InputEmail1" name="email" aria-describedby="emailHelp" placeholder="Enter email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="InputSchool">School name</label>
                    <input type="text" className="form-control" id="InputSchool" name="school" aria-describedby="schoolHelp" placeholder="Enter school name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="InputEdu">Education</label>
                    <input type="text" className="form-control" id="InputEdu" name="education" aria-describedby="eduHelp" placeholder="Enter Qualification" required />
                </div>
                <div className="form-group">
                    <label htmlFor="InputRole">Role</label>
                    <input type="text" className="form-control" id="InputRole" name="role" aria-describedby="roleHelp" placeholder="Enter role" required />
                </div>
                <div className="form-group">
                    <label htmlFor="InputNumber">Mobile Number</label>
                    <PhoneInput
                        defaultCountry="in"
                        name="mobileNumber"
                        inputProps={{
                            name: "mobileNumber",
                            required: true
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="InputPassword1">Password</label>
                    <input type="password" className="form-control" id="InputPassword1" name="password" placeholder="Password" required />
                </div>
                <div className="form-group">
                    <label htmlFor="InputPassword2">Confirm Password</label>
                    <input type="password" className="form-control" id="InputPassword2" name="confirmPassword" placeholder="Repeat password" required />
                </div>
                <button type="submit" className="btn btn-success">Sign up</button>
            </form>
        </div>
    );
}
