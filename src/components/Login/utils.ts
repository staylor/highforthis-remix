import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';

import { authCookie, authCookieName } from '@/cookies';
import { post } from '@/utils/action';

export const action: ActionFunction = async ({ request, context }) => {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await authCookie.parse(cookieHeader)) || {};
  const formData = await request.formData();

  const email = formData.get('email');
  const password = formData.get('password');

  if (!(email && password)) {
    return redirect('/login/required');
  }

  const authUrl = `${context.graphqlHost}/auth`;

  try {
    await post(authUrl, {
      email,
      password,
    }).then((responseData) => {
      cookie[authCookieName] = responseData.token;
    });
  } catch (e) {
    throw e;
  }

  return redirect('/admin', {
    headers: {
      'Set-Cookie': await authCookie.serialize(cookie),
    },
  });
};
