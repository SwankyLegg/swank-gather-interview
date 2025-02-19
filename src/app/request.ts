async function request(url: string) {
  try {
    const bundledResponse = await Promise.all([
      fetch(url).then(res => res.json()),
      fetch(url).then(res => res.json())
    ]);

    return bundledResponse;
  } catch (err) {
    console.error(err);
  }
}

export { request };
