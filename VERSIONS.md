# Portfolio Feature & Animation Versions

This document tracks animation states and version history across components. If you request a revert to a specific version, we will restore the exact configuration documented below.

---

## 📚 Section 1: Bookshelf Hero

### **Version 1: Book Already on Screen (Initial)**
- **Behavior**: The portfolio book starts in the center of the viewport and performs an entrance scale/tilt towards the user, with the empty shelf slot visible behind it.
- **Initial State**: Book centered in viewport at `z: 0`, scales to `1.25`.
- **Git Commit Reference**: `14fadde` / `bd390f6`

### **Version 2: Book Comes Out of Shelf (Physical Pull-Out Animation)**
- **Behavior**: 
  - **Start**: The portfolio book physically rests *inside* the middle shelf slot alongside other books (matching shelf scale ~`scale: 0.52`, upright orientation, nestled between the adjacent books).
  - **Movement**: The book slides forward out of its shelf slot, tips slightly forward, tumbles smoothly downward toward the foreground center, and expands to full prominent hero size (`scale: 1.25`).
  - **Camera/Shelf Depth**: As the book dislodges from the shelf and approaches the foreground, the shelf background softens with depth-of-field blur (`filter: blur(5px)`) and the "Click to Open" prompt appears.
- **Reversion**: Can be reverted back to **Version 1** at any time by requesting: *"revert bookshelf to version 1"*.

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
- **Version 6**: 45° organic diagonal stone trail with activity milestones ending at the floating "More to come..." cloud.

## 📦 Section 7: 3D Tech Stack Box
- **Version 1**: Three.js 3D box with tech cubes and continuous scroll-driven camera orbit from front-angle to top-down view.
