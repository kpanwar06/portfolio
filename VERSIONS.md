# Portfolio Feature & Animation Versions

This document tracks animation states and version history across components. If you request a revert to a specific version, we will restore the exact configuration documented below.

---

## 📚 Section 1: Bookshelf Hero

### **Version 1: Book Already on Screen (Initial)**
- **Behavior**: The portfolio book starts in the center of the viewport and performs an entrance scale/tilt towards the user, with the empty shelf slot visible behind it.
- **Git Commit Reference**: `14fadde` / `bd390f6`

### **Version 2: Book Comes Out of Shelf (Face-Forward Pull)**
- **Behavior**: The portfolio book starts in the middle shelf slot facing forward at reduced scale, then slides forward and enlarges.
- **Git Commit Reference**: `0d6ee29`

### **Version 3: Physical Shelf Row Integration (Spine-Outward → Rotates to Front)**
- **Behavior**: The book starts showing only its narrow spine in the shelf row, pulls forward, and rotates 90° to face the user.
- **Git Commit Reference**: `9aae53a`

### **Version 4: Front-Angle Display + 2s Pause**
- **Behavior**: Book displayed at front-angle, pauses for 2s, then glides forward.
- **Git Commit Reference**: `223dffb`

### **Version 5: Unified 3D Physical Book Object + Natural Distance**
- **Behavior**: Unified 3D box model with front cover visible on shelf.
- **Git Commit Reference**: `5f5635c`

### **Version 6: True Shelf-Docked Book**
- **Behavior**: Shelf-docked rotation test.
- **Git Commit Reference**: `0b8585e`

### **Version 7: Exact Shelf Docking**
- **Behavior**: Anchored beside API Design and Spring Boot.
- **Git Commit Reference**: `26129ad`

### **Version 8: Golden Glowing Spine + Touch/Hover Pull-Out**
- **Behavior**: Pulses with golden glow, touch to pull out.
- **Git Commit Reference**: `b9596d0`

### **Version 9: Zero-Flash Shelf Spawn + Steady Golden Glow**
- **Behavior**: Steady glow without pulse.
- **Git Commit Reference**: `79ea936`

### **Version 10: 1-Second Delayed Shelf Appearance + Flush Ledge Baseline Alignment**
- **1-Second Delayed Appearance on Shelf**: Faded in after 1s.
- **Git Commit Reference**: `3e68c06`

### **Version 11: Immediate All-Together Display + Glow Removed**
- **Immediate All-Together Display**: Removed delay timer, removed golden glow outline.
- **Git Commit Reference**: `df21ce1`

### **Version 12: Direct Shelf Integration & Zero Shadow Gap**
- **Unified Book and Shelf (One Single Part)**:
  - The portfolio book is embedded directly inside the shelf row slot (`shelfSlotRef`) between `API Design` and `Spring Boot`.
  - On page load / reload, the book is rendered directly in the HTML—no delays, no mounting wait, and no missing book on first paint.
- **Zero Empty Shadow Gap**:
  - The book spine matched slot width (`w-10 sm:w-12`, ~44px to 48px) and height (`h-40 sm:h-44`).
- **Git Commit Reference**: `342f09d`

### **Version 13: Clean PORTFOLIO Spine & Restored Original Foreground Book Proportions**
- **Clean Spine Typography**:
  - Only **`PORTFOLIO`** is written vertically on the spine.
- **Git Commit Reference**: `4da29a0`

### **Version 14: Proper Fit Shelf Spine & Expands on Pull-Out**
- **Part 1: Proper Fit Shelf Spine**:
  - Calibrated spine depth to slim 32px (`w-8 sm:w-9`, `width: 32px`, `left: -16px`) matching standard bookshelf book dimensions (`Algorithms` 32px, `Modern JS` 32px, `Django Master` 36px).
  - Eliminates fat spine and overlapping on `API Design` and `Spring Boot`.
  - Shelf slot set to `w-8 sm:w-9` with transparent dock state and vacant shadow box upon pull-out.
- **Part 2: Expands on Pull-Out**:
  - Pull-out animation slides forward and expands book to comfortable full foreground reading size (`scale: 0.95`, `w-[240px] sm:w-[260px] h-[330px] sm:h-[355px]`).
- **Git Commit Reference**: `c495474`

### **Version 15: Shifted Up for Flush Wooden Ledge Baseline**
- **Exact Ledge Alignment**:
  - Shifted book vertically up by 12px on the shelf.
- **Git Commit Reference**: `e3f6ada`

### **Version 16: Fine-Tuned Baseline Down 6px (Exact Shelf Match)**
- **Sub-Pixel Shelf Touch**:
  - Shifted down by 6px (`targetCenterY - contCenterY - 6`) from v15 so its bottom edge rests squarely on the shelf line in exact alignment with `Spring Boot` and `API Design`.
- **Git Commit Reference**: `d96e6b5`

### **Version 17: Unified Shelf Baseline, Gold Spine Ribs & Crisp Typography**
- **Unified Natural Shelf Baseline**:
  - Removed container bottom borders and padding gaps across all shelf tiers.
  - All background books now drop down and rest squarely on the wooden shelf plank (`bg-[#52383e]`), sharing the exact physical baseline with the portfolio book.
- **Matching Gold Spine Ribs on Every Book**:
  - Updated all shelf books from faint grey lines to the portfolio book's signature metallic gold ribs (`w-full h-1 bg-[#d8a47f]/75 border-t border-b border-black/40`) at top and bottom.
- **Crystal-Clear & Unified Typography**:
  - Removed blurry serif font and murky drop-shadow from the portfolio book's spine.
  - Standardized both the portfolio book and all shelf books to high-contrast, bold, crisp monospace uppercase lettering (`font-mono tracking-[0.22em] font-bold text-[#FFF8F0]`).
- **Git Commit Reference**: `063afb2`

### **Version 18: Shifted Up 14px (Aligned Directly to Shelf Base)**
- **Elevated to Shelf Base**:
  - Shifted the portfolio book vertically up by 14px (`targetCenterY - contCenterY - 14`) so its bottom edge rests directly on top of the shelf plank, flush with `Spring Boot` and `API Design`.
- **Git Commit Reference**: `4bd5cdf`

### **Version 19: Fine-Tuned Baseline (7px Down from v18)**
- **Precision Ledge Placement**:
  - Brought the portfolio book down 7px from v18 (`targetCenterY - contCenterY - 7`) for balanced resting position on the shelf base.
- **Git Commit Reference**: `22f69d1`

### **Version 20: Glitch-Free Instant Shelf Docking**
- **Zero Flash/Glitch on Page Reload**:
  - Default `opacity: 0` on `bookRef` prevents the book from momentarily appearing at viewport center during hydration before GSAP positions it.
  - Dimension readiness guard with `requestAnimationFrame` ensures accurate coordinate measurements.
  - Book reveals smoothly (`opacity: 1`) only when its position and rotation are fully locked into the shelf slot.
- **Git Commit Reference**: `35a6999`

### **Version 21: Instant Native Shelf Spine & Seamless 3D Hand-off**
- **True Zero-Delay Native Shelf Integration**:
  - Rendered the resting spine directly inside `shelfSlotRef` in the initial server HTML.
  - The book is rendered simultaneously with the bookshelf at millisecond 0—no hydration delay, no 1-second appearance lag, and no center flash.
  - On hover or touch, `triggerBookPullOut()` dynamically measures the slot, initializes the 3D book box at that exact coordinate, switches the slot to `VACANT`, and seamlessly animates forward into the foreground.
- **Git Commit Reference**: `baa02d6`

### **Version 22: Scroll-Locked Until Book is Opened**
- **Gated Page Scrolling**:
  - Scrolling down the page is completely locked while the book is closed (`on-shelf`, `pulling`, `in-foreground`, `opening`).
  - Scrolling is unlocked only once the book is opened (`bookState === "opened"`), allowing seamless navigation to the Identity screen and remaining sections.
  - Downward wheel gestures while locked smoothly progress the interaction (pull out book -> open book).
- **Git Commit Reference**: `d6b8bb2`

### **Version 23: Centered Balanced Opened Spread & Flat Alignment**
- **Spine Aligned to Screen Center**:
  - When the book straightens up to open, its left edge (spine) shifts to the exact horizontal center of the viewport (`x = bookHalfWidth`).
  - When the front cover swings open 180° to the left, the left and right pages are symmetrically centered and balanced across the screen (eliminating the left-heavy bias).
- **Flat Horizontal Level**:
  - Set `rotationX: 0`, `rotationY: 0`, `rotationZ: 0` and front cover `rotationY: -180` so both pages lie flat and level with zero crooked slant.
- **Git Commit Reference**: `9216c0d`

### **Version 24: Seamless Scrollbar Active from Section 2 & Zero-Shift Lock**
- **Zero-Flash Initial Load**:
  - Added `hero-active` class to `<html>` and `<body>` on server render (`layout.tsx`), keeping scrollbar track and thumb `transparent` from frame 0 so it never flickers or vanishes on reload.
- **Zero Layout Shifts**:
  - Eliminated toggling of `document.body.style.overflow = "hidden"` which previously altered viewport width by 8px and caused screen jumping.
  - Scroll locking while the book is closed is now managed entirely via Lenis controls and non-destructive event interception (`wheel`, `touchmove`, `keydown`).
- **Scrollbar Activated on Section 2**:
  - Section 1 (Bookshelf Hero) remains completely clean with an invisible scrollbar.
  - As the user explores past the bookshelf into Section 2 (Identity), the custom editorial pink scrollbar smoothly transitions into view on the cream background.
- **Git Commit Reference**: `54f5379`

### **Version 25: Silky Smooth Motion & Fluid Section Transition**
- **Continuous Pull-Out Velocity & Arc**:
  - Replaced the two-phase start-stop pull with a blended continuous velocity curve (`power1.inOut` forward into `power2.out` arc with `-0.25s` overlap).
  - Added hardware GPU compositing (`force3D: true`) and replaced CPU-heavy `filter: blur()` with GPU-accelerated opacity/scale for smooth 60/120fps motion.
- **Fluid Scroll Transition to Identity (Section 2)**:
  - Removed conflicting CSS `transition-all duration-300` from `IdentitySection`'s scrubbed background text (`PORTFOLIO`), eliminating thread contention and micro-stutters during scroll.
  - Tuned Lenis smooth scroll responsiveness (`duration: 1.1`, `wheelMultiplier: 1.15`, `touchMultiplier: 1.8`).
  - Added a graceful scroll exit parallax on the opened book as the user scrolls into Section 2.
- **Git Commit Reference**: `f9f0246`

### **Version 26: Calibrated Pull-Out Arc • Zero Collision & Physical Depth (Current)**
- **Full Shelf Row Clearance Before Center Arc**:
  - The book now glides straight forward 160px along the Z-axis, completely clearing adjacent books (`API Design` & `Spring Boot`) before beginning its turn toward the screen center.
  - Eliminates premature 3D rotation collisions inside the shelf slot that previously made the motion feel rough.
- **Calibrated Physical Depth & Zero Shadow Glitch**:
  - Calibrated the 3D book box depth to 56px (`translateZ(±28px)`), matching slot width at 0.5 scale so the spine never shrinks into a thin sliver upon touch.
  - Initialized with `boxShadow: "none"` while facing 90°, fading into a rich natural drop shadow as it turns toward the viewer, eliminating 2D shadow render artifacts on 3D elements.
  - Cleaned slot vacant state into a soft dark cavity without popping text.
- **Git Commit Reference**: Current

---

## ✍️ Section 2: Identity Screen
- **Version 1**: Large blurred `PORTFOLIO` backdrop with crisp foreground `KRITIKA` and parallax scroll.

## ✉️ Section 3: Memory Envelope
- **Version 1**: 3D angled envelope on the left with polaroid photos spilling to the right and lightbox zoom.

## 🖼️ Section 4: Framed Certifications
- **Version 1**: Gallery wall with physical framed certificates on left and large `CERTIFICATIONS` typography on right.

## 📜 Section 5: Workshops & Other Credentials
- **Version 1**: Pinned horizontal scroll track with vintage workshop pass cards.

## 🗺️ Section 6: Personal Journey Trail
- **Version 1**: 45° organic diagonal stone trail with activity milestones ending at the floating "More to come..." cloud.

## 📦 Section 7: 3D Tech Stack Box
- **Version 1**: Three.js 3D box with tech cubes and continuous scroll-driven camera orbit from front-angle to top-down view.
