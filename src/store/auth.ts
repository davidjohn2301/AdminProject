import { child, get,  ref,  update } from "firebase/database"
import { database, db } from "../firebase"
import { collection, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore"

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