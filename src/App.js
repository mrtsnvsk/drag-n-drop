import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [cardList, setCardList] = useState([
    { id: 1, order: 3, text: 'КАРТОЧКА 3' },
    { id: 2, order: 1, text: 'КАРТОЧКА 1' },
    { id: 3, order: 2, text: 'КАРТОЧКА 2' },
    { id: 4, order: 4, text: 'КАРТОЧКА 4' },
  ]);

  const [currentCard, setCurrentCard] = useState(null);

  const dragStartHandler = (e, card) => {
    setCurrentCard(card);
  };

  const dragEndHandler = (e) => {
    e.target.style.background = 'white';
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
    e.target.style.background = 'lightgray';
  };

  const dropHandler = (e, card) => {
    e.preventDefault();
    setCardList(
      cardList.map((el) => {
        if (el.id === card.id) {
          return {
            ...el,
            order: currentCard.order,
          };
        }

        if (el.id === currentCard.id) {
          return {
            ...el,
            order: card.order,
          };
        }
        return el;
      })
    );
    e.target.style.background = 'white';
  };

  const sortCards = (a, b) => {
    return a.order > b.order ? 1 : -1;
  };

  return (
    <div className='app'>
      {cardList.sort(sortCards).map((card) => (
        <div
          // чтобы эл-нт можно было перемещать
          draggable={true}
          // срабатывает в момент когда карточка взята
          onDragStart={(e) => dragStartHandler(e, card)}
          // если вышли за пределы другой карточки
          onDragLeave={(e) => dragEndHandler(e)}
          // если мы отпустили перемещение
          onDragEnd={(e) => dragEndHandler(e)}
          // если мы находимся над другим объектом
          onDragOver={(e) => dragOverHandler(e)}
          // отпустили карточку и ждем связанное с этим действие
          onDrop={(e) => dropHandler(e, card)}
          className='card'
          key={card.id}
        >
          {card.text}
        </div>
      ))}
    </div>
  );
};

export default App;
