function createData(id, name, price) {
  return {
    id,
    name,
    price,
  };
}
a = [];
a.push(createData(0, "a", 10));
a.push(createData(1, "b", 20));
a.push(createData(2, "c", 30));

// b = ["a", "c"];
const newA = a.map((obj) => obj.name);
console.log(newA);
// a = a.filter((element) => b == element.name);
console.log(a);

// let wsData = { ETH: 0, BTC: 10, SOL: 0 };
// console.log(wsData['BTC']);
