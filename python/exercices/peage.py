print("")
print("#################  Bienvenue au péage automatique.  ########################")
print("")
vehicules =['moto', 'voiture', 'camion']
tarif=['2', '5', '10']
while True:
    vehicule = input(f"Type de véhicule {vehicules}: ")
    if vehicule in vehicules:
        break
    else:
        print ("Saisissez le correct type du vehicule: ")
        continue

for ve, tf in zip(vehicules, tarif):
        if vehicule == ve:
            tarif_payee = int(tf)

#___________ verifier ici les mumbres des passagers _______________________
while True:
    passagers = input("Saisissez les numbres des passagers: ")
    if not passagers.isdigit():
        continue
    if int(passagers)>=1:
        if (vehicule == "voiture" and int(passagers)>=4):
            tarif_payee= tarif_payee -1
        break
    else:
        print("Invalide numbre du passager")


#___________ verifier ici le abonnement _______________________
while True:
    abonnement = input("Vous avez abonnement? (oui, non):")
    if abonnement.isdigit() or abonnement not in ['oui', 'non']:
        print ("Saisissez le correct reponse (oui, non): ")
        continue
    elif abonnement=="oui":
        tarif_payee= tarif_payee -2
        break
    else:
        break
    
print (f"Tarif final pour vehicule type du ({vehicule}) est: {tarif_payee}€")
print("")
print ("################### -- Passage Autorisé -- #######################")
print("")