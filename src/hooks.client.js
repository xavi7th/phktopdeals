
/** @type {import('@sveltejs/kit').HandleClientError} */
export const handleError = ({event, error}) => {
  console.log('------------CLIENT ERROR-----------');
  console.error({event, error});
  if ( ! event.request.url.includes('assets')) {
    return {
      message: 'Oops',
      code: error?.code ?? 500,
    }
  }
}
