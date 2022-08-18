import "./styles.css";
import React from "react";
import { loadPosts } from "../../util/loadPost";
import { Posts } from "../../components/Posts/Posts";
import { Button } from "../../components/Button";
import { TextoInput } from "../../components/TextoInput";

class App extends React.Component {
  /**este state ele só é usado aqui neste componente, quando ele passa para outro compenete ele passa as props ai é usado as props */
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
    searchPosts: "",
  };

  //O método componentDidMount() é executado depois que a saída do componente é renderizada no DOM
  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhots = await loadPosts();
    this.setState({
      posts: postsAndPhots.slice(page, postsPerPage),
      allPosts: postsAndPhots,
    });
  };

  loadMorePost = () => {
    const { posts, postsPerPage, page, allPosts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage });
    console.log(posts.length);
  };
  /**aqui eu estou passando um evento este evento eu estou pegando target.value este evento ele captura o que eu estou digitando */
  handerSeach = (e) => {
    const { value } = e.target;
    this.setState({ searchPosts: value });
  };
  render() {
    const { posts, allPosts, searchPosts } = this.state;
    const disabledButton = posts.length >= allPosts.length;
    /**aqui fiz um ternario caso o searchPosts tiver algum valor ele vai pegar este valor e vai fazer a filtragem caso ele nao tiver ele
     *  vai mostrar os posts que não esta filtrado*/
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
            onChange={this.handerSeach}
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
              onclick={this.loadMorePost}
              disabled={disabledButton}
            />
          </div>
        )}
      </section>
    );
  }
}
export default App;
