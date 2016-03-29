---
layout: default
title: Homework 4
---
# Homework 4

**Due 10:00 am on Tuesday, May 3, 2016**

Machine Translation is a problem of taking an input sentence in one language:

<center><i>走路 去 要 多 长 时间 ?</i></center>
<br />

and finding the best translation into a target language, according to a model:

<center><i>how long does it take on foot ?</i></center>
<br />

**Your task in this assignment is to design a neural encoder-decoder machine translation model with attention that can translate a Chinese sentence into English.** The baseline model is an
encoder-decoder model with attention, and the research problem is to improve upon the model.

Unlike in HW3, you will be evaluated on the translation quality, BLEU score.

In the encoder-decoder framework, an encoder reads a variable length input
sequence, into a sequence of vectors $\vec{\mathbf{x}} = \langle \mathbf{x}_1,
\cdots, \mathbf{x}_T\rangle$ (corresponding to a sequence of input symbols
$\vec{x} = \langle x_1,
\cdots, x_T\rangle$) and generates a fixed-dimensional vector
representation of the sequence.
$\mathbf{x}_t \in \mathbb{R}^{l}$ is an input vector of length $l$.
The most common approach is to use an RNN such that:
\begin{equation}
\mathbf{h}_t = f(\mathbf{h}_{t-1}, \mathbf{x}_t)
\end{equation}
where $\mathbf{h}_t \in \mathbb{R}^n$ is a hidden state at time $t$, and
$f$ is generally a non-linear transformation, producing
$\mathbf{e} := \mathbf{h}_{T+1}$ as the input representation.
The decoder is
trained to predict the next output $y_t$ given the encoded input vector
$\mathbf{e}$ and all the previously predicted outputs
$\langle y_1, \cdots y_{t-1}\rangle$.
In other words, the decoder defines a probability over the output sequence
$\vec{y} = \langle y_1, \cdots, y_{T'}\rangle$ by decomposing
the joint probability into ordered conditionals:
\begin{equation}
p(\vec{y}|\vec{x}) = \prod_{t=1}^{T'} \nolimits p(y_t |
\mathbf{e}, \langle y_1, \cdots, y_{t-1}\rangle)
\end{equation}
With a decoder RNN, we can first obtain the hidden layer at time $t$ as:
$\mathbf{s}_t = g(\mathbf{s}_{t-1}, {\{\mathbf{e}, \mathbf{y}_{t-1}\}})$
and feed this into a softmax layer to obtain the conditional probability as:
\begin{equation}
p(y_t = i | \mathbf{e},\vec{y}_{<t}) = \mathrm{softmax}(\mathbf{W}_s\mathbf{s}_t + \mathbf{b}_s)_i
\end{equation}
where, $\vec{y}_{<t} = \langle y_1, \cdots, y_{t-1}\rangle$.
In recent work, both $f$ and $g$ are generally LSTMs,
a kind of RNN which we describe next.


## Getting started

Go to your clone of your course GitHub repository on the machine where you will be doing this assignment, and run the following command to obain the code and data you will need:

    git pull git@github.com:clab/sp2016.11-731.git master

We have provided you with a neural LSTM language model that learns to predict the next word in the sentence given the history. This should give you an idea of how to implement the decoder in the MT system and how to initialise the initial state of an LSTM.

To earn 7 points on this assignment, you must **implement an encoder-decoder model with attention** or **modify the provided language model decoder** so that it is capable of translating an input word sequence to output word sequence.

## The Challenge

As discussed in the class, a neural encoder-decoder model often produces fluent sentences but lacks the proper content. This is due to the fact the model does not enforce the decoder to ``cover'' parts of the input sentence to be translated (in contrast to standard phrase-based systems). Thus, the decoder can produce any words in the output which need not correspond to words in the input. 

The attentional encoder-decoder model tries to improve upon this model, where it decides to give attention to certain parts of the input while generating words in the output. However, it still does not enforce any strong restrictions on what can be produced in the output. Your job in this assignment is to improve upon the simple attention model.

Here are some ideas:

* Using global and local attention during decoding ([Thang et al, 2015] (http://stanford.edu/~lmthang/data/papers/emnlp15_attn.pdf))
* Enforcing structural alignment bias in attention ([Cohn et al, 2016] (http://arxiv.org/pdf/1601.01085.pdf))

## Ground Rules

 * You may work in independently or in groups of any size, under these conditions:
    * You must notify us by posting a public note to piazza including the e-mails of everyone who will be working in the group (max=3).
    * Everyone in the group will receive the same grade on the assignment.
    * Once you have formed a group, you may **not** disband until the next homework.
 * Using any off-the-shelf MT system like cdec, Moses, hiero etc. is not allowed. You must not use any existing system to extract phrase or translation.

 * You must turn in the following by submitting to the public GitHub repository
    * `hw4/output.txt`
    * `hw4/README.md` - a brief description of the algorithms you tried.
    * `hw4/...` - your source code and revision history. We want to see evidence of *regular progress* over the course of the project. You don't have to `git push` to the public repository unless you want to, but you should be committing changes with `git add` and `git commit`. We expect to see evidence that you are trying things out and learning from what you see.

