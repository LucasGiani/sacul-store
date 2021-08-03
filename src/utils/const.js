export const MENU_SUBCATEGORY = {
    1: { id: 1, title: "baterias acústicas" },
    2: { id: 2, title: "baterias electrónicas" },
    3: { id: 3, title: "guitarras eléctricas" },
    4: { id: 4, title: "guitarras criollas" }
};

export const MENU_CATEGORY = {
    BATERIAS: { id: 1, title: 'baterias', subcategories: [MENU_SUBCATEGORY[1], MENU_SUBCATEGORY[2]] },
    GUITARRAS: { id: 2, title: 'guitarras', subcategories: [MENU_SUBCATEGORY[3], MENU_SUBCATEGORY[4]] }
};

export const NAVBAR_CATEGORIES = [ MENU_CATEGORY.BATERIAS, MENU_CATEGORY.GUITARRAS];

export const GREETING = 'Hola, te damos la bienvenida a nuestro e-commerce!';

export const PRODUCT_CATEGORY = {
    BATERIA_ACUSTICA: 1,
    BATERIA_ELECTRONICA: 2,
    GUITARRA_ELECTRICA: 3,
    GUITARRA_CRIOLLA: 4
}

export const ORDER_STATE = {
    GENERADA: 1
}