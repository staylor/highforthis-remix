import { redirect } from '@remix-run/node';
import mutate from '@/utils/mutate';

export const handleSubmission = async ({ context, request, mutation, id }: any) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams();
  searchParams.set('message', 'updated');
  url.search = searchParams.toString();
  const formData = await request.formData();
  const input = {} as any;
  for (const [key, value] of formData.entries()) {
    input[key] = value;
  }

  await mutate({ context, mutation, variables: { id, input } });

  return redirect(url.toString());
};
