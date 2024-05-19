const MEDUSA_CART_ID = 'medusa_cart_id'

export const getCartId = () => {
	return localStorage.getItem(MEDUSA_CART_ID)
}

export const setCartId = (cartId: string) => {
	localStorage.setItem(MEDUSA_CART_ID, cartId)
}
