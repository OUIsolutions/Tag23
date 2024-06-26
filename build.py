from os import listdir
import hashlib
from shutil import rmtree
from os import makedirs

SOURCES = [
    "src/constants.js",
    "src/globals.js",
    "src/main_loop.js",
    "src/extra.js",
    "src/actions/conditions.js",
    "src/actions/for.js",
   "src/actions/for_arrays.js",
   "src/actions/for_objects.js",
    "src/actions/geral.js",
    "src/main.js"
]

LIB_NAME = 'Tag23'
REPO_NAME = 'Tag23'


def create_output():
    output = ''
    for e in SOURCES:
        with open(e, 'r') as f:
            output += f.read() + '\n'
    version = input('version: ')

    makedirs('versions', exist_ok=True)

    output_name = f'versions/{LIB_NAME}_v{version}.js'

    with open(output_name, 'w') as f:
        f.write(output)
    return output_name


output_name = create_output()
#replacing html links 
link = f'https://cdn.jsdelivr.net/gh/OUIsolutions/{REPO_NAME}@main/{output_name}'
div = f'src="{link}"'
local_div = f'src="../../{output_name}"'


rmtree('internal/exemples',ignore_errors=True)
makedirs('internal/exemples')
rmtree('internal/local_examples',ignore_errors=True)
makedirs('internal/local_examples')

for e in listdir('internal/exemples_not_linked'):
    with open(f'internal/exemples_not_linked/{e}', 'r') as f:
        output = f.read()
        output = output.replace('#lib#', div)
        with open(f'internal/exemples/{e}', 'w') as f:
            f.write(output)

    with open(f'internal/exemples_not_linked/{e}', 'r') as f:
         output = f.read()
         output = output.replace('#lib#', local_div)
         with open(f'internal/local_examples/{e}', 'w') as f:
             f.write(output)

exemples = listdir('internal/exemples')

with open('internal/readme.md', 'r') as f:
    readme_code = f.read()


for e in exemples:
    with open(f'internal/exemples/{e}', 'r') as f:
        output = f.read()
        output_data =''
        output_data+= '[Runable exemple]'
        output_data+=f'(https://ouisolutions.github.io/{REPO_NAME}/internal/exemples/{e})'
        output_data+=f'\n```html\n{output}\n```'
        readme_code = readme_code.replace(f"#page_ref:{e}", output_data)


for e in exemples:
    with open(f'internal/exemples/{e}', 'r') as f:
        output = f.read()
        output_data=f'\n```html\n{output}\n```'
        readme_code = readme_code.replace(f"#ref:{e}", output_data)


if "#page_ref" in readme_code:
    index = readme_code.find("#page_ref")
    reference = readme_code[index: readme_code.find("\n", index)]
    raise Exception(f"Missing reference {reference}")

if "#ref" in readme_code:
    
    index = readme_code.find("#ref")
    reference = readme_code[index: readme_code.find("\n", index)]
    raise Exception(f"Missing reference {reference}")

with open('readme.md', 'w') as f:
    f.write(readme_code)
