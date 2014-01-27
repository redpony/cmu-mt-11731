---
layout: default
title: Homework 1
---
# Homework 1

**Due 11:59pm on Tuesday, Feb. 18, 2013**

Word alignment is a fundamental task in statistical machine translation. This homework will give you an opportunity to try your hand at developing solutions to this challenging and interesting problem.

## Getting started

Go to your clone of your course GitHub repository on the machine where you will be doing this assignment. Run the following command to obain the code and data you will need:

    git pull --no-edit git@github.com:clab/sp2014.11-731.git master

In the new `hw1/` subdirectory, you will find a word-aligner written in Python, along with 100,000 German-English parallel sentences from the [Europarl corpus](http://www.statmt.org/europarl/) (version 7). This aligner uses *set similarity* to determine which words are aligned to each other in a corpus of parallel sentences. The set similarity measure we use is [Dice's coefficient](http://en.wikipedia.org/wiki/Dice's_coefficient), defined in terms of sets $X$ and $Y$ as follows:

$$D(X,Y) = \frac{2 \times |X \cap Y|}{|X| + |Y|}$$

Dice's coefficient ranges in value from $0$ to $1$.

How do we use set siilarity to align words? The intuition is that if you look at the set of sentence pairs from a parallel corpus that contain an English word $e$, and that set is similar to the set of sentence pairs that contain a German word $g$, then these words are likely to be translations of each other.

Formally, every pair of word types $(e,g)$ in the parallel corpus receives a Dice "score" $\delta(e,g)$. The alignment algorithm then goes through all pairs of sentences $(\textbf{e},textbf{g})$ and predicts that English word $e_i$ is aligned to German word $g_j$ if $\delta(e_i,g_j) > \tau$. By making $\tau$ closer to $1$, fewer points are aligned but with higher precision; by making it closer to $0$, more points are aligned, probably improving recall. By default, the aligner code we have provided you uses $\tau = 0.5$ as its threshold.

Run the baseline heuristic model 1,000 sentences using the command:

    ./align -n 1000 | ./check > dice.al

This runs the aligner and stores the output in `dice.al`. To display the alignments visually and score the alignments, run this command (use the `-n N` option to display verbose output for only the first $N$ sentences):

    ./grade < dice.al

This command scores the alignment quality by comparing the output alignments against a set of human alignment annotations using a metric called the alignment error rate (AER), which balances precision and recall of the guessed alignments (see Section 6 of [this paper](http://aclweb.org/anthology-new/P/P00/P00-1056.pdf)). Look at the terrible output of this heuristic model -- it's better than chance, but not any good. Try training on 10,000 sentences instead of 1,000, by specifying the change on the command line:

    ./align -n 10000 | ./check | ./grade

Performance should improve since the degree of association between words will be estimated from more sentence pairs. Another experiment that you can do is change the threshold criterion $\tau$ used by the aligner using the `-t X` option. How does this affect alignment error rate?

## The Challenge

Your task for this assignment is to **improve the alignment error rate as much as possible** (lower is better). It shouldn't be hard to improve it at least some: you've probably noticed that thresholding a Dice coefficient is a bad idea because alignments don't compete against one another. A good way to correct this is with a model where alignments compete against each other, such as IBM Model 1. It forces all of the words you are conditioning on to compete to explain each word that is generated.

IBM Model 1 is a simple probabilistic translation model we talked about in class. A source sentence $\textbf{g} = \langle \varepsilon, g_1, g_2 , \ldots , g_{n} \rangle$ (where $\varepsilon$ represents a null token present in every sentence) and a desired target sentence length $m$ are given, and conditioned on these, Model 1 defines a distribution over translations of length $m$ into the target language using the following process:

$$\begin{align\*} \mbox{for each}&i \in \[1,2,\ldots,m\] \\\\
a_i &\sim \textrm{Uniform}(0,1,2,\ldots,n) \\\\
e_i &\sim \textrm{Categorical}(\boldsymbol{\theta}_{g_{a_i}})
\end{align\*}$$

The random variables $\textbf{a} = \langle a_1,a_2, \ldots a_m \rangle$ are the *alignments* that pick out a source word to translate at each position in the target sentence. A source word $g_j$ may be translated any number of times (0, 1, 2, etc.), but each word in the target language $e_i$ that is generated is generated exactly one time by exactly one source word.

The marginal (marginalizing over all possible alignments) likelihood of a sentence $\textbf{e} = \langle e_1, e_2, \ldots , e_m \rangle$, given $\textbf{g}$ and $m$ is:

$$p(\textbf{e} \mid \textbf{g},m) = \prod_{i=1}^m \sum_{j = 0}^{n} p(a_i = j) \times p(e_i \mid g_j)$$

The iterative EM update for this model is straightforward. At each iteration, for every pair of an English word type $e$ and a German word type $g$, you count up the expected (fractional) number of times tokens $g$ are aligned to tokens of $e$ and divide by the expected number of times that $g$ was chosen as a translation source. That will give you a new estimate of the translation probabilities $p(g \mid e)$, which leads to new alignment expectations, and so on. We recommend developing on a small data set (1,000 sentenes) and a few iterations of EM (in practice, Model 1 needs only 4 or 5 iterations to give good results). When you are finished, you should see both qualitative and quantitative improvements in the alignments.

Developing a Model 1 aligner is enough to earn seven points. But alignment isn't a solved problem, and the goal of this assignment isn't for you to just implement a well-known algorithm (in fact, you are not required to implement Model 1 at all, as long as you can beat it). To get full credit you'll need to experiment. Here are some ideas that might inspire you:

 * Add an alignment model that favors alignment points close to the diagonal ([paper](http://aclweb.org/anthology/N/N13/N13-1073.pdf))
 * Use a hidden Markov model (HMM) to add structure to the dependencies between alignments ([paper](http://aclweb.org/anthology-new/C/C96/C96-2141.pdf))
 * Add POS information ([paper](http://acl.ldc.upenn.edu/W/W02/W02-1012.pdf))
 * Train a discriminative aligner using the supervised training data we've provided ([using CRFs](http://aclweb.org/anthology-new/P/P06/P06-1009.pdf))
 * Be Bayesian about it ([variational](http://www.cs.rochester.edu/~gildea/pubs/riley-gildea-acl12.pdf) or [Gibbs](http://aclweb.org/anthology/P/P11/P11-2032.pdf))
 * Run models that distinguish source and target languages (like Model 1) and make them agree in their predictions ([paper](http://aclweb.org/anthology-new/N/N06/N06-1014.pdf) or [paper](http://www.denero.org/content/pubs/acl11_denero_dual.pdf))
 * German-specific ideas
   * Use "clause reordering" to make German word order more like English word order, or vice-versa ([paper](http://www.humanities.mcmaster.ca/~kucerov/ACL2005.pdf)).
   * Do something about compound words ([make German like English](http://homepages.inf.ed.ac.uk/pkoehn/publications/compound2003.pdf) or [see Ch. 4](http://www.cs.cmu.edu/~cdyer/singlespace-thesis.pdf), or [English like German](http://aclweb.org/anthology-new/P/P10/P10-1047.pdf)). You can use [cdec's compound splitting tool](http://www.cdec-decoder.org/).
   * Do something about inflectional morphology ([paper](http://nlp.stanford.edu/~mcclosky/papers/sgwater-emnlp-2005.pdf))
 * [See what other ideas people have had](http://scholar.google.com/scholar?q=word+alignment)

## Ground Rules

 * You may work in independently or in groups of any size, under these conditions:
    * You must notify us by posting a public note to piazza including the e-mails of everyone who will be working in the group (max=3).
    * Everyone in the group will receive the same grade on the assignment.
    * Once you have formed a group, you may **not** disband until the next homework.

 * You must turn in the following by submitting to your public course GitHub repository:
    * `hw1/output.txt` - your alignment of the full set of paralle data (dev/test/training). You can push new output as often as you like up until the assignment deadline. The output will be evaluated on the test data (which you do not have gold alignments for), but the `grade` program will give you a good idea how you are doing. Whoever has the lowest AER score on the test set when the deadline passes receives the most bonus points.
    * `hw1/README.md` - a brief description of the algorithms you tried.
    * `hw1/...` - your source code and revision history. We want to see evidence of *regular progress* over the course of the project. You don't have to `git push` to the public repository unless you want to, but you should be committing changes with `git add` and `git commit`. We expect to see evidence that you are trying things out and learning from what you see.

 * **You may only use data or code resources other than the ones we provide if you post a public notification on Piazza at least one week before the assignment is due.** So if, say, you have a cool idea for using the [Stanford parser](http://nlp.stanford.edu/software/lex-parser.shtml) (which knows both German and English!), or a German-English dictionary, that's great. But to make things fair everyone should have access to the same set of resources, so we'll ask you to share the parses. This kind of constrained data condition is common in real-world evaluations of AI systems. In keeping with this philosophy, we're much more likely to approve your request if you ask **early**. Do not ask the night before the assignment.

 * **A few things are off-limits:** Giza++, fast_align, cdec's alignment tools, the Berkeley Aligner, or anything else that already does the alignment for you. You must write your own code for alignment. If you want to do system combination, join forces with your classmates to form a group.

## Acknowledgements

This assignment has been done in various forms in the past by [Philipp Koehn](http://homepages.inf.ed.ac.uk/pkoehn/), [John DeNero](http://www.denero.org/), and at [Adam Lopez, Chris Callison-Burch, and Matt Post](http://mt-class.org/hw1.html).
