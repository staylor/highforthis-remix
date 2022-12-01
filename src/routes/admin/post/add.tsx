import { gql } from '@apollo/client';
import type { ActionFunction } from '@remix-run/node';

import PostForm from '@/components/Admin/Post/Form';

export const action: ActionFunction = () => {};

export default function PostAdd() {}

const postMutation = gql`
  mutation CreatePostMutation($input: CreatePostInput!) {
    createPost(input: $input) {
      ...PostForm_post
    }
  }
  ${PostForm.fragments.post}
`;
