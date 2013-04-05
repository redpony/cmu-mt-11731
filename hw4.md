---
layout: default
title: Homework 4
---
# Homework 4

**Due 11:59pm on Tuesday, Apr. 23, 2013**

*Reranking* is a common technique in machine translation which uses a discriminative model to *rescore* a set of the predictions made by a simpler machine translation model to make a better translation prediction. Reranking models are powerful since they do not need to *generate* translations only to *rerank* them. These models can therefore use overlapping, nonindependent features derived from rich information sources. Additionally, they are often applied to a subset of promising hypotheses, so computational effort is utilized only where it is most beneficial.

In this assignment you will explore reranking to improve the quality of a state-of-the-art Russian-English machine translation system.

## Getting started

Go to your clone of your course GitHub repository on the machine where you will be doing this assignment, and run the following command to obain the code and data you will need:

    ./tools/get-new-assignments

We have provided you with a list of translation hypotheses from a state-of-the-art Russian-English translation system, a simple reranker and a tool that computes the [METEOR score](http://www.cs.cmu.edu/~alavie/METEOR/) or [BLEU score](http://acl.ldc.upenn.edu/P/P02/P02-1040.pdf) of the resulting output (you will need to have `java` in your `PATH` environment variable for METEOR).

The data is divided into a `dev` set (400 sentences) and a `test` set (800 sentences). Each set contains the source sentences that are being translated, a single English reference translation (except for the last 400 sentences of the `test` set, which are blind), and 100 hypothesized translations for each input, together with three basic translation features, $-\log p(\textbf{e})$, $-\log p(\textbf{f} \mid \textbf{e})$, and $-\log p_{\textrm{lex}}(\textbf{f} \mid \textbf{e})$.

The command `./rerank` rescores the test set (or, optionally, any other set of translations) using feature weights $(\lambda_{\textrm{LM}}, \lambda_{\textrm{TM}}, \lambda_{\textrm{TM}_{\textrm{lex}}}) = (-1,-\frac{1}{2},-\frac{1}{2})$. These parameters can be changed with command line options.

    ./rerank > test.trans
    ./score-bleu < test.trans
    ./score-meteor < test.trans

To earn 7 points on this assignment, you must implement one of the following methods to set the three parameters so as to maximize (approximately) the **`dev` set corpus BLEU score**:

 * [Pairwise ranking optimization](http://www.aclweb.org/anthology-new/D/D11/D11-1125.pdf). This method was covered in class ([lecture](slides/11.disc1.pdf)). Sample random pairs of hypotheses from the development set, rank them according to BLEU or METEOR, and then creating a training instance for a binary classifier whose feature vector is the *difference* of the feature vectors for the two hypotheses and whose label indicates if the first or second translation is better. *This method is effective with a potentially large number of features.*
 * [Powell's method](http://math.fullerton.edu/mathews/n2003/PowellMethodMod.html). You should use $(-1,-\frac{1}{2},-\frac{1}{2})$ as the starting point and start by searching the directions indicated by the [standard basis vectors](http://en.wikipedia.org/wiki/Standard_basis) of the parameter space. The most challenging aspect of using Powell's method is the line search that is required to compute $\gamma_{\textrm{min}}$ during each iteration. While this can be done exactly using [Och's algorithm](http://acl.ldc.upenn.edu/acl2003/main/pdfs/Och.pdf), you are encouraged to explore simple methods. Although the line search objective is not unimodal, you can adapt the [golden section method](http://en.wikipedia.org/wiki/Golden_section_search). *This method is effective only with a small number of features.*

## The Challenge

Improving machine translation with reranking requires *informative features* and *an effective learning algorithm* to set model parameters to optimize a *reliable measure of translation quality*. Your task for this assignment is to **improve translation quality on the blind test set as much as possible** (where translation quality will be measured by METEOR) by working on **any or all of these subcomponents**.

Here are some ideas:

 * (Features) Add a feature that counts the number of target words to counter the bias that $n$-gram language models have for shorter outputs.
 * (Features) Add a feature that counts the number of words that appear to be untranslated.
 * (Features) Learn translation a lexical translation model to generate more translation features from [this word aligned Russian-English parallel corpus](http://www.ark.cs.cmu.edu/cdyer/train.ru-en.align.gz).
 * (Features) Use data from the United Nations to build an even bigger (and maybe better) translation model ([slides](http://www.lrec-conf.org/proceedings/lrec2010/slides/686.pdf))
 * (Features) Use a syntactic language model ([paper](http://cs.brown.edu/research/pubs/pdfs/2003/Charniak-2003-SBL.pdf))
 * (Features) Use source side context ([paper](http://aclweb.org/anthology-new/W/W08/W08-0302.pdf) and [paper](http://www.aclweb.org/anthology-new/D/D09/D09-1022.pdf))
 * (Features) Use [Brown clusters](http://acl.ldc.upenn.edu/J/J92/J92-4003.pdf) in [English](http://www.ark.cs.cmu.edu/cdyer/en-c600.gz) and/or [Russian](http://www.ark.cs.cmu.edu/cdyer/ru-c600.gz) to formulate features ([paper](http://www.iro.umontreal.ca/~lisa/pointeurs/turian-wordrepresentations-acl10.pdf))
 * (Learning) Use feature selection to identify promising features without overfitting ([paper](http://www.aclweb.org/anthology-new/J/J05/J05-1003.pdf))
 * (Learning) Look at the extent to which each hypothesis in the list agrees with other translations in the list ([minimizing the Bayes' risk](http://acl.ldc.upenn.edu/hlt-naacl2004/main/pdf/60_Paper.pdf) of the selection under a user-defined loss function)
 * (Learning) Use a nonlinear decision rule ([paper](http://acl.ldc.upenn.edu/W/W07/W07-0710.pdf)).
 * (Evaluation) Use the classifier you developed in [Homework 2](hw2.html) in conjunction with *pairwise ranking optimization* to create better training pairs than BLEU or METEOR creates.

## Ground Rules

 * You may work in independently or in groups, under these conditions:
    * You must notify us by posting a public note to piazza including the e-mails of everyone who will be working in the group (max=3).
    * Everyone in the group will receive the same grade on the assignment.
    * Once you have formed a group, you may **not** disband until the next homework.

 * You must turn in the following by submitting to the public GitHub repository
    * `hw4/output.txt`
    * `hw4/README.md` - a brief description of the algorithms you tried.
    * `hw4/...` - your source code and revision history. We want to see evidence of *regular progress* over the course of the project. You don't have to `git push` to the public repository unless you want to, but you should be committing changes with `git add` and `git commit`. We expect to see evidence that you are trying things out and learning from what you see.

 * You may only use data or code resources other than the ones we provided they are made available to everyone in the class and announced at least one week before the deadline by a post to Piazza.
 * There are a few things that are off limits: existing tools for reranking $k$-best lists for machine translation or translation systems (your output **must** be one of the 100 hypotheses we have provided). If you have questions, please ask us.

## Acknowledgements

This assignment has been done in the past in the course developed by [Adam Lopez, Chris Callison-Burch, and Matt Post](http://mt-class.org/hw4.html).
