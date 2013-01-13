---
layout: default
title: 11-731
---
# Machine Translation | 11-731 | Spring 2012

## At a Glance

 * **Instructor**: [Chris Dyer](http://www.cs.cmu.edu/~cdyer) | GHC 5707 | Mondays 11–12
 * **Instructor**: [Alon Lavie](http://www.cs.cmu.edu/~alavie) | GHC 5713 | TBA
 * **TA**: [Wang Ling](http://www.cs.cmu.edu/~lingwang/) | GHC 5503 | TBA
 * **Location**: [NSH 1305](http://www.cs.cmu.edu/~help/AV-Help/AV-Rooms/NSH1305.html)
 * **Time**: Tuesday/Thursday 1:30–2:50
 * **Textbook**: Philipp Koehn, *Statistical Machine Translation* | [Publisher](https://www.cambridge.org/us/catalogue/catalogue.asp?isbn=9780521874151) | [Amazon](http://www.amazon.com/dp/0521874157) | [Errata](http://www.statmt.org/book/errata.html)
 * **Prerequisites**: Algorithms for NLP, Machine learning
 * **Piazza**: [discussion board](https://piazza.com/cmu/spring2013/11731/home)
 * **GitHub**: [course repository](https://github.com/clab/sp2013.11-731)

## Overview

Welcome to Machine Translation (11-731). This 12-credit graduate course will provide a comprehensive overview of current techniques in statistical machine translation, such as those used by [Google Translate](http://translate.google.com/) and [Bing Translator](http://www.bing.com/translator).

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
      {% if post.otherstuff %}
        {% for otherstuff in post.otherstuff %}
          <a href="{{ otherstuff.url }}">[{{ otherstuff.name }}]</a>
        {% endfor %}
      {% endif %}
      {% endif %}
      {% if post.language-in-10 %}
      Language in 10: <a href="slides/{{post.language-in-10}}.pdf">{{ post.language-in-10 }}</a><br />
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

This term we will be using Piazza for class discussion. The system is highly catered to getting you help fast and efficiently from classmates, the TA, Alon, and me. Rather than emailing questions to the teaching staff, we encourage you to post your questions on Piazza. It supports LaTeX for equations, syntax highlighting for code and keeps all materials related to the course in one place.

Find our class page at: https://piazza.com/cmu/spring2013/11731/home
