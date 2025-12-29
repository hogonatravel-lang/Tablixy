export default function LandingPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome to My App</h1>
      <p>Download our app and explore more</p>

      <a href="/app.apk" download>
        <button>Download App</button>
      </a>
    </div>
  );
}
