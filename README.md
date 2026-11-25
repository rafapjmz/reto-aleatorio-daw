# 🎲 Ruleta de retos DWCLE

Generador aleatorio de retos de programación para practicar cuando no sabes qué hacer. Filtra por tecnología y dificultad, gira la ruleta y guarda los retos que te interesen.

**[Ver la demo](https://rafapjmz.github.io/reto-aleatorio-daw/)**

## Qué hace

- 12 retos de JavaScript, PHP, Java y C con tres niveles: Fácil, Media y Reto.
- Filtros combinables por tecnología y dificultad.
- Ruleta animada que elige un reto al azar entre los disponibles.
- Cada reto incluye una descripción y una pista que se puede mostrar u ocultar.
- Lista de retos guardados en `localStorage`.
- diseño responsive y respeta `prefers-reduced-motion`.

## Parte de las prácticas de DWCLE

El código está pensado como ejercicio de los contenidos del módulo **Desarrollo Web en Entorno Cliente**:

- `filter()` para aplicar los filtros y para quitar retos guardados.
- `map()` para pintar la lista de retos guardados y las etiquetas del resumen.
- `reduce()` para calcular cuántos retos hay de cada dificultad.
- `addEventListener` para los controles y delegación de eventos en la lista.
- Manipulación del DOM y animaciones CSS.

## Ejecutar en local

No necesita instalar nada: abre `index.html` en el navegador. Si prefieres servirlo por HTTP:

```bash
python -m http.server 8000
```

y entra en `http://localhost:8000`.

<p align="center"><sub>Con un poco de ayuda de IA.</sub></p>
