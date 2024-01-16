import { NextRequest, NextResponse } from 'next/server';

export const middleware = (request: NextRequest) => {
  return NextResponse.redirect(new URL('/recent-items', request.url));
};

export const config = {
  matcher: '/',
};
