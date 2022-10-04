import "./styles.css";
import React, { useCallback, useEffect, useState } from "react";
import { loadPosts } from "../../util/loadPost";
import { Posts } from "../../components/Posts/Posts";
import { Button } from "../../components/Button";
import { TextoInput } from "../../components/TextoInput";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [searchPosts, setSearchPosts] = useState("");

 

  const handlerLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhots = await loadPosts();

    setPosts(postsAndPhots.slice(page, postsPerPage));
    setAllPosts(postsAndPhots);
  }, []);

  useEffect(() => {
    console.log(new Date().toLocaleDateString("pt-br"));
    handlerLoadPosts(0, postsPerPage);
  }, [handlerLoadPosts, postsPerPage]);

  const loadMorePost = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    setPosts(posts);
    setPage(nextPage);
  };
  const handerSeach = (event) => {
    const { value } = event.target;
    setSearchPosts(value);
  };

  const disabledButton = postsPerPage.length >= allPosts.length
  const filterPosts = !!searchPosts
  ? allPosts.filter((post) => {
      return post.title.toLowerCase().includes(searchPosts.toLowerCase());
    })
  : posts;

  return (
    <section className="container">
      {/**aqui eu usei avaliação de curto-circuito(short-circuit)
       * e quando eu usar dois sinao de negação eu converto searchPosts para boolean " exemplo se !!searchPosts for um string vazia isso
       * é false se ele tiver alguma coisa dentro !!searchPosts ele é verdadeiro"
       * então ficou assim se searchPosts for verdadeiro se ele tiver string ele mostra isso <p>Search: {searchPosts}</p> se ele for falso ele nao mostra nada
       */}
      <div className="search-container">
        {!!searchPosts && <h1>Search: {searchPosts}</h1>}

        <TextoInput
          className="text-input"
          value={searchPosts}
          onChange={handerSeach}
          type="search"
        />
      </div>
      {!!filterPosts.length > 0 && <Posts posts={filterPosts} />}

      {filterPosts.length === 0 && <p>Não conseguir encontrar nd =(</p>}

      {!searchPosts && (
        <div className="button-container">
          <Button
            className="button-container"
            text={"Load more posts"}
            onclick={loadMorePost}
            disabled={disabledButton}
          />
        </div>
      )}
    </section>
  );
};
export default Home