export function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width, height, rotation) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-video-crop
 */
export default async function getCroppedImg(
  videoSrc,
  rotation = 0,
  flip = {horizontal: false, vertical: false},
) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return null;
  }

  const rotRad = getRadianAngle(rotation);

  ctx.rotate(rotRad);

  // draw rotated video

  // croppedAreaPixels values are bounding box relative
  // extract the cropped video using these values

  // paste generated rotate video at the top left corner

  // As Base64 string
  // return canvas.toDataURL('video/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob((file: any) => {
      resolve(URL.createObjectURL(file));
    }, 'video/mp4');
  });
}
