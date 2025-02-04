// (C) 2019 GoodData Corporation
import inquirer from "inquirer";

export const inquireName = () =>
    inquirer
        .prompt({
            message: "What is your application name?",
            name: "name",
            type: "input",
        })
        .then(value => value.name);

export const inquireHostname = isBear =>
    inquirer
        .prompt([
            {
                message: "What is your hostname?",
                name: "hostname",
                type: "list",
                choices: [
                    {
                        value: "https://secure.gooddata.com",
                    },
                    {
                        value: "https://developer.na.gooddata.com",
                    },
                    {
                        value: "https://salesengineering.na.gooddata.com",
                    },
                    {
                        name: "I have a custom hostname",
                        value: "WHITE_LABELLED",
                    },
                ],
                when: () => isBear,
            },
            {
                message: "Insert your hostname. Protocol defaults to https if none is provided.",
                name: "hostname",
                type: "input",
                when: ({ hostname }) => hostname === "WHITE_LABELLED" || !isBear,
                validate: input => {
                    return input.indexOf("http://") > -1 && isBear
                        ? "Provide hostname with a secure https protocol or no protocol at all."
                        : true;
                },
            },
        ])
        .then(value => value.hostname);

export const inquireFlavor = () =>
    inquirer
        .prompt({
            message: "What is your application desired flavor?",
            name: "flavor",
            type: "list",
            choices: [
                {
                    name: "JavaScript",
                    value: "js",
                },
                {
                    name: "TypeScript",
                    value: "ts",
                },
            ],
        })
        .then(value => value.flavor);
