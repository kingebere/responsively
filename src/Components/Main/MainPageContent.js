import React, { useState, useEffect } from "react";
import Hero from "./Hero";
import Subscribe from "./Subscribe";
import { firebaseDB } from "../Auth/FirebaseInit";
import RecentlyAddedGrid from "./RecentlyAddedGrid";
import LandingPage from "./LandingPage";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";

function MainPageContent() {
  const [recentlyAdded, setRecentlyAdded] = useState([]);

  useEffect(() => {
    const ref = firebaseDB.collection("Albums").orderBy("addedToDB", "desc");
    ref
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            const album = doc.data();
            album.id = doc.id;
            setRecentlyAdded((prev) => {
              return [...prev, album];
            });
          } else {
            console.log("No such document!");
          }
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // useEffect(
  //   () =>
  //     onSnapshot(
  //       query(collection(firebaseDB, 'Albums'), orderBy('timestamp', 'desc')),
  //       (snapshot) => {
  //         setRecentlyAdded(snapshot.docs);
  //       }
  //     ),
  //   [firebaseDB]
  // );

  return (
    <>
      <LandingPage />
      <RecentlyAddedGrid albums={recentlyAdded} />
    </>
  );
}

export default MainPageContent;

