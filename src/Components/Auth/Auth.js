//Data for retreaving a Token from spotify
const clientId = "pTAHIBwNsC5VuQLaIs10lg"; // your clientId
const clientSecret = "JS7cF7Ve730_YhlWNsO-aObZKFqS8w";
export const redirectUrl = "https://zer0-2.netlify.app"; // your redirect URL - must be localhost URL and/or HTTPS

const authorizationEndpoint = "https://www.reddit.com/api/v1/authorize";
const tokenEndpoint = "https://www.reddit.com/api/v1/access_token";
const scope =
  "creddits modnote modcontributors modmail modconfig subscribe structuredstyles vote wikiedit mysubreddits submit modlog modposts modflair save modothers read privatemessages report identity livemanage account modtraffic wikiread edit modwiki modself history flair";

// Data structure that manages the current active token, caching it in localStorage
const currentToken = {
  get access_token() {
    return localStorage.getItem("access_token");
  },
  get refresh_token() {
    return localStorage.getItem("refresh_token");
  },
  get expires_in() {
    return localStorage.getItem("refresh_in");
  },
  get expires() {
    return localStorage.getItem("expires");
  },

  save: function (response) {
    const { access_token, refresh_token, expires_in } = response;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    localStorage.setItem("expires_in", expires_in);

    const now = new Date();
    const expireTime = now.getTime() + expires_in * 1000;
    localStorage.setItem("expireTime", expireTime);
    const expiry = new Date(now.getTime() + expires_in * 1000);
    localStorage.setItem("expires", expiry);
  },
};

// On page load, try to fetch auth code from current browser search URL
const args = new URLSearchParams(window.location.search);
const code = args.get("code");
const basicAuth = window.btoa(`${clientId}:${clientSecret}`);
//console.log(basicAuth);

// If we find a code, we're in a callback, do a token exchange
if (code) {
  const token = await getToken(code);
  currentToken.save(token);

  // Remove code from URL so we can refresh correctly.
  const url = new URL(window.location.href);
  url.searchParams.delete("code");
  url.searchParams.delete("state");

  const updatedUrl = url.search ? url.href : url.href.replace("#_", "");
  window.history.replaceState({}, document.title, updatedUrl);
}

// Otherwise we're not logged in, so render the login template
if (!currentToken.access_token) {
}
//console.log(code);
export default async function redirectToRedditAuthorize() {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const randomValues = crypto.getRandomValues(new Uint8Array(64));
  const randomString = randomValues.reduce(
    (acc, x) => acc + possible[x % possible.length],
    ""
  );
  //   console.log(currentToken.expires_in);
  const code_verifier = randomString;
  const data = new TextEncoder().encode(code_verifier);
  const hashed = await crypto.subtle.digest("SHA-256", data);

  const code_challenge_base64 = btoa(
    String.fromCharCode(...new Uint8Array(hashed))
  )
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  window.localStorage.setItem("code_verifier", code_verifier);

  const authUrl = new URL(authorizationEndpoint);
  const params = {
    response_type: "code",
    state: code_challenge_base64,
    redirect_uri: redirectUrl,
    duration: "permanent",
    client_id: clientId,
    scope: scope,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString(); // Redirect the user to the authorization server for login
}

// Soptify API Calls
export async function getToken(code) {
  const response = await fetch(tokenEndpoint, {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUrl,
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${basicAuth}`,
    },
  });
  return response.json();
}

export async function handleLoginWithRedditClick() {
  await redirectToRedditAuthorize();
}

const now = new Date();
export const currentTime = now.getTime();
export const expireTime = Number(localStorage.getItem("expireTime"));
console.log(expireTime > currentTime);

export { code, currentToken, basicAuth };
