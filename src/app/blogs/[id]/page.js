"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { fetchBlog } from "../../../api/blogApi";
import Link from "next/link";

// Demo related blogs data - you can replace this with actual API call
const demoRelatedBlogs = [
  {
    id: 2,
    title: "10 TailwindCSS Tricks for Developers",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    category: "CSS",
  },
  {
    id: 3,
    title: "Next.js 15 — Everything You Need to Know",
    image: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=600&q=80",
    category: "Next.js",
  },
  {
    id: 4,
    title: "AI in Design: How to Use It Right",
    image: "https://images.unsplash.com/photo-1581091215367-59ab6a8a7a84?auto=format&fit=crop&w=600&q=80",
    category: "AI & Design",
  },
];

export default function BlogDetailPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const { currentBlog, status } = useSelector((state) => state.blogs || {
    currentBlog: null,
    status: 'idle'
  });

  useEffect(() => {
    if (params.slug || params.id) {
      dispatch(fetchBlog(params.slug || params.id));
    }
  }, [dispatch, params.slug, params.id]);

  // Loading state
  if (status === 'loading') {
    return (
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog...</p>
        </div>
      </main>
    );
  }

  // Error/Not found state
  if (!currentBlog) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog not found</h1>
          <p className="text-gray-600">The blog you're looking for doesn't exist.</p>
          <Link 
            href="/blogs" 
            className="mt-4 inline-block text-blue-600 hover:text-blue-800"
          >
            ← Back to all blogs
          </Link>
        </div>
      </main>
    );
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  // Parse markdown content with headings
  const renderContent = (content) => {
    if (!content) return null;
    
    return content.split("\n").map((para, idx) => {
      const trimmedPara = para.trim();
      if (trimmedPara.startsWith("## ")) {
        return <h2 key={idx} className="text-2xl font-bold mt-10 mb-4">{trimmedPara.replace("## ", "")}</h2>;
      } else if (trimmedPara.startsWith("# ")) {
        return <h1 key={idx} className="text-3xl font-bold mt-10 mb-6">{trimmedPara.replace("# ", "")}</h1>;
      } else if (trimmedPara.startsWith("### ")) {
        return <h3 key={idx} className="text-xl font-bold mt-8 mb-3">{trimmedPara.replace("### ", "")}</h3>;
      } else if (trimmedPara) {
        return <p key={idx} className="text-gray-700 mb-4">{trimmedPara}</p>;
      }
      return null;
    });
  };

  // Prepare blog data for your UI structure
  const blog = {
    id: currentBlog.id,
    title: currentBlog.title,
    category: currentBlog.category || currentBlog.tags?.[0] || "General",
    author: {
      name: currentBlog.author || "Anonymous",
      avatar: currentBlog.authorAvatar || "https://randomuser.me/api/portraits/men/32.jpg",
      bio: currentBlog.authorBio || currentBlog.excerpt || "Blog author",
    },
    date: formatDate(currentBlog.publishDate || currentBlog.createdAt),
    cover: currentBlog.featuredImage || currentBlog.cover || "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=1200&q=80",
    content: currentBlog.content || "",
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg mb-10">
        <img
          src={blog.cover}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white p-6">
          <span className="bg-blue-600 px-4 py-1 rounded-full text-xs uppercase mb-3">
            {blog.category}
          </span>
          <h1 className="text-2xl md:text-4xl font-bold">{blog.title}</h1>
          <p className="mt-2 text-sm">{blog.date}</p>
          {/* Additional info from Redux data */}
          {/* <div className="flex items-center gap-4 mt-4 text-sm">
            {(currentBlog.views || currentBlog.views > 0) && (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {currentBlog.views} views
              </span>
            )}
            {currentBlog.readingTime && (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {currentBlog.readingTime} min read
              </span>
            )}
          </div> */}
        </div>
      </div>

      {/* Author Box */}
      <div className="flex items-center gap-4 mb-12 bg-gray-50 rounded-xl p-5 shadow-sm">
        <img
          src={blog.author.avatar}
          alt={blog.author.name}
          className="w-14 h-14 rounded-full"
        />
        <div>
          <h3 className="font-semibold">{blog.author.name}</h3>
          <p className="text-sm text-gray-600">{blog.author.bio}</p>
        </div>
      </div>

      {/* Blog Content */}
      <article className="prose lg:prose-lg max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-gray-700 prose-img:rounded-xl">
        {renderContent(blog.content)}
        
        {/* Show tags if available */}
        {currentBlog.tags && currentBlog.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {currentBlog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Back button */}
      <div className="mt-12">
        <Link 
          href="/blogs" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to all blogs
        </Link>
      </div>

      {/* Related Blogs */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Blogs</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {demoRelatedBlogs.map((rb) => (
            <Link href={`/blogs/${rb.id}`} key={rb.id}>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer">
                <div className="relative w-full h-40">
                  <img
                    src={rb.image}
                    alt={rb.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
                    {rb.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold line-clamp-2">
                    {rb.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}