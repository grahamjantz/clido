import inquirer from "inquirer";
import ora from "ora";
import chalk from "chalk";

export async function getTaskCode() {
    try {
        //propmtuser to enter code
        const answers = await inquirer.prompt([
            {name: 'code', message: 'Enter the code of the todo: ', type: 'input' },
        ])

        //trim answer
        answers.code = answers.code.trim().toUpperCase()

        return answers.code
    } catch (error) {
        console.log("Something went wrong...\n", error)
    }
}

export default async function deleteTask() {
    try {
        //obtain todo code
        const userCode = await getTaskCode()

        const spinner = ora('Finding and Deleting the todo...').start()

        spinner.stop()

        if (response.deletedCount === 0) {
            console.log(chalk.redBright('Could not find any todo matching the provided name. Deletion failed'))
        } else {
            console.log(chalk.greenBright('Deleted task successfully'))
        }
    } catch (error) {
        console.log('Something went wrong, Error: ', error)
        process.exit(1)
    }
}