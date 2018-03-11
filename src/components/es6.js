'use strict';

// Some code to test spread operator
function spreadTests() {
    console.warn("Spread Tests");
    let a = [1,2,3,4];
    let b = [...a, 5,6];
    console.warn("==> Array creation - a: [1,2,3,4], b ([...a, 5,6]): ", b);

    let c = { a: "A", b: "B", c: "C" };
    let d = { ...c };
    console.warn("==> Object creation - c: { a: \"A\", b: \"B\", c: \"C\" }, d ({ ...c }): ", d);

    let { a: aa, ...x } = d;
    console.warn("==> Destructuring a: aa (alias): ", aa, ", ...x (remaining properties): ", x);
}

export {spreadTests};