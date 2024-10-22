import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api')
      .then(response => response.json())
      .then(data => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{data ? data : 'Carregando...'}</p>
      </header>
    </div>
  );
}

export default App;
