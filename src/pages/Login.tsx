import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login, logout } from '../store/Slices/auth/authSlice';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useAppDispatch();
    const { isAuthenticated, error } = useAppSelector((state) => state.auth);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const user = useAppSelector((state) => state.auth.user);

    const handleLogin = async () => {
        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 3000));

            const resultAction = await dispatch(login({ username, password }));
            if (user) {
                console.log('User logged in:', { username, password });
                navigate('/');
            } else {
                console.error('Login failed:', resultAction.payload || 'An unknown error occurred.');
            }

        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setLoading(false);
        }
    };


    const handleLogout = () => {
        dispatch(logout());
        console.log('User logged out');
    };

    return (
        <div className="flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

                {isAuthenticated ? (
                    <div className="text-center">
                        <p className="text-green-500 mb-4">You are logged in!</p>
                        <button onClick={handleLogout} className="w-full p-3 rounded-md text-white font-semibold bg-red-500 hover:bg-red-600">Logout</button>
                    </div>
                ) : (
                    <>
                        <input
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        <input
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        {error && (
                            <p className="text-red-500 text-sm mb-4">{error}</p>
                        )}

                        <button
                            onClick={handleLogin}
                            className={`w-full p-3 rounded-md text-white font-semibold transition ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <AiOutlineLoading3Quarters className="animate-spin text-white text-2xl mx-auto" />
                            ) : (
                                'Login'
                            )}
                        </button>

                        <div className="mt-4 text-center text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-blue-500 hover:underline">
                                Signup
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Login;
