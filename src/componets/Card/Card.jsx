import React from "react";
import "./Card.css";
import { useEffect, useState } from "react";
import { getPokemonJaName, getPokemonJaType } from "../../utils/pokemon";

export const Card = ({ pokemon, openModal }) => {
  const [dispName, setDispName] = useState("");
  const [dispType, setDispType] = useState("");

  //表示情報を取得
  useEffect(() => {
    (async () => {
      //名前
      const pokemonNameJa = await getPokemonJaName(pokemon.species.url);
      setDispName(pokemonNameJa);
      //タイプ
      //複数タイプを考慮して配列でURLを取得
      let typesUrls = pokemon.types.map((x) => {
        const url = x.type.url;
        return url;
      });
      const types = await getPokemonJaType(typesUrls);
      setDispType(types);
    })();
  }, [pokemon]);

  const clickCard = () => {
    openModal();
  };

  return (
    <div className="card" onClick={clickCard}>
      <div className="cardImg">
        <img src={pokemon.sprites.front_default} />
      </div>
      <h3 className="cardName">{dispName}</h3>
      <div className="cardInfo">
        <div className="cardData">
          <p className="title">タイプ:{dispType}</p>
        </div>
        <div className="cardData">
          <p className="title">重さ:{(pokemon.weight / 10).toFixed(1)}kg</p>
        </div>
        <div className="cardData">
          <p className="title">高さ:{(pokemon.height / 10).toFixed(1)}m</p>
        </div>
        <div className="cardData">
          <p className="title">
            アビリティ:
            {pokemon.abilities.map((ability, i) => {
              const abilityKey = `ability-${pokemon.id}-${i}`;
              return (
                <div key={abilityKey}>
                  <span className="abilityName">{ability.ability.name}</span>
                </div>
              );
            })}
          </p>
        </div>
      </div>
    </div>
  );
};
