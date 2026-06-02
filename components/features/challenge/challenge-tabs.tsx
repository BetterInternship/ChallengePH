"use client";

import { type CSSProperties, useEffect, useState } from "react";
import {
  CheckCircle2,
  Flame,
  Radio,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type ChallengePhChallenge } from "@/lib/challenges/data";

type ChallengeTab = "overview" | "leaderboard";

type LeaderboardEntry = {
  teamName: string;
  school: string;
  score: number;
  trend: string;
  stage: string;
  updatedAt: string;
};

function SectionTitle({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="space-y-1">
      {eyebrow ? (
        <p className="[font-family:var(--font-challenge-ph-mono)] text-xs font-semibold uppercase tracking-[0.14em] text-[#0D6BFF]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="[font-family:var(--font-challenge-ph-heading)] text-xl font-black leading-tight tracking-[-0.035em] text-[#081A3A] sm:text-2xl">
        {title}
      </h2>
    </div>
  );
}

function AsteriskList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span className="mt-0.5 shrink-0 [font-family:var(--font-challenge-ph-mono)] text-sm font-semibold leading-6 text-[#0D6BFF]">
            *
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Timeline({ challenge }: { challenge: ChallengePhChallenge }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {challenge.timeline.map((item) => (
        <div
          key={item.label}
          className="rounded-[0.33em] border border-[#dbe6f5] bg-white px-4 py-3"
        >
          <p className="[font-family:var(--font-challenge-ph-mono)] text-[0.68rem] font-semibold uppercase tracking-[0.11em] text-[#28466f]/58">
            {item.label}
          </p>
          <p className="[font-family:var(--font-challenge-ph-heading)] mt-1 text-base font-black tracking-[-0.03em] text-[#081A3A]">
            {item.detail}
          </p>
        </div>
      ))}
    </div>
  );
}

function getLeaderboardEntries(
  challenge: ChallengePhChallenge,
): LeaderboardEntry[] {
  const entries = [
    {
      teamName: "Signal Studio",
      school: "Ateneo de Manila University",
      score: 96,
      trend: "+4.8",
      stage: "Prototype review",
      updatedAt: "2m ago",
    },
    {
      teamName: "Northstar Ops",
      school: "De La Salle University",
      score: 92,
      trend: "+3.1",
      stage: "Judge shortlist",
      updatedAt: "11m ago",
    },
    {
      teamName: "Buildfield",
      school: "University of the Philippines",
      score: 89,
      trend: "+2.4",
      stage: "Demo submitted",
      updatedAt: "24m ago",
    },
    {
      teamName: "Loopworks",
      school: "Mapua University",
      score: 86,
      trend: "+1.9",
      stage: "Mentor feedback",
      updatedAt: "39m ago",
    },
    {
      teamName: "Quiet Systems",
      school: "University of Santo Tomas",
      score: 83,
      trend: "+1.2",
      stage: "Draft under review",
      updatedAt: "53m ago",
    },
    {
      teamName: "Formflow",
      school: "Far Eastern University",
      score: 81,
      trend: "+0.9",
      stage: "Workflow updated",
      updatedAt: "1h ago",
    },
    {
      teamName: "Maya Labs",
      school: "Technological Institute of the Philippines",
      score: 79,
      trend: "+0.7",
      stage: "Research added",
      updatedAt: "1h ago",
    },
    {
      teamName: "Clear Queue",
      school: "Polytechnic University of the Philippines",
      score: 77,
      trend: "+0.5",
      stage: "Screens refined",
      updatedAt: "2h ago",
    },
    {
      teamName: "Studio Sampaguita",
      school: "University of San Carlos",
      score: 75,
      trend: "+0.4",
      stage: "Pitch reviewed",
      updatedAt: "2h ago",
    },
    {
      teamName: "Opsprint",
      school: "National University",
      score: 73,
      trend: "+0.2",
      stage: "Submission opened",
      updatedAt: "3h ago",
    },
  ];

  return entries.map((entry, index) => ({
    ...entry,
    score: Math.max(72, entry.score - (challenge.id.length % 4) * index),
  }));
}

function OverviewTab({ challenge }: { challenge: ChallengePhChallenge }) {
  return (
    <div className="space-y-5 rounded-[0.33em] border border-[#dbe6f5] bg-white p-5 text-[#081A3A] shadow-[0_24px_78px_-66px_rgba(8,26,58,0.72)] sm:p-6">
      <section className="space-y-3.5">
        <SectionTitle eyebrow="Problem" title="What needs solving" />
        <p className="text-sm font-semibold leading-7 text-[#28466f] sm:text-[0.95rem]">
          {challenge.problem}
        </p>
      </section>

      <section className="space-y-3.5 border-t border-[#dbe6f5] pt-5">
        <SectionTitle eyebrow="Why it matters" title="The Philippine context" />
        <p className="text-sm font-semibold leading-7 text-[#28466f] sm:text-[0.95rem]">
          {challenge.whyItMatters}
        </p>
      </section>

      <section className="space-y-3.5 border-t border-[#dbe6f5] pt-5">
        <SectionTitle eyebrow="Challenge brief" title="Your task" />
        <AsteriskList items={challenge.brief} />
      </section>

      <section className="space-y-3.5 border-t border-[#dbe6f5] pt-5">
        <SectionTitle eyebrow="Output" title="What to submit" />
        <AsteriskList items={challenge.deliverables} />
      </section>

      <section className="space-y-3.5 border-t border-[#dbe6f5] pt-5">
        <SectionTitle eyebrow="Eligibility" title="Who can join" />
        <AsteriskList items={challenge.eligibility} />
      </section>

      <section className="space-y-3.5 border-t border-[#dbe6f5] pt-5">
        <SectionTitle eyebrow="Timeline" title="Important dates" />
        <Timeline challenge={challenge} />
      </section>

      <section className="space-y-3.5 border-t border-[#dbe6f5] pt-5">
        <SectionTitle
          eyebrow="Judging"
          title="How strong submissions stand out"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {challenge.judgingCriteria.map((criterion) => (
            <div
              key={criterion}
              className="flex gap-3 rounded-[0.33em] border border-[#dbe6f5] bg-[#f7fbff] px-4 py-3"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0D6BFF]" />
              <p className="text-sm font-semibold leading-6 text-[#28466f]">
                {criterion}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[0.33em] border border-[#0D6BFF]/20 bg-[#eef7ff] p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl space-y-2">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-[#0D6BFF]" />
              <h2 className="[font-family:var(--font-challenge-ph-heading)] text-xl font-black tracking-[-0.035em] text-[#081A3A]">
                Build for the brief, not for a resume screen.
              </h2>
            </div>
            <p className="text-sm font-semibold leading-6 text-[#28466f]">
              This placeholder page is focused on understanding the problem and
              reward. Submission actions can be added once the final Challenge
              PH flow is ready.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function LeaderboardTab({ challenge }: { challenge: ChallengePhChallenge }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTick((currentTick) => currentTick + 1);
    }, 2600);

    return () => window.clearInterval(interval);
  }, []);

  const getLiveEntries = (currentTick: number) =>
    getLeaderboardEntries(challenge)
      .map((entry, index) => {
        const pulse =
          ((currentTick + index * 3 + challenge.id.length) % 9) - 3;
        const score = Math.max(68, Math.min(99, entry.score + pulse));

        return {
          ...entry,
          score,
          trend:
            pulse > 0 ? `+${pulse}.${(index + currentTick) % 9}` : entry.trend,
          updatedAt:
            currentTick % 3 === index % 3
              ? "just now"
              : currentTick % 4 === index % 4
                ? "1m ago"
                : entry.updatedAt,
        };
      })
      .sort((firstEntry, secondEntry) => secondEntry.score - firstEntry.score)
      .map((entry, index) => ({
        ...entry,
        rank: index + 1,
      }));

  const previousEntries = getLiveEntries(Math.max(0, tick - 1));
  const previousRanks = new Map(
    previousEntries.map((entry) => [entry.teamName, entry.rank]),
  );
  const entries = getLiveEntries(tick).map((entry) => {
    const previousRank = tick === 0 ? entry.rank : previousRanks.get(entry.teamName) ?? entry.rank;
    const moveDelta = previousRank - entry.rank;

    return {
      ...entry,
      moveDelta,
      hasClimbed: moveDelta > 0,
      isFresh: entry.updatedAt === "just now",
    };
  });

  return (
    <>
      <Card className="overflow-hidden rounded-[0.33em] border-[#dbe6f5] bg-white p-0 text-[#081A3A] shadow-[0_24px_78px_-66px_rgba(8,26,58,0.72)]">
        <div className="px-5 py-5 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Radio className="h-4 w-4 text-[#0D6BFF]" />
                <p className="[font-family:var(--font-challenge-ph-mono)] text-[0.68rem] font-semibold uppercase tracking-[0.11em] text-[#5E7392]">
                  Live leaderboard
                </p>
              </div>
              <p className="[font-family:var(--font-challenge-ph-heading)] mt-2 text-2xl font-black tracking-[-0.04em] text-[#081A3A]">
                {challenge.shortTitle}
              </p>
            </div>
            <div className="flex gap-5 text-sm font-bold text-[#5E7392]">
              <p>
                <span className="text-[#081A3A]">{entries.length + 14}</span>{" "}
                active teams
              </p>
              <p>
                <span className="text-[#081A3A]">{7 + (tick % 4)}</span> new
                moves today
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#dbe6f5]">
          {entries.map((entry) => {
            return (
              <div
                key={`${entry.teamName}-${tick}`}
                className={cn(
                  "leaderboard-row-move grid gap-3 border-b border-[#e8eef6] px-5 py-4 transition-colors last:border-b-0 hover:bg-[#f8fbff] sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center sm:px-6",
                  entry.hasClimbed && "leaderboard-row-climbed",
                )}
                style={
                  {
                    "--leaderboard-move-y": `${entry.moveDelta * 76}px`,
                  } as CSSProperties
                }
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.33em] text-sm font-black transition-transform",
                      entry.hasClimbed && "leaderboard-rank-up",
                    )}
                    style={{
                      backgroundColor:
                        entry.rank <= 3 ? `${challenge.accent}14` : "#f1f6fc",
                      color: entry.rank <= 3 ? challenge.accent : "#5E7392",
                    }}
                  >
                    {entry.rank}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="[font-family:var(--font-challenge-ph-heading)] text-base font-black tracking-[-0.03em] text-[#081A3A]">
                        {entry.teamName}
                      </p>
                      {entry.rank <= 3 ? (
                        <span className="inline-flex items-center gap-1 [font-family:var(--font-challenge-ph-mono)] text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-[#5E7392]">
                          <Flame className="h-3 w-3 text-[#F59E0B]" />
                          Trending
                        </span>
                      ) : null}
                      {entry.hasClimbed ? (
                        <span
                          className="leaderboard-up-chip [font-family:var(--font-challenge-ph-mono)] text-[0.62rem] font-semibold uppercase tracking-[0.1em]"
                          style={{ color: challenge.accent }}
                        >
                          Up {entry.moveDelta}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-sm font-semibold text-[#5E7392]">
                      {entry.school}
                    </p>
                    <p className="mt-1 text-xs font-bold text-[#6B7F9B]">
                      Latest: {entry.stage}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 sm:block sm:text-right">
                  <div>
                    <p
                      className="[font-family:var(--font-challenge-ph-mono)] text-[0.62rem] font-semibold uppercase tracking-[0.1em]"
                      style={{ color: challenge.accent }}
                    >
                      {entry.trend}
                    </p>
                    <p
                      className={cn(
                        "[font-family:var(--font-challenge-ph-heading)] text-2xl font-black tracking-[-0.04em] text-[#081A3A]",
                        entry.moveDelta !== 0 && "leaderboard-score-live",
                      )}
                    >
                      {entry.score}
                    </p>
                  </div>
                  <p
                    className="mt-0 text-xs font-semibold sm:mt-1"
                    style={{ color: challenge.accent }}
                  >
                    Updated {entry.updatedAt}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
      <style>{`
        @keyframes leaderboard-row-move {
          0% {
            transform: translateY(var(--leaderboard-move-y));
            z-index: 2;
          }
          70% {
            transform: translateY(-2px);
          }
          100% {
            transform: translateY(0);
            z-index: 1;
          }
        }

        @keyframes leaderboard-rank-up {
          0% {
            transform: translateY(8px) scale(0.96);
          }
          55% {
            transform: translateY(-3px) scale(1.04);
          }
          100% {
            transform: translateY(0) scale(1);
          }
        }

        @keyframes leaderboard-score-live {
          0% {
            transform: translateY(5px);
            opacity: 0.35;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .leaderboard-row-move {
          position: relative;
          animation: leaderboard-row-move 720ms cubic-bezier(0.2, 0.8, 0.2, 1);
          will-change: transform;
        }

        .leaderboard-rank-up {
          animation: leaderboard-rank-up 520ms ease-out;
        }

        .leaderboard-score-live {
          animation: leaderboard-score-live 420ms ease-out;
        }

        .leaderboard-up-chip {
          animation: leaderboard-score-live 420ms ease-out;
        }
      `}</style>
    </>
  );
}

export function ChallengeTabs({
  challenge,
}: {
  challenge: ChallengePhChallenge;
}) {
  const [activeTab, setActiveTab] = useState<ChallengeTab>("overview");

  const tabs = [
    {
      id: "overview" as const,
      label: "Overview",
      icon: Sparkles,
    },
    {
      id: "leaderboard" as const,
      label: "Leaderboard",
      icon: Trophy,
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "inline-flex h-11 items-center gap-2 rounded-[0.33em] px-4 [font-family:var(--font-challenge-ph-heading)] text-sm font-bold transition-colors",
                  isActive
                    ? "bg-white text-[#081A3A] shadow-[0_18px_46px_-32px_rgba(255,255,255,0.75)]"
                    : "text-white hover:bg-white/10 hover:text-white",
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4",
                    isActive ? "opacity-90" : "opacity-80",
                  )}
                />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === "overview" ? (
        <OverviewTab challenge={challenge} />
      ) : (
        <LeaderboardTab challenge={challenge} />
      )}
    </div>
  );
}
