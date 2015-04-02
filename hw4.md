---
layout: default
title: Homework 4
---
# Homework 4

**Due 11:59pm on Tuesday, April 21, 2015**

Usually during decoding we re given a translation table, where each phrase pair is assigned some fixed scores.

Consider the following two input sentences:

<center>i went to the <b>bank</b> to deposit my paycheck .</center>
<br />

<center>the log rolled down the <b>bank</b> and into the water .</center>
<br />

Usually during decoding we're given a translation table, in which each phrase pair is assigned some fixed scores.
For example, we might know that overall in translating into Czech, $p(\text{banka} | \text{bank}) = 0.8$ and $p(\text{břeh} | \text{bank}) = 0.2$.

Upon looking at these two input sentences, however, we might want to rethink those probabilities.
In the former sentence, the correction translation of "bank" is  seems likely to be <i>banka</i> (financial institution), just like the phrase table predicts.
In the latter, however, it's more likely to be <i>břeh</i> (river bank) despite the translation table probabilities.

**Your task is to use the context in the source sentence to rerank the translation options of the highlighted word.**

This assignment will be graded by <i>mean reciprocol rank</i> (MRR), which captures the intuition that we want the "correct" translation to be highly ranked, even if it is not first in the reranked list.
If the reference is the $n$th item in your reranked list, you will recieve a score of $\frac{1}{n}$ for that sentence.
Your score is then averaged across all sentences in the test set, yielding a number between 0 (bad) and 1 (good).

## Getting started

Go to your clone of your course GitHub repository on the machine where you will be doing this assignment, and run the following command to obain the code and data you will need:

    ./tools/get-new-assignments

We have provided you with a trivial ranking algorithm that simply sorts the translation candidate list by $p(e|f)$.
You will additionally be given several hundred thousand parallel Czech-English sentences along with some training data extracted therefrom.
For convenience, we also provide dependency parses and POS tags for each sentence in training set.

The baseline you must implement (or beat) is to build a linear discriminative classifier trained to optimize the hinge loss function.
Given a phrase $x$ in a context $c$, reference $y^\*$, and a set of translation candidates $\mathscr{Y}(x)$, the loss is:

$$\begin{align\*}
\mathscr{L} &= \sum_{y^- \in \mathscr{Y}(x) \setminus y^\*} \max(0, \gamma - f(x, c, y^\*) \cdot \mathbf{w} + f(x, c, y^-) \cdot \mathbf{w}) \\\\
\end{align\*}$$

Here $\gamma$ is the size of the margin that we desire between the score of $y^\*$ and any other option, and $f(x, c, y)$ is a function that returns a vector of features representative of the phrase pair $(x, y)$ in the context $c$.

Your decoder should optimize this objective function using stochastic gradient descent. That is you should iteratively perform the update

$$\mathbf{w} = \mathbf{w} - \alpha \cdot \frac{\partial \mathscr{L}}{\partial \mathbf{w}}$$

where $\alpha$ is some learning rate.

At test time, you will be given a new set of tuples $(x, c)$ and asked to predict the corresponding $y$.
You do this by simply returning a list of all of the $y$s in $\mathscr{Y}(x)$, sorted by $f(x, c, y) \cdot \mathbf{w})$.

The default decoder uses only four features, all of which are phrase local: $p(e|f)$, $p(f|e)$, $p_{lex}(e|f)$, and $p_{lex}(f|e)$. Furthermore, it uses the simple weight vector $(1\;0\;0\;0)$. Therefore it always simply sortes the candidates by $p(e|f)$.

TODO: Describe baseline features

To earn 7 points on this assignment, you must **implement a hinge-loss perceptron using the above features**
 so that it is capable of predicting which Czech translation of a highlighted source phrase is most likely given its context.

**Implementation hints**: 

## The Challenge

As discussed above, our baseline reranker simply sorts the candidates by $p(e|f)$. In our simple "bank" example, it would always then suggest <i>banka</i> over <i>břeh</i>.

Here are some ideas:

 * Use convolutional neural networks to automatically learn to discriminate translations from context ([paper](http://arxiv.org/pdf/1503.02357v1.pdf))
 * Leverage dependency and POS information to predict case ([paper](http://aclweb.org/anthology/D/D13/D13-1174.pdf))
 * Use lexical context and syntactic information ([paper](https://aclweb.org/anthology/W/W08/W08-0302.pdf))

## Ground Rules

 * You may work in independently or in groups of any size, under these conditions:
    * You must notify us by posting a public note to piazza including the e-mails of everyone who will be working in the group (max=3).
    * Everyone in the group will receive the same grade on the assignment.
    * Once you have formed a group, you may **not** disband until the next homework.

 * You must turn in the following by submitting to the public GitHub repository
    * `hw4/output.txt`
    * `hw4/README.md` - a brief description of the algorithms you tried.
    * `hw4/...` - your source code and revision history. We want to see evidence of *regular progress* over the course of the project. You don't have to `git push` to the public repository unless you want to, but you should be committing changes with `git add` and `git commit`. We expect to see evidence that you are trying things out and learning from what you see.

You do not need any other data than what is provided. **You should feel free to use additional codebases and libraries except for those expressly intended to decode machine translation models**. If you would like to base your solution on finite-state toolkits or generic solvers for traveling salesman problems or integer linear programming, that is fine. But machine translation software including (but not limited to) Moses, `cdec`, Joshua, or phrasal is off limits. You may of course inspect these systems if you want to understand how they work. But be warned: they are generally quite complicated because they provide a great deal of other functionality that is not the focus of this assignment. It is possible to complete the assignment with a quite modest amount of python code. If you aren't sure whether something is permitted, ask us.
