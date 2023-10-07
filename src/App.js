import React from "react";
import axios from "axios";
import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  // const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);

  

  React.useEffect(() => {
    axios
      .get("https://650820d756db83a34d9bcb89.mockapi.io/items")
      .then((res) => {
        setItems(res.data);
      });
    axios
      .get("https://650820d756db83a34d9bcb89.mockapi.io/cart")
      .then((res) => {
        setCartItems(res.data);
      });
  }, []);

  // const onAddToCart = (obj) => {
  //   axios.post("https://650820d756db83a34d9bcb89.mockapi.io/cart", obj)
  //   setCartItems((prev) => [...prev, obj]);
  // };

  const onAddToCart = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios
          .delete(`https://650820d756db83a34d9bcb89.mockapi.io/cart/${obj.id}`)
          .catch((err) => console.error(err));
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        axios
          .post("https://650820d756db83a34d9bcb89.mockapi.io/cart", obj)
          .catch((err) => console.error(err));
        setCartItems((prev) => [...prev, obj]);
      }
    } catch (error) {
      alert("Could not add item to cart" + error.message);
    }
  };

  const onRemoveItem = (id) => {
    axios
      .delete(`https://650820d756db83a34d9bcb89.mockapi.io/cart/${id}`)
      .catch((err) => console.error(err));
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = (obj) => {
    axios
      .post("https://651aa8f5340309952f0da9ba.mockapi.io/favorites", obj)
      .catch((err) => console.error(err));
    // setFavorites((prev) => [...prev, obj]);
  };

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
        />
      )}
      <Header onClickCart={() => setCartOpened(true)} />

      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>
            {searchValue
              ? `Поиск по запросу: "${searchValue}"`
              : "все кроссовки"}
          </h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="" />
            {searchValue && (
              <img
                onClick={() => setSearchValue("")}
                className=" clear removeBtn cu-p"
                src="/img/btn-remove.svg"
                alt="Remove"
              />
            )}
            <input
              onChange={onChangeSearchInput}
              value={searchValue}
              placeholder="Search..."
            />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items
            .filter((item) =>
              item.title.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item, index) => (
              <Card
                key={index}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onFavorite={(obj) => onAddToFavorite(obj)}
                onPlus={(obj) => onAddToCart(obj)}
              />
            ))}
        </div>
        {/* d-flex */}
      </div>
      {/* content p-40 */}
    </div>
    // wrapper
  );
}

export default App;
