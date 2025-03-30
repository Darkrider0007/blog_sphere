import { useEffect, useState } from 'react';
import { fetchBlogs } from '../store/Slices/blog/blogSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import BlogCard from '../components/BlogCard';
import Loader from '../components/Loader';
import Error from '../components/Error';

const Blogs = () => {
    const dispatch = useAppDispatch();
    const { blogs, loading, error } = useAppSelector((state) => state.blog);

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedTag, setSelectedTag] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<string>('latest');
    const [filteredBlogs, setFilteredBlogs] = useState(blogs);

    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);

    useEffect(() => {
        let filtered = blogs;

        if (searchQuery) {
            const lowercasedQuery = searchQuery.toLowerCase();
            filtered = filtered.filter((blog) =>
                blog.title.toLowerCase().includes(lowercasedQuery) ||
                blog.description?.toLowerCase().includes(lowercasedQuery) ||
                blog.user.name.toLowerCase().includes(lowercasedQuery)
            );
        }

        if (selectedTag) {
            filtered = filtered.filter((blog) =>
                blog.tag_list?.includes(selectedTag)
            );
        }

        filtered = [...filtered].sort((a, b) => {
            const dateA = new Date(a.published_timestamp).getTime();
            const dateB = new Date(b.published_timestamp).getTime();
            return sortOrder === 'latest' ? dateB - dateA : dateA - dateB;
        });


        setFilteredBlogs(filtered);
    }, [blogs, searchQuery, selectedTag, sortOrder]);

    const allTags = Array.from(new Set(blogs.flatMap((blog) => blog.tag_list || [])));

    if (loading) return <Loader />;
    if (error) return <Error message={error} />;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="text-center mb-6">
                <h1 className="text-5xl font-bold text-gray-800 mb-4">Explore Blogs</h1>
                <p className="text-xl text-gray-600">
                    Dive into the latest articles written by passionate authors around the world.
                </p>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Search blogs by title, description, or author..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full md:w-1/2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                >
                    <option value="" className="text-gray-500">
                        All Tags
                    </option>
                    {allTags.map((tag) => (
                        <option key={tag} value={tag} className="text-gray-700">
                            {tag}
                        </option>
                    ))}
                </select>

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                </select>
            </div>

            {filteredBlogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredBlogs.map((blog) => (
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
            ) : (
                <div className="text-center text-gray-500 mt-10">
                    No blogs found for the search query or selected filter.
                </div>
            )}
        </div>
    );
};

export default Blogs;
