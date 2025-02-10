import Modal from "./components/Modal";
import { MealsContextProvider } from "./store/MealsContext.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
import Meals from "./components/Meals";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Modal>
        Modal
      </Modal>
      <CartContextProvider>
        <Header />
        <main>
          <MealsContextProvider>
            <Meals />
          </MealsContextProvider>
        </main>
      </CartContextProvider>
    </>
  );
}

export default App;
