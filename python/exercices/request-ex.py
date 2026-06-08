# À compléter
import requests 
city = input("Entrez le nom de la ville : ")

def get_weather(city):
    try:
        response = requests.get(f"https://wttr.in/{city}?format=j1&lang=fr")
        return response.json()
    except ValueError:
        return None

data = get_weather(city)
if data != None and 'current_condition' in data and len(data['current_condition']) > 0:    
    temp_C = data['current_condition'][0]["temp_C"]
    FeelsLikeC = data['current_condition'][0]["FeelsLikeC"]
    humidity =data['current_condition'][0]["humidity"]
    weatherDesc = data['current_condition'][0]['lang_fr'][0]['value']
    temp_min = data['weather'][0]["mintempC"]
    temp_max = data['weather'][0]["maxtempC"]
else:
    print(f"Aucune condition actuelle trouvée pour cette ville ({city}).")
    exit()


print(f"Météo actuelle à {city}")    
print(f"Température : {temp_C}°C")
print(f"Ressenti    : {FeelsLikeC}°C")
print(f"Humidité    : {humidity}%")
print(f"Description : {weatherDesc}")
print(f"Temp Max    : {temp_max}°C")
print(f"Temp Min    : {temp_min}°C")

