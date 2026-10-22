# Kaizen Scientific Calculator

A browser-based scientific calculator with an interactive simple linear regression tool, built with plain HTML, CSS, and JavaScript. No build step or dependencies are required.

The calculator includes a searchable formula library, calculation history, and regression analysis. The sidebar tools use tabs to keep each workflow organized on desktop and mobile.

## Run

Open `index.html` in any modern browser.

## Project structure

- `index.html` — app entry point and search metadata
- `css/styles.css` — application layout, theme, and transitions
- `js/calculator.js` — calculator, formula search, regression solver, and chart export
- `assets/simple-linear-regression.svg` — regression analysis infographic
- `assets/simple-linear-regression-chart.svg` — sample fitted chart export
- `robots.txt` and `sitemap.xml` — crawler guidance for GitHub Pages

## Features

- Arithmetic, parentheses, powers, modulo, and factorial
- Trigonometric and inverse trigonometric functions
- Degree/radian angle modes
- Square root, logarithms, absolute value, and the constants π and e
- Keyboard input, clear, delete, and sign toggle
- Live result preview while entering expressions
- Smooth result transitions during preview, calculation, and clear
- 3D animated galaxy background with dense drifting stars, spiral nebula, and reduced-motion support
- Color feedback on keypad hover and when entering keys by keyboard
- Smooth panel, formula-card, and guide transitions with reduced-motion support
- Reusable previous answer and recent calculation history
- Searchable formula library with calculator-ready examples
- Safe expression parsing without `eval`
- Simple linear regression from paired X and Y values
- Fitted equation, R², residual plot, and prediction through the calculator
- SVG download of the fitted regression chart
- Tabbed navigation for regression, history, and searchable formulas

The calculator supports expressions such as `sin(30)`, `sqrt(81)`, `2^8`, and `5!`. Use `*` and `/` for multiplication and division.

The formula library has searchable topic filters and one-click examples. The regression tool accepts comma- or space-separated paired values, fits a least-squares line, and lets you predict a Y value for a chosen X. Download the current chart as an SVG. The expandable calculator guide groups usage tips into short steps and highlights keyboard shortcuts.

## Quick guide

Open **Calculator guide** below the keypad for in-app instructions and examples. In brief:

- Enter functions with parentheses, for example `sin(30)` or `sqrt(81)`.
- The result previews as you enter a valid expression; press Enter or **=** to add it to history.
- Select **DEG** or **RAD** to choose the angle unit for trigonometric functions.
- Use `^` for powers, `%` for remainder, `!` for non-negative integer factorials, and `pi` / `e` for constants.
- Write multiplication explicitly, such as `2*pi`; it is not inferred from adjacent values.
- Press **Ans** to reuse the latest successful result. Click an item in **History** to restore that expression; use **Clear** to remove the visible history.
- Search or filter the **Formula library** by topic, then select **Try example** to load an expression into the calculator.
- Press Enter to calculate, Escape to clear, and Backspace to delete the last character.
