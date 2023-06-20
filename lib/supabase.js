import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.SUPABASE_PROJECT,
  process.env.SUPABASE_KEY
)