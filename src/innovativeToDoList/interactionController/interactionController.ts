import { store } from "../globalStoreController/store"
import { ITodoItem } from "../types/types"
import { question } from 'readline-sync'
import chalk from 'chalk'
import { printTodos, printTodosWithId } from "../appLogicScripts/appLogic"
import { captions } from "../.."

interface ICommand {
    name: string,
    make: () => void
}

export const commands: Array<ICommand> = [
    {
        name: '/add',
        make: () => {

            const todo: ITodoItem = {
                id: Date.now(),
                createdDate: new Date(),
                isDone: false,
                text: question(`
${ chalk.gray(`write text of todo`) }                
`)
            }

            store.setData(prev => ({ ...prev, todos: [ ...prev.todos, todo ] }))
            
            console.log(`
${ chalk.green(`todo item is successfully created`) }            
            `)
            printTodos([ todo ])
        }
    },
    {
        name: '/show',
        make: () => {
            printTodos(
                store
                    .data()
                    .todos
            )
        }
    },
    {
        name: '/show id',
        make: () => {
            printTodosWithId(
                store
                    .data()
                    .todos
            )
        }
    },
    {
        name: '/remove',
        make: () => {
            const response = question(chalk.gray(`type ${ chalk.white(`id`) } or ${ chalk.white(`text`) } of todo
`))

            console.log('')
            store.setData(prev => ({ 
                ...prev, 
                todos: prev
                        .todos
                        .filter(
                            t => !(t.id.toString() === response || t.text === response)
                        ) 
                }
            ))
            console.log(chalk.green('done!'), '✅')
        }
    },
    {
        name: '/change',
        make: () => {
            const response = question(chalk.gray(`type ${ chalk.white(`id`) } or ${ chalk.white(`text`) } of todo
`))
            store.setData(prev => ({ 
                ...prev,
                todos: prev 
                        .todos
                        .map(todo => {
                            if (todo.text === response || todo.id.toString() === response) {
                                todo.isDone = !todo.isDone
                            }

                            return todo
                        })
            }))
            console.log(chalk.green('done!'), '✅')
        }
    },
    {
        name: '/help',
        make: () => console.log(
            `
${ chalk.green(`available commands:`) }
${ chalk.yellow(
            commands
                .map(command => command.name)
                .join(' ')
            )
        }\n
`
        )
    },
    {
        name: '/exit',
        make: () => process.exit(0)
    },
    {
        name: '/captions',
        make: () => {
            console.log(captions)
        }
    }
]

export const listen = () => {
    const response = question(chalk.blue(`${ chalk.bold.white('app') }:\\> `))
    const command = commands
                        .find(command => command.name === response)
    
    if (!command) {
        console.log(`
${ chalk.red(`[error] type: 1`) }
${ chalk.yellow(`no such a command: '${ chalk.blueBright(response) }',
type ${ chalk.white(`/help`) } to see all available commands`) }
        `)
        listen()
        return
    }
    
    command.make()
    listen()
}