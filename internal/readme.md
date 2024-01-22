
Tag23 it's a library for coding inside html, it allows defining conditions, loops and 
easy evaluations of values

## Install 
For install you just need to add the **script** tag in the head of your browser
#ref:install.html

## Source 
The source can be found on the fowllowing link 

[Source](https://github.com/OUIsolutions/Tag23?tab=readme-ov-file)
## Basic Example
In these example we are creating an counter, that uses the **case** and **unless** keywords
to show the value based on colors

#page_ref:counter.html

## Printing Values 
For printing values you just need to add the properties **print** to any tag you want 

#page_ref:print.html

## Conditions 

Conditions can be determined by the keywords **case** e **unless** 

#page_ref:conditions.html

## Main Loop
If you need to add a function to main loop, these it's extremely easy,
you just need to call the **tag23_main_loop** function, to add an function 
to run on the main loop
<h4 style="color:red">NOTE THAT THE MAIN LOOP ITS EXECUTED IT TICK OF OPERATION, THE DEFAULT TICK ITS 40 milliseconds 
(25 FRAMES PER SECOND)</h4>

#page_ref:main_loop.html

## For Loops 
you can create loops in object or list easily, by using the **for** and **in** keywords
in these example ,the values will be provided by the method **this<for>_<action>**
example:

* thhis.x() = returns the element
* this.x_index() = returns the index
* this.x_destry() = destroy the element

#page_ref:for_array.html
