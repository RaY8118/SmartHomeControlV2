import { getDatabase, ref, set, get, update, onValue } from "firebase/database";
import { db } from "../firebase";


export const fetchRelayData = (callback) => {
    const dbref = ref(db, 'relays/')
    const unsubscribe = onValue(dbref, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val()
            // console.log(data)
            callback(data)
        }
        else {
            console.log("no data");
            callback(null)
        }
    }, (error) => {
        console.log("Error: ", error)
    })
    return unsubscribe
}

export const writeRelayData = (relayId, state) => {
    try{
        update(ref(db, 'relays/' + relayId),{
            state:state
        })
        console.log("Data saved")
    }
    catch(error){
        console.log("Error occured", error)
    }
}

export const writeFormData = (relayId, data) =>{
    try{
        update(ref(db, 'relays/' + relayId), {
            name: data
        })
        console.log("Form data saved")
    }
    catch(error){
        console.log("Error occured", error)
    }
}