import random

print("")
print("########## - Bienvenue dans le jeu Devine le nombre. - ##########")
print("########## - Essayez de trouver le nombre secret Entre (1-100).. - ##########")
print("########## - Tapez (exit) pour quitter le jeu - ##########")
print("")

rand_num = random.randrange(1,100)

while True:
    user_num = input("Votre proposition : ")
    if user_num.isdigit():
        if int(user_num)==rand_num:
            break
        else:
            if int(user_num)>rand_num:
                print ("C'est plus grand.")
            else:
                print ("C'est plus petit")
            continue
    else:
        if user_num=="exit":
            quit()
        
        print ("Veuillez saisir un nombre entre 1 et 100")
        continue
print("")
print ("###### - Bravo, vous avez trouvé le bon nombre. - ######")
print("")