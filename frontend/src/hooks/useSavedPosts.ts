import { useState, useEffect } from 'react';

export function useSavedPosts() {
  const [savedIds, setSavedIds] = useState<number[]>(() => {
    const saved = localStorage.getItem('savedPosts');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('savedPosts', JSON.stringify(savedIds));
  }, [savedIds]);

  const toggleSave = (id: number) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const isSaved = (id: number) => savedIds.includes(id);

  return { savedIds, toggleSave, isSaved };
}
