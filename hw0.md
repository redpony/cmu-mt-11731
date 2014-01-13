---
layout: default
title: Homework 0
---
# Homework 0

This course has four homework assignments (not including this one) which are competitive, but which will be done in the open so you have the opportunity to learn from each other. This preliminary assignment will help you get the required development environment set up.

## Set up your GitHub code repository

We will be using *public* GitHub repositories for all assignments in this course. If you are not familiar with source code management with `git`, you might read [this comprehensive tutorial](http://www.vogella.com/articles/Git/article.html) or [this crash course for SVN users](http://git.or.cz/course/svn.html).

 * [Create a user account on GitHub](https://github.com/signup/free) if you do not have one. *You are welcome to reuse an existing account for this course*.
 * Fork the course [master git repository](https://github.com/clab/sp2014.11-731). You can use the web interface to do this:
![Fork]({{site.baseurl}}/img/fork.png)

 * Check out the git repository you forked on the machine where you will do your coding assignments (you can use a shared machine, desktop, or laptop).

## Software dependencies

Each assignment will come with a tool that will tell you how well you are doing on the evaluation criterion for that assignment. The output checker and evaluation tools we will be providing require the following software:

 * [Python 2.7](http://www.python.org/download/releases/2.7.6/)
 * [PyYAML](http://pyyaml.org/)

To check that your system is properly configured, you can run the following script in your repository:

    tools/check-python

It will either report success or some error message.

## Tell us about yourself

In this section, you will pick a screen name for the course leaderboard and tell us a little about yourself.

 * Edit `hw0/output.txt` so it contains your name, email address, a screen name for the course leaderboard (you are stuck with it for the semester, pick something you will like!), and list the languages that you speak or know well using their [ISO 639-2 codes](http://www.loc.gov/standards/iso639-2/php/code_list.php). The format will be self-explanatory.
 * Check to make sure the file is well-formed:

       ./check-output < output.txt

 * Commit your changed file (feel free to change the commit message) and make it available to the world:

       git add output.txt
       git commit -m 'my first check-in'
       git push

## Post your GitHub repository to Piazza

 * Post the URL of your forked course repository to [Piazza](https://piazza.com/cmu/spring2014/11731/home) (it should be something like `git://github.com/username/sp2014.11-731.git`)

That’s it, you’re done!

