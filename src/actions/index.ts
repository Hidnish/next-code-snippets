'use server';

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation';
import { db } from "@/db";

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id }, // specify which snippet i want to update
    data: { code } // specify how you want to update it
  });

  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id }
  });

  revalidatePath('/'); // refreshes the cache in home page to display up-to-date data
  redirect(`/`);
}

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  try {
    // Check user's inputs and make sure they're valid
    const title = formData.get('title'); // type FormDataEntryValue -> could be string or File
    const code = formData.get('code');

    if (typeof title !== 'string' || title.length < 3) {
      return { message: 'Title must be longer' }
    };

    if (typeof code !== 'string' || code.length < 10) {
      return { message: 'Code must be longer' }
    };

    // Create a new record in the db
    const snippet = await db.snippet.create({
      data: { title, code }
    });

  } catch (err: unknown) {
    if (err instanceof Error) {
      return { message: err.message };
    } else {
      return { message: 'Something went wrong...'}
    }
  };

  revalidatePath('/');
  // Don't put a redirect in a try/catch block otherwise it will throw error
  redirect('/');
};