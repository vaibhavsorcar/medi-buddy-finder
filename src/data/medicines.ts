
export interface Medicine {
  id: string;
  name: string;
  composition: string;
  price: number;
  availability: string;
  image: string;
  type: 'tablet' | 'capsule' | 'syrup' | 'injection' | 'cream' | 'drops';
  description?: string;
  usage?: string;
  sideEffects?: string[];
  manufacturer?: string;
  popularityScore?: number; // Higher score means more frequently bought
}

export const medicines: Medicine[] = [
  {
    id: 'dolo650',
    name: 'DOLO 650',
    composition: 'Paracetamol 650mg',
    price: 30,
    availability: 'In Stock',
    image: '/lovable-uploads/92490f7a-fd7a-44cc-a221-49265e903b5e.png',
    type: 'tablet',
    description: 'Used for temporary relief of fever and minor aches and pains.',
    usage: 'Take 1 tablet every 4-6 hours as needed for pain or fever.',
    sideEffects: ['Nausea', 'Stomach pain', 'Loss of appetite'],
    manufacturer: 'Micro Labs Ltd',
    popularityScore: 95
  },
  {
    id: 'crocin500',
    name: 'Crocin 500',
    composition: 'Paracetamol 500mg',
    price: 22,
    availability: 'In Stock',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=300&auto=format&fit=crop',
    type: 'tablet',
    description: 'Used to reduce fever and relieve mild to moderate pain.',
    usage: 'Take 1-2 tablets every 4-6 hours as needed.',
    sideEffects: ['Allergic reactions', 'Skin rash', 'Hepatotoxicity with overdose'],
    manufacturer: 'GSK Pharmaceuticals',
    popularityScore: 92
  },
  {
    id: 'azithral500',
    name: 'Azithral 500',
    composition: 'Azithromycin 500mg',
    price: 125,
    availability: 'In Stock',
    image: 'https://images.unsplash.com/photo-1603807008857-ad66b70431e2?q=80&w=300&auto=format&fit=crop',
    type: 'tablet',
    description: 'An antibiotic used to treat various bacterial infections.',
    usage: 'Take 1 tablet daily for 3-5 days as prescribed.',
    sideEffects: ['Diarrhea', 'Stomach pain', 'Nausea'],
    manufacturer: 'Alembic Pharmaceuticals',
    popularityScore: 75
  },
  {
    id: 'calpol500',
    name: 'Calpol 500',
    composition: 'Paracetamol 500mg',
    price: 25,
    availability: 'In Stock',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=300&auto=format&fit=crop',
    type: 'tablet',
    description: 'Used for relieving pain and reducing fever.',
    usage: 'Take 1-2 tablets every 4-6 hours, maximum 4 doses in 24 hours.',
    sideEffects: ['Nausea', 'Rash', 'Liver damage (with overdose)'],
    manufacturer: 'GSK Pharmaceuticals',
    popularityScore: 85
  },
  {
    id: 'paracip650',
    name: 'Paracip 650',
    composition: 'Paracetamol 650mg',
    price: 35,
    availability: 'Limited Stock',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=300&auto=format&fit=crop',
    type: 'tablet',
    description: 'Used for fever reduction and pain relief.',
    usage: 'Take 1 tablet every 6 hours, not exceeding 4 tablets in 24 hours.',
    sideEffects: ['Allergic reaction', 'Dizziness', 'Abdominal pain'],
    manufacturer: 'Cipla Ltd',
    popularityScore: 80
  },
  {
    id: 'benadryl',
    name: 'Benadryl Cough Syrup',
    composition: 'Diphenhydramine, Ammonium Chloride',
    price: 85,
    availability: 'In Stock',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=300&auto=format&fit=crop',
    type: 'syrup',
    description: 'Used for the temporary relief of cough and cold symptoms.',
    usage: 'Take 10ml three times a day.',
    sideEffects: ['Drowsiness', 'Dry mouth', 'Blurred vision'],
    manufacturer: 'Johnson & Johnson',
    popularityScore: 78
  },
  {
    id: 'allegra120',
    name: 'Allegra 120mg',
    composition: 'Fexofenadine 120mg',
    price: 110,
    availability: 'In Stock',
    image: 'https://images.unsplash.com/photo-1576602975754-fa2a83f63ddb?q=80&w=300&auto=format&fit=crop',
    type: 'tablet',
    description: 'Used to relieve symptoms of seasonal allergies.',
    usage: 'Take 1 tablet daily as needed for allergy symptoms.',
    sideEffects: ['Headache', 'Nausea', 'Dizziness'],
    manufacturer: 'Sanofi India Ltd',
    popularityScore: 72
  },
  {
    id: 'cetrizine10',
    name: 'Cetrizine 10mg',
    composition: 'Cetirizine Hydrochloride 10mg',
    price: 35,
    availability: 'In Stock',
    image: 'https://images.unsplash.com/photo-1550572017-edd951b55074?q=80&w=300&auto=format&fit=crop',
    type: 'tablet',
    description: 'Used to treat allergy symptoms such as sneezing, itching, and runny nose.',
    usage: 'Take 1 tablet daily, preferably at night.',
    sideEffects: ['Drowsiness', 'Dry mouth', 'Fatigue'],
    manufacturer: 'Cipla Ltd',
    popularityScore: 88
  },
  {
    id: 'combiflam',
    name: 'Combiflam',
    composition: 'Ibuprofen 400mg, Paracetamol 325mg',
    price: 42,
    availability: 'In Stock',
    image: 'https://images.unsplash.com/photo-1550572017-edd951b55074?q=80&w=300&auto=format&fit=crop',
    type: 'tablet',
    description: 'Used for relief of pain and inflammation.',
    usage: 'Take 1 tablet every 8 hours after meals.',
    sideEffects: ['Stomach upset', 'Heartburn', 'Dizziness'],
    manufacturer: 'Sanofi India Ltd',
    popularityScore: 90
  },
  {
    id: 'pantop40',
    name: 'Pantop 40',
    composition: 'Pantoprazole 40mg',
    price: 120,
    availability: 'In Stock',
    image: 'https://images.unsplash.com/photo-1550572017-edd951b55074?q=80&w=300&auto=format&fit=crop',
    type: 'tablet',
    description: 'Used to reduce stomach acid production in conditions such as gastric ulcers.',
    usage: 'Take 1 tablet daily before breakfast.',
    sideEffects: ['Headache', 'Diarrhea', 'Stomach pain'],
    manufacturer: 'Alkem Laboratories',
    popularityScore: 65
  },
  {
    id: 'telma40',
    name: 'Telma 40',
    composition: 'Telmisartan 40mg',
    price: 95,
    availability: 'In Stock',
    image: 'https://images.unsplash.com/photo-1576602975754-fa2a83f63ddb?q=80&w=300&auto=format&fit=crop',
    type: 'tablet',
    description: 'Used to treat high blood pressure and heart failure.',
    usage: 'Take 1 tablet daily as prescribed.',
    sideEffects: ['Dizziness', 'Back pain', 'Sinusitis'],
    manufacturer: 'Glenmark Pharmaceuticals',
    popularityScore: 70
  },
  {
    id: 'montair10',
    name: 'Montair 10',
    composition: 'Montelukast 10mg',
    price: 165,
    availability: 'In Stock',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=300&auto=format&fit=crop',
    type: 'tablet',
    description: 'Used to prevent and treat asthma and allergic rhinitis.',
    usage: 'Take 1 tablet daily in the evening.',
    sideEffects: ['Headache', 'Upper respiratory infection', 'Fever'],
    manufacturer: 'Cipla Ltd',
    popularityScore: 62
  }
];

export const getPopularMedicines = (limit: number = 5): Medicine[] => {
  return [...medicines]
    .sort((a, b) => (b.popularityScore || 0) - (a.popularityScore || 0))
    .slice(0, limit);
};

export const getMedicineById = (id: string): Medicine | undefined => {
  return medicines.find(medicine => medicine.id === id);
};

export const getMedicineRecommendations = (query: string, limit: number = 5): Medicine[] => {
  if (!query) return [];
  
  const normalizedQuery = query.toLowerCase();
  return medicines
    .filter(medicine => 
      medicine.name.toLowerCase().includes(normalizedQuery) || 
      medicine.composition.toLowerCase().includes(normalizedQuery)
    )
    .slice(0, limit);
};
