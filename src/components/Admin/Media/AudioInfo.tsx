import { Fragment } from 'react';
import { filesize } from 'filesize';

import { uploadUrl } from '@/utils/media';

export default function AudioInfo({ media }: any) {
  const crops = [...media.images].filter(Boolean);
  let cropInfo = null;
  if (crops.length > 0) {
    crops.sort((a, b) => a.width - b.width);
    const first = crops.shift();
    const src = uploadUrl(media.destination, first.fileName);
    cropInfo = (
      <>
        <img className="my-2.5" src={src} alt="" />
        <strong>
          Showing:
          <br />
        </strong>{' '}
        {first.width} x {first.height}
      </>
    );
  }

  const mediaInfo = (
    <>
      <strong>File Size:</strong> {filesize(media.fileSize)}
      <br />
      <strong>File Type:</strong> {media.mimeType}
      {cropInfo}
    </>
  );

  return crops.length > 0 ? (
    <>
      {mediaInfo}
      <br />
      <strong>Other available images:</strong>
      {crops.map((crop) => (
        <Fragment key={crop.fileName}>
          <br />
          <a href={uploadUrl(media.destination, crop.fileName)}>
            {crop.width} x {crop.height}
          </a>{' '}
        </Fragment>
      ))}
    </>
  ) : (
    mediaInfo
  );
}
