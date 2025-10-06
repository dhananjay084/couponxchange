import Image from "next/image";

// Demo blog data
const blog = {
    id: 1,
    title: "The Future of Web Development",
    category: "Web Dev",
    author: {
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Full-stack developer and writer, passionate about Next.js & AI.",
    },
    date: "Sep 5, 2025",
    cover:
      "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=1200&q=80",
    content: `
    Web development is evolving rapidly, and 2025 brings exciting trends and
    technologies. From AI-assisted coding to the rise of serverless
    architectures, developers need to adapt to stay relevant.

    ## 1. AI-Powered Development
    Tools like GitHub Copilot are becoming mainstream, making development
    faster and more collaborative.

    ## 2. Serverless & Edge Computing
    Serverless platforms will continue to grow, helping developers build
    scalable applications with less infrastructure management.

    ## 3. WebAssembly & Performance
    With WebAssembly, heavy computations can run in the browser, opening up
    opportunities for new kinds of apps.

    Overall, the future of web development looks exciting, with developers at
    the center of innovation.
  `,
};


const relatedBlogs = [
    {
      id: 2,
      title: "10 TailwindCSS Tricks for Developers",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
      category: "CSS",
    },
    {
      id: 3,
      title: "Next.js 15 — Everything You Need to Know",
      image:
        "https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=600&q=80",
      category: "Next.js",
    },
    {
      id: 4,
      title: "AI in Design: How to Use It Right",
      image:
        "https://images.unsplash.com/photo-1581091215367-59ab6a8a7a84?auto=format&fit=crop&w=600&q=80",
      category: "AI & Design",
    },
  ];

export default function BlogDetailPage() {
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
  {blog.content.split("\n").map((para, idx) =>
    para.startsWith("##") ? (
      <h2 key={idx}>{para.replace("## ", "")}</h2>
    ) : (
      <p key={idx}>{para}</p>
    )
  )}
</article>

  
        {/* Related Blogs */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Blogs</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {relatedBlogs.map((rb) => (
              <div
                key={rb.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
              >
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
            ))}
          </div>
        </section>
      </main>
    );
  }
  
