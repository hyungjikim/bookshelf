export function Content({ body }: { body: string }) {
  return (
    <div>
      <span dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  );
}
