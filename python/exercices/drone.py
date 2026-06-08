import time

METEO = ['soleil', 'nuageux', 'vent', 'pluie']
ZONES = ['entrepot', 'parking', 'toiture', 'securisee']
PRIORITES = ['basse', 'normale', 'haute', 'critique']

def demand_meteo():
    while True:
        meteo = input(f"Entrez la météo ({', '.join(METEO)}): ").lower().strip()
        if meteo not in METEO:
            print("Météo invalide, veuillez réessayer.")
        else:
            return meteo

def demand_zone():
    while True:
        zone = input(f"Entrez la zone de vol ({', '.join(ZONES)}): ").lower().strip()
        if zone not in ZONES:
            print("Zone invalide, veuillez réessayer.")
        else:
            return zone

def demand_priorite():
    while True:
        priorite = input(f"Entrez la priorité de la mission ({', '.join(PRIORITES)}): ").lower().strip()
        if priorite not in PRIORITES:
            print("Priorité invalide, veuillez réessayer.")
        else:
            return priorite
        
def battery_level():
    battery_level= int(input("Entrez le niveau de batterie du drone (en %): "))
    return battery_level
    
def autoriser_mission():
    autorise = input("La mission est-elle autorisée? (o/n): ").lower().strip() == 'o'
    return autorise

def calculer_risque(meteo, zone, priorite, battery):
    risque = 0
    
    if meteo == 'vent':
        risque += 2
    elif meteo == 'nuageux':
        risque += 1
    
    if zone == 'toiture':
        risque += 2
    elif zone == 'securisee':
        risque += 3
    
    if battery > 20 or battery< 35:
        risque += 2
    
    if priorite == 'haute':
        risque += 1
    elif priorite == 'critique':
        risque += 2
        
    return risque

def risque_niveau(risque):
    if risque <= 2:
        return "faible"
    elif risque <= 4:
        return "modéré"
    else:
        return "élevé"

def mission_info():
    print("Bienvenue dans le système de préparation des missions de drone.\n")
    nom_mission = input("Entrez le nom de la mission: ")
    battery = battery_level()
    meteo = demand_meteo()
    zone = demand_zone()
    priorite = demand_priorite()
    autorise = autoriser_mission()
    risque = risque_niveau(calculer_risque(meteo, zone, priorite, battery))
    
    print("\nAnalyse de la mission en cours...")
    time.sleep(3)  # Simule un temps de traitement
    
    print("\n ----- Résultats de l'analyse de la mission: -----\n")
    print(f"Nom de la Mission: {nom_mission}")
    print(f"Batterie du Drone: {battery}%")
    print(f"Météo : {meteo}")
    print(f"Zone : {zone}")
    print(f"Priorité : {priorite}")
    print(f"Mission autorisée : {'Oui' if autorise else 'Non'}")
    print(f"Score de risque : {calculer_risque(meteo, zone, priorite, battery)}")
    print(f"Niveau de risque : {risque}")
    
    print("\n -----  Décision de la mission: -----\n")
    if(battery < 20):
        print("Mission refusée : Niveau de batterie critique, recharge nécessaire avant la mission.")
    elif (meteo == 'pluie'):
        print("Mission refusée : Conditions météorologiques défavorables pour le vol.")
    elif (zone == 'securisee' and not autorise):
        print("Mission refusée : Zone sécurisée, autorisation requise.")
    else:
        print("Mission autorisée : Toutes les conditions sont remplies pour un vol sécurisé.")
    print("\n --------------------------------------\n")

mission_info()
