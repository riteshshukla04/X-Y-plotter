import requests
import time
from dotenv import dotenv_values


while True:
    s=dotenv_values(".env")
    r = requests.get(s, allow_redirects=True)
    open('upload.svg', 'wb').write(r.content)
    time.sleep(10)