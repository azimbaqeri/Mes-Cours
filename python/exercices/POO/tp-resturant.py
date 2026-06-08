from abc import ABC, abstractmethod
import inquirer


class Commande(ABC):
    def __init__(self, client_id, client_name, price_plat, delivery_distance, type_commande):
        self._client_id = client_id
        self._client_name = client_name
        self._price_plat = price_plat
        self._delivery_distance = delivery_distance
        self._type_commande = type_commande
        
    
    @abstractmethod
    def total_price(self):
        pass
    
    def print_commande(self):
        print(f"\nCommande # : {self._client_id}")
        print(f"Client: {self._client_name}")
        print(f"Type: {self._type_commande}")
        print(f"Montant des plats : {self._price_plat}")
        print(f"Distance de livraison : {self._delivery_distance}km")
        print(f"Total à payer : {self.total_price()}\n")
    
class CommandeClassique(Commande):
        
    def total_price(self):
        return self._price_plat + (self._delivery_distance  * 2)
        
        
class CommandeExpress(Commande):
    
    def total_price(self):
        return self._price_plat + (self._delivery_distance  * 3) + 5

        
class CommandeVIP(Commande):
        
    def total_price(self):
        return self._price_plat * 0.9
    

def get_commande_info(prompt: str) -> str:
    try:
        return float(input(prompt).strip())
    except ValueError:
        print("Entrée invalide. Veuillez entrer un nombre.")
        return get_commande_info(prompt)

    
        
        
def main():
    list_commande = []
    price_total = 0
    id_count = 1
    while True:
        client_name = input("Entrez le nom du client : ")
        price_plat = get_commande_info("Entrez le montant des plats : ")
        delivery_distance = get_commande_info("Entrez la distance de livraison (en km) : ")
        
        ask_type_commande = [
            inquirer.List('type',
                message="Quel type de commande souhaitez-vous ?",
                choices=['Classique', 'Express', 'VIP'],
            ),]
        result_commande_type = inquirer.prompt(ask_type_commande)['type']
       
        if result_commande_type== "Classique":
            commande = CommandeClassique(id_count, client_name, price_plat, delivery_distance,'Classique')
        elif result_commande_type== "Express":
            commande = CommandeExpress(id_count, client_name, price_plat, delivery_distance,'Express')
        elif result_commande_type== "VIP":
            commande = CommandeVIP(id_count, client_name, price_plat, delivery_distance,'VIP')
        else:
            print("Type de commande invalide. Veuillez entrer Classique, Express ou VIP.")
            continue
        list_commande.append(commande)
        price_total += commande.total_price()
        
        continue_commande = [
            inquirer.List('response',
                message="Voulez-vous ajouter une autre commande ?",
                choices=['Oui', 'Non'],
            ),]
        add_commande = inquirer.prompt(continue_commande)['response']
    
        if add_commande.lower() == 'oui':
            id_count += 1
            continue
        else:
            break
    for cmd in list_commande:
        cmd.print_commande()
    print(f"Total des commandes : {price_total}")
        
    
    
if __name__ == "__main__":
    main()
    
    
    
# commande1 = CommandeClassique(1, "Alice", 25, 4, "Classique")
# commande2 = CommandeExpress(2, "Bob", 30, 3, "Express")
# commande3 = CommandeVIP(3, "Claude", 50, 6, "VIP")
# commande4 = CommandeClassique(4, "Didier", 18, 2, "Classique")

# commande1.print_commande()
# commande2.print_commande()
# commande3.print_commande()
# commande4.print_commande()

# print(f"Total des commandes : {commande1.total_price() + commande2.total_price() + commande3.total_price() + commande4.total_price()}")