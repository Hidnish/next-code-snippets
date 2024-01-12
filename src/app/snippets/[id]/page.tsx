import Link from 'next/link'
import { notFound } from "next/navigation";
import { db } from "@/db";
import { deleteSnippet } from '@/actions'; 

type SnippetShowPageProps = {
  params: {
    id: string
  }
};

export default async function SnippetShowPage({ params }: SnippetShowPageProps) {
  // await new Promise(r => setTimeout(r, 500));

  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(params.id) },
  });

  if (!snippet) return notFound();

  const deleteSnippetAction = deleteSnippet.bind(null, snippet.id);

  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">
          {snippet.title}
        </h1>
        <div className="flex gap-2">
          <Link 
            href={`/snippets/${snippet.id}/edit`}
            className="p-2 border rounded text"
          >
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button className="p-2 border rounded">
              Delete
            </button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>
          {snippet.code}
        </code>
      </pre>
    </div>
  );
};

export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();
  
  // returns an array of ids representing each dynamic route (then nextjs generates a static page for each id)
  return snippets.map(snippet => (
    { id: snippet.id.toString() } // remember that id has to be a string
  ))
}