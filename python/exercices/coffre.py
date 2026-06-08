
print("")
print("########## - Bienvenue dans le système de sécurité.. - ##########")
print("")

code = "py123"
admin = ['admin', 'agent007']

while True:
    prenom = input("Quel est votre prénom ? : ")
    user_code = input("Entrez le code secret : ")
    age = input ("Quel âge avez-vous ?: ")

    if user_code==code:
        if int(age)>=18:
                if prenom in admin:
                    print (f"################ - Bienvenue Administrateur - #################")
                else:
                    print (f"Accès autorisé. Bienvenue {prenom}. Le coffre est maintenant ouvert.")
                break
        else:
            print ("Accès refusé : Code correct, mais accès interdit aux mineurs.")
            continue