
Tag23 it's a library for coding inside html, it allows defining conditions, loops and 
easy evaluations of values

## Install 
For install you just need to add the **script** tag in the head of your browser

```html

<script src="https://cdn.jsdelivr.net/gh/OUIsolutions/Tag23@main/versions/Tag23_v0.1.6.js"></script>

```


## Basic Example
In these example we are creating an counter, that uses the **case** and **unless** keywords
to show the value based on colors

[Runable exemple](https://ouisolutions.github.io/Tag23/internal/exemples/counter.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Counter</title>
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/Tag23@main/versions/Tag23_v0.1.6.js"></script>
</head>
<body>
<script>let a = 0</script>
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

[Runable exemple](https://ouisolutions.github.io/Tag23/internal/exemples/print.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Counter</title>
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/Tag23@main/versions/Tag23_v0.1.6.js"></script>
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

    <h3>Gender</h3>
    <select onchange="data.gender = this.value">
        <option value="male">Male</option>
        <option value="female">Female</option>
    </select>


    <br>

    <p> Your name is <span print="data.name"></span>
        you are <span print="data.age"></span> years old,
        you work as an <span print="data.profession"></span>
        and you are a <span print="data.gender"></span>
    </p>
</body>
</html>
```

## Conditions 

Conditions can be determined by the keywords **case** e **unless** 

[Runable exemple](https://ouisolutions.github.io/Tag23/internal/exemples/conditions.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Counter</title>
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/Tag23@main/versions/Tag23_v0.1.6.js"></script>
</head>
<body>
    <script>
        let data = {};
    </script>
    <h3>Name</h3>
    <input  onchange="data.name = this.value" placeholder="name">

    <h3>Email</h3>
    <input  onchange="data.email = this.value" placeholder="email">


    <h3>Password</h3>
    <input  onchange="data.password = this.value" placeholder="password">


    <h3>Repeat Password</h3>
    <input  onchange="data.repeat_password = this.value" placeholder="repeat password">

    <br>

    <h3 unless="data.repeat_password == data.password "
        style="color: red"
    >Passwords must be equal
    </h3>

    <br>
    <script>
        function its_all_correct(){
            if(!data.name){
                return false;
            }
            if(!data.email){
                return  false;
            }
            if(!data.password){
                return  false;
            }
            if(data.password  !== data.repeat_password){
                return  false;
            }
            return  true;
        }
    </script>
    <button case="its_all_correct()"> Subscribe</button>


</body>
</html>
```

## Main Loop
If you need to add a function to main loop, these it's extremely easy,
you just need to call the **tag23_main_loop** function, to add an function 
to run on the main loop
<h4 style="color:red">NOTE THAT THE MAIN LOOP ITS EXECUTED IT TICK OF OPERATION, THE DEFAULT TICK ITS 40 milliseconds 
(25 FRAMES PER SECOND)</h4>

[Runable exemple](https://ouisolutions.github.io/Tag23/internal/exemples/main_loop.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Counter</title>
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/Tag23@main/versions/Tag23_v0.1.6.js"></script>
</head>
<body>
<script>
    let total_iterations = 0;
</script>
<script>tag23_main_loop(()=>{

    total_iterations+=1;
})</script>

<h1>you are on iteration <span print="total_iterations"></span></h1>
<h1>its passed  <span print="TAG_23_TIME_PASSED/ 1000"></span> seconds</h1>
</body>
</html>
```

