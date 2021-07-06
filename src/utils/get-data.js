export const getDataByText = async (text) => {
    const response = await fetch(
        `https://api.mercadolibre.com/sites/MLA/search?q=${text}`
    );
    const data = await response.json();
    return data.results;
};

export const getDataByCategory = async (categorias) => {
    const response = await fetch(
        `https://api.mercadolibre.com/sites/MLA/search?category=${categorias}`
    );
    const data = await response.json();
    return data.results;
};

export const getDataByProductId = async (id) => {
    const response = await fetch(
        `https://api.mercadolibre.com/items/${id}`
    );
    const data = await response.json();
    return data;
};