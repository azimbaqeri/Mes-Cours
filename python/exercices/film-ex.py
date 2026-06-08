import os, csv, json, inquirer

if not os.path.exists('film.csv'):
  with open('film.csv', 'w', encoding='utf-8', newline='') as f:
    champs = ['title','release_year','genre','is_seen']
    writer = csv.DictWriter(f, fieldnames=champs)
    writer.writeheader()       # Écrit les noms de colonnes

def add_movie():    
    with open('film.csv', 'a', encoding='utf-8', newline='') as f:
        writer = csv.writer(f)
        title = input("Titre du film : ")
        release_year = input("Année de sortie : ")
        genre = input("Genre : ")
        is_seen = input("Vu ? (oui/non) : ")
        writer.writerow([title, release_year, genre, is_seen])
        
def list_movies():
    with open('film.csv', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        print(f"\n{'-' * 90}")
        print(f"{'No':3}  {'Titre':<20} {'Année':<15} {'Genre':<20} {'Vu':<10}")
        print("-" * 90)
        for index, row in enumerate(reader, start=1):
            print(f"{str(index):3}  {row['title']:<20} {row['release_year']:15} {row['genre']:20} {row['is_seen']:10}")
    print("-" * 90, "\n")

        
def search_movie():

    search_title = input("Titre à rechercher : ").lower()
    with open('film.csv', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        found_movies = []
        for row in reader:
            if search_title in row['title'].lower():
                found_movies.append(row)
        
        if found_movies:
            print(f"\nFilms trouvés pour '{search_title}':")
            print("-" * 90)
            print(f"{'No':3}  {'Titre':<20} {'Année':<15} {'Genre':<20} {'Vu':<10}")
            print("-" * 90)
            for index, row in enumerate(found_movies, start=1):
                print(f"{str(index):3}  {row['title']:<20} {row['release_year']:15} {row['genre']:20} {row['is_seen']:10}")
        else:
            print(f"Aucun film trouvé pour '{search_title}'.")
    print("-" * 90, "\n")
    
            
def delete_movie():
    list_movies()
    try:
        index_to_delete = int(input("Numéro du film à supprimer : "))
        with open('film.csv', 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            movies = list(reader)    
        if 1 <= index_to_delete <= len(movies):
            del movies[index_to_delete - 1]
            with open('film.csv', 'w', encoding='utf-8', newline='') as f:
                writer = csv.DictWriter(f, fieldnames=['title','release_year','genre','is_seen'])
                writer.writeheader()
                writer.writerows(movies)
            print("Film supprimé avec succès.")
        else:
            print("Numéro invalide.")
    except ValueError:
        print("Entrée invalide. Veuillez entrer un numéro.")
        
        
def mark_movie_as_seen():
    list_movies()
    try:
        index_to_mark = int(input("Numéro du film à marquer comme vu : "))
        with open('film.csv', 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            movies = list(reader)    
        if 1 <= index_to_mark <= len(movies):
            movies[index_to_mark - 1]['is_seen'] = 'oui'
            with open('film.csv', 'w', encoding='utf-8', newline='') as f:
                writer = csv.DictWriter(f, fieldnames=['title','release_year','genre','is_seen'])
                writer.writeheader()
                writer.writerows(movies)
            print("Film marqué comme vu avec succès.")
        else:
            print("Numéro invalide.")
    except ValueError:
        print("Entrée invalide. Veuillez entrer un numéro.")

def export_movies_json():
    with open('film.csv', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        movies = list(reader)
        number_of_movies = len(movies)
        number_of_seen_movies = sum(1 for movie in movies if movie['is_seen'].lower() == 'oui')
        genre_names = sorted(set(movie['genre'] for movie in movies))
    genre_counter = {}
    for movie in movies:
        genre = movie['genre'].strip()
        if genre:
            genre_counter[genre] = genre_counter.get(genre, 0) + 1

        most_used_genre = max(genre_counter, key=genre_counter.get) if genre_counter else ""
        genre_names = most_used_genre
    
    with open('movies.json', 'w', encoding='utf-8') as f:
        json.dump(movies, f, ensure_ascii=False, indent=4)
    
    with open('stats.json', 'w', encoding='utf-8') as f:
        stats = {
            'total_movies': number_of_movies,
            'seen_movies': number_of_seen_movies,
            'unique_genres': genre_names
        }
        json.dump(stats, f, ensure_ascii=False, indent=4)
        
    print("Films exportés vers films.json avec succès.")
    print("\n")
    

def main():
    while True:
        # print("\n === Gestionnaire de films ===")
        # print("1. Ajouter un film")
        # print("2. Lister les films")
        # print("3. Rechercher un film")
        # print("4. Supprimer un film")
        # print("5. Marquer un film comme vu")
        # print("6. Exporter les films en JSON et afficher les statistiques")
        # print("7. Quitter")
        # print("-" * 30)
        # choice = input("Choix : ")
        
        questions = [
            inquirer.List(
            "action",
            message="=== Gestionnaire des films ===",
                choices=[
                    ("Ajouter un film", 1),
                    ("Lister les films", 2),
                    ("Rechercher un film", 3),
                    ("Supprimer un film", 4),
                    ("Marquer un film comme vu", 5),
                    ("Exporter les films en JSON et afficher les statistiques", 6),
                    ("Quitter", 7),
                ],
            ),
        ]
        answers = inquirer.prompt(questions)
        choice = answers["action"]
        
        if choice == 1:
            add_movie()
        elif choice == 2:
            list_movies()
        elif choice == 3:
            search_movie()
        elif choice == 4:
            delete_movie()
        elif choice == 5:
            mark_movie_as_seen()
        elif choice == 6:
            export_movies_json()
        elif choice == 7:
            print("Au revoir !")
            exit()
        else:
            print("Choix invalide, veuillez réessayer.")

main()