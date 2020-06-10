![Version](https://img.shields.io/badge/version-0.0.1-g.svg)
# innovative TodoList 📝 [CE]*
### *Console Edition
## setup ⚙️
```bash
cd todo-list-ce

yarn setup
# or
npm setup
```
## build 🛠
```bash
yarn build
```
## start 🚀
```bash
yarn start
```
<!-- ![](/screenshoots/preview.start.png) -->
<!-- ![](/screenshoots/todos.png) -->

## developing 🧱
```bash
yarn dev:build
```
```bash
yarn dev:start
```
```typescript
// add new commands [./src/innovativeToDoList/interactionController/interactionController.ts]

interface ICommand {
    name: string,
    make: () => void
}

const command: ICommand = {
    name: '/exit',
    make: () => process.exit(0)
}

commands.push(command)
```
```typescript
// working with Flux (observable)

import { Stream } from "./observable/FLux";
import { ITodoItem } from "./innovativeToDoList/types/types";

const stream = new Stream<Array<ITodoItem>>([])

stream.addSubscriber({
    name: 'change',
    do(data) {
        console.log(data)
    }
})

const newTodo: ITodoItem = {
    text: 'new todo item',
    createdDate: new Date(),
    id: Date.now(),
    isDone: false
}

stream.setData(prev => [ ...prev, newTodo ])
```
![](/screenshoots/preview.start.png)