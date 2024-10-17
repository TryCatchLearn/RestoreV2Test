import { BasketItem } from "../../app/types/basket";
import { useClearBasketMutation, useFetchBasketQuery } from "../../features/basket/basketApi";

export const useBasket = () => {
    const { data: basket } = useFetchBasketQuery();
    const [clearBasket] = useClearBasketMutation();

    const subtotal = basket?.items.reduce((sum: number, item: BasketItem) => sum + item.quantity * item.price, 0) ?? 0;
    const deliveryFee = subtotal > 10000 ? 0 : 500;

    return {basket, subtotal, deliveryFee, clearBasket}
}