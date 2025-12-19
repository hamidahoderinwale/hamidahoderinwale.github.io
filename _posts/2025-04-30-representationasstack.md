---
title: "Representation as Stack"
date: 2025-04-30
layout: post
---

Here, I'm presenting an instance of vibes-research. The process is basically me asking an LLM questions the way you would in any chat, but I'd like to think that the distinguishing feature of "vibes-research" — compared to a normal Q&A — is that there's some train of thought behind it.

The conversation started with me wondering what happens when underlying architectures, tools, and paradigms change — what happens to researchers and fields that depend on them? My motivation was to understand: are incumbent fields rendered useless by new approaches?

[Sepp Hochreiter](https://en.wikipedia.org/wiki/Sepp_Hochreiter) and [Jürgen Schmidhuber](https://en.wikipedia.org/wiki/J%C3%BCrgen_Schmidhuber) came up with the [LSTM](https://www.bioinf.jku.at/publications/older/2604.pdf) (Long Short-Term Memory) in 1997. Going through Schmidhuber's site and Google Scholar, it looks like he still publishes a very fair amount. His work now covers newer work like [autoencoders](https://arxiv.org/abs/2405.17283), empirical research with "productified" models like GPT-4o, and architectures like Transformers.

ChatGPT responded correctly, saying that those with broad, conceptual knowledge often adapt. They understand new methods and continue to make advancements. Furthermore, it's safe to say that LSTMs were an inspiration for their successors.

Anyway, I don't think LSTMs were the best test-bed for my initial question. You know what really changed the game? Vectors — or rather, tensors. In some sense, we got a new vector when the tensor came around. Tensors have been around since 1898, but for machine learning, they really solidified themselves as the core representation in the early 2000s — which isn't that long ago.

In 2009, Sutskever proposed [Bayesian Clustered Tensor Factorization](https://papers.nips.cc/paper_files/paper/2009/hash/5705e1164a8394aace6018e27d20d237-Abstract.html) to model relational concepts while reducing the parameter space, and it was CNNs that really adopted tensors as the core representation for data in neural networks. Thus, future architectures took the tensor as their default representation.

That said, the uprooting of old paradigms for new ones might be especially interesting to study at the level of representation — specifically, how human-readable data is encoded. ChatGPT helped me intuit the current stack of representation, which, in today's paradigm, can be summarized fairly clearly. (The ubiquity of Python is another interesting piece to look at.)

Even static typing isn't really used in ML. I've heard of 'RustTorch' (or HuggingFace's [Candle](https://github.com/huggingface/candle)) and HaskTorch projects, but I imagine the language will follow the representation — and typing alone won't be enough to trigger a switch. Furthermore, if you're quantizing, then you want dynamism and variance. In that case, the goal is more type tracking (for precision, etc.) rather than traditional type-checking.

That said, ChatGPT then raised an interesting case where you have an "extended type system might look like in future ML — for example, a type that tracks not just "float32" but also "quantized from float32 with ±3% error"?"

> **How would *new representations* (beyond tensors) change the *stack* — and what does that mean for *how people program*?**

### How programming will change

> **Today:**
> - Programming ML = declaring tensor operations.
> - You think in terms of **arrays** and **functions** on arrays.
>
> **Future (with new representations):**
> - Programming ML = declaring **local behaviors**, **graph rewrites**, **procedures attached to data**.
> - You think in terms of **local programs**, **flows**, **patches**, and **dynamical systems** — not just tensors.
>
> **Programmers might have to:**
> - Specify **local transformations** rather than just matrix ops.
> - Deal with **irregular structures** much more naturally.
> - Rely on **higher-level declarative specifications** ("this space should be smooth", "this patch interacts with that one") and let compilers figure out efficient execution.

Initially, it suggested that given the current stack, at the language-layer we would just see Python with specs for new representations.

I then asked how programming languages might change.

| Path | What Changes | Example |
|------|--------------|---------|
| **Python Evolution** | Python is *augmented* with new types and compilers that reinterpret your code. | Like **Triton** and **Mojo**: still Python-looking, but compiles to efficient IR and machine code. |
| **New DSLs** (Domain-Specific Languages) | Specialized new languages designed for structure-first ML. | Like **DiffTaichi** for physics simulation; you describe computations differently. |
| **Fully New Languages** | Radical new designs for "composable dynamic systems" — replacing tensor-first thinking entirely. | No real-world examples yet at scale, but **Metaprogramming Graph DSLs** and **functorial ML** research points here. |

> The *language* might still look like Python for a while, but **the mental model you need to have changes massively**.

### Takeaways:

I think this would serve as a decent basis to actually begin the research. I could imagine asking ChatGPT to conceptualize a new representation stack for the future, but given this, it would probably be too broad in scope. Your new representation stack should be grounded in some real-world motivation — for example, observing the needs of a robotics planner. Then, you would need to find a way to measure efficacy, and so on. ChatGPT could probably assist well with these steps too.

However, the *last mile* — intuiting how something would actually be used in the real world and polishing it into a usable product — is what I find takes the most time in any project. That said, I'm fairly sure that coming up with something like the above using only a search engine, or by going through textbooks and papers the traditional way, would have taken much longer.

Deciding that this was a path worth pursuing could be attributed to some form of "expertise." Economists studying LLMs and research claim that this is why we haven't yet "recursed into intellectual Narnia": fitting concepts together remains the hard — and interesting — part. Still, it was nice to quickly get broad sweeps of existing fields without having to do tedious library work.

Like Schmidhuber, I think a major benefit of LLMs is how they can make research more enjoyable, helping eliminate a good fraction of the annoying parts. On the flip side, it seems plausible that more junior researchers like myself don't always "pay our dues" — we do fewer reps, we get lazy. We gloss over the finer-grained patterns of the world and of our fields, ask "worse" questions, and form "worse" hypotheses. We risk operating at a level of abstraction too high to make truly meaningful theoretical progress.

That said, I'm not sure Vaswani et al. needed to know how to write a device driver from scratch to develop their work. But if they did, I'm curious what kind of tacit learning influenced their work.



