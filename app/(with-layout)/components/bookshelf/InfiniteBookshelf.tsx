"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { PAGE_SIZE } from "@/app/constants/books";
import * as stylex from "@stylexjs/stylex";

import { useRouter } from "next/navigation";
import Cell from "./Cell";
import { fetchMoreBooks } from "../../actions/loadMoreBooks";
import { BookUI } from "./types";

export default function InfiniteBookshelf({
  initialData,
}: {
  initialData: BookUI[];
}) {
  const [books, setBooks] = useState<BookUI[]>(initialData);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isPending, startTransition] = useTransition();

  const parentRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: hasMore ? books.length + 1 : books.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120,
    overscan: 2,
  });

  const router = useRouter();

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) return;

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasMore && !isPending) {
          startTransition(async () => {
            const offset = page * PAGE_SIZE;
            const moreBooks = await fetchMoreBooks(offset);

            if (moreBooks.length === 0) {
              setHasMore(false);
            } else {
              setBooks((prev) => [...prev, ...moreBooks]);
              setPage((prev) => prev + 1);
            }

            observer.unobserve(loadMoreRef.current!);
          });
        }
      });
    };

    const observer = new IntersectionObserver(callback, { threshold: 0.3 });
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [books, page, hasMore, isPending, rowVirtualizer]);

  useEffect(() => {
    setBooks(initialData);
  }, [initialData]);

  return (
    <div
      ref={parentRef}
      style={{
        height: "500px",
        width: "100%",
        overflow: "auto",
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const isLoaderRow = virtualRow.index > books.length - 1;
          const book = books[virtualRow.index];

          return (
            <div
              key={virtualRow.index}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
              onClick={() => book && router.push(`/post/${book.id}`)}
            >
              {isLoaderRow ? "...loading more" : <Cell book={book} />}
            </div>
          );
        })}
      </div>
      <div ref={loadMoreRef} style={{ height: 2 }} />
      {!hasMore && !isPending && (
        <p {...stylex.props(styles.last)}>🎉 끝까지 확인하셨습니다!</p>
      )}
    </div>
  );
}

const styles = stylex.create({
  last: {
    fontStyle: "italic",
    textAlign: "center",
  },
});
