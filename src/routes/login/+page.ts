export function load({ params, url }) {
  console.log('params', params);
  const afterLoginQueryParam = url.searchParams.get('afterLogin');

  return {
    afterLogin: afterLoginQueryParam ? decodeURIComponent(afterLoginQueryParam) : undefined
  };
}
