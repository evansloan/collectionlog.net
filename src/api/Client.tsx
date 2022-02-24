const getRequest = (path: string, pathParams: Array<any>, queryParams: any | null, onSuccess: (result: any) => void, onError: (error: any) => void) => {
  const fullPathParams = pathParams.join('/');

  let apiUrl = `https://api.collectionlog.net/${path}/${fullPathParams}`;
  if (queryParams) {
    const fullQueryParams = Object.keys(queryParams).map((param) => {
      return `${param}=${queryParams[param]}`;
    }).join('&');
    apiUrl += `?${fullQueryParams}`;
  }

  fetch(apiUrl)
    .then(res => res.json())
    .then(onSuccess, onError)
}

export { getRequest };
