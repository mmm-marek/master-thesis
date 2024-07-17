import { Region, StorePostCartsCartReq } from '@medusajs/medusa'
import { PricedShippingOption } from '@medusajs/medusa/dist/types/pricing'
import { Cart, useCart, useCartShippingOptions, useCreateLineItem, useDeleteLineItem, useUpdateLineItem } from 'medusa-react'
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

type MutationCallbacks = {
	onSuccess: () => void
	onError: () => void
}

type StoreContextType = {
	isUpdatingCart: boolean
	countryCode: string | undefined
	shippingOptions: PricedShippingOption[]
	cart: Omit<Cart, 'refundable_amount' | 'refunded_total'> | undefined
	setRegion: (regionId: string, countryCode: string, callbacks?: Partial<MutationCallbacks>) => void
	addItem: (item: VariantInfoProps, callbacks?: Partial<MutationCallbacks>) => void
	updateItem: (item: LineInfoProps, callbacks?: Partial<MutationCallbacks>) => void
	deleteItem: (lineId: string, callbacks?: Partial<MutationCallbacks>) => void
	resetCart: (callbacks?: Partial<MutationCallbacks>) => void
	updateShippingAddress: (address: StorePostCartsCartReq['shipping_address'], callbacks?: Partial<MutationCallbacks>) => void
	updateBillingAddress: (address: StorePostCartsCartReq['billing_address'], callbacks?: Partial<MutationCallbacks>) => void
	updateCheckoutEmail: (email: string, callbacks?: Partial<MutationCallbacks>) => void
	initPayment: (callbacks?: Partial<MutationCallbacks>) => void
	completePayment: (callbacks?: Partial<MutationCallbacks>) => void
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
	const { shipping_options: shippingOptions } = useCartShippingOptions(cart!.id)
	const addLineItem = useCreateLineItem(cart!.id)
	const removeLineItem = useDeleteLineItem(cart!.id)
	const updateLineItem = useUpdateLineItem(cart!.id)

	const [countryCode, setCountryCode] = useState<string | undefined>(undefined)

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

	const setRegion = async (regionId: string, countryISO: string, callbacks?: Partial<MutationCallbacks>) => {
		await updateCart.mutateAsync(
			{
				region_id: regionId
			},
			{
				onSuccess: ({ cart: newCart }) => {
					setCart(newCart)
					storeCart(newCart.id)
					storeRegion(regionId, countryISO)
					if (callbacks?.onSuccess) {
						callbacks?.onSuccess()
					}
				},
				onError: (error) => {
					// eslint-disable-next-line no-console
					console.error(error)
					if (callbacks?.onError) {
						callbacks?.onError()
					}
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

	const createNewCart = async (regionId?: string, callbacks?: Partial<MutationCallbacks>) => {
		await createCart.mutateAsync(
			{ region_id: regionId },
			{
				onSuccess: ({ cart: newCart }) => {
					setCart(newCart)
					storeCart(newCart.id)
					ensureRegion(newCart.region, newCart.shipping_address?.country_code)
					if (callbacks?.onSuccess) {
						callbacks?.onSuccess()
					}
				},
				onError: (error) => {
					// eslint-disable-next-line no-console
					console.error(error)
					if (callbacks?.onError) {
						callbacks?.onError()
					}
				}
			}
		)
	}

	const resetCart = (callbacks?: Partial<MutationCallbacks>) => {
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
					if (callbacks?.onSuccess) {
						callbacks?.onSuccess()
					}
				},
				onError: (error) => {
					// eslint-disable-next-line no-console
					console.error(error)
					if (callbacks?.onError) {
						callbacks?.onError()
					}
				}
			}
		)
	}

	const addItem = ({ variantId, quantity }: { variantId: string; quantity: number }, callbacks?: Partial<MutationCallbacks>) => {
		addLineItem.mutate(
			{
				variant_id: variantId,
				quantity
			},
			{
				onSuccess: ({ cart: newCart }) => {
					setCart(newCart)
					storeCart(newCart.id)
					if (callbacks?.onSuccess) {
						callbacks?.onSuccess()
					}
				},
				onError: (error) => {
					// eslint-disable-next-line no-console
					console.error(error)
					if (callbacks?.onError) {
						callbacks?.onError()
					}
				}
			}
		)
	}

	const deleteItem = (lineId: string, callbacks?: Partial<MutationCallbacks>) => {
		removeLineItem.mutate(
			{
				lineId
			},
			{
				onSuccess: ({ cart: newCart }) => {
					setCart(newCart)
					storeCart(newCart.id)
					if (callbacks?.onSuccess) {
						callbacks?.onSuccess()
					}
				},
				onError: (error) => {
					// eslint-disable-next-line no-console
					console.error(error)
					if (callbacks?.onError) {
						callbacks?.onError()
					}
				}
			}
		)
	}

	const updateItem = ({ lineId, quantity }: { lineId: string; quantity: number }, callbacks?: Partial<MutationCallbacks>) => {
		updateLineItem.mutate(
			{
				lineId,
				quantity
			},
			{
				onSuccess: ({ cart: newCart }) => {
					setCart(newCart)
					storeCart(newCart.id)
					if (callbacks?.onSuccess) {
						callbacks?.onSuccess()
					}
				},
				onError: (error) => {
					// eslint-disable-next-line no-console
					console.error(error)
					if (callbacks?.onError) {
						callbacks?.onError()
					}
				}
			}
		)
	}

	const updateShippingAddress = async (address: StorePostCartsCartReq['shipping_address'], callbacks?: Partial<MutationCallbacks>) => {
		await updateCart.mutateAsync(
			{
				shipping_address: address
			},
			{
				onSuccess: ({ cart: newCart }) => {
					setCart(newCart)
					storeCart(newCart.id)
					if (callbacks?.onSuccess) {
						callbacks?.onSuccess()
					}
				},
				onError: (error) => {
					// eslint-disable-next-line no-console
					console.error(error)
					if (callbacks?.onError) {
						callbacks?.onError()
					}
				}
			}
		)
	}

	const updateBillingAddress = async (address: StorePostCartsCartReq['billing_address'], callbacks?: Partial<MutationCallbacks>) => {
		await updateCart.mutateAsync(
			{
				billing_address: address
			},
			{
				onSuccess: ({ cart: newCart }) => {
					setCart(newCart)
					storeCart(newCart.id)
					if (callbacks?.onSuccess) {
						callbacks?.onSuccess()
					}
				},
				onError: (error) => {
					// eslint-disable-next-line no-console
					console.error(error)
					if (callbacks?.onError) {
						callbacks?.onError()
					}
				}
			}
		)
	}

	const initPayment = (callbacks?: Partial<MutationCallbacks>) => {
		const cartId = getCart()

		if (!cartId) {
			return
		}

		medusa.carts
			.createPaymentSessions(cartId)
			.then(({ cart: newCart }) => {
				setCart(newCart)
				storeCart(newCart.id)

				const isStripeAvailable = newCart.payment_sessions?.some((session) => session.provider_id === 'stripe')
				if (!isStripeAvailable) {
					return
				}

				medusa.carts
					.setPaymentSession(newCart.id, {
						provider_id: 'stripe'
					})
					.then(({ cart: paymentCart }) => {
						setCart(paymentCart)
						storeCart(paymentCart.id)
						if (callbacks?.onSuccess) {
							callbacks?.onSuccess()
						}
					})
					.catch((error) => {
						// eslint-disable-next-line no-console
						console.error(error)
						if (callbacks?.onError) {
							callbacks?.onError()
						}
					})
			})
			.catch((error) => {
				// eslint-disable-next-line no-console
				console.error(error)
				if (callbacks?.onError) {
					callbacks?.onError()
				}
			})
	}

	const updateCheckoutEmail = async (email: string, callbacks?: Partial<MutationCallbacks>) => {
		await updateCart.mutateAsync(
			{
				email
			},
			{
				onSuccess: ({ cart: newCart }) => {
					setCart(newCart)
					storeCart(newCart.id)
					if (callbacks?.onSuccess) {
						callbacks?.onSuccess()
					}
				},
				onError: (error) => {
					// eslint-disable-next-line no-console
					console.error(error)
					if (callbacks?.onError) {
						callbacks?.onError()
					}
				}
			}
		)
	}

	const completePayment = (callbacks?: Partial<MutationCallbacks>) => {
		const cartId = getCart()

		if (!cartId) {
			return
		}

		medusa.carts
			.complete(cartId)
			.then(() => {
				resetCart(callbacks)
			})
			.catch((error) => {
				// eslint-disable-next-line no-console
				console.error(error)
				if (callbacks?.onError) {
					callbacks?.onError()
				}
			})
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
				shippingOptions: shippingOptions || [],
				updateCheckoutEmail,
				initPayment,
				completePayment,
				cart
			}}
		>
			{children}
		</StoreContext.Provider>
	)
}
