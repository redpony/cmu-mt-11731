---
layout: default
title: Homework 3
---
# Homework 3

**Due 11:59pm on Tuesday, Apr. 2, 2013**

Decoding is the problem of taking an input sentence in a foreign language:

<center><i>claramente , es preferible la segunda opción</i></center>
<br />

and finding the best translation into a target language, according to a model:

<center><i>clearly , the second option is preferable</i></center>
<br />

**Your task is to find the most probable translation, given the Spanish input, the translation likelihood model, and the English language model.** We assume the traditional noisy channel decomposition:
$$\begin{align\*}
\textbf{e}^* &= \arg \max_{\textbf{e}} p(\textbf{e} \mid \textbf{f}) \\\\
 &= \arg \max_{\textbf{e}} \frac{p_{\textrm{TM}}(\textbf{f} \mid \textbf{e}) \times p_{\textrm{LM}}(\textbf{e})}{p(\textbf{f})} \\\\
 &= \arg \max_{\textbf{e}} p_{\textrm{TM}}(\textbf{f} \mid \textbf{e}) \times p_{\textrm{LM}}(\textbf{e}) \\\\
 &= \arg \max_{\textbf{e}} \sum_{\textbf{a}} p_{\textrm{TM}}(\textbf{f},\textbf{a} \mid \textbf{e}) \times p_{\textrm{LM}}(\textbf{e}) \end{align\*}$$
We also assume that the distribution over all segmentations and all alignments is *uniform*. This means that there is **no** distortion model or segmentation model. Unlike in HW2 and the next assignment, you will be evaluated not translation quality, BLEU score, or human correlation, but simply on how well you execute the above search. The higher the probability of the translation you find, the better.

## Getting started

Go to your clone of your course GitHub repository on the machine where you will be doing this assignment, and run the following command to obain the code and data you will need:

    ./tools/get-new-assignments

We have provided you with a stack-based decoder written in Python, implementing a simplified version of the algorithm we discussed in [Lecture 8](slides/08.pbmt2.pdf). 
In this assignment, you will be given a 3-gram English language model, a English-Spanish phrase-based translation model, and some Spanish input sentences.

The simple decoder solves the search problem, but makes two assumptions. First, the provided decoder makes a very common assumption:
$$\begin{align\*}
\textbf{e}^* &= \arg \max_{\textbf{e}} \sum_{\textbf{a}} p_{\textrm{TM}}(\textbf{f},\textbf{a} \mid \textbf{e}) \times p_{\textrm{LM}}(\textbf{e}) \\\\
 &\approx \arg \max_{\textbf{e}} \max_{\textbf{a}} p_{\textrm{TM}}(\textbf{f},\textbf{a} \mid \textbf{e}) \times p_{\textrm{LM}}(\textbf{e}) \end{align\*}$$
This approximation means that you can use the dynamic programming Viterbi algorithm to find the best translation.

Second, the provided decoder does not do any reordering of phrases during translation. So therefore, reordering of source words can only be accomplished if the reordering is part of a *memorized phrase pairs*. If word-for-word translations are all that are available for some sentence, the translations will always be in the source language order.

Unfortunately, this decoder does not do a good job finding the highest probability translations, and worse, these low scoring translations have poor translation quality. To illustrate the limitations, consider how the default decoder translates the first sentence of `data/input`:

<center><i>el <font color="blue"><b>ejército turco</b></font> no tiene interés en correr los riesgos que entraña la participación en las <font color="blue"><b>luchas sectarias</b></font> en el iraq .</i></center>
<br />

The default decoder produces the following output

<center><i>the <font color="red"><b>army turkish</b></font> has no interest in take the risks implied participation in the <font color="red"><b>fighting sectarian</b></font> in iraq .</i></center>
<br />

in which *noun-adjective* sequences in Spanish were not translated into English *adjective-noun* sequences.

But what is the model score? The provided script `./grade` tells us this translation has a model score of $-112.980727$ (model scores are given in log base $e$). To demonstrate that this is a search problem—not problem with the model—we can look at what happens if we correct these two reordering errors, produing the following sentence:

<center><i>the <font color="blue"><b>turkish army</b></font> has no interest in take the risks implied participation in the <font color="blue"><b>sectarian fighting</b></font> in iraq .</i></center>
<br />

The manually improved translation obtains a higher score of $-106.936034$. Although this score is higher, our decoder was not able to find it, since it did not consider reordering of phrases during translation.

To earn 7 points on this assignment, you must **implement a decoder** or **modify the provided decoder** so that it is capable of **swapping adjacent phrase pairs** during translation. This will make your decoder capable of dealing with the particular problem we just described. It is not necessary to marginalize over alignments during decoding to receive 7 points. The decision as to whether phrases a phrase pair should be swapped or translated monotonically should be made so as to maximize the language model probability.

**Implementation hints**: As you are producing an English translation, your decoder must be able to "jump over" a source phrase, translate the next source phrase, and then jump back to translate the skipped phrase. You will need to modify the `hypothesis` object so that it keeps track of what words are covered.

## The Challenge

As discussed above, our baseline decoder failed to find the best scoring translation because we made two simplifying assumptions for the sake of computational tractability:

 * Rather than finding the best probability translation, summing over all possible segmentations of the input into phrases, we find the best translation *and* alignment. That is, we maximize $p(\textbf{e},\textbf{a} \mid \textbf{f})$ rather than $\sum_{\textbf{a}} p(\textbf{e},\textbf{a} \mid \textbf{f})$. This is because finding the most probable string, marginalizing over all paths is an [NP-hard problem](http://acl.ldc.upenn.edu/C/C96/C96-2215.pdf) (the "MPS problem").

 * The default decoder does not reorder phrases at all, and the required baseline decoder needs to be able to swap only adjacent phrases. However, the best translation may involve more complex permutations of the phrases used in translation. Unfortunately, even with the Viterbi approximation, considering all permutations of the source is still [NP-hard](http://www.aclweb.org/anthology-new/P/P09/P09-1038.pdf) (by reduction to the traveling salesperson problem).

To get the best model score possible, you should implement a decoder that searches more of the reordering space and/or considers the effect of marginalizing over different alignments. However, this is a computationally hard problem, so you will need to make some approximations.

Here are some ideas:

 * Implement a full phrase-based decoder to permit arbitrary reordering during decoding ([paper](http://acl.ldc.upenn.edu/N/N03/N03-1017.pdf))
 * Reorder the input sentence so it has a target-like order, then use the baseline decoder ([paper](http://acl.ldc.upenn.edu/P/P05/P05-1066.pdf))
 * Use finite state transducers to carry out the search ([paper](http://mi.eng.cam.ac.uk/~wjb31/ppubs/ttmjnle.pdf))
 * Use chart parsing to consider a large number of permutations in polynomial time ([paper](http://acl.ldc.upenn.edu/C/C04/C04-1030.pdf))
 * Implement a greedy decoder ([paper](http://www.iro.umontreal.ca/~felipe/bib2webV0.81/cv/papers/paper-tmi-2007.pdf])
 * Use ILP/Langrangian relaxation ([paper](http://aclweb.org/anthology-new/D/D11/D11-1003.pdf))
 * Use Monte Carlo techniques to marginalize alignments ([paper](http://www.springerlink.com/content/d55r04j3850h8473/))
 * Use variational techniques to marginalize alignments ([paper](http://www.cs.jhu.edu/~zfli/pubs/variational_decoding_zhifei_acl09.pdf))

## Ground Rules

 * You may work in independently or in groups of any size, under these conditions:
    * You must notify us by posting a public note to piazza including the e-mails of everyone who will be working in the group (max=3).
    * Everyone in the group will receive the same grade on the assignment.
    * Once you have formed a group, you may **not** disband until the next homework.

 * You must turn in the following by submitting to the public GitHub repository
    * `hw3/output.txt`
    * `hw3/README.md` - a brief description of the algorithms you tried.
    * `hw3/...` - your source code and revision history. We want to see evidence of *regular progress* over the course of the project. You don't have to `git push` to the public repository unless you want to, but you should be committing changes with `git add` and `git commit`. We expect to see evidence that you are trying things out and learning from what you see.

You do not need any other data than what is provided. **You should feel free to use additional codebases and libraries except for those expressly intended to decode machine translation models**. If you would like to base your solution on finite-state toolkits or generic solvers for traveling salesman problems or integer linear programming, that is fine. But machine translation software including (but not limited to) Moses, `cdec`, Joshua, or phrasal is off limits. You may of course inspect these systems if you want to understand how they work. But be warned: they are generally quite complicated because they provide a great deal of other functionality that is not the focus of this assignment. It is possible to complete the assignment with a quite modest amount of python code. If you aren't sure whether something is permitted, ask us.

## Acknowledgements

This assignment has been done in the past in the course developed by [Adam Lopez, Chris Callison-Burch, and Matt Post](http://mt-class.org/hw2.html).
