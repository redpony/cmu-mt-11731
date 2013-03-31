---
layout: default
title: Homework 4
---
# Homework 4

**Due 11:59pm on Tuesday, Apr. 23, 2013**

*Discriminative reranking* uses a discriminative model to rerank (i.e., rescore) the outputs of a baseline machine translation system to improve its translation quality.

For example, a baseline noisy channel decoder may produce the following $k$-best translations:

    er hat die Hexe gesehen ||| he saw the witch ||| 0-0 ||| p(f|e)=-4.2 p(a)=-2.4 p(e)=-9.5
    er hat die Hexe gesehen ||| he has seen the witch ||| 0-0 ||| p(f|e)=-3.1 p(a)=-1.9 p(e)=-12.8
    er hat die Hexe gesehen ||| he has the witch seen ||| 0-0 1-1 2-2 3-3 4-4 ||| p(f|e)=-3.1 p(a)=0.0 p(e)=-15.8
    er hat die Hexe gesehen ||| he has saw the witch ||| 0-0 ||| p(f|e)=-3.5 p(a)=-1.8 p(e)=-15.2

A reranking model takes lists like this, computes additional features for each translation hypothesis, and uses a discriminative to predict which of the translations is mostly likely to be correct. Discriminative models are particulary powerful because they can use non-independent *features* of the translation hypotheses to determine which is likely to be best which makes feature engineering relatively easy.

## Getting started

Go to your clone of your course GitHub repository on the machine where you will be doing this assignment, and run the following command to obain the code and data you will need:

    ./tools/get-new-assignments

## The Challenge

## Ground Rules

 * You may work in independently or in groups of any size, under these conditions:
    * You must notify us by posting a public note to piazza including the e-mails of everyone who will be working in the group (max=3).
    * Everyone in the group will receive the same grade on the assignment.
    * Once you have formed a group, you may **not** disband until the next homework.

 * You must turn in the following by submitting to the public GitHub repository
    * `hw4/output.txt`
    * `hw4/README.md` - a brief description of the algorithms you tried.
    * `hw4/...` - your source code and revision history. We want to see evidence of *regular progress* over the course of the project. You don't have to `git push` to the public repository unless you want to, but you should be committing changes with `git add` and `git commit`. We expect to see evidence that you are trying things out and learning from what you see.

## Acknowledgements

This assignment has been done in the past in the course developed by [Adam Lopez, Chris Callison-Burch, and Matt Post](http://mt-class.org/hw4.html).
