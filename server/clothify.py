from flask import Flask, request, render_template, jsonify, redirect
from flask_cors import CORS
import os
import requests
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route("/login")
def login():
    return

@app.route("/get-started")
def getStarted():
    return

@app.route("/callback")
def callback():
    return

@app.route("/wardrobe-protected-area")
def index():
    return

