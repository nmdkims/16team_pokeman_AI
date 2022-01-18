from flask import Flask, render_template, request, jsonify

import tensorflow as tf
import numpy as np



model = tf.keras.models.load_model('static/model/model.h5')

app = Flask(__name__)


@app.route('/')
def home():
    return render_template("index.html")



@app.route('/main_test')
def main_test():
    return render_template("main_test.html")


@app.route('/api/predict', methods=['POST'])
def give_model():

    test_generator = request.form['file_give']

    pred = model.predict(test_generator)
    classes = list(np.argmax(pred, axis=1))


    return jsonify({'pred': pred, 'pokeclass': classes})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
