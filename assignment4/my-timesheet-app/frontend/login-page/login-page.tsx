import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import './login-page.css';

const API_BASE_URL = 'http://localhost:3001';

const LoginPage = () => {
    const [loginMethod, setLoginMethod] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    const handleLoginMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLoginMethod(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const identifier = loginMethod === 'username' ? username : email;

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ identifier, password }),
            });

            if (response.ok) {
                const userData = await response.json();
                localStorage.setItem('userData', JSON.stringify(userData));
                router.push('/timesheet');
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please try again.');
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Login Method</label>
                    <select value={loginMethod} onChange={handleLoginMethodChange}>
                        <option value="" disabled>Select One</option>
                        <option value="username">Login with Username</option>
                        <option value="email">Login with Authorized Email</option>
                    </select>
                </div>
                {loginMethod === 'username' && (
                    <div>
                        <label>Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                )}
                {loginMethod === 'email' && (
                    <div>
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                )}
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;