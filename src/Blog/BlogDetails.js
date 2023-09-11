import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createClient } from "contentful";
import ReactMarkdown from "react-markdown";
import { FaDiceD20 } from "react-icons/fa";
import "../App.css";

const BlogDetails = () => {
  const [singleBlogPost, setSingleBlogPost] = useState(null);
  const [loading, setLoading] = useState(true); 
  const client = createClient({
    space: process.env.REACT_APP_SPACE_ID,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  });

  const { id } = useParams();

  useEffect(() => {
    const getEntryById = async () => {
      try {
        setLoading(true); 
        const entry = await client.getEntry(id);
        setSingleBlogPost(entry);
        setLoading(false); 
      } catch (error) {
        console.log(`Error fetching blog post: ${error}`);
        setLoading(false); 
      }
    };
    getEntryById();
  }, [id]);

  if (loading) {
    return (
      <div className="text-2xl flex text-accent-content  w-full  h-96 justify-center items-center ">
        <FaDiceD20 size="30" className=" animate-spin" />
        Loading<span className="loading loading-dots loading-xs mt-6"></span>
      </div>
    );
  }

  return (
    <div className="fadein">
      <div className="flex justify-center w-screen">
        <div>
          <div className="flex justify-center">
            <section className=" justify-center m-4 lg:m-10 max-w-4xl">
              <Link to={"/blog/"} className="text-xl">
                Back
              </Link>
              <header className="">
                <div className="flex justify-center">
                  <img
                    className=" h-96 w-full object-cover rounded-xl border-2"
                    src={singleBlogPost?.fields?.blogImage?.fields?.file?.url}
                    alt={singleBlogPost?.fields?.blogTitle}
                  />
                </div>
                <h1 className="text-center text-content font-bold text-3xl mt-3">
                  {singleBlogPost?.fields?.blogTitle}
                </h1>
                <div className="text-center">
                  <p className="">
                    By{" "}
                    <a
                      href="https://owentaylor.dev/"
                      className="hover:text-secondary"
                    >
                      {singleBlogPost?.fields?.blogAuthor}
                    </a>{" "}
                    | <span></span>
                    <small>
                      {singleBlogPost?.fields?.createDate === undefined
                        ? "loading"
                        : new Intl.DateTimeFormat("en-GB", {
                            month: "long",
                            day: "2-digit",
                            year: "numeric",
                          }).format(
                            new Date(singleBlogPost?.fields?.createDate)
                          )}
                    </small>
                  </p>
                </div>
              </header>
              <ReactMarkdown>
                {singleBlogPost?.fields?.blogContent}
              </ReactMarkdown>
              <Link to={"/blog/"} className=" text-center text-xl mt-10">
                Back
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
