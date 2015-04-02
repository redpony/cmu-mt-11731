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

At test time, you will be given a new set of tuples $(x, c)$ and asked to predict, for each of these, the corresponding $y$ from among all the translation options for $x$ that you find in the provided phrase table (we denote the set of translation options as $\mathscr{Y}(x)$).

## Baseline

The baseline you must implement (or beat) is to build a discriminative linear classifier trained to optimize the hinge loss function. You are also required to implement a few basic context-sensitive features (we discuss them below). The baseline model is defined as follows.
Given a phrase $x$ in a context $c$, reference $y^\*$, and a set of translation candidates $\mathscr{Y}(x)$, the baseline objective is to minimize the following:

$$\begin{align\*}
\mathscr{L} &= \sum_{y^- \in \mathscr{Y}(x) \setminus y^\*} \max(0, \gamma - \textit{score}(x, c, y^\*) + \textit{score}(x, c, y^-)) \\\\
 &= \sum_{y^- \in \mathscr{Y}(x) \setminus y^\*} \max(0, \gamma - \mathbf{f}(x, c, y^\*) \cdot \mathbf{w} + \mathbf{f}(x, c, y^-) \cdot \mathbf{w}) \\\\
  &= \sum_{y^- \in \mathscr{Y}(x) \setminus y^\*} \max(0, \gamma - (\mathbf{f}(x, c, y^\*) - \mathbf{f}(x, c, y^-)) \cdot \mathbf{w}) \\\\
\end{align\*}$$

where $\mathbf{f}(x, c, y^\*)$ is a function that takes a source phrase, context, and translation hypothesis and returns a vector of real-valued features and $w$ is a weight vector to be learned from training data.

Intuitively, what this objective says is that the score of the right translation ($y^\*$) of $x$ in context $c$ needs to be higher than the score of all the other translations (the $y^-$) of $x$, by a margin of at least $\gamma$ (you can pick any number greater than or equal to 0 for $\gamma$). If the model picks the wrong answer, or if it picks the right answer, but its score is too close to that of a wrong answer, you will suffer a penalty.

Your learner should optimize this objective function using stochastic subgradient descent. That is you should iteratively perform the update

$$\mathbf{w}_{(i+1)} = \mathbf{w}_{(i)} - \alpha \cdot \frac{\partial \mathscr{L}}{\partial \mathbf{w}}$$

where $\alpha$ is some learning rate (the optimal value of the learning rate will depend on the features you use, but usually a value of 0.1 or 0.01 work well).

Despite all the notation, the stochastic subgradient descent algorithm for this model is very simple: you will loop over all $(x,c,y^\*)$ tuples in the training data, and for each of these you will loop over all of the possible wrong answers (the $\mathscr{Y}(x) \setminus y^\*$), you will then compute the following quantity:

$$\begin{align\*}
\mathscr{L}(x,c,y^\*) = \max(0, \gamma - (\mathbf{f}(x, c, y^\*) - \mathbf{f}(x, c, y^-)) \cdot \mathbf{w})
\end{align\*}$$

If you get 0, your model is doing the right thing on this example. If you compute any non-zero score, you need to update the weights by following the direction of steepest descent, which is given by the derivative of $\gamma - (\mathbf{f}(x, c, y^\*) - \mathbf{f}(x, c, y^-)) \cdot \mathbf{w}$ with respect to $\mathbf{w}$. Fortunately, this expression is very simple to differentiate: it is just a constant value plus a dot product, and the derivative of $c + \mathbf{a}\cdot\mathbf{b}$ with respect to $\mathbf{b}$ is just $\mathbf{a}$, so the derivative you need to compute is simply
$$\begin{align\*}
\frac{\partial \mathscr{L}}{\partial \mathbf{w}} = \mathbf{f}(x, c, y^\*) - \mathbf{f}(x, c, y^-)
\end{align\*}$$

TODO: Describe baseline features

To earn 7 points on this assignment, you must **implement a the described learning algorithm using the above features**
 so that it is capable of predicting which Czech translation of a highlighted source phrase is most likely given its context.

## Default model

To help get you started, we are providing a default model that four important features, $\log p(e|f)$, $\log p(f|e)$, $\log p_{lex}(e|f)$, and $\log p_{lex}(f|e)$. Furthermore, it uses the simple weight vector $(1\;0\;0\;0)$. Therefore it always simply sorts the candidates by $p(e \mid f)$. Thus, the default model is not sensitive to context.

**Implementation hints**: 

## The Challenge

As discussed above, our baseline reranker simply sorts the candidates by $p(e|f)$. In our simple "bank" example, it would always then suggest <i>banka</i> over <i>břeh</i>.

Here are some ideas:

 * Add $\ell_1$ or $\ell_2$ regularization to prevent the learner from assigning too much importance to rare features.
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
