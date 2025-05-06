"use client";

import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Database } from "@/database.types";
import Cell from "./Cell";
import * as stylex from "@stylexjs/stylex";

import { useRouter } from "next/navigation";
import { useInfiniteBooks } from "../../hooks/useInfiniteBooks";

type Books = Database["public"]["Tables"]["books"]["Row"];

export default function InfiniteBookshelf({
  initialData,
}: {
  initialData: Books[];
}) {
  const parentRef = useRef<HTMLDivElement>(null);
  const { books, hasMore, loading, loadMoreRef } =
    useInfiniteBooks(initialData);

  const rowVirtualizer = useVirtualizer({
    count: hasMore ? books.length + 1 : books.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120,
    overscan: 2,
  });

  const router = useRouter();

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
              onClick={() => router.push(`/post/${book.id}`)}
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
