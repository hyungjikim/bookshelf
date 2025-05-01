interface ContentProps {
  body: string;
}

export function Content({ body }: { body: ContentProps }) {
  return (
    <div>
      <span dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  );
}
