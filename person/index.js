const { app } = require('@azure/functions');

// Sample person data
let persons = [
  { id: 1, name: "Luke Skywalker", age: 23, homeworld: "Tatooine" },
  { id: 2, name: "Leia Organa", age: 23, homeworld: "Alderaan" },
  { id: 3, name: "Han Solo", age: 32, homeworld: "Corellia" },
  { id: 4, name: "Obi-Wan Kenobi", age: 57, homeworld: "Stewjon" }
];

app.http('person', {
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  authLevel: 'function',
  route: 'person/{id?}',
  handler: async (request, context) => {
    context.log('Person function processed a request.');
    
    const method = request.method;
    const personId = request.params.id;
    const query = request.query;
    
    try {
      switch (method) {
        case 'GET':
          if (personId) {
            // Get specific person by ID
            const person = persons.find(p => p.id === parseInt(personId));
            if (!person) {
              return {
                status: 404,
                jsonBody: { error: 'Person not found' }
              };
            }
            return {
              status: 200,
              jsonBody: person
            };
          } else {
            // Get all persons with optional filtering
            let filteredPersons = persons;
            
            if (query.name) {
              filteredPersons = filteredPersons.filter(p => 
                p.name.toLowerCase().includes(query.name.toLowerCase())
              );
            }
            
            if (query.homeworld) {
              filteredPersons = filteredPersons.filter(p => 
                p.homeworld.toLowerCase().includes(query.homeworld.toLowerCase())
              );
            }
            
            return {
              status: 200,
              jsonBody: {
                count: filteredPersons.length,
                persons: filteredPersons
              }
            };
          }
          
        case 'POST':
          // Create new person
          const newPersonData = await request.json();
          const newPerson = {
            id: Math.max(...persons.map(p => p.id)) + 1,
            name: newPersonData.name,
            age: newPersonData.age,
            homeworld: newPersonData.homeworld
          };
          persons.push(newPerson);
          
          return {
            status: 201,
            jsonBody: newPerson
          };
          
        case 'PUT':
          // Update existing person
          if (!personId) {
            return {
              status: 400,
              jsonBody: { error: 'Person ID is required for update' }
            };
          }
          
          const updateData = await request.json();
          const personIndex = persons.findIndex(p => p.id === parseInt(personId));
          
          if (personIndex === -1) {
            return {
              status: 404,
              jsonBody: { error: 'Person not found' }
            };
          }
          
          persons[personIndex] = { ...persons[personIndex], ...updateData };
          
          return {
            status: 200,
            jsonBody: persons[personIndex]
          };
          
        case 'DELETE':
          // Delete person
          if (!personId) {
            return {
              status: 400,
              jsonBody: { error: 'Person ID is required for deletion' }
            };
          }
          
          const deleteIndex = persons.findIndex(p => p.id === parseInt(personId));
          
          if (deleteIndex === -1) {
            return {
              status: 404,
              jsonBody: { error: 'Person not found' }
            };
          }
          
          const deletedPerson = persons.splice(deleteIndex, 1)[0];
          
          return {
            status: 200,
            jsonBody: { message: 'Person deleted successfully', person: deletedPerson }
          };
          
        default:
          return {
            status: 405,
            jsonBody: { error: 'Method not allowed' }
          };
      }
    } catch (error) {
      context.log.error('Error in person function:', error);
      return {
        status: 500,
        jsonBody: { error: 'Internal server error' }
      };
    }
  }
});