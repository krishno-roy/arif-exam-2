import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SingleBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/posts/${id}`);
        const data = await response.json();
        setPost(data);

        // Load saved likes/dislikes from localStorage
        const savedLikes = localStorage.getItem(`blog_${id}_likes`);
        const savedDislikes = localStorage.getItem(`blog_${id}_dislikes`);

        if (savedLikes) setLikes(parseInt(savedLikes));
        if (savedDislikes) setDislikes(parseInt(savedDislikes));

        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

 

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!post) {
    return <div className="text-center py-8">Post not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-black text-white rounded hover:bg-gray-500 transition-colors"
      >
        ← Back to Blog
      </button>

      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-sm text-gray-800 px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          <p className="text-gray-700 text-lg leading-relaxed mb-8 whitespace-pre-line">
            {post.body}
          </p>

        </div>
      </article>
    </div>
  );
};

export default SingleBlog;
