import type { ForecastData } from "@/api/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

import {Line, ResponsiveContainer, XAxis, YAxis,LineChart, Tooltip} from 'recharts'
import {format} from 'date-fns'

interface HourlyTempratureProps{
    data:ForecastData
}

interface DataChartTypes{
    time:string;
    temp:number;
    feels_like:number
}

export function HourlyTemprature({data}:HourlyTempratureProps) {

    const DataChart:DataChartTypes[]=data.list.slice(0,8).map((item)=>({

        time:format(new Date (item.dt*1000),"ha"),
        temp:Math.round(item.main.temp),
        feels_like:Math.round(item.main.feels_like)
    }))
    



  return (
    <Card className="flex-1">
  <CardHeader>
    <CardTitle>Today's Temperature</CardTitle>
 
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <div className="pr-2 h-[200px] w-full">
    <ResponsiveContainer width="100%" height="100%">

        <LineChart data={DataChart}>

     <XAxis
     dataKey='time'
     stroke="#888888"
     fontSize={12}
     tickLine={false}
     axisLine={false}
     />

     <YAxis
     stroke="#888888"
     fontSize={12}
     tickLine={false}
     axisLine={false}
     tickFormatter={(val)=>`${val}°`}

     />


     <Tooltip
     content={({active,payload})=>{
        if(active && payload && payload.length){
            return(
                <div className="bg-background rounded-lg p-2 shadow-sm border">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                            <span className="text-muted-foreground uppercase text-[0.70rem]">
                                Temperature
                            </span>
                            <span className="font-bold">
                                {payload[0].value}°
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-muted-foreground uppercase text-[0.70rem]">
                                Feels Like
                            </span>
                            <span className="font-bold">
                                {payload[1].value}°
                            </span>
                        </div>
                    </div>
                </div>
            )
        }

        return null;
     }}
     />


     <Line
     type='monotone'
     dataKey='temp'
     stroke="#2563eb"
     dot={false}
     strokeWidth={2}
     />
     <Line 
     type='monotone'
     dataKey='feels_like'
     stroke="#64748b"
     dot={false}
     strokeWidth={2}
     strokeDasharray='5 5'
     />


  </LineChart>

    </ResponsiveContainer>
  </div>
  
</Card>
  )
}

export default HourlyTemprature