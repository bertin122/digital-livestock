import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mkqrtxnrnultzrgcbjkr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rcXJ0eG5ybnVsdHpyZ2NiamtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNzQ2MzUsImV4cCI6MjA2OTY1MDYzNX0.pGiY7EUacB1-V4ZBrRj44QGsmbwaqfLiY16BPWlMink'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
