import { notFound } from 'next/navigation';
import { db } from "@/db";
import SnippetEditForm from '@/components/snippet-edit-form';

type SnippetEditPageProps = {
  params: {
    id: string
  }
}

export default async function SnippedEditPage(props: SnippetEditPageProps) {
  const id = parseInt(props.params.id);
  const snippet = await db.snippet.findFirst({
    where: { id }
  });

  if (!snippet) return notFound();

  return (
    <div>
      <SnippetEditForm snippet={snippet} />
    </div>
  );
}