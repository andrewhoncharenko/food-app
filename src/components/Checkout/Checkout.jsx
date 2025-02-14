import { useContext, useActionState } from "react";
import Modal from "../UI/Modal.jsx";
import Input from "../UI/Input.jsx";
import CartContext from "../../store/CartContext";
import UserProgressContext from "../../store/UserProgressContext.jsx";
import { currencyFormatter } from "../../util/formatting.js";
import Button from "../UI/Button.jsx";
import Error from "../Error/Error.jsx";
import useHttp from "../../hooks/useHttp.js";

const requestConfig = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    }
};

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext)
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);
    const {data, error, sendRequest, clearData} = useHttp("http://localhost:3000/orders", requestConfig);
    const [formState, formAction, isSending] = useActionState(checkoutAction, null);
    
    async function checkoutAction(prevState, fd) {
        const customerData = Object.fromEntries(fd.entries());

        await sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
        }}));

        
    }

    function handleClose() {
        userProgressCtx.hideCheckout();
    }

    function handleFinish() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();

    }

    let actions = (
        <>
            <Button type="button" onClick={handleClose} textOnly>Close</Button>
            <Button>Submit order</Button>
        </>
    );

    if(isSending) {
        actions = <span>Sending order data...</span>;
    }

    if(data && !error) {
        return <Modal open={userProgressCtx.progress === "checkout"} onClose={handleFinish}>
            <h2>Success!</h2>
            <p>Your order was submitted sucessfully.</p>
            <p>We will get back to you with more details via email within the next few minutes.</p>
            <p className="modal-actions">
                <Button onClick={handleFinish}>Okay</Button>
            </p>
        </Modal>;
    }
    
    return <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
        <form action={formAction}>
            <h2>Checkout</h2>
            <p>Total amount: {currencyFormatter.format(cartTotal)}</p>
            <Input label="Full name" type="text" id="name" />
            <Input label="E-Mail" type="email" id="email" />
            <Input label="Street" type="text" id="street" />
            <div>
                <Input label="Postal code" type="text" id="postal-code" />
                <Input label="City" type="text" id="city" />
            </div>
            {error && <Error title="Failed to submit order" message={error} />}
            <p className="modal-actions">{actions}</p>
        </form>
    </Modal>;
}