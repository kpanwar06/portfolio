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

### **Version 10: 1-Second Delayed Shelf Appearance + Flush Ledge Baseline Alignment (Current)**
- **1-Second Delayed Appearance on Shelf**:
  - When the page loads/reloads, the bookshelf is displayed cleanly.
  - After **exactly 1 second**, the portfolio book fades in smoothly directly **inside its shelf position** between `API Design` and `Spring Boot`.
  - It never renders in the foreground or outside the shelf; its first appearance is already nestled inside the shelf with its golden glow.
- **Flush Bottom Shelf Ledge Alignment**:
  - Calibrated vertical baseline lifted by 12px to account for spine ribbing and 3D box bevels.
  - The bottom of `KRITIKA PANWAR • PORTFOLIO` rests **completely flush on top of the wooden shelf ledge**, matching the exact bottom baseline of `Spring Boot` and `API Design`.
- **Steady Golden Glow (No Pulsing)**:
  - Clean, elegant, steady golden outline shimmer (`#d8a47f`).
- **Interactive Mouse Touch**:
  - Touching/hovering or clicking the glowing spine pulls it forward out of the shelf row, rotates 90° to reveal the front cover, and settles into the center foreground at a comfortable distance.
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
