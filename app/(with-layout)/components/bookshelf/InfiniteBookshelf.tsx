"use client";

import { useRef } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import * as stylex from "@stylexjs/stylex";

import Cell from "./Cell";
import { Book } from "./types";
import { useInfiniteBooks } from "../../hooks/useInfiniteBooks";
import Link from "next/link";

export default function InfiniteBookshelf({
  initialData,
}: {
  initialData: Book[];
}) {
  const { books, hasMore, isPending, loadMoreRef } = useInfiniteBooks({
    initialData,
  });

  const listRef = useRef<HTMLDivElement>(null);

  const virtualizer = useWindowVirtualizer({
    count: hasMore ? books.length + 1 : books.length,
    estimateSize: () => 120,
    overscan: 2,
    gap: 12,
    scrollMargin: listRef.current?.offsetTop ?? 0,
  });

  return (
    <div ref={listRef} {...stylex.props(styles.container)}>
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
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
                transform: `translateY(${
                  virtualRow.start - virtualizer.options.scrollMargin
                }px)`,
              }}
            >
              {isLoaderRow ? (
                <p {...stylex.props(styles.loader)}>📚책을 불러오고 있어요</p>
              ) : (
                <Link href={`/post/${book.id}`}>
                  <Cell book={book} />
                </Link>
              )}
            </div>
          );
        })}
      </div>
      <div ref={loadMoreRef} {...stylex.props(styles.sentinel)} />
      {!hasMore && !isPending && (
        <p {...stylex.props(styles.last)}>🎉 끝까지 확인하셨습니다!</p>
      )}
    </div>
  );
}

const styles = stylex.create({
  container: {
    width: "100%",
    overflow: "auto",
    padding: "12px",
  },
  loader: {
    textAlign: "center",
  },
  sentinel: {
    height: "2px",
  },
  last: {
    fontStyle: "italic",
    textAlign: "center",
  },
});
