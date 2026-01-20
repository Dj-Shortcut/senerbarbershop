import StatusHero from "../components/StatusHero";

export default function Page() {
  return (
    <main className="flex flex-col items-center gap-16">
      {/* Centrale container */}
      <div className="w-full max-w-5xl">
        <StatusHero />

        {/* Prijslijst */}
        <section className="px-5">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Prijslijst
            </h2>

            <ul className="space-y-4 text-lg">
              <li className="flex justify-between">
                <span>Knippen</span>
                <span>€20</span>
              </li>

              <li className="flex justify-between">
                <span>Knippen &amp; Baard</span>
                <span>€30</span>
              </li>

              <li className="flex justify-between">
                <span>Alleen tondeuse</span>
                <span>€15</span>
              </li>

              <li className="flex justify-between">
                <span>Harsen (hete wax)</span>
                <span>€5</span>
              </li>

              <li className="flex justify-between">
                <span>Haar wassen</span>
                <span>€5</span>
              </li>

              <li className="flex justify-between">
                <span>Onder 10 jaar</span>
                <span>€15</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
