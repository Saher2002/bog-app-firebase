import { db } from "../fireBaseConfig"
import {
   collection,
   query,
   getDocs,
   getDoc,
   addDoc,
   orderBy,
   limit,
   Timestamp,
   updateDoc,
   deleteDoc,
   doc,
} from "firebase/firestore"

export async function createArticle({title,body}){
  const data = { title, body, date: Timestamp.now() }
  const docRef = await addDoc(collection(db,"articles"),data)
  return { id:docRef.id, ...data }
}

export async function fetchArticles() {
  const snapshot = await getDocs(
    query(collection(db,"articles"), orderBy("date","desc"),limit(20))
  )
  return snapshot.docs.map((doc) => ({
    id : doc.id, ...doc.data(),
  }))
}

export async function getArticles({id}) {
  const docRef = doc(db, "articles", id)
  const snapshot = await getDoc(docRef)
  if(!snapshot.exists()){
    throw new Error("Article not found")
  }
  return {id: snapshot.id, ...snapshot.data()}
}

export async function updateArticles({id,title,body}) {
  const docRef = doc(db,"articles",id)
  const updateFields = {
    title,
    body,
    date: Timestamp.now(), 
  }
  await updateDoc(docRef, updateFields)
  return {id, ...updateFields}
}

export async function deleteArticles({id}) {
  const docRef = doc(db ,"articles",id)
  await deleteDoc(docRef)
  return {id}
}










































// This service completely hides the data store from the rest of the app.
// No other part of the app knows how the data is stored. If anyone wants
// to read or write data, they have to go through this service.

// For this starter code, we use mock data, that is, data in memory that
// is pretty arbitrary. The service functions to create and fetch articles
// will just work on this fake data in memory.

// This intent is for you to fork this starter code and then replace the
// bodies of the service functions with code that fetches from a *real*
// database like Firebase Firestore.

// const articles = {
//   sdkjfhshfskdlshjf: {
//     date: new Date(2021, 2, 16),
//     title: "There’s a fair tomorrow",
//     body: [
//       "Is a mháithrín an ligfidh tú chun aonaigh mé",
//       "Is a mhuirnín óg ná healaí é",
//       "Beidh aonach amárach in gContae an Chláir",
//       "Cén mhaith domh é ní bheidh mé ann",
//     ].join("\n"),
//   },
//   asjkdhalfkjsdjfhsd: {
//     date: new Date(2021, 9, 24),
//     title: "Hello Everyone",
//     body: "It is a good day to learn React and Firebase\n".repeat(10),
//   },
// }

// export async function createArticle({ title, body }) {
//   // As this is just fake data for messing around, we'll throw in a quick
//   // and unreliable database id. In a real app, the id should be generated
//   // by the database itself (or you can use UUIDs).
//   return { id: Math.random(), title, body, date: new Date() }
// }

// export async function fetchArticles() {
//   // In storage the ids are separated from the data, but in this function
//   // we are going to combine the id and the data together.
//   return Object.entries(articles).map(([id, data]) => ({ id, ...data }))
// }
