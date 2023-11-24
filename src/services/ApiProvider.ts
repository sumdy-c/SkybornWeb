/**
 * Временное представление API
 */

const url = 'http://localhost:8080/';

interface IAPI {
    point: { 
        [key: string]: string;
    };
    map: string;
    modelPack: object;
    model: string;
}

const API: IAPI = {
    point: {
        users : url + 'users',
    },
    
    map: url + 'some map',
    
    modelPack : {
        get(paramPack: string) {
            console.error(paramPack);
            // some pack models
        }
    },
    model: '' // some model
};


export class ApiProvider {
    constructor() {};
    /**
     * Получает информацию от сервера 
     * @param api необходимые данные
     */
    static GET(api: string, callback: Function) {
        fetch(API.point[api])
        .then((data)=> {
            data.json().then(result => callback(result as never));
        });
    };

    // LOADMAP(map: string) {

    // };

    // LOADMODEL(id: string) {

    // };
}