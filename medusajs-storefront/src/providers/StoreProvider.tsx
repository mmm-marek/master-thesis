import { Region, StorePostCartsCartReq } from '@medusajs/medusa'
import { Cart, useCart, useCreateLineItem, useDeleteLineItem, useUpdateLineItem } from 'medusa-react'
import { createContext, useContext, useEffect, useState } from 'react'

import { medusa } from '@/utils/medusaHelpers'

type VariantInfoProps = {
	variantId: string
	quantity: number
}

type LineInfoProps = {
	lineId: string
	quantity: number
}

type StoreContextType = {
	cart: Omit<Cart, 'refundable_amount' | 'refunded_total'> | undefined
	countryCode: string | undefined
	setRegion: (regionId: string, countryCode: string) => void
	addItem: (item: VariantInfoProps) => void
	updateItem: (item: LineInfoProps) => void
	deleteItem: (lineId: string) => void
	resetCart: () => void
	updateShippingAddress: (address: StorePostCartsCartReq['shipping_address']) => void
	updateBillingAddress: (address: StorePostCartsCartReq['billing_address']) => void
	isUpdatingCart: boolean
}

const StoreContext = createContext<StoreContextType | null>(null)

export const useStore = () => {
	const context = useContext(StoreContext)
	if (context === null) {
		throw new Error('useStore must be used within a StoreProvider')
	}
	return context
}

interface StoreProps {
	children: React.ReactNode
}

const IS_SERVER = typeof window === 'undefined'
const CART_KEY = 'medusa_cart_id'
const REGION_KEY = 'medusa_region'

const storeCart = (id: string) => {
	if (!IS_SERVER) {
		localStorage.setItem(CART_KEY, id)
	}
}

const getCart = () => {
	if (!IS_SERVER) {
		return localStorage.getItem(CART_KEY)
	}
	return null
}

const deleteCart = () => {
	if (!IS_SERVER) {
		localStorage.removeItem(CART_KEY)
	}
}

const deleteRegion = () => {
	if (!IS_SERVER) {
		localStorage.removeItem(REGION_KEY)
	}
}

/**
 * Accessing cart directly through the useCart hook provided by medusa-react package is not recommended,
 * because the cart might be undefined and the local cart instance needs to be updated after each cart operation.
 * Therefore, any update to the cart should be done through the StoreProvider via useStore hook,
 * which ensures that the cart is defined and updated after each operation.
 */
export const StoreProvider = ({ children }: StoreProps) => {
	const { cart, setCart, createCart, updateCart } = useCart()
	const [countryCode, setCountryCode] = useState<string | undefined>(undefined)
	const addLineItem = useCreateLineItem(cart!.id)
	const removeLineItem = useDeleteLineItem(cart!.id)
	const updateLineItem = useUpdateLineItem(cart!.id)

	const storeRegion = (regionId: string, storeCountryCode: string) => {
		if (!IS_SERVER) {
			localStorage.setItem(REGION_KEY, JSON.stringify({ regionId, countryCode: storeCountryCode }))

			setCountryCode(countryCode)
		}
	}

	const getRegion = () => {
		if (!IS_SERVER) {
			const region = localStorage.getItem(REGION_KEY)
			if (region) {
				return JSON.parse(region) as { regionId: string; countryCode: string }
			}
		}
		return null
	}

	const setRegion = async (regionId: string, countryISO: string) => {
		await updateCart.mutateAsync(
			{
				region_id: regionId
			},
			{
				onSuccess: ({ cart: newCart }) => {
					setCart(newCart)
					storeCart(newCart.id)
					storeRegion(regionId, countryISO)
				},
				onError: (error) => {
					// eslint-disable-next-line no-console
					console.error(error)
				}
			}
		)
	}

	const ensureRegion = (region: Region, storeCountryCode?: string | null) => {
		if (!IS_SERVER) {
			const { regionId, countryCode: defaultCountryCode } = getRegion() || {
				regionId: region.id,
				countryCode: region!.countries[0]!.iso_2
			}

			const finalCountryCode = storeCountryCode || defaultCountryCode

			if (regionId !== region.id) {
				setRegion(region.id, finalCountryCode)
			}

			storeRegion(region.id, finalCountryCode)
			setCountryCode(finalCountryCode)
		}
	}

	const createNewCart = async (regionId?: string) => {
		await createCart.mutateAsync(
			{ region_id: regionId },
			{
				onSuccess: ({ cart: newCart }) => {
					setCart(newCart)
					storeCart(newCart.id)
					ensureRegion(newCart.region, newCart.shipping_address?.country_code)
				},
				onError: (error) => {
					// eslint-disable-next-line no-console
					console.error(error)
				}
			}
		)
	}

	const resetCart = () => {
		deleteCart()

		const savedRegion = getRegion()

		createCart.mutate(
			{
				region_id: savedRegion?.regionId
			},
			{
				onSuccess: ({ cart: newCart }) => {
					setCart(newCart)
					storeCart(newCart.id)
					ensureRegion(newCart.region, newCart.shipping_address?.country_code)
				},
				onError: (error) => {
					// eslint-disable-next-line no-console
					console.error(error)
				}
			}
		)
	}

	const addItem = ({ variantId, quantity }: { variantId: string; quantity: number }) => {
		addLineItem.mutate(
			{
				variant_id: variantId,
				quantity
			},
			{
				onSuccess: ({ cart: newCart }) => {
					setCart(newCart)
					storeCart(newCart.id)
				},
				onError: (error) => {
					// eslint-disable-next-line no-console
					console.log(error)
				}
			}
		)
	}

	const deleteItem = (lineId: string) => {
		removeLineItem.mutate(
			{
				lineId
			},
			{
				onSuccess: ({ cart: newCart }) => {
					setCart(newCart)
					storeCart(newCart.id)
				},
				onError: (error) => {
					// eslint-disable-next-line no-console
					console.log(error)
				}
			}
		)
	}

	const updateItem = ({ lineId, quantity }: { lineId: string; quantity: number }) => {
		updateLineItem.mutate(
			{
				lineId,
				quantity
			},
			{
				onSuccess: ({ cart: newCart }) => {
					setCart(newCart)
					storeCart(newCart.id)
				},
				onError: (error) => {
					// eslint-disable-next-line no-console
					console.log(error)
				}
			}
		)
	}

	const updateShippingAddress = async (address: StorePostCartsCartReq['shipping_address']) => {
		await updateCart.mutateAsync(
			{
				shipping_address: address
			},
			{
				onSuccess: ({ cart: newCart }) => {
					setCart(newCart)
					storeCart(newCart.id)
				},
				onError: (error) => {
					// eslint-disable-next-line no-console
					console.error(error)
				}
			}
		)
	}

	const updateBillingAddress = async (address: StorePostCartsCartReq['billing_address']) => {
		await updateCart.mutateAsync(
			{
				billing_address: address
			},
			{
				onSuccess: ({ cart: newCart }) => {
					setCart(newCart)
					storeCart(newCart.id)
				},
				onError: (error) => {
					// eslint-disable-next-line no-console
					console.error(error)
				}
			}
		)
	}

	useEffect(() => {
		if (!IS_SERVER) {
			const storedRegion = localStorage.getItem(REGION_KEY)
			if (storedRegion) {
				const { countryCode: storeCountryCode } = JSON.parse(storedRegion)
				setCountryCode(storeCountryCode)
			}
		}
	}, [])

	useEffect(() => {
		const ensureCart = async () => {
			const cartId = getCart()
			const region = getRegion()

			if (cartId) {
				const cartRes = await medusa.carts
					.retrieve(cartId)
					.then(({ cart: retrievedCart }) => {
						return retrievedCart
					})
					.catch(async () => {
						return null
					})

				if (!cartRes || cartRes.completed_at) {
					deleteCart()
					deleteRegion()
					await createNewCart()
					return
				}

				setCart(cartRes)
				ensureRegion(cartRes.region)
			} else {
				await createNewCart(region?.regionId)
			}
		}

		if (!IS_SERVER && !cart?.id) {
			ensureCart()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const isUpdatingCart = addLineItem.isLoading || removeLineItem.isLoading || updateLineItem.isLoading

	return (
		<StoreContext.Provider
			// eslint-disable-next-line react/jsx-no-constructed-context-values
			value={{
				countryCode,
				setRegion,
				addItem,
				deleteItem,
				updateItem,
				resetCart,
				isUpdatingCart,
				updateShippingAddress,
				updateBillingAddress,
				cart
			}}
		>
			{children}
		</StoreContext.Provider>
	)
}
