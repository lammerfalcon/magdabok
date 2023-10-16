export interface Meal {
  id: number
  patient_id: number
  type: 'breakfast' | 'lunch' | 'dinner'
  image_url: string
  description: string
  created_at: string
  updated_at: string
}
