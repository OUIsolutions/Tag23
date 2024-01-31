
Tag23 it's a library for coding inside html, it allows defining conditions, loops and 
easy evaluations of values

## Install 
For install you just need to add the **script** tag in the head of your browser

```html
<script src="https://cdn.jsdelivr.net/gh/OUIsolutions/Tag23@main/versions/Tag23_v0.21.js"></script>

```

## Source 
The source can be found on the fowllowing link 

[Source](https://github.com/OUIsolutions/Tag23?tab=readme-ov-file)
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

    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/Tag23@main/versions/Tag23_v0.21.js"></script>
</head>
<body>
<div Tag23Start style="display: none;">

    <script>let a = 0</script>
    <button onclick="a-=1"> Decrement a</button>
    <button onclick="a+=1"> Increment a</button>
    <br>
    <h1 unless="a >= 0" style="color: red;">the value of a is <span print="a"/> </h1>
    <h1 case="a >= 0" style="color: blue;" >the value of a is <span print="a"/> </h1>

</div>


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
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/Tag23@main/versions/Tag23_v0.21.js"></script>
</head>
<body>
    <div Tag23Start style="display: none;">
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
    </div>

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

    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/Tag23@main/versions/Tag23_v0.21.js"></script>
</head>
<body>
    <div Tag23Start style="display: none;">
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

    </div>


</body>
</html>
```

## For Loops
you can create loops in object or list easily, by using the **for** and **in** keywords
in these example ,the values will be provided by the method **this<for>_<action>**
example:

* thhis.x() = returns the element
* this.x_index() = returns the index
* this.x_destry() = destroy the element

[Runable exemple](https://ouisolutions.github.io/Tag23/internal/exemples/for_array.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Counter</title>

    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/Tag23@main/versions/Tag23_v0.21.js"></script>
    <style>
        .json_code{
            width: 40%;
            background-color: #00003b;
            color: white;
            position: absolute;
            left: 40%;
            top: 10%;
        }
        .form_div{
            background-color: #e0e0e0;
            width: 30%;
        }
    </style>
</head>
<body>
    <div Tag23Start style="display: none;">
        <script>
            let data = [
                {
                    "name":"user1",
                    "age":30
                },
                {
                    "name":"user2",
                    "age":22
                }
            ];
        </script>
        <div for="x" in="data" class="form_div">

            <h4>Name</h4>
            <input set_value="this.x()['name']" onchange="this.x()['name'] = this.value">

            <h4>Age</h4>
            <input type="number" set_value="this.x()['age']" onchange="this.x()['age'] = Number(this.value)">
            <br>

            <button onclick="this.x_destroy()">Destroy <span print="this.x_index()"></span></button>

            <br>
            <br>


        </div>
        <button onclick="data.push({})"> Add</button>


        <code class="json_code" >
        <pre print="JSON. stringify(data,null,4)">

        </pre>
        </code>

    </div>

</body>
</html>
```

### For with Objects
its also possible to work with objects

[Runable exemple](https://ouisolutions.github.io/Tag23/internal/exemples/for_objects.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Counter</title>
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/Tag23@main/versions/Tag23_v0.21.js"></script>
    <style>
        .json_code{
            width: 40%;
            background-color: #00003b;
            color: white;
            position: absolute;
            left: 40%;
            top: 10%;
        }
        .form_div{
            background-color: #e0e0e0;
            width: 30%;
        }
    </style>
</head>
<body>
<div Tag23Start style="display: none;">
    <script>
        let data = {
            "user1":{
                "name": "user1",
                "age": 30
            },
            "user2":{
                "name": "user2",
                "age": 22
            }
        };
    </script>
    <div for="x" in="data" class="form_div">

        <h4>Name</h4>
        <input set_value="this.x()['name']" onchange="this.x()['name'] = this.value">

        <h4>Age</h4>
        <input type="number" set_value="this.x()['age']" onchange="this.x()['age'] = Number(this.value)">
        <br>

        <button onclick="this.x_destroy()">Destroy <span print="this.x_key()"></span></button>

        <br>
        <br>


    </div>



    <code class="json_code" >
        <pre print="JSON. stringify(data,null,4)">

        </pre>
    </code>

</div>

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
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/Tag23@main/versions/Tag23_v0.21.js"></script>
</head>
<body>
<div Tag23Start style="display: none;">
    <script>
        let total_iterations = 0;
    </script>
    <script>tag23_main_loop(()=>{

        total_iterations+=1;
    })</script>

    <h1>you are on iteration <span print="total_iterations"></span></h1>
    <h1>its passed  <span print="TAG_23_TIME_PASSED/ 1000"></span> seconds</h1>
</div>

</body>
</html>
```

