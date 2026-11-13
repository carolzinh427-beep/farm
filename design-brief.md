# BemViva Farmácia website design brief

## Design read
A Brazilian neighborhood pharmacy for people managing everyday care, with calm guidance, legible product discovery and a clear distinction between information and verified availability. The image-generation tool was unavailable on the current plan, and the user chose to continue without it, so labeled photo slots remain until approved photography is supplied.

## Concept spine
A care route with clear waypoints: find what fits the routine, understand what needs a pharmacist, then contact the team. The route structure appears in the category paths, editorial guidance and service navigation without implying a clinical result.

## Delivery tier
Editorial, with a quiet reading pace and brief interface transitions. The user asked for no scroll animation and light movement.

## Animation mode
No scroll-triggered animation. A single gentle headline entrance and brief hover transitions are allowed; all movement respects reduced-motion settings.

## Locked palette
Primary green #1B7B58, deep green #164C3A, soft green #EAF4EF, white #FFFFFF, cool mist #F5F8F6, slate text #42534B, restrained logo red #D9423D. Green owns controls and structure; red appears only as a small accent inherited from the provided logo. No beige or brass family.

## Locked type
Readable system sans stack for display and body, with no custom font download. No serif. The stack includes Outfit when available and falls back to the operating system sans serif.

## Theme and background
Pristine Light with solid white and soft green surfaces. Photographs provide the depth; no glass, loud gradients or heavy shadows.

## Hero architecture
Asymmetric composition with a wide photo slot beside a clear text zone and the exact provided logo. The hero avoids a left-copy/right-image template. Its slot is labeled as awaiting approved BemViva photography.

## Signature technique
D3 Kinetic type opener. Reveal the two headline lines with a short upward mask on first paint, then remain still. The static composition is complete in SSR and the reveal is disabled for reduced motion.

## Section system
Alternating editorial blocks with distinct families: (1) image-first hero, (2) category route list, (3) asymmetric product showcase, (4) editorial routine feature, (5) full-image about block with one narrow side note, (6) deep-green contact close. No family repeats consecutively.

## Combinatorial picks
Theme paradigm: Pristine Light. Background character: solid with soft ambient depth. Typography character: clean grotesk. Hero architecture: massive image-first with restrained text. Dominant section system: alternating editorial blocks.

## Signature components
Layered image crop frames, product UI panel stack, off-grid editorial, vertical rhythm lines. Use them sparingly and keep a single 12px soft-corner scale.

## Second-read moment
One narrow vertical side-rail note beside the about content, used once to identify the catalog as demonstrative.

## Narrative and content
Six homepage reference sections: hero; category routes; autocare product examples; Cuidado que faz parte da rotina; Sobre a BemViva; atendimento close. Copy is Brazilian Portuguese, natural and direct. The supplied title and support text are preserved. Visible copy avoids em dashes, decorative punctuation, unsupported clinical claims and fake social proof.

## CTA inventory
Hero: Explorar produtos, solid green control; Falar com a equipe, framed secondary link. Category routes: underlined arrow links. Product examples: compact add-to-cart controls. Editorial: inline text link. About: image-edge text link. Contact close: broad green field with one clear action. Cart and checkout use explicit demonstration labels.

## Product, services and legal content
Personal care examples only, each marked demonstrative with illustrative prices and availability. Prescription-only and restricted items have no direct purchase action. No dosage, indications or invented leaflet facts. Store address, hours, phone, WhatsApp, legal identity and responsible professional remain unset until BemViva supplies verified details. Contact forms and checkout are demonstrations only. No payment, order transmission, recipe upload or health-document storage.

## Experience and accessibility
Start at 320px, no horizontal overflow. Mobile uses a compact header, accessible search, filter sheet and bottom navigation. Visible focus, keyboard operation, labeled fields, contrast, text alternatives and reduced-motion states are required. Search, filters, cart, demo checkout, contact form, cookie preferences and error/empty states are implemented.

## Routes and metadata
Home, products, product detail, services, contact, about, delivery and pickup, returns, privacy, cookies and terms. Each route gets a meaningful title and description. No local-business schema, phone, address, hours, ratings or stock data until verified.

## Asset plan
Use the provided logo unchanged. Image generation was unavailable on the current plan and the user asked to proceed without it. Keep explicit photo slots for approved hero, storefront, editorial and product images. The social covers are simple authored brand graphics, not photos. Replace the slots when BemViva supplies approved photography.

## Build boundary
Standalone React 19 + TanStack Start website, server rendered. No Higgsfield sign-in, SDK, generation feature, third-party API key, real payment or unverified inventory. Demo cart state is clearly labeled and no customer data is persisted. Connect production catalog, store details, secure contact, checkout and payments only after verified business data and services are supplied.
