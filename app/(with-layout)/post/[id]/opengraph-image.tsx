import { ImageResponse } from "next/og";
import { getBookMetadata } from "./utils/getBookMetadata";

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image({ params }: { params: { id: string } }) {
  const { id } = params;
  const book = await getBookMetadata(Number(id));

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        <svg
          width="75"
          viewBox="0 0 75 75"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="20" cy="20" r="10" fill="#000" />
          <circle cx="55" cy="20" r="10" fill="#000" />
          <circle cx="37.5" cy="40" r="25" fill="#000" />
          <circle cx="30" cy="35" r="3" fill="#fff" />
          <circle cx="45" cy="35" r="3" fill="#fff" />
          <circle cx="37.5" cy="45" r="4" fill="#fff" />
        </svg>
        <div style={{ marginTop: 40 }}>{book?.title}</div>
      </div>
    )
  );
}
