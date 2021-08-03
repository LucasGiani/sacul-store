# Sacul Store - E-Commerce de Instrumentos Musicales

## Acerca del proyecto

### Introducción

El proyecto está basado en un E-Commerce que ofrece instrumentos musicales. Cabe destacar, que en esta versión, sólo se ofrecen baterias y guitarras:
* Categoría de baterías:
	* Acústicas
	* Electrónicas
* Categoría de guitarras:
	* Eléctricas
	* Criollas

### Dependencias extra agregadas por npm

* FontAwesome para el uso de iconos, como el carrito de compras y el brand del e-commerce
* ReactBootstrap para el uso de estilos
	
### Decisiones importantes

* Utilización de la Api de mercado libre para la obtención de productos
* Mover el estado *products* (Listado de productos) al app.jsx
	* De esta forma, poder manipular el mismo y tenerlo siempre actualizado, es decir, si su cantidad fue reducida debido al agregado de una cantidad del mismo al carrito de compras (Esto se produce con el callBack onAdd desde el detalle de un producto o el listado de productos por categoria al clickear sobre el botón *agregar al carrito*), el producto va a mostrar su cantidad de stock restante.
	* Al comienzo del ciclo de vida de la aplicación, el listado de productos se encuentra vacío, y a medida que se va accediendo a las distintas categorías, el mismo se va llenando sin acumluar productos repetidos (Esto es gracias a que cada producto corresponde a una categoria). La ventaja de esto es que, la próxima vez que quiero cargar la misma categoria, no se va a estar haciendo un fetch. Lo mismo ocurre si se quiere ir al detalle del producto. Cabe destacar, que esta decisión de ir acumulando productos me pareció viable ya que la cantidad de productos total es acotada (son 200 en total, 50 por cada categoría)
* Tanto el listado de productos total, como el setProductos, son manipulados por app.js y pasados como props a los componentes ItemListContainer e ItemDetailContainer
	* ItemListContainer, a su vez, tiene su estado de productosDeCategoria, que según la categoría seleccionada, se filtran del listado de products, y si no son encontrados, se hace el fetch de la categoría correspondiente.
	* Para manipular las categorías, se me ocurrió que la mejor manera era tener un enum/const que tenga un id que representa a cada una con el title, que sería el text con el cual se ejecuta el fetch a la api de mercado libre.
	* useEffect de ItemListContainer, no solo se ejecuta al cambiar el id de la url correspondiente a la categoría, sino que también, cuando se actualiza un producto, también se modifica la variable "padre" (products)
	* Para el Detalle del producto, no encontré una property ofrecida por la api de mercado libre que me brinde una descripción detallada del producto, asique me vi obligado a sólo mostrar el título, sumado al precio, el stock y el itemCount para poder seleccionar la cantidad a comprar del mismo.

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
