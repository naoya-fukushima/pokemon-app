import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import { Card } from "./componets/Card/Card";
import Navbar from "./componets/Navbar/Navbar";
import Modal from "./componets/Modal/Modal";

function App() {
  const initalURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");
  // モーダル開閉のstate、初期値はfalse
  const [isShowModal, setIsShowModal] = useState(false);
  // モーダルを開くクリックイベント
  const openClick = () => {
    setIsShowModal(true);
  }; // モーダルを閉じるクリックイベント
  const closeClick = () => {
    setIsShowModal(false);
  };

  //初期表示処理
  useEffect(() => {
    const fetchPokemonData = async () => {
      //全てのポケモンデータを取得
      let res = await getAllPokemon(initalURL);
      //各ポケモンの詳細データを取得
      loadPokemon(res.results);
      setNextURL(res.next);
      setPrevURL(res.previous);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (pokemons) => {
    let _pokemonData = await Promise.all(
      pokemons.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  //次へボタンクリック
  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
    scrollToTop();
  };
  //前へボタンクリック
  const handlePrevPage = async () => {
    if (!prevURL) {
      alert("先頭ページを表示中です。");
      return;
    }
    setLoading(true);
    let data = await getAllPokemon(prevURL);
    loadPokemon(data.results);
    setPrevURL(data.previous);
    setLoading(false);
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // スムーズにスクロール
    });
  };
  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>ロード中・・・</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} openModal={openClick} />;
              })}
            </div>
            <div className="btn">
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
      <Modal isShowModal={isShowModal} closeModal={closeClick} />
    </>
  );
}

export default App;
