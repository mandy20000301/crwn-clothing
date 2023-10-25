import {ShoppingIcon, CartIconContainer, ItemCount} from './cart-icon.styles.jsx';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
const CartIcon = ()=>{
    const {isCartOpen, setIsCartOpen, cartItems, cartCount} = useContext(CartContext);
    const toggleIsCartOpen = ()=>{
        setIsCartOpen(!isCartOpen);
    }
    return(
        <CartIconContainer  onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;