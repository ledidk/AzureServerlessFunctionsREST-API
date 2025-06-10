const { app } = require('@azure/functions');

// Sample planet data
let planets = [
  { id: 1, name: "Tatooine", climate: "arid", terrain: "desert", population: 200000 },
  { id: 2, name: "Alderaan", climate: "temperate", terrain: "grasslands, mountains", population: 2000000000 },
  { id: 3, name: "Yavin IV", climate: "temperate, tropical", terrain: "jungle, rainforests", population: 1000 },
  { id: 4, name: "Hoth", climate: "frozen", terrain: "tundra, ice caves, mountain ranges", population: 0 },
  { id: 5, name: "Dagobah", climate: "murky", terrain: "swamp, jungles", population: 0 }
];

app.http('planet', {
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  authLevel: 'function',
  route: 'planet/{id?}',
  handler: async (request, context) => {
    context.log('Planet function processed a request.');
    
    const method = request.method;
    const planetId = request.params.id;
    const query = request.query;
    
    try {
      switch (method) {
        case 'GET':
          if (planetId) {
            // Get specific planet by ID
            const planet = planets.find(p => p.id === parseInt(planetId));
            if (!planet) {
              return {
                status: 404,
                jsonBody: { error: 'Planet not found' }
              };
            }
            return {
              status: 200,
              jsonBody: planet
            };
          } else {
            // Get all planets with optional filtering
            let filteredPlanets = planets;
            
            if (query.name) {
              filteredPlanets = filteredPlanets.filter(p => 
                p.name.toLowerCase().includes(query.name.toLowerCase())
              );
            }
            
            if (query.climate) {
              filteredPlanets = filteredPlanets.filter(p => 
                p.climate.toLowerCase().includes(query.climate.toLowerCase())
              );
            }
            
            if (query.terrain) {
              filteredPlanets = filteredPlanets.filter(p => 
                p.terrain.toLowerCase().includes(query.terrain.toLowerCase())
              );
            }
            
            return {
              status: 200,
              jsonBody: {
                count: filteredPlanets.length,
                planets: filteredPlanets
              }
            };
          }
          
        case 'POST':
          // Create new planet
          const newPlanetData = await request.json();
          const newPlanet = {
            id: Math.max(...planets.map(p => p.id)) + 1,
            name: newPlanetData.name,
            climate: newPlanetData.climate,
            terrain: newPlanetData.terrain,
            population: newPlanetData.population || 0
          };
          planets.push(newPlanet);
          
          return {
            status: 201,
            jsonBody: newPlanet
          };
          
        case 'PUT':
          // Update existing planet
          if (!planetId) {
            return {
              status: 400,
              jsonBody: { error: 'Planet ID is required for update' }
            };
          }
          
          const updateData = await request.json();
          const planetIndex = planets.findIndex(p => p.id === parseInt(planetId));
          
          if (planetIndex === -1) {
            return {
              status: 404,
              jsonBody: { error: 'Planet not found' }
            };
          }
          
          planets[planetIndex] = { ...planets[planetIndex], ...updateData };
          
          return {
            status: 200,
            jsonBody: planets[planetIndex]
          };
          
        case 'DELETE':
          // Delete planet
          if (!planetId) {
            return {
              status: 400,
              jsonBody: { error: 'Planet ID is required for deletion' }
            };
          }
          
          const deleteIndex = planets.findIndex(p => p.id === parseInt(planetId));
          
          if (deleteIndex === -1) {
            return {
              status: 404,
              jsonBody: { error: 'Planet not found' }
            };
          }
          
          const deletedPlanet = planets.splice(deleteIndex, 1)[0];
          
          return {
            status: 200,
            jsonBody: { message: 'Planet deleted successfully', planet: deletedPlanet }
          };
          
        default:
          return {
            status: 405,
            jsonBody: { error: 'Method not allowed' }
          };
      }
    } catch (error) {
      context.log.error('Error in planet function:', error);
      return {
        status: 500,
        jsonBody: { error: 'Internal server error' }
      };
    }
  }
});