// Login.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
    const [user, setUser] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);

    let history = useHistory();

    const onChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    }

    const login = () => {
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        .then(res => {
            if (res.ok) {
                const jwtToken = res.headers.get('Authorization');
                if (jwtToken !== null) {
                    sessionStorage.setItem("jwt", jwtToken);
                    history.push("/");
                }
            } else {
                // Gère les erreurs de réponse, comme l'authentification incorrecte
                setError("Invalid login. Please try again.");
            }
        })
        .catch(err => {
            console.error('Caught error: ', err);
            setError("Something went wrong. Please try again.");
        });
    }

    return (
        <div className="App">
            {error && <p>{error}</p>}
            <table>
                <tbody>
                    <tr>
                        <td><label htmlFor="email">Username:</label></td>
                        <td><input type="text" name="username" value={user.username} onChange={onChange} /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="password">Password:</label></td>
                        <td><input type="password" name="password" value={user.password} onChange={onChange} /></td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <button id="submit" onClick={login}>Login</button>
        </div>
    );
}

export default Login;
