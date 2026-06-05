"use client";

import { type CSSProperties, type ReactNode, useEffect, useState } from "react";
import {
  ChevronDown,
  MessageCircleQuestion,
  Radio,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type ChallengePhChallenge } from "@/lib/challenges/data";

type ChallengeTab = "overview" | "application" | "leaderboard" | "faq";

type LeaderboardEntry = {
  teamName: string;
  school: string;
  score: number;
  trend: string;
  stage: string;
  updatedAt: string;
};

type MarkdownBlock =
  | {
      type: "paragraph" | "heading";
      text: string;
    }
  | {
      type: "orderedList" | "unorderedList";
      items: string[];
    };

type MarkdownSection = {
  title: string;
  blocks: MarkdownBlock[];
};

function SectionTitle({ title }: { title: string }) {
  return (
    <div>
      <h2 className="[font-family:var(--font-challenge-ph-heading)] text-xl font-black leading-tight tracking-[-0.035em] text-[#081A3A] sm:text-2xl">
        {title}
      </h2>
    </div>
  );
}

function ToggleSection({
  title,
  children,
  withDivider = true,
  defaultOpen = true,
}: {
  title: string;
  children: ReactNode;
  withDivider?: boolean;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section
      className={cn(
        "space-y-3.5 px-5 sm:px-0",
        withDivider && "border-t border-[#dbe6f5] pt-5",
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full items-start justify-between gap-4 text-left"
        aria-expanded={isOpen}
      >
        <SectionTitle title={title} />
        <ChevronDown
          className={cn(
            "mt-1 h-5 w-5 shrink-0 text-[#5E7392] transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </button>
      {isOpen ? <div>{children}</div> : null}
    </section>
  );
}

function AsteriskList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span className="mt-0.5 shrink-0 [font-family:var(--font-challenge-ph-mono)] text-sm font-semibold leading-6 text-[#0D6BFF]">
            *
          </span>
          <span className="leading-6">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PlainTextList({ items }: { items: readonly string[] }) {
  return (
    <div className="space-y-2.5">
      {items.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </div>
  );
}

function SuccessMetricsList({ items }: { items: readonly string[] }) {
  return (
    <dl className="divide-y divide-[#e8eef6] rounded-[0.33em] border border-[#dbe6f5]">
      {items.map((item) => {
        const [label, ...rest] = item.split(": ");
        const description = rest.join(": ");

        return (
          <div
            key={item}
            className="grid gap-1 px-4 py-3 text-sm leading-6"
          >
            <dt className="[font-family:var(--font-challenge-ph-heading)] font-black tracking-[-0.02em] text-[#081A3A]">
              {label}
            </dt>
            {description ? (
              <dd className="text-[#28466f]">{description}</dd>
            ) : null}
          </div>
        );
      })}
    </dl>
  );
}

function MarkdownText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

function parseOverviewMarkdown(markdown: string): MarkdownSection[] {
  const sections: MarkdownSection[] = [];
  const lines = markdown.split(/\r?\n/);
  let currentSection: MarkdownSection | null = null;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();

    if (!line) continue;

    if (line.startsWith("## ")) {
      currentSection = {
        title: line.slice(3),
        blocks: [],
      };
      sections.push(currentSection);
      continue;
    }

    if (!currentSection) continue;

    if (line.startsWith("### ")) {
      currentSection.blocks.push({
        type: "heading",
        text: line.slice(4),
      });
      continue;
    }

    if (line.startsWith("* ")) {
      const items = [line.slice(2)];

      while (lines[index + 1]?.trim().startsWith("* ")) {
        index += 1;
        items.push(lines[index].trim().slice(2));
      }

      currentSection.blocks.push({
        type: "unorderedList",
        items,
      });
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items = [line.replace(/^\d+\.\s/, "")];

      while (/^\d+\.\s/.test(lines[index + 1]?.trim() ?? "")) {
        index += 1;
        items.push(lines[index].trim().replace(/^\d+\.\s/, ""));
      }

      currentSection.blocks.push({
        type: "orderedList",
        items,
      });
      continue;
    }

    currentSection.blocks.push({
      type: "paragraph",
      text: line,
    });
  }

  return sections;
}

function MarkdownSectionContent({ blocks }: { blocks: MarkdownBlock[] }) {
  return (
    <div className="space-y-3">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h3
              key={`${block.text}-${index}`}
              className="[font-family:var(--font-challenge-ph-heading)] text-xl font-black tracking-[-0.02em] text-[#081A3A]"
            >
              {block.text}
            </h3>
          );
        }

        if (block.type === "orderedList") {
          return (
            <ol
              key={`${block.type}-${index}`}
              className="list-decimal space-y-1.5 pl-5"
            >
              {block.items.map((item) => (
                <li key={item} className="leading-6">
                  <MarkdownText text={item} />
                </li>
              ))}
            </ol>
          );
        }

        if (block.type === "unorderedList") {
          return (
            <ul
              key={`${block.type}-${index}`}
              className="list-disc space-y-1.5 pl-5"
            >
              {block.items.map((item) => (
                <li key={item} className="leading-6">
                  <MarkdownText text={item} />
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p key={`${block.text}-${index}`}>
              <MarkdownText text={block.text} />
            </p>
          );
        }

        return null;
      })}
    </div>
  );
}

function splitMarkdownSections(sections: MarkdownSection[]) {
  const overviewTitles = new Set(["The Problem"]);

  return {
    overview: sections.filter((section) => overviewTitles.has(section.title)),
    application: sections.filter(
      (section) => !overviewTitles.has(section.title),
    ),
  };
}

function OverviewSectionContent({
  paragraphs,
  items,
  subsections,
}: {
  paragraphs?: readonly string[];
  items?: readonly string[];
  subsections?: NonNullable<
    NonNullable<ChallengePhChallenge["overviewSections"]>[number]["subsections"]
  >;
}) {
  return (
    <div className="space-y-3">
      {paragraphs?.length ? <PlainTextList items={paragraphs} /> : null}
      {items?.length ? <AsteriskList items={items} /> : null}
      {subsections?.map((subsection) => (
        <div key={subsection.title} className="space-y-3 pt-2">
          <h3 className="[font-family:var(--font-challenge-ph-heading)] text-lg font-black tracking-[-0.03em] text-[#081A3A]">
            {subsection.title}
          </h3>
          <OverviewSectionContent
            paragraphs={subsection.paragraphs}
            items={subsection.items}
          />
        </div>
      ))}
    </div>
  );
}

function Timeline({ challenge }: { challenge: ChallengePhChallenge }) {
  return (
    <div className="space-y-3">
      {challenge.timeline.map((item) => (
        <div
          key={item.label}
          className="flex flex-col gap-1 border-l-2 border-[#dbe6f5] pl-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
        >
          <p className="[font-family:var(--font-challenge-ph-mono)] text-[0.68rem] font-semibold uppercase tracking-[0.11em] text-[#28466f]/58 sm:min-w-40">
            {item.label}
          </p>
          <p className="[font-family:var(--font-challenge-ph-heading)] text-base font-black tracking-[-0.03em] text-[#081A3A] sm:flex-1">
            {item.detail}
          </p>
        </div>
      ))}
    </div>
  );
}

function WinningCriteriaTable({
  criteria,
}: {
  criteria: NonNullable<ChallengePhChallenge["winningCriteria"]>;
}) {
  return (
    <div className="overflow-hidden rounded-[0.33em] border border-[#dbe6f5]">
      <div className="grid grid-cols-[1fr_4.5rem_1.4fr] bg-[#f7fbff] px-4 py-3 [font-family:var(--font-challenge-ph-mono)] text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[#5E7392]">
        <span>Criteria</span>
        <span className="text-right">Weight</span>
        <span className="pl-4">What we're looking for</span>
      </div>
      {criteria.map((item) => (
        <div
          key={item.criteria}
          className="grid grid-cols-[1fr_4.5rem_1.4fr] border-t border-[#e8eef6] px-4 py-3 text-sm font-semibold leading-6 text-[#28466f]"
        >
          <span className="text-[#081A3A]">{item.criteria}</span>
          <span className="text-right [font-family:var(--font-challenge-ph-heading)] font-black text-[#B77900]">
            {item.weight}
          </span>
          <span className="pl-4">{item.description}</span>
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

function OverviewTab({
  challenge,
  onGoToApplication,
}: {
  challenge: ChallengePhChallenge;
  onGoToApplication: () => void;
}) {
  const markdownSections = challenge.overviewMarkdown
    ? parseOverviewMarkdown(challenge.overviewMarkdown)
    : null;
  const markdownSplit = markdownSections
    ? splitMarkdownSections(markdownSections)
    : null;
  const overviewSections = challenge.overviewSections ?? [
    {
      title: "What needs solving",
      paragraphs: [challenge.problem, challenge.whyItMatters],
    },
  ];

  return (
    <div className="space-y-5 rounded-[0.33em] border border-[#dbe6f5] bg-white py-5 text-[#081A3A] shadow-[0_24px_78px_-66px_rgba(8,26,58,0.72)] sm:p-6">
      {markdownSplit
        ? markdownSplit.overview.map((section, index) => (
            <ToggleSection
              key={section.title}
              title={section.title}
              withDivider={index > 0}
            >
              <MarkdownSectionContent blocks={section.blocks} />
            </ToggleSection>
          ))
        : overviewSections.map((section, index) => (
            <ToggleSection
              key={section.title}
              title={section.title}
              withDivider={index > 0}
            >
              <OverviewSectionContent
                paragraphs={section.paragraphs}
                items={section.items}
                subsections={section.subsections}
              />
            </ToggleSection>
          ))}

      {challenge.winningCriteria ? (
        <ToggleSection title="Winning Criteria" withDivider defaultOpen={false}>
          <WinningCriteriaTable criteria={challenge.winningCriteria} />
        </ToggleSection>
      ) : null}

      {challenge.successMetrics?.length ? (
        <ToggleSection title="Your Objective" withDivider defaultOpen={true}>
          <div className="space-y-4">
            {challenge.objective ? (
              <div>
                <p className="leading-6 text-[#28466f]">
                  {challenge.objective}
                </p>
              </div>
            ) : null}
            <SuccessMetricsList items={challenge.successMetrics} />
          </div>
        </ToggleSection>
      ) : null}

      <ToggleSection title="Important dates">
        <Timeline challenge={challenge} />
      </ToggleSection>

      <section className="rounded-[0.33em] border border-[#B77900]/30 bg-[#fff7df] p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl space-y-2">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-[#B77900]" />
              <h2 className="[font-family:var(--font-challenge-ph-heading)] text-xl font-black tracking-[-0.035em] text-[#081A3A]">
                {challenge.submissionCalloutTitle ??
                  "Ready to submit your approach?"}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onGoToApplication}
            className="inline-flex h-11 items-center justify-center rounded-[0.33em] px-4 [font-family:var(--font-challenge-ph-heading)] text-sm font-bold text-white shadow-[0_18px_46px_-32px_rgba(8,26,58,0.7)] transition-colors"
            style={{ backgroundColor: challenge.accent }}
          >
            Go to application
          </button>
        </div>
      </section>
    </div>
  );
}

function ApplicationTab({ challenge }: { challenge: ChallengePhChallenge }) {
  const markdownSections = challenge.overviewMarkdown
    ? parseOverviewMarkdown(challenge.overviewMarkdown)
    : null;
  const markdownSplit = markdownSections
    ? splitMarkdownSections(markdownSections)
    : null;
  const applicationSections = challenge.overviewSections ?? [
    {
      title: "Your task",
      items: challenge.brief,
    },
    {
      title: "What to submit",
      items: challenge.deliverables,
    },
  ];

  return (
    <div className="space-y-5 rounded-[0.33em] border border-[#dbe6f5] bg-white py-5 text-[#081A3A] shadow-[0_24px_78px_-66px_rgba(8,26,58,0.72)] sm:p-6">
      {markdownSplit
        ? markdownSplit.application.map((section, index) => (
            <ToggleSection
              key={section.title}
              title={section.title}
              withDivider={index > 0}
            >
              <MarkdownSectionContent blocks={section.blocks} />
            </ToggleSection>
          ))
        : applicationSections.map((section, index) => (
            <ToggleSection
              key={section.title}
              title={section.title}
              withDivider={index > 0}
            >
              <OverviewSectionContent
                paragraphs={section.paragraphs}
                items={section.items}
                subsections={section.subsections}
              />
            </ToggleSection>
          ))}

      <section className="rounded-[0.33em] border border-[#B77900]/30 bg-[#fff7df] p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl space-y-2">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-[#B77900]" />
              <h2 className="[font-family:var(--font-challenge-ph-heading)] text-xl font-black tracking-[-0.035em] text-[#081A3A]">
                {challenge.submissionCalloutTitle ??
                  "Ready to submit your approach?"}
              </h2>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center rounded-[0.33em] px-4 [font-family:var(--font-challenge-ph-heading)] text-sm font-bold text-white shadow-[0_18px_46px_-32px_rgba(8,26,58,0.7)] transition-colors"
            style={{ backgroundColor: challenge.accent }}
          >
            Submit entry
          </button>
        </div>
      </section>
    </div>
  );
}

function FaqTab({ challenge }: { challenge: ChallengePhChallenge }) {
  const faqItems = [
    {
      question: "Who can join?",
      answer: challenge.eligibility,
    },
    {
      question: "Do I need a working app to submit?",
      answer: [
        "No. A clear prototype, workflow, service blueprint, or proof of concept is enough if it explains the solution well.",
      ],
    },
    {
      question: "Can teams submit together?",
      answer: challenge.eligibility.filter((item) =>
        item.toLowerCase().includes("team"),
      ).length
        ? challenge.eligibility.filter((item) =>
            item.toLowerCase().includes("team"),
          )
        : ["Yes. Solo builders and small teams can submit."],
    },
    {
      question: "What should the submission focus on?",
      answer: [
        "Focus on the real workflow, who uses it, how it reduces friction, and what would be needed to pilot it with the host.",
      ],
    },
    {
      question: "Can I use mock data?",
      answer: [
        "Yes. Use public, synthetic, or clearly labeled sample data unless you have permission to use real operational data.",
      ],
    },
  ];

  return (
    <div className="rounded-[0.33em] border border-[#dbe6f5] bg-white text-[#081A3A] shadow-[0_24px_78px_-66px_rgba(8,26,58,0.72)]">
      <div className="px-5 py-5 sm:px-6">
        <h2 className="[font-family:var(--font-challenge-ph-heading)] text-2xl font-black tracking-[-0.04em] text-[#081A3A]">
          FAQs
        </h2>
      </div>
      {faqItems.map((item, index) => (
        <FaqItem
          key={item.question}
          question={item.question}
          answer={item.answer}
          withDivider
        />
      ))}
    </div>
  );
}

function FaqItem({
  question,
  answer,
  withDivider,
}: {
  question: string;
  answer: readonly string[];
  withDivider: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      className={cn(
        "px-5 py-4 sm:px-6",
        withDivider && "border-t border-[#dbe6f5]",
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-4 text-left"
        aria-expanded={isOpen}
      >
        <h2 className="[font-family:var(--font-challenge-ph-heading)] text-base font-black tracking-[-0.025em] text-[#081A3A] sm:text-lg">
          {question}
        </h2>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-[#5E7392] transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </button>
      {isOpen ? (
        <div className="mt-3">
          <AsteriskList items={answer} />
        </div>
      ) : null}
    </section>
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
        const pulse = ((currentTick + index * 3 + challenge.id.length) % 9) - 3;
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
    const previousRank =
      tick === 0
        ? entry.rank
        : (previousRanks.get(entry.teamName) ?? entry.rank);
    const moveDelta = previousRank - entry.rank;

    return {
      ...entry,
      moveDelta,
      hasClimbed: moveDelta > 0,
      isFresh: entry.updatedAt === "just now",
    };
  });
  const latestMove = entries
    .filter((entry) => entry.moveDelta !== 0)
    .sort(
      (firstEntry, secondEntry) =>
        Math.abs(secondEntry.moveDelta) - Math.abs(firstEntry.moveDelta),
    )[0];
  const upwardActions = [
    "surged",
    "climbed",
    "jumped",
    "broke through",
    "gained ground",
  ];
  const downwardActions = [
    "dropped",
    "lost ground",
    "fell back",
    "gave up position",
    "slid",
  ];
  const steadyMessages = [
    "The board is steady while teams refine their submissions.",
    "No rank changes this round, but scores are still live.",
    "Standings are holding while the next updates come in.",
  ];
  const activityMessage = latestMove
    ? `${latestMove.teamName} ${
        latestMove.moveDelta > 0
          ? upwardActions[tick % upwardActions.length]
          : downwardActions[tick % downwardActions.length]
      } ${Math.abs(latestMove.moveDelta)} ${
        Math.abs(latestMove.moveDelta) === 1 ? "spot" : "spots"
      } to #${latestMove.rank}.`
    : steadyMessages[tick % steadyMessages.length];

  return (
    <>
      <Card className="overflow-hidden rounded-[0.33em] border-[#dbe6f5] bg-white p-0 text-[#081A3A] shadow-[0_24px_78px_-66px_rgba(8,26,58,0.72)]">
        <div className="px-5 py-5 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Radio className="h-5 w-5" style={{ color: challenge.accent }} />
                <p className="[font-family:var(--font-challenge-ph-heading)] text-2xl font-black tracking-[-0.04em] text-[#081A3A]">
                  Live standings
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-sm font-bold text-[#5E7392]">
              <p>
                <span className="text-[#081A3A]">{entries.length + 14}</span>{" "}
                active teams
              </p>
              <span className="text-[#c9d5e5]">/</span>
              <p>
                <span className="text-[#081A3A]">{7 + (tick % 4)}</span> new
                moves today
              </p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-[#e8eef6] pt-3 text-sm font-semibold text-[#5E7392]">
            <span
              className="[font-family:var(--font-challenge-ph-mono)] text-[0.65rem] font-semibold uppercase tracking-[0.1em] mt-0.5"
              style={{ color: challenge.accent }}
            >
              Recent move
            </span>
            <span className="text-[#28466f]">{activityMessage}</span>
          </div>
        </div>

        <div className="border-t border-[#dbe6f5]">
          <div className="hidden grid-cols-[3.25rem_minmax(0,1fr)_10rem_5rem_5rem] gap-4 bg-[#f7fbff] px-6 py-3 [font-family:var(--font-challenge-ph-mono)] text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[#5E7392] sm:grid">
            <span>Rank</span>
            <span>Team</span>
            <span>Stage</span>
            <span className="text-right">Move</span>
            <span className="text-right">Score</span>
          </div>
          {entries.map((entry) => {
            const isTopThree = entry.rank <= 3;

            return (
              <div
                key={`${entry.teamName}-${tick}`}
                className={cn(
                  "leaderboard-row-move grid gap-3 border-b border-[#e8eef6] px-4 transition-colors last:border-b-0 hover:bg-[#f8fbff] sm:grid-cols-[3.25rem_minmax(0,1fr)_10rem_5rem_5rem] sm:items-center sm:gap-4 sm:px-6",
                  isTopThree ? "py-5" : "py-3",
                  entry.hasClimbed && "leaderboard-row-climbed",
                  entry.moveDelta !== 0 && "leaderboard-row-changed",
                )}
                style={
                  {
                    "--leaderboard-move-y": `${entry.moveDelta * 96}px`,
                    backgroundColor: isTopThree
                      ? `${challenge.accent}0d`
                      : undefined,
                  } as CSSProperties
                }
              >
                <div className="flex items-start justify-between gap-3 sm:block">
                  <div
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.33em] text-sm font-black transition-transform",
                      entry.hasClimbed && "leaderboard-rank-up",
                    )}
                    style={{
                      backgroundColor:
                        isTopThree ? challenge.accent : "#f1f6fc",
                      color: isTopThree ? "#ffffff" : "#5E7392",
                    }}
                  >
                    {entry.rank}
                  </div>
                  <div className="text-right sm:hidden">
                    <p
                      className={cn(
                        "[font-family:var(--font-challenge-ph-heading)] text-2xl font-black tracking-[-0.04em] text-[#081A3A]",
                        isTopThree && "text-3xl",
                        entry.moveDelta !== 0 && "leaderboard-score-live",
                      )}
                    >
                      {entry.score}
                    </p>
                    <p className="text-xs font-semibold text-[#7A8DA8]">
                      {entry.updatedAt}
                    </p>
                  </div>
                </div>

                <div className="min-w-0">
                  <p className="[font-family:var(--font-challenge-ph-heading)] text-base font-black tracking-[-0.03em] text-[#081A3A]">
                    {entry.teamName}
                  </p>
                  <p className="mt-1 truncate text-sm font-semibold text-[#5E7392]">
                    {entry.school}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold sm:block">
                  <span className="rounded-[0.33em] bg-[#f7fbff] px-2 py-1 text-[#6B7F9B] sm:bg-transparent sm:px-0 sm:py-0">
                    {entry.stage}
                  </span>
                  <span className="text-[#7A8DA8] sm:mt-1 sm:block">
                    {entry.updatedAt}
                  </span>
                </div>

                <div
                  className={cn(
                    "leaderboard-up-chip [font-family:var(--font-challenge-ph-mono)] text-xs font-semibold uppercase tracking-[0.1em] sm:text-right",
                    entry.moveDelta === 0 && "text-[#9aabba]",
                  )}
                  style={entry.moveDelta !== 0 ? { color: challenge.accent } : undefined}
                >
                  {entry.moveDelta > 0
                    ? `+${entry.moveDelta}`
                    : entry.moveDelta < 0
                      ? entry.moveDelta
                      : "-"}
                </div>

                <div className="hidden sm:block sm:text-right">
                  <p
                    className={cn(
                      "[font-family:var(--font-challenge-ph-heading)] text-2xl font-black tracking-[-0.04em] text-[#081A3A]",
                      isTopThree && "text-3xl",
                      entry.moveDelta !== 0 && "leaderboard-score-live",
                    )}
                  >
                    {entry.score}
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
          animation: leaderboard-row-move 1200ms cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
        }

        .leaderboard-row-changed {
          animation:
            leaderboard-row-move 1200ms cubic-bezier(0.16, 1, 0.3, 1),
            leaderboard-row-flash 1200ms ease-out;
        }

        @keyframes leaderboard-row-flash {
          0% {
            box-shadow: inset 3px 0 0 ${challenge.accent};
          }
          65% {
            box-shadow: inset 3px 0 0 ${challenge.accent};
          }
          100% {
            box-shadow: inset 0 0 0 transparent;
          }
        }

        .leaderboard-rank-up {
          animation: leaderboard-rank-up 820ms ease-out;
        }

        .leaderboard-score-live {
          animation: leaderboard-score-live 680ms ease-out;
        }

        .leaderboard-up-chip {
          animation: leaderboard-score-live 680ms ease-out;
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
      id: "application" as const,
      label: "Application",
      icon: Target,
    },
    {
      id: "leaderboard" as const,
      label: "Leaderboard",
      icon: Trophy,
    },
    {
      id: "faq" as const,
      label: "FAQ",
      icon: MessageCircleQuestion,
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <div className="gap-2 grid grid-cols-2 grid-rows-auto-fit sm:flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "inline-flex h-11 items-center gap-2 rounded-[0.33em] border bg-transparent px-4 [font-family:var(--font-challenge-ph-heading)] text-sm font-bold transition-colors",
                  isActive
                    ? "border-transparent text-white shadow-[0_18px_46px_-32px_rgba(8,26,58,0.7)]"
                    : "border-white/25 text-white hover:border-white/45 hover:bg-white/10 hover:text-white",
                )}
                style={
                  isActive
                    ? {
                        backgroundColor: challenge.accent,
                      }
                    : undefined
                }
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
        <OverviewTab
          challenge={challenge}
          onGoToApplication={() => setActiveTab("application")}
        />
      ) : activeTab === "application" ? (
        <ApplicationTab challenge={challenge} />
      ) : activeTab === "faq" ? (
        <FaqTab challenge={challenge} />
      ) : (
        <LeaderboardTab challenge={challenge} />
      )}
    </div>
  );
}
