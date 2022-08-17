export const loadPosts= async () =>{
    const postsResponse = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const photsResponse = await fetch(
        "https://jsonplaceholder.typicode.com/photos"
      );
      const [posts, phots] = await Promise.all([postsResponse, photsResponse]);
  
      const postsJson = await posts.json();
      const photsJson = await phots.json();
  
      const postsAndPhots = await postsJson.map((post, index) => {
        return { ...post, cover: photsJson[index].url };
      });
      return postsAndPhots
}