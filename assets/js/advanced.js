/**
 * AVIVET ANIMAL HEALTH - ADVANCED INTERACTIVE SUITE
 * Smart Dosage Calculator, Farm Diagnosis Advisor, Global Search Drawer,
 * Full Product Spec Modal, Virtual Vet AI Assistant & 3D Micro-Interactions
 */

(function() {
  'use strict';

  // --- Master Product Database (Embedded Fallback + Dynamic Sync) ---
  let allProducts = (typeof window !== 'undefined' && window.AVIVET_PRODUCTS_DATA) ? window.AVIVET_PRODUCTS_DATA : [
    {
      "id": "acidvic",
      "name": "ACIDVIC",
      "audience": "Poultry",
      "category": "Medicine",
      "tagline": "Acidifier-Based Water Sanitizer & Gut Acidifier",
      "description": "Premium acidifier-based drinking water sanitizer and gut health protector formulated with synergistic organic acids.",
      "composition": "Buffered Organic Acids (Formic, Propionic, Citric, Lactic) + Sanitizing Surfactants",
      "indications": ["Water Line Sanitization", "Gut pH Optimization", "Biofilm Prevention", "Salmonella & E. Coli Suppression"],
      "benefits": "Reduces water microbial load, improves digestive enzyme activity, prevents pathogen colonization in poultry crops and intestines.",
      "dosage": "1 ml per 4-5 Litres of drinking water continuously or 1 ml per 2 Litres during disease outbreaks.",
      "pack": "1 Litre & 5 Litre High-Density Poly Containers",
      "image": "products/POULTRY_CHICKEN_MEDICINES/ACIDVIC.jpeg"
    },
    {
      "id": "av-liver-pro",
      "name": "AV-LIVER PRO",
      "audience": "Poultry",
      "category": "Medicine",
      "tagline": "Advanced Hepatoprotective & Metabolic Tonic",
      "description": "High-potency liver tonic and metabolic stimulant for liver rejuvenation, toxin flushing, and appetite revival.",
      "composition": "Tricholine Citrate, Liver Extract, Inositol, Vitamin B12, Biotin, DL-Methionine & Silymarin Herbal Bio-Actives",
      "indications": ["Fatty Liver Syndrome", "Hepatitis & Jaundice", "Aflatoxicosis Recovery", "Poor Growth & Low FCR"],
      "benefits": "Rejuvenates damaged liver parenchymal cells, accelerates hepatic toxin clearance, enhances fat metabolism and feed consumption.",
      "dosage": "Broilers: 5-10 ml / 100 birds daily for 5-7 days. Layers: 10-15 ml / 100 birds for 7-10 days.",
      "pack": "1 Litre & 5 Litre HDPE Bottles",
      "image": "products/POULTRY_CHICKEN_MEDICINES/AV-LIVER%20PRO.jpeg"
    },
    {
      "id": "aviciprox",
      "name": "AVICIPROX",
      "audience": "Poultry",
      "category": "Medicine",
      "tagline": "Broad-Spectrum Fluoroquinolone Antibacterial",
      "description": "Potent water-soluble veterinary bactericidal formulation for systemic, enteric, and respiratory avian infections.",
      "composition": "Ciprofloxacin Hydrochloride I.P. Equivalent to Ciprofloxacin – 10% w/w, Excipients Q.S.",
      "indications": ["Chronic Respiratory Disease (CRD)", "Colibacillosis", "Infectious Coryza", "Fowl Cholera & Salmonellosis"],
      "benefits": "Rapid bactericidal action through bacterial DNA gyrase inhibition. High tissue bioavailability in lungs, air sacs, and intestinal mucosa.",
      "dosage": "10 mg Ciprofloxacin per kg body weight (10g AVICIPROX per 100kg bird bodyweight in drinking water for 3-5 days).",
      "pack": "100g, 500g & 1kg Sealed Moisture-Barrier Pouches",
      "image": "products/POULTRY_CHICKEN_MEDICINES/AVICIPROX.jpeg"
    },
    {
      "id": "avichick-boost",
      "name": "AVICHICK BOOST",
      "audience": "Poultry",
      "category": "Medicine",
      "tagline": "Early Chick Vigor, Brooding & Anti-Stress Tonic",
      "description": "Formulated specifically for day-old chicks and brooding flocks to reduce early chick mortality and build immune vigor.",
      "composition": "Vitamins A, D3, E, B1, B2, B6, B12, Niacinamide, D-Panthenol, Choline Chloride & Essential Amino Acid Complex",
      "indications": ["Early Chick Mortality Reduction", "Brooding Stress Management", "Rapid Yolk Sac Absorption", "Vaccination Prep"],
      "benefits": "Improves early chick livability by 98%+, speeds up maternal yolk assimilation, supports gut development, and prevents early stunting.",
      "dosage": "5 ml per 100 chicks daily in morning drinking water for the first 5-7 days of brooding.",
      "pack": "500 ml & 1 Litre Leak-Proof Bottles",
      "image": "products/POULTRY_CHICKEN_MEDICINES/AVICHICK_BOOST.jpeg"
    },
    {
      "id": "avisel-ze-avisel-e",
      "name": "AVISEL-ZE & AVISEL-E",
      "audience": "Poultry",
      "category": "Medicine",
      "tagline": "Cellular Antioxidant, Immunity & Fertility Booster",
      "description": "Synergistic blend of Vitamin E, Organic Selenium, Zinc, and Biotin for thermal stress management and reproductive longevity.",
      "composition": "Vitamin E 100 mg, Sodium Selenite Eq. to Selenium 0.5 mg, Organic Zinc 10 mg, Biotin & Stabilizers per ml",
      "indications": ["Heat Stress / Extreme Summer Management", "Crazy Chick Disease (Encephalomalacia)", "Poor Hatchability & Fertility", "Post-Vaccination Immunity"],
      "benefits": "Protects cell membranes from free-radical oxidation, improves egg hatchability, enhances male bird sperm motility, and boosts antibody titers.",
      "dosage": "Broilers: 2-5 ml / 100 birds in drinking water. Layers & Breeders: 5-10 ml / 100 birds for 5 days.",
      "pack": "200 ml, 500 ml & 1 Litre Bottles",
      "image": "products/POULTRY_CHICKEN_MEDICINES/AVISEL-ZE%20and%20AVISEL-E.jpeg"
    },
    {
      "id": "avitone-sp",
      "name": "AVITONE-SP",
      "audience": "Poultry",
      "category": "Medicine",
      "tagline": "High-Potency Fat & Water Soluble Vitamin Forte",
      "description": "Concentrated vitamin therapy designed for rapid recovery from environmental stress, peak lay maintenance, and plumage defense.",
      "composition": "Vitamin A 5,00,000 IU, Vitamin D3 1,00,000 IU, Vitamin E 100 mg, Vitamin C 50 mg per 10 ml",
      "indications": ["Peak Laying Period Support", "Debeaking, Shifting & Vaccination Stress", "Egg Shell Softness", "Vitamin Deficiency Anorexia"],
      "benefits": "Maximizes peak egg production longevity, eliminates cage layer fatigue, ensures strong bone mineralization and vibrant plumage.",
      "dosage": "Chicks: 5 ml / 100 birds; Growers: 7 ml / 100 birds; Layers/Broilers: 10 ml / 100 birds daily.",
      "pack": "1 Litre & 5 Litre Heavy-Duty Cans",
      "image": "products/POULTRY_CHICKEN_MEDICINES/AVITONE-SP_1L.jpeg"
    },
    {
      "id": "av-cal-gold",
      "name": "AV-CAL GOLD",
      "audience": "Poultry",
      "category": "Medicine",
      "tagline": "Liquid Chelated Calcium, Phosphorus & D3 Elixir",
      "description": "Double-strength liquid calcium and phosphorus formula fortified with Vitamin D3 and Vitamin B12 for bone & shell strength.",
      "composition": "Each 100 ml contains: Calcium 3500 mg, Phosphorus 1750 mg, Vitamin D3 15000 IU, Vitamin B12 100 mcg",
      "indications": ["Thin & Broken Egg Shells", "Cage Layer Fatigue / Rickets", "Rapid Skeletal Growth in Broilers", "Egg Drop Syndrome Support"],
      "benefits": "Eliminates rubbery/cracked eggs, strengthens leg bones in rapid-growing broilers, stabilizes calcium homeostasis in high-yield layer birds.",
      "dosage": "Chicks: 10 ml / 100 birds; Growers: 20 ml / 100 birds; Layers: 50 ml / 100 birds in drinking water daily.",
      "pack": "1 Litre & 5 Litre HDPE Bottles",
      "image": "products/POULTRY_CHICKEN_MEDICINES/AV-CAL%20GOLD.jpeg"
    },
    {
      "id": "aziforte-bh",
      "name": "AZIFORTE-BH",
      "audience": "Poultry",
      "category": "Medicine",
      "tagline": "Azithromycin + Mucolytic Respiratory Powerhouse",
      "description": "Advanced macrolide antibiotic with Bromhexine mucolytic for intractable respiratory tract infections in poultry flocks.",
      "composition": "Each Gram Contains: Azithromycin Dihydrate IP Equivalent to Azithromycin 100 mg, Bromhexine HCL I.P. 7.5 mg, Excipients Q.S.",
      "indications": ["Complicated CRD (CCRD)", "Severe Bronchial Wheezing & Rales", "Mycoplasmosis & Secondary Coli Invasions", "Swollen Head Syndrome"],
      "benefits": "Penetrates deep into respiratory mucosal secretions, thins sticky bronchial phlegm for swift excretion, and delivers long tissue half-life.",
      "dosage": "10-20 mg Azithromycin per kg body weight (100g AZIFORTE-BH per 500-1000 birds for 3-5 consecutive days).",
      "pack": "100g & 500g Air-Tight Foil Pouches",
      "image": "products/POULTRY_CHICKEN_MEDICINES/AZIFORTE-BH.jpeg"
    },
    {
      "id": "detoxifier-ls",
      "name": "DETOXIFIER-LS",
      "audience": "Poultry",
      "category": "Medicine",
      "tagline": "Hepato-Renal Detoxifier & Uric Acid Cleanser",
      "description": "Dual-action liver and kidney flusher that cleanses toxins, clears uric acid deposits, and shields vital internal organs.",
      "composition": "Natural Plant Bioflavonoids, Sorbitol, Choline Chloride, Magnesium Sulphate, Betaine & Hexamine Complex",
      "indications": ["Visceral & Articular Gout", "Kidney Enlargement & Urate Accumulation", "Mycotoxin Intoxication", "Post-Antibiotic Organ Detox"],
      "benefits": "Flushes renal tubular crystals, reduces kidney inflammation, cleanses liver tissue, and curbs sudden flock mortality from gout.",
      "dosage": "1 ml per 1-2 Litres of drinking water for 5-7 days, especially during hot weather or high-protein feeding.",
      "pack": "1 Litre & 5 Litre HDPE Containers",
      "image": "products/POULTRY_CHICKEN_MEDICINES/DETOXIFIER-LS.jpeg"
    },
    {
      "id": "enrofloxavet-bh",
      "name": "ENROFLOXAVET-BH",
      "audience": "Poultry",
      "category": "Medicine",
      "tagline": "Enrofloxacin 20% + Bromhexine Respiratory Suspension",
      "description": "High-concentration veterinary antimicrobial liquid combining powerful fluoroquinolone action with a respiratory expectorant.",
      "composition": "Each ml contains: Enrofloxacin IP 200 mg, Bromhexine Hydrochloride IP 15 mg, Excipients Q.S.",
      "indications": ["Severe Air Sacculitis", "Mycoplasma gallisepticum & synoviae", "Infectious Bronchitis Secondary Complications", "Enteritis & Colisepticemia"],
      "benefits": "Immediate clearance of trachea and bronchial mucus plugs; provides rapid blood levels within 1 hour of administration.",
      "dosage": "1 ml per 2-4 Litres of drinking water for 3 to 5 days depending on severity.",
      "pack": "500 ml & 1 Litre High-Barrier Bottles",
      "image": "products/POULTRY_CHICKEN_MEDICINES/ENROFLOXAVET-BH.jpeg"
    },
    {
      "id": "multi-grow",
      "name": "MULTI GROW",
      "audience": "Poultry",
      "category": "Medicine",
      "tagline": "Fast-Growth, Muscle Accretion & FCR Optimizer",
      "description": "Multi-vitamin, essential mineral and amino acid oral liquid engineered for exceptional bodyweight gains and feed efficiency.",
      "composition": "Vitamins A, D3, E, C, B-Complex, L-Lysine, DL-Methionine, Zinc Glycinate & Bio-active Peptides",
      "indications": ["Slow Broiler Weight Accretion", "Flock Uniformity Disparities", "Laying Peak Recovery", "Sub-optimal Feed Conversion"],
      "benefits": "Promotes lean muscle deposition, improves flock weight uniformity, boosts disease resistance, and cuts down feed consumption days.",
      "dosage": "Broilers: 10 ml / 100 birds daily from 2nd week onwards. Layers: 15 ml / 100 birds 3 days a week.",
      "pack": "1 Litre & 5 Litre Containers",
      "image": "products/POULTRY_CHICKEN_MEDICINES/MULTI GROW.jpeg"
    },
    {
      "id": "progut-boost",
      "name": "PROGUT-BOOST",
      "audience": "Poultry",
      "category": "Medicine",
      "tagline": "4-in-1 Gut Microbiome & Enzyme Defense Shield",
      "description": "Comprehensive digestive health formulation integrating Probiotics, Prebiotics (MOS/FOS), Postbiotics, and Exogenous Enzymes.",
      "composition": "Bacillus subtilis, Lactobacillus acidophilus, Saccharomyces boulardii, MOS, FOS, Phytase, Protease, Xylanase & Cellulase",
      "indications": ["Wet Droppings / Litter Dampness", "Non-Specific Diarrhea", "Post-Antibiotic Dysbiosis", "Poor Nutrient Digestibility"],
      "benefits": "Crowds out enteric pathogens, establishes solid dry droppings, eliminates ammonia emissions in farm sheds, and enhances feed digestibility by 12%.",
      "dosage": "Water: 1g per 2 Litres of water. Feed: 250g - 500g per ton of complete poultry feed.",
      "pack": "500g & 1kg Vacuum-Sealed Pouches",
      "image": "products/POULTRY_CHICKEN_MEDICINES/PROGUT-BOOST.jpeg"
    },
    {
      "id": "vironic-plus",
      "name": "VIRONIC PLUS",
      "audience": "Poultry",
      "category": "Disinfectant",
      "tagline": "Hospital-Grade Triple Active Farm Biosecurity Shield",
      "description": "Next-generation concentrated disinfectant formulated for viral pathogen eradication, terminal shed sanitization, and footbaths.",
      "composition": "Glutaraldehyde – 15% W/V, Cocobenzyl Dimethyl Ammonium Chloride (BKC) – 10% W/V, Didecyl Dimethyl Ammonium Chloride (DDAC) – 1.5%, Surfactants Q.S.",
      "indications": ["Avian Influenza & Newcastle Disease Defense", "Terminal Shed Disinfection", "Vehicle & Equipment Spraying", "Hatchery Sanitation & Foot Dip"],
      "benefits": "Non-corrosive, highly effective in presence of organic matter, eliminates 99.999% of poultry viruses, mycoplasmas, bacteria, and fungal spores.",
      "dosage": "Terminal Disinfection: 10 ml per Litre of water (1:100). Aerial / Routine Spray: 2-3 ml per Litre of water.",
      "pack": "1 Litre & 5 Litre Industrial HDPE Containers",
      "image": "products/POULTRY_CHICKEN_MEDICINES/vironic_plus.jpeg"
    },
    {
      "id": "av-cal-gold-granules",
      "name": "AV-CAL GOLD GRANULES",
      "audience": "Poultry",
      "category": "Feed Supplement",
      "tagline": "Controlled-Release Calcium & Phosphorus Granules",
      "description": "Heavy-density, uniform micro-granules providing continuous nocturnal calcium release for eggshell calcification and bone integrity.",
      "composition": "Micro-encapsulated Calcium Carbonate, Dicalcium Phosphate, Vitamin D3, Organic Zinc & Manganese",
      "indications": ["Commercial Layer & Breeder Feed Mixing", "Soft-Shelled & Hairline Crack Prevention", "Bone Mineral Depletion in Old Flocks"],
      "benefits": "Ensures consistent overnight blood ionic calcium levels when shell gland is active, drastically reducing breakage losses.",
      "dosage": "Mix 1kg to 2.5kg per ton of poultry feed or as advised by nutritionist.",
      "pack": "25kg Heavy-Duty Moisture-Barrier Bags",
      "image": "products/POULTRY_CHICKEN_FEED_SUPPLEMENTS/AV-CAL GOLD GRANULES.jpeg"
    },
    {
      "id": "av-otc-20",
      "name": "AV-OTC-20%",
      "audience": "Poultry",
      "category": "Feed Supplement",
      "tagline": "Oxytetracycline 20% Broad Spectrum Feed Premix",
      "description": "Micro-milled, dust-free oxytetracycline feed grade premix designed for homogenous dispersion in poultry mash and pelleted feeds.",
      "composition": "Oxytetracycline Dihydrate equivalent to Pure Oxytetracycline 200 g/kg (20% w/w)",
      "indications": ["Early Chick Mortality Prevention", "Fowl Cholera & Infectious Synovitis", "Secondary Bacterial Invasions During Stress"],
      "benefits": "Therapeutic and prophylactic coverage against gram-positive and gram-negative pathogens; improves overall flock feed efficiency.",
      "dosage": "Prevention: 250g to 500g per ton of feed. Treatment: 1kg to 2kg per ton of feed for 5-7 days.",
      "pack": "1kg, 5kg & 25kg Woven Bags",
      "image": "products/POULTRY_CHICKEN_FEED_SUPPLEMENTS/AV-OTC-20%25.jpeg"
    },
    {
      "id": "chlorovet",
      "name": "CHLOROVET",
      "audience": "Poultry",
      "category": "Feed Supplement",
      "tagline": "Chlortetracycline Micro-Granulated Feed Premix",
      "description": "Granulated CTC premix with superior thermal stability for pelleted feeds; excellent mucosal retention for enteric & lung health.",
      "composition": "Chlortetracycline Hydrochloride 15% / 20% stabilized with anti-caking agents",
      "indications": ["Chronic Respiratory Disease (CRD)", "Necrotic Enteritis Control", "Growth Promotion in Broiler Birds"],
      "benefits": "High affinity for respiratory and gastrointestinal tract tissues, prevents subclinical gut lesions, and supports rapid growth curve.",
      "dosage": "Mix 500g to 1.5kg per ton of finished feed.",
      "pack": "5kg & 25kg Kraft Paper Poly-Lined Bags",
      "image": "products/POULTRY_CHICKEN_FEED_SUPPLEMENTS/CHLOROVET.jpeg"
    },
    {
      "id": "tv-mulin",
      "name": "TV-MULIN",
      "audience": "Poultry",
      "category": "Feed Supplement",
      "tagline": "Tiamulin Hydrogen Fumarate Specialist Premix",
      "description": "Gold standard pleuromutilin antimicrobial premix specifically targeted against Mycoplasma and Brachyspira infections.",
      "composition": "Tiamulin Hydrogen Fumarate 10% / 80% Premix",
      "indications": ["Mycoplasma gallisepticum (MG)", "Mycoplasma synoviae (MS)", "Infectious Sinusitis & Air Sac Lesions"],
      "benefits": "Exceptional efficacy against chronic respiratory infections where other antibiotics fail. Dramatically cuts down carcass condemnation.",
      "dosage": "Prevention: 200g - 300g per ton of feed. Treatment: 1kg per ton of feed for 5-7 days.",
      "pack": "1kg Foil Packs & 5kg Buckets",
      "image": "products/POULTRY_CHICKEN_FEED_SUPPLEMENTS/TV-MULIN.jpeg"
    },
    {
      "id": "tylovet",
      "name": "TYLOVET",
      "audience": "Poultry",
      "category": "Feed Supplement",
      "tagline": "Tylosin Phosphate / Tartrate Growth & Health Premix",
      "description": "Micro-coated Tylosin premix engineered for precise feed inclusion, maximum stability, and target organ delivery.",
      "composition": "Tylosin Tartrate equivalent to pure Tylosin 10% / 50% w/w",
      "indications": ["CRD Prevention & Control", "Clostridial Enteritis", "Feed Conversion Optimization"],
      "benefits": "Improves daily body weight gain, prevents air sac cloudiness, and supports high feed utilization efficiency.",
      "dosage": "Mix 500g to 1kg per ton of poultry feed.",
      "pack": "1kg & 5kg Premium Poly Bags",
      "image": "products/POULTRY_CHICKEN_FEED_SUPPLEMENTS/TYLOVET.jpeg"
    },
    {
      "id": "avimin-forte",
      "name": "AVIMIN FORTE",
      "audience": "Cattle",
      "category": "Medicine",
      "tagline": "Chelated Mineral Mixture + Probiotic Yeast for Cattle",
      "description": "Super-fortified chelated mineral and vitamin supplement enriched with live probiotic yeast and herbal galactagogues for dairy cows and buffaloes.",
      "composition": "Chelated Calcium, Phosphorus, Magnesium, Zinc, Copper, Manganese, Cobalt, Iodine, Selenium, Vitamin A, D3, E, Biotin & Live Yeast Culture (Saccharomyces cerevisiae)",
      "indications": ["Low Milk Yield & Low Fat / SNF %", "Irregular Heat & Repeat Breeding Syndrome", "Post-Partum Anoestrus & Weak Immunity", "Hoof Cracks & Poor Coat Condition"],
      "benefits": "Increases daily milk yield by 1.5 - 2.5 Litres, raises Fat & SNF percentages, shortens intercalving period, and fosters vibrant reproductive health.",
      "dosage": "Cows & Buffaloes: 50g daily in feed; Calves, Sheep & Goats: 15-20g daily.",
      "pack": "1kg, 5kg & 25kg High-Barrier Moisture-Proof Bags",
      "image": "products/VETERNARY_COW_PRODUCTS/AVIMIN_Forte.jpeg"
    },
    {
      "id": "av-cal-gold-cow",
      "name": "AV-CAL GOLD (Cattle)",
      "audience": "Cattle",
      "category": "Medicine",
      "tagline": "Super-Concentrated Ionic Calcium, Shatavari & Jivanti Elixir",
      "description": "High-bioavailability liquid calcium formulation enriched with traditional herbal galactagogues (Shatavari, Leptadenia) for peak dairy lactation.",
      "composition": "Each 100 ml contains: Calcium 3500 mg, Phosphorus 1750 mg, Vitamin D3 15000 IU, Vitamin B12 100 mcg, Carbohydrates, Shatavari 1000 mg, Leptadenia reticulata (Jivanti) 1000 mg",
      "indications": ["Hypocalcemia / Milk Fever Prevention", "Sudden Lactation Slump After Calving", "Slow Uterine Involution & Retained Placenta Support", "General Debility in Dairy Animals"],
      "benefits": "Provides immediate bio-available ionic calcium, stimulates milk let-down naturally without hormonal interference, and sustains high lactation curve.",
      "dosage": "Milch Cattle & Buffaloes: 100 ml daily orally or mixed in feed; Calves & Sheep: 20-40 ml daily.",
      "pack": "1 Litre, 5 Litre & 10 Litre Heavy-Duty Jerry Cans",
      "image": "products/VETERNARY_COW_PRODUCTS/AV_CAL_GOLD.jpeg"
    }
  ];

  // Optional dynamic fetch update if running over HTTP
  const loadProductData = async () => {
    if (window.location.protocol.startsWith('http')) {
      try {
        const response = await fetch('assets/data/products.json');
        if (response.ok) {
          allProducts = await response.json();
        }
      } catch (err) {
        // Fallback already in allProducts
      }
    }
  };

  // --- Ambient Canvas Orbs ---
  const initAmbientLighting = () => {
    if (document.querySelector('.ambient-canvas-container')) return;
    const container = document.createElement('div');
    container.className = 'ambient-canvas-container';
    container.innerHTML = `
      <div class="ambient-orb ambient-orb-1"></div>
      <div class="ambient-orb ambient-orb-2"></div>
      <div class="ambient-orb ambient-orb-3"></div>
    `;
    document.body.prepend(container);
  };

  // --- Global Smart Search Drawer ---
  const initSmartSearch = () => {
    let overlay = document.querySelector('.search-panel-overlay');
    let panel = document.querySelector('.search-panel');

    if (!panel) {
      overlay = document.createElement('div');
      overlay.className = 'search-panel-overlay';
      document.body.appendChild(overlay);

      panel = document.createElement('div');
      panel.className = 'search-panel';
      panel.innerHTML = `
        <div class="search-panel-header">
          <h3>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            Search AVIVET Products
          </h3>
          <button class="search-panel-close" aria-label="Close search">&times;</button>
        </div>
        <div class="search-panel-body">
          <div class="search-input-wrapper">
            <span class="search-icon-left">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </span>
            <input type="text" id="globalSearchInput" placeholder="Search by name, symptom, or ingredient..." autocomplete="off">
            <button class="voice-search-btn" id="voiceSearchBtn" title="Voice Search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
            </button>
          </div>
          <div class="search-filter-pills">
            <button class="search-filter-pill active" data-filter="all">All Products</button>
            <button class="search-filter-pill" data-filter="Poultry">Poultry</button>
            <button class="search-filter-pill" data-filter="Cattle">Cattle & Dairy</button>
            <button class="search-filter-pill" data-filter="Feed Supplement">Feed Supplements</button>
          </div>
          <div class="search-results-list" id="globalSearchResults">
            <div style="text-align:center;padding:30px 10px;color:var(--text-muted);">
              Type a product name or health condition above...
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(panel);
    }

    const openSearch = () => {
      overlay.classList.add('active');
      panel.classList.add('active');
      const input = panel.querySelector('#globalSearchInput');
      setTimeout(() => input.focus(), 100);
      renderSearchResults('', 'all');
    };

    const closeSearch = () => {
      overlay.classList.remove('active');
      panel.classList.remove('active');
    };

    document.querySelectorAll('.search-trigger-btn').forEach(btn => {
      btn.addEventListener('click', openSearch);
    });

    overlay.addEventListener('click', closeSearch);
    panel.querySelector('.search-panel-close').addEventListener('click', closeSearch);

    // Keyboard shortcut (Ctrl+K or /)
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey && e.key.toLowerCase() === 'k') || (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA')) {
        e.preventDefault();
        openSearch();
      }
      if (e.key === 'Escape' && panel.classList.contains('active')) {
        closeSearch();
      }
    });

    // Filtering & Rendering Search Results
    const searchInput = panel.querySelector('#globalSearchInput');
    const resultsContainer = panel.querySelector('#globalSearchResults');
    let activeFilter = 'all';

    const renderSearchResults = (query, filter) => {
      const q = query.trim().toLowerCase();
      let matches = allProducts;

      if (filter !== 'all') {
        matches = matches.filter(p => p.audience === filter || p.category === filter);
      }

      if (q) {
        matches = matches.filter(p => 
          p.name.toLowerCase().includes(q) ||
          (p.tagline && p.tagline.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.composition && p.composition.toLowerCase().includes(q)) ||
          (p.indications && p.indications.some(ind => ind.toLowerCase().includes(q)))
        );
      }

      if (matches.length === 0) {
        resultsContainer.innerHTML = `
          <div style="text-align:center;padding:40px 10px;color:var(--text-muted);">
            <div style="font-size:2rem;margin-bottom:10px;">🔍</div>
            <strong>No matching products found</strong>
            <p style="font-size:0.85rem;margin-top:6px;">Try searching for "calcium", "liver", "vitamins", or "poultry".</p>
          </div>
        `;
        return;
      }

      resultsContainer.innerHTML = matches.map(p => `
        <div class="search-result-item" data-product-id="${p.id}">
          <div class="search-result-thumb">
            <img src="${p.image}" alt="${p.name}">
          </div>
          <div class="search-result-info">
            <strong>${p.name}</strong>
            <span>${p.tagline || p.description}</span>
          </div>
          <span class="badge ${p.audience === 'Poultry' ? 'badge-emerald' : 'badge-gold'}">${p.audience}</span>
        </div>
      `).join('');

      resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
          closeSearch();
          openProductSpecModal(item.dataset.productId);
        });
      });
    };

    searchInput.addEventListener('input', (e) => {
      renderSearchResults(e.target.value, activeFilter);
    });

    panel.querySelectorAll('.search-filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        panel.querySelectorAll('.search-filter-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.dataset.filter;
        renderSearchResults(searchInput.value, activeFilter);
      });
    });

    // Voice Search
    const voiceBtn = panel.querySelector('#voiceSearchBtn');
    if (voiceBtn && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      voiceBtn.addEventListener('click', () => {
        voiceBtn.classList.add('listening');
        recognition.start();
      });

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        searchInput.value = text;
        voiceBtn.classList.remove('listening');
        renderSearchResults(text, activeFilter);
      };

      recognition.onerror = () => voiceBtn.classList.remove('listening');
      recognition.onend = () => voiceBtn.classList.remove('listening');
    } else if (voiceBtn) {
      voiceBtn.style.display = 'none';
    }
  };

  // --- Full Product Specification Modal ---
  const initProductSpecModal = () => {
    let overlay = document.querySelector('.spec-modal-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'spec-modal-overlay';
      overlay.innerHTML = `
        <div class="spec-modal" role="dialog" aria-modal="true">
          <button class="spec-modal-close" aria-label="Close modal">&times;</button>
          <div class="spec-modal-scroll-body" id="specModalBody">
            <!-- Dynamic Content Injected Here -->
          </div>
        </div>
      `;
      document.body.appendChild(overlay);

      overlay.querySelector('.spec-modal-close').addEventListener('click', () => {
        overlay.classList.remove('active');
      });

      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('active');
      });
    }
  };

  window.openProductSpecModal = (productId) => {
    const product = allProducts.find(p => p.id === productId || p.name === productId);
    if (!product) return;

    const overlay = document.querySelector('.spec-modal-overlay');
    const modalBody = document.querySelector('#specModalBody');
    if (!overlay || !modalBody) return;

    const indicationsList = product.indications ? 
      product.indications.map(ind => `<span class="spec-tag">✓ ${ind}</span>`).join('') : 
      '<span class="spec-tag">Veterinary Grade Formulation</span>';

    const cleanMsg = encodeURIComponent(`Hello AVIVET, I want to inquire about ${product.name} (${product.audience} - ${product.category}).\n\nPackaging: ${product.pack || 'Standard'}\n\nPlease share price quotation.`);

    modalBody.innerHTML = `
      <div class="spec-img-stage">
        <img src="${product.image}" alt="${product.name}">
        <div style="margin-top:16px;font-size:0.8rem;color:var(--text-muted);font-weight:700;text-transform:uppercase;">
          Pack Size: ${product.pack || 'Standard Commercial'}
        </div>
      </div>
      <div class="spec-content-body">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
          <span class="badge ${product.audience === 'Poultry' ? 'badge-emerald' : 'badge-gold'}">${product.audience}</span>
          <span class="badge badge-cyan">${product.category}</span>
        </div>
        <h2>${product.name}</h2>
        <div class="spec-tagline">${product.tagline || product.description}</div>
        
        <div class="spec-section-block">
          <h4>Active Composition</h4>
          <div class="spec-composition-box">
            ${product.composition || 'Proprietary scientifically-balanced veterinary formulation.'}
          </div>
        </div>

        <div class="spec-section-block">
          <h4>Clinical Indications & Applications</h4>
          <div class="spec-indications-tags">
            ${indicationsList}
          </div>
        </div>

        <div class="spec-section-block">
          <h4>Key Benefits & Mode of Action</h4>
          <p style="font-size:0.92rem;color:var(--text-secondary);line-height:1.6;">
            ${product.benefits || product.description}
          </p>
        </div>

        <div class="spec-section-block">
          <h4>Recommended Dosage Schedule</h4>
          <div class="spec-composition-box" style="border-left:3px solid var(--emerald);background:var(--emerald-soft);">
            <strong>Daily Dosage Protocol:</strong>
            <div>${product.dosage || 'As prescribed by veterinarian / nutritionist.'}</div>
          </div>
        </div>

        <div style="display:flex;gap:12px;margin-top:28px;flex-wrap:wrap;">
          <a class="btn btn-primary" href="https://wa.me/918367455559?text=${cleanMsg}" target="_blank" rel="noopener">
            💬 Order / Enquire on WhatsApp
          </a>
          <a class="btn btn-outline" href="mailto:avivetanimanlhealth@gmail.com?subject=Enquiry:%20${encodeURIComponent(product.name)}&body=${cleanMsg}">
            ✉ Email Distributor Spec
          </a>
        </div>
      </div>
    `;

    overlay.classList.add('active');
  };

  // --- Smart Animal Health & Feed Dosage Calculator ---
  const initDosageCalculator = () => {
    const calcContainer = document.querySelector('#dosageCalculatorWidget');
    if (!calcContainer) return;

    let selectedSpecies = 'broiler';
    let flockCount = 1000;
    let ageValue = 21;

    const speciesConfigs = {
      broiler: {
        name: 'Broiler Poultry',
        countLabel: 'Flock Size (Birds)',
        countMin: 100, countMax: 50000, countStep: 500, defaultCount: 2000,
        ageLabel: 'Bird Age (Days)',
        ageMin: 1, ageMax: 45, defaultAge: 21,
        feedPerDay: (age) => age < 14 ? 0.038 : (age < 28 ? 0.095 : 0.165),
        waterRatio: 2.1,
        recomProduct: 'av-liver-pro',
        dosageText: (count) => `${((count / 100) * 8).toFixed(0)} ml / day in drinking water`
      },
      layer: {
        name: 'Commercial Layer',
        countLabel: 'Flock Size (Birds)',
        countMin: 500, countMax: 100000, countStep: 1000, defaultCount: 5000,
        ageLabel: 'Laying Age (Weeks)',
        ageMin: 18, ageMax: 80, defaultAge: 32,
        feedPerDay: () => 0.115,
        waterRatio: 2.2,
        recomProduct: 'av-cal-gold',
        dosageText: (count) => `${((count / 100) * 50).toFixed(0)} ml / day (Calcium Peak)`
      },
      cattle: {
        name: 'Dairy Cattle / Buffalo',
        countLabel: 'Herd Size (Cows / Buffaloes)',
        countMin: 1, countMax: 500, countStep: 1, defaultCount: 15,
        ageLabel: 'Lactation Stage (Months)',
        ageMin: 1, ageMax: 12, defaultAge: 3,
        feedPerDay: () => 12.0,
        waterRatio: 4.5,
        recomProduct: 'avimin-forte',
        dosageText: (count) => `${(count * 50).toFixed(0)} g / day (Chelated Minerals + Live Yeast)`
      },
      goat: {
        name: 'Goats & Sheep',
        countLabel: 'Flock Size (Heads)',
        countMin: 5, countMax: 500, countStep: 5, defaultCount: 40,
        ageLabel: 'Age (Months)',
        ageMin: 1, ageMax: 36, defaultAge: 8,
        feedPerDay: () => 1.2,
        waterRatio: 3.5,
        recomProduct: 'avimin-forte',
        dosageText: (count) => `${(count * 15).toFixed(0)} g / day in daily feed`
      }
    };

    const updateCalculator = () => {
      const config = speciesConfigs[selectedSpecies];
      const feedPerAnimal = config.feedPerDay(ageValue);
      const totalDailyFeed = (feedPerAnimal * flockCount).toFixed(1);
      const totalDailyWater = (totalDailyFeed * config.waterRatio).toFixed(1);
      const recomProductObj = allProducts.find(p => p.id === config.recomProduct) || allProducts[0];

      calcContainer.querySelector('#calcCountVal').textContent = flockCount.toLocaleString();
      calcContainer.querySelector('#calcAgeVal').textContent = `${ageValue} ${selectedSpecies === 'layer' ? 'Weeks' : (selectedSpecies === 'cattle' || selectedSpecies === 'goat' ? 'Months' : 'Days')}`;
      
      calcContainer.querySelector('#calcFeedOutput').textContent = `${totalDailyFeed} kg`;
      calcContainer.querySelector('#calcWaterOutput').textContent = `${totalDailyWater} L`;
      
      if (recomProductObj) {
        calcContainer.querySelector('#calcRecomName').textContent = recomProductObj.name;
        calcContainer.querySelector('#calcRecomDesc').textContent = config.dosageText(flockCount);
        calcContainer.querySelector('#calcRecomImg').src = recomProductObj.image;
        calcContainer.querySelector('#calcRecomImg').alt = recomProductObj.name;

        const orderBtn = calcContainer.querySelector('#calcOrderBtn');
        if (orderBtn) {
          const calcSummary = encodeURIComponent(`Hello AVIVET, I used your Online Dosage Calculator for:\n• Species: ${config.name}\n• Headcount: ${flockCount}\n• Age: ${ageValue}\n• Daily Feed Estimate: ${totalDailyFeed} kg\n• Recommended Formulation: ${recomProductObj.name} (${config.dosageText(flockCount)})\n\nPlease share price & delivery details.`);
          orderBtn.href = `https://wa.me/918367455559?text=${calcSummary}`;
        }
      }
    };

    calcContainer.querySelectorAll('.calc-species-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        calcContainer.querySelectorAll('.calc-species-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedSpecies = btn.dataset.species;
        
        const config = speciesConfigs[selectedSpecies];
        const countSlider = calcContainer.querySelector('#calcCountSlider');
        const ageSlider = calcContainer.querySelector('#calcAgeSlider');

        countSlider.min = config.countMin;
        countSlider.max = config.countMax;
        countSlider.step = config.countStep;
        countSlider.value = config.defaultCount;
        flockCount = config.defaultCount;

        ageSlider.min = config.ageMin;
        ageSlider.max = config.ageMax;
        ageSlider.value = config.defaultAge;
        ageValue = config.defaultAge;

        calcContainer.querySelector('#calcCountLabel').textContent = config.countLabel;
        calcContainer.querySelector('#calcAgeLabel').textContent = config.ageLabel;

        updateCalculator();
      });
    });

    const countSlider = calcContainer.querySelector('#calcCountSlider');
    const ageSlider = calcContainer.querySelector('#calcAgeSlider');

    if (countSlider) {
      countSlider.addEventListener('input', (e) => {
        flockCount = parseInt(e.target.value, 10);
        updateCalculator();
      });
    }

    if (ageSlider) {
      ageSlider.addEventListener('input', (e) => {
        ageValue = parseInt(e.target.value, 10);
        updateCalculator();
      });
    }

    updateCalculator();
  };

  // --- Visual Farm Symptom & Solution Finder (Diagnosis Advisor) ---
  const initDiagnosisAdvisor = () => {
    const advisorContainer = document.querySelector('#farmDiagnosisAdvisor');
    if (!advisorContainer) return;

    const symptomDatabase = {
      'eggshell': {
        icon: '🥚',
        title: 'Weak / Thin Egg Shells',
        desc: 'Cracked eggs, soft shells, or cage layer fatigue',
        productId: 'av-cal-gold',
        note: 'Liquid chelated calcium (3500mg) + phosphorus + Vitamin D3 for rapid overnight shell mineral deposit.'
      },
      'respiratory': {
        icon: '🫁',
        title: 'Respiratory Rales & Wheezing',
        desc: 'Gurgling sounds, nasal discharge, or chronic CRD',
        productId: 'aziforte-bh',
        note: 'High-potency Azithromycin + Bromhexine to break mucosal phlegm and clear tracheal airways.'
      },
      'heat-stress': {
        icon: '☀️',
        title: 'Summer Heat Stress',
        desc: 'Panting, high mortality, reduced feed intake',
        productId: 'avisel-ze-avisel-e',
        note: 'Vitamin E + Organic Selenium + Zinc bio-antioxidant shield preventing thermal cellular damage.'
      },
      'liver-fcr': {
        icon: '🌱',
        title: 'Poor FCR & Sluggish Liver',
        desc: 'Flock weight disparity, slow growth curve',
        productId: 'av-liver-pro',
        note: 'Tricholine citrate + herbal silymarin to restore hepatocyte vitality and nutrient assimilation.'
      },
      'wet-litter': {
        icon: '💧',
        title: 'Wet Droppings & Enteritis',
        desc: 'Litter dampness, ammonia stench, loose droppings',
        productId: 'progut-boost',
        note: '4-in-1 probiotic + prebiotic + enzyme complex to balance gut microbiota and dry out shed droppings.'
      },
      'chick-stress': {
        icon: '🐣',
        title: 'Early Chick Brooding Stress',
        desc: 'Unabsorbed yolk sac, dehydration, early chick loss',
        productId: 'avichick-boost',
        note: 'Specialized neonatal multi-vitamin and amino acid elixir reducing 1st-week chick mortality.'
      },
      'milk-yield': {
        icon: '🐄',
        title: 'Low Milk Yield & Mastitis Risk',
        desc: 'Dairy cows with low SNF/Fat % or repeat breeding',
        productId: 'avimin-forte',
        note: 'Chelated trace minerals + Live probiotic yeast to enhance rumen fermentation and peak milk letdown.'
      },
      'biosecurity': {
        icon: '🛡️',
        title: 'Shed Biosecurity & Water Purity',
        desc: 'Bacterial biofilm, viral outbreaks, terminal cleaning',
        productId: 'vironic-plus',
        note: 'Glutaraldehyde (15%) + Dual Quats (BKC + DDAC) hospital-grade broad-spectrum pathogen defense.'
      }
    };

    const renderSolution = (symptomKey) => {
      const sym = symptomDatabase[symptomKey];
      if (!sym) return;

      const product = allProducts.find(p => p.id === sym.productId) || allProducts[0];
      const matchTarget = advisorContainer.querySelector('#matchedSolutionTarget');
      if (!matchTarget) return;

      const cleanMsg = encodeURIComponent(`Hello AVIVET Veterinary Advisor,\n\nI have observed the following farm issue: "${sym.title}" (${sym.desc}).\n\nI would like to order "${product.name}" and get dosage advice.`);

      matchTarget.innerHTML = `
        <div class="matched-solution-card">
          <div class="matched-solution-image">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="matched-solution-content">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
              <span class="badge badge-emerald">Recommended Veterinary Protocol</span>
              <span class="badge badge-gold">${product.audience}</span>
            </div>
            <h3>${product.name}</h3>
            <div class="match-tagline">${product.tagline || product.description}</div>
            <p class="match-desc">${sym.note}</p>
            
            <div class="matched-meta-strip">
              <div class="matched-meta-item">
                <strong>Target Challenge</strong>
                <span>${sym.title}</span>
              </div>
              <div class="matched-meta-item">
                <strong>Standard Protocol</strong>
                <span>${product.dosage || 'Daily drinking water inclusion'}</span>
              </div>
              <div class="matched-meta-item">
                <strong>Standard Packing</strong>
                <span>${product.pack || 'Commercial Packs'}</span>
              </div>
            </div>

            <div style="display:flex;gap:12px;flex-wrap:wrap;">
              <a class="btn btn-emerald" href="https://wa.me/918367455559?text=${cleanMsg}" target="_blank" rel="noopener">
                💬 Order This Protocol on WhatsApp
              </a>
              <button class="btn btn-outline" style="border-color:rgba(255,255,255,0.4);color:#fff;" onclick="openProductSpecModal('${product.id}')">
                🔍 Full Scientific Specs
              </button>
            </div>
          </div>
        </div>
      `;
    };

    advisorContainer.querySelectorAll('.symptom-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        advisorContainer.querySelectorAll('.symptom-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderSolution(btn.dataset.symptom);
      });
    });

    renderSolution('eggshell');
  };

  // --- Virtual Vet AI Chat Assistant ---
  const initVirtualVetAssistant = () => {
    let fab = document.querySelector('.chat-widget-fab');
    if (!fab) {
      fab = document.createElement('div');
      fab.className = 'chat-widget-fab';
      fab.innerHTML = `
        <button class="chat-fab-btn" aria-label="Open AVIVET Assistant">
          <span class="chat-fab-badge"></span>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </button>
        <div class="chat-window-dialog" role="dialog" aria-labelledby="chatAssistantTitle">
          <div class="chat-dialog-header">
            <div class="chat-header-user">
              <div class="chat-avatar">🩺</div>
              <div>
                <h4 id="chatAssistantTitle">AVIVET Vet Assistant</h4>
                <span class="status-online">Online • Veterinary Desk</span>
              </div>
            </div>
            <button class="search-panel-close chat-close-btn" style="width:32px;height:32px;font-size:1.2rem;" aria-label="Close chat">&times;</button>
          </div>
          <div class="chat-whatsapp-banner">
            <span>Need direct dealer support?</span>
            <a href="https://wa.me/918367455559" target="_blank" rel="noopener">WhatsApp Us ↗</a>
          </div>
          <div class="chat-dialog-body" id="chatDialogMessages">
            <div class="chat-msg bot">
              Hello! 👋 I am your <strong>AVIVET Veterinary & Product Assistant</strong>. How can I assist your poultry farm, dairy unit, or dealership today?
            </div>
          </div>
          <div class="chat-quick-actions">
            <button class="chat-quick-pill" data-prompt="Egg shell quality remedies">🥚 Egg Shell Weakness</button>
            <button class="chat-quick-pill" data-prompt="Best liver tonic for poultry">🌱 Liver Rejuvenation</button>
            <button class="chat-quick-pill" data-prompt="How to become a distributor">🤝 Become a Dealer</button>
            <button class="chat-quick-pill" data-prompt="Dairy milk yield booster">🐄 Boost Milk Yield</button>
            <button class="chat-quick-pill" data-prompt="Water sanitation protocol">💧 Water Sanitizer</button>
          </div>
          <div class="chat-dialog-input">
            <input type="text" id="chatUserInput" placeholder="Ask about products, dosage, or dealer terms..." autocomplete="off">
            <button class="chat-send-btn" id="chatSendBtn" aria-label="Send message">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(fab);

      const chatBtn = fab.querySelector('.chat-fab-btn');
      const dialog = fab.querySelector('.chat-window-dialog');
      const closeBtn = fab.querySelector('.chat-close-btn');
      const msgBox = fab.querySelector('#chatDialogMessages');
      const input = fab.querySelector('#chatUserInput');
      const sendBtn = fab.querySelector('#chatSendBtn');

      chatBtn.addEventListener('click', () => dialog.classList.toggle('active'));
      closeBtn.addEventListener('click', () => dialog.classList.remove('active'));

      const knowledgeBase = [
        {
          keys: ['egg', 'shell', 'calcium', 'broken', 'rickets', 'layer'],
          reply: "For weak or soft eggshells and bone strength, we recommend <strong>AV-CAL GOLD</strong> (Liquid Calcium 3500mg + D3) or <strong>AV-CAL GOLD GRANULES</strong> for feed mixing. Dosage: 50 ml per 100 layer birds daily in drinking water."
        },
        {
          keys: ['liver', 'tonic', 'fcr', 'growth', 'toxin', 'appetite'],
          reply: "For liver protection and rapid FCR recovery, our flagship formulation is <strong>AV-LIVER PRO</strong>. It clears mycotoxins and rejuvenates liver cells. Dosage: 5-10 ml / 100 birds for 5-7 days."
        },
        {
          keys: ['dealer', 'distributor', 'partnership', 'margin', 'franchise', 'dealership'],
          reply: "We offer attractive profit margins, exclusive territory rights, and marketing support for registered dealers and distributors. You can apply directly on our <a href='dealer.html' style='color:var(--emerald);font-weight:700;text-decoration:underline;'>Dealer Enquiry Page</a> or WhatsApp +91 83674 55559."
        },
        {
          keys: ['milk', 'dairy', 'cattle', 'cow', 'buffalo', 'snf', 'fat', 'mastitis'],
          reply: "For dairy cattle and buffaloes, we recommend <strong>AVIMIN FORTE</strong> (Chelated Minerals + Live Probiotic Yeast) to boost milk yield by 1.5-2.5L and <strong>AV-CAL GOLD (Cattle)</strong> with Shatavari & Jivanti."
        },
        {
          keys: ['water', 'sanitizer', 'acidvic', 'disinfectant', 'biofilm', 'biosecurity'],
          reply: "For drinking water line sanitization and gut acid balance, use <strong>ACIDVIC</strong> (1 ml / 4-5 Litres of water). For shed and aerial biosecurity, use hospital-grade <strong>VIRONIC PLUS</strong>."
        },
        {
          keys: ['respiratory', 'crd', 'cough', 'wheezing', 'phlegm', 'coryza', 'aziforte', 'enroflox'],
          reply: "For chronic respiratory infections (CRD/CCRD), we recommend <strong>AZIFORTE-BH</strong> (Azithromycin + Bromhexine) or <strong>ENROFLOXAVET-BH</strong> (Enrofloxacin 200mg + Bromhexine) for swift mucosal clearing."
        },
        {
          keys: ['heat', 'summer', 'stress', 'panting', 'avisel', 'antioxidant'],
          reply: "To safeguard birds from extreme heat stress, administer <strong>AVISEL-ZE & AVISEL-E</strong> (Vitamin E + Selenium + Zinc) to prevent cellular oxidation and drop in hatchability."
        }
      ];

      const handleUserChat = (text) => {
        const query = text.trim();
        if (!query) return;

        const userDiv = document.createElement('div');
        userDiv.className = 'chat-msg user';
        userDiv.textContent = query;
        msgBox.appendChild(userDiv);
        input.value = '';
        msgBox.scrollTop = msgBox.scrollHeight;

        setTimeout(() => {
          const lower = query.toLowerCase();
          let matched = knowledgeBase.find(kb => kb.keys.some(k => lower.includes(k)));
          const botReply = matched ? matched.reply : 
            "Thank you for contacting AVIVET Animal Health! For detailed technical dosing, pricing, or custom flock consultations, click below to chat with our veterinary coordinator on WhatsApp (+91 83674 55559).";

          const botDiv = document.createElement('div');
          botDiv.className = 'chat-msg bot';
          botDiv.innerHTML = botReply;
          msgBox.appendChild(botDiv);
          msgBox.scrollTop = msgBox.scrollHeight;
        }, 500);
      };

      sendBtn.addEventListener('click', () => handleUserChat(input.value));
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleUserChat(input.value);
      });

      fab.querySelectorAll('.chat-quick-pill').forEach(pill => {
        pill.addEventListener('click', () => handleUserChat(pill.dataset.prompt));
      });
    }
  };

  // --- Scroll Reveal & 3D Tilt Observer ---
  const initMicroInteractions = () => {
    const elementsToReveal = document.querySelectorAll('section, .card, .feature-banner, .cta-box');
    elementsToReveal.forEach(el => el.classList.add('reveal-init'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    elementsToReveal.forEach(el => observer.observe(el));

    document.querySelectorAll('.card, .hero-visual-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((centerX - x) / centerX) * -5;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  };

  // --- Dynamic Hero Segment Switcher ---
  const initHeroSegmentSwitcher = () => {
    const switcher = document.querySelector('.segment-tabs-wrap');
    const heroImg = document.querySelector('#heroDynamicImage');
    const heroTitle = document.querySelector('#heroDynamicTitle');
    const heroLead = document.querySelector('#heroDynamicLead');
    if (!switcher || !heroImg) return;

    const segments = {
      poultry: {
        img: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1200&q=85',
        title: 'Scientific Nutrition.<br><span class="highlight">Peak Flock Vitality.</span>',
        lead: 'High-efficacy poultry therapeutics, gut acidifiers, feed supplements, and calcium formulations engineered for maximum FCR and zero-breakage eggs.'
      },
      dairy: {
        img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=85',
        title: 'Precision Minerals.<br><span class="highlight">Higher Milk Yield.</span>',
        lead: 'Super-fortified chelated mineral mixtures, herbal galactagogues, and high-bioavailability ionic calcium for dairy cows, buffaloes, and livestock.'
      },
      biosecurity: {
        img: 'products/POULTRY_CHICKEN_MEDICINES/vironic_plus.jpeg',
        title: 'Hospital-Grade<br><span class="highlight">Farm Biosecurity.</span>',
        lead: 'Virucidal water sanitizers and triple-active disinfectants safeguarding poultry sheds and livestock farms from viral outbreaks.'
      }
    };

    switcher.querySelectorAll('.segment-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        switcher.querySelectorAll('.segment-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const seg = segments[btn.dataset.segment];
        if (seg) {
          heroImg.src = seg.img;
          if (heroTitle) heroTitle.innerHTML = seg.title;
          if (heroLead) heroLead.textContent = seg.lead;
        }
      });
    });
  };

  // --- Product Catalogue Page Filter & Grid Renderer ---
  const initCataloguePage = () => {
    const grid = document.querySelector('#catalogueProductGrid');
    if (!grid) return;

    const filterContainer = document.querySelector('#catalogueFilters');
    const urlParams = new URLSearchParams(window.location.search);
    let currentFilter = urlParams.get('category') || 'all';

    const renderGrid = (filter) => {
      let filtered = allProducts;
      if (filter !== 'all') {
        filtered = allProducts.filter(p => 
          p.audience.toLowerCase() === filter.toLowerCase() || 
          p.category.toLowerCase() === filter.toLowerCase() ||
          (filter.toLowerCase() === 'feed supplement' && p.category.toLowerCase().includes('feed'))
        );
      }

      grid.innerHTML = filtered.map(p => `
        <div class="card product-card" data-audience="${p.audience}" data-category="${p.category}">
          <div class="product-art-wrap" onclick="openProductSpecModal('${p.id}')">
            <img src="${p.image}" alt="${p.name}" loading="lazy">
          </div>
          <div class="product-meta-row">
            <span class="badge ${p.audience === 'Poultry' ? 'badge-emerald' : 'badge-gold'}">${p.audience}</span>
            <span class="badge badge-cyan">${p.category}</span>
          </div>
          <h3>${p.name}</h3>
          <p class="prod-desc">${p.tagline || p.description}</p>
          <div class="prod-composition">
            <strong>Active Composition</strong>
            ${p.composition ? p.composition.substring(0, 75) + '...' : 'Scientifically formulated veterinary active'}
          </div>
          <div class="product-action-row">
            <button class="btn btn-primary btn-sm" onclick="openProductSpecModal('${p.id}')">
              🔍 View Specs
            </button>
            <button class="btn btn-outline btn-sm request-details" data-product="${p.name}">
              💬 Enquire
            </button>
          </div>
        </div>
      `).join('');
    };

    renderGrid(currentFilter);

    if (filterContainer) {
      filterContainer.querySelectorAll('.product-filter-btn').forEach(btn => {
        if (btn.dataset.filter.toLowerCase() === currentFilter.toLowerCase()) {
          filterContainer.querySelector('.active')?.classList.remove('active');
          btn.classList.add('active');
        }

        btn.addEventListener('click', () => {
          filterContainer.querySelectorAll('.product-filter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          currentFilter = btn.dataset.filter;
          renderGrid(currentFilter);
        });
      });
    }
  };

  // --- Initialize All Advanced Components on DOM Ready ---
  const startApp = async () => {
    await loadProductData();
    initAmbientLighting();
    initSmartSearch();
    initProductSpecModal();
    initDosageCalculator();
    initDiagnosisAdvisor();
    initVirtualVetAssistant();
    initMicroInteractions();
    initHeroSegmentSwitcher();
    initCataloguePage();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp);
  } else {
    startApp();
  }

})();
