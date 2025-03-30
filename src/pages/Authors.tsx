import React from "react";
import { useAppSelector } from "../store/hooks";
import AuthorCardFull from "../components/AuthorCardFull";

const Authors: React.FC = () => {
    const authors = useAppSelector((state) => state.blog.authors);

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h2 className="text-4xl font-bold mb-8 text-center">Our Amazing Authors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {authors.map((author) => (
                    <AuthorCardFull
                        key={author.user_id}
                        name={author.name}
                        username={author.username}
                        profileImage={author.profile_image}
                        websiteUrl={author.website_url}
                    />
                ))}
            </div>
        </div>
    );
};

export default Authors;
