import Card from "../components/Card";

function Home(
    { items,
        searchValue,
        setSearchValue,
        onChangeSearchInput,
        onAddToCart,
        onAddToFavorite }
) {
    return (
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
                {Array.isArray(items)
                    ? items.filter((item) =>
                        item.title.toLowerCase().includes(searchValue.toLowerCase())
                    )
                        .map((item, index) => (
                            <Card
                                key={index}
                                onFavorite={(obj) => onAddToFavorite(obj)}
                                onPlus={(obj) => onAddToCart(obj)}
                                {...item}
                            />
                        ))
                    : []
                }

            </div>
            {/* d-flex */}
        </div>
    )
}

export default Home;