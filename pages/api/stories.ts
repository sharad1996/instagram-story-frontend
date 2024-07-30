// pages/api/stories.ts

import type { NextApiRequest, NextApiResponse } from 'next';

interface Story {
  src: string;
  name: string;
}

const stories: Story[] = [
  { src: '/images/story1.jpg', name: 'Crish' },
  { src: '/images/story2.jpg', name: 'David' },
  { src: '/images/Crish2.jpeg', name: 'Josh' },
  { src: '/images/story4.jpg', name: 'Mike' },
  { src: '/images/mark2.jpeg', name: 'Mark' },
  { src: '/images/josh2.jpeg', name: 'Josh' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(stories);
}
