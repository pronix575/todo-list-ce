import chalk from "chalk"
import { ITodoItem } from "../types/types"

interface IException {
    type: number,
    text: string
}

export const generateException = (exeprion: IException): string => {
    return `
${ chalk.red(`[error] type: ${ exeprion.type }`) }
${ exeprion.text }
    `
}

export const printTodos = (todos: Array<ITodoItem>) => {
    console.log(
        todos
            .map(todo => `
${ (todo.isDone && chalk.green('✔️ ')) || '' }${ (!todo.isDone && chalk.red('❌')) || '' } ${ todo.text }
${ chalk.grey(todo.createdDate.toDateString()) }`)
            .join(`
`)
    )
    console.log(``)
}

export const printTodosWithId = (todos: Array<ITodoItem>) => {
    console.log(
        todos
            .map(todo => `
${ todo.text }
[id]: ${ chalk.yellow(todo.id) }
`)
            .join(`
`)
    )
    console.log(``)
}
