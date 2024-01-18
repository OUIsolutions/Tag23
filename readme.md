
Tag23 it's a library for coding inside html, it allows defining conditions, loops and 
easy evaluations of values

## Install 
For install you just need to add the **script** tag in the head of your browser

```html

<script src="https://cdn.jsdelivr.net/gh/OUIsolutions/Tag23@main/versions/Tag23_v0.1.5.js"></script>

```


## Basic Example
In these example we are creating an counter, that uses the **case** and **unless** keywords
to show the value based on colors

[Runable exemple](https://ouisolutions.github.io/OUIsolutions/Tag23/internal/exemples/counter.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Counter</title>
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/Tag23@main/versions/Tag23_v0.1.5.js"></script>
</head>
<body>

<button onclick="a-=1"> Decrement a</button>
<button onclick="a+=1"> Increment a</button>
<br>
<h1 unless="a >= 0" style="color: red;">the value of a is <span print="a"/> </h1>
<h1 case="a >= 0" style="color: blue;" >the value of a is <span print="a"/> </h1>


</body>
</html>
```

## Printing Values 
For printing values you just need to add the properties **print** to any tag you want 

[Runable exemple](https://ouisolutions.github.io/OUIsolutions/Tag23/internal/exemples/print.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Counter</title>
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/Tag23@main/versions/Tag23_v0.1.5.js"></script>
</head>
<body>
    <script>
        let data = {};
    </script>
    <h3>Name</h3>

    <input  onchange="data.name = this.value" placeholder="name">
    <h3>Age</h3>


    <input onchange="data.age = this.value" placeholder="age">


    <h3>Profession</h3>
    <input onchange="data.profession = this.value" placeholder="profession">


    <br>

    <p> Your name is <span print="data.name"></span>
        you are <span print="data.age"></span> years old
        and you work as an <span print="data.profession"></span>
    </p>
</body>
</html>
```

## Conditions 

Conditions can be determined by the keywords **case** e **unless** 

