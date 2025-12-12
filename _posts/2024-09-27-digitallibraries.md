---
title: "A Short Post on Digital Libraries and More"
date: 2024-09-27
layout: post
---

Something that stays deep in my mind is that I live in an age where I can find things. It's a wonder for an accepted but insane feat: having instant access to the entire corpora of codified knowledge. This means that I feel a duty to explore it as much as I can, while I can. It means I question the balance between consuming and contributing to it. It also means that I think about how it will transform, knowing that we're only at a cliff of a vast, endless pool of what it can be.

Michael Nielsen seems to agree: it's the thesis of his book *Reinventing Discovery.* The US government, specifically DARPA, also agrees.

This post will be relatively short, but I want to highlight some initiatives that will clarify what I mean first. While the vengeful ascent of the tech bros may seem antithetical to publicly funded science, Google, the hallmark "tech company," has NSF roots. Specifically, I refer to Google Search, which [started](https://new.nsf.gov/news/origins-google) as an NSF-DLI (NSF Digital Library Initiative) project. All research is based on existing knowledge; therefore, making libraries of the digital assets that constitute most modern expertise is essential. In recognition of this, the NSF started a grant program.

Larry Page, then a graduate student at Stanford, was awarded a grant to work on connecting digital knowledge artifacts to the "web." You can find some of the original work [here](http://infolab.stanford.edu/~backrub/google.html). Now, we can think about some practical, related concepts. The "RDF," or the Resource Description Framework, is the scheme for organizing and navigating relational data online. When put together, this makes up a "knowledge graph." The original work and Google Search engine relied on a Page Rank algorithm. When you type a query, you get a page of results. The order of these results, excluding paid ads (whose algorithm is similarly interesting), takes citations and backlinks to a given page as a proxy for its importance and, therefore, how high it is on the results page.

Today, we've progressed to more sophisticated methods. We are trying to work on the prompting problem, which involves deciphering the true "meaning" of a given prompt to improve results, and the searching problem, which involves actually retrieving the content being searched for.

DARPA, yes, the defense agency, had a call sourcing proposals for [Collaborative Knowledge Curation](https://www.darpa.mil/ARC/CKC) (CKC) as part of their ARC program. Initially, Google used an exact-match query, which is not great because we often don't write literally to express what we want to express semantically. Non-LLM augmented methods improve on this, but LLMs have allowed us to advance search quite a bit. Another dimension of complexity in prompting comes from asking causal questions, the types of questions that predicate research. A search engine being able to answer these questions, or more realistically and possibly helpfully returning content to help answer these questions, or knowledge curation, is the basis of this call.

> "In a world of increasingly complicated and interdependent systems, analysts and decision-makers spend more and more time curating the knowledge that informs their models and decisions."

David Spivak does work on categorical databases. At the same time, embedding search has been a boon. There are still some qualms; for example, it requires that concepts be spelled accurately, the order of concepts subscribe to a set of rules, and so on. But what embeddings let us do is codify some notion of "concept" with the idea of closeness in vector space, which is cool. We then get into the concept of [fuzzy logic](https://www.umbertostraccia.it/cs/download/papers/SUM11/SUM11.pdf), which I'll put in contrast to the even newer [probabilistic](https://www.notion.so/Blog-10e6570ae8758031b6f4dc0f8b0cc498?pvs=21) [programming language](https://www.cs.cornell.edu/courses/cs4110/2016fa/lectures/lecture33.html). In fuzzy logic, we go away from the concept of bijectivity: we can still have graphs and mapping between concepts, with emphasis on the plural use of "concept," where we can map multiple objects to multiple. This is contrary to the one-to-one ideal that we may internalize. In essence, probabilistic programming languages build on this, but they are quite different. Here, we have the idea of a distribution rather than the idea of "many."

I will end things abruptly here, but there's a lot to explore! Just like the brain can remember a given object, we often recall scenes and oddly shaped sets of objects with other dimensions like temporality and space. How can this be reflected in data storage and retrieval for search? I describe the idea of [episodic time](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4225612) and the mappings between them, or a "memory" as an oddly-shaped (sub)set, but I touch on the notion of [neurosymbolic methods and knowledge graphs](https://arxiv.org/abs/2409.04572), which that idea falls under.

To end, I'll give a shoutout to [Basis AI](https://www.basis.ai), which is exploring interesting things here.

---

[1] [Here](https://gwern.net/oen)'s a post I have not read, but that you might find interesting. It's a proposal for a new search engine for numbers.

