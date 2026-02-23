// auth.js — NeverQuit Dashboard · Supabase Authentication
// Only the public anon key is used here — safe to expose on the frontend.

const SUPABASE_URL      = 'https://dbmyqkpgbtslqgmccufe.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Q7de43M8xHE4FkWtx9oLPQ_1Y2dcpmL';

// Supabase client — `supabase` global is injected by the CDN script.
const nqSupabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Register a new user with email + password.
 * Supabase automatically creates a matching `profiles` row via the DB trigger.
 * @param {string} email
 * @param {string} password
 * @returns {{ user: object|null, error: object|null }}
 */
async function register(email, password) {
    const { data, error } = await nqSupabase.auth.signUp({ email, password });
    return { user: data?.user ?? null, error };
}

/**
 * Log in with email + password.
 * @param {string} email
 * @param {string} password
 * @returns {{ session: object|null, error: object|null }}
 */
async function login(email, password) {
    const { data, error } = await nqSupabase.auth.signInWithPassword({ email, password });
    return { session: data?.session ?? null, error };
}

/**
 * Log out the current user and invalidate the server-side session.
 * @returns {{ error: object|null }}
 */
async function logout() {
    const { error } = await nqSupabase.auth.signOut();
    return { error };
}

/**
 * Return the currently active Supabase session, or null if not logged in.
 * @returns {{ session: object|null, error: object|null }}
 */
async function checkSession() {
    const { data, error } = await nqSupabase.auth.getSession();
    return { session: data?.session ?? null, error };
}

/**
 * Fetch the user's profile row from `profiles` and check beta_access.
 * @param {string} userId  UUID from auth.users.id
 * @returns {{ profile: object|null, error: object|null }}
 */
async function checkBetaAccess(userId) {
    const { data, error } = await nqSupabase
        .from('profiles')
        .select('id, email, role, plan, beta_access')
        .eq('id', userId)
        .single();
    return { profile: data ?? null, error };
}
