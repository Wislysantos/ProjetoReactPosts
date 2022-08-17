import "./styles.css";
import React from "react";
import { loadPosts } from "../../util/loadPost";
import { Posts } from "../../components/Posts/Posts";
import { Button } from "../../components/Button";

class App extends React.Component {
  /**este state ele só é usado aqui neste componente, quando ele passa para outro compenete ele passa as props ai é usado as props */
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
  };

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
    posts.push(...nextPosts)
    this.setState({posts, page:nextPage})
    console.log(posts.length);
  };
  render() {
    const { posts, allPosts } = this.state;
    const disabledButton = posts.length >= allPosts.length
    return (
      <section className="container">
        <Posts posts={posts} />
        <Button className="button-container"
        text={"Load more posts"}
        onclick={this.loadMorePost}
        disabled={disabledButton}
        />
      </section>
    );
  }
}
export default App;
