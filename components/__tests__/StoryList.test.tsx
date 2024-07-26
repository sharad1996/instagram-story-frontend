import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import StoryList from '../StoryList';

jest.mock('framer-motion', () => {
  const actualFramerMotion = jest.requireActual('framer-motion');
  return {
    ...actualFramerMotion,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    motion: {
      div: ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => <div {...props}>{children}</div>,
    },
  };
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      { src: 'story1.jpg', name: 'Story 1' },
      { src: 'story2.jpg', name: 'Story 2' },
    ]),
  })
) as jest.Mock;

jest.useFakeTimers();

describe('StoryList', () => {
  it('renders the component correctly', async () => {
    render(<StoryList />);

    await waitFor(() => {
      expect(screen.getByText('Instagram')).toBeInTheDocument();
    });
  });

  it('should display the correct thumbnails', async () => {
    render(<StoryList />);

    await waitFor(() => {
      const thumb1 = screen.getByTestId('story-thumbnail-0');
      const thumb2 = screen.getByTestId('story-thumbnail-1');

      expect(thumb1).toBeInTheDocument();
      expect(thumb2).toBeInTheDocument();
    });
  });

  it('should advance to the next story automatically', async () => {
    render(<StoryList />);

    await waitFor(() => {
      const thumb0 = screen.getByTestId('story-thumbnail-0');
      expect(thumb0).toBeInTheDocument();
    });

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    await waitFor(() => {
      const thumb1 = screen.getByTestId('story-thumbnail-1');
      expect(thumb1).toBeInTheDocument();
    });
  });
});
