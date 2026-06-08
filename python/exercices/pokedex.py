import requests

def get_pokemon(pokemon_name):
    url = f"https://pokeapi.co/api/v2/pokemon/{pokemon_name.lower()}"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        type_names = [type["type"]["name"] for type in data["types"]]
        pokemon_info = {
            "name": data["name"].capitalize(),
            "height": data["height"],
            "weight": data["weight"],
            "types": ", ".join(type_names),
            "stats": {
                "hp": data['stats'][0]['base_stat'], 
                "attack" : data['stats'][1]['base_stat'], 
                "defense" : data['stats'][2]['base_stat'],
            
            }
        }
        return pokemon_info
    else:
        return None
    
def collect_info():
    pokemon_list = []
    while True:
        pokemon_name = input("Nom du Pokémon à rechercher : ").strip()
        if get_pokemon(pokemon_name) is None:
            print("Pokémon not found. Please try again.")
            continue
        pokemon_info = get_pokemon(pokemon_name)
        pokemon_list.append(pokemon_info)
        print(f"Name: {pokemon_info['name']}")
        print(f"Height: {pokemon_info['height']}")
        print(f"Weight: {pokemon_info['weight']}")
        print(f"Types: {pokemon_info['types']}")
        print("Stats:")
        for stat, value in pokemon_info['stats'].items():
            print(f" -> {stat.capitalize()}: {value}")
        if len(pokemon_list)>0:
            user_input = input("voulez vous continuer ? (oui/non) ").strip().lower()
            if user_input != 'oui':
                break
        
    return pokemon_list

def display_final_team():
    get_info = collect_info()
    print ("\n ####################### Équipe finale ####################### \n")
    for index, pokemon in enumerate(get_info, start=1):
        print (f" {index}. {pokemon['name']}")
        print (f" Types : {pokemon['types']}")
        print(f" PV : {pokemon['stats']['hp']} | Attaque : {pokemon['stats']['attack']} | Défense : {pokemon['stats']['defense']}")
    print ("\n ############################################################# \n")

display_final_team()