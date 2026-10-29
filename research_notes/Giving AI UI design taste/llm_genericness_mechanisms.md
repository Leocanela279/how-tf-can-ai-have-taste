# Why LLM Outputs Are Generic: Mode Collapse, Typicality Bias, and What It Means for AI-Generated UI

Research date: 2026-10-29. Every claim has a URL. Each entry is labelled **[measured]** (empirical result), **[theory]** (formal derivation), **[vendor guidance]** (lab advice, not a controlled study) or **[opinion/commentary]** (blogs, anecdote).

---

## Q1. What does research say about mode collapse / reduced output diversity after RLHF / preference tuning?

### Takeaway
Several independent results agree. Preference tuning (RLHF, or RLHF-like feedback tuning) measurably narrows output diversity compared with SFT and base models. The narrowing is strongest within one prompt (sampling many times gives near-duplicates), and it also shows up across prompts and across models: different models converge on the same answers, the "Artificial Hivemind" effect. Zhang et al. (2025) trace part of the cause to the preference data itself: human annotators reward more "typical" (higher base-model likelihood) text. Optimizing against that reward acts like lowering the temperature on the base model, so probability mass piles onto the most stereotypical completion.

### Cited Findings

**RLHF vs SFT (Kirk et al., 2023; ICLR 2024)**
- [measured] Kirk, Mediratta, Nalmpantis, Luketina, Hambro, Grefenstette, Raileanu. Submitted 10 Oct 2023, revised Feb 2024. They compared SFT, reward modelling and RLHF on two base models. RLHF generalises better than SFT out of distribution, but "substantially" lowers output diversity. The authors frame this as a generalisation-vs-diversity tradeoff. — [arXiv 2310.06452](https://arxiv.org/abs/2310.06452)
- [measured] Method: K=16 samples at temperature 1 for each of 500 inputs. Diversity was scored with EAD (distinct n-grams, syntactic), Sentence-BERT (semantic) and NLI (logical). **Per-input** diversity under RLHF is "much lower" than SFT on EAD and Sent-BERT. **Across-input** diversity is also lower, but the gap is "much smaller." The authors still call it "the first rigorous empirical demonstration of across-input mode collapse emerging from RLHF training specifically." NLI showed no difference. Diversity was measured on summarisation only; instruction-following showed no meaningful difference, which the authors attribute to metric limits. — [arXiv 2310.06452 (HTML)](https://arxiv.org/html/2310.06452)

**Typicality bias as a data-level cause (Zhang et al., 2025, "Verbalized Sampling")**
- [measured + theory] Zhang, Yu, Chong, Sicilia, Tomz, Manning, Shi. Submitted 1 Oct 2025, v4 revised 15 Jul 2026. The paper argues mode collapse is partly a property of the data: "annotators systematically favor familiar text," consistent with cognitive-psychology findings on familiarity and processing fluency. — [arXiv 2510.01171](https://arxiv.org/abs/2510.01171)
- [theory] Model: reward r(x,y) = r_true(x,y) + α·log π_ref(y|x) + ε. If α > 0, the more typical response gets more reward even at equal true quality. The closed-form RLHF optimum is π*(y|x) ∝ π_ref(y|x)^γ · exp(r_true/β) with γ = 1 + α/β > 1. That is temperature-like **sharpening** of the base distribution: when many responses are equally good, mass concentrates on the base model's most typical completions. — [arXiv 2510.01171 (HTML)](https://arxiv.org/html/2510.01171)
- [measured] α was estimated on HelpSteer using 6,874 correctness-matched response pairs: α̂ = 0.57 ± 0.07 with Llama-3.1-405B as π_ref, and 0.65 ± 0.07 with GLM-4.5 (both p < 10⁻¹⁴). Controlling for length, Flesch-Kincaid readability, type-token ratio and sentence length weakens α, but it stays positive and significant. Across five base models, annotators preferred the higher-log-probability response 51.6–60.8% of the time. — [arXiv 2510.01171 (HTML)](https://arxiv.org/html/2510.01171)

**Inter-model homogeneity (Jiang et al., 2025, "Artificial Hivemind")**
- [measured] Jiang, Chai, Li, Liu, Fok, Dziri, Tsvetkov, Sap, Albalak, Choi. arXiv Oct 2025, v2 Oct 2026. NeurIPS 2025 Datasets & Benchmarks track, oral. They introduce **Infinity-Chat**: 26K real-world open-ended queries with no single right answer, a taxonomy of 6 categories and 17 subcategories, and 31,250 human annotations with 25 annotators per example. They report pronounced **intra-model repetition** (one model keeps producing similar answers) and **inter-model homogeneity** (different models produce strikingly similar outputs), with the inter-model effect described as the stronger one. — [arXiv 2510.22954](https://arxiv.org/abs/2510.22954)
- [measured] LMs, reward models and LM judges are less well calibrated to human ratings on responses where annotators' preferences differ idiosyncratically, even when overall quality looks comparable. In other words, the evaluators used in alignment pipelines also miss pluralistic taste. — [arXiv 2510.22954](https://arxiv.org/abs/2510.22954)

**Homogenization in human–AI co-creation**
- [measured] Padmakumar & He (ICLR 2024). Users wrote argumentative essays with base GPT-3, with feedback-tuned InstructGPT, or alone. Only **InstructGPT** produced a statistically significant drop in diversity: essays by different authors became more similar, with lower lexical and content diversity. This was "mainly attributable to InstructGPT contributing less diverse text"; the text users wrote themselves was unaffected. — [arXiv 2309.05196](https://arxiv.org/abs/2309.05196)
- [measured] Doshi & Hauser (Science Advances 10, eadn5290, 12 Jul 2024). Writers given LLM story ideas produced stories rated more creative and better written, with the largest gains for less creative writers. But AI-assisted stories were **more similar to each other**. The authors frame this as a social dilemma: individuals gain while collective novelty shrinks. — [Dryad record / abstract](https://datadryad.org/stash/dataset/doi:10.5061/dryad.qfttdz0pm)

### Inferences
- The UI-relevant mechanism has two parts. (1) Pretraining sets π_ref, so the most frequent web patterns are already the base model's mode. (2) Preference tuning with typicality-biased raters sharpens that mode (γ > 1). A post-trained model is therefore *more* likely than its base to emit the single most common landing-page pattern, and other models trained on similar web data and preference norms will emit the same one (hivemind).
- Per-input collapse (Kirk) means re-rolling the same prompt is a weak diversity lever. Changing the *conditioning* matters more than resampling.
- Reward models and LLM judges are miscalibrated on idiosyncratic preferences (Jiang). So an LLM-as-judge "taste critic" will likely reward the typical design unless it is anchored to explicit, non-default criteria or references.

### Gaps
- I did not retrieve exact intra- and inter-model similarity numbers from the Artificial Hivemind full text; only the abstract-level claims are above.
- No paper here measures typicality bias specifically in *design* or *code* preference data. α was measured on HelpSteer, which is general text.

---

## Q2. Does the same apply to code/UI generation? Why indigo/purple, Inter, card grids?

### Takeaway
Anthropic says it directly: unguided Claude landing pages converge on Inter, purple gradients on white and minimal motion, because the model samples the "high-probability center" of web data. Anthropic calls this "distributional convergence." For why indigo specifically, the widely repeated explanation is Tailwind UI's `bg-indigo-500` default propagating through tutorials and starters into training data. That explanation is plausible and endorsed half-jokingly by Tailwind's creator, but it is not empirically verified. No controlled, quantitative study measuring the homogeneity of LLM-generated websites was found. The one academic paper on the topic (Mar 2026) is a qualitative review and risk analysis.

### Cited Findings
- [vendor observation] Anthropic, "Improving frontend design through Skills," 12 Nov 2025. Without direction, landing pages tend toward **Inter fonts, purple gradients on white backgrounds, and minimal animation**, which Anthropic calls the "AI slop" aesthetic. Cause: models predict tokens from training-data statistics, "safe design choices" dominate web data, so Claude samples from a "high-probability center" ("distributional convergence"). — [claude.com blog](https://claude.com/blog/improving-frontend-design-through-skills)
- [vendor observation] The same post says that even with a guidance prompt telling Claude to avoid defaults, it "still tend[s] to converge on common choices (Space Grotesk, for example) across generations." A ban on the first mode moves mass to the *next* mode rather than spreading it. — [claude.com blog](https://claude.com/blog/improving-frontend-design-through-skills)
- [opinion/commentary] Adam Wathan, Tailwind CSS creator, posted a widely shared half-joking apology around 7 Aug 2025 for making every Tailwind UI button `bg-indigo-500` five years earlier. He is quoted as saying he "just thought the color looked nice." Coverage comes via aggregators; I did not retrieve the original tweet. — [AIbase news](https://news.aibase.com/news/20365); [DEV Community](https://dev.to/alanwest/why-every-ai-built-website-looks-the-same-blame-tailwinds-indigo-500-3h2p)
- [opinion/commentary] Bloggers argue the indigo default spread into tutorials and starter repos, making purple the "median" of Tailwind code in training data. Some also hypothesize a feedback loop where AI-built purple sites re-enter training data. These are hypotheses, not measured. — [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website); [DEV Community](https://dev.to/alanwest/why-every-ai-built-website-looks-the-same-blame-tailwinds-indigo-500-3h2p)
- [qualitative research] Shin, Gao, Pang, Lee, Reinecke, Tseng, "Interrogating Design Homogenization in Web Vibe Coding," arXiv Mar 2026 (Microsoft Research listing). Method: literature and gray-literature review, walkthroughs of popular vibe-coding tools, and a sociotechnical risk analysis. It identifies **frictionless generation** as an active driver of homogenization: cognitive overload and overreliance push creators to accept defaults. As mitigation it proposes "productive friction," where the model queries design assumptions and presents alternatives before finalizing. I saw no quantitative homogeneity metric. — [arXiv 2603.13036](https://arxiv.org/abs/2603.13036); [HTML](https://arxiv.org/html/2603.13036v1)
- [opinion/commentary] Even with Anthropic's frontend-design skill loaded, Claude drifts toward the statistical center unless given an explicit design brief. — [wmedia.es](https://wmedia.es/en/tips/claude-code-frontend-design-skill)

### Inferences
- Q1 explains Q2. Tailwind/shadcn-style code (indigo-500, gray-50 backgrounds, rounded-xl cards, Inter/system fonts, three-column feature grids, pill badges) is heavily represented in public web and GitHub code, which makes it the base model's mode. Typicality-biased preference tuning then sharpens that mode. Inter-model homogeneity predicts that GPT, Gemini and Claude produce similar-looking pages, which matches practitioner reports, though I found no published measurement of it for UI.
- Anthropic's Space Grotesk observation is the UI version of the sharpening result: a negative list prunes one peak, and the model jumps to the next-highest peak, which then becomes the new cliché. A taste skill should *specify a chosen direction*, not just ban defaults.
- Shin et al. support building friction into the skill: ask about, or commit to, a stated direction before generating, instead of one-shotting.

### Gaps
- No controlled study found that quantifies the share of LLM-generated pages using indigo/purple, Inter, or specific layouts. No training-data audit found for the share of Tailwind indigo in GitHub code.
- I could not verify the original Wathan tweet text or view counts; the cited figures (684K or 1M+ views) come from secondary sources and conflict.

---

## Q3. Which techniques increase diversity/specificity, and which don't?

### Takeaway
The best-evidenced technique is **Verbalized Sampling** (VS): ask for k candidates with their probabilities, optionally capped by a probability threshold so the model reaches into the tails. It gives 1.6–2.1x more diversity in creative writing without loss of accuracy or safety, and stronger models benefit more. **Persona/role prompts** have no reliable accuracy benefit in controlled studies, and their effect on diversity is not established. **Negative instructions** ("don't use X") are mechanistically shown to backfire through priming. Vendors advise positive phrasing, but controlled prompting evidence is thin. **Concrete exemplars/canonical examples** are vendor-recommended over rule lists. **Temperature** is orthogonal to VS and can be combined with it, but by itself it does not fix per-input collapse.

### Cited Findings

**Verbalized Sampling**
- [measured] VS is a training-free prompt: "Generate 5 jokes about coffee and their corresponding probabilities." Variants: VS-Standard ("Tell 5 jokes with their probabilities"), VS-CoT ("Think step-by-step, then …"), VS-Multi (follow-up turns: "Tell 5 more with probabilities"). Diversity can be tuned with a threshold, e.g. "Generate five responses with probabilities below {threshold}"; lower thresholds give more diversity. — [arXiv 2510.01171 (HTML)](https://arxiv.org/html/2510.01171)
- [measured] Creative-writing diversity is **1.6–2.1x** that of direct prompting. VS recovers **66.8%** of base-model diversity. Human ratings on a 1–4 scale (90 annotators): poem 1.90 → 2.39, story 2.74 → 3.06, joke 1.83 → 3.01 (direct → VS-Standard); a 25.7% human-evaluation gain is reported. Gains hold "without sacrificing factual accuracy and safety." — [arXiv 2510.01171](https://arxiv.org/abs/2510.01171); [HTML](https://arxiv.org/html/2510.01171)
- [measured] Larger models gain more: GPT-4.1 and Gemini-2.5-Pro gain 1.5–2x more diversity from VS than GPT-4.1-Mini and Gemini-2.5-Flash. — [arXiv 2510.01171 (HTML)](https://arxiv.org/html/2510.01171)
- [measured] For synthetic math data from GPT-4.1, downstream accuracy was: direct 30.6, VS-Standard 36.1, VS-Multi 37.5 (baseline 32.8). Diverse candidates improve downstream utility, not just novelty. — [arXiv 2510.01171 (HTML)](https://arxiv.org/html/2510.01171)
- [measured/claim] VS is orthogonal to temperature and top-p/min-p and can be combined with them for a better diversity-quality tradeoff; detailed numbers are in Appendix F.3, which I did not retrieve. — [arXiv 2510.01171 (HTML)](https://arxiv.org/html/2510.01171)
- Mechanism (theory, same paper): asking for a *distribution* rather than *an instance* lets the model express the pretrained distribution that instance-level collapse hides. The mode of "a list of 5 diverse items with probabilities" is itself a diverse list. — [arXiv 2510.01171](https://arxiv.org/abs/2510.01171)

**Persona / role prompts**
- [measured] Zheng et al., "When 'A Helpful Assistant' Is Not Really Helpful," arXiv 2311.10054 (Nov 2023, revised Oct 2024). Tested 162 roles across 4 LLM families on 2,410 factual questions; personas in system prompts did **not** improve performance over no persona. The best persona *per question* helps, but choosing it automatically is about as good as random. — [arXiv 2311.10054](https://arxiv.org/abs/2311.10054v2)
- [measured] Prompting Science Report 4 (arXiv 2512.05858, Dec 2025). On GPQA Diamond and MMLU-Pro, expert personas gave no consistent accuracy gain, and low-knowledge personas often hurt. — [arXiv 2512.05858](https://arxiv.org/pdf/2512.05858)
- Note: both studies measure *factual accuracy*, not aesthetic diversity. No controlled evidence was found either way on whether "you are a Swiss-style editorial designer" changes UI output distributions.

**Negative instructions ("don't do X")**
- [measured, mechanistic] Rana, "Semantic Gravity Wells: Why Negative Constraints Backfire," arXiv 2601.08070 (12 Jan 2026). Across 40,000 samples, the probability of violating "do not say X" follows a logistic function of the model's baseline probability of X: p = σ(−2.40 + 2.27·P₀). The more natural the forbidden token, the more likely the violation. **87.5%** of violations are "priming failures," where naming the forbidden word activates it; 12.5% are late-layer FFN "override failures." Suppression was 5.2 pp in failures vs 22.8 pp in successes. Single-author preprint; treat as indicative. — [arXiv 2601.08070](https://arxiv.org/abs/2601.08070)
- [measured, adjacent] Vrabcová et al., "Negation: A Pink Elephant in the Large Language Models' Room?" (arXiv 2503.22395). On multilingual NLI datasets, larger models handle negation better (contradicting earlier work), with variation by language and premise length. This concerns understanding negation, not obeying negative instructions. — [arXiv 2503.22395](https://arxiv.org/abs/2503.22395v2)
- [vendor guidance] Anthropic's prompt docs: "Tell Claude what to do instead of what not to do" (as quoted). — [16x Eval blog quoting Anthropic docs](https://eval.16x.engineer/blog/the-pink-elephant-negative-instructions-llms-effectiveness-analysis)
- [opinion/anecdote] 16x Eval (5 Aug 2025) collects Reddit reports, e.g. Claude Code creating duplicate files despite "NEVER create duplicate files," and argues for positive reframing. The author acknowledges there are no controlled experiments. — [16x Eval](https://eval.16x.engineer/blog/the-pink-elephant-negative-instructions-llms-effectiveness-analysis)
- [vendor observation, counterpoint] Anthropic's frontend skill *does* use a negative list ("Never use: Inter, Roboto, Open Sans, Lato, default system fonts") and reports immediate improvement. But Claude then converges on Space Grotesk, so the ban moves the mode rather than removing it. — [claude.com blog](https://claude.com/blog/improving-frontend-design-through-skills)

**Concrete references, exemplars, "right altitude"**
- [vendor guidance] Anthropic's frontend post recommends drawing palettes from concrete sources ("IDE themes and cultural aesthetics"), committing to one distinctive font "decisively," using extreme weight contrasts ("100/200 weight vs 800/900, not 400 vs 600"), and dominant colors with sharp accents rather than "timid, evenly-distributed palettes." Adding only a typography section reportedly improved other aspects too. The whole skill is about 400 tokens. — [claude.com blog](https://claude.com/blog/improving-frontend-design-through-skills)
- [vendor guidance] Prompt at the "right altitude": exact hex codes are too low-level; vague direction that assumes shared context is too high-level. — [claude.com blog](https://claude.com/blog/improving-frontend-design-through-skills); [Anthropic Engineering, "Effective context engineering for AI agents," 29 Sep 2025](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [vendor guidance] Prefer curated "diverse, canonical examples" to a "laundry list of edge cases" or rules; aim for the "smallest possible set of high-signal tokens." — [Anthropic Engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [qualitative research] "Productive friction": surface design assumptions and present alternatives before committing. — [arXiv 2603.13036](https://arxiv.org/abs/2603.13036)

**Temperature**
- [measured] Kirk et al. found strong per-input collapse in RLHF models *at temperature 1*, so default sampling temperature does not restore SFT-level diversity. — [arXiv 2310.06452 (HTML)](https://arxiv.org/html/2310.06452)
- [theory] Typicality bias acts as an exponent γ > 1 on π_ref, i.e. built-in low temperature. Raising decoding temperature can partly undo this, at a quality cost. VS is reported as complementary to it. — [arXiv 2510.01171 (HTML)](https://arxiv.org/html/2510.01171)

### Inferences
- **VS adapted to UI:** before writing code, have the model list about 5 candidate art directions (type pairing, palette, layout archetype) with verbalized probabilities. Discard the highest-probability ones, or ask for options "below p=0.1," then commit to one. That is the technique with the strongest evidence, though it is validated on text, not UI.
- **Positive specification over bans:** name a concrete direction ("display serif X at 96px/0.9 leading, ink-black on bone #F2EEE6, asymmetric 12-col grid") instead of "no Inter, no purple." If bans are used, pair each with its replacement. Expect the ban to shift the mode to the next cliché, as with Space Grotesk, and rotate or randomize the chosen alternatives.
- **Exemplars and references** (named real-world aesthetics, retrieved gallery examples) change the conditioning and so move π_ref itself. That is likely more powerful than personas. Few-shot examples may cause copying, so use several varied ones.
- **Personas are weakly supported** as a lever. Use them, if at all, only as a carrier for concrete constraints.

### Gaps
- No controlled study found that applies VS, personas, negative lists or exemplars to **UI/web design generation** and measures visual diversity.
- No controlled study found that compares positive vs negative phrasing for *style* instructions in instruction-tuned LLMs. The evidence is mechanistic (Rana), vendor advice, or anecdote.
- No evidence was retrieved on few-shot exemplars causing copying/anchoring in LLM design output; that risk is inferred.
- VS temperature-combination numbers (Appendix F.3) were not retrieved.

---

## Q4. Do many, long or conflicting instructions degrade instruction following?

### Takeaway
Yes, this is well measured. Instruction-following accuracy falls as the number of simultaneous instructions grows: the best frontier model reached about 69% at 500 instructions, and many Claude models were at 43–53%. Models show primacy bias and mostly fail by *omitting* instructions. Separately, performance degrades with input length even on trivial tasks ("context rot"), and information in the middle of long contexts is used worst. A taste skill should be short, high-signal, and put its most important directives first.

### Cited Findings
- [measured] IFScale. Jaroslawicz, Whiting, Shah, Maamari, "How Many Instructions Can LLMs Follow at Once?" arXiv 2507.11538, 15 Jul 2025. Up to 500 keyword-inclusion instructions in a business-report task; 20 models from 7 providers. Best was 68% at 500. — [arXiv 2507.11538](https://arxiv.org/abs/2507.11538)
- [measured] Accuracy at 500 instructions: gemini-2.5-pro 68.9%, o3 (high) 62.8%, grok-3-beta 61.9%, claude-3.7-sonnet 52.7%, claude-opus-4 (reasoning) 52.1%, o3 (medium) 51.6%, claude-opus-4 44.6%, claude-sonnet-4 42.9%. — [arXiv 2507.11538 (HTML)](https://arxiv.org/html/2507.11538)
- [measured] Three degradation patterns. **Threshold decay**: reasoning models (o3, gemini-2.5-pro) stay near-perfect through 150+ instructions, then fall. **Linear decay**: gpt-4.1, claude-3.7-sonnet/sonnet-4 (the paper's text and figure caption disagree). **Exponential decay**: drops to floors of about 7–15% (claude-3.5-haiku, llama-4-scout; the caption also lists gpt-4o). — [arXiv 2507.11538 (HTML)](https://arxiv.org/html/2507.11538)
- [measured] Primacy effect: later instructions are violated more often. The last-third vs first-third error ratio peaks around 150–200 instructions, e.g. claude-3.5-haiku at 2.15 at 50 instructions, falling to 1.17 at 500. — [arXiv 2507.11538 (HTML)](https://arxiv.org/html/2507.11538)
- [measured] Omission errors far outnumber modification errors. Omission:modification ratio at 500 instructions: llama-4-scout 34.9, claude-3.5-haiku 31.7, claude-opus-4 5.8, claude-3.7-sonnet 6.1, gemini-2.5-pro 7.0. — [arXiv 2507.11538 (HTML)](https://arxiv.org/html/2507.11538)
- [measured] Chroma, "Context Rot," Hong, Troynikov, Huber, 14 Jul 2025. Across 18 models (GPT-4.1, Claude 4, Gemini 2.5, Qwen3…), performance becomes less reliable as input grows, even on simple retrieval and replication. Lower needle-question similarity makes degradation steeper. Even one distractor hurts, and four hurt more. Shuffled haystacks beat coherent ones across all 18 models. On LongMemEval, focused prompts (~300 tokens) significantly beat full prompts (~113k tokens) for every model. — [Chroma Research](https://www.trychroma.com/research/context-rot)
- [measured] Liu et al., "Lost in the Middle," TACL 2023 (arXiv Jul 2023). U-shaped accuracy: best when relevant information is at the beginning or end of the context, worse in the middle, even for long-context models. — [arXiv 2307.03172](https://arxiv.org/abs/2307.03172)
- [vendor guidance] Anthropic Engineering (29 Sep 2025). Context is a finite "attention budget." With n tokens there are n² pairwise relationships, so focus thins as context grows. Context rot appears across all models. Aim for the "smallest possible set of high-signal tokens." — [Anthropic Engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [vendor observation] Anthropic's frontend-design skill is about 400 tokens, chosen to be compact enough to load without bloating context. — [claude.com blog](https://claude.com/blog/improving-frontend-design-through-skills)

### Inferences
- A taste skill with dozens of "never X" rules is likely to show IFScale-style omission failures. Those failures fall back to the model's default, which is the generic mode. The skill becomes partly invisible exactly where it is needed most.
- Put the few load-bearing directives (the committed direction, type, palette) first and keep them short. Primacy bias and the "lost in the middle" result both argue against burying them. Load long reference material (galleries, token tables) on demand rather than up front.
- In Chroma's distractor results, irrelevant but similar content hurts. Large style libraries loaded together may act as distractors; retrieving a few relevant examples is preferable.

### Gaps
- IFScale uses keyword inclusion, which is simpler than stylistic or design constraints. No benchmark was found for *aesthetic* constraint density.
- I found no study on *conflicting* instructions specifically (e.g. a skill rule vs a user request); this needs separate work.
