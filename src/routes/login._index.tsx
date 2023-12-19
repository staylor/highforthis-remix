import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime';

import Form from '@/components/Login/Form';
import * as auth from '@/auth.server';

export const action: ActionFunction = async ({ request, context }) => {
  return await auth.authenticator.authenticate('user-pass', request, {
    successRedirect: '/admin',
    failureRedirect: '/login/unauthorized',
    context,
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  return await auth.authenticator.isAuthenticated(request, {
    successRedirect: '/admin',
  });
};

export default function Login() {
  return <Form />;
}
