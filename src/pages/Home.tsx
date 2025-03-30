import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchBlogs } from "../store/Slices/blog/blogSlice";
import BlogCard from '../components/BlogCard';
import AuthorCard from '../components/AuthorCard';
import Loader from '../components/Loader';
import Error from '../components/Error';

const HomePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { blogs, loading, error } = useAppSelector((state) => state.blog);

    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);

    if (loading) return <Loader />;
    if (error) return <Error message={error} />;

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* Hero Section */}
            <div className="text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12 rounded-lg shadow-md mb-10">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Welcome to BlogSphere</h1>
                <p className="text-base sm:text-lg md:text-xl max-w-full sm:max-w-xl mx-auto px-4">
                    Dive into a universe of ideas and insights, brought to you by passionate authors from all around the globe.
                    Discover the latest trends, technology updates, and personal stories right here!
                </p>
            </div>

            {/* Featured Blogs Section */}
            <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6">Featured Blogs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...blogs]
                        .sort(() => Math.random() - 0.5)
                        .slice(0, 6)
                        .map((blog) => (
                            <BlogCard
                                key={blog.id}
                                id={blog.id}
                                title={blog.title}
                                description={blog.description || 'No description available'}
                                coverImage={blog.cover_image}
                                authorName={blog.user.name}
                                authorImage={blog.user.profile_image}
                                publishingTime={blog.published_timestamp}
                                readablePublishDate={new Date(blog.published_timestamp).toLocaleDateString()}
                                tagList={blog.tag_list || []}
                            />
                        ))}
                </div>
            </section>
            <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6">Top Authors</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {blogs.slice(0, 8).map((blog) => (
                        <AuthorCard
                            key={blog.id}
                            name={blog.user.name}
                            profileImage={blog.user.profile_image}
                            url={blog.user.website_url || '#'}
                        />
                    ))}
                </div>
            </section>
            <section>
                <h2 className="text-3xl font-semibold mb-6">Latest Blogs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...blogs]
                        .sort((a, b) => new Date(b.published_timestamp).getTime() - new Date(a.published_timestamp).getTime())
                        .slice(0, 6)
                        .map((blog) => (
                            <BlogCard
                                key={blog.id}
                                id={blog.id}
                                title={blog.title}
                                description={blog.description || 'No description available'}
                                coverImage={blog.cover_image || 'https://via.placeholder.com/400'}
                                authorName={blog.user.name}
                                authorImage={blog.user.profile_image}
                                publishingTime={blog.published_timestamp}
                                readablePublishDate={new Date(blog.published_timestamp).toLocaleDateString()}
                                tagList={blog.tag_list || []}
                            />
                        ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
