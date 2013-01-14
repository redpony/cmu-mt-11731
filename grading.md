---
layout: default
title: Grading
---
# Grading

Grades are out of 100. Scores in the range of 70–80 will earn a C, 80–90 a B, and 90–100 an A; those who score *over 100* will earn an A+. There are four components to your score:

 * [Reading responses](#reading_responses_10_responses_1_point_each) (10 points)
 * [Homeworks](#homeworks_4_assignments_10_points_each) (40 points)
 * [In-class presentation](#inclass_presentation_language_in_ten_minutes_10_points) (10 points)
 * [Course project](#course_project_40_points) (40 points)

Make sure to read the [late work policy](#late_work_policy).

## Reading responses (10 responses, 1 point each)

Each week you must read and post at least one question make a substantive answer to another question about the *recommended readings* (not the Koehn textbook) to the [Piazza discussion board](https://piazza.com/cmu/spring2013/11731/home). Suitable questions are things you do not understand regarding motivation, assumptions, or background. Some of these papers are quite difficult to read without a lot of background knowledge: the goal is to get more out of these papers than you would by reading them alone. While criticism of the papers is acceptable, your primary goal should be improving your understanding.

## Homeworks (4 assignments, 10 points each)

A major part of your grade will be four competitive homework assignments focusing on important subproblems in machine translation:

 * **Alignment**: given a set of translated documents that are aligned at the sentence level, identify the words that are translations of each other.
 * **Evaluation**: measure the quality of a translation hypothesis relative to a gold-standard reference translation
 * **Decoding**: find the highest scoring translation of a sentence, given a translation model and an input sentence.
 * **Reranking** (tentative): find the most accurate translation of a sentence, given an input and a list of ranked alternative translations.

You will earn a passing grade (**7 points**) by correctly implementing a standard algorithm that is indicated for each assignment. Additional credit will be given for building the best system according to an automatic evaluation criterion: **6 bonus points** for the *best* system, **5 points** for the second best, etc. Additionally, **1 bonus point** will be awarded to the *first* student/group to post a correct implementation of the standard algorithm and its output to GitHub. In the (unlikely) event of a perfect tie, the student or group submitting their results first will rank higher. The long and short of it is: *to receive an A in this class, you must compete*!

Homeworks will be evaluated based on what is submitted to your GitHub repository. To receive credit, **both code and the specified output must be submitted**. You may use any programming language you choose. If certain data or tools are off limits, these will be indicated in the assignment.

## In-Class Presentation: Language in Ten Minutes (10 points)

Developing effective translation models and systems requires knowing how languages work. You will be required to give a 10-minute presentation on a particular language *that you do not speak natively*.

You should prepare three to six content slides for your presentation which are due in **PDF format at 11:59pm the day before your presentation**. The following points should be covered:

 * Demographics, location, number of speakers, related languages
 * Important typological characteristics (morphology, syntax, information structure)
 * Computational challenges: orthographic issues, existence of corpora, parsers, and other tools
 * Previous work in machine translation

Recommend resources include: [Ethnologue](http://www.ethnologue.com/), [Omniglot](http://www.omniglot.com/), [The World Atlas of Language Structures](http://wals.info/), the [Machine Translation Archive](http://www.mt-archive.info), previous courses that have used this assignment at [Johns Hopkins](http://mt-class.org) and [Columbia](https://sites.google.com/site/comse6998machinetranslation/language-in-10-minutes), and native speakers.

Presentations will be graded on thoroughness, clarity, and conciseness.

## Course Project (40 points)

Your course project will be a substantial research effort carried out by each student or groups of students (max group size = 3). It should have clearly articulated purpose, evaluation plan.

The milestones will be:
 * Pre-project proposal meeting with instructor (**2 points**)
 * Project proposal (**8 points**; 2 pages), due February 28
   * What problem are you going to solve? (You must give a concrete *example* illustrating the problem you are trying to solve.)
   * What is your proposed solution?
   * What is your implementation plan?
   * How will you evaluate your results?
 * Final project report (**20 points**; 8 pages), due May 8
   * Explain your implementation and evaluation.
   * Discuss prior and related work.
   * Analyze your results.
   * Answer the question: what did you learn?
 * Final project poster (**10 points**), during exam period

The proposal is a contract. If we give you full credit for it, that means we expect you to implement it and do a good analysis of the results, and we will give you full credit for the entire project if you do. If you turn in a weak proposal, we will give you the opportunity to submit a revised one before moving forward, but the longer you take to define your project, the less time you will have to implement it, so it's in your best interest to take advantage of this early checkpoint.

Before the proposal is due, you should make an appointment with one of the instructors in order to discuss project ideas; this will enable you to submit a proposal with full confidence that it will be well-received. Before meeting with us, you might want to browse over topics that we'll be covering later in the term, since these might suggest ideas to you. We will however give you fairly wide latitude to choose a topic as long as it's related in some way to translation and is technically interesting, so you should not feel restricted to these topics. We can suggest topics to you in individual meetings if you're stumped, but it will help us to know what your interests and strengths are, so be prepared to tell us what you're curious about.

Groups projects of any size are permitted, but we will require an amount of work that is linear in group size, so you should take into account the overhead of group coordination when forming groups. Each group should turn in a single proposal identifying all members. All group members will receive the same grade, and you are stuck with your group members once your proposal is finalized: we refuse to adjudicate stories about who did or did not contribute. Choose your partners carefully.

## Late work policy

Homeworks are due at 11:59pm on the date specified.

However, since the world is a complicated place full of illnesses, job interviews, and conference deadlines, each of you gets *10 late days* to use during the term (1 day = 24 consecutive hours). These are only intended to cover situations where you would normally ask the instructors for an extension. Rather than ask us, just use a late day. If you *do* ask us, we will say “Use a late day!”. Once you have no late days left, your homeworks will receive no points. **We will not grant extra late days, even for special circumstances.**

*Note*: leaderboard ranking for the purposes of obtaining points will be determined at the deadline. Late submissions will enable you to receive a passing grade, but not to displace more punctual students.


