import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="d-flex justify-between align-center">
      <Link to="/">
        <div className="d-flex align-center">
          <img alt="" width={40} height={40} src="/img/logo.png" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Best sneakers shop</p>
          </div>
        </div>
      </Link>
      
      <ul className="d-flex">
        <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img alt="" width={18} height={18} src="/img/cart.svg" />
          <span>1205 rub</span>
        </li>

        <li className="mr-20 cu-p">
          <Link to="/favorites">
            <img alt="" width={18} height={18} src="/img/heart.svg" />
          </Link>
        </li>
        <li>
          <img alt="" width={18} height={18} src="/img/user.svg" />
        </li>
      </ul>
    </header>
  );
}

export default Header;
