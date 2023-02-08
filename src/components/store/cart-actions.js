import { headerActions } from "./header-slice";
import { cartActions } from "./mealCounter-slice";

//KREATOR AKCJI - THUNK ACTION - WYSYŁANIE REQUESTA:
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      headerActions.showNotification({
        status: "loading",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://http-custom-hook-764c9-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart), //PUT nadpisuje
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }
    };

    try {
      await sendRequest();
      dispatch(
        headerActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        headerActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    //mogę tu też dispatchowac notification jak w sendCartData
    const fetchData = async () => {
      const response = await fetch(
        "https://http-custom-hook-764c9-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data");
      }

      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      ); //zamiana kart na tą z backendu
    } catch (error) {
      dispatch(
        headerActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};
