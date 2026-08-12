import React, { useState, Fragment, useEffect, useRef } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale, SUPPORTED } from "@/i18n";
import { useI18n } from "@/i18n/I18nProvider";

export interface MenuBarProps {
  className?: string;
  iconClassName?: string;
}
const MenuBar: React.FC<MenuBarProps> = ({
  className = "p-2.5 rounded-lg text-neutral-700 dark:text-neutral-300",
  iconClassName = "h-8 w-8",
}) => {
  const [isVisable, setIsVisable] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const pathname = usePathname();
  const { setLocale, t } = useI18n();

  useEffect(() => {
    setIsVisable(false);
  }, [pathname]);

  const handleOpenMenu = () => setIsVisable(true);
  const handleCloseMenu = () => setIsVisable(false);

  useEffect(() => {
    function onDocumentClick(e: MouseEvent) {
      if (!panelRef.current) return;
      const target = e.target as Node;
      if (!panelRef.current.contains(target)) {
        setIsVisable(false);
      }
    }
    if (isVisable) document.addEventListener("click", onDocumentClick);
    return () => document.removeEventListener("click", onDocumentClick);
  }, [isVisable]);

  const renderContent = () => {
    if (!isVisable) return null;
    return (
      <div
        ref={panelRef}
        className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg z-50"
      >
        <nav className="p-3">
          <ul className="space-y-2">
            <li>
              <Link href="/#hero" className="block px-3 py-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700">{t("common.home")}</Link>
            </li>
            <li>
              <Link href="/#tours" className="block px-3 py-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700">{t("common.tours")}</Link>
            </li>
            <li>
              <Link href="/#contact" className="block px-3 py-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700">{t("common.contact")}</Link>
            </li>
            <li className="pt-2 border-t border-neutral-100 dark:border-neutral-700">
              <div className="px-3 py-2">
                <div className="text-xs font-semibold mb-2">{t("common.language")}</div>
                <div className="flex flex-wrap gap-2">
                  {SUPPORTED.map((code) => (
                    <button
                      key={code}
                      onClick={() => setLocale(code as Locale)}
                      className="px-2 py-1 text-sm rounded bg-neutral-100 dark:bg-neutral-700 hover:opacity-90"
                    >
                      {code.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    );
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleOpenMenu();
          }}
          className={`focus:outline-none flex items-center justify-center ${className}`}
          aria-expanded={isVisable}
          aria-label={t("common.openMenu")}
        >
          <Bars3Icon className={iconClassName} />
        </button>

        {renderContent()}
      </div>
    </>
  );
};

export default MenuBar;
