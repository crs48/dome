import timber from '../assets/concepts/2026-10-human-habitat/01-timber-human-habitat.png';
import bathing from '../assets/concepts/2026-10-human-habitat/02-daylight-bathing.png';
import cutaway from '../assets/concepts/2026-10-human-habitat/03-one-room-cutaway.png';
import exterior from '../assets/concepts/2026-10-human-habitat/04-ceramic-shell-exterior.png';
import mineral from '../assets/concepts/2026-10-human-habitat/05-ceramic-interior.png';
import attachments from '../assets/concepts/2026-10-human-habitat/06-structural-attachment-family.png';
import floor from '../assets/concepts/2026-10-human-habitat/07-floor-systems.png';
import work from '../assets/concepts/2026-10-human-habitat/08-floor-to-standing-work.png';
import evening from '../assets/concepts/2026-10-human-habitat/09-evening-refuge.png';
import commons from '../assets/concepts/2026-10-human-habitat/10-private-dome-shared-land.png';

export const concepts = {
  timber: { image: timber, number: '01', title: 'A habitat for an active body', alt: 'Warm timber dome with an open concrete floor, low bed, rings, kitchen, enclosed toilet, shower and sunlit tub.', caption: 'Daily life around the edge. Possibility in the middle.', note: 'A timber shell study with selective glazing and a compact service zone.' },
  bathing: { image: bathing, number: '02', title: 'Bathing in the light', alt: 'A freestanding tub and curtained shower share a textured wet area beside an opaque toilet enclosure.', caption: 'An open bath. A curtain when you want one. A door where it matters.', note: 'The wet zone needs drainage, waterproofing, a slip-resistant surface and outdoor extraction.' },
  cutaway: { image: cutaway, number: '03', title: 'One room, many ways to live', alt: 'Dollhouse cutaway with cooking, bathing, sleeping and working at the perimeter and movement space in the center.', caption: 'One generous room, with a small private toilet enclosure.', note: 'The toilet ceiling is removed to reveal the compartment in this cutaway. Dimensions and entry details remain exploratory.' },
  exterior: { image: exterior, number: '04', title: 'A shell in a living landscape', alt: 'An ivory faceted mineral dome with triangular windows and a timber entrance in a leafy garden.', caption: 'A sheltered place within a living landscape.', note: 'A bioceramic-inspired appearance, not a rendering of a particular manufacturer’s product.' },
  mineral: { image: mineral, number: '05', title: 'A quieter material language', alt: 'Pale mineral triangular facets, a low slatted bed, a tub, sparse furnishings and a clear concrete floor.', caption: 'Mineral surfaces, soft light, a few things made of wood.', note: 'The assembly and attachment details are conceptual; material performance has not been established by the image.' },
  attachments: { image: attachments, number: '06', title: 'A place to attach things', alt: 'Conceptual geodesic node fitting, suspended planter and shelf, and gymnastic rings on a separate overhead support.', caption: 'A family of fixtures that can change with your life.', note: 'Illustrative, unrated hardware. Human suspension requires a separately engineered load path and clearances.' },
  floor: { image: floor, number: '07', title: 'More than a surface', alt: 'Conceptual concrete floor cutaway showing hydronic loops, insulation, drainage and accessible perimeter services.', caption: 'Thermal mass beneath your feet. Services you can reach.', note: 'An explanatory concept, not a construction section. Reinforcement, moisture layers and service routing need coordinated design.' },
  work: { image: work, number: '08', title: 'Work at your own level', alt: 'Three views of a person using an adjustable desk from a floor cushion, a supported stool and a standing position.', caption: 'A surface for work. More than one way to meet it.', note: 'The height range and lifting mechanism are unprototyped. A low table and separate standing shelf are another option.' },
  evening: { image: evening, number: '09', title: 'A softer kind of evening', alt: 'Warmly lit dome at night with a low futon, curtains, floor cushions and a small table.', caption: 'Draw a curtain. Lower the lights. Make room for rest.', note: 'Curtains offer visual privacy; acoustic separation and bed ventilation need their own design.' },
  commons: { image: commons, number: '10', title: 'A private home, a shared world', alt: 'Three small mineral domes in food gardens linked by paths to a shared timber gathering pavilion.', caption: 'Enough space of your own. More life beyond the door.', note: 'A relationship study, not a site plan. Access, water systems, planting and stewardship depend on place.' },
} as const;

export type ConceptKey = keyof typeof concepts;
export const conceptEntries = Object.entries(concepts) as [ConceptKey, (typeof concepts)[ConceptKey]][];
export const conceptCredit = 'AI-generated design study · October 2026';
