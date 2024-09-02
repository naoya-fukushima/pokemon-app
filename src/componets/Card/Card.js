import React from "react";
import "./Card.css";

export const Card = ({ pokemon }) => {
  return (
    <div className="card">
      <div className="cardImg">
        <img src={pokemon.sprites.front_default} />
      </div>
      <h3 className="cardName">{pokemon.name}</h3>
      <div className="cardTypes">
        <div>タイプ</div>
        {pokemon.types.map((type, i) => {
          const typeKey = `type-${pokemon.id}-${i}`;
          return (
            <div key={typeKey}>
              <span className="typeName">{type.type.name}</span>
            </div>
          );
        })}
      </div>
      <div className="cardInfo">
        <div className="cardData">
          <p className="title">重さ:{pokemon.weight}</p>
        </div>
        <div className="cardData">
          <p className="title">高さ:{pokemon.height}</p>
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
