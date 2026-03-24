"use client";

import { trackClick } from "@/app/actions/track";
import { AnchorHTMLAttributes } from "react";

interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  profileId: string;
}

export default function TrackedLink({
  profileId,
  children,
  onClick,
  ...props
}: TrackedLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackClick(profileId).catch(console.error);

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <a onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
