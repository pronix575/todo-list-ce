import { listen } from "./innovativeToDoList/interactionController/interactionController";
import chalk from "chalk";
import { commands } from './innovativeToDoList/interactionController/interactionController'
import { question } from "readline-sync";
import {  } from 'v8'

const VERSION = '0.0.1'

export const captions = `

|    ${ chalk.bold.blue(`innovative TodoList`) }
|
|    ${ chalk.red(`[version]: ${ VERSION }`) }
|    ${ chalk.yellow(`[CE]: console edition`) }
|
|    ${ chalk.grey(`developed by: 
${chalk.white('|')}    ${ chalk.white(`Iskander Karimov Studio`) }`) }
`

console.log(captions)


const response = question(`    ${ chalk.gray(`type ${ chalk.green(`[enter]`)} to continue ->`) } `)

commands.find(command => command.name === '/help')?.make()
listen(response)


