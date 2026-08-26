# AVIVET Animal Health website

Long-term maintainable static website structure.

## Structure
- `index.html` - Home page
- `about.html` - About AVIVET
- `products.html` - Central product catalogue
- `poultry.html` - Poultry segment page
- `cattle-livestock.html` - Cattle & livestock page
- `dealer.html` - Dealer/distributor enquiry
- `contact.html` - Contact page
- `assets/css/style.css` - Global styling
- `assets/js/main.js` - Shared menu, back-to-top and enquiry helpers
- `assets/images/` - Brand assets and photographic image references
- `assets/products/` - Optional local product images
- `assets/data/products.json` - Editable poultry and cattle product catalogue

## Website advertising
The shared script contains an opt-in Google AdSense integration. To enable it:

1. Create and verify an AdSense account for the published domain.
2. Complete Google's site review and add the required privacy/cookie consent notice for your visitors.
3. Create a responsive display ad unit in AdSense and copy the publisher client ID (`ca-pub-...`) and ad slot ID.
4. Open `assets/js/main.js` and set `adsenseClient` and `adsenseSlot` near the top of the file. Do not use placeholder IDs or click your own ads.
5. Publish the site on the verified domain and monitor the AdSense policy/status pages. Revenue depends on approval, traffic and advertiser demand; adding the code alone does not guarantee earnings.

The site identifies **Smart Move Universal** as AVIVET's digital technology partner on every page. Contact details are `smartmoveapp9@gmail.com` and `9553630770`.

## Updating products later
Add or remove product objects in `assets/data/products.json`. Each object supports `id`, `name`, `audience`, `category`, `description`, `image` and `status`. The product page renders this file automatically.

Product images can be remote URLs or local paths such as `assets/products/my-product.jpg`. Serve the folder through a local web server (for example VS Code Live Server) so the browser can load the JSON file; opening `products.html` directly as a `file://` page will block the fetch in some browsers.

## Important
The catalogue is organized into poultry medicines, poultry feed supplements and cattle medicines. Product names, descriptions and images are taken from the uploaded `products/` folders; replace them only with company-approved information before publishing.
