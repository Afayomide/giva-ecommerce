"use client";

import Image from "next/image";

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative h-[80vh] w-full overflow-hidden">
        <Image
          src="/images/about/hero.jpg"
          alt="The Movement of Gods"
          fill
          className="object-cover brightness-[0.6]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight">
            The Movement of Gods
          </h1>
          <p className="mt-4 text-lg sm:text-xl max-w-2xl">
            Every human is god — some just forgot their divinity.
          </p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-20 space-y-24">
        {/* The Awakening */}
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold uppercase">
            The Awakening
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Every human is god — some just forgot their divinity. We exist to
            remind them. This isn’t just about clothes. It’s about remembering
            who you are. Each fabric, each stitch, each design carries a
            message: you were never small; they just couldn’t see your scale.
          </p>
        </section>

        {/* The Mindset */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <Image
              src="/images/about/mindset.jpg"
              alt="Born from chaos, crowned by mindset"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold uppercase">The Mindset</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Born from chaos, crowned by mindset. We don’t chase validation —
              we define value. Gods don’t follow trends; they set laws. We move
              with rhythm, not noise. Our presence rewrites the hierarchy.
            </p>
          </div>
        </section>

        {/* The Throne */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1 space-y-6">
            <h2 className="text-3xl font-bold uppercase">The Throne</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              The throne isn’t given. It’s taken. And every step you take in our
              pieces is a declaration: you already belong at the top. Your name
              already carries weight — walk heavy and move with purpose.
            </p>
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden order-1 md:order-2">
            <Image
              src="/images/about/throne.jpg"
              alt="The Throne"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          </div>
        </section>

        {/* The Essence */}
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold uppercase">
            The Essence
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Made in the image of greatness — so we are greatness. We wear our
            power, not for attention, but as remembrance. Our pieces are not
            costumes; they are crowns — symbols of legacy, strength, and the
            rebirth of kings and queens.
          </p>
        </section>

        {/* The Movement */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <Image
              src="/images/about/movement.jpg"
              alt="The Movement of Gods"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold uppercase">The Movement</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              This isn’t fashion — it’s a movement of gods. A reminder that your
              energy, your essence, your vision — is the real luxury. Join the
              tribe. Rule your jungle. We don’t blend in — we build our own
              ecosystem.
            </p>
          </div>
        </section>

        {/* Final Call */}
        <section className="text-center max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold uppercase">The Call</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            We are more than a brand. We are a collective consciousness — the
            rebirth of creators and kings. When you wear this, you don’t just
            wear a name. You wear a frequency.
          </p>
          <p className="text-xl font-semibold mt-8 text-foreground uppercase tracking-wide">
            Welcome to the tribe. <br /> Welcome home, god.
          </p>
        </section>
      </div>
    </section>
  );
}
