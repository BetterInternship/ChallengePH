import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JetBrains_Mono, Open_Sans, Space_Grotesk } from "next/font/google";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Sparkles,
} from "lucide-react";

import { ChallengeTabs } from "@/components/features/challenge/challenge-tabs";
import { cn } from "@/lib/utils";
import {
  challengePhChallenges,
  getChallengeById,
  type ChallengePhChallenge,
} from "@/lib/challenges/data";
import { SuperListingMapBackground } from "@/components/features/super-listing/philippines-infographic-map";

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-challenge-ph-heading",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-challenge-ph-mono",
});

const bodyFont = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-challenge-ph-body",
});

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return challengePhChallenges.map((challenge) => ({
    id: challenge.id,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const challenge = getChallengeById(id);

  if (!challenge) {
    return {
      title: "Challenge PH | BetterInternship",
    };
  }

  return {
    title: `${challenge.shortTitle} | Challenge PH`,
    description: challenge.summary,
  };
}

function DetailRail({ challenge }: { challenge: ChallengePhChallenge }) {
  const details = [
    {
      icon: Sparkles,
      label: "Bounty type",
      value: challenge.rewardType,
    },
    {
      icon: CalendarDays,
      label: "Deadline",
      value: challenge.deadline,
    },
    {
      icon: MapPin,
      label: "Location",
      value: challenge.location,
    },
  ];

  return (
    <aside className="space-y-8">
      <section>
        <p className="[font-family:var(--font-challenge-ph-mono)] text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
          Posted by
        </p>
        <div className="mt-4 space-y-4">
          {challenge.logo ? (
            <Image
              src={challenge.logo}
              alt={`${challenge.host} logo`}
              width={96}
              height={42}
              className="h-auto max-h-8 w-auto max-w-full object-contain"
            />
          ) : null}
          <h2 className="[font-family:var(--font-challenge-ph-heading)] text-xl font-black leading-tight tracking-[-0.04em] text-white">
            {challenge.host}
          </h2>
        </div>
      </section>

      <section>
        <div className="space-y-4">
          {details.map((detail) => {
            return (
              <div key={detail.label} className="flex items-start gap-3">
                <div className="min-w-0">
                  <p className="[font-family:var(--font-challenge-ph-mono)] text-xs uppercase text-white/55">
                    {detail.label}
                  </p>
                  <p
                    className="[font-family:var(--font-challenge-ph-body)] text-sm font-semibold text-white"
                  >
                    {detail.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </aside>
  );
}

export default async function ChallengePage({ params }: PageProps) {
  const { id } = await params;
  const challenge = getChallengeById(id);

  if (!challenge) {
    notFound();
  }

  return (
    <main
      className={cn(
        "min-h-screen overflow-x-hidden bg-[#001138] text-[#081A3A] [font-family:var(--font-challenge-ph-body)]",
        headingFont.variable,
        monoFont.variable,
        bodyFont.variable,
      )}
    >
      <header className="absolute left-0 right-0 top-0 z-50 border-b border-transparent bg-transparent px-5 py-3 shadow-none sm:px-8">
        <div className="relative mx-auto flex h-9 max-w-6xl items-center justify-center">
          <Link
            href="/search"
            className="absolute left-0 inline-flex h-9 w-9 items-center justify-center rounded-[0.33em] text-white/65 transition-colors duration-200 hover:bg-white/10 hover:text-white"
            aria-label="Back to Challenge PH"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="inline-flex items-center gap-2">
            <span className="[font-family:var(--font-challenge-ph-heading)] font-bold text-white">
              Got a problem? Just ChallengePH
            </span>
          </div>
        </div>
      </header>

      <section className="relative isolate overflow-hidden bg-[#001138] px-5 pb-14 pt-24 text-white sm:px-8 sm:pb-18 sm:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(102,194,255,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(102,194,255,0.1)_1px,transparent_1px)] bg-[size:36px_36px] opacity-55 [mask-image:radial-gradient(circle_at_center,#000_0%,transparent_78%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(35,136,255,0.15)_38%,transparent_66%),radial-gradient(circle_at_50%_18%,rgba(35,136,255,0.26),transparent_28rem),radial-gradient(circle_at_12%_88%,rgba(102,194,255,0.16),transparent_24rem)]" />
        <SuperListingMapBackground className="absolute -right-20 top-1/2 hidden w-[58rem] -translate-y-1/2 opacity-[0.16] [mask-image:linear-gradient(to_left,#000_52%,transparent_100%)] sm:block lg:right-[4%] lg:w-[66rem]" />
        <div className="pointer-events-none absolute left-[14%] top-[28%] h-1.5 w-1.5 animate-pulse rounded-full bg-[#66c2ff]/80 shadow-[0_0_12px_rgba(102,194,255,0.65)] [animation-duration:2.8s]" />
        <div className="pointer-events-none absolute right-[20%] top-[34%] h-2 w-2 animate-pulse rounded-full bg-[#2388ff]/75 shadow-[0_0_14px_rgba(35,136,255,0.62)] [animation-delay:0.7s] [animation-duration:3.2s]" />
        <div className="pointer-events-none absolute bottom-[24%] left-[31%] h-1.5 w-1.5 animate-pulse rounded-full bg-white/65 shadow-[0_0_10px_rgba(255,255,255,0.5)] [animation-delay:1.2s] [animation-duration:3.6s]" />
        <div className="pointer-events-none absolute bottom-[18%] right-[34%] h-1 w-1 animate-pulse rounded-full bg-[#8cd3ff]/70 shadow-[0_0_10px_rgba(140,211,255,0.5)] [animation-delay:1.9s] [animation-duration:3s]" />
        <div className="pointer-events-none absolute left-[72%] top-[66%] h-1.5 w-1.5 animate-pulse rounded-full bg-[#66c2ff]/60 shadow-[0_0_10px_rgba(102,194,255,0.45)] [animation-delay:2.4s] [animation-duration:3.8s]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#001138]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-4xl">
            {challenge.logo ? (
              <Image
                src={challenge.logo}
                alt={`${challenge.host} logo`}
                width={104}
                height={42}
                className="mb-6 h-auto max-h-8 w-auto object-contain"
                priority
              />
            ) : null}
            <h1 className="mt-4 [font-family:var(--font-challenge-ph-heading)] text-[clamp(2.1rem,5.5vw,5rem)] font-black leading-[0.98] tracking-[-0.06em] text-[#FFF7E8]">
              {challenge.title}
            </h1>
            <p className="mt-5 max-w-3xl text-balance text-base font-semibold leading-7 text-white/90 sm:text-xl sm:leading-8">
              {challenge.summary}
            </p>
          </div>

          <div className="mt-8 inline-flex flex-col rounded-[0.33em] border border-[#FFF7E8]/22 bg-[#FFF7E8]/10 px-4 py-3 shadow-[0_18px_54px_-44px_rgba(255,247,232,0.55)] backdrop-blur">
            <span className="[font-family:var(--font-challenge-ph-mono)] text-xs font-semibold uppercase tracking-[0.14em] text-[#FFF7E8]/68">
              Reward
            </span>
            <span className="[font-family:var(--font-challenge-ph-heading)] text-2xl font-black leading-tight tracking-[-0.04em] text-[#FFF7E8] sm:text-3xl">
              {challenge.reward}
            </span>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(to_bottom,#001138_0rem,#001138_8rem,#071a36_18rem,#071a36_100%)] px-5 py-8 sm:px-8 sm:py-12">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(13,107,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(13,107,255,0.045)_1px,transparent_1px)] bg-[size:44px_44px] opacity-55 [mask-image:linear-gradient(to_bottom,transparent_0rem,transparent_16rem,#000_28rem)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20rem,rgba(13,107,255,0.12),transparent_18rem),radial-gradient(circle_at_30%_86%,rgba(13,107,255,0.1),transparent_28%),radial-gradient(circle_at_18%_24%,rgba(255,255,255,0.1),transparent_20rem),radial-gradient(circle_at_82%_36%,rgba(255,255,255,0.08),transparent_18rem),radial-gradient(circle_at_62%_78%,rgba(140,211,255,0.08),transparent_22rem)]" />
        <div className="relative mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-10">
          <div className="self-start lg:pt-[3.75rem]">
            <DetailRail challenge={challenge} />
          </div>

          <div className="min-w-0 self-start">
            <ChallengeTabs challenge={challenge} />
          </div>
        </div>
      </section>
    </main>
  );
}
