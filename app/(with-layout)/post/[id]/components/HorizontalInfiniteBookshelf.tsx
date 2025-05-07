"use client";

import { Book } from "@/app/(with-layout)/components/bookshelf/types";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { useInfiniteBooks } from "@/app/(with-layout)/hooks/useInfiniteBooks";
import Cell from "@/app/(with-layout)/components/bookshelf/Cell";
import { Loader } from "lucide-react";
import Link from "next/link";
import * as stylex from "@stylexjs/stylex";

export default function HorizontalInfiniteBookshelf({
  initialData,
}: {
  initialData: Book[];
}) {
  const { books, hasMore, loadMoreRef } = useInfiniteBooks({
    initialData,
  });

  const parentRef = useRef<HTMLDivElement>(null);

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: hasMore ? books.length + 1 : books.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    gap: 12,
  });

  return (
    <div {...stylex.props(styles.container)}>
      <div ref={parentRef} {...stylex.props(styles.parent)}>
        <div
          style={{
            width: `${columnVirtualizer.getTotalSize()}px`,
            height: "100%",
            position: "relative",
          }}
        >
          {columnVirtualizer.getVirtualItems().map((virtualColumn) => {
            const isLoaderRow = virtualColumn.index > books.length - 1;
            const book = books[virtualColumn.index];
            return (
              <div
                key={virtualColumn.key}
                data-index={virtualColumn.index}
                ref={columnVirtualizer.measureElement}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: `${books[virtualColumn.index]}px`,
                  transform: `translateX(${virtualColumn.start}px)`,
                }}
              >
                {isLoaderRow ? (
                  <div {...stylex.props(styles.loader)}>
                    <Loader />
                  </div>
                ) : (
                  <Link href={`/post/${book.id}`}>
                    <Cell book={book} />
                  </Link>
                )}
              </div>
            );
          })}
          <div ref={loadMoreRef} {...stylex.props(styles.sentinel)} />
        </div>
      </div>
    </div>
  );
}

const styles = stylex.create({
  container: {
    display: "flex",
    justifyContent: "center",
  },
  parent: {
    maxWidth: "600px",
    height: "140px",
    overflow: "auto",
  },
  loader: {
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  sentinel: {
    position: "absolute",
    right: 0,
  },
});
