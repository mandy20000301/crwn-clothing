import { createContext, useState, useEffect } from "react";
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

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity
        }, 0)
        setCartCount(newCartCount);
    }, [cartItems])

    useEffect(() => {
        const newTotalPrice = cartItems.reduce((total, cartItem) => {
            return total + (cartItem.price * cartItem.quantity)
        }, 0)
        setTotalPrice(newTotalPrice);
    }, [cartItems])
    const addItemToCart = (itemToAdd) => {
        setCartItems(addcCartItem(cartItems, itemToAdd))
    }

    const reduceItemFromCart = (itemToReduce) => {
        setCartItems(reduceCartItem(cartItems, itemToReduce))
    }

    const removeItemFromCart = (itemToRemove) => {
        setCartItems(removeCartItem(cartItems,itemToRemove))
    }
    
    const value = { isCartOpen, setIsCartOpen, addItemToCart, reduceItemFromCart, removeItemFromCart, cartItems, cartCount, totalPrice };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}