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

### **Version 6: True Shelf-Docked Book (Spine-Outward in Shelf Row → Slides Out → Rotates 90° to Front Cover → Settles at Comfortable Distance) (Current)**
- **True Shelf Integration**:
  - Initially, the portfolio book is **standing in the shelf row shoulder-to-shoulder with adjacent books, with its spine facing outward** (`rotationY: -90°`).
  - To the viewer, it looks like a natural, beautiful leather-bound book spine standing in the middle row (no pre-existing empty gap).
  - Matches the exact spine width, height, and ledge placement of surrounding books (`API Design` on left, `Spring Boot` on right).
- **Physical Pull-Out & Rotation**:
  - Pauses naturally for 1.8 seconds in the shelf row.
  - Slides straight forward out from between the books along the Z-axis.
  - Once clear of the shelf row, it **rotates 90°** from spine-view to front-cover view.
  - The shelf gap where the book used to sit is revealed behind it.
- **Comfortable Foreground Distance**:
  - Settles in the center foreground with generous breathing room on all sides (does NOT fill the screen).
  - User clicks → front cover swings open → portfolio elements emerge.
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
