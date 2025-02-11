import { MealsContextProvider } from "./store/MealsContext.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";
import Meals from "./components/Meals";
import Header from "./components/Header";

import Cart from "./components/Cart/Cart.jsx";

function App() {
  return (
    <>
    <p>as</p>
      <UserProgressContextProvider>
        <CartContextProvider>
          <Header />
          <main>
            <MealsContextProvider>
              <Meals />
            </MealsContextProvider>
            <Cart/>
          </main>
        </CartContextProvider>
      </UserProgressContextProvider>
  </>);
}

export default App;
