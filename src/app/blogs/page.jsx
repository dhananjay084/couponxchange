"use client";
import { useState } from "react";
import Image from "next/image";

// Demo blogs data with Unsplash images
const allBlogs = [
  {
    id: 1,
    title: "The Future of Web Development",
    excerpt: "Discover upcoming trends and technologies shaping the web in 2025.",
    category: "Web Dev",
    author: "John Doe",
    date: "Sep 5, 2025",
    image:       "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",

  },
  {
    id: 2,
    title: "10 TailwindCSS Tricks for Developers",
    excerpt: "Level up your frontend skills with these practical Tailwind tips.",
    category: "CSS",
    author: "Sarah Kim",
    date: "Sep 2, 2025",
    image:       "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",

  },
  {
    id: 3,
    title: "Next.js 15 — Everything You Need to Know",
    excerpt: "A complete guide to what's new in Next.js 15 and how to upgrade.",
    category: "Next.js",
    author: "Alex Carter",
    date: "Aug 28, 2025",
    image:       "https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=600&q=80",

  },
  {
    id: 4,
    title: "AI in Design: How to Use It Right",
    excerpt: "AI tools are powerful, but here’s how designers can use them smartly.",
    category: "AI & Design",
    author: "Lisa Wong",
    date: "Aug 21, 2025",
    image:       "https://images.unsplash.com/photo-1581091215367-59ab6a8a7a84?auto=format&fit=crop&w=600&q=80",

  },
  {
    id: 5,
    title: "Top 5 JavaScript Frameworks in 2025",
    excerpt: "Explore the most popular frameworks and when to use them.",
    category: "JavaScript",
    author: "Michael Ross",
    date: "Aug 15, 2025",
    image:       "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80",

  },
  {
    id: 6,
    title: "Design Systems: Why You Need One",
    excerpt: "A design system improves collaboration and speeds up development.",
    category: "UI/UX",
    author: "Emily Davis",
    date: "Aug 10, 2025",
    image:       "https://images.unsplash.com/photo-1587613755811-084934e4caa4?auto=format&fit=crop&w=600&q=80",

  },
  {
    id: 7,
    title: "The Rise of Serverless Architecture",
    excerpt: "Learn how serverless is reshaping backend development.",
    category: "Cloud",
    author: "James Lee",
    date: "Aug 3, 2025",
    image:       "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",

  },
  {
    id: 8,
    title: "Accessibility in Web Design",
    excerpt: "Tips and tools to make your websites more inclusive.",
    category: "Accessibility",
    author: "Rachel Green",
    date: "Jul 28, 2025",
    image:       "https://images.unsplash.com/photo-1612200981877-6ff614b15e83?auto=format&fit=crop&w=600&q=80",

  },
  {
    id: 9,
    title: "Dark Mode Design Best Practices",
    excerpt: "Make your apps more user-friendly with dark mode design tips.",
    category: "Design",
    author: "Chris Brown",
    date: "Jul 20, 2025",
    image:       "https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?auto=format&fit=crop&w=600&q=80",

  },
  {
    id: 10,
    title: "The Role of TypeScript in Modern Apps",
    excerpt: "Why TypeScript has become the default choice for large-scale apps.",
    category: "TypeScript",
    author: "Sophia Liu",
    date: "Jul 15, 2025",
    image:       "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=600&q=80",
    
  },
];

export default function BlogsPage() {
  const [visibleCount, setVisibleCount] = useState(6); // show 6 blogs initially

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3); // load 3 more blogs each time
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
          Our Latest Blogs
        </h1>
        <p className="text-gray-600 mt-3 text-sm md:text-base max-w-2xl mx-auto">
          Insights, tutorials, and the latest news in web development, design,
          and technology.
        </p>
      </section>

      {/* Blogs Grid */}
      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {allBlogs.slice(0, visibleCount).map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col"
          >
            {/* Blog Image */}
            <div className="relative w-full h-48 overflow-hidden">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
              />
              <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
                {blog.category}
              </span>
            </div>

            {/* Blog Content */}
            <div className="flex flex-col flex-1 p-5">
              <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                {blog.title}
              </h2>
              <p className="text-sm text-gray-600 flex-1 line-clamp-3">
                {blog.excerpt}
              </p>

              {/* Author + Date */}
              <div className="flex items-center justify-between mt-5 text-xs text-gray-500">
                <span>By {blog.author}</span>
                <span>{blog.date}</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Pagination / Load More */}
      {visibleCount < allBlogs.length && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleLoadMore}
            className=" cursor-pointer px-6 py-3 rounded-xl bg-black text-white font-medium border border-transparent transition hover:bg-white hover:text-black hover:border-black"
          >
            Load More
          </button>
        </div>
      )}
    </main>
  );
}
