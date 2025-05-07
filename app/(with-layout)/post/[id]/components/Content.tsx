export function Content({ body }: { body: string }) {
  return <div dangerouslySetInnerHTML={{ __html: body }} />;
}
