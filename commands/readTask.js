import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig.js'
import chalk from 'chalk'

export default async function readTask(userId) {
    try {
        const todos = []

        const docRef = doc(db, 'users', String(userId))
        const data = await getDoc(docRef)

        if (data.exists()) {
            Object.keys(data.data()).forEach(item => {
                todos.push(data.data()[item])
            })
        }

        if(todos.length === 0){
            console.log(chalk.blueBright('You do not have any tasks yet!'))
        } else {
            todos.sort((a,b) => a.date_created - b.date_created)
            console.log(chalk.bgMagenta('Completed Tasks: '))
            todos.forEach(todo => {
                if (todo.completed) {
                    console.log(
                        chalk.cyanBright('Todo Id: ') + todo.id + '\n' +
                        chalk.blueBright('Name: ') + todo.name + '\n' +
                        chalk.yellowBright('Description: ') + todo.description + '\n' +
                        chalk.magentaBright('Status: ') + (todo.completed ? 'Complete' : 'Incomplete') + '\n'
                    )
                }
            })
            console.log(chalk.bgMagenta('Pending Tasks: '))
            todos.forEach(todo => {
                if (!todo.completed) {
                    console.log(
                        chalk.cyanBright('Todo Id: ') + todo.id + '\n' +
                        chalk.blueBright('Name: ') + todo.name + '\n' +
                        chalk.yellowBright('Description: ') + todo.description + '\n' +
                        chalk.magentaBright('Status: ') + (todo.completed ? 'Complete' : 'Incomplete') + '\n'
                    )
                }
            })
        }
        // process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

// readTask()