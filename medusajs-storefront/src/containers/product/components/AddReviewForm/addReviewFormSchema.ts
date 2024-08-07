import z from 'zod'

export const addReviewFormSchema = z.object({
	title: z.string().min(1).max(255),
	content: z.string().min(1).max(1000)
})

export type AddReviewFormFields = z.infer<typeof addReviewFormSchema>
