PRESTATIONS = {
    "Logo": 70,
    "Site": 90,
    "Affiche": 50,   
}

def prestation_devis()-> int:
    while True:
        prestation = input("Saisissez le type de prestation (Logo, Site, Affiche): ")
        if prestation in PRESTATIONS:
            return PRESTATIONS[prestation], prestation
        else:
            print(f"Prestation '{prestation}' n'est pas disponible. Veuillez choisir parmi {list(PRESTATIONS.keys())}.")

def calculer_par_heure(prestation_price: int)-> float:
    
    while True:
        number_of_hours = input("Saisissez le nombre d'heures nécessaires pour la prestation: ")
        if number_of_hours.isdigit():
            heures = int(number_of_hours)
            break
        print("Saisissez un nombre d'heures valide: ")
    
    return prestation_price * heures


def service_urgent(prestation_price: int)-> int:
    urgent = input("La prestation est-elle urgente? (o/n): ").lower().strip() == 'o'
    if not urgent:
        return prestation_price
    return prestation_price + prestation_price * 0.3

def reduction_fidelite(prestation_price: int)-> int:
    fidelite = input("Avez-vous déjà utilisé nos services auparavant? (o/n): ").lower().strip() == 'o'
    if not fidelite:
        return prestation_price
    return prestation_price - prestation_price * 0.1
    
def aficher_devis():
    try:
        prestation_price, prestation = prestation_devis()
        total_price = calculer_par_heure(prestation_price)
        total_price = service_urgent(total_price)
        total_price = reduction_fidelite(total_price)
        print(f"Le devis pour la prestation '{prestation}' est de {total_price} €")
    except ValueError as e:
        print(e)
        
# Exemple d'utilisation
aficher_devis()