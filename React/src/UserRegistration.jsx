import { useState } from 'react';
import axios from 'axios';

const UserRegistration = () => {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [message, setMessage] = useState('');
    const [usernameStatus, setUsernameStatus] = useState(false);
    const [emailStatus, setEmailStatus] = useState(false);
    const checkUsername = () => {
        axios
            .get(`/userregistration/checkusername/${username}`)
            .then((res) => {
                if (res.data.status === 0) {
                    setUsernameStatus(true);
                } else {
                    setUsernameStatus(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const checkEmail = () => {
        axios
            .get(`/userregistration/checkemail/${email}`)
            .then((res) => {
                console.log(res.data.status);
                if (res.data.status === 0) {
                    setEmailStatus(true);
                } else {
                    setEmailStatus(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const createUser = (event) => {
        event.preventDefault();
        checkUsername();
        checkEmail();
        if (!usernameStatus && !emailStatus) {
            const userObject = {
                username: event.target.username.value,
                email: event.target.email.value,
                password: event.target.password.value,
                dob: event.target.dob.value,
            };
            axios
                .post('/userregistration', userObject)
                .then((res) => {
                    setMessage(res.data);
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    return (
        <div className="container-fluid text-center">
            <h1 className="mt-3">Registration</h1>
            <h3>{!usernameStatus && !emailStatus ? message : ''}</h3>
            <form className="form-group" onSubmit={createUser}>
                <b className="subHeading">User Name : </b>
                <input
                    className="form-control d-inline-flex w-50"
                    type="text"
                    name="username"
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Enter User Name"
                />
                <button className="btn btn-primary" onClick={checkUsername}>
                    <b>Check Username</b>
                </button>
                {usernameStatus ? (
                    <span className="showInfo">
                        <br />
                        User name exists
                    </span>
                ) : (
                    ''
                )}
                <br />
                <b className="subHeading">Email : </b>
                <input
                    className="form-control d-inline-flex w-50"
                    type="email"
                    name="email"
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter Email Id"
                />
                <button className="btn btn-primary" onClick={checkEmail}>
                    <b>Check Email</b>
                </button>
                {emailStatus ? (
                    <span className="showInfo">
                        <br />
                        Email exists
                    </span>
                ) : (
                    ''
                )}
                <br />
                <b className="subHeading">Password : </b>
                <input
                    className="form-control d-inline-flex w-50"
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                />
                <br />
                <b className="subHeading">Date of Birth: </b>
                <input
                    className="form-control d-inline-flex w-50"
                    type="date"
                    name="dob"
                    placeholder="Enter Date of Birth"
                />
                <br />
                <button className="btn btn-success">
                    <b>Register</b>
                </button>
                <br />
            </form>
        </div>
    );
};
export default UserRegistration;
