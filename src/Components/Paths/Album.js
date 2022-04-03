import React, { useEffect, useState, useContext } from "react";
import { firebaseDB } from "../Auth/FirebaseInit";
import { AuthContext } from "../Auth/AuthProvider";
import { removeFromDB } from "../Helpers/removeFromDB";
import { addToDBCollection } from "../Helpers/addToDBCollection";
import Modal from "../Modal";
import { Link } from "@reach/router";
import filled from "../../img/heart-filled.png";
import empty from "../../img/heart-empty.png";
import bookmark from "../../img/bookmark-transparent.png";
import bookmarks from "../../img/bookmark-dark.svg";

function Album(props) {
  const [album, setAlbum] = useState({});
  const { currentUser } = useContext(AuthContext);
  const [inCollection, setInCollection] = useState(null);
  const [inCollectionID, setInCollectionID] = useState(null);
  const [inWishlist, setInWishlist] = useState(null);
  const [inWishlistID, setInWishlistID] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalWishlist, setShowModalWishlist] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [update, setUpdate] = useState(true);
  const [filter, setFilter] = useState([]);
  const [result, setResult] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    const albumRef = firebaseDB.collection("Albums").doc(props.id);
    albumRef

      .get()
      .then((doc) => {
        if (doc.exists) {
          const album = doc.data();
          album.id = doc.id;
          setAlbum(album);
        } else {
          console.log("No such document!");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [props]);
  console.log(album);
  useEffect(() => {
    if (currentUser) {
      const collectionRef = firebaseDB
        .collection("Users")
        .doc(currentUser.uid)
        .collection("Collection");
      collectionRef
        .where("album", "==", props.id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setInCollection(true);
            setInCollectionID(doc.id);
            console.log(doc.id, " => ", doc.data());
          });
        })
        .catch(() => {
          setInCollection(false);
        });

      const wishlistRef = firebaseDB
        .collection("Users")
        .doc(currentUser.uid)
        .collection("Wishlist");
      wishlistRef
        .where("album", "==", props.id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setInWishlist(true);
            setInWishlistID(doc.id);
            console.log(doc.id, " => ", doc.data());
          });
        })
        .catch(() => {
          setInWishlist(false);
        });
    }
  }, [album, update, currentUser, props]);

  const handleRemoveFromCollection = () => {
    if (!currentUser) {
      setShowLogin(true);
    } else {
      removeFromDB(currentUser.uid, "Collection", inCollectionID);
      setShowModal(false);
      setInCollection(false);
    }
    console.log("hgh");
  };

  const handleAddToCollection = () => {
    if (!currentUser) {
      setShowLogin(true);
    } else {
      addToDBCollection(currentUser.uid, "Collection", props.id);
      setUpdate(!update);
    }
    console.log("hgh");
  };

  const handleRemoveFromWishlist = () => {
    if (!currentUser) {
      setShowLogin(true);
    } else {
      removeFromDB(currentUser.uid, "Wishlist", inWishlistID);
      setShowModalWishlist(false);
      setInWishlist(false);
    }
    console.log("hgh");
  };

  const handleAddToWishlist = () => {
    if (!currentUser) {
      setShowLogin(true);
    } else {
      addToDBCollection(currentUser.uid, "Wishlist", props.id);
      setUpdate(!update);
    }
    console.log("hgh");
  };
  useEffect(() => {
    if (album.reference) {
      const y = album.reference.map((res) => res.breakpoint);
      setFilter(y);
    }
  }, [album.reference]);

  const filtered = (x) => {
    const d = album.reference.filter((xi) => xi.breakpoint === x);
    setResult(d);
    setValues(x);
  };
  const dave = () => {
    setShowLogin(false);
  };
  const toggleModal = () => {
    if (!currentUser) {
      setShowLogin(true);
    } else {
      setShowModal(!showModal);
      setUpdate(!update);
    }
    console.log("hgh");
  };

  const toggleModalWishlist = () => {
    if (!currentUser) {
      setShowLogin(true);
    } else {
      setShowModalWishlist(!showModalWishlist);
      setUpdate(!update);
    }
    console.log("hgh");
  };

  // if (!currentUser) {
  //   return (
  //     <div className='album-page marg-t-xxl'>
  //       <AlbumCard album={album} />
  //       <p className='not-logged'>
  //         <a href='/login'>Login</a> to add to your collection, wishlist
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <div className="album-card__background">
      <div className="album-card__container">
        <div className="album-card__two">
          <div className="album-card ">
            <div className="album-card__button-wrapper">
              {filter.map((x) => {
                return (
                  <div
                    onClick={() => filtered(x)}
                    className={`album-card__button ${
                      values && values === x
                        ? "album-card__button--dark"
                        : "album-card__button--normal"
                    }`}
                    key={x}>
                    {x}px
                  </div>
                );
              })}
            </div>

            <div className="album-card__img-wrapper">
              {result.length === 0 ? (
                <div className="album-card__img-placeholder">
                  Please select a breakpoint
                </div>
              ) : (
                result.map((x) => {
                  return (
                    <div className="album-card__imgg">
                      <img
                        className="album-card__img"
                        src={x.url}
                        alt=".."></img>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="album-card__info">
            <div className="album-card__dope">
              <h1>{album.title}</h1>
              <div className="album-card__doper">
                {inCollection ? (
                  <button
                    className="btn btn-border btn-border--album "
                    onClick={toggleModal}>
                    <img
                      src={filled}
                      alt="wsecd"
                      className="album-card__imgj"
                    />
                  </button>
                ) : (
                  <button
                    className="btn btn-border btn-border--album "
                    onClick={handleAddToCollection}>
                    <img src={empty} alt="wsecd" className="album-card__imgj" />
                  </button>
                )}
                {inWishlist ? (
                  <button
                    className="btn btn-border btn-border--album "
                    onClick={toggleModalWishlist}>
                    <img
                      src={bookmark}
                      alt="wsecd"
                      className="album-card__imgj"
                    />
                  </button>
                ) : (
                  <button
                    className="btn btn-border btn-border--album "
                    onClick={handleAddToWishlist}>
                    <img
                      src={bookmarks}
                      alt="wsecd"
                      className="album-card__imgj"
                    />
                  </button>
                )}
              </div>
              <div className="album-card__wrappers">
                <div>
                  <h1 className="album-card__span">
                    Font-family: <span>Circular</span>
                  </h1>
                </div>
                <div>
                  <h1 className="album-card__link">
                    Site-link: <a href="https://trybrass.com">Trybrass</a>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showModal ? (
          <Modal>
            <div className="modal__div marg-zero">
              <h3>Do you want to remove this album from your collection?</h3>
              <div>
                <button
                  className="btn btn-black btn-black--modal"
                  onClick={handleRemoveFromCollection}>
                  Yes
                </button>
                <button
                  className="btn btn-black btn-black--modal"
                  onClick={toggleModal}>
                  No
                </button>
              </div>
            </div>
          </Modal>
        ) : null}
        {showModalWishlist ? (
          <Modal>
            <div className="modal__div marg-zero">
              <h3>Do you want to remove this album from your wishlist?</h3>
              <div>
                <button
                  className="btn btn-black btn-black--modal"
                  onClick={handleRemoveFromWishlist}>
                  Yes
                </button>
                <button
                  className="btn btn-black btn-black--modal"
                  onClick={toggleModalWishlist}>
                  No
                </button>
              </div>
            </div>
          </Modal>
        ) : null}
        {showLogin ? (
          <Modal>
            <div className="modal__div marg-zero">
              <h3>Please Login</h3>
              <div>
                <button className="btn btn-black btn-black--modal">
                  <a href="/login">Yes</a>
                </button>
                <button
                  className="btn btn-black btn-black--modal"
                  onClick={dave}>
                  No
                </button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
}

export default Album;

