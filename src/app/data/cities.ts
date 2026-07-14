export interface CityInfo {
  slug: string;
  name: string;
  nameFr: string;
  nameEs: string;
  prov: string;
  provFr: string;
  provEs: string;
  blurb: string;
  blurbFr: string;
  blurbEs: string;
}

/** Target city markets for local SEO landing pages (/appraisal/<slug>). */
export const CITIES: CityInfo[] = [
  {
    slug: 'new-york', name: 'New York', nameFr: 'New York', nameEs: 'Nueva York', prov: 'New York', provFr: 'New York', provEs: 'Nueva York',
    blurb: 'From Manhattan co-ops and Brooklyn brownstones to homes in Queens, the Bronx and Staten Island, we cover condos, single-family homes and commercial property across the five boroughs and the greater NYC metro.',
    blurbFr: 'Des coopératives de Manhattan aux maisons de grès de Brooklyn en passant par les résidences du Queens, du Bronx et de Staten Island, nous couvrons les condos, les maisons unifamiliales et les propriétés commerciales dans les cinq arrondissements et toute la région de New York.',
    blurbEs: 'De las cooperativas de Manhattan y las casas de piedra rojiza de Brooklyn a las viviendas de Queens, el Bronx y Staten Island, cubrimos condominios, casas unifamiliares y propiedades comerciales en los cinco distritos y toda el área metropolitana de Nueva York.',
  },
  {
    slug: 'los-angeles', name: 'Los Angeles', nameFr: 'Los Angeles', nameEs: 'Los Ángeles', prov: 'California', provFr: 'Californie', provEs: 'California',
    blurb: 'From Downtown lofts and Hollywood condos to homes in Santa Monica, Pasadena and the San Fernando Valley, we appraise residential and commercial property across Los Angeles County.',
    blurbFr: 'Des lofts du centre-ville aux condos de Hollywood en passant par les maisons de Santa Monica, Pasadena et la vallée de San Fernando, nous évaluons les propriétés résidentielles et commerciales dans tout le comté de Los Angeles.',
    blurbEs: 'De los lofts del centro y los condominios de Hollywood a las casas de Santa Mónica, Pasadena y el Valle de San Fernando, evaluamos propiedades residenciales y comerciales en todo el condado de Los Ángeles.',
  },
  {
    slug: 'chicago', name: 'Chicago', nameFr: 'Chicago', nameEs: 'Chicago', prov: 'Illinois', provFr: 'Illinois', provEs: 'Illinois',
    blurb: 'From Loop high-rises to homes in Lincoln Park, Wicker Park and Hyde Park, we cover condos, classic two-flats and commercial property across Chicagoland.',
    blurbFr: 'Des tours du Loop aux maisons de Lincoln Park, Wicker Park et Hyde Park, nous couvrons les condos, les classiques « two-flats » et les propriétés commerciales dans toute la région de Chicago.',
    blurbEs: 'De los rascacielos del Loop a las casas de Lincoln Park, Wicker Park y Hyde Park, cubrimos condominios, clásicos «two-flats» y propiedades comerciales en toda el área de Chicago.',
  },
  {
    slug: 'houston', name: 'Houston', nameFr: 'Houston', nameEs: 'Houston', prov: 'Texas', provFr: 'Texas', provEs: 'Texas',
    blurb: 'From The Heights and Montrose to Katy, Sugar Land and The Woodlands, we appraise homes, condos and commercial property across the greater Houston area.',
    blurbFr: 'De The Heights et Montrose à Katy, Sugar Land et The Woodlands, nous évaluons maisons, condos et propriétés commerciales dans toute la région de Houston.',
    blurbEs: 'De The Heights y Montrose a Katy, Sugar Land y The Woodlands, evaluamos casas, condominios y propiedades comerciales en toda el área de Houston.',
  },
  {
    slug: 'phoenix', name: 'Phoenix', nameFr: 'Phoenix', nameEs: 'Phoenix', prov: 'Arizona', provFr: 'Arizona', provEs: 'Arizona',
    blurb: 'From Central Phoenix to Scottsdale, Tempe, Mesa and Chandler, we cover single-family homes, vacant land and commercial property across the Valley of the Sun.',
    blurbFr: 'Du centre de Phoenix à Scottsdale, Tempe, Mesa et Chandler, nous couvrons les maisons unifamiliales, les terrains vacants et les propriétés commerciales dans toute la vallée du Soleil.',
    blurbEs: 'Del centro de Phoenix a Scottsdale, Tempe, Mesa y Chandler, cubrimos casas unifamiliares, terrenos y propiedades comerciales en todo el Valle del Sol.',
  },
  {
    slug: 'philadelphia', name: 'Philadelphia', nameFr: 'Philadelphie', nameEs: 'Filadelfia', prov: 'Pennsylvania', provFr: 'Pennsylvanie', provEs: 'Pensilvania',
    blurb: 'From Center City condos to rowhomes in Fishtown, Manayunk and Chestnut Hill, we appraise residential and commercial property across the Philadelphia region.',
    blurbFr: 'Des condos de Center City aux maisons en rangée de Fishtown, Manayunk et Chestnut Hill, nous évaluons les propriétés résidentielles et commerciales dans toute la région de Philadelphie.',
    blurbEs: 'De los condominios de Center City a las casas adosadas de Fishtown, Manayunk y Chestnut Hill, evaluamos propiedades residenciales y comerciales en toda la región de Filadelfia.',
  },
  {
    slug: 'san-antonio', name: 'San Antonio', nameFr: 'San Antonio', nameEs: 'San Antonio', prov: 'Texas', provFr: 'Texas', provEs: 'Texas',
    blurb: 'From Alamo Heights and downtown to Stone Oak and the surrounding Hill Country, we cover homes, land and commercial property across the San Antonio metro.',
    blurbFr: 'D’Alamo Heights et du centre-ville à Stone Oak et au Hill Country environnant, nous couvrons maisons, terrains et propriétés commerciales dans toute la région de San Antonio.',
    blurbEs: 'De Alamo Heights y el centro a Stone Oak y el Hill Country circundante, cubrimos casas, terrenos y propiedades comerciales en toda el área de San Antonio.',
  },
  {
    slug: 'san-diego', name: 'San Diego', nameFr: 'San Diego', nameEs: 'San Diego', prov: 'California', provFr: 'Californie', provEs: 'California',
    blurb: 'From La Jolla and North Park to downtown and Chula Vista, we appraise condos, single-family homes and commercial property across San Diego County.',
    blurbFr: 'De La Jolla et North Park au centre-ville et à Chula Vista, nous évaluons condos, maisons unifamiliales et propriétés commerciales dans tout le comté de San Diego.',
    blurbEs: 'De La Jolla y North Park al centro y Chula Vista, evaluamos condominios, casas unifamiliares y propiedades comerciales en todo el condado de San Diego.',
  },
  {
    slug: 'dallas', name: 'Dallas', nameFr: 'Dallas', nameEs: 'Dallas', prov: 'Texas', provFr: 'Texas', provEs: 'Texas',
    blurb: 'From Uptown and Oak Cliff to Plano, Frisco and the wider DFW metroplex, we cover homes, condos and commercial property across North Texas.',
    blurbFr: 'D’Uptown et Oak Cliff à Plano, Frisco et l’ensemble du métroplexe de Dallas–Fort Worth, nous couvrons maisons, condos et propriétés commerciales dans tout le nord du Texas.',
    blurbEs: 'De Uptown y Oak Cliff a Plano, Frisco y todo el área metropolitana de Dallas–Fort Worth, cubrimos casas, condominios y propiedades comerciales en todo el norte de Texas.',
  },
  {
    slug: 'miami', name: 'Miami', nameFr: 'Miami', nameEs: 'Miami', prov: 'Florida', provFr: 'Floride', provEs: 'Florida',
    blurb: 'From Brickell high-rises and Miami Beach condos to homes in Coral Gables and Wynwood, we appraise residential and commercial property across Miami-Dade County.',
    blurbFr: 'Des tours de Brickell et des condos de Miami Beach aux maisons de Coral Gables et Wynwood, nous évaluons les propriétés résidentielles et commerciales dans tout le comté de Miami-Dade.',
    blurbEs: 'De los rascacielos de Brickell y los condominios de Miami Beach a las casas de Coral Gables y Wynwood, evaluamos propiedades residenciales y comerciales en todo el condado de Miami-Dade.',
  },
  {
    slug: 'atlanta', name: 'Atlanta', nameFr: 'Atlanta', nameEs: 'Atlanta', prov: 'Georgia', provFr: 'Géorgie', provEs: 'Georgia',
    blurb: 'From Buckhead and Midtown to Decatur and Sandy Springs, we cover homes, condos and commercial property across metro Atlanta.',
    blurbFr: 'De Buckhead et Midtown à Decatur et Sandy Springs, nous couvrons maisons, condos et propriétés commerciales dans toute la région d’Atlanta.',
    blurbEs: 'De Buckhead y Midtown a Decatur y Sandy Springs, cubrimos casas, condominios y propiedades comerciales en toda el área de Atlanta.',
  },
  {
    slug: 'boston', name: 'Boston', nameFr: 'Boston', nameEs: 'Boston', prov: 'Massachusetts', provFr: 'Massachusetts', provEs: 'Massachusetts',
    blurb: 'From Back Bay and the South End to Cambridge and Somerville, we appraise brownstones, condos and commercial property across Greater Boston.',
    blurbFr: 'De Back Bay et du South End à Cambridge et Somerville, nous évaluons maisons de grès, condos et propriétés commerciales dans tout le Grand Boston.',
    blurbEs: 'De Back Bay y el South End a Cambridge y Somerville, evaluamos casas de piedra rojiza, condominios y propiedades comerciales en todo el Gran Boston.',
  },
  {
    slug: 'seattle', name: 'Seattle', nameFr: 'Seattle', nameEs: 'Seattle', prov: 'Washington', provFr: 'Washington', provEs: 'Washington',
    blurb: 'From Capitol Hill and Ballard to Queen Anne and Bellevue, we cover homes, condos and commercial property across the Puget Sound region.',
    blurbFr: 'De Capitol Hill et Ballard à Queen Anne et Bellevue, nous couvrons maisons, condos et propriétés commerciales dans toute la région de Puget Sound.',
    blurbEs: 'De Capitol Hill y Ballard a Queen Anne y Bellevue, cubrimos casas, condominios y propiedades comerciales en toda la región de Puget Sound.',
  },
  {
    slug: 'denver', name: 'Denver', nameFr: 'Denver', nameEs: 'Denver', prov: 'Colorado', provFr: 'Colorado', provEs: 'Colorado',
    blurb: 'From LoDo and Cherry Creek to the Highlands and Aurora, we appraise homes, condos and land across the Denver metro and Front Range.',
    blurbFr: 'De LoDo et Cherry Creek aux Highlands et à Aurora, nous évaluons maisons, condos et terrains dans toute la région de Denver et du Front Range.',
    blurbEs: 'De LoDo y Cherry Creek a los Highlands y Aurora, evaluamos casas, condominios y terrenos en toda el área de Denver y el Front Range.',
  },
  {
    slug: 'washington-dc', name: 'Washington, D.C.', nameFr: 'Washington, D.C.', nameEs: 'Washington, D.C.', prov: 'District of Columbia', provFr: 'District de Columbia', provEs: 'Distrito de Columbia',
    blurb: 'From Georgetown and Capitol Hill to Dupont Circle and the Northern Virginia and Maryland suburbs, we cover rowhomes, condos and commercial property across the DMV.',
    blurbFr: 'De Georgetown et Capitol Hill à Dupont Circle et aux banlieues de Virginie du Nord et du Maryland, nous couvrons maisons en rangée, condos et propriétés commerciales dans toute la région de Washington (DMV).',
    blurbEs: 'De Georgetown y Capitol Hill a Dupont Circle y los suburbios del norte de Virginia y Maryland, cubrimos casas adosadas, condominios y propiedades comerciales en toda la región de Washington (DMV).',
  },
];

/** Lookup map by slug for the city landing pages. */
export const CITY_BY_SLUG: Record<string, CityInfo> = CITIES.reduce((acc, c) => {
  acc[c.slug] = c;
  return acc;
}, {} as Record<string, CityInfo>);
