"use client";
import React, { useEffect, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
const WhatsAppFloat: React.FC<{ phone?: string; message?: string }> = ({ phone = "351928386233", message = "Hello! I have a question about tours" }) => {
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  const localizedMessage = message === "Hello! I have a question about tours" ? t("common.whatsAppMessage") : message;
  const href = `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(localizedMessage)}`;
  return (
    <div className="fixed bottom-24 lg:bottom-6 right-6 z-50">
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={t("common.whatsAppLabel")} className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 shadow-lg text-white hover:opacity-95 transition-opacity">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7 text-white">
          <path d="M21 11.5a8.5 8.5 0 10-2.3 5.6L21 21l-3.9-1.02A8.5 8.5 0 0021 11.5z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17.6 14.3c-.3-.15-1.7-.85-1.95-.95-.25-.1-.43-.15-.6.15-.15.3-.6.95-.75 1.15-.15.2-.3.225-.6.075-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.16-.3.02-.46.13-.6.12-.12.3-.32.45-.48.15-.15.2-.25.3-.4.1-.15.05-.3-.025-.45-.08-.15-.6-1.45-.82-2-.22-.53-.45-.46-.6-.47l-.5-.01c-.15 0-.4.05-.61.3-.2.25-.78.76-.78 1.85 0 1.1.8 2.16.9 2.31.1.15 1.55 2.45 3.76 3.44 2.2.98 2.2.65 2.6.61.4-.05 1.3-.52 1.49-1.02.2-.5.2-.93.15-1.02-.05-.09-.2-.15-.45-.3z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
};
export default WhatsAppFloat;
