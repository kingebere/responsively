import React, { useEffect, useState, useContext } from 'react';
import { firebaseDB } from '../Auth/FirebaseInit';
import AlbumCard from './AlbumCard';
import { AuthContext } from '../Auth/AuthProvider';
import { removeFromDB } from '../Helpers/removeFromDB';
import { addToDBCollection } from '../Helpers/addToDBCollection';
import Modal from '../Modal';

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

  useEffect(() => {
    const albumRef = firebaseDB.collection('Albums').doc(props.id);
    albumRef

      .get()
      .then((doc) => {
        if (doc.exists) {
          const album = doc.data();
          album.id = doc.id;
          setAlbum(album);
        } else {
          console.log('No such document!');
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
        .collection('Users')
        .doc(currentUser.uid)
        .collection('Collection');
      collectionRef
        .where('album', '==', props.id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setInCollection(true);
            setInCollectionID(doc.id);
            console.log(doc.id, ' => ', doc.data());
          });
        })
        .catch(() => {
          setInCollection(false);
        });

      const wishlistRef = firebaseDB
        .collection('Users')
        .doc(currentUser.uid)
        .collection('Wishlist');
      wishlistRef
        .where('album', '==', props.id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setInWishlist(true);
            setInWishlistID(doc.id);
            console.log(doc.id, ' => ', doc.data());
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
      removeFromDB(currentUser.uid, 'Collection', inCollectionID);
      setShowModal(false);
      setInCollection(false);
    }
  };

  const handleAddToCollection = () => {
    if (!currentUser) {
      setShowLogin(true);
    } else {
      addToDBCollection(currentUser.uid, 'Collection', props.id);
      setUpdate(!update);
    }
  };

  const handleRemoveFromWishlist = () => {
    if (!currentUser) {
      setShowLogin(true);
    } else {
      removeFromDB(currentUser.uid, 'Wishlist', inWishlistID);
      setShowModalWishlist(false);
      setInWishlist(false);
    }
  };

  const handleAddToWishlist = () => {
    if (!currentUser) {
      setShowLogin(true);
    } else {
      addToDBCollection(currentUser.uid, 'Wishlist', props.id);
      setUpdate(!update);
    }
  };

  const toggleModal = () => {
    if (!currentUser) {
      setShowLogin(true);
    } else {
      setShowModal(!showModal);
      setUpdate(!update);
    }
  };

  const toggleModalWishlist = () => {
    if (!currentUser) {
      setShowLogin(true);
    } else {
      setShowModalWishlist(!showModalWishlist);
      setUpdate(!update);
    }
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
    <div className='album-page marg-t-xxl'>
      <AlbumCard album={album} />

      {inCollection ? (
        <button
          className='btn btn-border btn-border--album'
          onClick={toggleModal}
        >
          Remove from my Likes
        </button>
      ) : (
        <button
          className='btn btn-border btn-border--album'
          onClick={handleAddToCollection}
        >
          Add to my Likes
        </button>
      )}
      {inWishlist ? (
        <button
          className='btn btn-border btn-border--album'
          onClick={toggleModalWishlist}
        >
          Unbookmark
        </button>
      ) : (
        <button
          className='btn btn-border btn-border--album'
          onClick={handleAddToWishlist}
        >
          Bookmark
        </button>
      )}

      {showModal ? (
        <Modal>
          <div className='modal__div marg-zero'>
            <h3>Do you want to remove this album from your collection?</h3>
            <div>
              <button
                className='btn btn-black btn-black--modal'
                onClick={handleRemoveFromCollection}
              >
                Yes
              </button>
              <button
                className='btn btn-black btn-black--modal'
                onClick={toggleModal}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
      {showModalWishlist ? (
        <Modal>
          <div className='modal__div marg-zero'>
            <h3>Do you want to remove this album from your wishlist?</h3>
            <div>
              <button
                className='btn btn-black btn-black--modal'
                onClick={handleRemoveFromWishlist}
              >
                Yes
              </button>
              <button
                className='btn btn-black btn-black--modal'
                onClick={toggleModalWishlist}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
      {showLogin ? (
        <Modal>
          <div className='modal__div marg-zero'>
            <h3>Please Login</h3>
            <div>
              <button className='btn btn-black btn-black--modal'>
                <a href='/login'>Yes</a>
              </button>
              <button className='btn btn-black btn-black--modal'>No</button>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

export default Album;
