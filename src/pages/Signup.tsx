import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { signup } from '../store/Slices/auth/authSlice';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

interface SignupFormInputs {
    username: string;
    password: string;
    fullName: string;
}

const Signup = () => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>();
    const navigate = useNavigate();

    const handleSignup: SubmitHandler<SignupFormInputs> = async (data) => {
        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 3000));
            dispatch(signup(data));
            navigate('/');
            console.log('User signed up:', data);
        } catch (error) {
            console.error('Signup failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Signup</h2>

                <form onSubmit={handleSubmit(handleSignup)} noValidate>
                    <input
                        placeholder="Full Name"
                        {...register("fullName", { required: "Full Name is required" })}
                        className="w-full p-3 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    {errors.fullName && (
                        <p className="text-red-500 text-sm mb-4">{errors.fullName.message}</p>
                    )}

                    <input
                        placeholder="Username"
                        {...register("username", { required: "Username is required" })}
                        className="w-full p-3 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm mb-4">{errors.username.message}</p>
                    )}

                    <input
                        placeholder="Password"
                        type="password"
                        {...register("password", { required: "Password is required" })}
                        className="w-full p-3 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mb-4">{errors.password.message}</p>
                    )}


                    <button
                        type="submit"
                        className={`w-full p-3 rounded-md text-white font-semibold transition ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                        disabled={loading}
                    >
                        {loading ? (
                            <AiOutlineLoading3Quarters className="animate-spin text-white text-2xl mx-auto" />
                        ) : (
                            'Signup'
                        )}
                    </button>
                </form>
                <div className="mt-4 text-center text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
