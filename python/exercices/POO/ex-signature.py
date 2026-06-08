class Personne:
    
    def __init__(self):
        self.name = self.input_with_default("Entrez votre nom : ", "Dupont")
        self.surname = self.input_with_default("Entrez votre prénom : ", "Jean")
        self.job_title = self.input_with_default("Entrez votre poste : ", "Collaborateur")
        self.phone = self.input_with_default("Entrez votre numéro de téléphone : ")
        self.email = self.input_with_default("Entrez votre adresse e-mail : ", self.generer_email_default(self.name, self.surname))
        
    def input_with_default(self, prompt: str, default_value: str = "N/A") -> str:
        return input(prompt).strip() or default_value
    
    def generer_email_default(self, last_name: str, first_name: str) -> str:
        return f"{first_name.lower()}.{last_name.lower()}@example.com"
    
    def generer_signature(self):
        print("\n📧 SIGNATURE GÉNÉRÉE 📧")
        print(f"{self.surname.capitalize()} {self.name.upper()}")
        print(self.job_title)
        print(f"Tél : {self.phone}")
        print(f"Email : {self.email}")
        

my_signature = Personne()
my_signature.generer_signature()