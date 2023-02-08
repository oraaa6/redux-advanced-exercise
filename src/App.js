import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./components/store/cart-actions";

let isInitial = true;
function App() {
  const dispatch = useDispatch();
  const isCartVisible = useSelector((state) => state.header.showCart);
  const cart = useSelector((state) => state.cart);
  const notifiaction = useSelector((state) => state.header.notification);

  // DO ZADAŃ ASYNCHRONICZNYCH (NP REQUESTÓW) ORAZ ZADAŃ Z SIDE-EFFECTAMI Z REDUXEM UŻYWA SIĘ 2 PODEJŚĆ
  // 1. W KOMPONENCIE PRZY UŻYCIU USE EFFECTA (CO JEST PONIŻEJ)
  // 2. W KREATORACH AKCJI (to co jest w mealCounter-slice -> sendCartData)
  // useEffect(() => {
  //   const sendCartData = async () => {
  //     dispatch(
  //       headerActions.showNotification({
  //         status: "loading",
  //         title: "Sending...",
  //         message: "Sending cart data!",
  //       })
  //     );
  //     const response = await fetch(
  //       "https://http-custom-hook-764c9-default-rtdb.firebaseio.com/cart.json",
  //       {
  //         method: "PUT",
  //         body: JSON.stringify(cart), //PUT nadpisuje
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error("Sending cart data failed");
  //     }

  //     // const responseData = await response.json();

  //     dispatch(
  //       headerActions.showNotification({
  //         status: "success",
  //         title: "Success!",
  //         message: "Sent cart data successfully!",
  //       })
  //     );
  //   };

  //   if (isInitial) {
  //     isInitial = false;
  //     return; // zastosowane jest po to, zeby przy załadowaniu aplikacji, nie wysyłało requesta - jeslu isInitial jest true to blokuje resztę kodu w funkcji
  //   }

  //   sendCartData().catch((error) => {
  //     dispatch(
  //       headerActions.showNotification({
  //         status: "error",
  //         title: "Error!",
  //         message: "Sending cart data failed!",
  //       })
  //     );
  //   });
  // }, [cart, dispatch]);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]); //to nigdy nie odpali się wiecej niz raz przy ładowaniu apki, dispatch sie nie zmieni

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return; // zastosowane jest po to, zeby przy załadowaniu aplikacji, nie wysyłało requesta - jeslu isInitial jest true to blokuje resztę kodu w funkcji
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));  // przeciwdziałanie wysylaniu requesta po załadowaniuu aplikacji - bo wtedy zmienia się cart (to co jest w tablicy zalezności)
    }
  }, [cart, dispatch]);

  return (
    <>
      {notifiaction && (
        <Notification
          status={notifiaction.status}
          title={notifiaction.title}
          message={notifiaction.message}
        />
      )}
      <Layout>
        {isCartVisible && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
