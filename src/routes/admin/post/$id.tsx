import { gql } from '@apollo/client';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';

import PostForm from '@/components/Admin/Post/Form';

export const loader: LoaderFunction = () => {};

export const action: ActionFunction = () => {};

export default function PostEdit() {}

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
