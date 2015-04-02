---
layout: default
title: Homework 4
---
# Homework 4

**Due 11:59pm on Tuesday, April 21, 2015**

In phrase based translation, the decoder makes use of a **phrase table** which contains translations of phrases in the source language into the target language, along with **scores** that give information about how probable or "good" the translation option is likely to be. For example, in an English–Czech MT system, the phrase table might tell us that there are two translations for the English word *bank* into Czech: *banka* and *břeh* (corresponding to the financial institution sense and river bank sense, respectively), with translation probabilities $p(\text{banka} \mid \text{bank}) = 0.8$ and $p(\text{břeh} \mid \text{bank}) = 0.2$.  These probabilities are usually assumed to be the relative frequencies with which each source phrase was translated into each target phrase in the parallel corpus used to train the translation model.

Let us consider the problem of translating the following two English sentences into Czech:

<center>i went to the <b>bank</b> to deposit my paycheck .</center>
<br />

<center>the log rolled down the <b>bank</b> and into the water .</center>
<br />

Upon looking at these two input sentences, however, we might want to rethink the appropriateness of using context-independent relative frequencies to estimate the translation probabilities.
In the former sentence, the correction translation of "bank" is seems likely to be <i>banka</i> (financial institution), just like our example phrase table predicts.
In the latter, however, it's more likely to be <i>břeh</i> (river bank) despite the translation table probabilities.

**In this homework, your task is to use the *context* in the source sentence to rerank the translation options of the highlighted word.**

This assignment will be graded by <i>mean reciprocol rank</i> (MRR), which captures the intuition that we want the "correct" translation (as determined by a reference sentence translation) to be highly ranked, even if it is not first in the reranked list.
If the reference is the $n$th item in your reranked list, you will recieve a score of $\frac{1}{n}$ for that sentence.
Your score is then averaged across all sentences in the test set, yielding a number between 0 (bad) and 1 (good).

## Getting started

Go to your clone of your course GitHub repository on the machine where you will be doing this assignment, and run the following command to obain the code and data you will need:

    ./tools/get-new-assignments

We have provided you with a trivial ranking algorithm that simply sorts the translation candidate list by $p(e \mid f)$.
You will additionally be given several hundred thousand parallel Czech–English sentences along with some training data extracted therefrom.
For convenience (and to inspire you!), we also provide dependency parses and POS tags for each input sentence in training, dev, and test sets.


### Provided data

We are providing you with training, development, and blind test datasets consisting of tuples $(x,c,y^\*)$ of an English source phrase ($x$), the English sentential context ($c$), and a Czech reference translation of the English source phrase ($y^\*$). You will also be provided with an English–Czech phrase table ($\mathscr{Y}$) which is guaranteed to contain the English source phrase and the Czech target phrase for every tuple we provide (of course, in a real system, you would need to deal with OOV words at test time).

At test time, you will be given a new set of tuples $(x, c)$ and asked to predict, for each of these, the corresponding $y$ from among all the translation options for $x$ that you find in the provided phrase table (we denote the set of translation options as $\mathscr{Y}(x)$).

## Data Formats

Training, dev, and test sets are all given in the same file format.
Each line will contain one training sentence split into three parts using a triple pipe ("|||") as the delimiter.
The first part is the <i>left context</i>, the middle part is the phrase of interest, whose Czech translation we wish to predict, and the third is the <i>right context</i>.
For example:
<center>there are ten countries  |||  along  |||  this river .</center>

Here "along" is the word we wish to translate into Czech. The reference translations are given in a corresponding file. For this example, the correct translation is <i>podél</i>.

## Baseline

The baseline you must implement (or beat) is a linear model that assigns a score to each phrase translation in the phrase table for a source language phrase *in the context of a full sentence*. That is, the baseline model assigns a score to a translation option in a source language context as $\textit{score}(x,c,y) = \mathbf{f}(x,c,y) \cdot \mathbf{w}$. For the baseline model, you are required to do two things: (i) engineer the feature functions $\mathbf{f}(x,c,y)$ (we discuss the required features below) and (ii) learn the weight vector $\mathbf{w}$ from a corpus of a training examples which pair the sources phrases ($x$) and contexts ($c$) with a correct translation ($y^\*$).

If the training data we provided had "reference scores", we could use linear regression to solve this problem. However, all we know is what translation was used in various different contexts (and of course, what other translations the model could have used—the phrase table). Therefore, to estimate the parameters of the scoring function, we will optimize the following **pairwise ranking loss**:

$$\begin{align\*}
\mathscr{L}(x, c, y^\*) &= \sum_{y^- \in \mathscr{Y}(x) \setminus y^\*} \max(0, \gamma - \textit{score}(x, c, y^\*) + \textit{score}(x, c, y^-)) \\\\
 &= \sum_{y^- \in \mathscr{Y}(x) \setminus y^\*} \max(0, \gamma - \mathbf{f}(x, c, y^\*) \cdot \mathbf{w} + \mathbf{f}(x, c, y^-) \cdot \mathbf{w}) \\\\
  &= \sum_{y^- \in \mathscr{Y}(x) \setminus y^\*} \max(0, \gamma - (\mathbf{f}(x, c, y^\*) - \mathbf{f}(x, c, y^-)) \cdot \mathbf{w}) \\\\
\end{align\*}$$

where $\mathbf{f}(x, c, y^\*)$ is a function that takes a source phrase, context, and translation hypothesis and returns a vector of real-valued features and $w$ is a weight vector to be learned from training data. Here $\mathscr{L}(x, c, y^\*)$ is <i>per-instance</i> loss, which should be summed over all training instances to calculate the <i>total corpus loss</i>.

Intuitively, what this objective says is that the score of the right translation ($y^\*$) of $x$ in context $c$ needs to be higher than the score of all the other translations (the $y^-$) of $x$, by a margin of at least $\gamma$ (you can pick any number greater than 0 for $\gamma$; however note that if you set it to 0, there would be a degenerate solution which set $\mathbf{w}=0$ which would not be a very useful model). Thus, if ranks the wrong translation in context higher than the right translation, or if it picks the right answer, but its score is too close to that of the wrong answer, you will suffer a penalty.

Your learner should optimize this objective function using stochastic subgradient descent. That is, you should iteratively perform the update

$$\mathbf{w}_{(i+1)} = \mathbf{w}_{(i)} - \alpha \cdot \frac{\partial \mathscr{L}(x, c, y^\*)}{\partial \mathbf{w}}$$

where $\alpha$ is some learning rate (the optimal value of the learning rate will depend on the features you use, but usually a value of 0.1 or 0.01 work well).

Despite all the notation, the stochastic subgradient descent algorithm for this model is very simple: you will loop over all $(x,c,y^\*)$ tuples in the training data, and for each of these you will loop over all of the possible wrong answers (the $\mathscr{Y}(x) \setminus y^\*$), you will then compute the following quantity:

$$\begin{align\*}
\mathscr{L}(x,c,y^\*) = \max(0, \gamma - (\mathbf{f}(x, c, y^\*) - \mathbf{f}(x, c, y^-)) \cdot \mathbf{w})
\end{align\*}$$

If you get 0, your model is doing the right thing on this example. If you compute any non-zero score, you need to update the weights by following the direction of steepest descent, which is given by the derivative of $\gamma - (\mathbf{f}(x, c, y^\*) - \mathbf{f}(x, c, y^-)) \cdot \mathbf{w}$ with respect to $\mathbf{w}$. Fortunately, this expression is very simple to differentiate: it is just a constant value plus a dot product, and the derivative of $c + \mathbf{a}\cdot\mathbf{b}$ with respect to $\mathbf{b}$ is just $\mathbf{a}$, so the derivative you need to compute is simply
$$\begin{align\*}
\frac{\partial \mathscr{L}(x, c, y^\*)}{\partial \mathbf{w}} = \mathbf{f}(x, c, y^\*) - \mathbf{f}(x, c, y^-)
\end{align\*}$$

The baseline set of features you are to implement is a set of <i>sparse</i> features following two feature templates, along with the four features provided for each phrase in the phrase table:

 * The four default phrase table features are the logs of the following four quantities: $p(e|f)$, $p(f|e)$, $p_{lex}(e|f)$, $p_{lex}(f|e)$.
 * A binary feature that conjoins (i) the source word, (ii) the hypothesis translation, and (iii) the previous word in the target sentence. Written as a string, a feature might be `src:bank_tgt:banka_prev:the`, and it would have a value of 1.
 * A binary feature that conjoins (i) the source word, (ii) the hypothesis translation, and (iii) the next word in the source sentence. An example feature string might look like `src:bank_tgt:banka_next:the`, and it would have a value of 1.

Note that this feature set is very sparse, yielding thousands of individual features. If you use Python, we recommend that you make use of `scipy.sparse.csr_matrix` to represent your feature vectors. There are equivalent sparse vector data types in almost every programming language.

To earn 7 points on this assignment, you must **implement a the described learning algorithm using the above features**
 so that it is capable of predicting which Czech translation of a highlighted source phrase is most likely given its context.

## Default model

To help get you started, we are providing a default model that four important features, $\log p(e|f)$, $\log p(f|e)$, $\log p_{lex}(e|f)$, and $\log p_{lex}(f|e)$. Furthermore, it uses the simple weight vector $(1\;0\;0\;0)$. Therefore it always simply sorts the candidates by $p(e \mid f)$. Thus, the default model is not sensitive to context.

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

You do not need any other data than what is provided. **You should feel free to use additional codebases and libraries. Nothing is off limits here -- the sky is the limit!**
You may use other sources of data if you wish, provided that you notify the class via Piazza.
