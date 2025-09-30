import {  CHATBOT_STATUS ,  TOUR_AND_TRAVEL_COLLECTION_NAME, TOUR_AND_TRAVELS_INFORMATION_INDIA_DOCUMENT, TOUR_CHAT_HISTORY } from "../../helper";
import { arrayUnion, doc, getDoc , onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export   const fetchTeamStatus = async (): Promise<boolean | null> => {
    try {
      const docRef = doc(
        db,
        TOUR_AND_TRAVEL_COLLECTION_NAME,
        TOUR_AND_TRAVELS_INFORMATION_INDIA_DOCUMENT,
        TOUR_CHAT_HISTORY,
        CHATBOT_STATUS,
      );
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return data.teamActive ?? null; // Return true/false or null if missing
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching teamStatus:", error);
      return null;
    }
  };



// Util to merge and sort messages
const mergeTeamMessages = (prevMessages : any, newMessages : any) => {
  const combined = [...prevMessages];

  newMessages.forEach((msg : any) => {
    const exists = combined.some(
      (m) =>
        m.content === msg.content &&
        m.timestamp === msg.timestamp &&
        m.type === msg.type
    );
    if (!exists) {
      combined.push(msg);
    }
  });

  combined.sort((a, b) => a.epoch - b.epoch);
  return combined;
};


export const listenToLiveChatMessages = (messageId : string , setMessages : any) => {
  const docRef = doc(
    db,
    TOUR_AND_TRAVEL_COLLECTION_NAME,
    TOUR_AND_TRAVELS_INFORMATION_INDIA_DOCUMENT,
    TOUR_CHAT_HISTORY,
    messageId
  );

  const unsubscribe = onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      const dbMessages = (docSnap.data().messages || []).filter(
        (msg : any ) => msg.type === "team"
      );

      setMessages((prevMessages : any ) => {
        const merged = mergeTeamMessages(prevMessages, dbMessages);

        // Sync to localStorage
        const savedChatHistory = JSON.parse(
          localStorage.getItem("chatHistory") || "{}"
        );

        localStorage.setItem(
          "chatHistory",
          JSON.stringify({
            ...savedChatHistory,
            chatBot: merged,
          })
        );

        return merged;
      });
    } 
  });

  return unsubscribe;
};

export const updateChatStatus = async (
  messageId: string,
  status: boolean
) => {
  const docRef = doc(
    db,
    TOUR_AND_TRAVEL_COLLECTION_NAME,
    TOUR_AND_TRAVELS_INFORMATION_INDIA_DOCUMENT,
    TOUR_CHAT_HISTORY,
    messageId
  );

  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        chatClosed: status,
      });
    }
  } catch (error) {
    console.error("Error updating chatClosed:", error);
  }
};



export const initializeChat = async (
  liveChat: any,
  newMessage: any
) => {
 
     

  try {

      // Firestore document reference using `message_id` as doc ID, with your path
      const chatRef = doc(
        db,
        TOUR_AND_TRAVEL_COLLECTION_NAME,
        TOUR_AND_TRAVELS_INFORMATION_INDIA_DOCUMENT,
        TOUR_CHAT_HISTORY,
        liveChat.message_id,
      );

      // Update Firestore: push message, update name and contact
      await setDoc(
        chatRef,
        {
          name: liveChat.name || "",
          number: liveChat.number || "",
          email: liveChat.email || "",
          chatClosed: true,
          message_id: liveChat.message_id,
          messages: arrayUnion(newMessage),
          tour_link: window.location.href,
        },
        { merge: true }, // Only update provided fields
      );
      
  } catch (error) {
    console.error("Error updating chatClosed:", error);
  }
};