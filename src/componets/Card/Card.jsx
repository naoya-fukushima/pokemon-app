import React from "react";
import "./Card.css";
import { useEffect, useState } from "react";
import {
  getPokemonJaAbility,
  getPokemonJaName,
  getPokemonJaType,
} from "../../utils/pokemon";

export const Card = ({ pokemon, openModal }) => {
  const [dispName, setDispName] = useState("");
  const [dispType, setDispType] = useState("");
  const [dispAbility, setDispdispAbility] = useState("");

  //表示情報を取得
  useEffect(() => {
    (async () => {
      //名前
      const pokemonNameJa = await getPokemonJaName(pokemon.species.url);
      setDispName(pokemonNameJa);
      //タイプ
      //複数タイプを考慮して配列でURLを取得
      const typesUrls = pokemon.types.map((x) => {
        const url = x.type.url;
        return url;
      });
      const types = await getPokemonJaType(typesUrls);
      setDispType(types);

      //とくせい
      //複数タイプを考慮して配列でURLを取得
      const abilitiesUrls = pokemon.abilities.map((x) => {
        const url = x.ability.url;
        return url;
      });
      const ability = await getPokemonJaAbility(abilitiesUrls);
      setDispdispAbility(ability);
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
          <div className="title">
            <span className="titleLabel">タイプ:</span>
            <span className="titleValue">{dispType}</span>
          </div>
        </div>
        <div className="cardData">
          <div className="title">
            <span className="titleLabel">重さ:</span>
            <span className="titleValue">
              {(pokemon.weight / 10).toFixed(1)}kg
            </span>
          </div>
        </div>
        <div className="cardData">
          <div className="title">
            <span className="titleLabel">高さ:</span>
            <span className="titleValue">
              {(pokemon.height / 10).toFixed(1)}m
            </span>
          </div>
        </div>
        <div className="cardData">
          <div className="title">
            <span className="titleLabel">特性:</span>
          </div>
          <div className="ability">
            <span className="titleValue">{dispAbility}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
