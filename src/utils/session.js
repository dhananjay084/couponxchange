export const SESSION_USER_KEY = "couponxchange_user";
export const SESSION_TOKEN_KEY = "couponxchange_token";

export const getStoredUser = () => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const getStoredToken = () => {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(SESSION_TOKEN_KEY) || "";
};

export const setSession = ({ user, token }) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSION_USER_KEY, JSON.stringify(user));
  localStorage.setItem(SESSION_TOKEN_KEY, token);
};

export const clearSession = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_USER_KEY);
  localStorage.removeItem(SESSION_TOKEN_KEY);
};
