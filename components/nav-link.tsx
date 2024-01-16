import { HTML } from 'mdast';
import React, { AnchorHTMLAttributes } from 'react';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import { cn } from '@/lib/utils';

interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: StaticImport;
}

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ icon, className, children, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        'flex items-center gap-1 p-2 text-lg text-white no-underline hover:bg-accent hover:text-rs-orange hover:transition-colors',
        className
      )}
      {...props}
    >
      <Image src={icon} height={20} width={20} alt='' />
      {children}
    </a>
  )
);
NavLink.displayName = 'NavLink';

export default NavLink;
