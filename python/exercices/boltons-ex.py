from boltons import strutils

products = [
    "Télévision LED 55 pouces - Promo!!!",
    "TV LED 55\" PROMO",
    "café en grains bio - offre spéciale",
    "Cafe en grains BIO #TopVente",
    "ordinateur portable gamer   ",
    "Ordinateur-portable Gamer !!!",
]

list = strutils.MultiReplace({
    'TV': 'Télévision',
    'Promo': '',
    'PROMO': '',
    'offre spéciale': '',
    '!!!': '',
    '-': ' ',
    '#TopVente': '',
    ' pouces': '"',
    
})



def build_product_info(products, list):
    text_cleaned =  []
    text_hashtag=""
    slugify_text = []
    number_hashtag = 0
    number_repeat = 0
    final_list = []

    for i in range(len(products)):
        
        if strutils.find_hashtags(products[i]) != []:
            text_hashtag = strutils.find_hashtags(products[i])
            number_hashtag +=1
        first_list = list.sub(products[i])
        text_cleaned.append(strutils.asciify(first_list, ignore=True).decode('utf-8').capitalize().strip())
        slugify_text.append(strutils.slugify(text_cleaned[i], delim='_',).capitalize())
        
    text_cleaned = sorted(text_cleaned)
    slugify_text = sorted(slugify_text)
    for i in range(len(text_cleaned)):
        if text_cleaned[i] not in final_list:
            final_list.append(text_cleaned[i])
            number_repeat+=1
    return text_cleaned, slugify_text, text_hashtag, number_hashtag, number_repeat, final_list  


text_cleaned, slugify_text, text_hashtag, number_hashtag, number_repeat, final_list = build_product_info(products, list)

#print text in form sample with ordered by abc
for i in range(len(text_cleaned)):
    print(f"{text_cleaned[i]}")
print("\n")
#print text in form slugify")
for i in range(len(slugify_text)):
    print(f"{slugify_text[i]}")
print("\n")
#print liste final
print ("------------ List Final ---------------")
for i in range(len(final_list)):
    print(f"{final_list[i]}")
print ("---------------------------")
#print text in form hashtag
print(f"Hashtags found: {text_hashtag}")
print (f'Nomber of Hashtag: {number_hashtag}')
print (f'détecter les doublons {number_repeat}')
print("\n")