import requests

# NOTE: this script downloads image files from bulbapedia & puts them in res/images/pkmn_normal

# get pokemon names

with open("data/pokemon.txt", 'r') as f:
   pokemon_list = map(lambda x: x.replace("\n", ""), f.readlines())

# get pokemon 

LINK_TEMPLATE = "https://bulbapedia.bulbagarden.net/wiki/{}_(Pok%C3%A9mon)"

def site_from_pokemon(pkmn_name):
    return LINK_TEMPLATE.replace("{}", pkmn_name)

for pkmn in pokemon_list:
    print(pkmn)

    start_anchor = "<meta property=\"og:image\" content=\""
    end_anchor = "\" />"

    response = requests.get(site_from_pokemon(pkmn))
    img_link = response.text.split(start_anchor)[1].split(end_anchor)[0]
    
    print(img_link)

    img_response = requests.get(img_link)
    
    with open("../../res/images/pkmn_normal" + pkmn + ".png", 'wb') as fout:
        fout.write(img_response.content)

