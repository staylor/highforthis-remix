import type { SyntheticEvent } from 'react';
// import { useState } from 'react';
import { gql } from '@apollo/client';
// import MediaModal from 'components/Modals/Media';
import Button from '@/components/Button';
import { uploadUrl } from '@/utils/media';

function FeaturedMedia({ type, /* media, onChange,*/ buttonText = 'Set Featured Media' }: any) {
  // const [modal, setModal] = useState(false);
  // const [selected, setSelected] = useState(null);

  // const onClose = () => setModal(false);

  const onClick = (e: SyntheticEvent) => {
    e.preventDefault();
    // setModal(true);
  };

  // const selectImage = (data) => {
  //   onChange([data.imageId]);
  //   setSelected([data.image]);
  // };

  // const selectAudio = (data) => {
  //   onChange([data.id]);
  //   setSelected([data]);
  // };

  const featured: any[] = [];
  // if (selected) {
  //   featured = selected;
  // } else if (media) {
  //   featured = media;
  // }

  return (
    <>
      {/* {modal && (
        <MediaModal
          type={type}
          selectAudio={selectAudio}
          selectImage={selectImage}
          onClose={onClose}
        />
      )} */}
      {featured.filter(Boolean).map((item: any) => {
        if (type === 'audio') {
          return (
            <figure key={item.id} className="my-2.5">
              <audio // eslint-disable-line
                controls
                src={uploadUrl(item.destination, item.fileName)}
              />
            </figure>
          );
        }

        const crop = item && item.crops && item.crops.find((c: any) => c.width === 300);
        if (crop) {
          return (
            <img
              className="mr-2.5 mb-2.5"
              key={crop.fileName}
              alt=""
              src={uploadUrl(item.destination, crop.fileName)}
            />
          );
        }

        return <p key={item.id}>{item.id}</p>;
      })}
      <Button onClick={onClick}>{buttonText}</Button>
    </>
  );
}

FeaturedMedia.fragments = {
  media: gql`
    fragment FeaturedMedia_media on MediaUpload {
      id
      type
      destination
      fileName
      ... on ImageUpload {
        crops {
          fileName
          width
        }
      }
    }
  `,
};

export default FeaturedMedia;
