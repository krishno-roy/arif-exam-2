import React, { useEffect, useState } from "react";

const Blog = () => {
  const [blog, setBlog] = useState([]);
  const [likes, setLikes] = useState({}); 
  const [dislikes, setDislikes] = useState({});

  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => setBlog(data.posts));
  }, []);

  const handleLike = (id) => {
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleDislike = (id) => {
    setDislikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
      {blog.map((post) => (
        <div key={post.id} className="mb-6 p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
          <p className="text-gray-700 mb-3">{post.body}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mb-3">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-sm text-gray-800 px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Like / Dislike Buttons */}
          <div className="flex gap-4 items-center">
            <button
              onClick={() => handleLike(post.id)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
            >
              👍 Like ({likes[post.id] || 0})
            </button>
            <button
              onClick={() => handleDislike(post.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
            >
              👎 Dislike ({dislikes[post.id] || 0})
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;
