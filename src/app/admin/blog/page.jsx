// BlogEditorForm.js
'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { format } from 'date-fns';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import CodeBlock from '@tiptap/extension-code-block';
import Placeholder from '@tiptap/extension-placeholder';
import { toast } from 'react-hot-toast';

// Redux actions
import { createBlog, updateBlog, deleteBlog, fetchBlogs } from '../../../api/blogApi';

// Toolbar component (same as before)
const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-gray-300 bg-gray-50 rounded-t-lg">
      {/* Toolbar buttons - same as before */}
      <button 
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-3 py-1 text-sm rounded ${editor.isActive('bold') ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
      >
        B
      </button>
      <button 
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-3 py-1 text-sm rounded ${editor.isActive('italic') ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
      >
        I
      </button>
      <button 
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`px-3 py-1 text-sm rounded ${editor.isActive('underline') ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
      >
        U
      </button>
      <button 
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`px-3 py-1 text-sm rounded ${editor.isActive('strike') ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
      >
        S
      </button>

      <select
        onChange={(e) => {
          const value = e.target.value;
          if (value === '') {
            editor.chain().focus().setParagraph().run();
          } else {
            editor.chain().focus().toggleHeading({ level: Number(value) }).run();
          }
        }}
        className="border px-2 py-1 rounded text-sm ml-2"
      >
        <option value="">Paragraph</option>
        <option value="1">Heading 1</option>
        <option value="2">Heading 2</option>
        <option value="3">Heading 3</option>
      </select>

      <button 
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-3 py-1 text-sm rounded ${editor.isActive('bulletList') ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
      >
        • List
      </button>
      <button 
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`px-3 py-1 text-sm rounded ${editor.isActive('orderedList') ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
      >
        1. List
      </button>
      <button 
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`px-3 py-1 text-sm rounded ${editor.isActive('blockquote') ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
      >
        Quote
      </button>
      <button 
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`px-3 py-1 text-sm rounded ${editor.isActive('codeBlock') ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
      >
        {'</>'}
      </button>
      <button 
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`px-3 py-1 text-sm rounded ${editor.isActive({ textAlign: 'left' }) ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
      >
        ⬅
      </button>
      <button 
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`px-3 py-1 text-sm rounded ${editor.isActive({ textAlign: 'center' }) ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
      >
        ⬍
      </button>
      <button 
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`px-3 py-1 text-sm rounded ${editor.isActive({ textAlign: 'right' }) ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
      >
        ➡
      </button>
      <button 
        onClick={() => {
          const url = window.prompt('Enter Image URL:');
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
        className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300"
      >
        📷 Image
      </button>
      <button 
        onClick={() => {
          const url = window.prompt('Enter URL');
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        className={`px-3 py-1 text-sm rounded ${editor.isActive('link') ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
      >
        🔗 Link
      </button>
    </div>
  );
};

// Blog Table Component
const BlogTable = ({ blogs, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return format(date, 'MMM dd, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      published: { color: 'bg-green-100 text-green-800', label: 'Published' },
      draft: { color: 'bg-yellow-100 text-yellow-800', label: 'Draft' },
      archived: { color: 'bg-gray-100 text-gray-800', label: 'Archived' }
    };
    
    const config = statusConfig[status] || statusConfig.draft;
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const truncateText = (text, length = 50) => {
    if (!text) return '';
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg mb-8">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Existing Blogs</h2>
        <p className="text-sm text-gray-600 mt-1">{blogs.length} blog(s) found</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {blogs.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No blogs found. Create your first blog post!
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr key={blog._id || blog.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {blog.featuredImage && (
                        <div className="flex-shrink-0 h-10 w-10 mr-3">
                          <img
                            className="h-10 w-10 rounded-md object-cover"
                            src={blog.featuredImage}
                            alt={blog.title}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/40x40?text=No+Image';
                            }}
                          />
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {truncateText(blog.title, 40)}
                        </div>
                        {blog.isFeatured && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{blog.author}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {blog.category || 'Uncategorized'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(blog.status || 'draft')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDate(blog.publishDate || blog.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onEdit(blog)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(blog)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const BlogEditorForm = ({ onSave, initialData = null, isEditing = false }) => {
  const dispatch = useDispatch();
  const { blogs: allBlogs, status, error } = useSelector((state) => state.blogs || { 
    blogs: [], 
    status: 'idle', 
    error: null 
  });

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publishDate: format(new Date(), 'yyyy-MM-dd'),
    category: '',
    featuredImage: '',
    content: '',
    excerpt: '',
    tags: [],
    status: 'draft',
    isFeatured: false
  });

  const [tagInput, setTagInput] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [showImageUrl, setShowImageUrl] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isCreatingNew, setIsCreatingNew] = useState(!initialData);

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch blogs on component mount
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  // Initialize with existing data for editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        publishDate: initialData.publishDate 
          ? format(new Date(initialData.publishDate), 'yyyy-MM-dd')
          : format(new Date(), 'yyyy-MM-dd'),
        tags: initialData.tags || []
      });
      setSelectedBlog(initialData);
      setIsCreatingNew(false);
    }
  }, [initialData]);

  // TipTap editor instance - only created on client side
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc pl-6',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal pl-6',
          },
        },
        codeBlock: false,
      }),
      Underline,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm',
        },
      }),
      Image.configure({ inline: true }),
      Link.configure({ 
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline',
        },
      }),
      Placeholder.configure({
        placeholder: 'Start writing your blog content...',
      }),
    ],
    content: formData.content,
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, content: editor.getHTML() }));
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[300px] p-4',
      },
    },
    immediatelyRender: false,
  }, [isClient]);

  // Update editor content when formData.content changes externally
  useEffect(() => {
    if (editor && formData.content !== editor.getHTML()) {
      editor.commands.setContent(formData.content);
    }
  }, [editor, formData.content]);

  // Handle edit blog
  const handleEditBlog = (blog) => {
    setSelectedBlog(blog);
    setIsCreatingNew(false);
    setFormData({
      ...blog,
      publishDate: blog.publishDate 
        ? format(new Date(blog.publishDate), 'yyyy-MM-dd')
        : format(new Date(), 'yyyy-MM-dd'),
      tags: blog.tags || []
    });
    
    // Scroll to form
    document.getElementById('blog-form').scrollIntoView({ behavior: 'smooth' });
  };

  // Handle delete blog
  const handleDeleteBlog = async (blog) => {
    if (window.confirm(`Are you sure you want to delete "${blog.title}"? This action cannot be undone.`)) {
      try {
        await dispatch(deleteBlog(blog._id || blog.id)).unwrap();
        toast.success('Blog deleted successfully!');
        
        // If we're editing this blog, reset the form
        if (selectedBlog?._id === blog._id || selectedBlog?.id === blog.id) {
          handleCreateNew();
        }
        
        // Refresh blogs list
        dispatch(fetchBlogs());
      } catch (error) {
        toast.error(error || 'Failed to delete blog');
      }
    }
  };

  // Handle create new blog
  const handleCreateNew = () => {
    setSelectedBlog(null);
    setIsCreatingNew(true);
    setFormData({
      title: '',
      author: '',
      publishDate: format(new Date(), 'yyyy-MM-dd'),
      category: '',
      featuredImage: '',
      content: '',
      excerpt: '',
      tags: [],
      status: 'draft',
      isFeatured: false
    });
    setTagInput('');
    if (editor) {
      editor.commands.clearContent();
    }
  };

  // Handle tag management
  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Handle form submission with Redux
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title.trim() || !formData.author.trim() || !formData.content.trim()) {
      toast.error('Please fill in all required fields: Title, Author, and Content');
      return;
    }
    
    try {
      // Prepare data for API
      const dataToSend = {
        ...formData,
        tags: formData.tags.map(tag => tag.trim().toLowerCase()),
        publishDate: formData.publishDate ? new Date(formData.publishDate).toISOString() : new Date().toISOString()
      };
      
      if (selectedBlog) {
        // Update existing blog
        await dispatch(updateBlog({ id: selectedBlog._id || selectedBlog.id, data: dataToSend })).unwrap();
        toast.success('Blog updated successfully!');
        setSelectedBlog({ ...selectedBlog, ...dataToSend });
      } else {
        // Create new blog
        await dispatch(createBlog(dataToSend)).unwrap();
        toast.success('Blog created successfully!');
      }
      
      // Call onSave callback if provided
      if (onSave && typeof onSave === 'function') {
        onSave();
      }
      
      // Reset form if creating new blog
      if (!selectedBlog) {
        handleCreateNew();
      }
      
      // Refresh blogs list
      dispatch(fetchBlogs());
      
    } catch (error) {
      console.error('Error saving blog:', error);
      toast.error(error || 'Failed to save blog');
    }
  };

  // Handle Enter key for tags
  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const renderEditor = () => {
    if (!isClient) {
      return (
        <div className="border border-gray-300 rounded-lg min-h-[400px] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-600">Loading editor...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="border border-gray-300 rounded-lg">
        <MenuBar editor={editor} />
        <div className="min-h-[300px] max-h-[500px] overflow-y-auto">
          <EditorContent editor={editor} />
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Blog Table */}
      <BlogTable 
        blogs={allBlogs} 
        onEdit={handleEditBlog}
        onDelete={handleDeleteBlog}
      />

      {/* Blog Form */}
      <div id="blog-form" className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            {selectedBlog ? `Edit Blog: ${selectedBlog.title}` : 'Create New Blog Post'}
          </h2>
          {selectedBlog && (
            <button
              type="button"
              onClick={handleCreateNew}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
            >
              + Create New Blog
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter blog title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author *
              </label>
              <input
                type="text"
                required
                value={formData.author}
                onChange={(e) => setFormData({...formData, author: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Author name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Publish Date
              </label>
              <input
                type="date"
                value={formData.publishDate}
                onChange={(e) => setFormData({...formData, publishDate: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                placeholder="Enter category"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Status Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="flex space-x-4">
              {['draft', 'published'].map((statusOption) => (
                <label key={statusOption} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    checked={formData.status === statusOption}
                    onChange={() => setFormData({...formData, status: statusOption})}
                    className="text-blue-600"
                  />
                  <span className="text-sm text-gray-700 capitalize">{statusOption}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Featured Image URL */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Featured Image URL
              </label>
              <button
                type="button"
                onClick={() => setShowImageUrl(!showImageUrl)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {showImageUrl ? 'Hide' : 'Add Image URL'}
              </button>
            </div>
            
            {showImageUrl && (
              <div className="mb-4">
                <input
                  type="text"
                  value={formData.featuredImage}
                  onChange={(e) => setFormData({...formData, featuredImage: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter a direct image URL. You can also insert images directly in the editor.
                </p>
              </div>
            )}
            
            {formData.featuredImage && (
              <div className="mt-2">
                <img 
                  src={formData.featuredImage} 
                  alt="Preview" 
                  className="max-h-48 rounded-lg mb-2"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    toast.error('Failed to load image. Please check the URL.');
                  }}
                />
                <button
                  type="button"
                  onClick={() => setFormData({...formData, featuredImage: ''})}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>

       

          {/* Rich Text Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            {renderEditor()}
          </div>

          {/* Publish Options */}
          <div className="flex items-center justify-between border-t pt-6">
            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                  className="rounded text-blue-600"
                />
                <span className="text-sm text-gray-700">Mark as Featured</span>
              </label>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                onClick={() => window.history.back()}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status === 'loading'}
                className={`px-6 py-2 ${selectedBlog ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-lg ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {status === 'loading' ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                    {selectedBlog ? 'Updating...' : 'Publishing...'}
                  </span>
                ) : selectedBlog ? 'Update Blog' : 'Publish Blog'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogEditorForm;