export const getEllipsis = (lines: number, lineHeight: number) => `
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${lines};
  line-height: ${lineHeight || 1.5}px;
  max-height: ${(lineHeight || 1.5) * lines}px;
`;

export const getCenter = ({h, v}: {h?: boolean; v?: boolean}) => {
  const defaultStyle = `position:absolute;`;
  if (h && v) {
    return `${defaultStyle}top:50%;left:50%;transform:translate(-50%,-50%);`;
  } else if (h) {
    return `${defaultStyle}left:50%;transform:translateX(-50%);`;
  } else {
    return `${defaultStyle}top:50%;transform:translateY(-50%);`;
  }
};
