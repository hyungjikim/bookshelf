// hooks/useInfiniteBooks.ts
import { useState, useRef, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { PAGE_SIZE } from "@/app/constants/books";
import { BOOKS_SELECT } from "@/app/lib/queries/getBooks";
import { mapToBookUI } from "@/app/utils/mapBooks";
import { Database } from "@/database.types";

type Books = Database["public"]["Tables"]["books"]["Row"];

export function useInfiniteBooks(initialData: Books[]) {
  const [books, setBooks] = useState<Books[]>(initialData);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setBooks(initialData);
  }, [initialData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting || loading || !hasMore) return;

        setLoading(true);
        const from = page * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;
        const supabase = createClient();

        const { data } = await supabase
          .from("book_details")
          .select(BOOKS_SELECT)
          .range(from, to);

        const booksToAdd = data?.map(mapToBookUI) ?? [];

        if (booksToAdd.length === 0) {
          setHasMore(false);
        } else {
          setBooks((prev) => [...prev, ...booksToAdd]);
          setPage((prev) => prev + 1);
        }

        setLoading(false);
      },
      { threshold: 0.3 }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [page, hasMore, loading]);

  return {
    books,
    hasMore,
    loading,
    loadMoreRef,
  };
}
