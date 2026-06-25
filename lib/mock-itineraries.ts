import type { Itinerary, TripInput } from '@/types'

// ── Helper ──────────────────────────────────────────────────
let _id = 0
const id = () => `act-${++_id}`

// ── PARIS ───────────────────────────────────────────────────
const paris: Itinerary = {
  destination: 'Paris',
  country: 'France',
  currency: 'EUR',
  totalBudget: 1200,
  style: 'cultural',
  centerCoordinates: { lng: 2.3522, lat: 48.8566 },
  zoom: 13,
  bestTimeToVisit: 'April – June or September – October',
  timezone: 'Europe/Paris',
  highlights: ['Eiffel Tower at sunset', 'Louvre Museum', 'Montmartre', 'Seine river cruise'],
  days: [
    {
      day: 1, title: 'Icons & First Impressions', theme: 'The classics', totalCost: 180,
      activities: [
        { id: id(), time: '09:00', name: 'Eiffel Tower', description: 'Book timed tickets in advance. Climb to the second floor for the best panoramic views of Haussmann Paris.', type: 'attraction', coordinates: { lng: 2.2945, lat: 48.8584 }, estimatedCost: 28, currency: 'EUR', duration: '2h', tips: 'Arrive right at opening to beat the crowds.' },
        { id: id(), time: '11:30', name: 'Café de Flore', description: 'Legendary Saint-Germain café. Order a croque-monsieur and a café crème — a Parisian ritual.', type: 'food', coordinates: { lng: 2.3328, lat: 48.8539 }, estimatedCost: 22, currency: 'EUR', duration: '1h' },
        { id: id(), time: '13:00', name: 'Musée du Louvre', description: 'Home to the Mona Lisa, Venus de Milo and 35,000 other works. Focus on one wing to avoid fatigue.', type: 'attraction', coordinates: { lng: 2.3376, lat: 48.8606 }, estimatedCost: 22, currency: 'EUR', duration: '3h', tips: 'Enter via the Richelieu passage to skip queues.' },
        { id: id(), time: '17:00', name: 'Tuileries Garden stroll', description: 'Walk through the formal gardens between the Louvre and Place de la Concorde. Perfect golden hour light.', type: 'nature', coordinates: { lng: 2.3274, lat: 48.8637 }, estimatedCost: 0, currency: 'EUR', duration: '45min' },
        { id: id(), time: '20:00', name: 'Dinner at Bistrot Paul Bert', description: 'Classic Parisian bistro with impeccable steak-frites and an old-school wine list. Reserve ahead.', type: 'food', coordinates: { lng: 2.3790, lat: 48.8527 }, estimatedCost: 55, currency: 'EUR', duration: '2h' },
      ],
    },
    {
      day: 2, title: 'Montmartre & Right Bank', theme: 'Art & cobblestone', totalCost: 140,
      activities: [
        { id: id(), time: '09:00', name: 'Sacré-Cœur Basilica', description: 'Climb to the hilltop basilica for sweeping views across the city before the tour groups arrive.', type: 'attraction', coordinates: { lng: 2.3431, lat: 48.8867 }, estimatedCost: 0, currency: 'EUR', duration: '1h' },
        { id: id(), time: '10:30', name: 'Place du Tertre', description: 'The historic village square where artists set up their easels. Watch portraits being painted in real time.', type: 'attraction', coordinates: { lng: 2.3408, lat: 48.8864 }, estimatedCost: 0, currency: 'EUR', duration: '45min' },
        { id: id(), time: '12:00', name: 'Le Relais de la Butte', description: 'Hidden gem bistro frequented by locals. The terrace overlooks the vineyard — order the plat du jour.', type: 'food', coordinates: { lng: 2.3386, lat: 48.8853 }, estimatedCost: 28, currency: 'EUR', duration: '1h30' },
        { id: id(), time: '14:00', name: 'Centre Pompidou', description: 'The inside-out building houses France\'s largest collection of modern and contemporary art. Don\'t miss the rooftop view.', type: 'attraction', coordinates: { lng: 2.3522, lat: 48.8606 }, estimatedCost: 15, currency: 'EUR', duration: '2h' },
        { id: id(), time: '19:30', name: 'Seine Evening Cruise', description: 'A 1-hour Bateaux Mouches cruise as the city lights up. The illuminated bridges are unmissable.', type: 'attraction', coordinates: { lng: 2.3070, lat: 48.8628 }, estimatedCost: 18, currency: 'EUR', duration: '1h' },
      ],
    },
    {
      day: 3, title: 'Versailles Day Trip', theme: 'Royal grandeur', totalCost: 120,
      activities: [
        { id: id(), time: '08:30', name: 'RER C to Versailles', description: 'Take the RER C from Gare d\'Austerlitz (45 min). Buy a combined palace + gardens ticket at the station.', type: 'transport', coordinates: { lng: 2.3654, lat: 48.8411 }, estimatedCost: 8, currency: 'EUR', duration: '45min' },
        { id: id(), time: '09:30', name: 'Palace of Versailles', description: 'Explore the Hall of Mirrors, King\'s Grand Apartments and Queen\'s suite. The audio guide is excellent.', type: 'attraction', coordinates: { lng: 2.1204, lat: 48.8049 }, estimatedCost: 20, currency: 'EUR', duration: '2h30' },
        { id: id(), time: '12:30', name: 'Versailles Gardens picnic', description: 'Pick up cheese, baguette and wine from a market near the station and picnic by the Grand Canal.', type: 'food', coordinates: { lng: 2.1102, lat: 48.8029 }, estimatedCost: 18, currency: 'EUR', duration: '1h' },
        { id: id(), time: '16:00', name: 'Return + Marais wander', description: 'Back in Paris, explore the Marais district: Place des Vosges, Jewish Quarter, concept stores.', type: 'attraction', coordinates: { lng: 2.3578, lat: 48.8553 }, estimatedCost: 0, currency: 'EUR', duration: '2h' },
        { id: id(), time: '19:30', name: 'L\'As du Fallafel', description: 'The legendary Rue des Rosiers falafel spot. Eat it standing on the street — that\'s the way.', type: 'food', coordinates: { lng: 2.3567, lat: 48.8566 }, estimatedCost: 12, currency: 'EUR', duration: '30min' },
      ],
    },
  ],
}

// ── TOKYO ───────────────────────────────────────────────────
const tokyo: Itinerary = {
  destination: 'Tokyo',
  country: 'Japan',
  currency: 'JPY',
  totalBudget: 180000,
  style: 'cultural',
  centerCoordinates: { lng: 139.6917, lat: 35.6895 },
  zoom: 12,
  bestTimeToVisit: 'March – May (cherry blossom) or October – November',
  timezone: 'Asia/Tokyo',
  highlights: ['Shibuya Crossing', 'Senso-ji Temple', 'teamLab Borderless', 'Tsukiji Outer Market'],
  days: [
    {
      day: 1, title: 'Shinjuku & Shibuya', theme: 'The urban pulse', totalCost: 18000,
      activities: [
        { id: id(), time: '08:00', name: 'Tsukiji Outer Market', description: 'Start with a sushi breakfast at the world\'s most famous fish market. Arrive early for the best selection.', type: 'food', coordinates: { lng: 139.7700, lat: 35.6654 }, estimatedCost: 2500, currency: 'JPY', duration: '1h30' },
        { id: id(), time: '10:00', name: 'teamLab Planets (Toyosu)', description: 'Immersive digital art museum. Book 2 weeks ahead — this sells out constantly.', type: 'attraction', coordinates: { lng: 139.7939, lat: 35.6507 }, estimatedCost: 3200, currency: 'JPY', duration: '2h', tips: 'Wear shorts — you walk through water.' },
        { id: id(), time: '13:30', name: 'Ichiran Ramen Shibuya', description: 'Solo dining in individual booths. Rich tonkotsu broth with customisable firmness and spice level.', type: 'food', coordinates: { lng: 139.7000, lat: 35.6580 }, estimatedCost: 1200, currency: 'JPY', duration: '45min' },
        { id: id(), time: '15:00', name: 'Shibuya Crossing', description: 'Watch the famous scramble from the Starbucks overlooking the crossing, then join the flow.', type: 'attraction', coordinates: { lng: 139.7005, lat: 35.6595 }, estimatedCost: 0, currency: 'JPY', duration: '30min' },
        { id: id(), time: '16:00', name: 'Harajuku Takeshita Street', description: 'Technicolour street fashion, crepe shops and vintage stores. The heartbeat of Japanese youth culture.', type: 'shopping', coordinates: { lng: 139.7027, lat: 35.6716 }, estimatedCost: 3000, currency: 'JPY', duration: '1h30' },
        { id: id(), time: '19:00', name: 'Dinner at Omoide Yokocho', description: '"Memory Lane" — tiny yakitori stalls under the Shinjuku train tracks. Order skewer by skewer with cold Sapporo.', type: 'food', coordinates: { lng: 139.6996, lat: 35.6939 }, estimatedCost: 3500, currency: 'JPY', duration: '2h' },
      ],
    },
    {
      day: 2, title: 'Old Tokyo & Temples', theme: 'Asakusa & Ueno', totalCost: 14000,
      activities: [
        { id: id(), time: '07:00', name: 'Senso-ji Temple at dawn', description: 'Tokyo\'s oldest temple is magical before the crowds arrive. Collect your omikuji fortune slip at the hall.', type: 'attraction', coordinates: { lng: 139.7966, lat: 35.7147 }, estimatedCost: 0, currency: 'JPY', duration: '1h30' },
        { id: id(), time: '09:00', name: 'Nakamise-dori shopping', description: 'The 250m approach to Senso-ji lined with traditional crafts, sembei crackers and ningyo dolls.', type: 'shopping', coordinates: { lng: 139.7961, lat: 35.7128 }, estimatedCost: 2000, currency: 'JPY', duration: '45min' },
        { id: id(), time: '11:00', name: 'Tokyo National Museum', description: 'Largest collection of Japanese art and archaeology. The Honkan building alone is worth 2 hours.', type: 'attraction', coordinates: { lng: 139.7762, lat: 35.7189 }, estimatedCost: 1000, currency: 'JPY', duration: '2h' },
        { id: id(), time: '14:30', name: 'Yanaka Ginza shopping street', description: 'Old-Tokyo atmosphere preserved. Local shops, cats everywhere, handmade crafts and sweet potato snacks.', type: 'shopping', coordinates: { lng: 139.7685, lat: 35.7278 }, estimatedCost: 1500, currency: 'JPY', duration: '1h' },
        { id: id(), time: '19:00', name: 'Izakaya dinner', description: 'Join salarymen at a neighbourhood izakaya for kushikatsu (breaded skewers), edamame and Asahi draft.', type: 'food', coordinates: { lng: 139.7716, lat: 35.7186 }, estimatedCost: 4000, currency: 'JPY', duration: '2h' },
      ],
    },
  ],
}

// ── NEW YORK ─────────────────────────────────────────────────
const newYork: Itinerary = {
  destination: 'New York',
  country: 'USA',
  currency: 'USD',
  totalBudget: 1800,
  style: 'cultural',
  centerCoordinates: { lng: -73.9857, lat: 40.7484 },
  zoom: 13,
  bestTimeToVisit: 'April – June or September – November',
  timezone: 'America/New_York',
  highlights: ['Central Park', 'MoMA', 'Brooklyn Bridge', 'High Line'],
  days: [
    {
      day: 1, title: 'Midtown & Museum Mile', theme: 'Icons above street level', totalCost: 320,
      activities: [
        { id: id(), time: '08:30', name: 'Ess-a-Bagel', description: 'New York\'s finest hand-rolled bagels. Lox cream cheese on everything bagel — the definitive New York breakfast.', type: 'food', coordinates: { lng: -73.9793, lat: 40.7528 }, estimatedCost: 12, currency: 'USD', duration: '30min' },
        { id: id(), time: '10:00', name: 'Museum of Modern Art (MoMA)', description: 'Starry Night, Les Demoiselles d\'Avignon, The Persistence of Memory — all under one roof. Buy tickets online.', type: 'attraction', coordinates: { lng: -73.9776, lat: 40.7614 }, estimatedCost: 30, currency: 'USD', duration: '3h' },
        { id: id(), time: '14:00', name: 'Central Park', description: 'Walk from 59th to Belvedere Castle, past Strawberry Fields and the Reservoir. Rent a bike for the full loop.', type: 'nature', coordinates: { lng: -73.9654, lat: 40.7829 }, estimatedCost: 15, currency: 'USD', duration: '2h' },
        { id: id(), time: '17:30', name: 'Top of the Rock', description: '360° views from 30 Rock\'s observation deck. Better than Empire State for photographing the skyline — no antenna in the way.', type: 'attraction', coordinates: { lng: -73.9787, lat: 40.7587 }, estimatedCost: 40, currency: 'USD', duration: '1h' },
        { id: id(), time: '20:00', name: 'Dinner at Le Bernardin', description: 'Three Michelin stars. Chef Eric Ripert\'s seafood tasting menu is one of the finest meals in the city.', type: 'food', coordinates: { lng: -73.9824, lat: 40.7614 }, estimatedCost: 185, currency: 'USD', duration: '2h30', tips: 'Reserve 4–6 weeks ahead.' },
      ],
    },
    {
      day: 2, title: 'Brooklyn & Downtown', theme: 'Bridge views and street food', totalCost: 200,
      activities: [
        { id: id(), time: '09:00', name: 'High Line', description: 'Elevated park built on a former rail line. Walk from Gansevoort to 34th Street past public art and Hudson views.', type: 'nature', coordinates: { lng: -74.0048, lat: 40.7480 }, estimatedCost: 0, currency: 'USD', duration: '1h30' },
        { id: id(), time: '11:00', name: 'Chelsea Market', description: 'Indoor food hall in a converted biscuit factory. The Lobster Place, Dickson\'s Farmstand, and Los Tacos No. 1.', type: 'food', coordinates: { lng: -74.0048, lat: 40.7423 }, estimatedCost: 22, currency: 'USD', duration: '1h' },
        { id: id(), time: '13:00', name: 'Brooklyn Bridge walk', description: 'Walk the bridge pedestrian path from Manhattan to Brooklyn — 1.1 miles with landmark views of the harbour.', type: 'attraction', coordinates: { lng: -73.9969, lat: 40.7061 }, estimatedCost: 0, currency: 'USD', duration: '1h' },
        { id: id(), time: '15:00', name: 'DUMBO & Brooklyn Heights', description: 'Cobblestone streets, the Manhattan Bridge framing skyline shots, and indie boutiques on Washington Street.', type: 'attraction', coordinates: { lng: -73.9877, lat: 40.7033 }, estimatedCost: 0, currency: 'USD', duration: '1h30' },
        { id: id(), time: '19:00', name: 'Grimaldi\'s Pizzeria', description: 'Coal-fired brick oven pizza under the Brooklyn Bridge. Iconic thin crust, fresh mozzarella, San Marzano tomatoes.', type: 'food', coordinates: { lng: -73.9933, lat: 40.7026 }, estimatedCost: 35, currency: 'USD', duration: '1h30' },
      ],
    },
  ],
}

// ── BOGOTÁ ───────────────────────────────────────────────────
const bogota: Itinerary = {
  destination: 'Bogotá',
  country: 'Colombia',
  currency: 'COP',
  totalBudget: 800000,
  style: 'cultural',
  centerCoordinates: { lng: -74.0721, lat: 4.7110 },
  zoom: 13,
  bestTimeToVisit: 'December – March or June – August (dry season)',
  timezone: 'America/Bogota',
  highlights: ['La Candelaria', 'Museo del Oro', 'Monserrate', 'Zona Rosa'],
  days: [
    {
      day: 1, title: 'La Candelaria & Gold Museum', theme: 'History and colonial streets', totalCost: 120000,
      activities: [
        { id: id(), time: '09:00', name: 'Museo del Oro', description: 'One of the most important pre-Columbian collections in the world. Over 55,000 gold pieces and the famous Muisca raft.', type: 'attraction', coordinates: { lng: -74.0731, lat: 4.6016 }, estimatedCost: 4000, currency: 'COP', duration: '2h', tips: 'Free on Sundays.' },
        { id: id(), time: '11:30', name: 'La Candelaria walking tour', description: 'Wander the colonial centre: Plaza Bolívar, the Catedral Primada, and the bright street murals in the backstreets.', type: 'attraction', coordinates: { lng: -74.0696, lat: 4.5981 }, estimatedCost: 0, currency: 'COP', duration: '2h' },
        { id: id(), time: '14:00', name: 'Lunch at Andrés Carne de Res (city branch)', description: 'Colombian feast — bandeja paisa, ajiaco soup, and fresh lulada juice in an iconic setting.', type: 'food', coordinates: { lng: -74.0534, lat: 4.6617 }, estimatedCost: 45000, currency: 'COP', duration: '1h30' },
        { id: id(), time: '16:00', name: 'Monserrate by cable car', description: 'Ride up to 3,152m for panoramic views of Bogotá spread across the Sabana. Cathedral and artisan market at the top.', type: 'nature', coordinates: { lng: -74.0556, lat: 4.6036 }, estimatedCost: 23000, currency: 'COP', duration: '2h' },
        { id: id(), time: '20:00', name: 'Dinner at Criterión', description: 'Bogotá\'s most celebrated fine dining. Brothers Jorge and Mark Rausch reinterpret Colombian ingredients with French technique.', type: 'food', coordinates: { lng: -74.0474, lat: 4.6667 }, estimatedCost: 120000, currency: 'COP', duration: '2h' },
      ],
    },
    {
      day: 2, title: 'Usaquén & Zona Rosa', theme: 'Upscale Bogotá', totalCost: 150000,
      activities: [
        { id: id(), time: '10:00', name: 'Usaquén Flea Market (weekends)', description: 'Charming colonial village annexed by the city. Artisan crafts, antiques, and street food every Sunday.', type: 'shopping', coordinates: { lng: -74.0308, lat: 4.6967 }, estimatedCost: 30000, currency: 'COP', duration: '2h' },
        { id: id(), time: '13:00', name: 'Café San Alberto', description: 'Colombia\'s finest specialty coffee roaster. Try a Geisha pour-over from Huila — a revelation for coffee lovers.', type: 'food', coordinates: { lng: -74.0318, lat: 4.6961 }, estimatedCost: 12000, currency: 'COP', duration: '45min' },
        { id: id(), time: '15:00', name: 'Museo Botero', description: 'Free admission to Fernando Botero\'s private collection — his own works plus Picasso, Dalí and Monet.', type: 'attraction', coordinates: { lng: -74.0729, lat: 4.5987 }, estimatedCost: 0, currency: 'COP', duration: '1h30' },
        { id: id(), time: '19:00', name: 'Zona Rosa bar crawl', description: 'Start at a cocktail bar on Calle 82, then follow the music to a salsa club. Bogotá\'s nightlife is underrated.', type: 'attraction', coordinates: { lng: -74.0516, lat: 4.6659 }, estimatedCost: 60000, currency: 'COP', duration: '3h' },
      ],
    },
  ],
}

// ── BARCELONA ────────────────────────────────────────────────
const barcelona: Itinerary = {
  destination: 'Barcelona',
  country: 'Spain',
  currency: 'EUR',
  totalBudget: 1100,
  style: 'cultural',
  centerCoordinates: { lng: 2.1734, lat: 41.3851 },
  zoom: 13,
  bestTimeToVisit: 'May – June or September – October',
  timezone: 'Europe/Madrid',
  highlights: ['Sagrada Família', 'Park Güell', 'La Boqueria', 'Gothic Quarter'],
  days: [
    {
      day: 1, title: 'Gaudí & Gothic Quarter', theme: 'Modernisme and medieval streets', totalCost: 200,
      activities: [
        { id: id(), time: '09:00', name: 'Sagrada Família', description: 'Gaudí\'s unfinished basilica — the most visited building in Spain. Book the tower access for vertigo-inducing views of the city.', type: 'attraction', coordinates: { lng: 2.1744, lat: 41.4036 }, estimatedCost: 32, currency: 'EUR', duration: '2h30', tips: 'Book 2 months ahead. First entry slot is best.' },
        { id: id(), time: '12:00', name: 'La Boqueria Market', description: 'Barcelona\'s iconic covered market on La Rambla. Skip the tourist stalls and head to the back for jamón and pintxos.', type: 'food', coordinates: { lng: 2.1722, lat: 41.3817 }, estimatedCost: 20, currency: 'EUR', duration: '1h' },
        { id: id(), time: '14:00', name: 'Gothic Quarter walk', description: 'Get deliberately lost in the medieval tangle of streets. Find the hidden Roman temple of Augustus inside a courtyard.', type: 'attraction', coordinates: { lng: 2.1768, lat: 41.3827 }, estimatedCost: 0, currency: 'EUR', duration: '2h' },
        { id: id(), time: '17:00', name: 'Barceloneta Beach', description: 'A 20-minute walk from the Gothic Quarter. Swim, then have a cold Estrella Damm watching the sun drop toward the sea.', type: 'nature', coordinates: { lng: 2.1921, lat: 41.3787 }, estimatedCost: 8, currency: 'EUR', duration: '2h' },
        { id: id(), time: '21:00', name: 'Dinner at El Xampanyet', description: 'El Born\'s most beloved bodega — cava by the glass, anchovies, and pan amb tomàquet. Locals-only energy.', type: 'food', coordinates: { lng: 2.1810, lat: 41.3839 }, estimatedCost: 35, currency: 'EUR', duration: '1h30' },
      ],
    },
  ],
}

// ── ROME ─────────────────────────────────────────────────────
const rome: Itinerary = {
  destination: 'Rome',
  country: 'Italy',
  currency: 'EUR',
  totalBudget: 900,
  style: 'cultural',
  centerCoordinates: { lng: 12.4964, lat: 41.9028 },
  zoom: 13,
  bestTimeToVisit: 'April – June or September – October',
  timezone: 'Europe/Rome',
  highlights: ['Colosseum', 'Vatican Museums', 'Trevi Fountain', 'Trastevere'],
  days: [
    {
      day: 1, title: 'Ancient Rome', theme: 'Two thousand years in one day', totalCost: 160,
      activities: [
        { id: id(), time: '08:00', name: 'Colosseum', description: 'The world\'s largest ancient amphitheatre. Pre-book with arena floor access for the full gladiatorial experience.', type: 'attraction', coordinates: { lng: 12.4924, lat: 41.8902 }, estimatedCost: 22, currency: 'EUR', duration: '2h', tips: 'Combine ticket includes Roman Forum and Palatine Hill.' },
        { id: id(), time: '10:30', name: 'Roman Forum & Palatine Hill', description: 'Walk the sacred road where Caesar was cremated. Palatine Hill overlooks both the Circus Maximus and the Forum.', type: 'attraction', coordinates: { lng: 12.4853, lat: 41.8924 }, estimatedCost: 0, currency: 'EUR', duration: '2h' },
        { id: id(), time: '13:30', name: 'Trattoria Luzzi', description: 'No-frills trattoria 100m from the Colosseum. The carbonara and cacio e pepe have fed Romans for 60 years.', type: 'food', coordinates: { lng: 12.4939, lat: 41.8912 }, estimatedCost: 22, currency: 'EUR', duration: '1h' },
        { id: id(), time: '15:30', name: 'Trevi Fountain', description: 'Throw your coin — you\'re statistically likely to return. Visit at midday to avoid the worst crowds.', type: 'attraction', coordinates: { lng: 12.4833, lat: 41.9009 }, estimatedCost: 0, currency: 'EUR', duration: '30min' },
        { id: id(), time: '18:00', name: 'Trastevere evening wander', description: 'Rome\'s most atmospheric neighbourhood. Terracotta buildings, ivy-covered trattorias, live music on the piazzas.', type: 'attraction', coordinates: { lng: 12.4699, lat: 41.8896 }, estimatedCost: 0, currency: 'EUR', duration: '1h30' },
        { id: id(), time: '20:00', name: 'Dinner at Da Enzo al 29', description: 'Trastevere institution. Order the rigatoni all\'amatriciana and the abbacchio al forno. Book weeks ahead.', type: 'food', coordinates: { lng: 12.4711, lat: 41.8893 }, estimatedCost: 40, currency: 'EUR', duration: '2h' },
      ],
    },
    {
      day: 2, title: 'Vatican & Baroque Rome', theme: 'Michelangelo and Bernini', totalCost: 130,
      activities: [
        { id: id(), time: '08:00', name: 'Vatican Museums & Sistine Chapel', description: 'The 4km walk through papal history culminates in Michelangelo\'s ceiling. Book the first 8am slot — smaller crowds.', type: 'attraction', coordinates: { lng: 12.4541, lat: 41.9065 }, estimatedCost: 20, currency: 'EUR', duration: '3h', tips: 'Look up — the Sistine Chapel floor alone is worth studying.' },
        { id: id(), time: '11:30', name: 'St. Peter\'s Basilica & Dome', description: 'Climb the dome (551 steps) for views across the Vatican gardens and Rome. The basilica itself is free.', type: 'attraction', coordinates: { lng: 12.4539, lat: 41.9022 }, estimatedCost: 8, currency: 'EUR', duration: '2h' },
        { id: id(), time: '14:00', name: 'Piazza Navona lunch', description: 'Sit at a café on Bernini\'s baroque masterpiece square. Overpriced by Roman standards but the setting earns it.', type: 'food', coordinates: { lng: 12.4731, lat: 41.8992 }, estimatedCost: 28, currency: 'EUR', duration: '1h' },
        { id: id(), time: '16:00', name: 'Pantheon', description: 'The best-preserved ancient Roman building. The oculus is the only light source — the rain drains through the floor.', type: 'attraction', coordinates: { lng: 12.4769, lat: 41.8986 }, estimatedCost: 5, currency: 'EUR', duration: '1h' },
      ],
    },
  ],
}

// ── DESTINATION MAP ──────────────────────────────────────────
const ITINERARIES: Record<string, Itinerary> = {
  paris: paris,
  france: paris,
  tokyo: tokyo,
  japan: tokyo,
  'new york': newYork,
  nyc: newYork,
  'new york city': newYork,
  usa: newYork,
  bogotá: bogota,
  bogota: bogota,
  colombia: bogota,
  barcelona: barcelona,
  spain: barcelona,
  rome: rome,
  italy: rome,
}

const EMOJIS: Record<string, string> = {
  paris: '🗼', france: '🗼',
  tokyo: '🗾', japan: '🗾',
  'new york': '🗽', nyc: '🗽', 'new york city': '🗽', usa: '🗽',
  bogotá: '🌿', bogota: '🌿', colombia: '🌿',
  barcelona: '🏛️', spain: '🏛️',
  rome: '🏟️', italy: '🏟️',
}

export function generateItinerary(input: TripInput): { itinerary: Itinerary; emoji: string } | null {
  const key = input.destination.toLowerCase().trim()
  const base = ITINERARIES[key]
  if (!base) return null

  // Slice to requested days
  const days = base.days.slice(0, Math.min(input.days, base.days.length))

  // Scale budget by budget level
  const scale = input.budget === 'budget' ? 0.6 : input.budget === 'luxury' ? 1.8 : 1
  const scaled: Itinerary = {
    ...base,
    style: input.style,
    days: days.map(day => ({
      ...day,
      totalCost: Math.round(day.totalCost * scale),
      activities: day.activities.map(act => ({
        ...act,
        estimatedCost: Math.round(act.estimatedCost * scale),
      })),
    })),
    totalBudget: Math.round(days.reduce((s, d) => s + d.totalCost, 0) * scale),
  }

  return { itinerary: scaled, emoji: EMOJIS[key] ?? '🗺️' }
}

export const SUPPORTED_DESTINATIONS = [
  'Paris', 'Tokyo', 'New York', 'Bogotá', 'Barcelona', 'Rome',
]
