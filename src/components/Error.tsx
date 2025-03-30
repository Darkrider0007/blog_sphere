import React from 'react';

interface ErrorProps {
    message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
    return (
        <div className="text-red-600 text-center py-4">
            <p>{message}</p>
        </div>
    );
};

export default Error;
