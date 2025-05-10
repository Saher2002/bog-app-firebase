export default function Nav({ articles, setArticle, deleteArticle,beginUpdate }) {
  return (
    <nav>
      {!articles
        ? "No articles"
        : articles.map((a) => (
          <div key={a.id}>
           <p  onClick={() => setArticle(a)}>{a.title}</p>
           <button onClick={()=>{deleteArticle(a.id)}}>Delete</button>
           <button onClick={()=>{beginUpdate(a)}}>Update</button>
          </div>
          
         ) )}
    </nav>
  )
}
