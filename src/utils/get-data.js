export const getData = async (categorias) => {
    const response = await fetch(
        `https://api.mercadolibre.com/sites/MLA/search?q=${categorias}`
    );
    const data = await response.json();
    return data.results;
};