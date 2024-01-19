// app/watch/page.jsx

"use client";
import React, { useState } from 'react';
import ContentSection from '../components/ContentSection';
import { suggestedVideos } from '../const'; // Adjust the import path according to your project structure

export default function WatchPage() {
  const [clickedLink, setClickedLink] = useState(null);

  const readingItemsByType = suggestedVideos.reduce((acc, readingItem) => {
    acc[readingItem.type] = acc[readingItem.type] || {};
    acc[readingItem.type][readingItem.subType] = acc[readingItem.type][readingItem.subType] || [];
    acc[readingItem.type][readingItem.subType].push(readingItem);
    return acc;
  }, {});

  const handleClick = (type, subType, index) => {
    setClickedLink(`${type}_${subType}_${index}`);
  };

  return (
    <div className="container mx-auto p-4">
      <main>
        <ContentSection
          readingItemsByType={readingItemsByType}
          clickedLink={clickedLink}
          handleClick={handleClick}
        />
      </main>
    </div>
  );
}
