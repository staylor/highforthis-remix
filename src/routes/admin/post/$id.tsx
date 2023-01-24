import { gql } from '@apollo/client';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import PostForm from '@/components/Admin/Post/Form';
import query from '@/utils/query';
import { handleSubmission } from '@/utils/action';

export const loader: LoaderFunction = ({ request, context, params }) => {
  return query({ request, context, query: postQuery, variables: { id: params.id } });
};

export const action: ActionFunction = ({ request, context, params }) => {
  return handleSubmission({
    request,
    context,
    mutation: postMutation,
    variables: { id: params.id },
  });
};

export default function PostEdit() {
  const { post } = useLoaderData();
  return <PostForm data={post} heading="Edit Post" buttonLabel="Update Post" />;
}

const postQuery = gql`
  query PostEditQuery($id: ObjID!) {
    post(id: $id) {
      ...PostForm_post
    }
  }
  ${PostForm.fragments.post}
`;

const postMutation = gql`
  mutation UpdatePostMutation($id: ObjID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      ...PostForm_post
    }
  }
  ${PostForm.fragments.post}
`;
