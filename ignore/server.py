from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

@app.route('/get-game-url', methods=['POST'])
def get_game_url():
    data = request.get_json()
    page = data.get('page', 1)
    tags = data.get('tags', [])
    
    base_url = "https://itch.io/games/platform-web"
    
    # Append tags to the URL only if tags are provided and not empty
    if tags:
        for tag in tags:
            base_url += "/tag-" + tag

    # Add the page number to the URL
    url = base_url + "?page=" + str(page)
    print(f"Requesting URL: {url}")
    
    # List of possible request strategies
    strategies = [
        {'verify': True, 'proxy': None},  # Standard request with SSL verification
        {'verify': False, 'proxy': None},  # Request without SSL verification
        {'verify': True, 'proxy': 'http://205.209.108.206:8080'},  # Use Google proxy (example)
    ]
    
    for strategy in strategies:
        try:
            print(f"Attempting with SSL verification={strategy['verify']} and Proxy={strategy['proxy']}")
            response = requests.get(url, verify=strategy['verify'], proxies={"http": strategy['proxy'], "https": strategy['proxy']} if strategy['proxy'] else None)
            
            # Log the response status
            print(f"Response Status: {response.status_code}")

            if response.status_code == 200:
                soup = BeautifulSoup(response.content, 'html.parser')
                game_links = soup.find_all('a', class_='title game_link')
                
                if game_links:
                    href_list = [link['href'] for link in game_links]
                    print(f"Found game links: {href_list}")
                    
                    game_index = data.get('game_index', None)
                    if game_index is not None and 0 <= game_index < len(href_list):
                        selected_href = href_list[game_index]
                        
                        try:
                            game_response = requests.get(selected_href, verify=strategy['verify'], proxies={"http": strategy['proxy'], "https": strategy['proxy']} if strategy['proxy'] else None)
                            game_soup = BeautifulSoup(game_response.content, 'html.parser')
                            iframe_data = game_soup.find('div', {'class': 'iframe_placeholder'})['data-iframe']
                            iframe_soup = BeautifulSoup(iframe_data, 'html.parser')
                            iframe_src = iframe_soup.find('iframe')['src']
                            return jsonify({'iframe_src': iframe_src})
                        
                        except Exception as e:
                            print(f"Error fetching iframe source: {e}")
                            continue
                    else:
                        print("Invalid game index.")
                        continue
                else:
                    print("No games found on the page.")
                    continue
            else:
                print(f"Failed to load the page. Status code: {response.status_code}")
                continue
        except requests.exceptions.RequestException as e:
            print(f"Error during request with SSL={strategy['verify']} and Proxy={strategy['proxy']}: {e}")
            continue

    return jsonify({'error': 'Unable to fetch game data from the page with any available method.'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
