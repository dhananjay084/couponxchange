"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../api/blogApi";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BlogsPage() {
  const [visibleCount, setVisibleCount] = useState(6);
  const dispatch = useDispatch();
  const router = useRouter();
  const { blogs, status, error } = useSelector((state) => state.blogs || {
    blogs: [],
    status: 'idle',
    error: null
  });

  // Always fetch blogs on component mount, regardless of status
  useEffect(() => {
    // Reset visible count when page loads
    setVisibleCount(6);
    
    // Fetch blogs every time component mounts
    dispatch(fetchBlogs());
    
    // Cleanup function to reset if needed
    return () => {
      // Optional: Reset blog state when leaving page
      // dispatch(resetBlogs()); // You'd need to create this action
    };
  }, [dispatch]); // Remove status dependency

  // Also refetch when router path changes (optional)
  useEffect(() => {
    const handleRouteChange = () => {
      dispatch(fetchBlogs());
    };

    // You can listen to route changes if needed
    router.events?.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      router.events?.off('routeChangeComplete', handleRouteChange);
    };
  }, [dispatch, router]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  // Loading state - show loading if status is 'loading' OR if blogs array is empty and we're not in failed state
  const isLoading = status === 'loading' || (status === 'idle' && !blogs?.length);
  
  if (isLoading) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-12">
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
            Our Latest Blogs
          </h1>
        </section>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blogs...</p>
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (status === 'failed') {
    return (
      <main className="max-w-7xl mx-auto px-4 py-12">
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
            Our Latest Blogs
          </h1>
        </section>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-medium">Error loading blogs</p>
          <p className="text-red-500 text-sm mt-2">{error || 'Please try again later'}</p>
          <button
            onClick={() => dispatch(fetchBlogs())}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  // No blogs state - check if blogs array is actually empty after loading
  if (status === 'succeeded' && (!blogs || blogs.length === 0)) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-12">
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
            Our Latest Blogs
          </h1>
        </section>
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No blogs yet</h3>
          <p className="text-gray-500">Be the first to create a blog post!</p>
        </div>
      </main>
    );
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
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

  // Get first image from content (fallback to featuredImage)
  const getBlogImage = (blog) => {
    // Try featured image first
    if (blog.featuredImage) return blog.featuredImage;
    
    // Try to extract image from content
    if (blog.content) {
      // For HTML content
      if (blog.content.includes('<img')) {
        const imgMatch = blog.content.match(/src="([^"]+)"/);
        if (imgMatch && imgMatch[1]) return imgMatch[1];
      }
      // For markdown content
      if (blog.content.includes('![')) {
        const mdMatch = blog.content.match(/!\[.*?\]\((.*?)\)/);
        if (mdMatch && mdMatch[1]) return mdMatch[1];
      }
    }
    
    // Fallback to default Unsplash images based on category
    const categoryImages = {
      'web-development': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
      'ai': 'https://images.unsplash.com/photo-1581091215367-59ab6a8a7a84?auto=format&fit=crop&w=600&q=80',
      'design': 'https://images.unsplash.com/photo-1587613755811-084934e4caa4?auto=format&fit=crop&w=600&q=80',
      'mobile': 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80',
      'devops': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
      'default': 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80'
    };
    
    return categoryImages[blog.category] || categoryImages.default;
  };

  // Get display category name
  const getCategoryName = (category) => {
    const categoryNames = {
      'web-development': 'Web Dev',
      'ai': 'AI',
      'design': 'Design',
      'mobile': 'Mobile',
      'devops': 'DevOps',
      'other': 'General'
    };
    return categoryNames[category] || category;
  };

  // Filter only published blogs
  const publishedBlogs = blogs.filter(blog => 
    blog.status === 'published' || !blog.status // Include if no status field
  );

  // If we have no published blogs after filtering
  if (publishedBlogs.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-12">
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
            Our Latest Blogs
          </h1>
        </section>
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔒</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No published blogs</h3>
          <p className="text-gray-500">All blogs are currently in draft or pending status.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
          Our Latest Blogs
        </h1>
        
        {/* Blog Stats */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {Object.entries(
            publishedBlogs.reduce((acc, blog) => {
              const cat = blog.category || 'other';
              acc[cat] = (acc[cat] || 0) + 1;
              return acc;
            }, {})
          ).map(([category, count]) => (
            <div key={category} className="bg-gray-50 px-4 py-2 rounded-lg">
              <span className="font-semibold">{count}</span>
              <span className="text-gray-600 ml-2">{getCategoryName(category)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {publishedBlogs.slice(0, visibleCount).map((blog) => (
          <Link
            key={blog._id || blog.id}
            href={`/blogs/${blog.slug || blog._id}`}
            className="block"
            prefetch={true}
          >
            <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col h-full">
              {/* Blog Image */}
              <div className="relative w-full h-48">
                <img
                  src={getBlogImage(blog)}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
                  {getCategoryName(blog.category)}
                </span>
                {blog.isFeatured && (
                  <span className="absolute top-3 right-3 bg-yellow-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
                    Featured
                  </span>
                )}
              </div>

              {/* Blog Content */}
              <div className="flex flex-col flex-1 p-5">
                <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-600 flex-1 line-clamp-3">
                  {blog.excerpt || 
                    (blog.content 
                      ? blog.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
                      : 'No content available')
                  }
                </p>

                {/* Author + Date + Stats */}
                <div className="mt-5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>By {blog.author || 'Anonymous'}</span>
                    <span>{formatDate(blog.publishDate || blog.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Pagination / Load More */}
      {publishedBlogs.length > 0 && visibleCount < publishedBlogs.length && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleLoadMore}
            className="cursor-pointer px-6 py-3 rounded-xl bg-black text-white font-medium border border-transparent transition hover:bg-white hover:text-black hover:border-black"
          >
            Load More ({publishedBlogs.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {/* Show message when all blogs loaded */}
      {visibleCount >= publishedBlogs.length && publishedBlogs.length > 0 && (
        <div className="text-center mt-12">
          <p className="text-sm text-gray-400 mt-1">
            Showing all {publishedBlogs.length} published blogs
          </p>
        </div>
      )}
    </main>
  );
}