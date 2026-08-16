import Link from "next/link";
import { siteConfig } from "@/packages/configs/data.config";
import { buildWhatsAppUrl } from "@/packages/utils/whatsapp";

const WhatsAppFab = () => {
  const { planner, whatsapp } = siteConfig;

  return (
    <Link
      href={buildWhatsAppUrl(planner.phoneIntl, whatsapp.defaultMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-55 flex h-14 w-14 items-center justify-center rounded-full bg-[#20BD5A] text-white shadow-[0_14px_30px_-10px_rgba(0,0,0,0.4)] transition-transform duration-200 ease-[cubic-bezier(.16,1,.3,1)] hover:scale-[1.08]"
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-label="Chat on WhatsApp"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 004.74 1.21h.005c5.46 0 9.9-4.45 9.9-9.91C21.93 6.45 17.5 2 12.04 2zm5.78 14.06c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.13.11-1.82-.11-.42-.13-.96-.31-1.66-.6-2.92-1.26-4.83-4.2-4.98-4.4-.14-.19-1.19-1.58-1.19-3.02 0-1.43.75-2.14 1.02-2.43.26-.29.58-.36.77-.36h.55c.18 0 .42-.02.65.5.24.55.83 1.98.9 2.13.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.16-.29.36-.42.48-.14.14-.28.29-.12.57.16.29.71 1.18 1.53 1.9 1.05.94 1.94 1.24 2.22 1.38.28.14.45.12.62-.07.18-.19.74-.86.94-1.16.19-.29.38-.24.64-.14.26.09 1.65.78 1.94.92.28.14.47.21.53.33.07.12.07.68-.17 1.36z" />
      </svg>
    </Link>
  );
};

export default WhatsAppFab;
