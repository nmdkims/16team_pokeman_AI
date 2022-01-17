from flask import Flask, render_template, request, jsonify
from datetime import datetime
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import tensorflow as tf
import numpy as np
import pandas as pd
import codecs, json

import os

# 학습시킨 binary classification model 불러오기 (출력층을 sigmoid 로 설정했기에, predict 하면 아웃풋이 0~1 로 나옴)
model = tf.keras.models.load_model('static/model/model.h5')

app = Flask(__name__)


@app.route('/')
def home():
    return render_template("index.html")


@app.route('/main_s')
def main_s():
    return render_template("main_s.html")


@app.route('/main_c')
def main_c():
    return render_template("main_c.html")


@app.route('/loading')
def loading():
    return render_template("loading.html")


@app.route('/result')
def result():
    return render_template("result.html")


@app.route('/api/predict', methods=['POST'])
def give_model():
    try:
        if os.path.exists(f'static/img/pokemon/'):
            for file in os.scandir(f'static/img/pokemon/'):
                os.remove(file.path)
    except:
        return
    else:

        file = request.files['file_give']
        # 해당 파일에서 확장자명만 추출
        extension = file.filename.split('.')[-1]
        # 파일 이름이 중복되면 안되므로, 지금 시간을 해당 파일 이름으로 만들어서 중복이 되지 않게 함!
        today = datetime.now()
        mytime = today.strftime('%Y-%m-%d-%H-%M-%S')
        filename = f'{mytime}'
        # 파일 저장 경로 설정 (파일은 서버 컴퓨터 자체에 저장됨)
        save_to = f'static/img/pokemon/{filename}.{extension}'
        # 파일 저장!
        file.save(save_to)

        print('테스트2')
        # 모델은 불러와져 있으니, 사용자가 올린 데이터를 predict 함수에 넣어주면 됨
        # 이미지이기에, rescale 및 size 조정을 위해 ImageDataGenerator 활용
        test_datagen = ImageDataGenerator(rescale=1. / 255)
        test_dir = './static/img/'
        test_generator = test_datagen.flow_from_directory(
            test_dir,
            # target_size 는 학습할때 설정했던 사이즈와 일치해야 함
            target_size=(224, 224),
            color_mode="rgb",
            shuffle=False,
            # test 셋의 경우, 굳이 클래스가 필요하지 않음
            # 학습할때는 꼭 binary 혹은 categorical 로 설정해줘야 함에 유의
            class_mode=None,
            batch_size=1)

        # test_generator = request.form['formData']
        # test_generator = request.files.getlist('attachedImage')

        print('테스트3')
        print('테스트제네레이터', test_generator)
        pred = model.predict(test_generator)
        # pred = (pred, axis=1)
        print(pred)

        classes = list(np.argmax(pred, axis=1))
        print('테스트4')
        # for i in pred.length :
        #     print('True : ' + str(' Predict : ' + str(pred[i])))

        print("Classes확인0", classes[0])
        # print("Classes확인1", classes[1])
        # print("Classes확인2", classes[2])
        # print("Classes확인3", classes[3])
        # print("Classes확인4", classes[4])

        # print("Classes확인", classes[0][0])

        # def PrintList(pList):
        #     print(type(pList), pList)

        # PrintList(pred)

        print("배열구조확인1", pred[0])
        print("배열구조확인2", pred[0][0])
        print("배열구조확인2", pred[0][1])
        print("배열구조확인2", pred[0][2])

        # print("배열구조확인3", pred[0][0][0])
        # print("배열구조확인4", pred[0][0][0][0])

        # return render_template('result.html', pred=pred)
        # data_convert = {k: float(v) for k, v in pred.items()}

        # a = np.arange(10).reshape(2, 5)  # a 2 by 5 array
        # b = a.tolist()  # nested lists with same data, indices
        # file_path = "/path.json"  ## your path variable
        # json.dump(b, codecs.open(file_path, 'w', encoding='utf-8'),
        #           separators=(',', ':'),
        #           sort_keys=True,
        #           indent=4)  ### this saves the array in .json format
        pokeclass = pd.Series(classes[0]).to_json(orient='values')
        pred_json = pd.Series(pred[0]).to_json(orient='values')
        print("배열구조확인6", pred_json)

    return jsonify({'pred': pred_json, 'pokeclass': pokeclass})


# model.predict('모델에 넣을 수 있도록 변환한 이미지 데이터')


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
