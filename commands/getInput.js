import inquirer from "inquirer"
import readTask from "./readTask.js";
import addTask from "./addTask.js";
import updateTask from "./updateTask.js";
import deleteTask from "./deleteTask.js";

export async function getInput(userId) {
    let loop = true

    do {
        const userInput = await inquirer.prompt([
            { name: 'input', message: 'What would you like to do?', type: 'list', choices: ['View To Dos', 'Add To Do', 'Modify To Do', 'Delete To Do', 'Exit'], default: ''}
        ])

        switch(userInput.input) {
            case('Exit'):
                loop=false;
                process.exit(0)
                break;
            case('View To Dos'):
                await readTask(userId);
                break;
            case('Add To Do'):
                await addTask(userId)
                break;
            case('Modify To Do'): 
                await updateTask(userId)
                break;
            case('Delete To Do'): 
                await deleteTask(userId)
                break;
            default:
                break;
        }
    } while(loop)
}