
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchResources } from "../api";
import type { Resource } from "../types/resource";

export function useInfiniteResources(query: string) {
  const [items, setItems] = useState<Resource[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const requestRef = useRef(false);
  const cursorRef = useRef<number | null>(null);
  const hasMoreRef = useRef(true);
  const generationRef = useRef(0);
  const controllerRef = useRef<AbortController | null>(null);

  const loadMore = useCallback(async (reset = false) => {
    if (requestRef.current) return;
    if (!reset && !hasMoreRef.current) return;

    requestRef.current = true;
    setLoading(true);
    setError("");

    const generation = generationRef.current;
    const nextCursor = reset ? null : cursorRef.current;
    const controller = new AbortController();

    controllerRef.current = controller;

    try {
      const page = await fetchResources(
        query,
        nextCursor,
        12,
        controller.signal
      );

      if (generation !== generationRef.current) return;

      setItems((previous) => {
        if (reset) return page.items;

        const existingIds = new Set(previous.map((item) => item.id));
        const newItems = page.items.filter(
          (item) => !existingIds.has(item.id)
        );

        return [...previous, ...newItems];
      });

      cursorRef.current = page.nextCursor;
      hasMoreRef.current = page.nextCursor !== null;

      setCursor(page.nextCursor);
      setHasMore(page.nextCursor !== null);
    } catch (err) {
      if (
        err instanceof Error &&
        err.name !== "AbortError" &&
        generation === generationRef.current
      ) {
        setError(err.message);
      }
    } finally {
      if (generation === generationRef.current) {
        requestRef.current = false;
        controllerRef.current = null;
        setLoading(false);
      }
    }
  }, [query]);

  useEffect(() => {
    generationRef.current += 1;
    controllerRef.current?.abort();

    requestRef.current = false;
    cursorRef.current = null;
    hasMoreRef.current = true;

    setItems([]);
    setCursor(null);
    setHasMore(true);
    setError("");
    setLoading(false);

    void loadMore(true);

    return () => {
      controllerRef.current?.abort();
    };
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
