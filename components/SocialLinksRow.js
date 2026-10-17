// WHAT THIS FILE DOES: A row of social media icon links — only the ones
// turned on in the admin "Contact & Social" page appear, each with its
// real link and matching logo. Used in the footer and the Contact page's
// info box, so both always show the exact same set, driven from the same
// settings (edit them once, in the admin panel, not in two places).

import { SOCIAL_PLATFORMS } from "@/lib/socialPlatforms";

export default function SocialLinksRow({ socialLinks, className = "" }) {
  const activePlatforms = SOCIAL_PLATFORMS.filter(
    (platform) => socialLinks?.[platform.key]?.enabled && socialLinks?.[platform.key]?.url
  );

  if (activePlatforms.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {activePlatforms.map((platform) => {
        const Icon = platform.icon;
        return (
          <a
            key={platform.key}
            href={socialLinks[platform.key].url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={platform.label}
            title={platform.label}
            className="flex h-10 w-10 items-center justify-center rounded-[10px] text-muted ring-1 ring-inset ring-white/10 transition-colors hover:text-accent hover:ring-accent/60"
          >
            <Icon size={18} />
          </a>
        );
      })}
    </div>
  );
}
