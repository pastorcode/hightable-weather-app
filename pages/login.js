import Head from 'next/head';
import {useEffect, useState} from 'react';
import Link from "next/link";

export default function LoginPage() {

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            window.location.href = '/';
        }
    }, []);


    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [alert, setAlert] = useState(null);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    }

    const handleAlertDismiss = () => {
        setAlert(null);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
        //submit form data to the server
        fetch('https://seashell-app-ryz44.ondigitalocean.app/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                if (data.status === 'success') {
                    setAlert({ type: 'success', message: data.message });
                    const encodedToken = btoa(`${formData.email}:${formData.password}`);
                    localStorage.setItem('token', encodedToken);
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 1000);
                } else {
                    setAlert({ type: 'danger', message: data.message });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setAlert({ type: 'danger', message: error.message });
            });
        
    }

    return (
        <div className="container">
            <Head>
                <title>HighTable Weather App | Login</title>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Oxygen+Mono&display=swap"
                    rel="stylesheet"
                />
                <link
                    rel="stylesheet"
                    href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossOrigin="anonymous"
                />
                <link rel="stylesheet" href="/style.css"/>
            </Head>

            <main className="py-4">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        {alert && (
                            <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                                {alert.message}
                                <button type="button" className="close" aria-label="Close" onClick={handleAlertDismiss}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        )}
                        <div className="card">
                            <div className="card-header text-center">
                                <Link href="/">HighTable Weather App</Link>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Enter email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <button className="button-lg" type="submit">
                                        Login
                                    </button>
                                </form>
                            </div>
                            <div className="card-footer">
                                <small>
                                    Don't have an account?{' '}
                                    <Link href="/register">
                                        Register here
                                    </Link>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
