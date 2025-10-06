'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const RetailerPartners = ({ heading, description, retailers }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [height, setHeight] = useState('auto');
  const contentRef = useRef(null);

  const toggleExpand = () => {
    if (!isExpanded && contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    }
    setIsExpanded(prev => !prev);
  };

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight('0px');
    }
  }, [isExpanded]);

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={toggleExpand}
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{heading}</h2>
            <p className="text-md text-gray-700 mt-1 font-semibold">{description}</p>
          </div>
          <div className="ml-4 text-gray-700">
            {isExpanded ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
          </div>
        </div>

        <div
          ref={contentRef}
          style={{
            maxHeight: height,
            overflow: 'hidden',
            transition: 'max-height 0.4s ease',
          }}
        >
          <div className="flex flex-wrap gap-3 py-2">
            {retailers.map((retailer, idx) => (
              <a
                key={idx}
                href={retailer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-orange-500 text-orange-500 px-4 py-2 rounded hover:bg-orange-100 transition text-sm md:text-base"
              >
                {retailer.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RetailerPartners;
