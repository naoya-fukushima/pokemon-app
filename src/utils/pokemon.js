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
      const typesJa = getPokemonJaInfo(typeUrl);
      return typesJa;
    })
  );
  const joinedType = _pokemonType.join(" / ");
  return joinedType;
};

//日本語とくせいを取得
export const getPokemonJaAbility = async (typeUrls) => {
  //ポケモンのタイプの情報を取得
  const _pokemonAbility = await Promise.all(
    typeUrls.map(async (typeUrl) => {
      const abilitiesJa = getPokemonJaInfo(typeUrl);
      return abilitiesJa;
    })
  );
  const joinedAbility = _pokemonAbility.join(" / ");
  return joinedAbility;
};

const getPokemonJaInfo = async (url) => {
  const pokemonTypeDetail = await getPokemon(url);
  const jaName = pokemonTypeDetail.names.find(
    (name) => name.language.name === "ja"
  ).name;
  return jaName;
};
