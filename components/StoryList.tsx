import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Story from './Story';

interface StoryData {
  src: string;
  name: string;
}

const StoryList: React.FC = () => {
  const [stories, setStories] = useState<StoryData[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [viewedStories, setViewedStories] = useState<boolean[]>([]);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/stories');
        const data = await response.json();
        setStories(data);
        setViewedStories(Array(data.length).fill(false));
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };

    fetchStories();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    if (currentIndex !== null) {
      setProgress(0);

      timer = setTimeout(() => {
        setViewedStories((prev) => {
          const updated = [...prev];
          if (currentIndex !== null) {
            updated[currentIndex] = true;
          }
          return updated;
        });

        setCurrentIndex((prevIndex) =>
          prevIndex === null || prevIndex === stories.length - 1 ? null : prevIndex + 1
        );
      }, 5000);

      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [currentIndex, stories.length]);

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
    setViewedStories((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
    setProgress(0);
  };

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === null) return null;
      return prevIndex > 0 ? prevIndex - 1 : 0;
    });
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === null) return null;
      return prevIndex < stories.length - 1 ? prevIndex + 1 : prevIndex;
    });
  }, [stories.length]);

  const handleClose = () => {
    setCurrentIndex(null);
  };

  return (
    <>
      <div className="flex justify-between items-center bg-black text-white p-4 mobile-only">
        <h1 className="text-2xl font-semibold">Instagram</h1>
      </div>
      <div className="flex overflow-x-auto p-2 bg-gray-100 hide-scrollbar mobile-only">
        {stories.map((story, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-24 h-24 mr-2 cursor-pointer rounded-full p-1 transition-transform duration-300
                        ${index === currentIndex ? 'border-2 border-gray-300' : viewedStories[index] ? 'border border-gray-300' : 'border-2 border-red-500'}`}
            onClick={() => handleThumbnailClick(index)}
            data-testid={`story-thumbnail-${index}`}
          >
            <div
              className="w-full h-full bg-cover bg-center rounded-full"
              style={{ backgroundImage: `url(${story.src})` }}
            ></div>
            <div className="text-center text-xs mt-1 truncate">{story.name}</div>
          </div>
        ))}
      </div>
      {currentIndex !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 mobile-only">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              <Story
                src={stories[currentIndex].src}
                name={stories[currentIndex].name}
                onPrev={handlePrev}
                onNext={handleNext}
                onClose={handleClose}
                progress={progress}
                data-testid="progress-bar"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

export default StoryList;
