'use client';

import React, { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  title?: string;
  contentSelector?: string;
  headingSelector?: string;
  className?: string;
  maxLevel?: number;
}

/**
 * Table of Contents component for long-form content
 * Automatically generates a TOC based on headings in the content
 * Improves navigation and content structure for SEO
 */
export default function TableOfContents({
  title = 'Table of Contents',
  contentSelector = '.prose',
  headingSelector = 'h2, h3, h4',
  className = '',
  maxLevel = 3,
}: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // Generate TOC items from headings in the content
  useEffect(() => {
    const contentElement = document.querySelector(contentSelector);
    if (!contentElement) return;

    const headings = Array.from(contentElement.querySelectorAll(headingSelector));
    
    const items: TOCItem[] = headings.map((heading) => {
      // Get or create an ID for the heading
      let id = heading.id;
      if (!id) {
        id = heading.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || '';
        heading.id = id;
      }
      
      // Determine heading level (h2 = 2, h3 = 3, etc.)
      const level = parseInt(heading.tagName.substring(1), 10);
      
      return {
        id,
        text: heading.textContent || '',
        level,
      };
    });
    
    setTocItems(items);
  }, [contentSelector, headingSelector]);

  // Update active heading based on scroll position
  useEffect(() => {
    if (tocItems.length === 0) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -80% 0px',
      }
    );
    
    // Observe all headings
    tocItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });
    
    return () => {
      observer.disconnect();
    };
  }, [tocItems]);

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <div className={`neumorph p-6 rounded-lg my-6 ${className}`}>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      
      <nav aria-label="Table of contents">
        <ul className="space-y-2">
          {tocItems
            .filter((item) => item.level <= maxLevel)
            .map((item) => (
              <li
                key={item.id}
                className={`${item.level > 2 ? 'ml-4' : ''}`}
              >
                <a
                  href={`#${item.id}`}
                  className={`block py-1 hover:text-accent transition-colors ${
                    activeId === item.id ? 'text-accent font-medium' : 'text-gray-600'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.id)?.scrollIntoView({
                      behavior: 'smooth',
                    });
                  }}
                >
                  {item.text}
                </a>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
}
