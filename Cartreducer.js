// eslint-disable-next-line import/no-anonymous-default-export
const initialState = {
  products: [],
  itemQuantity: [],
  count: 0,
};

let x = 0;
let p = [];
let i = [];

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "AddedToCart":
      addToCart(payload);
      return { products: p, itemQuantity: i, count: ++x };
    case "RemovedfromCart":
      return --state;
    default:
      return state;
  }
};

const addToCart = (product) => {
  if (p.includes(product)) {
    i.push(product.id);
  } else {
    p.push(product);
  }
};

export default reducer;