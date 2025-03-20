import React, { useEffect, useState } from "react";
import { createClient } from "contentful";
import { Link } from "react-router-dom";
import { FaDiceD20 } from "react-icons/fa";
import { scroller } from "react-scroll";

import "../App.css";

export const Blog = () => {
  const [blogPosts, setBlogPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const client = createClient({
    space: process.env.REACT_APP_SPACE_ID,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  });

  useEffect(() => {
    const getAllEntries = async () => {
      try {
        setLoading(true);
        const entries = await client.getEntries({
          content_type: "dndBlog", // Filter entries by content type
        });
        setBlogPosts(entries);
        setLoading(false);
      } catch (error) {
        console.log("error");
        setLoading(false);
      }
    };
    getAllEntries();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen">
        <div className="bg-base-200 p-8 rounded-xl shadow-xl flex flex-col items-center">
          <FaDiceD20 size="60" className="text-secondary animate-spin mb-4" />
          <div className="flex items-center text-2xl font-medium">
            Loading<span className="loading loading-dots loading-md ml-2"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fadein overflow-hidden pt-8 pb-16">
      <div className="container mx-auto px-4">
        {/* Blog Header */}
        <div className="bg-base-200 rounded-xl p-8 mb-12 shadow-xl border-t-4 border-secondary">
          <h1 className="text-4xl sm:text-5xl font-bold text-center bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-6">
            The DnD Tracker Blog
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary to-primary mx-auto rounded-full mb-6"></div>
          <p className="text-lg sm:text-xl text-center max-w-3xl mx-auto leading-relaxed">
            Embark on a journey through the multifaceted realms of Dungeons &
            Dragons and other table-top role-playing games on our blog, where
            imagination meets reality.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-10">
          {blogPosts?.items?.map((post) => (
            <article
              className="flex flex-col h-full bg-base-200 shadow-xl rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border-t-4 border-secondary"
              key={post.sys.id}
            >
              {/* Post Header/Image */}
              <header className="relative">
                <img
                  className="h-64 w-full object-cover"
                  src={post.fields.blogImage.fields.file.url}
                  alt={post.fields.blogTitle}
                />
                {/* Date Badge */}
                <div className="absolute top-4 right-4 bg-base-100 bg-opacity-90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md text-sm font-medium">
                  {new Intl.DateTimeFormat("en-GB", {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                  }).format(new Date(post.fields.createDate))}
                </div>
              </header>

              {/* Post Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                  {post.fields.blogTitle}
                </h2>
                
                <p className="text-sm mb-4">
                  By{" "}
                  <a 
                    href="https://owentaylor.dev/" 
                    className="font-medium bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent hover:underline"
                  >
                    {post.fields.blogAuthor}
                  </a>
                </p>
                
                <p className="flex-grow leading-relaxed mb-6">
                  {post.fields.blogSummary}
                </p>
                
                <div className="mt-auto">
                  <Link
                    to={`/blogDetails/${post.sys.id}`}
                    className="btn btn-secondary w-full text-center py-3 transition-all hover:btn-primary hover:shadow-lg"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* If no posts */}
        {(!blogPosts?.items || blogPosts.items.length === 0) && (
          <div className="text-center p-12 bg-base-200 rounded-xl shadow-md">
            <h3 className="text-xl font-medium">No blog posts found</h3>
            <p className="mt-2">Check back soon for new content!</p>
          </div>
        )}
      </div>
    </div>
  );
};