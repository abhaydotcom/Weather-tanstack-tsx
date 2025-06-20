import CurrentWeather from "@/components/CurrentWeather";
import HourlyTemprature from "@/components/HourlyTemprature";
import Loading_Skeleton from "@/components/Loading_Skeleton";
import { Alert, AlertDescription} from "@/components/ui/alert";
import WeatherDetail from "@/components/WeatherDetail";
import WeatherForecast from "@/components/WeatherForecast";
import { useForecastQuery, useWeatherQuery } from "@/Hooks/UseWeather";
import { AlertTriangle } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom"

const City = () => {

  const [searchParams]=useSearchParams()
  const params=useParams();
  const lat=parseFloat(searchParams.get("lat")||"0");
  const lon=parseFloat(searchParams.get("lon")||"0");
  const coordinates={lat,lon}

  const weatherQuery=useWeatherQuery(coordinates)
  const forecastQuery=useForecastQuery(coordinates);

   if(weatherQuery.error || forecastQuery.error){
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="flex flex-col gap-4">
           Failed to load weather data. Please try again.
        </AlertDescription>
      </Alert>
    )
  }

   if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <Loading_Skeleton />;
  }

  return (
    <div className="space-y-4">
    <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">{params.cityName},{weatherQuery.data.sys.country}</h1>
        </div>


    <div className="grid gap-6">
          <div className="flex flex-col  gap-4">
            <CurrentWeather
              data={weatherQuery.data}
 
            />
            <HourlyTemprature data={forecastQuery.data} />
          </div>


          <div className=" grid md:grid-cols-2 gap-6 items-start">
            <WeatherDetail data={weatherQuery.data} />
            <WeatherForecast data={forecastQuery.data} />

          </div>
        </div>
        </div>
  )
}

export default City