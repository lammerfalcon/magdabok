import type { Meal } from '~/types/meal'

export function useMeals() {
  const supabase = useSupabaseClient()
  const meals = useState('meals')
  async function fetchMeals() {
    const { data } = await supabase.from('patient_meals').select('*').order('created_at', { ascending: false })
    meals.value = data as Meal[]
  }
  return {
    fetchMeals,
    meals,
  }
}
