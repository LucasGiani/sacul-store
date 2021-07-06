export const SUBCATEGORY = {
    1: { id: 1, title: "baterias acústicas" },
    2: { id: 2, title: "baterias electrónicas" },
    3: { id: 3, title: "guitarras eléctricas" },
    4: { id: 4, title: "guitarras criollas" }
};

export const CATEGORY = {
    BATERIAS: { id: 1, title: 'baterias', subcategories: [SUBCATEGORY[1], SUBCATEGORY[2]] },
    GUITARRAS: { id: 2, title: 'guitarras', subcategories: [SUBCATEGORY[3], SUBCATEGORY[4]] }
};

export const CATEGORIES = [ CATEGORY.BATERIAS, CATEGORY.GUITARRAS];

export const GREETING = 'Hola, te damos la bienvenida a nuestro e-commerce!';