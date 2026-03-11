---
id: Weekly News 11th March 2026
title: Build LLM from scratch Part 2 (Embeddings)
tags: [LLM, GenAI, Embeddings]
category: llm-from-scratch
created: 2026-03-11
updated: 2026-03-11
---

# GEN AI WEEKLY

### The Intelligence Briefing for People Who Build with AI

**March 9–15, 2026** · Published by [@genaiweekly](https://instagram.com/genaiweekly)

---

This week, the generative AI story stopped being purely about capabilities and became unmistakably political. Anthropic took the U.S. government to court. OpenAI shipped an agent that hunts software vulnerabilities at machine scale. And Apple — finally, really — confirmed that the Siri you've been waiting for is nearly here, and it runs on Google's brain. Three stories. Three inflection points. Let's get into it.

---

## Story 1: Anthropic vs. The Pentagon — AI Safety Goes to Federal Court

### The Standoff That Changed Everything

When Dario Amodei drew two firm red lines — no mass surveillance of Americans, no fully autonomous lethal weapons — the Pentagon's response was swift and unprecedented: it labeled Anthropic a **"supply-chain risk."** On March 9, Anthropic filed two federal lawsuits to fight back.

The designation, typically reserved for companies linked to foreign adversaries like China or Russia, now applies to one of the most prominent American AI labs. Defense Secretary Pete Hegseth argued the Pentagon should have access to AI systems for "any lawful purpose," without restrictions from private contractors. Anthropic called the designation "unprecedented and unlawful."

### The Legal Arguments

Anthropic's complaints — filed simultaneously in the U.S. District Court for the Northern District of California and the D.C. Circuit Court of Appeals — rest on three pillars:

- **First Amendment retaliation:** The government is punishing Anthropic for expressing views about AI safety and the limitations of its own technology, which constitutes protected speech.
- **Administrative Procedure Act violation:** The DOD skipped required procedural steps — risk assessment, company notification, written national-security determination, congressional notice — before issuing the designation.
- **Separation of powers:** No federal statute authorizes the President to direct all agencies to cease using a specific private contractor's technology.

> "The Constitution does not allow the government to wield its enormous power to punish a company for its protected speech." — Anthropic lawsuit filing

### The Stakes

The company says the actions could reduce its 2026 revenue by **multiple billions of dollars**, as the supply-chain label now requires any Pentagon contractor to certify they aren't using Claude. The General Services Administration has already terminated Anthropic's "OneGov" contract.

A remarkable counterweight emerged on the same day: researchers at OpenAI and Google DeepMind — Anthropic's two largest competitors — filed an **amicus brief in their personal capacities** supporting Anthropic's position, arguing the designation could damage U.S. competitiveness and chill public debate about AI risk.

OpenAI quickly moved to fill the gap, announcing a new DOD contract in Anthropic's place — a move that itself sparked internal pushback, including the resignation of a senior OpenAI robotics executive who said adequate safeguards weren't reviewed before the agreement was signed.

### Why It Matters

This is the first time a frontier AI lab has sued the U.S. government over AI safety policy. The outcome will establish whether private AI developers have any constitutional standing to refuse use-cases they consider harmful — a question that will define the relationship between AI companies and government for years.

---

## Story 2: OpenAI's Codex Security — The Agent That Hunts Bugs at Scale

### An AppSec Agent That Thinks Like a Researcher

On March 6–9, OpenAI launched **Codex Security** into research preview, making it available to ChatGPT Pro, Enterprise, Business, and Edu customers — free for the first 30 days. The tool is designed to do something deceptively difficult: not just flag vulnerabilities, but _understand_ them.

Most AI security tools drown developers in low-confidence alerts. Codex Security's approach is different. It begins by reading an entire repository and constructing an **editable threat model** — a natural-language map of what the system does, what it trusts, and where it's most exposed. Vulnerabilities are then found within that context, pressure-tested in a sandboxed environment to eliminate false positives, and returned with concrete, ready-to-merge patches.

> "It builds deep context about your project to identify complex vulnerabilities that other agentic tools miss, surfacing higher-confidence findings with fixes that meaningfully improve the security of your system." — OpenAI

### What It Found in 30 Days

The numbers from Codex Security's private beta are striking:

- **1.2 million commits** scanned across external repositories
- **792 critical vulnerabilities** identified
- **10,561 high-severity issues** flagged
- **14 CVEs assigned** across projects including OpenSSH, GnuTLS, GOGS, Thorium, libssh, PHP, and Chromium
- False positive rates dropped by **more than 50%** over the beta period; in one case, noise was cut by 84%

The tool evolved from an earlier internal OpenAI project called **Aardvark**, which was tested in private beta from October 2025 onward. The public launch comes roughly two weeks after Anthropic introduced **Claude Code Security**, a competing tool with a similar remit — underscoring that automated security review is becoming a new front in the AI assistant wars.

### The Bigger Shift

Codex Security represents something important about where AI agents are heading. The bottleneck in software security has never been a shortage of vulnerability databases or scanning rules — it's been the signal-to-noise problem. Security teams spend enormous amounts of time triaging false positives. An agent that understands _system context_ before it starts scanning is a qualitatively different tool from a pattern-matcher.

OpenAI has also launched **Codex for OSS**, offering open-source maintainers free ChatGPT Pro access and Codex Security scans — an initiative that frames the tool as infrastructure for the entire software ecosystem, not just enterprise customers.

---

## Story 3: Apple Rebuilds Siri with Google's Gemini — And It's Almost Here

### The Partnership That No One Predicted

In January 2026, Apple and Google announced a multi-year collaboration: the next generation of **Apple Foundation Models** would be built on Google's Gemini technology. On March 1, Apple confirmed exactly what that means in practice — a fundamentally rebuilt Siri, shipping with **iOS 26.4** in late March or April 2026.

The new Siri, internally powered by what Apple calls _Apple Foundation Models v10_ — a customized version of Google's 1.2-trillion-parameter Gemini model — will run on Apple's Private Cloud Compute infrastructure. User data stays isolated from Google's systems. Apple retains full control of the interface, privacy routing, and policy enforcement. Google provides the reasoning engine.

> "After careful evaluation, we determined that Google's technology provides the most capable foundation for Apple Foundation Models and we're excited about the innovative new experiences it will unlock for our users." — Apple/Google joint statement

### What the New Siri Can Actually Do

The rebuilt assistant represents a genuine capability jump, not an incremental update:

- **On-screen awareness:** Siri can read and act on what's currently displayed on your device. Open a restaurant in Safari, and Siri can make the reservation. An open flight confirmation email becomes a calendar event with departure reminders — automatically.
- **Cross-app intelligence:** Siri understands context from Mail, Messages, Calendar, and other apps simultaneously, enabling multi-step task chains from a single request.
- **Multi-turn conversation:** Natural back-and-forth dialogue replaces the old command-and-response model.

Independent testing during the iOS 26.4 beta period found Siri correctly handling 87% of multi-turn conversational tasks — up from 52% in iOS 25. Google Assistant leads at 91%, but the gap has narrowed from a chasm to a few percentage points.

### Why Apple Did This

Apple's Siri overhaul was originally promised for iOS 18 in 2024. A series of technical setbacks — including the departure of key AI talent to competitors — forced a complete architectural rethink. The company reportedly pays approximately **$1 billion per year** for access to Google's AI models, a significant bet on pragmatism over pride.

Apple's playbook here mirrors earlier transitions: it leaned on Intel chips until Apple Silicon was ready; it used Google Maps until Apple Maps matured. The expectation is that the company will develop proprietary AI models capable of replacing the Gemini partnership — but for the 2.2 billion Apple devices in active use today, Gemini is the brain running Siri's most complex tasks.

The Google partnership also raises a longer-running question: Apple currently pays Google ~$20 billion per year to be the default search engine, and now adds a roughly $1 billion AI arrangement on top. Two tech giants, deeply intertwined, competing in every other market.

---

## Editor's Note

Three stories this week. One lawsuit that will shape AI governance for the next decade. One agent that could finally solve alert fatigue in enterprise security. And one product launch that will be used by more people than any other AI system on earth when it ships.

The pace isn't slowing down. We'll be here next week.

— **Gen AI Weekly**

---

## Sources

| #   | Title                                                                                   | Source           | URL                                                                                                               |
| --- | --------------------------------------------------------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------- |
| 1   | Anthropic sues Defense Department over supply-chain risk designation                    | TechCrunch       | https://techcrunch.com/2026/03/09/anthropic-sues-defense-department-over-supply-chain-risk-designation/           |
| 2   | Anthropic sues the Trump administration after it was designated a supply chain risk     | CNN Business     | https://www.cnn.com/2026/03/09/tech/anthropic-sues-pentagon                                                       |
| 3   | Anthropic sues Pentagon over rare "supply chain risk" label                             | Axios            | https://www.axios.com/2026/03/09/anthropic-sues-pentagon-supply-chain-risk-label                                  |
| 4   | Anthropic sues Trump administration over Pentagon blacklist                             | CNBC             | https://www.cnbc.com/2026/03/09/anthropic-trump-claude-ai-supply-chain-risk.html                                  |
| 5   | Anthropic sues the Trump administration over 'supply chain risk' label                  | NPR              | https://www.npr.org/2026/03/09/nx-s1-5742548/anthropic-pentagon-lawsuit-amodai-hegseth                            |
| 6   | Anthropic Challenges Pentagon Blacklisting                                              | Modern Diplomacy | https://moderndiplomacy.eu/2026/03/11/anthropic-challenges-pentagon-blacklisting/                                 |
| 7   | Anthropic Sues US Government Over Supply Chain Risk Label                               | Bloomberg        | https://www.bloomberg.com/news/articles/2026-03-09/anthropic-sues-defense-department-over-supply-chain-risk-label |
| 8   | Anthropic to challenge DOD's supply chain label in court                                | TechCrunch       | https://techcrunch.com/2026/03/05/anthropic-to-challenge-dods-supply-chain-label-in-court/                        |
| 9   | Anthropic sues US Defense Department over supply chain risk designation                 | JURIST           | https://www.jurist.org/news/2026/03/anthropic-sues-us-defense-department-over-supply-chain-risk-designation/      |
| 10  | Codex Security: now in research preview                                                 | OpenAI           | https://openai.com/index/codex-security-now-in-research-preview/                                                  |
| 11  | OpenAI Codex Security Scanned 1.2 Million Commits and Found 10,561 High-Severity Issues | The Hacker News  | https://thehackernews.com/2026/03/openai-codex-security-scanned-12.html                                           |
| 12  | OpenAI says Codex Security found 11,000 high-impact bugs in a month                     | CSO Online       | https://www.csoonline.com/article/4142354/openai-says-codex-security-found-11000-high-impact-bugs-in-a-month.html |
| 13  | OpenAI Rolls Out Codex Security Vulnerability Scanner                                   | SecurityWeek     | https://www.securityweek.com/openai-rolls-out-codex-security-vulnerability-scanner/                               |
| 14  | OpenAI Launches Codex Security to Find and Fix Vulnerabilities                          | AI Business      | https://aibusiness.com/agentic-ai/openai-launches-codex-security                                                  |
| 15  | Google's Gemini to power Apple's AI features like Siri                                  | TechCrunch       | https://techcrunch.com/2026/01/12/googles-gemini-to-power-apples-ai-features-like-siri/                           |
| 16  | Apple picks Google's Gemini to run AI-powered Siri coming this year                     | CNBC             | https://www.cnbc.com/2026/01/12/apple-google-ai-siri-gemini.html                                                  |
| 17  | Google Gemini Partnership With Apple Will Go Beyond Siri Revamp                         | MacRumors        | https://www.macrumors.com/2026/01/12/google-gemini-future-apple-intelligence-features/                            |
| 18  | Apple Explains How Gemini-Powered Siri Will Work                                        | MacRumors        | https://www.macrumors.com/2026/01/30/apple-explains-how-gemini-powered-siri-will-work/                            |
| 19  | Apple to 'unveil' results of Google Gemini partnership as soon as next month            | 9to5Mac          | https://9to5mac.com/2026/01/25/apple-siri-gemini-partnership-set-to-launch-next-month-ios-26-4/                   |
| 20  | Apple Siri 2026: Gemini-Powered On-Screen AI                                            | Digital Applied  | https://www.digitalapplied.com/blog/apple-siri-2026-gemini-powered-context-aware-ai                               |
| 21  | Joint statement from Google and Apple                                                   | Google Blog      | https://blog.google/company-news/inside-google/company-announcements/joint-statement-google-apple/                |

---

_© Gen AI Weekly · March 9–15, 2026 · @genaiweekly_
