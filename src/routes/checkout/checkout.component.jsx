import './checkout.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
const Checkout = () => {
    const { cartItems, totalPrice } = useContext(CartContext);
    return (
        <div className='checkout-container'>
            <div className="title-box">
                <p>Product</p>
                <p>Description</p>
                <p>Quantity</p>
                <p>Price</p>
                <p>Remove</p>
            </div>
            <div className="items-box">
                {cartItems.map((item) => (
                    <CheckoutItem key={item.id} cartItem={item} />
                )
                )}
            </div>
            <div>
                <h3>Total: {totalPrice}</h3>
            </div>
        </div>
    )
}
export default Checkout;
