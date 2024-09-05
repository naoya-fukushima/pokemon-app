export const getAllPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
};

export const getPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      });
  });
};

//日本語名を取得
export const getPokemonJaName = async (speciesUrl) => {
  //ポケモンの種族(図鑑）データを取得
  const pokemonSpecies = await getPokemon(speciesUrl);
  //名前を取得
  const jaName = pokemonSpecies.names.find(
    (name) => name.language.name === "ja"
  ).name;
  return jaName;
};

//日本語タイプを取得
export const getPokemonJaType = async (typeUrls) => {
  //ポケモンのタイプの情報を取得
  const _pokemonType = await Promise.all(
    typeUrls.map(async (typeUrl) => {
      const pokemonTypeDetail = await getPokemon(typeUrl);
      const jaName = pokemonTypeDetail.names.find(
        (name) => name.language.name === "ja"
      ).name;
      return jaName;
    })
  );
  const joinedTypes = _pokemonType.join(" / ");
  return joinedTypes;
};
