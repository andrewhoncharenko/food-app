import { MealsContextProvider } from "./store/MealsContext.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";
import Meals from "./components/Meals";
import Header from "./components/Header";
import Cart from "./components/Cart/Cart.jsx";
import Checkout from "./components/Checkout/Checkout.jsx";

function App() {
  return (
      <UserProgressContextProvider>
        <CartContextProvider>
          <Header />
          <main>
            <MealsContextProvider>
              <Meals />
            </MealsContextProvider>
            <Cart/>
            <Checkout />
          </main>
        </CartContextProvider>
      </UserProgressContextProvider>
  );
}

export default App;
