
def saisir_informations():
    
    last_name = input("Entrez votre nom : ").strip() or "Dupont"
    first_name = input("Entrez votre prénom : ").strip() or "Jean"
    job_title = input("Entrez votre poste : ").strip() or "Collaborateur"
    phone_number = input("Entrez votre numéro de téléphone : ").strip() or "N/A"
    email = input("Entrez votre adresse e-mail : ").strip() or f"{last_name.lower()}.{first_name.lower()}@example.com"
    infos = {
        'last_name': last_name,
        'first_name': first_name,
        'job_title': job_title,
        'phone_number': phone_number,
        'email': email
    }
    return infos

def generer_signature(info):
    signature = info
    print("\n📧 SIGNATURE GÉNÉRÉE 📧")
    print(f"{signature['first_name'].capitalize()} {signature['last_name'].upper()}")
    print(f"{signature['job_title']}")
    print(f"Tél : {signature['phone_number']}")
    print(f"Email : {signature['email']}")

def main():
    info = saisir_informations()
    generer_signature(info)

main()