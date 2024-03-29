import { child, get,  ref,  update } from "firebase/database"
import { database, db } from "../firebase"
import { collection, getDocs } from "firebase/firestore"

export async function AcceptDeposite(amount: string, userId: string){

    const walletRef = ref(database, 'wallet/' + userId)
    const dbref = ref(database)
    get(child(dbref,`wallet/${userId}`)).then((snapshot) =>{
      if(snapshot.exists()){
        const data = snapshot.val()
        const balance = data.currentBalance + parseInt(amount)
        update(walletRef,{
          currentBalance: balance
        })
      } else {
        console.log('No data available')
      }
    }).catch((error)=>{
      console.log(error)
    })
}

export async function Rewards(amount: string, userId: string){
  
  const querySnapshot = await getDocs(collection(db, "users", userId));
  querySnapshot.forEach(async (doc) => {
    const refId = doc.data().refId
   await AcceptDeposite(amount,refId)
  //   const walletRef = ref(database, 'wallet/' + refId)
  //   const dbref = ref(database)
  //   get(child(dbref,`wallet/${refId}`)).then((snapshot) =>{
  //     if(snapshot.exists()){
  //       const data = snapshot.val()
  //       const balance = data.currentBalance + parseInt(amount)/10
  //       update(walletRef,{
  //         currentBalance: balance
  //     })
  //   } else {
  //     console.log('No data available')
  //   }
  // }).catch((error)=>{
  //   console.log(error)
  // })
});
}