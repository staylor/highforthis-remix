import { gql } from '@apollo/client';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import MediaForm from '@/components/Admin/Media/Form';
import query from '@/utils/query';
import { handleSubmission } from '@/utils/action';

export const loader: LoaderFunction = ({ context, params }) => {
  return query({ context, query: mediaQuery, variables: { id: params.id } });
};

export const action: ActionFunction = ({ request, context, params }) => {
  return handleSubmission({
    request,
    context,
    mutation: mediaMutation,
    variables: { id: params.id },
  });
};

export default function MediaEdit() {
  const { media } = useLoaderData();
  return <MediaForm data={media} heading="Edit Media" buttonLabel="Update Media" />;
}

const mediaQuery = gql`
  query MediaAdminQuery($id: ObjID!) {
    media(id: $id) {
      ...MediaForm_media
    }
  }
  ${MediaForm.fragments.media}
`;

const mediaMutation = gql`
  mutation UpdateMediaMutation($id: ObjID!, $input: UpdateMediaUploadInput!) {
    updateMediaUpload(id: $id, input: $input) {
      ...MediaForm_media
    }
  }
  ${MediaForm.fragments.media}
`;
