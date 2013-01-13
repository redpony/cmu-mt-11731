---
layout: default
title: Homework 0
---
# Homework 0

This course has four homework assignments (not including this one) which are competitive, but which will be done in the open so you have the opportunity to learn from each other. This preliminary assignment will help you get the required development environment set up.

## Set up your GitHub code repository

We will be using *public* GitHub repositories for all assignments in this course. If you are not familiar with source code management with `git`, you might read [this comprehensive tutorial](http://www.vogella.com/articles/Git/article.html) or [this crash course for SVN users](http://git.or.cz/course/svn.html).

 * [Create a user account on GitHub](https://github.com/signup/free) if you do not have one. *You are welcome to reuse an existing account for this course*.
 * Fork the course [master git repository](https://github.com/clab/sp2013.11-731). You can use the web interface to do this:
![Fork]({{site.baseurl}}/img/fork.png)

 * Post the URL of your forked corse repository to Piazza (it should be something like `git://github.com/username/sp2013.11-731.git`)

## Tell us about yourself

In this section, you will pick a screen name for the course leaderboard and tell us a little about yourself.

 * Check out the git repository you forked.
 * Edit `hw0/output.txt` so it contains your name, email address, a screen name for the course leaderboard (you are stuck with it for the semester, pick something you will like!), and list the languages that you speak or know well using their [ISO 639-2 codes](http://www.loc.gov/standards/iso639-2/php/code_list.php). The format will be self-explanatory.
 * Check to make sure the file is well-formed:

       ./check-output < output.txt

 * Commit your changed file

       git add output.txt
       git commit -m 'my first check-in'
       git push

## Software dependencies

The output checker and evaluation tools we will be providing require the following software:

 * [Python 2.7](http://www.python.org/download/releases/2.7.3/)
 * [PyYAML](http://pyyaml.org/)

To check that your system is properly configured, the following should work:

    $ python
    Python 2.7.3 (default, Aug  1 2012, 05:14:39) 
    [GCC 4.6.3] on linux2
    Type "help", "copyright", "credits" or "license" for more information.
    >>> import yaml
    >>> 

