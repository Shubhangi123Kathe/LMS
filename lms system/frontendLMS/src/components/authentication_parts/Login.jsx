import { useRef, useState } from "react"
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from "axios";
export default function Login() {
    const email = useRef("");
    const password = useRef("");
    const fEmail = useRef("");
    const [forgot, setForgot] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const onSubmitLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const data = {
                email: email.current.value,
                password: password.current.value,
            };
            const response = await axios.post("http://localhost:3000/user/login", data, {
                withCredentials: true,
            });
            alert(response.data.message);
            window.location.reload();
        } catch (error) {
            console.error(error);
            setErrorMessage(error.response?.data?.message || "Login failed");
            alert(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const forgetPassword = async () => {
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const response = await axios.post(
                "http://localhost:3000/user/forgetPassword",
                { email: fEmail.current.value },
                { withCredentials: true }
            );

            alert(response.data.message);

            

        } catch (error) {
            console.error(error);
            setErrorMessage(error.response?.data?.message || "Failed to reset password");
            alert(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            {
                isLoading && <div style={{ position: "absolute", top: "25vh", left: "25vw", height: "150px", width: "150px", zIndex: "5" }} className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            }
            <div className="login-cont">
                <form onSubmit={onSubmitLogin}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input ref={email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input ref={password} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                <div style={{ padding: "10px", display: "flex", alignItems: "flex-end", width: "100%" }}>
                    <button onClick={() => setForgot(true)} style={{ backgroundColor: "transparent", width: "30%", color: "black" }} type="submit" className="btn btn-primary">Forgot Password</button>
                </div>

                {
                    forgot && <div className="forgot-cont">
                        <IoIosCloseCircleOutline style={{ alignSelf: "flex-end" }} size={30} onClick={() => setForgot(false)} />
                        <form onSubmit={forgetPassword}>
                            <input type="email" placeholder="Enter email: " ref={fEmail} />
                            <input type="submit" value="Sumbit" />
                        </form>
                    </div>
                }

            </div>
        </>
    )
}