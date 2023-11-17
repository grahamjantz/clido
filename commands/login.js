import inquirer from "inquirer";
import ora from 'ora'

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../firebaseConfig.js";
import readTask from "./readTask.js";
import { getInput } from "./getInput.js";

async function input() {
    const answers = await inquirer.prompt([
        { name: 'email', message: 'Enter email', type: 'input' },
        { name: 'password', message: 'Enter password', type: 'input' }
    ])
    return answers
}

const login = async () => {
    const credentials = await input()
    let spinner = ora('Signing in...').start()

    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
    .then(async (userCred) => {
        console.log('Signed in!')
        spinner.stop()
        const userId = userCred.user.uid
        await getInput(userId)
    })
}

login()