"use strict";

const expressionDisplay = document.querySelector("#expression");
const resultDisplay = document.querySelector("#result");
const calculatorDisplay = document.querySelector(".display");
const displayStatus = document.querySelector("#display-status");
const modeToggle = document.querySelector("#mode-toggle");
const keypad = document.querySelector(".keypad");
const historyList = document.querySelector("#history-list");
const clearHistoryButton = document.querySelector("#clear-history");
const formulaSearch = document.querySelector("#formula-search");
const formulaCategory = document.querySelector("#formula-category");
const formulaList = document.querySelector("#formula-list");
const formulaCount = document.querySelector("#formula-count");
const extrasTabs = [...document.querySelectorAll(".extras-tabs__tab")];
const extrasPanels = [...document.querySelectorAll(".extras-panel")];
const regressionForm = document.querySelector("#regression-form");
const regressionXInput = document.querySelector("#regression-x");
const regressionYInput = document.querySelector("#regression-y");
const regressionSampleButton = document.querySelector("#regression-sample");
const regressionMessage = document.querySelector("#regression-message");
const regressionOutput = document.querySelector("#regression-output");
const regressionChart = document.querySelector("#regression-chart");
const regressionEquation = document.querySelector("#regression-equation");
const regressionCount = document.querySelector("#regression-count");
const regressionRSquared = document.querySelector("#regression-r-squared");
const regressionEstimate = document.querySelector("#regression-estimate");
const regressionPredictButton = document.querySelector("#regression-predict");
const regressionDownloadButton = document.querySelector("#regression-download");

const formulas = [
  {
    id: "square-of-sum",
    title: "Square of a sum",
    category: "algebra",
    equation: "(a + b)² = a² + 2ab + b²",
    description: "Expand a binomial squared.",
    example: "(2+3)^2",
    steps: ["Rewrite the square as (a + b)(a + b).", "Distribute each term: a² + ab + ab + b².", "Combine like terms: a² + 2ab + b²."],
  },
  {
    id: "difference-of-squares",
    title: "Difference of squares",
    category: "algebra",
    equation: "a² − b² = (a − b)(a + b)",
    description: "Factor the difference between two squares.",
    example: "7^2-3^2",
    steps: ["Write each term as a product: a² = a·a and b² = b·b.", "Factor the expression into the conjugates (a − b)(a + b).", "Expand to check: a² + ab − ab − b² = a² − b²."],
  },
  {
    id: "power-product",
    title: "Product of powers",
    category: "algebra",
    equation: "aᵐ × aⁿ = aᵐ⁺ⁿ",
    description: "When multiplying equal bases, add the exponents.",
    example: "2^3*2^4",
    steps: ["Expand each power into repeated factors of a.", "Join the two groups of equal factors.", "Count all factors: m + n, so the product is aᵐ⁺ⁿ."],
  },
  {
    id: "pythagorean-identity",
    title: "Pythagorean identity",
    category: "trigonometry",
    equation: "sin²(x) + cos²(x) = 1",
    description: "A fundamental identity; x follows the selected DEG/RAD mode.",
    example: "sin(30)^2+cos(30)^2",
    steps: ["On the unit circle, a point has coordinates (cos x, sin x).", "The unit circle equation is u² + v² = 1.", "Substitute u = cos x and v = sin x."],
  },
  {
    id: "degrees-to-radians",
    title: "Degrees to radians",
    category: "trigonometry",
    equation: "radians = degrees × π ÷ 180",
    description: "Convert an angle in degrees to radians.",
    example: "180*pi/180",
    steps: ["A full turn is 360° or 2π radians.", "Divide both values by 360: 1° = 2π/360 radians.", "Simplify to π/180 radians per degree."],
  },
  {
    id: "pythagorean-theorem",
    title: "Pythagorean theorem",
    category: "geometry",
    equation: "c = √(a² + b²)",
    description: "Find a right triangle's hypotenuse from its two legs.",
    example: "sqrt(3^2+4^2)",
    steps: ["Start with the law of cosines: c² = a² + b² − 2ab cos(C).", "For a right angle, C = 90° and cos(C) = 0.", "So c² = a² + b²; take the positive square root."],
  },
  {
    id: "circle-area",
    title: "Area of a circle",
    category: "geometry",
    equation: "A = πr²",
    description: "Find the area using the circle's radius r.",
    example: "pi*5^2",
    steps: ["Split the circle into many thin sectors.", "Rearrange them into an approximate rectangle with height r.", "Its width approaches half the circumference, πr, so A = πr × r."],
  },
  {
    id: "circle-circumference",
    title: "Circumference of a circle",
    category: "geometry",
    equation: "C = 2πr",
    description: "Find the distance around a circle using its radius r.",
    example: "2*pi*5",
    steps: ["The ratio of a circle's circumference to its diameter is π.", "The diameter is twice the radius: d = 2r.", "Substitute d into C = πd to get C = 2πr."],
  },
  {
    id: "log-product",
    title: "Logarithm of a product",
    category: "logarithms",
    equation: "log₁₀(ab) = log₁₀(a) + log₁₀(b)",
    description: "The logarithm of a product is the sum of the logarithms.",
    example: "log(10*100)",
    steps: ["Let log₁₀(a) = m and log₁₀(b) = n.", "Then a = 10ᵐ and b = 10ⁿ.", "Their product is 10ᵐ × 10ⁿ = 10ᵐ⁺ⁿ, so its log is m + n."],
  },
  {
    id: "natural-log-exponential",
    title: "Natural log and exponential",
    category: "logarithms",
    equation: "ln(eˣ) = x",
    description: "The natural logarithm and exponential function undo one another.",
    example: "ln(e^2)",
    steps: ["The natural logarithm is logarithm base e.", "A logarithm asks which exponent produces its input.", "Since eˣ has exponent x, ln(eˣ) = x."],
  },
  {
    id: "simple-linear-regression",
    title: "Simple Linear Regression Analysis",
    category: "statistics",
    equation: "ŷ = b₀ + b₁x; b₁ = [nΣxy − (Σx)(Σy)] / [nΣx² − (Σx)²]; b₀ = (Σy − b₁Σx) / n",
    description: "Fit paired values, inspect R², and predict y from an x value.",
    example: "1, 2, 3 → 4, 5, 8",
    steps: ["Measure how x and y vary together with the slope b₁.", "Choose the intercept b₀ so the line passes through (mean x, mean y).", "These least-squares coefficients minimize the sum of squared residuals."],
  },
  {
    id: "calculus-power-rule",
    title: "Derivative power rule",
    category: "calculus",
    equation: "d/dx(xⁿ) = n·xⁿ⁻¹",
    description: "Differentiate a power function, then evaluate it at a chosen x.",
    example: "3*2^2",
    exampleLabel: "Try derivative of x³ at x = 2 → 12",
    steps: ["Start with f(x) = xⁿ.", "Bring the exponent n in front as a multiplier.", "Reduce the exponent by one: f′(x) = n·xⁿ⁻¹."],
  },
  {
    id: "calculus-constant-multiple-rule",
    title: "Constant multiple rule",
    category: "calculus",
    equation: "d/dx[c·f(x)] = c·f′(x)",
    description: "A constant factor stays in front when differentiating.",
    example: "4*(3*2^2)",
    exampleLabel: "Try derivative of 4x³ at x = 2 → 48",
    steps: ["Write the constant c outside the difference quotient.", "The remaining limit is the derivative f′(x).", "Therefore the result is c·f′(x)."],
  },
  {
    id: "calculus-sum-rule",
    title: "Derivative sum rule",
    category: "calculus",
    equation: "d/dx[f(x) + g(x)] = f′(x) + g′(x)",
    description: "Differentiate each term separately, then add the results.",
    example: "2*2+3*2^2",
    exampleLabel: "Try derivative of x² + x³ at x = 2 → 16",
    steps: ["Apply the difference quotient to f(x) + g(x).", "Split the numerator into the change in f and the change in g.", "Take both limits: f′(x) + g′(x)."],
  },
  {
    id: "calculus-product-rule",
    title: "Product rule",
    category: "calculus",
    equation: "d/dx[f·g] = f′·g + f·g′",
    description: "Differentiate a product using both functions and their derivatives.",
    example: "2*2*2^3+2^2*3*2^2",
    exampleLabel: "Try derivative of x²·x³ at x = 2 → 80",
    steps: ["Start with the difference quotient for f(x)g(x).", "Add and subtract f(x+h)g(x) in the numerator.", "After dividing and taking the limit, the terms become f′g + fg′."],
  },
  {
    id: "calculus-chain-rule",
    title: "Chain rule",
    category: "calculus",
    equation: "d/dx f(g(x)) = f′(g(x))·g′(x)",
    description: "Differentiate an outer function, then multiply by the inner derivative.",
    example: "2*(3*2+1)*3",
    exampleLabel: "Try derivative of (3x + 1)² at x = 2 → 42",
    steps: ["Identify the inner function u = g(x) and outer function f(u).", "Differentiate the outer function with respect to u.", "Multiply by du/dx, the derivative of the inner function."],
  },
  {
    id: "calculus-sine-derivative",
    title: "Derivative of sine",
    category: "calculus",
    equation: "d/dx(sin x) = cos x (x in radians)",
    description: "The derivative of sine is cosine when angles are measured in radians.",
    example: "cos(0)",
    exampleLabel: "Try derivative of sin x at x = 0 → 1",
    steps: ["Use the limit definition of the derivative.", "Apply the sine addition identity to sin(x + h).", "Using lim sin(h)/h = 1 gives cos(x)."],
  },
  {
    id: "calculus-power-integral",
    title: "Power rule for integrals",
    category: "calculus",
    equation: "∫xⁿ dx = xⁿ⁺¹/(n + 1) + C, n ≠ −1",
    description: "Find an antiderivative of a power function.",
    example: "2^4/4",
    exampleLabel: "Try antiderivative of x³ at x = 2 → 4 (C = 0)",
    steps: ["Reverse the derivative power rule.", "Increase the exponent by one: n becomes n + 1.", "Divide by the new exponent so differentiating returns xⁿ; add C."],
  },
  {
    id: "calculus-fundamental-theorem",
    title: "Fundamental theorem of calculus",
    category: "calculus",
    equation: "∫ₐᵇ f(x) dx = F(b) − F(a), where F′ = f",
    description: "Evaluate a definite integral using an antiderivative at both bounds.",
    example: "5^2/2-2^2/2",
    exampleLabel: "Try integral of x from 2 to 5 → 10.5",
    steps: ["Find an antiderivative F such that F′(x) = f(x).", "Evaluate F at the upper bound b and lower bound a.", "Subtract: F(b) − F(a)."],
  },
  {
    id: "calculus-limit-derivative",
    title: "Derivative from a limit",
    category: "calculus",
    equation: "f′(a) = limₕ→₀ [f(a + h) − f(a)]/h",
    description: "Approximate the slope of x² near x = 3 with a small positive h.",
    example: "((3.0001)^2-3^2)/0.0001",
    exampleLabel: "Approximate derivative of x² at x = 3 → 6.0001",
    steps: ["Choose a point a and a small change h.", "Compute the average slope [f(a+h) − f(a)]/h.", "As h approaches zero, the average slope approaches f′(a)."],
  },
  {
    id: "calculus-limit-continuity",
    title: "Limit of a continuous function",
    category: "calculus",
    equation: "limₓ→ₐ f(x) = f(a), when f is continuous at a",
    description: "For a continuous function, evaluate the limit by direct substitution.",
    example: "3^2",
    exampleLabel: "Try lim x→3 of x² → 9",
    steps: ["Check that the function has no break at x = a.", "For a continuous function, nearby values approach its value at a.", "Substitute x = a directly: f(a)."],
  },
  {
    id: "probability-complement",
    title: "Complement rule",
    category: "probability",
    equation: "P(not A) = 1 − P(A)",
    description: "Find the probability that an event does not happen.",
    example: "1-0.35",
    exampleLabel: "If P(A) = 0.35, find P(not A) → 0.65",
    steps: ["An event either happens or does not happen.", "These outcomes do not overlap and cover all possibilities.", "Their probabilities sum to 1, so P(not A) = 1 − P(A)."],
  },
  {
    id: "probability-addition-rule",
    title: "Addition rule",
    category: "probability",
    equation: "P(A ∪ B) = P(A) + P(B) − P(A ∩ B)",
    description: "Find the chance that A or B occurs, including overlap only once.",
    example: "0.4+0.3-0.1",
    exampleLabel: "If P(A)=0.4, P(B)=0.3, overlap=0.1 → 0.6",
    steps: ["Add P(A) and P(B) to count outcomes in either event.", "The overlap P(A ∩ B) was counted twice.", "Subtract the overlap once to get the union probability."],
  },
  {
    id: "probability-independent-events",
    title: "Independent events",
    category: "probability",
    equation: "P(A ∩ B) = P(A)·P(B), when A and B are independent",
    description: "Find the chance that two independent events both occur.",
    example: "0.25*0.5",
    exampleLabel: "If P(A)=0.25 and P(B)=0.5 → 0.125",
    steps: ["Independence means learning that A occurred does not change P(B).", "For each outcome in A, the fraction P(B) also satisfies B.", "Multiply the probabilities: P(A ∩ B) = P(A)P(B)."],
  },
  {
    id: "probability-expected-value",
    title: "Expected value",
    category: "probability",
    equation: "E[X] = Σ x·P(X = x)",
    description: "Compute the long-run average for a discrete random variable.",
    example: "0*0.25+1*0.5+2*0.25",
    exampleLabel: "For outcomes 0, 1, 2 with probabilities 0.25, 0.5, 0.25 → 1",
    steps: ["Multiply each possible outcome by its probability.", "Add all weighted outcomes.", "The result is the long-run average over repeated trials."],
  },
];

const formulaCategoryNames = {
  algebra: "Algebra",
  trigonometry: "Trigonometry",
  geometry: "Geometry",
  logarithms: "Logarithms",
  statistics: "Statistics",
  calculus: "Calculus",
  probability: "Probability",
};

let expression = "";
let angleMode = "DEG";
let hasError = false;
let lastAnswer = null;
let calculationHistory = [];
let highlightedKey = null;
let highlightTimeout = 0;

function formatResult(value) {
  return Number(value.toPrecision(12)).toString();
}

function showResult(value) {
  resultDisplay.classList.remove("result-transition");
  resultDisplay.textContent = value;
  void resultDisplay.offsetWidth;
  resultDisplay.classList.add("result-transition");
}

function highlightKey(button) {
  if (highlightTimeout) {
    window.clearTimeout(highlightTimeout);
  }
  highlightedKey?.classList.remove("is-typed");
  highlightedKey = button;
  button.classList.add("is-typed");
  highlightTimeout = window.setTimeout(() => {
    button.classList.remove("is-typed");
    if (highlightedKey === button) {
      highlightedKey = null;
      highlightTimeout = 0;
    }
  }, 800);
}

function highlightKeyboardKey(key) {
  let button;
  if (key === "Enter" || key === "=") {
    button = keypad.querySelector('[data-action="equals"]');
  } else if (key === "Escape") {
    button = keypad.querySelector('[data-action="clear"]');
  } else if (key === "Backspace") {
    button = keypad.querySelector('[data-action="delete"]');
  } else {
    button = [...keypad.querySelectorAll("button[data-value]")].find((candidate) => candidate.dataset.value === key);
  }
  if (button) highlightKey(button);
}

function renderFormulas() {
  const searchTerm = formulaSearch.value.trim().toLowerCase();
  const selectedCategory = formulaCategory.value;
  const matches = formulas.filter((formula) => {
    const matchesCategory = selectedCategory === "all" || formula.category === selectedCategory;
    const searchableText = `${formula.title} ${formula.category} ${formula.equation} ${formula.description} ${formula.example} ${formula.exampleLabel ?? ""} ${formula.steps.join(" ")}`.toLowerCase();
    return matchesCategory && searchableText.includes(searchTerm);
  });

  formulaCount.textContent = `${matches.length} ${matches.length === 1 ? "formula" : "formulas"}`;
  formulaList.replaceChildren();

  if (matches.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "formula-empty";
    emptyMessage.textContent = "No formulas found. Try another search or topic.";
    formulaList.append(emptyMessage);
    return;
  }

  for (const formula of matches) {
    const card = document.createElement("article");
    const topline = document.createElement("div");
    const title = document.createElement("h3");
    const topic = document.createElement("span");
    const equation = document.createElement("p");
    const description = document.createElement("p");
    const derivation = document.createElement("details");
    const derivationSummary = document.createElement("summary");
    const derivationSteps = document.createElement("ol");
    const exampleButton = document.createElement("button");

    card.className = "formula-card";
    topline.className = "formula-card__topline";
    title.textContent = formula.title;
    topic.className = "formula-card__topic";
    topic.dataset.category = formula.category;
    topic.textContent = formulaCategoryNames[formula.category];
    equation.className = "formula-card__equation";
    equation.textContent = formula.equation;
    description.className = "formula-card__description";
    description.textContent = formula.description;
    derivation.className = "formula-card__derivation";
    derivationSummary.textContent = "How is it derived?";
    for (const step of formula.steps) {
      const item = document.createElement("li");
      item.textContent = step;
      derivationSteps.append(item);
    }
    derivation.append(derivationSummary, derivationSteps);
    exampleButton.className = "formula-card__example";
    exampleButton.type = "button";
    exampleButton.dataset.formulaId = formula.id;
    exampleButton.textContent = formula.id === "simple-linear-regression" ? "Use sample data" : formula.exampleLabel ?? `Try example: ${formula.example}`;
    exampleButton.setAttribute("aria-label", formula.id === "simple-linear-regression" ? "Load sample data in the regression tool" : `Load example for ${formula.title}: ${formula.example}`);
    topline.append(title, topic);
    card.append(topline, equation, description, derivation, exampleButton);
    formulaList.append(card);
  }
}

function activateExtrasTab(tabName, moveFocus = false) {
  for (const tab of extrasTabs) {
    const isActive = tab.dataset.tab === tabName;
    tab.setAttribute("aria-selected", String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
    if (isActive && moveFocus) tab.focus();
  }
  for (const panel of extrasPanels) {
    const isActive = panel.id === `panel-${tabName}`;
    panel.hidden = !isActive;
    panel.classList.remove("is-tab-entering");
    if (isActive) {
      void panel.offsetWidth;
      panel.classList.add("is-tab-entering");
    }
  }
}

function updateDisplay() {
  expressionDisplay.textContent = expression;
  modeToggle.textContent = angleMode;
  modeToggle.setAttribute("aria-label", `Angle mode: ${angleMode === "DEG" ? "degrees" : "radians"}`);
  resultDisplay.classList.toggle("is-error", hasError);
}

function updatePreview() {
  if (!expression) {
    displayStatus.textContent = "";
    calculatorDisplay.classList.remove("display--typing");
    showResult("0");
    resultDisplay.classList.remove("is-error");
    return;
  }

  try {
    showResult(formatResult(evaluate(expression)));
    displayStatus.textContent = "LIVE";
    calculatorDisplay.classList.add("display--typing");
    resultDisplay.classList.remove("is-error");
  } catch {
    showResult("—");
    displayStatus.textContent = "LIVE";
    calculatorDisplay.classList.add("display--typing");
    resultDisplay.classList.remove("is-error");
  }
}

function clear() {
  expression = "";
  showResult("0");
  displayStatus.textContent = "";
  calculatorDisplay.classList.remove("display--typing");
  hasError = false;
  updateDisplay();
}

function append(value) {
  if (hasError) {
    expression = "";
    showResult("0");
    hasError = false;
  }
  expression += value;
  updateDisplay();
  updatePreview();
}

function deleteLast() {
  if (hasError) {
    clear();
    return;
  }
  expression = expression.slice(0, -1);
  updateDisplay();
  updatePreview();
}

function toggleSign() {
  if (hasError) {
    showResult("0");
  }
  if (!expression) {
    expression = "-";
  } else if (expression.startsWith("-(") && expression.endsWith(")")) {
    expression = expression.slice(2, -1);
  } else {
    expression = `-(${expression})`;
  }
  hasError = false;
  updateDisplay();
  updatePreview();
}

function tokenize(input) {
  const tokens = [];
  let position = 0;

  while (position < input.length) {
    if (/\s/.test(input[position])) {
      position += 1;
      continue;
    }

    const numberMatch = input.slice(position).match(/^(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/i);
    if (numberMatch) {
      tokens.push({ type: "number", value: Number(numberMatch[0]) });
      position += numberMatch[0].length;
      continue;
    }

    const identifierMatch = input.slice(position).match(/^[a-z]+/i);
    if (identifierMatch) {
      tokens.push({ type: "identifier", value: identifierMatch[0].toLowerCase() });
      position += identifierMatch[0].length;
      continue;
    }

    const character = input[position];
    if ("+-*/%^!(),".includes(character)) {
      tokens.push({ type: character, value: character });
      position += 1;
      continue;
    }

    throw new Error(`Unexpected character: ${character}`);
  }

  return tokens;
}

function factorial(value) {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error("Factorial requires a non-negative integer");
  }
  if (value > 170) {
    throw new Error("Result is too large");
  }
  let product = 1;
  for (let number = 2; number <= value; number += 1) {
    product *= number;
  }
  return product;
}

function evaluate(input) {
  const tokens = tokenize(input);
  let position = 0;
  const peek = () => tokens[position];
  const consume = (type) => {
    if (!peek() || peek().type !== type) {
      throw new Error(`Expected "${type}"`);
    }
    return tokens[position++];
  };

  function parsePrimary() {
    const token = peek();
    if (!token) {
      throw new Error("Incomplete expression");
    }

    if (token.type === "number") {
      position += 1;
      return token.value;
    }
    if (token.type === "(") {
      position += 1;
      const value = parseAdditive();
      consume(")");
      return value;
    }
    if (token.type === "identifier") {
      position += 1;
      if (token.value === "pi") return Math.PI;
      if (token.value === "e") return Math.E;
      if (token.value === "ans") {
        if (lastAnswer === null) throw new Error("No previous answer yet");
        return lastAnswer;
      }

      const functions = {
        sin: (value) => Math.sin(angleMode === "DEG" ? (value * Math.PI) / 180 : value),
        cos: (value) => Math.cos(angleMode === "DEG" ? (value * Math.PI) / 180 : value),
        tan: (value) => Math.tan(angleMode === "DEG" ? (value * Math.PI) / 180 : value),
        asin: (value) => angleMode === "DEG" ? (Math.asin(value) * 180) / Math.PI : Math.asin(value),
        acos: (value) => angleMode === "DEG" ? (Math.acos(value) * 180) / Math.PI : Math.acos(value),
        atan: (value) => angleMode === "DEG" ? (Math.atan(value) * 180) / Math.PI : Math.atan(value),
        sqrt: (value) => Math.sqrt(value),
        log: (value) => Math.log10(value),
        ln: (value) => Math.log(value),
        abs: (value) => Math.abs(value),
      };
      const fn = functions[token.value];
      if (!fn) throw new Error(`Unknown function: ${token.value}`);
      consume("(");
      const argument = parseAdditive();
      consume(")");
      return fn(argument);
    }

    throw new Error("Expected a number, constant, function, or parenthesis");
  }

  function parsePostfix() {
    let value = parsePrimary();
    while (peek()?.type === "!") {
      position += 1;
      value = factorial(value);
    }
    return value;
  }

  function parsePower() {
    const base = parsePostfix();
    if (peek()?.type === "^") {
      position += 1;
      return base ** parseUnary();
    }
    return base;
  }

  function parseUnary() {
    if (peek()?.type === "+") {
      position += 1;
      return parseUnary();
    }
    if (peek()?.type === "-") {
      position += 1;
      return -parseUnary();
    }
    return parsePower();
  }

  function parseMultiplicative() {
    let value = parseUnary();
    while (peek() && ["*", "/", "%"].includes(peek().type)) {
      const operator = tokens[position++].type;
      const right = parseUnary();
      if ((operator === "/" || operator === "%") && right === 0) {
        throw new Error("Cannot divide by zero");
      }
      if (operator === "*") value *= right;
      if (operator === "/") value /= right;
      if (operator === "%") value %= right;
    }
    return value;
  }

  function parseAdditive() {
    let value = parseMultiplicative();
    while (peek() && ["+", "-"].includes(peek().type)) {
      const operator = tokens[position++].type;
      const right = parseMultiplicative();
      value = operator === "+" ? value + right : value - right;
    }
    return value;
  }

  if (tokens.length === 0) throw new Error("Enter an expression");
  const value = parseAdditive();
  if (position !== tokens.length) {
    throw new Error(`Unexpected token: ${tokens[position].value}`);
  }
  if (!Number.isFinite(value)) {
    throw new Error("Result is outside the real number range");
  }
  return value;
}

function renderHistory() {
  historyList.replaceChildren();
  clearHistoryButton.disabled = calculationHistory.length === 0;

  if (calculationHistory.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.className = "history__empty";
    emptyMessage.textContent = "Your calculations will appear here.";
    historyList.append(emptyMessage);
    return;
  }

  for (const entry of calculationHistory) {
    const item = document.createElement("li");
    const button = document.createElement("button");
    const expressionText = document.createElement("span");
    const resultText = document.createElement("span");

    button.className = "history__item";
    button.type = "button";
    button.setAttribute("aria-label", `Reuse ${entry.expression}, result ${entry.result}`);
    expressionText.className = "history__expression";
    expressionText.textContent = `${entry.expression} · ${entry.angleMode}`;
    resultText.className = "history__result";
    resultText.textContent = entry.result;
    button.append(expressionText, resultText);
    button.addEventListener("click", () => {
      expression = entry.expression;
      showResult(entry.result);
      displayStatus.textContent = "RESULT";
      calculatorDisplay.classList.remove("display--typing");
      hasError = false;
      updateDisplay();
    });
    item.append(button);
    historyList.append(item);
  }
}

function calculate() {
  calculatorDisplay.classList.remove("display--typing");
  try {
    const value = evaluate(expression);
    const formattedResult = formatResult(value);
    showResult(formattedResult);
    displayStatus.textContent = "RESULT";
    lastAnswer = value;
    calculationHistory.unshift({ expression, result: formattedResult, angleMode });
    calculationHistory = calculationHistory.slice(0, 8);
    renderHistory();
    hasError = false;
  } catch (error) {
    showResult(error instanceof Error ? error.message : "Invalid expression");
    displayStatus.textContent = "ERROR";
    hasError = true;
  }
  updateDisplay();
}

let currentRegression = null;

function parseRegressionValues(input) {
  const tokens = input.trim().split(/[\s,]+/).filter(Boolean);
  const values = tokens.map(Number);
  if (values.length < 2 || values.some((value) => !Number.isFinite(value))) {
    throw new Error("Enter at least two valid numbers for each variable.");
  }
  return values;
}

function svgNode(name, attributes) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", name);
  for (const [attribute, value] of Object.entries(attributes)) {
    node.setAttribute(attribute, value);
  }
  return node;
}

function drawRegressionChart(xValues, yValues, intercept, slope, rSquared) {
  regressionChart.replaceChildren();
  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);
  const fittedValues = [intercept + slope * xMin, intercept + slope * xMax];
  const yMin = Math.min(...yValues, ...fittedValues);
  const yMax = Math.max(...yValues, ...fittedValues);
  const yPadding = (yMax - yMin || Math.max(Math.abs(yMin), 1)) * 0.08;
  const yDomainMin = yMin - yPadding;
  const yDomainMax = yMax + yPadding;
  const plot = { left: 48, right: 350, top: 42, bottom: 177 };
  const mapX = (value) => plot.left + ((value - xMin) / (xMax - xMin)) * (plot.right - plot.left);
  const mapY = (value) => plot.bottom - ((value - yDomainMin) / (yDomainMax - yDomainMin)) * (plot.bottom - plot.top);
  const formatTick = (value) => Number(value.toPrecision(4)).toString();
  const xTicks = [xMin, (xMin + xMax) / 2, xMax];
  const yTicks = yMin === yMax ? [yMin - yPadding, yMin, yMin + yPadding] : [yMin, (yMin + yMax) / 2, yMax];
  const slopeSign = slope < 0 ? "−" : "+";
  const equation = `ŷ = ${formatResult(intercept)} ${slopeSign} ${formatResult(Math.abs(slope))}x`;

  const title = svgNode("text", { x: "12", y: "20", fill: "#dce8e4", "font-size": "11", "font-weight": "700", "font-family": "Arial, sans-serif" });
  title.textContent = equation;
  const rSquaredLabel = svgNode("text", { x: "348", y: "20", fill: "#a9bdba", "font-size": "10", "font-family": "Arial, sans-serif", "text-anchor": "end" });
  rSquaredLabel.textContent = `R² = ${Math.max(0, Math.min(1, rSquared)).toFixed(4)}`;
  regressionChart.append(title, rSquaredLabel);

  for (const value of yTicks) {
    const y = mapY(value);
    regressionChart.append(
      svgNode("line", { x1: plot.left, y1: y, x2: plot.right, y2: y, stroke: "#d4e0dc", "stroke-opacity": ".15" }),
      Object.assign(svgNode("text", { x: plot.left - 8, y: y + 3.5, fill: "#9db0b2", "font-size": "9", "font-family": "Arial, sans-serif", "text-anchor": "end" }), { textContent: formatTick(value) }),
    );
  }

  for (const value of xTicks) {
    const x = mapX(value);
    regressionChart.append(
      svgNode("line", { x1: x, y1: plot.top, x2: x, y2: plot.bottom, stroke: "#d4e0dc", "stroke-opacity": ".1" }),
      Object.assign(svgNode("text", { x, y: plot.bottom + 14, fill: "#9db0b2", "font-size": "9", "font-family": "Arial, sans-serif", "text-anchor": "middle" }), { textContent: formatTick(value) }),
    );
  }

  regressionChart.append(
    svgNode("path", { d: `M${plot.left} ${plot.top}V${plot.bottom}H${plot.right}`, fill: "none", stroke: "#82999b", "stroke-width": "1.2" }),
    svgNode("path", { d: `M${mapX(xMin)} ${mapY(fittedValues[0])}L${mapX(xMax)} ${mapY(fittedValues[1])}`, fill: "none", stroke: "#77e6e1", "stroke-width": "3", "stroke-linecap": "round" }),
    Object.assign(svgNode("text", { x: (plot.left + plot.right) / 2, y: "216", fill: "#c1cfcc", "font-size": "10", "font-family": "Arial, sans-serif", "text-anchor": "middle" }), { textContent: "X values" }),
    Object.assign(svgNode("text", { x: "14", y: (plot.top + plot.bottom) / 2, fill: "#c1cfcc", "font-size": "10", "font-family": "Arial, sans-serif", "text-anchor": "middle", transform: `rotate(-90 14 ${(plot.top + plot.bottom) / 2})` }), { textContent: "Y values" }),
  );

  for (let index = 0; index < xValues.length; index += 1) {
    const x = mapX(xValues[index]);
    const y = mapY(yValues[index]);
    const predictedY = mapY(intercept + slope * xValues[index]);
    regressionChart.append(
      svgNode("line", { x1: x, y1: y, x2: x, y2: predictedY, stroke: "#e8aa62", "stroke-opacity": ".65", "stroke-dasharray": "3 3" }),
      svgNode("circle", { cx: x, cy: y, r: "4.5", fill: "#f0a66e", stroke: "#142635", "stroke-width": "2" }),
    );
  }
}

function fitRegression() {
  try {
    const xValues = parseRegressionValues(regressionXInput.value);
    const yValues = parseRegressionValues(regressionYInput.value);
    if (xValues.length !== yValues.length) {
      throw new Error("X and Y need the same number of values, in matching order.");
    }

    const count = xValues.length;
    const meanX = xValues.reduce((sum, value) => sum + value, 0) / count;
    const meanY = yValues.reduce((sum, value) => sum + value, 0) / count;
    const sumSquaresX = xValues.reduce((sum, value) => sum + (value - meanX) ** 2, 0);
    if (sumSquaresX === 0) {
      throw new Error("X values must include at least two different numbers.");
    }

    const slope = xValues.reduce((sum, value, index) => sum + (value - meanX) * (yValues[index] - meanY), 0) / sumSquaresX;
    const intercept = meanY - slope * meanX;
    const residualSumSquares = xValues.reduce((sum, value, index) => sum + (yValues[index] - (intercept + slope * value)) ** 2, 0);
    const totalSumSquares = yValues.reduce((sum, value) => sum + (value - meanY) ** 2, 0);
    const rSquared = totalSumSquares === 0 ? 1 : 1 - residualSumSquares / totalSumSquares;
    if (![slope, intercept, rSquared].every(Number.isFinite)) {
      throw new Error("These values are too large to fit reliably.");
    }

    currentRegression = { intercept, slope };
    const slopeSign = slope < 0 ? "−" : "+";
    regressionEquation.textContent = `ŷ = ${formatResult(intercept)} ${slopeSign} ${formatResult(Math.abs(slope))}x`;
    regressionCount.textContent = `n = ${count}`;
    regressionRSquared.textContent = `R² = ${Math.max(0, Math.min(1, rSquared)).toFixed(4)}`;
    regressionChart.setAttribute("aria-label", `Scatterplot of ${count} paired values with fitted regression line`);
    drawRegressionChart(xValues, yValues, intercept, slope, rSquared);
    regressionOutput.hidden = false;
    regressionOutput.classList.remove("is-entering");
    void regressionOutput.offsetWidth;
    regressionOutput.classList.add("is-entering");
    regressionPredictButton.disabled = false;
    regressionMessage.textContent = "Line fitted. Enter an x value to predict y in the calculator.";
  } catch (error) {
    currentRegression = null;
    regressionPredictButton.disabled = true;
    regressionOutput.hidden = true;
    regressionMessage.textContent = error instanceof Error ? error.message : "Unable to fit this data.";
  }
}

function invalidateRegression() {
  currentRegression = null;
  regressionOutput.hidden = true;
  regressionPredictButton.disabled = true;
  regressionMessage.textContent = "Data changed. Fit the line again to update the result.";
}

regressionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  fitRegression();
});

regressionSampleButton.addEventListener("click", () => {
  regressionXInput.value = "1, 2, 3, 4, 5";
  regressionYInput.value = "4, 5, 8, 8, 12";
  fitRegression();
});

regressionXInput.addEventListener("input", invalidateRegression);
regressionYInput.addEventListener("input", invalidateRegression);

regressionPredictButton.addEventListener("click", () => {
  if (!currentRegression || regressionEstimate.value === "") return;
  const xValue = Number(regressionEstimate.value);
  if (!Number.isFinite(xValue)) {
    regressionMessage.textContent = "Enter a valid x value to predict y.";
    return;
  }
  expression = `${formatResult(currentRegression.intercept)}+(${formatResult(currentRegression.slope)})*(${formatResult(xValue)})`;
  hasError = false;
  updateDisplay();
  calculate();
  resultDisplay.scrollIntoView({ behavior: "smooth", block: "center" });
});

for (const tab of extrasTabs) {
  tab.addEventListener("click", () => activateExtrasTab(tab.dataset.tab));
  tab.addEventListener("keydown", (event) => {
    const currentIndex = extrasTabs.indexOf(tab);
    let nextIndex;
    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % extrasTabs.length;
    else if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + extrasTabs.length) % extrasTabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = extrasTabs.length - 1;
    else return;

    event.preventDefault();
    activateExtrasTab(extrasTabs[nextIndex].dataset.tab, true);
  });
}

regressionDownloadButton.addEventListener("click", () => {
  if (!currentRegression) return;
  const chart = regressionChart.cloneNode(true);
  chart.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  chart.setAttribute("width", "1080");
  chart.setAttribute("height", "690");
  chart.insertBefore(svgNode("rect", { width: "360", height: "230", fill: "#142635" }), chart.firstChild);
  const chartTitle = svgNode("text", { x: "12", y: "222", fill: "#9db0b2", "font-size": "8", "font-family": "Arial, sans-serif" });
  chartTitle.textContent = "Simple Linear Regression Analysis · Observed data and fitted line";
  chart.append(chartTitle);

  const file = new Blob([new XMLSerializer().serializeToString(chart)], { type: "image/svg+xml;charset=utf-8" });
  const fileUrl = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = "simple-linear-regression-chart.svg";
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(fileUrl), 1000);
});

keypad.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  highlightKey(button);

  const { action, value } = button.dataset;
  if (action === "clear") clear();
  else if (action === "delete") deleteLast();
  else if (action === "equals") calculate();
  else if (action === "sign") toggleSign();
  else if (value) append(value);
});

modeToggle.addEventListener("click", () => {
  angleMode = angleMode === "DEG" ? "RAD" : "DEG";
  updateDisplay();
  updatePreview();
});

clearHistoryButton.addEventListener("click", () => {
  calculationHistory = [];
  renderHistory();
});

formulaSearch.addEventListener("input", renderFormulas);
formulaCategory.addEventListener("change", renderFormulas);

formulaList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-formula-id]");
  if (!button) return;

  const formula = formulas.find((item) => item.id === button.dataset.formulaId);
  if (!formula) return;

  if (formula.id === "simple-linear-regression") {
    activateExtrasTab("regression");
    regressionXInput.value = "1, 2, 3, 4, 5";
    regressionYInput.value = "4, 5, 8, 8, 12";
    fitRegression();
    document.querySelector(".regression").scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  expression = formula.example;
  hasError = false;
  updateDisplay();
  updatePreview();
  expressionDisplay.scrollIntoView({ behavior: "smooth", block: "center" });
});

renderFormulas();

document.addEventListener("keydown", (event) => {
  if (event.target instanceof HTMLElement && (event.target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName))) {
    return;
  }
  highlightKeyboardKey(event.key);
  if (event.key === "Enter" || event.key === "=") {
    event.preventDefault();
    calculate();
  } else if (event.key === "Escape") {
    clear();
  } else if (event.key === "Backspace") {
    deleteLast();
  } else if (/^[0-9.+\-*/%^!()]$/.test(event.key)) {
    event.preventDefault();
    append(event.key);
  }
});
