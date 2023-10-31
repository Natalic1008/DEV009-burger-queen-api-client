# Changelog
## 1.0.2 - 2023-10-30

### Sprint learnings

- Aprendimos a usar el grid en CSS
- Aprendimos a definir correctamente el uso de TypeScript
- Aprendimos a pasar los estados como propiedades de otras funciones

### Added

- Agregamos  estilo al componente menú.
- Agregamos el botón de cerrar sesión utilizando Bootstrap
- Agregamos la funcion de selecionar el mismo producto y que no nos adicione otro item sino que lo sume al pedido.


### Changed

- La funcionalidad de tomar pedido se está refactorizando, teniendo en cuenta que no repita producto y que funcione los botones de  + y - 


# Changelog
## 1.0.1 - 2023-10-24

### Sprint learnings

- Aprendimos a usar el hook userEffect
- Aprendimos a usar TypeScript
- Aprendimos a realizar el pedido a la API de acuerdo al filtro realizado

### Added

- Agregamos la función de menú, donde podemos ver los productos de acuerdo a la selección dada por el usuario.
- Agregamos la funcion de cerrar sesión utilizando Bootstrap
- Agregamos la funcion de selecionar los productos y visualizar sus datos en la tabla de pedidos
- Realizamos el test de login en el cual se valido el usuario (mesero) y que al logiarse se redirigiera a la vista del mesero.

### Changed

- La funcionalidad de menú se modifico ya que antes se mostraban los productos en una tabla de acuerdo a la selección indica en el codigo manualmente; Ahora trae automatico todos los productos con sus datos y se muestran en un botón cada producto.
- En el navegador se adiciono la función de cerrar sesión


### Fixed

- Se resuelve la definiciones de tipos de los datos utilizados pedidos por TypeScript
- Se resuelve el problema de visualizar los datos al hacer click en el producto al realizar el pedido


## 1.0.0 - 2023-10-17

### Sprint learnings

- Aprendimos a usar el hook userState 
- Aprendimos a complementar nuestro diseño con bootstrap
- Aprendimos a utilizar onchange para guardar los valores de los datos

### Added

- Agregamos la funcion de login
- Agregamos la funcion de las rutas
- Agregamos la funcion de userAuth
- Agregamos la funcion saveData
- Agregamos la funcion Auth
- Agregamos la funcion navigateTo
- Agregamos la funcion AppBar
- Definición de estado para el campo de email y password
- Agregamos la vista de mesero 
- Se está trabajando con la barra de navegación

### Fixed

- Se resuelve  bug el login con el hook userState y el ruteo con onchange

### Changed

- Implementación de petición de /login al API
- Mejoras visuales en la vista de login usando Bootstrap