import type { WeatherData } from "@/api/types"
import { format } from "date-fns";
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface wetherQueryType{
    data:WeatherData;
}

function WeatherDetail({data}:wetherQueryType) {
    const {wind,main,sys}=data;

    const FormatTime=(timeStamps:number)=>{
      return format(new Date(timeStamps*1000),"h:mm a")
    }

    const getWindDirection=(degree:number)=>{
       const directions=['N', 'NE', 'E','S','SE','W','SW','NW'];
       const index=Math.round(((degree %=360)<0? degree+360:degree)/45)%8;
       return directions[index];
    }

    const details=[
        {
            title:"Sunrise",
            icon:Sunrise,
            color:"text-orange-500",
            value:FormatTime(sys.sunrise)
        },
        {
            title:"Sunset",
            icon:Sunset,
            color:"text-yellow-500",
            value:FormatTime(sys.sunset)
        },
        {
            title:"Pressure",
            icon:Gauge,
            color:"text-purple-500",
            value:`${main.pressure} hpa`
        },
        {
            title:"Wind-Direciton",
            icon:Compass,
            color:"text-orange-500",
            value:`${getWindDirection(wind.deg)} (${wind.deg}°)`
        }
    ]

  return (
    <Card>
  <CardHeader>
    <CardTitle>Weather Details</CardTitle>
   
  </CardHeader>
  <CardContent>
    <div className="grid gap-6 sm:grid-cols-2">
        {
            details.map((detail)=>(
                <div 
                key={detail.title}
                className="flex items-center p-4 rounded-lg border gap-3"
                >
                <detail.icon className={`h-5 w-5 ${detail.color}`} />
                <div>
                    <p className="text-sm font-medium leading-none">{detail.title}</p>
                    <p className="text-sm text-muted-foreground">{detail.value}</p>
                </div>

                </div>
            ))
        }
    </div>
  </CardContent>

</Card>
  )
}

export default WeatherDetail