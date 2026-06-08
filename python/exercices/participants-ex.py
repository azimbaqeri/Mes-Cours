import requests

def get_participant(number_participant):
    list_person = []
    index =0 
    try:
        response = requests.get(f"https://randomuser.me/api/?results={number_participant}")
        data = response.json()
        if data != None and 'results' in data and len(data['results']) > 0:    
            for participant in data['results']:
                index +=1
                list_person.append({
                    'index' : index,
                    'fullname' : participant['name']['first'] + " " + participant['name']['last'],
                    'email' : participant['email'],
                    'city' : participant['location']['city'],
                    'country' : participant['location']['country'],
                    'nationality' : participant['nat']
                    
                })
        else:
            print("Aucun participant trouvé.")
            exit()
        return list_person
    except ValueError:
        return None


print("\n")
print("############### Bienvenue dans le générateur de participants fictifs. ###############")
number_participant = input("Combien de participants voulez-vous générer ? : ")
print("\n")
list_person = get_participant(number_participant)
for person in list_person:
    print(f"Participant {person['index']} :")
    print(f"Nom complet : {person['fullname']}")
    print(f"Email       : {person['email']}")
    print(f"Ville       : {person['city']}")
    print(f"Pays        : {person['country']}")
    print(f"Nationalité : {person['nationality']}")
    print("\n")
