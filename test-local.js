// Local testing script for Azure Functions API
const testEndpoints = async () => {
  const baseUrl = 'http://localhost:3000/api';
  
  console.log('🧪 Testing Azure Functions API Endpoints\n');
  
  try {
    // Test GET all persons
    console.log('1. Testing GET /api/person');
    let response = await fetch(`${baseUrl}/person`);
    let data = await response.json();
    console.log(`   Status: ${response.status}`);
    console.log(`   Response: ${JSON.stringify(data, null, 2)}\n`);
    
    // Test GET specific person
    console.log('2. Testing GET /api/person/1');
    response = await fetch(`${baseUrl}/person/1`);
    data = await response.json();
    console.log(`   Status: ${response.status}`);
    console.log(`   Response: ${JSON.stringify(data, null, 2)}\n`);
    
    // Test search person by name
    console.log('3. Testing GET /api/person?name=Luke');
    response = await fetch(`${baseUrl}/person?name=Luke`);
    data = await response.json();
    console.log(`   Status: ${response.status}`);
    console.log(`   Response: ${JSON.stringify(data, null, 2)}\n`);
    
    // Test GET all planets
    console.log('4. Testing GET /api/planet');
    response = await fetch(`${baseUrl}/planet`);
    data = await response.json();
    console.log(`   Status: ${response.status}`);
    console.log(`   Response: ${JSON.stringify(data, null, 2)}\n`);
    
    // Test search planet by climate
    console.log('5. Testing GET /api/planet?climate=arid');
    response = await fetch(`${baseUrl}/planet?climate=arid`);
    data = await response.json();
    console.log(`   Status: ${response.status}`);
    console.log(`   Response: ${JSON.stringify(data, null, 2)}\n`);
    
    // Test POST new person
    console.log('6. Testing POST /api/person');
    response = await fetch(`${baseUrl}/person`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Darth Vader',
        age: 45,
        homeworld: 'Tatooine'
      })
    });
    data = await response.json();
    console.log(`   Status: ${response.status}`);
    console.log(`   Response: ${JSON.stringify(data, null, 2)}\n`);
    
    console.log('✅ All tests completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Make sure the server is running with: npm run dev');
  }
};

// Check if server is running before testing
const checkServer = async () => {
  try {
    const response = await fetch('http://localhost:3000');
    if (response.ok) {
      await testEndpoints();
    }
  } catch (error) {
    console.log('🚨 Server not running. Please start it first with: npm run dev');
    process.exit(1);
  }
};

checkServer();