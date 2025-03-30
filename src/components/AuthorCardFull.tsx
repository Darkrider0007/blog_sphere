import React from "react";
import { Link } from "react-router-dom";

interface AuthorCardProps {
    name: string;
    username: string;
    profileImage: string;
    websiteUrl?: string | null;
}

const AuthorCardFull: React.FC<AuthorCardProps> = ({ name, username, profileImage, websiteUrl }) => {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
            <Link to={`/author/${username}`}>
                <img
                    src={profileImage}
                    alt={name}
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-center">{name}</h3>
                <p className="text-center text-gray-500">@{username}</p>
            </Link>
            {websiteUrl && (
                <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-center block mt-2 hover:underline"
                >
                    Visit Website
                </a>
            )}
        </div>
    );
};

export default AuthorCardFull;
