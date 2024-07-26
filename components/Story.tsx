import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface StoryProps {
  src: string;
  name: string;
  onPrev: () => void;
  onNext: () => void;
  progress: number;
  onClose: () => void;
}

const Story: React.FC<StoryProps> = ({ src, name, onPrev, onNext, progress, onClose }) => {
  return (
    <div className="flex items-center justify-center h-full w-full bg-black relative">
      <AnimatePresence mode="wait">
        <motion.img
          key={src}
          src={src}
          alt="Story"
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5 }}
          className="max-h-full max-w-full object-cover"
        />
      </AnimatePresence>
      <div
        className="absolute left-0 top-0 h-full w-1/2 cursor-pointer"
        onClick={onPrev}
        data-testid="left-half"
      />
      <div
        className="absolute right-0 top-0 h-full w-1/2 cursor-pointer"
        onClick={onNext}
        data-testid="right-half"
      />
      <div
        className="absolute top-0 left-0 h-1 bg-red-500"
        style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
        data-testid="progress-bar"
      />
      <div className="absolute top-2 left-4 right-4 flex items-center justify-between">
        <div className="text-white text-lg bg-transparent px-2 py-1 rounded">
          {name}
        </div>
        <div className="p-2 cursor-pointer" onClick={onClose} data-testid="close-button">
          <FontAwesomeIcon icon={faTimes} className="text-white text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Story;
