---
layout: default
title: 11-731
---
# Machine Translation | 11-731 | Spring 2012

## At a Glance

 * **Instructor**: [Chris Dyer](http://www.cs.cmu.edu/~cdyer) | GHC 5707 | Mondays 11–12
 * **Instructor**: [Alon Lavie](http://www.cs.cmu.edu/~alavie) | GHC 5713 | TBA)
 * **TA**: [Wang Ling](http://www.cs.cmu.edu/~lingwang/) | GHC XXXX | TBA
 * **Location**: TBA
 * **Time**: Tuesday/Thursday 1:30–3:00
 * **Textbook**: Philipp Koehn, *Statistical Machine Translation* | [Publisher](https://www.cambridge.org/us/catalogue/catalogue.asp?isbn=9780521874151) | [Amazon](http://www.amazon.com/dp/0521874157)
 * **Piazza**: [discussion board](https://piazza.com/class#spring2013/11731)
 * **GitHub**: [course repository](https://github.com/redpony/mt_s2013)

## Overview

Welcome to Machine Translation (11-731).

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

## Acknowledgements

This course draws heavily in structure and content from the [MT course](http://mt-class.org) developed by [Adam Lopez](http://www.cs.jhu.edu/~alopez/), [Chris Callison-Burch](http://www.cs.jhu.edu/~ccb/), and [Matt Post](http://www.cs.jhu.edu/~post/) that was taught at Johns Hopkins University in Spring 2012.

