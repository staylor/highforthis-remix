import qs from 'qs';
import { parseObject } from 'query-types';
import { fetch } from '@remix-run/node';
import { redirect } from '@remix-run/node';

import mutate from './mutate';

export const post = async (url: string, data: any) =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.error) {
        throw new Error(responseData.error);
      }
      return responseData;
    });

export const handleSubmission = async ({
  context,
  request,
  mutation,
  variables,
  createMutation,
}: any) => {
  // FormData returns multi-dimensional keys as: foo[0][bar][baz]
  // - we would have to write our own parser, so:
  // text() returns the POST data as an x-www-form-urlencoded string
  const formData = await request.text();
  // qs parses the string into an object
  // parseObject corces the values into their proper types (numbers, booleans, etc)
  // GraphQL will throw an error if `Int`s are passed as strings.
  const input = parseObject(qs.parse(formData));

  const result: any = await mutate({ context, mutation, variables: { ...variables, input } });
  let editUrl = request.url;
  if (createMutation) {
    editUrl = request.url.replace('/add', `/${result[createMutation].id}`);
  }

  const url = new URL(editUrl);
  const searchParams = new URLSearchParams();
  searchParams.set('message', 'updated');
  url.search = searchParams.toString();

  return redirect(url.toString());
};
