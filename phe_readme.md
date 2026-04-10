# PHE — Periyasamy Hydraulic Equipments

Official website for **Periyasamy Hydraulic Equipments (PHE)**, a Tiruppur-based manufacturer of precision-engineered drilling rigs with 38+ years of industry expertise.

---

## Overview

This is a redesigned prototype website for PHE, showcasing their full rig fleet — from 1,200 ft water well rigs to deep mine reverse circulation rigs. The site is built as a **static multi-page HTML/CSS/JS site** with no backend dependencies.

**Key pages:**
- **Home** — Brand introduction, core value proposition
- **Product Catalog** (`pages/product_catalog.html`) — Full rig fleet with specs and depth ratings
- *(Additional pages as built)*

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | Semantic HTML5 |
| Styling | Vanilla CSS (design token system) |
| Interactivity | Vanilla JavaScript |
| Fonts | Google Fonts / Fontshare CDN |
| Icons | Lucide Icons (CDN) |
| Hosting | Static (GitHub Pages / Netlify ready) |

---

## Project Structure

```
phe_site/
├── index.html                  # Home page
├── pages/
│   ├── product_catalog.html    # Rig Fleet product listing
│   └── ...                     # Additional pages
├── assets/
│   ├── images/
│   └── icons/
└── README.md
```

---

## Product Line

The site covers PHE's full rig fleet:

| Category | Models |
|----------|--------|
| Water Well Rigs | 1200ft (PHEBOX), 1700ft (PHEBEST), 2000ft Big Master |
| Mines & RC Rigs | ARC Auto System, Reverse Circulation Rig |
| Support Equipment | Pole Drill Rig, Support Vehicle |

**Component Suppliers:** Ashok Leyland · Atlas Copco · Ingersoll Rand · Wipro Parker · Danfoss · Bucher Permco · AMW LG

---

## Getting Started

Clone the repo and open locally — no build step required.

```bash
git clone https://github.com/YOUR_USERNAME/phe-site.git
cd phe-site
# Open index.html in your browser
open index.html
```

Or serve locally with a simple HTTP server:

```bash
npx serve .
# or
python3 -m http.server 8080
```

---

## Deployment

This site is fully static and deploys to any CDN or static host:

**GitHub Pages:**
1. Push to `main` branch
2. Go to **Settings → Pages → Source: Deploy from branch → main / root**
3. Site live at `https://YOUR_USERNAME.github.io/phe-site/`

**Netlify:**  
Drag and drop the project folder at [netlify.com/drop](https://app.netlify.com/drop)

---

## Contact

**Periyasamy Hydraulic Equipments**  
24/A1, PN Road, Kunnathur, Tiruppur, Tamil Nadu 638103

📞 +91 97865 00188 · +91 97865 00288  
📧 info@pheindia.com

---

*© 2025 Periyasamy Hydraulic Equipments. Precision Engineered.*
