export function load({ params, url }) {
  const afterLoginQueryParam = url.searchParams.get('afterLogin');

  return {
    afterLogin: afterLoginQueryParam ? decodeURIComponent(afterLoginQueryParam) : undefined
  };
}
