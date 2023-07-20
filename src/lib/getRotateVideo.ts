export default async function getRotateVideo(video, rotateValue) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (ctx) {
    video.addEventListener('loadedmetadata', () => {
      ctx.drawImage(video, 0, 0);
      ctx.rotate(rotateValue);
    });

    video.addEventListener('play', () => {
      console.log('play');
    });
  }
  return canvas;
}
