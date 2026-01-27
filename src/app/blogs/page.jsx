"use client";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../api/blogApi";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BlogsPage() {
  const [visibleCount, setVisibleCount] = useState(9);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const dispatch = useDispatch();
  const router = useRouter();
  
  const { blogs, status, error } = useSelector((state) => state.blogs || {
    blogs: [],
    status: 'idle',
    error: null
  });

  // Always fetch blogs on component mount
  useEffect(() => {
    setVisibleCount(9);
    setSelectedCategory("all");
    dispatch(fetchBlogs());
    
    return () => {
      // Optional cleanup
    };
  }, [dispatch]);

  // Handle route changes for refetching
  useEffect(() => {
    const handleRouteChange = () => {
      dispatch(fetchBlogs());
    };

    router.events?.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      router.events?.off('routeChangeComplete', handleRouteChange);
    };
  }, [dispatch, router]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  // Handle category tab click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setVisibleCount(9);
  };

  // Format date helper
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

  // Get blog image helper
  const getBlogImage = (blog) => {
    if (blog.featuredImage) return blog.featuredImage;
    
    if (blog.content) {
      if (blog.content.includes('<img')) {
        const imgMatch = blog.content.match(/src="([^"]+)"/);
        if (imgMatch && imgMatch[1]) return imgMatch[1];
      }
      if (blog.content.includes('![')) {
        const mdMatch = blog.content.match(/!\[.*?\]\((.*?)\)/);
        if (mdMatch && mdMatch[1]) return mdMatch[1];
      }
    }
    
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

  // Get category display name
  const getCategoryName = (category) => {
    const categoryNames = {
      'web-development': 'Web Dev',
      'ai': 'AI',
      'design': 'Design',
      'mobile': 'Mobile',
      'devops': 'DevOps',
      'other': 'General',
      'all': 'All'
    };
    return categoryNames[category] || category;
  };

  // Filter only published blogs
  const publishedBlogs = blogs.filter(blog => 
    blog.status === 'published' || !blog.status
  );

  // Get unique categories from published blogs (excluding "all")
  const categories = useMemo(() => {
    return publishedBlogs.reduce((acc, blog) => {
      const cat = blog.category || 'other';
      if (!acc[cat]) {
        acc[cat] = 0;
      }
      acc[cat]++;
      return acc;
    }, {});
  }, [publishedBlogs]);

  // Filter blogs by selected category
  const filteredBlogs = useMemo(() => {
    if (selectedCategory === 'all') {
      return publishedBlogs;
    }
    return publishedBlogs.filter(blog => 
      (blog.category || 'other') === selectedCategory
    );
  }, [publishedBlogs, selectedCategory]);

  // Get visible blogs based on filtered list and visible count
  const visibleBlogs = filteredBlogs.slice(0, visibleCount);

  // Loading state
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

  // No blogs state
  if (status === 'succeeded' && publishedBlogs.length === 0) {
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

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
          Our Latest Blogs
        </h1>
        <p className="text-justify px-4 mt-2 text-gray-400">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
        
        {/* Category Tabs - No All tab, no blue borders */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 my-8">
          {Object.entries(categories).map(([category, count]) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className="flex flex-col items-center min-w-[120px] transition-transform duration-300 ease-in-out hover:-translate-y-2 bg-white rounded-xl p-4 cursor-pointer border-2 border-gray-200"
            >
              {/* Circle Logo */}
              <div className="w-28 h-28 rounded-full flex items-center justify-center overflow-hidden p-4">
                <img 
                  src='https://4rxxdi1z0n.ucarecd.net/e85b56a4-69e9-44d4-8d57-fcb8c36d8cd2/Makeupbeauty.gif' 
                  alt="brand" 
                  className="w-full h-full object-contain" 
                />
              </div>
      
              {/* Category Info */}
              <div className="mt-3 flex items-center gap-1 font-bold text-lg">
                <p className="text-sm text-gray-700">{getCategoryName(category)} :</p>
                <p className="text-sm text-gray-700">{count}</p>
              </div>
              
              {/* Active indicator - Only blue dot */}
              {selectedCategory === category && (
                <div className="mt-2 w-3 h-3 rounded-full bg-blue-500"></div>
              )}
            </button>
          ))}
        </div>
        
        {/* Selected category indicator */}
        <div className="mt-4 mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full">
            <span className="font-medium">Showing:</span>
            <span className="ml-2 font-bold">
              {selectedCategory === 'all' ? 'All Categories' : getCategoryName(selectedCategory)}
            </span>
            <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              {filteredBlogs.length} blog{filteredBlogs.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </section>

      {/* Blogs Grid */}
      {visibleBlogs.length > 0 ? (
        <>
          <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {visibleBlogs.map((blog) => (
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
                      className="w-full h-full object-cover transition-transform "
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

                    {/* Author + Date */}
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

          {/* Load More Button */}
          {visibleCount < filteredBlogs.length && (
            <div className="flex justify-center mt-12">
              <button
                onClick={handleLoadMore}
                className="cursor-pointer px-6 py-3 rounded-xl bg-black text-white font-medium border border-transparent transition hover:bg-white hover:text-black hover:border-black"
              >
                Load More ({filteredBlogs.length - visibleCount} remaining)
              </button>
            </div>
          )}

          {/* All blogs loaded message */}
          {visibleCount >= filteredBlogs.length && filteredBlogs.length > 0 && (
            <div className="text-center mt-12">
              <p className="text-sm text-gray-400 mt-1">
                Showing all {filteredBlogs.length} 
                {selectedCategory === 'all' ? '' : ` ${getCategoryName(selectedCategory).toLowerCase()}`} blogs
              </p>
            </div>
          )}
        </>
      ) : (
        // No blogs in selected category
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {selectedCategory === 'all' 
              ? "No published blogs available" 
              : `No blogs in "${getCategoryName(selectedCategory)}" category`
            }
          </h3>
          <p className="text-gray-500 mb-6">
            {selectedCategory === 'all' 
              ? "Check back later for new blog posts." 
              : "Try selecting a different category or check back later for new content."
            }
          </p>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              View All Blogs
            </button>
          )}
        </div>
      )}
    </main>
  );
}