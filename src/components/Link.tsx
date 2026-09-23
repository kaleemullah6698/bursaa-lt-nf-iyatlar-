import React from 'react';
import { navigate } from '../utils/router';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  className?: string;
  children: React.ReactNode;
  replace?: boolean;
}

export const Link: React.FC<LinkProps> = ({
  to,
  className = '',
  children,
  onClick,
  replace = false,
  ...rest
}) => {
  const href = to.startsWith('/') ? to : `/${to}`;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }

    // Allow native behavior for modifier keys (Cmd+Click, Ctrl+Click, Shift+Click, Alt+Click) or right click
    if (
      !e.defaultPrevented &&
      e.button === 0 &&
      !e.metaKey &&
      !e.ctrlKey &&
      !e.shiftKey &&
      !e.altKey &&
      rest.target !== '_blank'
    ) {
      e.preventDefault();
      navigate(href, { replace, smoothScroll: true });
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
};
