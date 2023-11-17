import { getTaskCode } from './deleteTask.js'
import inquirer from 'inquirer'
import ora from 'ora'
import chalk from 'chalk'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig.js'


async function askUpdateQ(todo) {
    try {
        const update = await inquirer.prompt([
            {name: 'name', message: 'Update the name?', type: 'input', default: todo.name},
            {name: 'description', message: 'Update the Description?', type: 'input', default: todo.description},
            {name: 'status', message: 'Update the status?', type: 'list', choices: ['pending', 'completed'], default: todo.status}
        ])
        return {...todo, update}
    } catch (error) {
        console.log('Something went wrong: ', error)
    }
}

export default async function updateTask(userId) {
    try {
        const userCode = await getTaskCode()

        const spinner = ora('Finding the todo...').start()

        const todosObj = await getDoc(doc(db, 'users', userId))
        const todo = Object.keys(todosObj.data())
            .filter(key=> todosObj.data()[key].id === userCode)
            .map(key => todosObj.data()[key])
        console.log(todo)

        spinner.stop()

        if (!todo) {
            console.log(chalk.redBright('Could not find a todo with the code you provided'))
        } else {
            console.log(chalk.blueBright('Type the updated properties. Press Enter if you don\'t want to update the data.'))
            const update = await askUpdateQ(todo)

            const userDocRef = doc(db, 'users', String(userId))
            await updateDoc(userDocRef, {
                [userCode]: update
            })

            spinner.text = "Updating the todo"
            spinner.start()
            spinner.stop()
            console.log(chalk.greenBright('Updated the todo'))

        }
    } catch (error) {
        console.log('Something went wrong, Error: ', error)
        process.exit(1)
    }
}