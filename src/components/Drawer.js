function Drawer({ onClose, onRemove, items = [] }) {
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between  mb-30">
          shopping cart
          <img
            className="removeBtn cu-p"
            src="/img/btn-remove.svg"
            onClick={onClose}
            alt="Remove"
          />
        </h2>

        {items.length > 0 ? (
          <div>
            <div className="items">
              {items.map((item) => (
                <div className="cartItem d-flex align-center mb-20">
                  <div
                    style={{ backgroundImage: `url(${item.imageUrl})` }}
                    className="cartItemImg"
                  ></div>

                  <div>
                    <p className="mb-5">{item.title}</p>
                    <b>{item.price}</b>
                  </div>
                  <img
                    onClick={() => onRemove(item.id)}
                    className="removeBtn"
                    src="/img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>

            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>total:</span>
                  <div></div>
                  <b>21,489 rub</b>
                </li>
                <li>
                  <span>tax</span>
                  <div></div>
                  <b>1,074 rub</b>
                </li>
              </ul>
              <button className="greenButton">
                make an order <img src="/img/arrow.svg" alt="" />
              </button>
            </div>
            {/* cartTotalBlock */}
          </div>
        ) : (
          <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img
              className="mb-20"
              width={"120px"}
              height={"120px"}
              src="/img/empty-cart.jpg"
              alt="empty cart"
            />
            <h2>Корзина пустая</h2>
            <p className="opacity-6">
              Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
            </p>
            <button onClick={onClose} className="greenButton">
              <img class="greenButton__img" src="/img/arrow.svg" alt="arrow" />
              Вернуться назад
            </button>
          </div>
        )}
        {/* items */}
      </div>
      {/* drawer */}
    </div>
    // overlay
  );
}

export default Drawer;
