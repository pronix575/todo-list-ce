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
${ todo.text }
${ (todo.isDone && chalk.green('✔️ ')) || '' }${ (!todo.isDone && chalk.red('❌')) || '' } ${ chalk.grey(todo.createdDate.toDateString()) }`)
            .join(`
`)
    )
    console.log(``)
}