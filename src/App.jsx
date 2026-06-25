import Fork from "./sections/03-Fork/Fork";

function App() {
  return (
    <>
      <Fork />

      <section
        id="institution-track"
        className="h-screen bg-stone flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-5xl font-display text-ink mb-4">
            Institution Track
          </h2>
          <p className="text-slate">
            Placeholder for institution-specific sections
          </p>
        </div>
      </section>

      <section
        id="family-track"
        className="h-screen bg-parchment flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-5xl font-display text-ink mb-4">
            Family Track
          </h2>
          <p className="text-slate">
            Placeholder for family-specific sections
          </p>
        </div>
      </section>
    </>
  );
}

export default App;