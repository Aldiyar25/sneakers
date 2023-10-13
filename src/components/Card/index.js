import styles from './Card.module.scss'
import React from 'react';

function Card({ id, onFavorite, onPlus, title, imageUrl, price, favorited}) {
  const [isAdded, setIsAdded] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(favorited = false);

  const onClickPlus = () => {
    onPlus({title, imageUrl, price})
    setIsAdded(!isAdded)
  }

  const onClickFavorite = () => {
    onFavorite({id, title, imageUrl, price})
    setIsFavorite(!isFavorite)
  }

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onClickFavorite}>
        <img src={isFavorite ? '/img/liked.svg' : 'img/unliked.svg'} alt='unliked'/>
      </div>
      <img width={133} height={112} src={imageUrl} alt="" />
      <p>{title}</p>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Price: </span>
          <b>{price}</b>
        </div>
         <img className={styles.plus} onClick={onClickPlus} src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'} alt=""></img>
       
      </div>
    </div>
  );
}

export default Card
