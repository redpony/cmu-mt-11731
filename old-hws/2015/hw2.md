---
layout: default
title: Homework 2
---
# Homework 2

**Due 11:59pm on Thursday, Mar. 5, 2015**

Automatic evaluation of machine translation output relative to a human reference (or, if available, a set of reference translations) is a core challenge in machine translation. Not only are such evaluation measures useful for determining whether a change to an MT system improved or degraded its performance, being able to solve the translation evaluation problem provides a simpler version of the translation problem itself: an effective evaluation measure must determine if a hypothesis is **fluent** and if it has the same **meaning** as the reference. These roughly correspond to the language model and translation model in the noisy channel decomposition of the translation problem we talked about.

## Getting started

Go to your clone of your course GitHub repository on the machine where you will be doing this assignment, and run the following command to obain the code and data you will need:

    ./tools/get-new-assignments

In this homework, you will study the translation evaluation problem as follows. You will be given tuples of two English-language **translation hypotheses** ($\textbf{h}_1$ and $\textbf{h}_2$) and a **reference translation** ($\textbf{e}$) that was generated by a human translator. Your task will be to decide whether $\textbf{h}_1$ is a better translation than $\textbf{h}_2$, whether they are equally good (or bad), or whether $\textbf{h}_2$ is a better than $\textbf{h}_1$ by designing a function $f \mapsto \\{ -1,0,1 \\} $ indicating these three options, respectively.

To illustrate, suppose that $\textbf{h}_1$ and $\textbf{h}_2$ are the translation outputs from two different translation systems of the following input:

<center><i>Chris hat die Prüfung bestanden, jedoch nur knapp.</i></center>
<br />

where the two systems produce:

<center>$\textbf{h}_1 = $<i>Chris has insisted on the test, but just barely.</i></center>
<center>$\textbf{h}_2 = $<i>Chris has passed the test, but just barely.</i></center>
<br />

Let us assume that we are given the following reference translation:

<center>$\textbf{e} = $<i>Chris just barely passed the test.</i></center>
<br />

We would hope that our automatic evaluation function $f$ would return $1$ with these inputs, indicating that $\textbf{h}_2$ is a better translation.

This assignment comes with a very simple evaluation algorithm implemented:

$$\begin{align\*}
f(\textbf{h}_1,\textbf{h}_2,\textbf{e}) = \begin{cases}
-1 & \textrm{if }\ell(\textbf{h}_1,\textbf{e}) > \ell(\textbf{h}_2,\textbf{e}) \\\\
0 & \textrm{if }\ell(\textbf{h}_1,\textbf{e}) = \ell(\textbf{h}_2,\textbf{e})  \\\\
1 & \textrm{otherwise}
\end{cases}
\end{align\*}$$

where $\ell(\textbf{h},\textbf{e})$ is the count of words in $\textbf{h}$ that are also in $\textbf{e}$.

To run this baseline heuristic model, use the following command:

    ./evaluate | ./check > simple.pred

This runs the simple model and stores the output in `simple.pred`. To score the predictions, run this command:

    ./grade < simple.pred

This command computes the accuracy of predictions relative to human judgements of the quality of the two hypothesis translations.

## The Challenge

Your task for this assignment is to **improve the accuracy of your translation evaluator relative to human judgements of translation quality as much as possible**.

Developing an implementation that returns a prediction of which translation hypothesis is better relative to the reference by using the **simple METEOR score** is enough to earn seven points. The simple METEOR score is defined as the weighted [harmonic mean](http://en.wikipedia.org/wiki/Harmonic_mean#Harmonic_mean_of_two_numbers) of the precision and recall of word matches in each hypothesis against the reference (be sure to tune the precision-recall trade-off!).

This is a very simple baseline to implement. However, evaluation is by no means a solved problem, and the goal of this assignment is for you to develop a new approach to evaluating machine translation output that performs better than standard algorithms (as usual, you are not even required to implement the simple METEOR baseline at all, as long as you can beat it). *To get full credit, you will need to experiment.* Here are some ideas that might inspire you:

 * Use [WordNet](http://wordnet.princeton.edu/) to permit matching on synonyms
 * Compute string similarity using [string subsequence kernels](http://jmlr.csail.mit.edu/papers/volume2/lodhi02a/lodhi02a.pdf)
 * Use an $n$-gram language model to better assess fluency
 * Develop a single-sentence variant of [BLEU](http://acl.ldc.upenn.edu/P/P02/P02-1040.pdf)
 * Use a dependency parser to assess syntactic wellformedness ([paper](http://ssli.ee.washington.edu/people/jgk/dist/metaweb/mtjournal.pdf))
 * Learn a classifier (from the provided training data) that uses many different features ([paper](http://aclweb.org/anthology-new/W/W11/W11-2113.pdf))
 * See what evaluation measures other people have implemented ([paper](http://www.statmt.org/wmt10/pdf/wmt10-overview.pdf))

Be creative!

## Ground Rules

 * You may work in independently or in groups of up to three students, under these conditions:
    * You must notify us by posting a public note to piazza including the e-mails of everyone who will be working in the group.
    * Everyone in the group will receive the same grade on the assignment.
    * Once you have formed a group, you may **not** disband until the next homework.

 * You must turn in the following by submitting to the public GitHub repository
    * `hw2/output.txt` - your predictions (1 per line) on `data/train-test.hyp1-hyp2-ref`
    * `hw2/README.md` - a brief description of the algorithms you tried.
    * `hw2/...` - your source code and revision history. We want to see evidence of *regular progress* over the course of the project. You don't have to `git push` to the public repository unless you want to, but you should be committing changes with `git add` and `git commit`. We expect to see evidence that you are trying things out and learning from what you see.

You should feel free to use additional data resources such as thesauruses, WordNet, or parallel data. You are also free (and encouraged!) to use additional codebases, tools, and libraries **except for those designed to evaluate machine translation systems**. You ***must*** write your own evaluation function. However, if you want your evaluation to depend on lemmatizers, stemmers, automatic parsers, or part-of-speech taggers, or you would like to *learn* a metric using a general machine learning toolkit, that is fine. But translation evaluators including (but not limited too) available implementations of BLEU, METEOR, TER, NIST, and others are not permitted. You may of course inspect these systems if you want to understand how they work, although they tend to include other functionality that is not the focus of this assignment. It is possible to complete the assignment with a very modest amount of code. If you aren't sure whether something is permitted, ask us.

## Acknowledgements

This assignment has been done in the past in the course developed by [Adam Lopez, Chris Callison-Burch, and Matt Post](http://mt-class.org/past/jhu/2012/hw3.html).