export default function EmergencyTest() {
  return (
    <html>
      <body style={{ margin: 0, padding: 20, background: '#4CAF50', color: 'white', fontFamily: 'Arial' }}>
        <h1>?? EMERGENCY TEST PAGE</h1>
        <p>If you see this, basic Next.js is working!</p>
        <p>Backend connection: PENDING...</p>
        <div id="status">Loading...</div>
        <script dangerouslySetInnerHTML={{__html: `
          fetch('http://localhost:4001/api/candidates?limit=1')
            .then(r => r.json())
            .then(data => {
              document.getElementById('status').innerHTML = '? Backend Connected: ' + data.data.length + ' candidates';
            })
            .catch(err => {
              document.getElementById('status').innerHTML = '? Backend Error: ' + err.message;
            });
        `}} />
      </body>
    </html>
  );
}
