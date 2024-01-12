'use client';

import { useFormState } from 'react-dom';
import { createSnippet } from '@/actions';

export default function SnippetCreatePage() {
  // 'useFormState' takes 'createSnippets' and returns it with extra functionalities as 'action'
  // allows to validate form without JS
  const [formState, action] = useFormState(createSnippet, { message: '' });

  return (
    <form action={action}>
      <h3 className="font-bold m-3">
        Create a Snippet
      </h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label htmlFor="title" className="w-12">
            Title
          </label>
          <input
            name="title"
            className="border rounded p-2 w-full"
            id="title"
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="code" className="w-12">
            Code
          </label>
          <textarea
            name="code"
            className="border rounded p-2 w-full"
            id="code"
          />
        </div>
        {formState.message ? (
          <div className="my-2 bg-red-200 border border-red-400 rounded">
            {formState.message}
          </div>
        ) : null}
        <button 
          type="submit" 
          className="border rounded p-2 bg-blue-200"
        >
          Create
        </button>
      </div>
    </form>
  )
}
