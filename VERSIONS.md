# Portfolio Feature & Animation Versions

This document tracks animation states and version history across components. If you request a revert to a specific version, we will restore the exact configuration documented below.

---

## 📚 Section 1: Bookshelf Hero

### **Version 1: Book Already on Screen (Initial)**
- **Behavior**: The portfolio book starts in the center of the viewport and performs an entrance scale/tilt towards the user, with the empty shelf slot visible behind it.
- **Initial State**: Book centered in viewport at `z: 0`, scales to `1.25`.
- **Git Commit Reference**: `14fadde` / `bd390f6`

### **Version 2: Book Comes Out of Shelf (Face-Forward Pull)**
- **Behavior**: The portfolio book starts in the middle shelf slot facing forward at reduced scale, then slides forward and enlarges.
- **Git Commit Reference**: `0d6ee29`

### **Version 3: Physical Shelf Row Integration (Spine-Outward → Slides Out → Rotates to Front Face)**
- **Behavior**:
  - **Initial State**: The portfolio book is realistically kept in the shelf row alongside other books, with its **spine facing outward** just like all the other books on the shelf (burgundy leather with gold embossed vertical spine text: *"KRITIKA PANWAR • PORTFOLIO"*). There is no pre-empty gap; it sits naturally in the row between other books.
  - **Movement**:
    1. The book pulls forward out of the shelf row.
    2. As it moves toward the viewer, it rotates 90° from its side/spine profile to reveal its beautiful front cover.
    3. It drops and centers into the foreground, leaving a gap on the shelf behind it.
    4. The background shelf softens with depth-of-field blur.
    5. The "Click the book to open" badge appears.
  - **Click to Open**: User clicks the front cover → book swings open with dual pages → scrapbook elements emerge.

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
