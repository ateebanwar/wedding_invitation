import { useState, useEffect } from 'react';
import { WeddingContent } from '../types/wedding';

interface UseWeddingContentResult {
  content: WeddingContent | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useWeddingContent(): UseWeddingContentResult {
  const [content, setContent] = useState<WeddingContent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchKey, setFetchKey] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    const fetchContent = async () => {
      try {
        // Fetch external json with cache-buster
        const response = await fetch(`/wedding-content.json?v=${Date.now()}`);
        if (!response.ok) {
          throw new Error(`Failed to load wedding content: HTTP ${response.status} ${response.statusText}`);
        }
        const data = await response.json();

        // Basic structural validation
        if (!data.couple || !data.wedding || !data.venue || !data.sections) {
          throw new Error('Malformed wedding-content.json: Required structural fields are missing.');
        }

        if (isMounted) {
          setContent(data as WeddingContent);
          setLoading(false);
        }
      } catch (err: unknown) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Unknown error loading wedding content';
          console.error('Error fetching wedding-content.json:', err);
          setError(message);
          setLoading(false);
        }
      }
    };

    fetchContent();

    return () => {
      isMounted = false;
    };
  }, [fetchKey]);

  const refetch = () => {
    setFetchKey(prev => prev + 1);
  };

  return { content, loading, error, refetch };
}
