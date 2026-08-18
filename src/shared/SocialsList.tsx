import { SocialType } from "@/shared/SocialsShare";
import React, { FC } from "react";

export interface SocialsListProps {
  className?: string;
  itemClass?: string;
  socials?: SocialType[];
  showLabels?: boolean;
}

const socialsDemo: SocialType[] = [
  { name: "Instagram", icon: "lab la-instagram", href: "https://www.instagram.com/lisbonmates?igsh=cXA1Y3lxd241bTh0" },
];

const SocialsList: FC<SocialsListProps> = ({
  className = "",
  itemClass = "block",
  socials = socialsDemo,
  showLabels = false,
}) => {
  return (
    <nav
      className={`nc-SocialsList flex space-x-2.5 text-2xl text-neutral-6000 dark:text-neutral-300 ${className}`}
      data-nc-id="SocialsList"
    >
      {socials.map((item, i) => (
        <a
          key={i}
          className={`${itemClass} ${showLabels ? "inline-flex items-center" : ""}`}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          title={item.name}
        >
          <i className={item.icon}></i>
          {showLabels && item.name === "Instagram" && (
            <span className="ml-1 text-sm">lisbonmates</span>
          )}
        </a>
      ))}
    </nav>
  );
};

export default SocialsList;
