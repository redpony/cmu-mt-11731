---
layout: default
title: Leaderboard
---
# Leaderboard

This page contains the assignment leaderboard. The leaderboard is updated as follows: every five minutes, every assignment not yet past its due date is downloaded from the git repository you provided in [Homework 0](hw0.html), and the output is rescored if it has changed.

<script src="homework.js">
</script>

<table id="leaderboard">
  <thead style="background-color: lightgrey">
    <tr>
      <th colspan="3"></th>
      <th colspan="5" align="center">
        Assignments
      </th>
    </tr>
    <tr>
      <th colspan="2">
        Rank
      </th>
      <th>
        Handle
      </th>
      <th valign="top">
        <a href="hw0.html">#0</a>
      </th>
<!--
      <th valign="top">
        <a href="hw1.html">#1</a><br/>
        <span class="small">AER</span>
      </th>
      <th valign="top">
        <a href="hw2.html">#2</a><br/>
        <span class="small"></span>
      </th>
      <th valign="top">
        <a href="hw3.html">#3</a><br/>
        <span class="small"></span>
      </th>
      <th valign="top">
        <a href="hw4.html">#4</a><br/>
        <span class="small"></span>
      </th>
-->
    </tr>
  </thead>
  <tbody id="scorediv">
  </tbody>
  <tfoot>
    <tr>
      <td colspan="8" align="center" id="updatedDiv" style="background-color: lightgrey">
      </td>
    </tr>
  </tfoot>
</table>

<script src="leaderboard.js">
</script>
