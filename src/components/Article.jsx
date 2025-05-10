export default function Article({ article, isUpdate }) {
  return (
    <article>
      {!article ? (
        <p>No article selected</p>
      ) : (
        <section>
          <h2>{article.title}</h2>
          <p className="date"><strong>Posted at: </strong>{new Date(article.date.toDate()).toLocaleString()}</p>
          <p className="body">{article.body}</p>
        </section>
      )}
    </article>
  )
}
