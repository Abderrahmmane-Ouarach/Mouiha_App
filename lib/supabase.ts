import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://pkajxvtwgqgzjfqnmlef.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrYWp4dnR3Z3FnempmcW5tbGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0NzU5MzAsImV4cCI6MjA3MDA1MTkzMH0.QSAqEKqNsTi15F7859iPG8Uf4P4saChrX5yFjuWEtmg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
