import React, { useEffect, useState } from 'react';
import { Link } from '@reach/router';
import { saveAs } from 'file-saver';

function AlbumCard(props) {
  const [filter, setFilter] = useState([]);
  const [result, setResult] = useState([]);
  const [values, setValues] = useState([]);
  //const [input, setInput] = useState("");
  //const [dope, setDope] = useState(props.album);
  let { url, title } = props.album;

  const saveFile = (king) => {
    saveAs(king);
  };

  useEffect(() => {
    if (props.album.reference) {
      const y = props.album.reference.map((res) => res.breakpoint);
      setFilter(y);
    }
  }, [props.album.reference]);

  const filtered = (x) => {
    const d = props.album.reference.filter((xi) => xi.breakpoint === x);
    setResult(d);
    setValues(x);
  };
  console.log(values);
  console.log(filter);
  return (
    <div className='album-card marg-t-s'>
      <div className='album-card__info__paragraph'>
        <h1>{title}</h1>
      </div>
      <div className='album-card__button-wrapper'>
        {filter.map((x) => {
          return (
            <div
              onClick={() => filtered(x)}
              className={`album-card__button ${
                values && values === x
                  ? 'album-card__button--dark'
                  : 'album-card__button--normal'
              }`}
              key={x}
            >
              {x}px
            </div>
          );
        })}
      </div>

      <div className='album-card__img-wrapper'>
        {result.length === 0 ? (
          <div className='album-card__img-placeholder'>
            Please select a breakpoint
          </div>
        ) : (
          result.map((x) => {
            return (
              <div className='album-card__imgg'>
                <img className='album-card__img' src={x.url} alt='..'></img>
                <button className='btn' onClick={() => saveFile(x.url)}>
                  Download Image
                </button>
              </div>
            );
          })
        )}
      </div>
      {/* <img className='album-card__img' src={url} alt='..'></img> */}
      <div className='album-card__info'>
        {/* <p className="album-card__info__paragraph marg-t-zero marg-b-xxs">
          <span className="album-card__info__span">Label </span>
          <Link to={`/search/${label}/label`}>{label}</Link>
        </p> */}

        {/* <p className='album-card__info__paragraph'>
          <span className='album-card__info__span'>Format </span>
          {format}
        </p> */}
      </div>
    </div>
  );
}

export default AlbumCard;
