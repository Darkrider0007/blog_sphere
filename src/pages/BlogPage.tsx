import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { useAppSelector } from '../store/hooks';
import Loader from '../components/Loader';
import Error from '../components/Error';
import "../Css/BlogPage.css";

interface Comment {
    username: string;
    text: string;
}

interface Blog {
    id: number;
    title: string;
    description: string;
    readable_publish_date: string;
    cover_image: string | null;
    social_image: string;
    published_timestamp: string;
    reading_time_minutes: number;
    tag_list: string[];
    body_html: string;
    likes: number;
    likedByUser: boolean;
    comments: Comment[];
    user: {
        name: string;
        username: string;
        profile_image: string;
    };
}

const BlogPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);

    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [comment, setComment] = useState<string>('');

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`https://dev.to/api/articles/${id}`);
                const data = await response.json();
                data.likes = 0;
                data.likedByUser = false;
                data.comments = [];
                setBlog(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    if (loading) return <Loader />;
    if (error) return <Error message={error} />;
    if (!blog) return <Error message="Blog not found!" />;

    // Sanitize HTML to prevent XSS attacks
    const sanitizedContent = DOMPurify.sanitize(blog.body_html);

    // Handle Like Toggle
    const handleLike = () => {
        if (blog) {
            const updatedBlog = {
                ...blog,
                likedByUser: !blog.likedByUser,
                likes: blog.likedByUser ? blog.likes - 1 : blog.likes + 1,
            };
            setBlog(updatedBlog);
        }
    };

    // Handle Add Comment
    const handleAddComment = () => {
        if (comment.trim() && isAuthenticated) {
            const newComment = { username: user?.username || 'Anonymous', text: comment };
            const updatedBlog = {
                ...blog,
                comments: [...blog.comments, newComment],
            };
            setBlog(updatedBlog);
            setComment('');
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* Blog Cover Image */}
            {blog.cover_image ? (
                <img
                    src={blog.cover_image}
                    alt={blog.title}
                    className="w-full h-64 object-cover rounded-lg shadow-md mb-6"
                />
            ) : (
                <img
                    src={blog.social_image}
                    alt={blog.title}
                    className="w-full h-64 object-cover rounded-lg shadow-md mb-6"
                />
            )}

            {/* Blog Title */}
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{blog.title}</h1>

            {/* Blog Metadata */}
            <div className="flex items-center gap-4 mb-4">
                <img
                    src={blog.user.profile_image}
                    alt={blog.user.name}
                    className="w-12 h-12 rounded-full"
                />
                <div>
                    <p className="text-gray-700 text-lg">
                        By <span className="font-semibold">{blog.user.name}</span> (
                        <span className="text-blue-500">@{blog.user.username}</span>)
                    </p>
                    <p className="text-gray-500 text-sm">{blog.readable_publish_date}</p>
                    <p className="text-gray-500 text-sm">Reading Time: {blog.reading_time_minutes} mins</p>
                </div>
            </div>

            {/* Tags */}
            <div className="flex gap-2 mb-6 flex-wrap">
                {Array.isArray(blog.tag_list) &&
                    blog.tag_list.map((tag) => (
                        <span
                            key={tag}
                            className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm"
                        >
                            #{tag}
                        </span>
                    ))}
            </div>

            {/* Blog Content */}
            <div
                className="blog-content bg-white p-6 rounded-lg shadow-md"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />

            {/* Like Button */}
            <div className="mt-6">
                <button
                    onClick={handleLike}
                    className={`px-4 py-2 rounded-md font-semibold ${blog.likedByUser ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
                        } hover:bg-opacity-80 transition duration-300`}
                >
                    {blog.likedByUser ? 'Unlike' : 'Like'} ({blog.likes})
                </button>
            </div>

            {/* Comments Section */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Comments</h2>

                {isAuthenticated ? (
                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        <button
                            onClick={handleAddComment}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Comment
                        </button>
                    </div>
                ) : (
                    <p className="text-gray-500">Log in to add a comment.</p>
                )}

                <div className="space-y-2">
                    {blog.comments.map((c, index) => (
                        <div
                            key={index}
                            className="p-3 bg-gray-200 rounded-md shadow-sm"
                        >
                            <span className="font-semibold">{c.username}</span>: {c.text}
                        </div>
                    ))}
                    {blog.comments.length === 0 && (
                        <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
