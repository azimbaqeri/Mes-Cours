while True:
    age = input("Saisissez votre age: ")
    if age.isdigit() and age!="":
        break
    else:
        print("Saisissez une numbre SVP!")
        continue

if int(age)<18:
    message = 1
else:
    badge = input("Vous avez budge? repondre avec ('oui','non')): ")
    code = input("Vous avez code d'accés? repondre avec ('oui','non')): ")
    accompangee = input("Vous ete accompangee par un responsable? repondre avec ('oui','non')): ")
    if (badge=="oui" and code=="oui") and accompangee=="oui":
        message = 2
    elif (badge=="oui" and code=="oui") and accompangee=="non":
        message = 2
    elif (badge=="non" and code=="non") and accompangee=="oui":
        message = 6
    elif (badge=="oui" and code=="non") and accompangee=="non":
        message = 3
    elif (badge=="non" and code=="oui") and accompangee=="non":
        message = 4
    elif (badge=="non" and code=="non") and accompangee=="non":
        message = 5
    else:
        message = 7

match message:
    case 1:
        print ("zone interdite aux mineurs.")
    case 2:
        print ("Access autorisé")
    case 3:
        print ("Accès refusé : badge valide, mais code du jour manquant.")
    case 4:
        print ("Accès refusé : code correct, mais badge valide manquant.")
    case 5:
        print ("Accès refusé : autorisations insuffisantes.")
    case 6:
        print("Accès autorisé : entrée autorisée avec accompagnement.")
    case 7:
        print("Accès refusé : information manquant.")
