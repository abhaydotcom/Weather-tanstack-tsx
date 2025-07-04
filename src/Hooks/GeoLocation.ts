import type { Coordinates } from "@/api/types";
import { useEffect, useState } from "react";



interface GeolocationState{
    coordinates:Coordinates|null,
    error:string|null,
    isLoading:boolean
}

export function useGeolocation(){
    const [locationData,setLocationData]=useState<GeolocationState>({
        coordinates:null,
        error:null,
        isLoading:true,
    });

    const getLocation=()=>{
        setLocationData((prev)=>({...prev,isLoading:true,error:null}))

        if(!navigator.geolocation){
            setLocationData({
                coordinates:null,
                error:"Geo Location is not supported by your browser",
                isLoading:false
            })
            return
        }
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                setLocationData({
                    coordinates:{
                        lat:position.coords.latitude,
                        lon:position.coords.longitude
                    },
                    error:null,
                    isLoading:false,
                });
            },
            (error)=>{
                let errorMessage:string;

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage="Location permision is needed! Please enable Location access"                        
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage="Location information is not available";
                        break;
                    case error.TIMEOUT:
                        errorMessage="Location request timeout";
                        break;
                    
                    default:
                        errorMessage="An Unknown error occured"
                }
                setLocationData({
                    coordinates:null,
                    error:errorMessage,
                    isLoading:false
                })

            },
            {
                enableHighAccuracy:true,
                timeout:5000,
                maximumAge:0

            }
        );
    };

    useEffect(()=>{
        getLocation();
    },[])

    return {
        ...locationData,
        getLocation 
    }
}