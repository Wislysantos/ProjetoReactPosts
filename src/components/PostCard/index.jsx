/**se eu usar o post dentro da funçao lá em App.js eu só preciso usar post nao preciso passatd este atributos */
export const PostCard = ({cover, title, boby, id}) => {
  return (
    <div className="post">
      <img src={cover} alt={title} />
      <div className="post-content">
        <h1>{title}</h1>
        <p>{boby}</p>
      </div>
    </div>
  );
};
