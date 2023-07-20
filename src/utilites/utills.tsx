export const dynamicSort = x => {
  let sortOrder = 1;
  if (x[0] === '-') {
    sortOrder = -1;
    x = x.substr(1);
  }

  return function (a, b) {
    if (sortOrder === -1) {
      return b[x].toLowerCase().localeCompare(a[x].toLowerCase());
    } else {
      return a[x].toLowerCase().localeCompare(b[x].toLowerCase());
    }
  };
};

export const getEllipsis = (lines: number, lineHeight?: number) => `
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${lines};
  line-height: ${lineHeight || 1.5}em;
  max-height: ${(lineHeight || 1.5) * lines}em;
`;

export const parseQuery = (queryString: string): Record<string, string> => {
  const query = {};
  const pairs = (
    queryString[0] === '?' ? queryString.substr(1) : queryString
  ).split('&');
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
};
