import Link from "next/link";

export default function BlogCard({ image, title, description, slug }) {
  return (
    <Link href={`/blogs/${slug}`}>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer h-full flex flex-col">
        <img
          src={image}
          alt={title}
          className="h-40 w-full object-cover"
        />
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-bold text-lg mb-2 line-clamp-2">{title}</h3>
          <p className="text-sm text-gray-600 line-clamp-3 flex-1">
            {description}
          </p>
          <span className="mt-4 text-sm font-semibold text-blue-600">
            Read More →
          </span>
        </div>
      </div>
    </Link>
  );
}
