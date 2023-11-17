import inquirer from "inquirer";
import ora from "ora";
import chalk from "chalk";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../firebaseConfig.js'
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 4)

async function input(){
    const answers = await inquirer.prompt([
        { name: 'name', message: 'Enter name of the task:', type: 'input' },
        { name: 'description', message: 'Enter the description of the task:', type: 'input' },
    ])

    return answers
}

const askQuestions = async() => {

    const todoArray = []
    let loop = false

    do{
        const userRes = await input()
        todoArray.push(userRes)
        const confirmQ = await inquirer.prompt([{ name: 'confirm', message: 'Do you want to add more tasks?', type: 'confirm' }])
        if(confirmQ.confirm){
            loop = true
            // console.log('\n')
        } else {
            loop = false
        }
    } while(loop)

    return todoArray
}

export default async function addTask(userId) {
    try {
        // calling askQuestions() to get array of todo's
        const userResponse = await askQuestions()

        // Displaying a spinner with the following text message using ora
        let spinner = ora('Creating the todos...').start()

        // looping over every todo in the userResponse array
        // and saving each todo in the database
        for(let i=0; i<userResponse.length; i++){
            const response = userResponse[i]
            const docRef = doc(db, 'users', userId)
            const id = nanoid(4).toUpperCase()
            const date = Date.now()
            await updateDoc(docRef, {
                [id]: {
                    id: id,
                    name: response.name,
                    description: response.description,
                    completed: false,
                    date_created: date
                }
            })
        }

        // Stopping the spinner and displaying the success message
        spinner.stop()
        console.log(
            chalk.greenBright('Created the todos!')
        )

    } catch (error) {
        // Error Handling
        console.log('Something went wrong, Error: ', error)
        process.exit(1)
    }
}

