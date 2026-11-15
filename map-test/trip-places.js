"use strict";

const zionShuttle = "https://www.nps.gov/zion/planyourvisit/zion-canyon-shuttle-system.htm";
const zionVisitorPoint = [37.200190, -112.987139];
const rentalPoint = [36.0600882, -115.1657481];
const bryceParking = "https://www.nps.gov/brca/planyourvisit/parking-information.htm";
const bryceWinter = "https://www.nps.gov/brca/planyourvisit/winter.htm";

const guide = (name, id) => [name, "../#guide/" + id];
const overlooksGuide = guide("Bryce Amphitheater overlooks", "bryce-overlooks");

// Points mark the public parking, trailhead, shuttle stop or signed access described in each entry.
const placeGroups = [
  {
    name: "Zion National Park",
    places: [
      {
        name: "Zion Canyon Visitor Center",
        point: zionVisitorPoint,
        details: ["Park here for Zion Canyon Shuttle stop 1.", "Pa’rus and Watchman also start near the visitor center."],
        guides: [guide("Pa’rus Trail", "pa-rus"), guide("Watchman Trail", "watchman")],
        source: zionShuttle,
        sourceLabel: "Zion shuttle information"
      },
      {
        name: "Zion Human History Museum",
        point: [37.2094585, -112.9803756],
        details: ["Zion Canyon Shuttle stop 2 and a short indoor stop.", "Check museum hours before heading out."],
        guides: [guide("Zion Human History Museum", "zion-museum")],
        source: "https://www.nps.gov/places/zion-human-history-museum.htm"
      },
      {
        name: "Zion Lodge",
        point: [37.2498536, -112.9570894],
        details: ["Zion Canyon Shuttle stop 5.", "Use the signed route for Lower and Upper Emerald Pool when access is open."],
        guides: [guide("Lower Emerald Pool", "lower-emerald"), guide("Upper Emerald Pool", "upper-emerald")],
        shuttle: true,
        source: "https://www.nps.gov/places/zion-lodge.htm"
      },
      {
        name: "The Grotto",
        point: [37.2589700, -112.9509699],
        details: ["Zion Canyon Shuttle stop 6 and the West Rim trailhead.", "Start here for Scout Lookout and Angels Landing. The Angels Landing chains require a permit."],
        guides: [guide("Scout Lookout", "scout-lookout"), guide("Angels Landing", "angels-landing")],
        shuttle: true,
        source: "https://www.nps.gov/places/the-grotto-zion.htm"
      },
      {
        name: "Temple of Sinawava",
        point: [37.2851, -112.9476],
        details: ["Zion Canyon Shuttle stop 9 and the start of Riverside Walk.", "The Narrows starts at the end of the paved walk."],
        guides: [guide("Riverside Walk", "riverside-walk"), guide("The Narrows", "narrows")],
        shuttle: true,
        source: "https://www.nps.gov/places/temple-of-sinawava.htm"
      },
      {
        name: "Canyon Overlook trailhead",
        point: [37.2134858, -112.9406179],
        details: ["Trailhead just east of the Zion–Mount Carmel Tunnel.", "About 1 mile round trip. Use a signed parking space."],
        guides: [guide("Canyon Overlook", "canyon-overlook")],
        source: "https://www.nps.gov/thingstodo/hike-canyon-overlook.htm"
      },
      {
        name: "Checkerboard Mesa viewpoint",
        point: [37.2302487, -112.8787483],
        details: ["A signed pullout on UT-9 near Zion’s East Entrance.", "Use this stop for the East Zion scenic drive."],
        guides: [guide("East Zion Scenic Drive", "east-zion")],
        source: "https://www.nps.gov/zion/planyourvisit/maps.htm"
      }
    ]
  },
  {
    name: "Bryce Canyon National Park",
    places: [
      {
        name: "Bryce Canyon Visitor Center",
        point: [37.64026, -112.16964],
        details: ["Start here to check road and trail conditions.", "Continue to the amphitheater overlooks that are open."],
        guides: [overlooksGuide],
        source: bryceWinter
      },
      {
        name: "Sunset Point parking",
        point: [37.6237410929, -112.167067335],
        details: ["Start the paved Rim Walk here.", "Sunrise Point is half a mile away on foot."],
        guides: [guide("Sunset to Sunrise Rim Walk", "bryce-rim")],
        source: bryceParking
      },
      {
        name: "Sunrise Point parking",
        point: [37.6312658742, -112.164479698],
        details: ["Park here to reach Sunrise Point and the Queen’s Garden trail.", "Queen’s Garden is about 1.8 miles round trip."],
        guides: [guide("Queen’s Garden", "bryce-queen")],
        source: bryceParking
      },
      {
        name: "Inspiration Point parking",
        point: [37.615112083, -112.170667914],
        details: ["Optional amphitheater overlook reached by a short walk.", "Check road and trail conditions before adding it to the loop."],
        guides: [overlooksGuide],
        source: bryceParking
      },
      {
        name: "Bryce Point parking",
        point: [37.6039902155, -112.156660557],
        details: ["Overlook and trail access for Peekaboo Loop.", "Allow 3–4 hours for the 5.5-mile loop when the trail and road are open."],
        guides: [guide("Peekaboo Loop", "bryce-peekaboo")],
        source: bryceParking
      },
      {
        name: "Mossy Cave trailhead",
        point: [37.6656539821, -112.11015756],
        details: ["Pull into the signed parking lot on UT-12.", "The streamside walk is about 0.8 mile round trip."],
        guides: [guide("Mossy Cave", "bryce-mossy")],
        source: bryceParking
      }
    ]
  },
  {
    name: "East Zion & Kanab",
    places: [
      {
        name: "Zion Ponderosa Ranch Resort",
        point: [37.2709151, -112.8786942],
        details: ["Resort access is off Twin Knolls Road near Zion’s East Entrance.", "Confirm the exact check-in location with the operator before departure."],
        guides: [guide("East Rim Jeep Tour", "east-rim-jeep")],
        source: "https://eastzionadventures.com/jeep-tours/"
      },
      {
        name: "Coral Pink Sand Dunes State Park",
        point: [37.037264, -112.731447],
        details: ["Start at the state park visitor center.", "Ask about sled rentals and use a slope away from motorized traffic."],
        guides: [guide("Coral Pink Sand Dunes", "coral-pink")],
        source: "https://stateparks.utah.gov/parks/coral-pink/"
      },
      {
        name: "Peek-a-Boo tour meeting point",
        point: [37.1547025, -112.5732474],
        details: ["Meet Razor’s Edge at the trailhead lot off US-89 between mile markers 72 and 73.", "The guided UTV leaves from this parking lot."],
        guides: [guide("Peek-a-Boo Slot Canyon", "peekaboo")],
        source: "https://razorsedgetours.com/faqs"
      },
      {
        name: "Toadstool Hoodoos trailhead",
        point: [37.10129, -111.87321],
        details: ["Start at the signed US-89 trailhead east of Kanab.", "About 1.5 miles round trip."],
        guides: [guide("Toadstool Hoodoos", "toadstools")],
        source: "https://www.visitutah.com/places-to-go/parks-outdoors/grand-staircase-escalante/hiking/the-toadstools"
      },
      {
        name: "Best Friends Welcome Center",
        point: [37.1258416, -112.5440406],
        details: ["Tours begin at the Welcome Center at 5001 Angel Canyon Road, Kanab.", "Check tour times and reserve ahead."],
        guides: [guide("Best Friends Animal Sanctuary", "best-friends")],
        source: "https://bestfriends.org/sanctuary/visit/welcome-center"
      }
    ]
  },
  {
    name: "Las Vegas",
    places: [{
      name: "Harry Reid Rent-A-Car Center",
      point: rentalPoint,
      details: ["7135 Gilespie Street, Las Vegas, NV 89119.", "Take the airport rental shuttle from Terminal 1 or 3."],
      guides: [["Rental car and airport shuttle", "../#logistics/rental"]],
      source: "https://web.hriairport.com/rental-cars",
      sourceLabel: "Airport shuttle pickup"
    }]
  }
];
