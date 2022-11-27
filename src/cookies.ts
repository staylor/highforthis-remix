import { createCookie } from '@remix-run/node';

export const authCookieName = 'draftAuthToken';

export const authCookie = createCookie(authCookieName, {
  maxAge: 604_800,
  path: '/',
});
