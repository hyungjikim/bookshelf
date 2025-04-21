"use client";

import { useEffect, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { createClient } from "@/utils/supabase/client";
import { PAGE_SIZE } from "@/app/constants/books";
import { Database } from "@/database.types";
import Cell from "./Cell";
import * as stylex from "@stylexjs/stylex";

type Books = Database["public"]["Tables"]["books"]["Row"];

export default function InfiniteBookshelf({
  initialData,
}: {
  initialData: Books[];
}) {
  const [books, setBooks] = useState<Books[]>(initialData);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const parentRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: hasMore ? books.length + 1 : books.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120,
    overscan: 2,
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) return;

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(async (entry) => {
        if (
          entry.isIntersecting &&
          loadMoreRef.current &&
          hasMore &&
          !loading
        ) {
          setLoading(true);

          const from = page * PAGE_SIZE;
          const to = from + PAGE_SIZE - 1;

          const supabase = createClient();
          const { data: moreBooks } = await supabase
            .from("books")
            .select()
            .range(from, to);

          const booksToAdd = moreBooks ?? [];

          if (booksToAdd.length === 0) {
            setHasMore(false);
          } else {
            setBooks((prev) => [...prev, ...booksToAdd]);
            setPage((prev) => prev + 1);
          }

          setLoading(false);
          observer.unobserve(loadMoreRef.current);
        }
      });
    };

    const observer = new IntersectionObserver(callback, { threshold: 0.3 });

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasMore, loading, rowVirtualizer, page]);

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
            >
              {isLoaderRow && hasMore ? (
                "...loading more"
              ) : (
                <Cell book={book} />
              )}
            </div>
          );
        })}
      </div>
      <div ref={loadMoreRef} style={{ height: 2 }} />
      {!hasMore && !loading && (
        <p {...stylex.props(styles.last)}>Oops! nothing to load more</p>
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
