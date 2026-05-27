import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://wlvbplyydrhyqbdlgnry.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsdmJwbHl5ZHJoeXFiZGxnbnJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczNzg5NTgsImV4cCI6MjA5Mjk1NDk1OH0.tvnxtAlZfMZQiIFh6M_2Qk8NoOxqjXn1Uxa3wf5NBmo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
