# Weather CMD App - Guide

## Table of contents

- [Weather CMD App - Guide](#weather-cmd-app---guide)
  - [Table of contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Set Up The Environment](#set-up-the-environment)

## Requirements

Before going forward you must have **Node js** installed on your machine.  
Go to the link below for installation if you don't have installed yet.

- [Node js](https://nodejs.org/en/download)

You must also have a registered [Mapbox](https://account.mapbox.com/auth/signup/) account to obtain your API_KEY.

And you must also have a registered [OpenWeather](https://home.openweathermap.org/users/sign_up) account to obtain your API_KEY.

## Set Up The Environment

1. Download the repository
   ![](./src/img/docs/download.png)

2. Unzip folder and open it with [VS Code](https://code.visualstudio.com/)
3. Open terminal `Ctrl` + `J` & install dependencies by running `npm install` command
4. Create a `.env` file in the root of the project
5. In `.env` create an enviroment called `MAPBOX_KEY` with the value of the `API_KEY` provided by `Mapbox`. Also create an enviroment called `OPENWEATHER_KEY` with the value of the `API_KEY` provided by `OpenWather`
6. Run the command `npm run build` to build a project
7. Run the command `npm start` to start the project
8. Congratulation 🎉 you have setup the environment successfully
