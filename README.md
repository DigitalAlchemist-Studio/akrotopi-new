# Akrotopi Apartments & Studios Website

A modern, responsive website for Akrotopi Apartments & Studios in Tolo, Greece.

## 🌟 Features

- **Responsive Design**: Mobile-first approach with full tablet and desktop support
- **Modern UI**: Clean, professional design with Greek hospitality aesthetics
- **SEO Optimized**: Semantic HTML structure with proper meta tags
- **Fast Loading**: Optimized images and efficient CSS/JS
- **Accessibility**: ARIA labels, keyboard navigation, screen reader friendly
- **Greek Language**: Full Greek language support with UTF-8 encoding

## 📁 Project Structure

```
AkrotopiWebsite/
├── index.html                    # Homepage
├── about.html                    # About Us page
├── accommodations.html           # Main accommodations page
├── contact.html                  # Contact page with form
├── gallery.html                  # Photo gallery with filters
├── faq.html                      # FAQ with categories
├── apartments/                   # Individual apartment pages
│   ├── studio-a1.html           # Studio A1 detail page
│   ├── studio-a2.html           # Studio A2 (to be created)
│   ├── standard-b1.html         # Standard B1 (to be created)
│   ├── standard-b2.html         # Standard B2 (to be created)
│   ├── bunk-c1.html             # Bunk bed apartment (to be created)
│   ├── family-d1.html           # Family apartment (to be created)
│   └── comfort-e1.html          # Comfort apartment (to be created)
├── explore/                      # Area exploration pages (to be created)
│   ├── tolo.html
│   ├── activities.html
│   └── dining.html
├── assets/
│   ├── css/
│   │   └── style.css            # Main stylesheet
│   ├── js/
│   │   └── script.js            # Interactive functionality
│   └── images/                   # Image assets (placeholders created)
├── info.html                     # Property information (to be created)
├── guide.html                    # Local guide (to be created)
├── offers.html                   # Special offers (to be created)
└── README.md                     # This file
```

## 🏠 Accommodations

Based on your sitemap, the website includes 7 different apartment types:

1. **Studio Διαμέρισμα A1** - 1st floor, sea view
2. **Studio Διαμέρισμα A2** - 2nd floor, sea view  
3. **Standard Διαμέρισμα B1** - 2nd floor, 2 balconies, sea & mountain view
4. **Standard Διαμέρισμα B2** - 2nd floor, sea view
5. **Διαμέρισμα με Κουκέτα C1** - 1st floor, sea view
6. **Οικογενειακό Διαμέρισμα D1** - 1st floor, 2 bedrooms, 2 balconies
7. **Comfort Διαμέρισμα E1** - 2nd floor, living room, 2 balconies

## 🎨 Design System

### Colors
- **Primary**: #2c5aa0 (Deep Blue)
- **Secondary**: #f4b942 (Golden Yellow)
- **Accent**: #e8f4f8 (Light Blue)
- **Text**: #333333 (Dark Gray)
- **Light Text**: #666666 (Medium Gray)

### Typography
- **Headings**: Playfair Display (Serif)
- **Body**: Roboto (Sans-serif)

### Components
- Responsive navigation with dropdown menus
- Interactive gallery with category filters
- Booking forms with date validation
- Contact forms with client-side validation
- FAQ with accordion functionality
- Image lightbox system

## 🚀 Getting Started

1. **Clone or download** the project files
2. **Open index.html** in a web browser
3. **For development**: Use a local server (e.g., Live Server in VS Code)

### Local Development
```bash
# If you have Python installed
python -m http.server 8000

# If you have Node.js installed
npx http-server

# Then visit http://localhost:8000 (or specified port)
```

## 📱 Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Technical Features

### CSS Features
- CSS Grid and Flexbox layouts
- CSS Custom Properties (variables)
- Responsive design with mobile-first approach
- Smooth animations and transitions
- Modern box-shadow and border-radius effects

### JavaScript Features
- ES6+ syntax
- Mobile navigation toggle
- Smooth scrolling
- Form validation
- Image gallery with lightbox
- Booking date calculations
- FAQ accordion functionality
- Active navigation highlighting

### Performance
- Lazy loading images
- Optimized CSS delivery
- Minimal JavaScript footprint
- Efficient DOM manipulation

## 📋 TODO - Remaining Pages to Create

The following pages are referenced in navigation but need to be created:

### Individual Apartment Pages
- `apartments/studio-a2.html`
- `apartments/standard-b1.html`
- `apartments/standard-b2.html`
- `apartments/bunk-c1.html`
- `apartments/family-d1.html`
- `apartments/comfort-e1.html`

### Area Exploration Pages
- `explore/tolo.html` - About Tolo village
- `explore/activities.html` - Local activities
- `explore/dining.html` - Restaurants and dining

### Additional Pages
- `info.html` - Property information and amenities
- `guide.html` - Local guide with recommendations
- `offers.html` - Special offers and packages

## 🖼️ Image Requirements

The website uses placeholder images that should be replaced with actual photos:

### Hero & General
- `hero-placeholder.jpg` - Main hero image
- `studio-placeholder.jpg` - Studio apartment representative image
- `standard-placeholder.jpg` - Standard apartment representative image
- `family-placeholder.jpg` - Family apartment representative image

### Gallery Images (needed for gallery.html)
- Exterior shots of the building
- Interior shots of each apartment type
- Views from balconies
- Local area photos (beach, village, restaurants)

### Individual Apartment Images
Each apartment page needs 5-6 high-quality images showing:
- Main room/living area
- Bedroom(s)
- Kitchen
- Bathroom
- Balcony/view
- Specific features

## 📞 Contact Information

Update the placeholder contact information in all files:
- **Phone**: Currently +30 123 456 7890
- **Email**: Currently info@akrotopi.gr
- **Address**: Currently "Τολό, Αργολίδα"

## 🔍 SEO Considerations

Each page includes:
- Descriptive title tags
- Meta descriptions
- Structured heading hierarchy (H1, H2, H3)
- Alt text for images
- Semantic HTML structure
- Greek language specification (lang="el")

## 🌐 Multi-language Support

The website is currently built in Greek. For English or other language versions:
1. Duplicate the HTML structure
2. Translate content
3. Update navigation links
4. Add language switcher component

## 📝 Content Guidelines

When adding content:
- Use engaging, descriptive language
- Highlight unique selling points
- Include practical information (sizes, capacity, amenities)
- Maintain consistent tone throughout
- Optimize for local SEO with location keywords

## 🔐 Security Notes

For production deployment:
- Use HTTPS
- Implement proper form validation server-side
- Add CSRF protection to forms
- Consider implementing Google reCAPTCHA
- Regular security audits

## 📈 Analytics & Tracking

Consider adding:
- Google Analytics
- Google Search Console
- Facebook Pixel (if using social media marketing)
- Booking conversion tracking
- Heat mapping tools (e.g., Hotjar)

---

**Created for Akrotopi Apartments & Studios, Tolo, Greece**
*Professional hospitality website with modern design and functionality*
