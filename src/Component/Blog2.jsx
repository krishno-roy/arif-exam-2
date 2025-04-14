import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Blog2 = () => {
  const [blog, setBlog] = useState([]);
  const [likes, setLikes] = useState({});
  const [dislikes, setDislikes] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => setBlog(data.posts));
  }, []);

  const handleLike = (id, e) => {
    e.stopPropagation();
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleDislike = (id, e) => {
    e.stopPropagation();
    setDislikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handlePostClick = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {blog.map((post) => (
          <div
            key={post.id}
            onClick={() => handlePostClick(post.id)}
            className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col h-full"
          >
            <div className="p-4 flex-grow">
              <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                {post.title}
              </h2>
              <p className="text-gray-700 mb-4 line-clamp-3">{post.body}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-xs text-gray-800 px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog2;
