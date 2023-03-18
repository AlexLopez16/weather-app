import { input, inquirerMenu, listPlaces, pause } from "./helpers/inquirer.js";
import { Search } from "./models/search.js";


const main = async (): Promise<void> => {
    const searches = new Search();
    let option: number;

    do {
        option = await inquirerMenu()
        switch (option) {
            case 1:
                const toSearch = await input('City: ');
                const placesFound = await searches.city(toSearch)
                const id = await listPlaces(placesFound);
                if (id === '0') continue;
                const placeSelected = placesFound.find(place => place.id === id);
                if (placeSelected) searches.addToHistory(placeSelected.name)

                const weather = await searches.weather(placeSelected?.lat || 0, placeSelected?.lng || 0)

                console.clear();
                console.log('+--------------------------------------------------------------------------------------------------+'.green);
                console.log('|'.green + ''.padEnd(43, (' ')) + 'Country Info'.magenta + ''.padEnd(43, (' ')) + '|'.green);
                console.log('+--------------------------------------------------------------------------------------------------+'.green);
                console.log('|'.green, 'City:'.red, placeSelected?.name.padEnd(90, ' ').yellow, '|'.green);
                console.log('|'.green, 'Lat: '.red, `${placeSelected?.lat}`.padEnd(90, ' ').yellow, '|'.green);
                console.log('|'.green, 'Long:'.red, `${placeSelected?.lng}`.padEnd(90, ' ').yellow, '|'.green);
                console.log('|'.green + ''.padEnd(43, ('-')).green + 'Weather Info'.magenta + ''.padEnd(43, ('-')).green + '|'.green);
                console.log('|'.green, 'Temp:'.red, `${weather.temp}°C`.padEnd(90, ' ').yellow, '|'.green);
                console.log('|'.green, 'Min: '.red, `${weather.min}°C`.padEnd(90, ' ').yellow, '|'.green);
                console.log('|'.green, 'Max: '.red, `${weather.max}°C`.padEnd(90, ' ').yellow, '|'.green);
                console.log('|'.green, 'Feels_Like:'.red, `${weather.feels}°C ${weather.desc}`.padEnd(84, ' ').yellow, '|'.green);
                console.log('+--------------------------------------------------------------------------------------------------+'.green);

                break;
            case 2:
                searches.historyCapitalized.forEach((place, index) => {
                    const idx = `${index + 1}.`.red;
                    console.log(`${idx} ${place}`);
                })
                break;
        }

        if (option !== 0) await pause();

    } while (option !== 0);
}

main();