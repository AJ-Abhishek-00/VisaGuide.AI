from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv  # 🔑 Add this line
import google.generativeai as genai

load_dotenv()  # ✅ Load .env variables

app = Flask(__name__)
CORS(app)

# ✅ Now this will fetch from .env
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

model = genai.GenerativeModel("gemini-2.0-flash")

@app.route("/visa-info", methods=["POST"])
def visa_info():
    data = request.json
    query = data.get("query", "")
    try:
        response = model.generate_content(query)
        return jsonify({"response": response.text})
    except Exception as e:
        print("❌ Error:", str(e))  # helpful for debugging
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
