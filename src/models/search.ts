import dotenv from 'dotenv'
import fs from 'fs'
import axios from 'axios'

dotenv.config()

export interface Place {
    id: string;
    name: string;
    lng: number;
    lat: number;
}

interface City {
    id: string;
    place_name: string;
    center: (number)[]
}

interface Weather {
    desc: string
    feels: number
    min: number
    max: number
    temp: number
}

interface Payload {
    history: string[]
}

export class Search {
    private history: string[] = [];
    private dbPath: string = '../db/data.json';

    constructor() {
        this.readDB()
    }

    get historyCapitalized(): string[] {
        return this.history.map((place) => {
            let words = place.split(' ');
            words = words.map((w) => w[0].toUpperCase() + w.substring(1));
            return words.join(' ');
        })
    }

    private get paramsMapBox(): { access_token: string, limit: number, lenguage: string } {
        return {
            'access_token': process.env.MAPBOX_KEY!,
            'limit': 5,
            'lenguage': 'en'
        }
    }

    async city(city: string): Promise<Place[]> {
        try {
            const instance = axios.create({
                params: this.paramsMapBox
            });

            const res = await instance.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`);

            return res.data.features.map((place: City) => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            }))

        } catch (error) {
            return []
        }

    }

    private get paramsOpenWeather(): { appid: string, units: string, lang: string } {
        return {
            appid: process.env.OPENWEATHER_KEY!,
            units: 'metric',
            lang: 'en'
        }
    }

    async weather(lat: number, lon: number): Promise<Weather> {
        try {
            const instance = axios.create({
                params: { ...this.paramsOpenWeather, lat, lon }
            })
            const res = await instance.get('https://api.openweathermap.org/data/2.5/weather')
            const { weather, main } = res.data;

            return {
                desc: weather[0].description,
                feels: main.feels_like,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    addToHistory(place: string): void {
        if (this.history.includes(place.toLocaleLowerCase())) return;

        this.history = this.history.splice(0, 5);
        this.history.unshift(place.toLowerCase())
        this.saveDB();
    }

    private saveDB(): void {
        const payload: Payload = {
            history: this.history
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }

    private readDB(): void {
        if (!fs.existsSync(this.dbPath)) return;
        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse(info);

        this.history = data.history;
    }
}