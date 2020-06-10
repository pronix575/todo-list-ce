import { listen } from "./innovativeToDoList/interactionController/interactionController";
import chalk from "chalk";
import { commands } from './innovativeToDoList/interactionController/interactionController'
import { question } from "readline-sync";

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



const VERSION = '0.0.1'

export const captions = `

    ${ chalk.bold.blue(`innovative TodoList`) }

    ${ chalk.red(`[version]: ${ VERSION }`) }
    ${ chalk.yellow(`[CE]: console edition`) }

    ${ chalk.grey(`developed by: 
    ${ chalk.white(`Iskander Karimov Studio`) }`) }
`

console.log(captions)
question(`    ${ chalk.gray(`type ${ chalk.green(`[enter]`)} to continue ->`) } `)
commands.find(command => command.name === '/help')?.make()
listen()
