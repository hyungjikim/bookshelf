import { useState, useRef, useEffect, useTransition } from "react";
import { PAGE_SIZE } from "@/app/constants/books";
import { adaptBookListToUI } from "@/app/utils/adaptBookListToUI";
import { Book } from "../types/book";

/**
 * 무한 스크롤을 사용하여 책 데이터를 가져오는 훅
 * @param initialData 초기 렌더링을 위해 서버에서 fetch 한 초기 데이터
 */
export function useInfiniteBooks({ initialData }: { initialData: Book[] }) {
  const [books, setBooks] = useState<Book[]>(initialData);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [isPending, startTransition] = useTransition();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setBooks(initialData);
  }, [initialData]);

  useEffect(() => {
    if (!hasMore || isPending) return;

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasMore && !isPending) {
          startTransition(async () => {
            const offset = page * PAGE_SIZE;

            const res = await fetch(`/api/books?offset=${offset}`);
            const data = await res.json();

            const moreBooks = data?.map(adaptBookListToUI) ?? [];

            if (moreBooks.length === 0) {
              setHasMore(false);
            } else {
              setBooks((prev) => [...prev, ...moreBooks]);
              setPage((prev) => prev + 1);
            }
          });
        }
      });
    };

    const observer = new IntersectionObserver(callback, { threshold: 0.3 });
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [books, page, hasMore, isPending]);

  return {
    books,
    hasMore,
    isPending,
    loadMoreRef,
  };
}
