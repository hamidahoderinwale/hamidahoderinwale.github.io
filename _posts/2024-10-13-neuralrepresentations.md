---
title: "Neural Representations, Manifolds, and Motivations"
date: 2024-10-13
layout: post
---

I thought it would be valuable to share some things that are of recent interest, at least in (systems) neuroscience. These are not things that I'm directly working on, per se, but they are close enough. I think they represent the scope of what I hope to look into more than anything, probably.

I remember being interested in representations of the brain. Sparse-autoencoders are all the hype—breaking down the circuits of the generative, artificial mind. [Stephen Casper](https://stephencasper.com/) is less optimistic, [Anthropic's agenda](https://transformer-circuits.pub/2023/monosemantic-features) appears to be pushing forward much of the research directions—deriving insight from sparse-distributed memory models. Relatedly, Olshausen isn't too far from where I am right now.

In another vein, psychiatry is wildly unformalized. If you suspect you have some sort of behavioral condition, there is a good chance your diagnosis is at the mercy of a post-chat judgement by your psychiatrist. This is not a bad thing, but it means that so much is in flux, too much for comfort. Formalization allows us to operationalize, and in theory, this means that we should be able to mechanize, create processes, make them efficient, and build faster systems. I care about this. The system as it is, is quite slow.

In topology, we try to understand the shape of mathematical structures. If you believe the very notion of a shape is a mathematical concept, then you might suggest that topology simply formalizes the idea of shape. So, as a systems neuroscientist doing dry-lab work, analyzing your data, you will have neural recordings. These consist of electrical activity. There's been relatively new interest in using the manifold (alongside [symmetry and geometry](https://github.com/neurreps/awesome-neural-geometry?tab=readme-ov-file) more broadly) as a framework to make sense of how neurons map to behaviour—neural encoding—some sort of enhanced, non-linear dimensionality reduced approach to neural analysis. This [article](https://www.thetransmitter.org/neural-dynamics/neural-manifolds-latest-buzzword-or-pathway-to-understand-the-brain/) by Matthew Pierch in "The Transmitter" was a very nice overview.

Now, the scope of this electrical activity brings us to [neural geometry](https://iveevi.github.io/ngf/index.html), which is the structure of a given thing. In this case, the scope of analysis will determine the number of neurons that a scientist will look at, thus determining the geometry of the neural population. The decision of what this subspace should consist of is a question that I'm helping to look at.

Anyway, one thing is that linear dimensionality reduction techniques lose out meaningful things that you would assume would affect a given set of neurons and the behaviours they influence. For example, mechanistic interpretability folk call this polysemanticity, whereas neuroscientists call this mixed selectivity, whereby multiple neurons can "cause" the same output. There's a lot of confounding, a lot of auxiliary dimensions, etc.

Some things that are almost completely overlooked are [hierarchical](https://royalsocietypublishing.org/doi/10.1098/rstb.2019.0319) [representations](https://www.frontiersin.org/journals/neuroinformatics/articles/10.3389/fninf.2010.00112/full) of the brain, whereby you might have emergent properties at different scales. Without actually including them in models, we've kind of over-indexed on this. We look at single-layer models and assume that our findings will extrapolate. Others include compositionality, where we look at the gestalt: we take that modules and the makeup of said modules matter, and are an important property of the system at large. We can take a magnifying glass to this idea of compositionality and look at some interesting ideas.

For example, the idea of a boundary. When I think of this question, I think of memory and more cognitive neuroscience. There's this interesting research project that came out in 2014, and the scientists working on it are looking at being able to see the [arrow of time](https://news.mit.edu/2014/can-we-see-arrow-of-time-0620) or rather asking, can we? For recall, the arrow of time refers to the notion of direction. Moreover, we assume that it is one-way. Time is not symmetric, in that, if you watch a video and you rewind, the actions do not play in the same direction: the water that originally poured out of the glass onto the ground, is now being dranken by that cup from the ground—physically impossible. The reason for this is that entropy increases over time, and in our rewind we cannot undo this or rather reverse it.

Okay, so what's interesting and of relevance here is that I can think of the past. I can think back to the fuzzy memory of me starting my first day of Grade 3 (forgive my Canadianness) and bring from the past, a memory. I can replay it in my mind and remember the orange shirt I think I was wearing and the teacher speaking to the class in comprehensible language. I can remember walking into the classroom and not out of it (even though that wouldn't make sense). From my mind, I recall this block of time and press play and it feels like I'm moving forward in that snippet of personal history. Now, how are these things grouped: is it a computationally expensive thing where we have infinite blocks that are made upon recall? I see the answer to this as being related to the idea of a bouquet from topology.

Perhaps, we assume fractal-like properties, where we can have infinite subdivisions, but the structure of a petal as a subdivision remains constant. These are open-sets, at least for the non-amnesiac and they are nested structures. I've thought about this lightly and wanted to use the paragraph to illuminate some of these baby ideas, but it's interesting to think about.

When we consider more dynamic analysis, perhaps we draw from the sheaf as a model: understanding how information propagates through different cortices, populations, subsets of specific neurons, and so on. Anyway, the interest in episodicism and memory was sparked by a talk from Chris Fields titled ["What is the Identity Operator?"](https://www.youtube.com/watch?v=RwDMP0qeyHo&t=1551s) He brought up a lot of tangential work, and a paper titled ["Constructing condensed memories in functorial time"](https://www.tandfonline.com/doi/full/10.1080/0952813X.2023.2222374) was one of them.

Cool stuff.





