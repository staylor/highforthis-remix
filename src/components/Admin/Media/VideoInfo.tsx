export default function VideoInfo({ media }: any) {
  return (
    <>
      <strong>Duration:</strong> {~~(media.duration / 60)} mins, {Math.floor(media.duration % 60)}{' '}
      seconds
      <br />
      <strong>Dimensions:</strong> {media.width} x {media.height}
    </>
  );
}
