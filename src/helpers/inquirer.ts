import inquirer from "inquirer";
import 'colors';
import { Place } from "../models/search.js";

interface Choices {
    value: number | string;
    name: string
}

interface Question {
    type: string
    name: string
    message: string
    choices?: Choices[]
    validate?(value: string): boolean | string | undefined;
}

export const inquirerMenu = async (): Promise<number> => {
    console.clear()
    console.log("////////////////////////////////////////////////////////////////////////////////////////");
    console.log('// __        __                 _     _                        ____   __  __   ____   //'.white);
    console.log('// \\ \\      / /   ___    __ _  | |_  | |__     ___   _ __     / ___| |  \\/  | |  _ \\  //'.white);
    console.log("//  \\ \\ /\\ / /   / _ \\  / _` | | __| | '_ \\   / _ \\ | '__|   | |     | |\\/| | | | | | //".white);
    console.log("//   \\ V  V /   |  __/ | (_| | | |_  | | | | |  __/ | |      | |___  | |  | | | |_| | //".white);
    console.log("//    \\_/\\_/     \\___|  \\__,_|  \\__| |_| |_|  \\___| |_|       \\____| |_|  |_| |____/  //".white);
    console.log("//                                                                                    //");
    console.log("////////////////////////////////////////////////////////////////////////////////////////");
    console.log("\n");
    console.log('========================================================================================'.green);
    console.log('||'.green + ''.padEnd(34, (' ')) + 'Select an option'.red + ''.padEnd(34, (' ')) + '||'.green);
    console.log('========================================================================================\n'.green);

    const questions: Question[] = [
        {
            type: 'list',
            name: 'option',
            message: 'What would you like to do?',
            choices: [
                {
                    value: 1,
                    name: `${'1.'.red} Search Country`
                },
                {
                    value: 2,
                    name: `${'2.'.red} Check History`
                },
                {
                    value: 0,
                    name: `${'0.'.red} Exit`
                },
            ]
        }
    ]

    const { option } = await inquirer.prompt(questions)
    return option;
}

export const pause = async (): Promise<void> => {
    const question: Question[] = [{
        type: 'input',
        name: 'enter',
        message: `Press ${'ENTER'.yellow} to continue`
    }]

    console.log('\n');
    await inquirer.prompt(question)
}

export const input = async (message: string): Promise<string> => {
    const question: Question[] = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            if (value.length === 0) {
                return 'Please enter a value'
            }
            return true;
        }
    }]

    const { desc } = await inquirer.prompt(question);

    return desc;
}

export const listPlaces = async (places: Place[]): Promise<string> => {
    const choices = places.map((place, index) => {
        const idx = `${index + 1}.`.red;
        return {
            value: place.id,
            name: `${idx} ${place.name}`
        }
    });

    choices.unshift({
        value: '0',
        name: `${'0.'.red} Cancelar`
    })

    const questions: Question[] = [{
        type: 'list',
        name: 'id',
        message: 'Select a place:',
        choices
    }]

    const { id } = await inquirer.prompt(questions)
    return id;
}