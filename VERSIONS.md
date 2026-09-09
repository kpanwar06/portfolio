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

### **Version 18: Shifted Up 14px (Aligned Directly to Shelf Base) (Current)**
- **Elevated to Shelf Base**:
  - Shifted the portfolio book vertically up by 14px (`targetCenterY - contCenterY - 14`) so its bottom edge rests directly on top of the shelf plank, flush with `Spring Boot` and `API Design`.
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
