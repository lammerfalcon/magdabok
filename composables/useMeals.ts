import type { Meal } from '~/types/meal'

export function useMeals() {
  const supabase = useSupabaseClient()
  const meals = useState('meals')
  const grouppedMeals = useState('grouppedMeals')
  async function fetchMeals() {
    const response = await supabase.from('patient_meals_grouped').select('*')
    const { data } = await supabase.from('patient_meals').select('*').order('created_at', { ascending: false })
    meals.value = data as Meal[]
    grouppedMeals.value = response.data
  }
  return {
    fetchMeals,
    meals,
  }
}
