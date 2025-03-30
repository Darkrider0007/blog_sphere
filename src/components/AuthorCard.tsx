import React from 'react';

interface AuthorProps {
    name: string;
    profileImage: string;
    bio?: string;
    url: string;
}

const AuthorCard: React.FC<AuthorProps> = ({ name, profileImage, bio, url }) => {
    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
            <div className="flex items-center">
                <img src={profileImage} alt={name} className="w-16 h-16 rounded-full mr-4" />
                <div>
                    <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
                    <p className="text-gray-600">{bio}</p>
                </div>
            </div>
        </a>
    );
};

export default AuthorCard;
