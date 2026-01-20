const STATUS = {
  rustig: {
    label: "Rustig",
    wait: "0–15 min",
    color: "bg-green-400",
  },
  normaal: {
    label: "Normaal",
    wait: "15–30 min",
    color: "bg-yellow-400",
  },
  druk: {
    label: "Druk",
    wait: "30–60 min",
    color: "bg-orange-400",
  },
  zeerDruk: {
    label: "Zeer druk",
    wait: "+60 min",
    color: "bg-red-400",
  },
};

// 👉 kies hier de huidige status
const currentStatus = STATUS.zeerDruk;

export default function StatusHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-contain"
      >
        <source src="/video/hero-alt-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-6 text-center text-white">
        <h1 className="text-4xl font-semibold md:text-5xl">
          Barber Sener
        </h1>

        {/* Status badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm backdrop-blur">
          <span className={`h-2 w-2 rounded-full ${currentStatus.color}`} />
          <span>
            {currentStatus.label} — {currentStatus.wait}
          </span>
        </div>

        {/* Drukte-indicatie */}
        <div className="text-xs text-white/60 leading-relaxed">
          <p className="font-medium text-white/70">
            Drukte-indicatie
          </p>
          <p>
            Wo & Vr namiddag • Za hele dag
            <br />
            Rustiger: Ma & Di
          </p>
        </div>
      </div>
    </section>
  );
}
