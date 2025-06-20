import { useState } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command";
import { Button } from "./ui/button";
import { Clock, Loader2, Search, XCircle } from "lucide-react";
import { useLocationSearch } from "@/Hooks/UseWeather";
import { useNavigate } from "react-router-dom";
import { SearchHistory } from "@/Hooks/UseSearchHistory";
import { format } from "date-fns";

  
export default function CitySearch() {

    const [open ,setOpen]=useState(false);
    const[query,SetQuery]=useState('');

    const{data:location,isLoading}=useLocationSearch(query)
    const {addToHistory,history,clearHistory}=SearchHistory()

   

    const navigate=useNavigate()

    const handleSlect=(cityData:string)=>{
       const [lat,lon,name,country] =cityData.split("|")

        addToHistory.mutate({
        query,
        name,
        lat:parseFloat(lat),
        lon:parseFloat(lon),
        country
    })

       navigate(`/city/${name}?lat=${lat}&lon=${lon}`)
       setOpen(false)
    }

  return (
    <>
    <Button
    onClick={()=>setOpen(true)}
    variant='outline'
    className="relative w-full justify-start  text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
    >
        <Search className="mr-2 h-4 w-4" />
        Search cities...
    </Button>
     <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search cities..."
      onValueChange={SetQuery}
      value={query}
      />
      <CommandList>
        { query.length>2 && isLoading &&( < CommandEmpty>No results found.</CommandEmpty>)}

        <CommandGroup heading="Favorites">
          <CommandItem>Calendar</CommandItem>
        </CommandGroup>
        

       { history.length>0 &&(
       <>
         <CommandGroup >
            <div className="flex justify-between items-center px-2 my-2">
                <p className="text-xs text-muted-foreground">Recent searches</p>
                <Button 
                variant='ghost'
                size='sm'
                onClick={()=>clearHistory.mutate()}
                >
                    <XCircle className="h-4 w-4"/>
                    Clear
                </Button>
            </div>
            {
                history.map((locations)=>(
                     <CommandItem key={`${locations.lat}-${locations.lon}`}
                value={`${locations.lat}|${locations.lon}|${locations.country}|${locations.name}`}
                onSelect={handleSlect}
                >
                    <Clock className="mr-2 h-4 w-4"/>
                    <span>{locations.name}</span>
                    {locations.state && (
                        <span className="text-sm text-muted-foreground">, {locations.state}</span>
                    )}
                    <span className="text-sm text-muted-foreground">
                        , {locations.country}
                    </span>
                     <span className="ml-auto text-xs text-muted-foreground">
                        {format(locations.searchedAt, "MMM d, h:mm a")}
                      </span>
                
                </CommandItem>
                ))
            }
           <CommandSeparator/>
         
        </CommandGroup>
        </>
        )}

        <CommandSeparator/>

        {location && location.length>0 &&(
            <CommandGroup heading="Suggestions">
                {isLoading && (
                    <div className="flex items-center justify-center p-4" >
                        <Loader2 className="w-4 h-4 animate-spin"/>
                    </div>
                )}
          {location?.map((locations)=>{
            return (
                <CommandItem key={`${locations.lat}-${locations.lon}`}
                value={`${locations.lat}|${locations.lon}|${locations.name}|${locations.country}`}
                onSelect={handleSlect}
                >
                    <Search className="mr-2 h-4 w-4"/>
                    <span>{locations.name}</span>
                    {locations.state && (
                        <span className="text-sm text-muted-foreground">, {locations.state}</span>
                    )}
                    <span className="text-sm text-muted-foreground">
                        , {locations.country}
                    </span>
                
                </CommandItem>
            )
          })}
        </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
    
    </>
  )
}

