import React, { FC } from "react";
import Logo from "@/shared/Logo";
import MenuBar from "@/shared/MenuBar";
import LangDropdown from "./LangDropdown";
import AvatarDropdown from "./AvatarDropdown";
import Link from "next/link";
import { Route } from "@/routers/types";
import { usePathname } from "next/navigation";
import { useI18n } from "@/i18n/I18nProvider";

export interface MainNav2Props {
  className?: string;
}

const MainNav2: FC<MainNav2Props> = ({ className = "" }) => {
  const pathname = usePathname();
  const { t } = useI18n();
  const scrollToTours = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;
    event.preventDefault();
    document.getElementById("tours")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className={`MainNav2 relative z-10 ${className}`}>
      <div className="px-4 h-20 lg:container flex justify-between items-center">
        <div className="hidden md:flex items-center space-x-6 flex-1">
          <Logo className="w-32 self-center" />
          <nav className="hidden lg:flex space-x-6 text-neutral-700 dark:text-neutral-100">
            <Link href="/#hero" className="hover:text-black">{t("common.home")}</Link>
            <a href="/#tours" onClick={scrollToTours} className="hover:text-black">{t("common.tours")}</a>
            {/* <Link href="/#testimonials" className="hover:text-black">Testimonials</Link> */}
            <a href="/contact" className="hover:text-black">{t("common.contact")}</a>
          </nav>
        </div>

        <div className="self-center md:hidden flex-[3] max-w-lg !mx-auto md:px-3">
          <Logo className="w-32 mx-auto" />
        </div>

        <div className="flex items-center md:hidden">
          {pathname !== "/" && <AvatarDropdown />}
          <MenuBar />
        </div>

        <div className="hidden md:flex flex-shrink-0 justify-end flex-1 lg:flex-none text-neutral-700 dark:text-neutral-100 items-center">
          <div className="hidden lg:flex items-center space-x-3">
            <LangDropdown />
            {pathname !== "/" && <AvatarDropdown />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav2;
