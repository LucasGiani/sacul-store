# Sacul Store - E-Commerce de Instrumentos Musicales

## Acerca del proyecto

### Introducción

El proyecto está basado en un E-Commerce que ofrece instrumentos musicales. Cabe destacar, que en esta primer versión, solo se ofrecen baterias y guitarras:
* Categoría de baterías:
	* **Acústicas**
	* **Electrónicas**
* Categoría de guitarras:
	* **Eléctricas**
	* **Criollas**

### Dependencias extra agregadas por npm

* **FontAwesome** para el uso de iconos, como el carrito de compras y el brand del e-commerce ([font-awesome-icons-free](https://fontawesome.com/v5.15/icons?d=gallery&p=2&m=free))
* **ReactBootstrap** para el uso de estilos ([react-bootstrap-components](https://react-bootstrap-v4.netlify.app/components/alerts/))
	
### Decisiones importantes

#### > Datos almacenados en firebase
* Se utilizó la api de Mercado Libre para la carga de productos correspondientes a las categorias antes mencionadas.
* **Importante:** Dado que la cantidad de productos en la base es de un total de 200 y la api de MeLi no ofrece una descripción para los productos, es por ello que se decidió en el detalle no mostrar una descripción del producto.
#### > Estado products en CartContext
* Al comienzo del ciclo de vida de la aplicación, el listado de productos se carga inicialmente por defecto con el listado de baterias acústicas (**category 1**), y a medida que se va accediendo a las distintas categorías, el mismo se va llenando sin acumluar productos repetidos. Esto es gracias al método **addProductsWithoutRepeat** implementado en cart-context.jsx y evitar que haya productos repetidos.
* *Importante*: Se decidió usar una constante manipulada desde CartContext que hace referencia a la cantidad de productos mínima o por página que deberían consultarse con un valor de 50 (por categoria). Por el momento, no se implementó la obtención de datos paginados. Dicha variable sirve para saber si la cantidad de productos que tiene la categoria es la total existente, o si debe ir a buscar mas productos aún. 
#### > Estado productosDeCategoria en ItemListContainer
* Según la categoría seleccionada, se filtran los productos del listado de products, y si no son encontrados, se hace el fetch de la categoría correspondiente y el estado se llena con los productos correspondientes.
* Para manipular las categorías, se creó un enum/const que tenga un id que representa a cada categoría con el title, que sería el que se muestra en el combo de categorías del NavBar, y el id que se corresponde al entero que representa a cada categoría respectivamente.
#### > Funcionalidades en Cart
* En principio se visualizan los productos agregados al carrito con la posibilidad de seguir incrementando o decrementando la cantidad a comprar, respetando el Stock disponible.
* Una vez cargado el formulario y realizada la orden con éxito, cada **CartItem** se convierte de sólo lectura, es decir, que la cantidad ya no se puede modificar, y de esta forma, se le da robustez al componente siendo utilizado como detalle de la compra realizada.
* Funcionalidad de **vaciar carrito**, sólo disponible si la compra no fue realizada aún.
* Si la compra ya fue realizada:
	* Se muestra el **número de orden** correspondiente al id de la orden generada en firebase.
	* Si se clickea sobre el **botón volver**, se vacía el carrito quedando el stock de productos modificados *(sólo en el estado **products** de CartContext)*, dichas modificaciones de stock no se persisten ya que no era un requerimiento obligatorio. Es por ello que si se recarga la aplicación nuevamente, se pierden dichas modificaciones.
#### > Estado de la orden
* Sólo consideré el estado **GENERADA** (Solicitado). Sin embargo, podrían agregarse mas estados como **CANCELADA** suponiendo una funcionalidad adicional como *cancelar compra*
#### > Error multiple <a> al abrir combo de categorias del NavBar
* Si bien el error sigue ocurriendo sólo una vez al abrir por primera vez el combo de alguna de las categorias del NavBar, se decidió omitir su solución ya que las alternativas eran:
	* **Importar una librería externa:** Descartado, ya que me parecia innecesario y complejizarlo.
	* **Varias formas de evitar utilizando sólo el NavLink u eliminando algún tag html:** Descartado, ya que visualmente se veia bastante mal.
	* **DECISIÓN TOMADA:** Dejar que el error sigá logueandose en la consola, y así permitir una correcta visualización de las categorias en pantalla.
#### > Warnings React Hook useEffect has missing dependencies
* Son 3 warnings que no se consideraron importantes, es por ello que los mismos aparecen en la carga inicial de la aplicación

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
