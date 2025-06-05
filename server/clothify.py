from flask import Flask, request, render_template, jsonify
import os
import requests
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

@app.route("/login")
def login():
    return

@app.route("/wardrobe")
def index():
    return

