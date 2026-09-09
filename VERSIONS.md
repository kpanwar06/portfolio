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

### **Version 5: Unified 3D Physical Book Object + Natural Shelf Pull-Out + Comfortable Camera Distance (Current)**
- **Unified 3D Physical Object**:
  - The front cover, spine, pages/thickness edges, and back are constructed as **one cohesive physical 3D book object**.
  - No disconnected spine or detached rectangle pieces.
  - Visible thickness, gilded cream page edges, and natural beveling along the spine hinge.
- **Initial State (Belongs to Shelf)**:
  - The book rests naturally **inside the middle shelf row** alongside adjacent books.
  - Matches the scale, depth, and ledge alignment of surrounding books.
  - Seen at a subtle natural 3D angle showing front cover, page thickness, and spine edge.
  - Sits still for 1.8 seconds.
- **Pull-Out Motion**:
  - Slides forward out from its actual shelf position along the Z-axis.
  - Tumbles forward toward the viewer with organic physical deceleration.
- **Comfortable Foreground Distance**:
  - **Does NOT fill the screen**. Leaves generous breathing space on all sides (above, below, left, right).
  - The entire outline of the physical book and its shadow are comfortably in view.
- **Interactive Opening**:
  - On user click, the front cover swings open on its spine hinge (`rotateY: -165°`).
  - Dual pages spread and editorial scrapbook elements emerge.
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
