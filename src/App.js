import React from "react";
import axios from "axios";
import { Route } from "react-router-dom";

import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
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
    axios
      .get("https://6524f27567cfb1e59ce648c6.mockapi.io/favorites")
      .then((res) => {
        setFavorites(res.data);
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
    // if(favorites.find((obj) => obj.id === obj.id)) {
    //   axios.delete(`/favorites/${obj.id}`)
    //   setFavorites((prev) => prev.filter((item) => item.id !== obj.id))
    // } else {
    //   axios.post("https://651aa8f5340309952f0da9ba.mockapi.io/favorites", obj)
    //   .catch((err) => console.error(err));
    // }
    axios
      .post("https://651aa8f5340309952f0da9ba.mockapi.io/favorites", obj)
      .catch((err) => console.error(err));
    setFavorites((prev) => [...prev, obj]);
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

      <Route path="/" exact>
        <Home
          items={items}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToCart={onAddToCart}
          onAddToFavorite={onAddToFavorite}
        />
      </Route>

      <Route path="/favorites" exact>
        <Favorites items={favorites} onAddToFavorite={onAddToFavorite}/>
      </Route>
    </div>
    // wrapper
  );
}

export default App;
