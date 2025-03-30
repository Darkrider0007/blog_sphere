import React from 'react';
import { Link } from 'react-router-dom';

interface BlogProps {
    id: number;
    title: string;
    description: string;
    coverImage: string;
    authorName: string;
    authorImage: string;
    publishingTime: Date;
    readablePublishDate: string;
    tagList: string[];
}

const BlogCard: React.FC<BlogProps> = ({
    id,
    title,
    description,
    coverImage,
    authorName,
    authorImage,
    readablePublishDate,
    tagList
}) => {
    return (
        <Link to={`/blogs/${id}`} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
            <img src={coverImage} alt={title} className="w-full h-52 object-cover" />
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                <p className="text-gray-600 mt-2">{description}</p>
                <div className="flex items-center mt-4">
                    <img src={authorImage} alt={authorName} className="w-10 h-10 rounded-full mr-2" />
                    <span className="text-gray-700">{authorName}</span>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                    <p>Published: {readablePublishDate}</p>
                </div>
                <div className="mt-2">
                    {tagList.map((tag, index) => (
                        <span key={index} className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full mr-2">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
