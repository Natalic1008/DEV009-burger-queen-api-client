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