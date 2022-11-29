import { gql } from '@apollo/client';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import VideoForm from '@/components/Admin/Video/Form';
import query from '@/utils/query';
import { handleSubmission } from '@/utils/action';

export const loader: LoaderFunction = ({ context, params }) => {
  return query({ context, query: videoQuery, variables: { id: params.id } });
};

export const action: ActionFunction = ({ request, context, params }) => {
  return handleSubmission({
    request,
    context,
    mutation: videoMutation,
    variables: { id: params.id },
  });
};

export default function VideoEdit() {
  const { video } = useLoaderData();
  const thumb = video.thumbnails.find((t: any) => t.width === 480);
  return (
    <VideoForm data={video} heading="Edit Video" buttonLabel="Update Video">
      <figure className="mb-6 max-w-full overflow-hidden">
        <img className="relative z-10" src={thumb.url} alt={video.title} />
      </figure>
    </VideoForm>
  );
}

const videoQuery = gql`
  query VideoEditQuery($id: ObjID) {
    video(id: $id) {
      ...VideoForm_video
    }
  }
  ${VideoForm.fragments.video}
`;

const videoMutation = gql`
  mutation UpdateVideoMutation($id: ObjID!, $input: UpdateVideoInput!) {
    updateVideo(id: $id, input: $input) {
      ...VideoForm_video
    }
  }
  ${VideoForm.fragments.video}
`;
