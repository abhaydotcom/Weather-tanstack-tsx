import type { ForecastData } from "@/api/types"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface forecastType{
    data:ForecastData
}

interface dailyForecastType{
      temp_min:number;
      temp_max:number;
      humidity:number;
      wind:number;
      date:number;
      weather:{
        id:number;
        main:string;
        description:string;
        icon:string;
      },
}

function WeatherForecast({data}:forecastType) {

    const dailyForecast=data.list.reduce((acc,forecast)=>{
        const date=format(new Date(forecast.dt*1000),"yyyy-MM-dd");
 
        if(!acc[date]){
            acc[date]={
                temp_min:forecast.main.temp_min,
                temp_max:forecast.main.temp_max,
                humidity:forecast.main.humidity,
                wind:forecast.wind.speed,
                weather:forecast.weather[0],
                date:forecast.dt
            }
        }else{
            acc[date].temp_min=Math.min(acc[date].temp_min,forecast.main.temp_min);
            acc[date].temp_max=Math.max(acc[date].temp_max,forecast.main.temp_max);
        }
return acc

    },{}as Record<string, dailyForecastType>)
    
    const nextDays=Object.values(dailyForecast).slice(1,6)

    const formatDays=(temp:number)=>`${Math.round(temp)}°`
    
  return (
   <Card>
  <CardHeader>
    <CardTitle>5-Days Forecast</CardTitle>
  
  </CardHeader>
  <CardContent>
    <div className="grid gap-4">
        {
            nextDays.map((day)=>(
                <div
                key={day.date}
                 className="grid grid-cols-3 rounded-lg items-center p-4 border  gap-4"
                >
                    <div
                   
                    >
                        <p className="font-medium">{format(new Date(day.date*1000),"EEE-MMM d")}

                        </p>
                        <p className="text-sm text-muted-foreground capitalize">{day.weather.description}</p>
                    </div>

                    <div className="flex justify-center gap-4">
                        <span className="flex items-center text-green-500">
                            <ArrowDown className="mr-1 h-4 w-4"/>
                            {formatDays(day.temp_min)}
                        </span>
                        <span className="flex items-center text-red-500">
                            <ArrowUp className="mr-1 h-4 w-4"/>
                            {formatDays(day.temp_max)}
                        </span>
                    </div>

                    <div className=" lg:flex justify-end ml-2 gap-2 ">
                        <span className="flex items-center gap-1">
                            <Droplets className="h-4 w-4 text-blue-500"/>
                            <span>{day.humidity}%</span>
                        </span>
                        <span className="flex items-center gap-1">
                            <Wind className="h-4 w-4 text-blue-500" / >
                            <span>{day.wind}m/s</span>
                        </span>
                    </div>


                </div>
            ))
        }
    </div>
  </CardContent>

</Card>
  )
}

export default WeatherForecast