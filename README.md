# buscador-de-peliculas

🎬 Buscador de Películas con React
Este proyecto es una aplicación web que permite buscar películas usando la API de OMDB. Al escribir el nombre de una película, se muestran los resultados con su título, año y póster.

🛠️ Tecnologías y funcionalidades utilizadas:
React: Para la estructura general del proyecto.

Hooks:

useState, useEffect para manejar estados y efectos secundarios.

useRef para evitar búsquedas repetidas.

useCallback y useMemo para optimizar el rendimiento y evitar renderizados innecesarios.

Custom Hook useMovies: Para encapsular la lógica de búsqueda y ordenamiento.

Validaciones: Se verifica que la búsqueda no esté vacía y tenga al menos 3 caracteres.

Debounce: Se usa just-debounce-it para evitar llamadas innecesarias a la API mientras el usuario escribe.

Ordenamiento: Permite ordenar alfabéticamente las películas por título

<img width="462" height="805" alt="image" src="https://github.com/user-attachments/assets/cbc5c04b-1a49-467e-93e6-ef73d581ee59" />
