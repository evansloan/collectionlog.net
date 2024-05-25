'use server';

import { revalidateTag } from 'next/cache';

export const revalidate = async (tag: string) => {
  revalidateTag(tag);
};
