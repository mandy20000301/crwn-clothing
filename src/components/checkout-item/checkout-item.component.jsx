import './checkout-item.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
const CheckoutItem = ({ cartItem }) => {
    const { name, quantity, imageUrl, price } = cartItem;
    const {addItemToCart, reduceItemFromCart, removeItemFromCart} = useContext(CartContext);
    const addItem = () => {
        addItemToCart(cartItem)
    }
    const reduceItem = () => {
        reduceItemFromCart(cartItem)
    }
    const removeItem = () => {
        removeItemFromCart(cartItem)
    }
    return (
        <div className="checkout-item-container">
            <div className='box'>
                <img src={imageUrl} alt={name} className="image" />
            </div>
            <div className='box'>
                <h3 className="name">{name}</h3>
            </div>
            <div className='box'>
                <div className="quantity-box">
                    <button onClick={reduceItem}>-</button>
                    <p>{quantity}</p>
                    <button onClick={addItem}>+</button>
                </div>
            </div>
            <div className='box'>
                <p>{price}</p>
            </div>
            <div className='box'>
                <button onClick={removeItem}>remove</button>
            </div>
        </div>
    )
}

export default CheckoutItem;