import { useEffect, useState } from "react"
import { updateArticles } from "../services/articleService"

export default function ArticleEntry({ addArticle , isUpdate , updateArticle , editingArticle ,cancelWriting}) {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [error, setError] = useState(null)

  useEffect(()=>{
    if (editingArticle){
      setTitle(editingArticle.title)
      setBody(editingArticle.body)
    }
  },[editingArticle])

  function submit(e) {
    setError(null)
    e.preventDefault()
    if (!title.trim() || !body.trim()) {
      setError("Both the title and body must be supplied")
      return
    } 
    if(isUpdate){
      updateArticle({id: editingArticle.id,title,body})    
    }
    else {
      addArticle({ title, body })
    }
  }
 function clear(){
  setTitle("");
  setBody("");
  setError(null);
 }
  return (
    <div className="form-div">
      <form onSubmit={submit}>
        {error && <p className="error">{error}</p>}
        Title
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        Body
        <textarea
          rows="8"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <div className="button-group">
      <button type="submit">{isUpdate ? "Update" : "Create"}</button>
      <button type="button" onClick={clear}>Clear</button>
      <button type="button" onClick={cancelWriting}>Cancel</button>
        </div>

      </form>
    </div>
  )
}
