import { store } from "../globalStoreController/store"
import { ITodoItem } from "../types/types"
import { question } from 'readline-sync'
import chalk from 'chalk'
import { printTodos } from "../appLogicScripts/appLogic"

interface ICommand {
    name: string,
    make: () => void
}

export const commands: Array<ICommand> = [
    {
        name: '/add todo',
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
        name: '/show todos',
        make: () => {
            printTodos(
                store
                    .data()
                    .todos
            )
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
    }
]

export const listen = () => {
    const response = question()

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