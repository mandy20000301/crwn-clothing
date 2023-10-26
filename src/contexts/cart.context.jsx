import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utlis";
const addcCartItem = (cartItems, productToAdd) => {
    //find if cartItems contains productToAdd
    const existingCartItem = cartItems.find((item) => {
        return item.id === productToAdd.id;
    })

    // if found increment quantity
    if (existingCartItem) {
        return cartItems.map((item) => {
            return item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        })
    }
    // return new arr with modified cartItems / new cart item
    return [...cartItems, { ...productToAdd, quantity: 1 }]

}
const reduceCartItem = (cartItems, productToReduce) => {
    if(productToReduce.quantity<=1){ 
      return removeCartItem(cartItems, productToReduce)
    }
    return cartItems.map((item) => {
        return item.id === productToReduce.id ? { ...item, quantity: item.quantity - 1 } : item
    })
}

const removeCartItem = (cartItems, productToRemove) => {
    return cartItems.filter((item)=>{
        return item.id !== productToRemove.id
    })
}
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    reduceItemFromCart: () => { },
    cartCount: 0,
    totalPrice:0,
});

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    totalPrice:0,
};

const CART_ACTION_TYPES = {
    SET_CART_ITEMS:'SET_CART_ITEMS',
    SET_IS_CART_OPEN:'SET_IS_CART_OPEN'
}

const cartReduer = (state, action) => {
    const {type, payload} = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`unhandled type ${type} in cartReduer`);
    }
}


export const CartProvider = ({ children }) => {
    const [{ isCartOpen, cartItems, cartCount, totalPrice}, dispatch] = useReducer(cartReduer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity
        }, 0);

        const newTotalPrice = newCartItems.reduce((total, cartItem) => {
            return total + (cartItem.price * cartItem.quantity)
        }, 0)

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS,{cartItems:newCartItems, cartCount: newCartCount, totalPrice: newTotalPrice}));
    }

    const addItemToCart = (itemToAdd) => {
        const newCartItems = addcCartItem(cartItems, itemToAdd);
        updateCartItemsReducer(newCartItems); 
    }

    const reduceItemFromCart = (itemToReduce) => {
        const newCartItems = reduceCartItem(cartItems, itemToReduce);
        updateCartItemsReducer(newCartItems); 
    }

    const removeItemFromCart = (itemToRemove) => {
        const newCartItems = removeCartItem(cartItems,itemToRemove);
        updateCartItemsReducer(newCartItems); 
    }
    
    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    }
    const value = { isCartOpen, setIsCartOpen, addItemToCart, reduceItemFromCart, removeItemFromCart, cartItems, cartCount, totalPrice };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}