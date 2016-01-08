---
layout: default
title: Overview
---
# Machine Translation | 11-731 | Spring 2016

## At a Glance

 * **Instructor**: [Chris Dyer](http://www.cs.cmu.edu/~cdyer) | GHC 5707 | By appointment 
* **TA**: [Manaal Faruqui](http://www.cs.cmu.edu/~mfaruqui/) | GHC 5709 | TBD
 * **Location**: [Porter Hall A20](https://www.cmu.edu/computing/class-event/classrooms/porter/A20.html)
 * **Time**: Tuesday/Thursday 1:30–2:50
 * **Textbook**: Philipp Koehn, *Statistical Machine Translation* | [Publisher](https://www.cambridge.org/us/catalogue/catalogue.asp?isbn=9780521874151) | [Amazon](http://www.amazon.com/dp/0521874157) | [Errata](http://www.statmt.org/book/errata.html)
 * **Prerequisites**: Algorithms for NLP, Machine learning, or permission from instructor
 * **Piazza**: [discussion board](https://piazza.com/cmu/spring2016/11731/home)
 * **GitHub**: [course repository](https://github.com/clab/sp2016.11-731)

## Overview

Welcome to Machine Translation (11-731). This 12-credit graduate course will provide a comprehensive overview of current techniques in machine translation, such as those used by [Google Translate](http://translate.google.com/) and [Bing Translator](http://www.bing.com/translator). This course is a survey of methods in machine translation, including the traditional noisy channel formulation of Brown et al. (1993), phrase- and syntax-based models that were introduced in the 2000's, and neural-network models that have become popular in the last several years. This is a programming-heavy course that focuses on implementation and experimentation.

## Syllabus

<table> 
  <tbody>
    <tr><th></th><th><b>Date</b></th><th><b>Topic</b></th><th><b>Book</b></th><th><b>Further Readings</b></th>
    </tr>

    {{ site.posts }}
    {% for post in site.posts reversed %}
    <tr>
    <td>{{ post.day }}</td>
    <td>{{ post.date | date: "%b %d" }}
    </td>
    <td>
      {{ post.title }} <br />
      {% if post.slides %}
      <a href="slides/{{ post.slides }}">[pdf]</a> <br />
      {% if post.lecturer %}
        Lecturer: {{post.lecturer}} <br />
      {% endif %}
      {% if post.otherstuff %}
        {% for otherstuff in post.otherstuff %}
          <a href="{{ otherstuff.url }}">[{{ otherstuff.name }}]</a>
        {% endfor %}
      {% endif %}
      {% endif %}
      {% if post.language-in-10 %}
      L-in-10: <a href="slides/{{post.language-in-10 | downcase}}.pdf">{{ post.language-in-10 }}</a><br />
      {% endif %}
    </td>
    <td>{% if post.book %}<i>SMT</i> Ch. {{ post.book }} {% else %} <i>none</i> {% endif %}</td>
    <td>
      {% if post.reading %}
        {% for reading in post.reading %}
          {{ reading.author }},
          {% if reading.url %}
          <a href="{{ reading.url }}">{{ reading.title }}</a>
          {% else %}
          {{ reading.title }} 
          {% endif %}
          <br />
        {% endfor %}
      {% endif %}
    </td>
    </tr>
    {% endfor %}

  </tbody>
</table>

## Piazza

This semester we will be using Piazza for class discussion. The system is designed to get you help fast and efficiently from classmates, Wang, Alon, and me. *Rather than emailing questions to the instructors, we encourage you to post your questions on [Piazza](https://piazza.com/cmu/spring2016/11731/home)*. It supports LaTeX for equations, syntax highlighting for code and keeps all materials related to the course in one place.

[Find our class page here.](https://piazza.com/cmu/spring2016/11731/home)

## Software

 * [Blocks](https://github.com/mila-udem/blocks) helps build complex neural networks on top of Theano and includes a reference implementation of a neural MT system (Python/Theano)
 * [GroundHog](https://github.com/lisa-groundhog/GroundHog) is an open-source neural MT implementation (Python/Theano)
 * [Moses](http://www.statmt.org/moses/) is a widely-used machine translation toolkit that includes phrase-based and syntactic model support (C++)
 * [cdec](http://www.cdec-decoder.org/) is a machine translation research platform developed at CMU (C++)
 * [KenLM](http://kheafield.com/code/kenlm/) is a highly optimized library for representing and querying $n$-gram language models (C++)
 * [Giza++](http://code.google.com/p/giza-pp/) is implements EM training for the IBM translation models and is widely used for word alignment (C++)
 * [fast_align](https://github.com/clab/fast_align) is a fast, easy-to-use word alignment tool (C++)

## Freely Available (Parallel) Corpora

 * [WIT<sup>3</sup>](https://wit3.fbk.eu/) is a transcribed corpus of [TED talks](http://www.ted.com/talks) in many languages (small/medium).
 * The Workshop on Machine Translation hosts annually a translation competition for which they provide free training and evaluation resources. Different years have somewhat different sets of languages. [2016](http://statmt.org/wmt16/translation-task.html), [2015](http://statmt.org/wmt15/translation-task.html), [2014](http://statmt.org/wmt14/translation-task.html), [2013](http://statmt.org/wmt13/translation-task.html), [2012](http://statmt.org/wmt12/translation-task.html) (medium/large)
 * [OPUS](http://opus.lingfil.uu.se/) is a collection of parallel data in many domains and languages.

## Other MT Courses

 * A [one week MT course](http://staffwww.dcs.shef.ac.uk/people/T.Cohn/mt/) by [Trevor Cohn](http://staffwww.dcs.shef.ac.uk/people/T.Cohn/)
 * A [one week MT course](http://www.cs.jhu.edu/~alopez/esslli2010.html) at ESSLI 2010 by [Adam Lopez](http://www.cs.jhu.edu/~alopez/)
 * [Chris Callison-Burch](http://www.cs.jhu.edu/~ccb/) and [Philipp Koehn](http://homepages.inf.ed.ac.uk/pkoehn/) taught a one week MT course at ESSLI 2005: [1](http://homepages.inf.ed.ac.uk/pkoehn/publications/esslli-slides-day1.pdf) [2](http://homepages.inf.ed.ac.uk/pkoehn/publications/esslli-slides-day2.pdf) [3](http://homepages.inf.ed.ac.uk/pkoehn/publications/esslli-slides-day3.pdf) [4](http://homepages.inf.ed.ac.uk/pkoehn/publications/esslli-slides-day4.pdf) [5](http://homepages.inf.ed.ac.uk/pkoehn/publications/esslli-slides-day5.pdf)
 * [Machine Translation course at Columbia University](https://sites.google.com/site/comse6998machinetranslation/)
 * [Machine Translation course at ISI](http://nlg.isi.edu/teaching/cs599mt/)
 * [Machine Translation course at Johns Hopkins University](http://mt-class.org/)
 * [Machine Translation course at Simon Fraser University](http://www.cs.sfu.ca/~anoop/teaching/CMPT-882-Fall-2011/)
 * [Machine Translation course at the University of Edinburgh](http://www.inf.ed.ac.uk/teaching/courses/mt/)
 * [Machine Translation course at the University of Washington](https://catalyst.uw.edu/workspace/kristout/20547/123745)

