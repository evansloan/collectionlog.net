const getRequest = (path: string, params: Array<any>, onSuccess: (result: any) => void, onError: (error: any) => void) => {
  const fullParams = params.join('/');

  const apiUrl = `https://api.collectionlog.net/${path}/${fullParams}`;
  fetch(apiUrl)
    .then(res => res.json())
    .then(onSuccess, onError)
}

export { getRequest };
