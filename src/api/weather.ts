import { API_CONFIG } from "./config";
import type { Coordinates, ForecastData, reverseGeo, WeatherData } from "./types";

class WeatherApi{
    private createUrl(endpoint:string,params:Record<string,string|number>){
        const searchParams=new URLSearchParams( {
            appid:API_CONFIG.API_KEY,
            ...params,
        })
        return `${endpoint}?${searchParams.toString()}`
    }


    private async fetchUrl<T>(url:string):Promise<T>{
        const response=await fetch(url)
        if(!response.ok){
            throw new Error(`Weather api problem ${response.statusText}`)
        }

        return response.json();
    }

    async getCurrentWeather({lat,lon}:Coordinates):Promise<WeatherData>{
        const url=this.createUrl(`${API_CONFIG.BASE_URL}/weather`,{
            lat:lat.toString(),
            lon:lon.toString(),
            units:API_CONFIG.DEFAULT_PARAMS.units
        })
        return this.fetchUrl<WeatherData>(url)
    }

     async getForecast({lat,lon}:Coordinates):Promise<ForecastData>{
        const url=this.createUrl(`${API_CONFIG.BASE_URL}/forecast`,{
            lat:lat.toString(),
            lon:lon.toString(),
            units:API_CONFIG.DEFAULT_PARAMS.units   
        })
        return this.fetchUrl<ForecastData>(url)
    }

     async reverseGeocode({lat,lon}:Coordinates):Promise<reverseGeo[]>{
        const url=this.createUrl(`${API_CONFIG.GEO}/reverse`,{
            lat:lat.toString(),
            lon:lon.toString(),
            limit:"1"
        })
        return this.fetchUrl<reverseGeo[]>(url)
    }

     async searchLocation(query:string):Promise<reverseGeo[]>{
        const url=this.createUrl(`${API_CONFIG.GEO}/direct`,{
            q:query,
            limit:"5"
        })
        return this.fetchUrl<reverseGeo[]>(url)
    }
}

export const weatherApi=new WeatherApi();
