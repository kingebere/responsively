import React, { useEffect, useState, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { firebaseDB } from "../Auth/FirebaseInit";
import { AuthContext } from "../Auth/AuthProvider";
import { removeFromDB } from "../Helpers/removeFromDB";
import { addToDBCollection } from "../Helpers/addToDBCollection";
import shareButtons from "./shareButtons";
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
  const [load, setLoad] = useState(false);
  const [filter, setFilter] = useState([]);
  const [result, setResult] = useState([]);
  const [values, setValues] = useState([]);
  const [transition, setTransition] = useState(false);
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
      setTransition(true);

      addToDBCollection(currentUser.uid, "Collection", props.id);
      setUpdate(!update);
      toast("Saved");
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
      toast("Added to Bookmark");
    }
    console.log("hgh");
  };
  useEffect(() => {
    if (album.reference) {
      const y = album.reference.map((res) => res.breakpoint);
      setFilter(y);
      setValues(y[0]);
      const d = album.reference.filter((xi) => xi.breakpoint === y[0]);
      setResult(d);
    }
  }, [album.reference]);

  const filtered = (x) => {
    setLoad(true);
    const d = album.reference.filter((xi) => xi.breakpoint === x);

    setValues(x);
    setResult(d);

    setLoad(false);
  };
  console.log(album);
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
  const showTransition = () => {
    setTransition(false);
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      showTransition();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [showTransition]);

  const copy = async () => {
    await navigator.clipboard.writeText(
      `https://clone-practice-30ea3.web.app/albums/${album.id}`
    );
    toast("Text copied");
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
                <div className="album-card__img-placeholder">Loading...</div>
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
                <Toaster
                  toastOptions={{
                    className: "",
                    style: {
                      border: "1px solid #713200",
                      padding: "16px",
                      fontSize: "2rem",
                      color: "#713200",
                    },
                  }}
                />
                {inCollection ? (
                  <button
                    className="btn btn-border btn-border--album "
                    onClick={toggleModal}>
                    <img
                      src={filled}
                      alt="wsecd"
                      className={`album-card__imgj ${
                        transition && "album-card__dopi"
                      }`}
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
                    Font-family: <span>{album.fontfamily}</span>
                  </h1>
                </div>
                <div>
                  <h1 className="album-card__link">
                    Site-link: <a href={album.website}>Visit Website</a>
                  </h1>
                </div>
                <div className="album-card__buttoncopy" onClick={copy}>
                  Copy Link
                </div>
                <div className="album-card__divc">
                  <div style={{ display: "inline-flex", width: "36px" }}>
                    <a
                      className="album-card__link"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://twitter.com/intent/tweet?text=clone-practice-30ea3.web.app/albums/${album.id}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="48"
                        height="48"
                        viewBox="0 0 48 48">
                        <path
                          fill="#03A9F4"
                          d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"></path>
                      </svg>
                    </a>
                  </div>
                  <span>
                    {" "}
                    <a
                      className="album-card__link"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=https://clone-practice-30ea3.web.app/albums/${album.id}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="48"
                        height="48"
                        viewBox="0 0 48 48">
                        <path
                          fill="#0078d4"
                          d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5	V37z"></path>
                        <path
                          d="M30,37V26.901c0-1.689-0.819-2.698-2.192-2.698c-0.815,0-1.414,0.459-1.779,1.364	c-0.017,0.064-0.041,0.325-0.031,1.114L26,37h-7V18h7v1.061C27.022,18.356,28.275,18,29.738,18c4.547,0,7.261,3.093,7.261,8.274	L37,37H30z M11,37V18h3.457C12.454,18,11,16.528,11,14.499C11,12.472,12.478,11,14.514,11c2.012,0,3.445,1.431,3.486,3.479	C18,16.523,16.521,18,14.485,18H18v19H11z"
                          opacity=".05"></path>
                        <path
                          d="M30.5,36.5v-9.599c0-1.973-1.031-3.198-2.692-3.198c-1.295,0-1.935,0.912-2.243,1.677	c-0.082,0.199-0.071,0.989-0.067,1.326L25.5,36.5h-6v-18h6v1.638c0.795-0.823,2.075-1.638,4.238-1.638	c4.233,0,6.761,2.906,6.761,7.774L36.5,36.5H30.5z M11.5,36.5v-18h6v18H11.5z M14.457,17.5c-1.713,0-2.957-1.262-2.957-3.001	c0-1.738,1.268-2.999,3.014-2.999c1.724,0,2.951,1.229,2.986,2.989c0,1.749-1.268,3.011-3.015,3.011H14.457z"
                          opacity=".07"></path>
                        <path
                          fill="#fff"
                          d="M12,19h5v17h-5V19z M14.485,17h-0.028C12.965,17,12,15.888,12,14.499C12,13.08,12.995,12,14.514,12	c1.521,0,2.458,1.08,2.486,2.499C17,15.887,16.035,17,14.485,17z M36,36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698	c-1.501,0-2.313,1.012-2.707,1.99C24.957,25.543,25,26.511,25,27v9h-5V19h5v2.616C25.721,20.5,26.85,19,29.738,19	c3.578,0,6.261,2.25,6.261,7.274L36,36L36,36z"></path>
                      </svg>
                    </a>
                  </span>
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
                  className="btn btn-black btn-black--error"
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
                  className="btn btn-black btn-black--error"
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
                  <a className="btn-href" href="/login">
                    Yes
                  </a>
                </button>
                <button
                  className="btn btn-black btn-black--error"
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

