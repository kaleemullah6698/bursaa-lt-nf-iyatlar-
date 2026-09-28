import React from 'react';
import { navigate } from '../utils/router';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  className?: string;
  children: React.ReactNode;
  replace?: boolean;
}

// Prefetch route component chunks on hover/focus intent
const ROUTE_PREFETCH_MAP: Record<string, () => Promise<unknown>> = {
  '/grafik': () => import('../pages/ChartTerminalPage'),
  '/altin-turleri': () => import('../pages/GoldTypesPage'),
  '/portfoy': () => import('../pages/PortfolioPage'),
  '/hesaplama': () => import('../pages/CalculatorPage'),
  '/bursada-altin': () => import('../pages/BursadaAltinPage'),
  '/kuyumcular': () => import('../pages/JewelersPage'),
  '/sss': () => import('../pages/FaqPage'),
};

const prefetchedRoutes = new Set<string>();

const prefetchRoute = (path: string) => {
  if (prefetchedRoutes.has(path)) return;
  const loader = ROUTE_PREFETCH_MAP[path];
  if (loader) {
    prefetchedRoutes.add(path);
    loader().catch(() => {});
  }
};

export const Link: React.FC<LinkProps> = ({
  to,
  className = '',
  children,
  onClick,
  onMouseEnter,
  onTouchStart,
  onFocus,
  replace = false,
  ...rest
}) => {
  const href = to.startsWith('/') ? to : `/${to}`;

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    prefetchRoute(href);
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLAnchorElement>) => {
    prefetchRoute(href);
    if (onTouchStart) onTouchStart(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLAnchorElement>) => {
    prefetchRoute(href);
    if (onFocus) onFocus(e);
  };

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
    <a
      href={href}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleTouchStart}
      onFocus={handleFocus}
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
};
