import { useMutation } from '@tanstack/react-query'

import { medusa } from '@/utils/medusaHelpers'

const useCheckEmailExists = () => {
	return useMutation({
		mutationFn: async (email: string) => {
			const res = await medusa.auth.exists(email)
			return res.exists
		}
	})
}

export default useCheckEmailExists
