# BE4_Assignment2

A simple express app having CRUD with mongodb, deployed on vps

**Get routes** (`/neog/BE/4/Assignemnt_2`)

- `GET "/"` - Welcome message
- `GET "/recipe"` - Read all recipes
- `GET "/recipe/title/:title"` - Read one recipe by title
- `GET "/recipe/author/:author"` - Read all recipes by author
- `GET "/recipe/easy"` - Read all easy recipes

**Post routes** (`/neog/BE/4/Assignemnt_2`)

- `POST "/recipe"` - Create recipe
- `POST "/recipe/id/:id"` - Update a recipe by id
- `POST "/recipe/title/:title"` - Update a recipe by title

**Delete routes** (`/neog/BE/4/Assignemnt_2`)

- `DELETE "/recipe/id/:id"` - Delete a recipe by id
