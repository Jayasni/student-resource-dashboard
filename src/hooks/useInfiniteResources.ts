
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchResources } from "../api";
import type { Resource } from "../types/resource";

export function useInfiniteResources(query: string) {
  const [items, setItems] = useState<Resource[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cursorRef = useRef<number | null>(null);
  const hasMoreRef = useRef(true);
  const loadingRef = useRef(false);
  const generationRef = useRef(0);

  const loadMore = useCallback(async (reset = false) => {
    if (loadingRef.current) return;
    if (!reset && !hasMoreRef.current) return;

    loadingRef.current = true;
    setLoading(true);
    setError("");

    const generation = generationRef.current;
    const startCursor = reset ? null : cursorRef.current;
    const controller = new AbortController();

    try {
      const page = await fetchResources(
        query,
        startCursor,
        12,
        controller.signal
      );

      if (generation !== generationRef.current) return;

      setItems((previous) => {
        if (reset) return page.items;

        const ids = new Set(previous.map((item) => item.id));
        return [
          ...previous,
          ...page.items.filter((item) => !ids.has(item.id)),
        ];
      });

      cursorRef.current = page.nextCursor;
      hasMoreRef.current = page.nextCursor !== null;

      setCursor(page.nextCursor);
      setHasMore(page.nextCursor !== null);
    } catch (err) {
      if (generation === generationRef.current) {
        setError(
          err instanceof Error ? err.message : "Unable to load resources."
        );
      }
    } finally {
      if (generation === generationRef.current) {
        loadingRef.current = false;
        setLoading(false);
      }
    }
  }, [query]);

  useEffect(() => {
    generationRef.current += 1;
    loadingRef.current = false;
    cursorRef.current = null;
    hasMoreRef.current = true;

    setItems([]);
    setCursor(null);
    setHasMore(true);
    setError("");
    setLoading(false);

    void loadMore(true);
  }, [query, loadMore]);

  return {
    items,
    cursor,
    loading,
    error,
    hasMore,
    loadMore,
  };
}

