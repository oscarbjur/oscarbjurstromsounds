# Project rules

- Resolve new CDN asset pointers against the Lovable-hosted site origin when used in project data so images also work on the GitHub Pages deployment.
- Partner brands are shown with their own official files only, mapped in src/data/brandAssets.ts and rendered through src/components/ProjectArtwork.tsx; never redraw, recolour, stretch or crop a brand mark, and keep the original project images outside presentation-specific overrides.
- Selected Works uses a duplicated CSS reel track for seamless motion; pause on hover and keyboard focus, hide duplicate links from keyboard navigation, and only slow (never stop) it for reduced-motion visitors, since Windows often reports that setting by default.
- Services copy lives in src/data/services.ts and is opened through a shared drawer provider, so the nav item and the section cards always show the same services.
- Project videos render through src/components/ProjectVideo.tsx: YouTube links stay embeds, Oscar's own files stream from the CDN with URLs built by streamUrl() in src/lib/media.ts, so both play in the pop-up and on the standalone project page.