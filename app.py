from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def main():
    return render_template("index.html")


@app.route('/loading')
def loading():
    return render_template("loading.html")

@app.route('/result')
def result():
    return render_template("result.html")


# model.predict('모델에 넣을 수 있도록 변환한 이미지 데이터')


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)