import CurrentWeather from "@/components/CurrentWeather";
import HourlyTemprature from "@/components/HourlyTemprature";
import Loading_Skeleton from "@/components/Loading_Skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button"
import WeatherDetail from "@/components/WeatherDetail";
import WeatherForecast from "@/components/WeatherForecast";
import { useGeolocation } from "@/Hooks/GeoLocation"
import { useForecastQuery, useReverseGeoQuery, useWeatherQuery } from "@/Hooks/UseWeather";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react"

 

const WeatherDashboard = () => {

  const {coordinates,error:locatoinError,getLocation,isLoading:loadingLocation} = useGeolocation();

  const WeatherQuery=useWeatherQuery(coordinates)
  const ForecastQuery=useForecastQuery(coordinates)
  const LocationQuery=useReverseGeoQuery(coordinates)

  
  const handleRefresh= () => {
    getLocation();
    if(coordinates){
      WeatherQuery.refetch();
      ForecastQuery.refetch();
      LocationQuery.refetch()
    }
  }

  if(loadingLocation){
    return <Loading_Skeleton/>
  }

  if(locatoinError){
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4"/>
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locatoinError}</p>
          <Button className="w-fit" variant="outline" onClick={getLocation}>
            <MapPin className="mr-2 h-4 w-4"/>
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if(!coordinates){
    return(
         <Alert>
        <MapPin className="h-4 w-4" />
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Please enable location access to see your local weather.</p>
          <Button variant="outline" onClick={getLocation} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>  
    )
  }
  const locationName=LocationQuery.data?.[0];
  if(WeatherQuery.error || ForecastQuery.error){
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data. Please try again.</p>
          <Button variant="outline" onClick={handleRefresh} className="w-fit">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    )
  }
  if(!WeatherQuery.data || !ForecastQuery.data ){
    return(
      <Loading_Skeleton/>
    )
  }
  

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold tr">My Location</h1>
        <Button
        variant={"outline"}
        size="icon"
        onClick={handleRefresh}
        disabled={WeatherQuery.isFetching || ForecastQuery.isFetching}

        >
          <RefreshCw 
          className={`h-4 w-4 ${WeatherQuery.isFetching?"animate-spin":""}`}
          />
        </Button>
      </div>


        <div className="grid gap-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <CurrentWeather
              data={WeatherQuery.data}
              locationName={locationName}
            />
            <HourlyTemprature data={ForecastQuery.data} />
          </div>


          <div className=" grid md:grid-cols-2 gap-6 items-start">
            <WeatherDetail data={WeatherQuery.data} />
            <WeatherForecast data={ForecastQuery.data} />

          </div>
        </div>

    </div>
  )
}

export default WeatherDashboard