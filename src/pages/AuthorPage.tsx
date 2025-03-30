import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchAuthorArticles } from "../store/Slices/blog/blogSlice";
import BlogCard from "../components/BlogCard";
import Loader from "../components/Loader";
import Error from "../components/Error";

const AuthorPage: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const dispatch = useAppDispatch();
    const { authorArticles, loading, error } = useAppSelector((state) => state.blog);

    useEffect(() => {
        if (username) {
            dispatch(fetchAuthorArticles(username));
        }
    }, [dispatch, username]);

    if (loading) return <Loader />;
    if (error) return <Error message={error} />;

    if (!authorArticles) return <p>No articles found for this author.</p>;

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-8">
                Articles by {authorArticles[0]?.user.name || "Author"}
            </h1>
            <div className="flex flex-col items-center mb-8">
                <img
                    src={authorArticles[0]?.user.profile_image}
                    alt={authorArticles[0]?.user.name}
                    className="w-32 h-32 rounded-full mb-4"
                />
                <h2 className="text-2xl font-semibold">
                    {authorArticles[0]?.user.name}
                </h2>
                <p className="text-gray-500">@{authorArticles[0]?.user.username}</p>
            </div>
            <h2 className="text-2xl font-semibold text-center mb-4">Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {authorArticles.map((article) => (
                    <BlogCard
                        key={article.id}
                        id={article.id}
                        title={article.title}
                        description={article.description || "No description available"}
                        coverImage={article.cover_image}
                        authorName={article.user.name}
                        authorImage={article.user.profile_image}
                        publishingTime={article.published_timestamp}
                        readablePublishDate={article.readable_publish_date}
                        tagList={article.tag_list || []}
                    />
                ))}
            </div>
        </div>
    );
};

export default AuthorPage;
