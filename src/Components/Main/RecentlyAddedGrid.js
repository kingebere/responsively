import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import down from '../../img/down.svg';

function RecentlyAddedGrid(props) {
  const [itemsShow, setItemsShow] = useState(10);
  const [albumItems, setAlbumItems] = useState([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    let albumsToShow = props.albums.slice(0, itemsShow).map((album) => {
      return (
        <div className='recentlyAdded__col ' key={album.id}>
          <Link
            className='grid-album__link grid-album__link--recentlyAdded'
            to={`/albums/${album.id}`}
          >
            <img
              className='grid-album__img'
              src={album.url}
              alt={`${album.title}  `}
            ></img>
          </Link>
          <p className='grid-album__paragraph'>
            {/* <div>
              <Link
                className='grid-album__h1'
                to={`/search/${album.artist}/artist`}
              >
                {album.artist}
              </Link>
            </div> */}

            <div>
              <Link className='grid-album__h1' to={`/albums/${album.id}`}>
                {album.title}
              </Link>
            </div>
          </p>
        </div>
      );
    });

    setAlbumItems(albumsToShow);
  }, [props, itemsShow]);

  const handleClick = () => {
    if (props.albums.length > itemsShow + 10) {
      setItemsShow((prev) => prev + 10);
    } else {
      setItemsShow(props.albums.length);
      setShowMore(false);
    }
  };

  return (
    <div className='recentlyAdded'>
      <div className='recentlyAdded__container'>
        <div className='recentlyAdded__row'>
          {albumItems.length === 0 ? (
            <div className='album-card__img-placeholder'>Loading...</div>
          ) : (
            albumItems
          )}
        </div>
        {showMore ? (
          <div className='showmore' onClick={handleClick}>
            <p className='showmore__paragraph'>Show more new albums</p>
            <img className='showmore__img' src={down} alt='..'></img>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default RecentlyAddedGrid;
