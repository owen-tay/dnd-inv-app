import React, { useEffect, useState } from "react";
import { createClient } from "contentful";
import { Link } from "react-router-dom";
import "../App.css";

export const Blog = () => {
  const [blogPosts, SetBlogPosts] = useState([]);
  const client = createClient({
    space: process.env.REACT_APP_SPACE_ID,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  });
  useEffect(() => {
    const getAllEntries = async () => {
      try {
        await client.getEntries().then((entries) => {
          console.log(entries);
          SetBlogPosts(entries);
        });
      } catch (error) {
        console.log("error");
      }
    };
    getAllEntries();
  }, []);

  return (
    <div className="fadein">
      <div className="">
        <div>
          <div className="bg-base-200 rounded-xl  lg:m-7">
          <h1 className="text-4xl font-bold mt-3 text-center">
            The DnD Tracker Blog
          </h1>
          <p className="text-lg  mt-3 text-center">
            Embark on a journey through the multifaceted realms of Dungeons &
            Dragons and other table-top role-playing games on our blog, where
            imagination meets reality.
          </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-10 justify-center items-start h-full gap-y-10">
            {blogPosts?.items?.map((post) => (
              <section
                className="flex flex-col h-full max-w-lg mx-auto bg-base-200 shadow-md rounded-md overflow-hidden"
                key={post.sys.id}
              >
                <header className="post-header">
                  <img
                    className=" h-72 w-full object-cover"
                    src={post.fields.blogImage.fields.file.url}
                    alt={post.fields.blogTitle}
                  />
                  <div className="p-2">
                    <h2 className="text-2xl font-bold pt-1">
                      {post.fields.blogTitle}
                    </h2>
                    <p className="post-meta">
                      By{" "}
                      <a href="https://owentaylor.dev/" className="post-author">
                        {post.fields.blogAuthor}
                      </a>{" "}
                      | <span></span>
                      <small>
                        {new Intl.DateTimeFormat("en-GB", {
                          month: "long",
                          day: "2-digit",
                          year: "numeric",
                        }).format(new Date(post.fields.createDate))}
                      </small>
                    </p>
                  </div>
                </header>
                <div className="post-description flex flex-col flex-grow p-2">
                  <p className="flex-grow">{post.fields.blogSummary}</p>
                  <div className="mt-auto">
                    <Link
                      to={`/blogDetails/${post.sys.id}`}
                      className="btn btn-secondary w-full text-center py-2 mt-2"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
