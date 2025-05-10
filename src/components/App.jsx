import { useEffect, useState } from "react"
import Nav from "./Nav"
import Article from "./Article"
import ArticleEntry from "./ArticleEntry"
import { SignIn,SignOut } from "./Auth"
import { useAuthentication } from "../services/authService"
import { fetchArticles, createArticle ,deleteArticles ,updateArticles } from "../services/articleService"
import "./App.css"

export default function App() {
  const [articles, setArticles] = useState([])
  const [article, setArticle] = useState(null)
  const [writing, setWriting] = useState(null)
  const [isUpdate,setIsUpdate] = useState(false)
  const [editingArticle,seteditingArticle] = useState(null)
  const user = useAuthentication()

  // This is a trivial app, so just fetch all the articles once, when
  // the app is loaded. A real app would do pagination. Note that
  // "fetchArticles" is what gets the articles from the service and
  // then "setArticles" writes them into the React state.
  useEffect(() => {
    fetchArticles().then(setArticles)
  }, [user])

  // Update the "database" *then* update the internal React state. These
  // two steps are definitely necessary.
  function addArticle({ title, body }) {
    createArticle({ title, body }).then((article) => {
      setArticle(article)
      setArticles([article, ...articles])
      setWriting(false)
    }).catch((err) => {
      alert("Error adding article: " + err.message)
    })

  }

  async function deleteArticle(id){
    await deleteArticles({id})
    console.log("deleting ID:", id)
    setArticles(articles.filter((a)=>a.id !==id))
  } 

  function beginUpdate(article){
    setIsUpdate(true)
    seteditingArticle(article)
    setWriting(true)
  }

  async function updateArticle({id,title ,body}){
    // console.log("Updating ID:", id)
    const updated = await updateArticles({id,title,body})
    setArticles(articles.map((a)=>(a.id === id ? {...a, ...updated} : a)))
    setArticle(updated)
    setWriting(false)
    setIsUpdate(false)
    seteditingArticle(null)
  } 

  return (
    <div className="App">
      <header>
        Blog
        {user && (
      <button onClick={() => setWriting(true)}>New Article</button>
  ) }
        {!user ? <SignIn/> : <SignOut user={user}/>}
      </header>
      {!user? "" : <Nav articles={articles} setArticle={setArticle} deleteArticle={deleteArticle} beginUpdate={beginUpdate}/> }

      {!user? ("") : writing ? (
        <ArticleEntry addArticle={addArticle} isUpdate={isUpdate} updateArticle ={updateArticle} editingArticle={editingArticle} 
        cancelWriting={() => {
          setWriting(false)
          setIsUpdate(false)
          seteditingArticle(null)
        }}
      />
      ) : (
        <Article article={article} isUpdate={isUpdate} />
      )}
    </div>
  )
}
