import { PostCard } from "../PostCard"

export const Posts =({posts})=>{
    return(
        <div className="posts">
        {posts.map((post) => (            
           <PostCard
           cover={post.cover}
           title={post.title}
           boby={post.boby}
           key={post.id}
           id={post.id}
           /**assim tambem funciona
            * post={post}
            * mais eu tenho que mudar la no componente colocar invez eu usar assim export const PostCard = ({cover, title, boby, id})
            * eu tenho que usar assim export const PostCard = ({post}) */             
           />
        ))}
      </div>
    )
}