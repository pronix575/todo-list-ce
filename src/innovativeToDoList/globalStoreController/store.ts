import { Stream } from "../../observable/FLux";
import { ITodoItem } from "../types/types";
import fs from 'fs' 

interface IInitialState {
    todos: Array<ITodoItem>
}

const initialState: IInitialState = {
    todos: ((): ITodoItem[] => {

        try {
            const data = fs.readFileSync('store.json', 'utf8')
            const todos: Array<ITodoItem> = JSON.parse(data)?.todos

            // console.log(todos, data)

            for (const todo of todos) {
                todo.createdDate = new Date(todo.createdDate)
            }

            if (todos) {
                return todos
            } else {
                return []
            }

        } catch (e) {
        
        }
        return []
    })()
}

export const store = new Stream(initialState)

store.addSubscriber({
  name: 'json storage',
  do: (data) => {
      try {
        //   console.log(data, JSON.stringify(data))
          fs.writeFileSync('store.json', JSON.stringify(data))
      } catch (e) {

      }
  }  
})