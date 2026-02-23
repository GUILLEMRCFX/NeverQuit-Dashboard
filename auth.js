// auth.js — NeverQuit Dashboard · Supabase Authentication
// Only the public anon key is used here — safe to expose on the frontend.

const SUPABASE_URL      = 'https://dbmyqkpgbtslqgmccufe.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Q7de43M8xHE4FkWtx9oLPQ_1Y2dcpmL';

// Supabase client — `supabase` global is injected by the CDN script.
const nqSupabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Handle email confirmation / magic-link callback.
 *
 * Supabase v2 uses PKCE by default:
 *   After the user clicks the confirmation link they are redirected to the app
 *   with ?code=XXXX in the URL.  We must exchange that code for a real session.
 *
 * Falls back to implicit-flow (?access_token / #access_token) if present.
 *
 * @returns {{ session: object|null, error: object|null, handled: boolean }}
 */
async function handleEmailConfirmation() {
    // ── PKCE flow ──────────────────────────────────────────────────────────
    const params = new URLSearchParams(window.location.search);
    const code   = params.get('code');

    if (code) {
        const { data, error } = await nqSupabase.auth.exchangeCodeForSession(code);
        // Remove the code from the URL so a page-refresh doesn't re-try
        window.history.replaceState({}, document.title, window.location.pathname);
        return { session: data?.session ?? null, error, handled: true };
    }

    // ── Implicit / hash flow (older Supabase setups) ────────────────────────
    // supabase-js v2 automatically picks up #access_token from the hash
    // when getSession() is called, so we just let checkSession() handle it.

    return { session: null, error: null, handled: false };
}

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
