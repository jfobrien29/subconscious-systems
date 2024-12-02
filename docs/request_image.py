import base64
from PIL import Image
from io import BytesIO
import json

import requests
import json

URL = "https://50.217.254.173:40227"  # URL => Comes from Vast.ai instance
BEARER_TOKEN = "0ad5a4bade92fa37575448174d64529454419b4bebb0f16da3f538bc6b79281d"  # Bearer Token => get from the instance via: $ echo $OPEN_BUTTON_TOKEN


def make_request(output_filename, prompt):
    headers = {
        "accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": f"Bearer {BEARER_TOKEN}",
    }

    data = {
        "prompt": prompt,
        # "negative_prompt": "clouds, people",
        "sampler_name": "Euler",
        "steps": 20,
        "cfg_scale": 7,
        "height": 512,
        "width": 512,
        "seed": -1,
    }

    # Send the POST request
    response = requests.post(
        f"{URL}/sdapi/v1/txt2img",
        headers=headers,
        data=json.dumps(data),
        verify=False,
        allow_redirects=True,
    )

    # Check if the request was successful and print the response
    if response.status_code == 200:
        print("Response received:", response.json())
    else:
        print("Request failed with status code:", response.status_code)
    print("Response:", response.text)

    j = json.loads(response.text)

    im = Image.open(BytesIO(base64.b64decode(j["images"][0])))
    im.save(output_filename, "PNG")


make_request(
    output_filename="image1.png", prompt="Sunset in the mountains, lake in front"
)
