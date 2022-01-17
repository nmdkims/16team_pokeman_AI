// 화면전환 효과: 새로고침하면 페이드 인


function isSameAsLocation(uriString) {
    const uri = new URL(uriString);
    return (
        uri.origin === window.location.origin &&
        uri.pathname === window.location.pathname
    );
}

function pageTransition(nodeList) {
    nodeList.forEach((node) => {
        if (!(node instanceof HTMLAnchorElement)) return;
        const {href} = node;
        if (!href || node.target === "_blank" || isSameAsLocation(href)) return;
        node.addEventListener("click", (event) => {
            event.preventDefault();
            document.body.addEventListener(
                "transitionend",
                () => {
                    window.location.href = href;
                },
                {passive: true, once: true});
            document.body.classList.add("hidden");
        });
    });
}

pageTransition(document.querySelectorAll("a"))


// 업로드 된 이미지 미리보기
function readURL(input) {
    //인풋 태그에 파일이 있는 경우
    if (input.files && input.files[0]) {
        // 이미지 파일인지 검사

        //FileReader 인스턴스 생성
        let reader = new FileReader();

        //이미지가 로드가 된 경우
        reader.onload = function (e) {
            // $('.image-upload-wrap').hide();
            $('.file-upload-input').hide();
            $('.drag-text').hide();
            $('#loading').show();



            $('.file-upload-image').attr('src', e.target.result);
            // $('.file-upload-image').setAttribute('src', e.target.result);

            $('.file-upload-image').show();
            $('.file-upload-content').show();
            $('.image-title').html(input.files[0].name);
        };

        // reader 가 이미지 읽도록 하기
        // reader.readAsDataURL(input.files[0]);
        // init().then(function () {
        //     console.log("hello");
        //     predict();
        //     alert("끝")
        //     $('#loading').hide();
        //
        // });


        reader.readAsDataURL(input.files[0]);
        init().then(function () {
            console.log("hello");
            predict().then()
            // $('#loading').hide();
            // alert("끝")

        });


    } else {
        removeUpload();
    }
}

function removeUpload() {
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
}

$('.image-upload-wrap').bind('dragover', function () {
    $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function () {
    $('.image-upload-wrap').removeClass('image-dropping');
});


// 머신러닝

// let URL;
// let pokemonModel = "https://teachablemachine.withgoogle.com/models/pfy8RXEpy/";
let labelContainer;

//
async function init() {

    // let formData = new FormData();
    //
    // let image_all = document.getElementById("face-image");
    //
    // let headElement = image_all.getElementsByTagName("img")
    // console.log(headElement);
    //
    // image_all.addEventListener('load', function (event) {
    //     getDataUrl(event.currentTarget);
    //console.log(dataUrl);
    // });
    // let image_test = document.querySelector("#face-image_fa1 #face-image_fa2 #face-image_fa3 #face-image_fa4 #face-image_fa5 #face-image_fa6 #face-image");
    // let image_test = document.querySelector("#face-image").getAttribute( 'src' );
    //
    // let image_test = document.querySelector("#face-image").getParameter( 'src' );
    //
    // let image_test = document.querySelectorAll("#face-image img");
    //  let src = $('#image').attr("src");
    // console.log("전체");
    // console.log(image_all);
    //
    // let image_outer = document.getElementById("face-image").outerHTML;
    //  console.log("아우터");
    // console.log(image_outer);
    // let image_inner = document.getElementById("face-image").innerHTML;
    // console.log("이너");
    // console.log(image_inner);
    //
    // let regex = /<img.*?src="(.*?)"/;
    // let src = regex.exec(image_outer)[1];
    //   console.log("정규화");
    // console.log(src);
    //
    //
    // alert("정규화")
    // alert( src)
    //
    // console.log("아우터2")
    // console.log(image_outer)
    // formData.append("image", image_all);
    // formData.append('file1',$('#파일테그1')[0].files[0]);
    // let image = document.getElementById("face-image")
    // let image = reader.readAsDataURL(input.files[0]);
    // console.log(formData["image"])
    //
    // let form = $('#uploadForm')[0];
    // let formData = new FormData(form);

    // let fileInput = document.querySelector("#file-input");
    //
    // let formData = new FormData();

    // formData.append("attachedImage", fileInput.files[0]);
    //
    // console.log(formData)
    //
    //    for (let pair of formData.entries()) {
    //             console.log(pair[0]+ ', ' + pair[1]);
    //         }

    // let fileInput = $('#file-input')[0].files[0]
    // let form_data = new FormData();
    //
    // form_data.append("file_give", fileInput)
    //
    //
    // $.ajax({
    //     type: "POST",
    //     url: "/api/predict",
    //     // data: {give_image: image},
    //     data: form_data,
    //     cache: false,
    //     contentType: false,
    //     processData: false,
    //     success: function (response) {
    //
    //         let pred = response['pred']
    //         let yourpoke = response['pokeclass'][1]
    //
    //
    //         console.log(yourpoke)
    //         // let pred = '{{pred}}'
    //         console.log("클라이언트")
    //         console.log(pred)
    //
    //         for (let i = 0; i < pred.length; i++) {
    //             console.log(pred[i])
    //         }
    //         let predstr = pred.split(',');
    //         console.log(predstr)
    //         console.log(predstr[0])
    //         predstr[0] = predstr[0].replace('[', '')
    //         console.log(predstr[0])
    //         console.log(predstr[9])
    //         predstr[9] = predstr[9].replace(']', '')
    //         console.log(predstr[9])
    //
    //         console.log("================================")
    //         for (let i = 0; i < predstr.length; i++) {
    //             console.log(predstr[i])
    //         }
    //
    //
    //         for (let i = 0; i < predstr.length; i++) {
    //             let index = 0;
    //             let poke = '';
    //             let prediction = '';
    //             let poke_arr = [index, poke, prediction];
    //
    //             poke_arr = [];
    //
    //             index = i;
    //             prediction = predstr[i];
    //
    //
    //             if (i == 0) {
    //                 poke = "charmander"
    //                 poke_arr = [index, poke, prediction];
    //                 console.log(poke_arr)
    //             } else if (i == 1) {
    //                 poke = "Diglett"
    //                 poke_arr = [index, poke, prediction];
    //                 console.log(poke_arr)
    //             } else if (i == 2) {
    //                 poke = "Ditto"
    //                 poke_arr = [index, poke, prediction];
    //                 console.log(poke_arr)
    //             } else if (i == 3) {
    //                 poke = "Grimer"
    //                 poke_arr = [index, poke, prediction];
    //                 console.log(poke_arr)
    //             } else if (i == 4) {
    //                 poke = "Growlithe"
    //                 poke_arr = [index, poke, prediction];
    //                 console.log(poke_arr)
    //             } else if (i == 5) {
    //                 poke = "Jigglypuff"
    //                 poke_arr = [index, poke, prediction];
    //                 console.log(poke_arr)
    //             } else if (i == 6) {
    //                 poke = "Mew"
    //                 poke_arr = [index, poke, prediction];
    //                 console.log(poke_arr)
    //             } else if (i == 7) {
    //                 poke = "Pikachu"
    //                 poke_arr = [index, poke, prediction];
    //                 console.log(poke_arr)
    //             } else if (i == 8) {
    //                 poke = "Snorlax"
    //                 poke_arr = [index, poke, prediction];
    //                 console.log(poke_arr)
    //             } else if (i == 9) {
    //                 poke = "Squirtle"
    //                 poke_arr = [index, poke, prediction];
    //                 console.log(poke_arr)
    //             } else {
    //                 poke = "error"
    //                 poke_arr = [index, poke, prediction];
    //                 console.log(poke_arr)
    //             }
    //
    //         return poke_arr, yourpoke
    //         }
    //     }
    // });

    // URL = pokemonModel;
    //
    // const modelURL = URL + "model.json";
    // const metadataURL = URL + "metadata.json";
    // model = await tmImage.load(modelURL, metadataURL);
    // maxPredictions = model.getTotalClasses();
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < 10; i++) {
        let element = document.createElement("div")
        await element.classList.add("d-flex");
        labelContainer.appendChild(element);
        //
        // window.location.href = '/result'
    }
}

async function predict() {


    let fileInput = $('#file-input')[0].files[0]
    let form_data = new FormData();

    await form_data.append("file_give", fileInput)


    $.ajax({
        type: "POST",
        url: "/api/predict",
        // data: {give_image: image},
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {

            let pred = response['pred']
            let yourpoke = parseFloat(response['pokeclass'][1])


            console.log(yourpoke)
            // let pred = '{{pred}}'
            console.log("클라이언트")
            console.log(pred)

            for (let i = 0; i < pred.length; i++) {
                console.log(pred[i])
            }
            let predstr = pred.split(',');
            console.log(predstr)
            console.log(predstr[0])
            predstr[0] = predstr[0].replace('[', '')
            console.log(predstr[0])
            console.log(predstr[9])
            predstr[9] = predstr[9].replace(']', '')
            console.log(predstr[9])

            console.log("================================")
            for (let i = 0; i < predstr.length; i++) {
                console.log(predstr[i])
            }

            let poke_array = ''
            poke_array = [];

            for (let i = 0; i < predstr.length; i++) {
                let index = 0;
                let poke = '';
                let prediction = '';
                let poke_arr = [index, poke, prediction];

                poke_arr = [];

                index = i;
                prediction = predstr[i];


                if (i == 0) {
                    poke = "charmander"
                    poke_arr = [index, poke, prediction];
                    poke_array[i] = poke_arr
                    console.log(poke_arr)
                } else if (i == 1) {
                    poke = "diglett"
                    poke_arr = [index, poke, prediction];
                    poke_array[i] = poke_arr
                    console.log(poke_arr)
                } else if (i == 2) {
                    poke = "ditto"
                    poke_arr = [index, poke, prediction];
                    poke_array[i] = poke_arr
                    console.log(poke_arr)
                } else if (i == 3) {
                    poke = "grimer"
                    poke_arr = [index, poke, prediction];
                    poke_array[i] = poke_arr
                    console.log(poke_arr)
                } else if (i == 4) {
                    poke = "growlithe"
                    poke_arr = [index, poke, prediction];
                    poke_array[i] = poke_arr
                    console.log(poke_arr)
                } else if (i == 5) {
                    poke = "jigglypuff"
                    poke_arr = [index, poke, prediction];
                    poke_array[i] = poke_arr
                    console.log(poke_arr)
                } else if (i == 6) {
                    poke = "mew"
                    poke_arr = [index, poke, prediction];
                    poke_array[i] = poke_arr
                    console.log(poke_arr)
                } else if (i == 7) {
                    poke = "pikachu"
                    poke_arr = [index, poke, prediction];
                    poke_array[i] = poke_arr
                    console.log(poke_arr)
                } else if (i == 8) {
                    poke = "snorlax"
                    poke_arr = [index, poke, prediction];
                    poke_array[i] = poke_arr
                    console.log(poke_arr)
                } else if (i == 9) {
                    poke = "squirtle"
                    poke_arr = [index, poke, prediction];
                    poke_array[i] = poke_arr
                    console.log(poke_arr)
                } else {
                    poke = "error"
                    poke_arr = [index, poke, prediction];
                    poke_array[i] = poke_arr
                    console.log(poke_arr)
                }


            }


            console.log("predic입성")
            console.log(poke_array[0])
            console.log(poke_array[1])
            console.log(poke_array[2])
            console.log(poke_array[3])
            console.log(poke_array[4])
            console.log(poke_array[5])
            console.log(poke_array[0][0])
            console.log(poke_array[0][1])
            console.log(poke_array[0][2])

            console.log(yourpoke)
            // let image = document.getElementById("face-image")

            // const prediction = await model.predict(image, false);
            // prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
            // console.log(prediction[0].className);
            let resultTitle, resultExplain, resultCeleb;

            switch (yourpoke) {
                case 7:
                    resultTitle = "피카츄"
                    resultExplain = "다정다감하고 귀여운 당신은 모든 사람들에게 즐거움을 주는 호감형이다! 친절하고 활발한 성격으로 어디에서도 인기폭발이며 애교와 웃음이 많아 연인에게 특히나 사랑스럽다. 당신은 애인바라기로 애인의 관심이 부족하면 시무룩해지고 외로움을 타는 모습이 마치 강아지와 똑 닮았다!"
                    resultCeleb = "강아지상 연예인: 강다니엘, 백현(엑소), 박보검, 송중기"
                    break;
                case 0:
                    resultTitle = "파이리"
                    resultExplain = "천진난만하고 귀여운 당신은 주변 사람들에게 기쁨을 주는 행복바이러스다! 호기심이 많아 활발하며 귀엽고 순수한 외모로 연인의 보호본능을 자극한다. 존재 자체가 상큼한 당신은 특별한 애교 없이도 연인에게 너무나도 사랑스럽다!"
                    resultCeleb = "토끼상 연예인: 정국(방탄소년단), 바비(아이콘), 박지훈(워너원), 수호(엑소)"
                    break;
                case 9:
                    resultTitle = "꼬부기"
                    resultExplain = "무뚝뚝한 당신의 첫인상은 차가워 보이지만 묘한 매력을 풍겨 언제나 인기가 넘친다. 자존심이 세계 1등과 맞먹지만 관심 받는 것을 좋아하고 연인에게는 은근히 애교쟁이다. 시크한 츤데레로 연인에게 끊임없이 설렘을 안겨주는 당신은 고양이와 닮았다!"
                    resultCeleb = "고양이상 연예인: 황민현(뉴이스트), 시우민(엑소), 강동원, 이종석, 이준기"
                    break;
                case 1:
                    resultTitle = "디그다"
                    resultExplain = "첫 인상은 무서워 보이지만 알고 보면 귀여운 매력의 당신! 꼼꼼하고 섬세한 성격으로 연인을 헌신적으로 챙겨주는 당신은 연인에게 듬직한 존재! 포근한 매력에 듬직함까지 갖춘 최고의 남자다!"
                    resultCeleb = "곰상 연예인: 마동석, 조진웅, 조세호, 안재홍"
                    break;
                case 8:
                    resultTitle = "잠만보"
                    resultExplain = "첫 인상은 무서워 보이지만 알고 보면 귀여운 매력의 당신! 꼼꼼하고 섬세한 성격으로 연인을 헌신적으로 챙겨주는 당신은 연인에게 듬직한 존재! 포근한 매력에 듬직함까지 갖춘 최고의 남자다!"
                    resultCeleb = "곰상 연예인: 마동석, 조진웅, 조세호, 안재홍"
                    break;
                case 4:
                    resultTitle = "가디"
                    resultExplain = "무심한 성격에 첫인상은 나쁜 남자 같지만, 알고 보면 따뜻함이 묻어나는 당신! 시크한 매력에 선뜻 다가가지 못하지만 한번 다가가면 헤어나올 수 없는 터프한 매력을 가진 카리스마 있는 남자다."
                    resultCeleb = "공룡상 연예인: 윤두준(하이라이트), 이민기, 김우빈, 육성재(비투비), 공유"
                    break;
                case 5:
                    resultTitle = "푸린"
                    resultExplain = "첫 인상은 무서워 보이지만 알고 보면 귀여운 매력의 당신! 꼼꼼하고 섬세한 성격으로 연인을 헌신적으로 챙겨주는 당신은 연인에게 듬직한 존재! 포근한 매력에 듬직함까지 갖춘 최고의 남자다!"
                    resultCeleb = "곰상 연예인: 마동석, 조진웅, 조세호, 안재홍"
                    break;
                case 6:
                    resultTitle = "뮤"
                    resultExplain = "첫 인상은 무서워 보이지만 알고 보면 귀여운 매력의 당신! 꼼꼼하고 섬세한 성격으로 연인을 헌신적으로 챙겨주는 당신은 연인에게 듬직한 존재! 포근한 매력에 듬직함까지 갖춘 최고의 남자다!"
                    resultCeleb = "곰상 연예인: 마동석, 조진웅, 조세호, 안재홍"
                    break;
                case 3:
                    resultTitle = "질퍽이"
                    resultExplain = "첫 인상은 무서워 보이지만 알고 보면 귀여운 매력의 당신! 꼼꼼하고 섬세한 성격으로 연인을 헌신적으로 챙겨주는 당신은 연인에게 듬직한 존재! 포근한 매력에 듬직함까지 갖춘 최고의 남자다!"
                    resultCeleb = "곰상 연예인: 마동석, 조진웅, 조세호, 안재홍"
                    break;
                case 2:
                    resultTitle = "메타몽"
                    resultExplain = "첫 인상은 무서워 보이지만 알고 보면 귀여운 매력의 당신! 꼼꼼하고 섬세한 성격으로 연인을 헌신적으로 챙겨주는 당신은 연인에게 듬직한 존재! 포근한 매력에 듬직함까지 갖춘 최고의 남자다!"
                    resultCeleb = "곰상 연예인: 마동석, 조진웅, 조세호, 안재홍"
                    break;
                default:
                    resultTitle = "알수없음"
                    resultExplain = ""
                    resultCeleb = ""
            }

            let title = "<div class='" + poke_array[yourpoke] + "-poketmon-title'>" + resultTitle + "</div>"
            let explain = "<div class='poketmon-explain pt-2'>" + resultExplain + "</div>"
            let celeb = "<div class='" + poke_array[yourpoke] + "-poketmon-celeb pt-2 pb-2'>" + resultCeleb + "</div>"
            $('.result-message').html(title + explain + celeb);
            let barWidth;

            for (let i = 0; i < predstr.length; i++) {
                if (parseFloat(predstr[i]).toFixed(2) > 0.1) {
                    barWidth = Math.round(parseFloat(predstr[i]).toFixed(2) * 100) + "%";
                } else if (parseFloat(predstr[i]).toFixed(2) >= 0.01) {
                    barWidth = "4%"
                } else {
                    barWidth = "2%"
                }
                let labelTitle;
                switch (i) {
                    case 7:
                        labelTitle = "피카츄"
                        break;
                    case 0:
                        labelTitle = "파이리"
                        break;
                    case 9:
                        labelTitle = "꼬부기"
                        break;
                    case 1:
                        labelTitle = "디그다"
                        break;
                    case 8:
                        labelTitle = "잠만보"
                        break;
                    case 4:
                        labelTitle = "가디"
                        break;
                    case 5:
                        labelTitle = "푸린"
                        break;
                    case 6:
                        labelTitle = "뮤"
                        break;
                    case 3:
                        labelTitle = "질퍽이"
                        break;
                    case 2:
                        labelTitle = "메타몽"
                        break;
                    default:
                        labelTitle = "알수없음"
                }
                let label = "<div class='poketmon-label d-flex align-items-center'>" + labelTitle + "</div>"
                let bar = "<div class='bar-container position-relative container'><div class='" + poke_array[i][1] + "-box'></div><div class='d-flex justify-content-center align-items-center " + poke_array[i][1] + "-bar' style='width: " + barWidth + "'><span class='d-block percent-text'>" + Math.round(parseFloat(poke_array[i][2]).toFixed(2) * 100) + "%</span></div></div>"
                labelContainer.childNodes[i].innerHTML = label + bar;
                $('#loading').hide();
            }
        }
    });
    //
    // console.log("predic입성")
    // console.log(poke_arr)
    // console.log(yourpoke)
    // let image = document.getElementById("face-image")
    // const prediction = await model.predict(image, false);
    // prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
    // console.log(prediction[0].className);
    // var resultTitle, resultExplain, resultCeleb;
    //
    // switch (prediction[0].className) {
    //     case "pikachu":
    //         resultTitle = "피카츄"
    //         resultExplain = "다정다감하고 귀여운 당신은 모든 사람들에게 즐거움을 주는 호감형이다! 친절하고 활발한 성격으로 어디에서도 인기폭발이며 애교와 웃음이 많아 연인에게 특히나 사랑스럽다. 당신은 애인바라기로 애인의 관심이 부족하면 시무룩해지고 외로움을 타는 모습이 마치 강아지와 똑 닮았다!"
    //         resultCeleb = "강아지상 연예인: 강다니엘, 백현(엑소), 박보검, 송중기"
    //         break;
    //     case "charmander":
    //         resultTitle = "파이리"
    //         resultExplain = "천진난만하고 귀여운 당신은 주변 사람들에게 기쁨을 주는 행복바이러스다! 호기심이 많아 활발하며 귀엽고 순수한 외모로 연인의 보호본능을 자극한다. 존재 자체가 상큼한 당신은 특별한 애교 없이도 연인에게 너무나도 사랑스럽다!"
    //         resultCeleb = "토끼상 연예인: 정국(방탄소년단), 바비(아이콘), 박지훈(워너원), 수호(엑소)"
    //         break;
    //     case "squirtle":
    //         resultTitle = "꼬부기"
    //         resultExplain = "무뚝뚝한 당신의 첫인상은 차가워 보이지만 묘한 매력을 풍겨 언제나 인기가 넘친다. 자존심이 세계 1등과 맞먹지만 관심 받는 것을 좋아하고 연인에게는 은근히 애교쟁이다. 시크한 츤데레로 연인에게 끊임없이 설렘을 안겨주는 당신은 고양이와 닮았다!"
    //         resultCeleb = "고양이상 연예인: 황민현(뉴이스트), 시우민(엑소), 강동원, 이종석, 이준기"
    //         break;
    //     case "diglett":
    //         resultTitle = "디그다"
    //         resultExplain = "첫 인상은 무서워 보이지만 알고 보면 귀여운 매력의 당신! 꼼꼼하고 섬세한 성격으로 연인을 헌신적으로 챙겨주는 당신은 연인에게 듬직한 존재! 포근한 매력에 듬직함까지 갖춘 최고의 남자다!"
    //         resultCeleb = "곰상 연예인: 마동석, 조진웅, 조세호, 안재홍"
    //         break;
    //     case "snorlax":
    //         resultTitle = "잠만보"
    //         resultExplain = "첫 인상은 무서워 보이지만 알고 보면 귀여운 매력의 당신! 꼼꼼하고 섬세한 성격으로 연인을 헌신적으로 챙겨주는 당신은 연인에게 듬직한 존재! 포근한 매력에 듬직함까지 갖춘 최고의 남자다!"
    //         resultCeleb = "곰상 연예인: 마동석, 조진웅, 조세호, 안재홍"
    //         break;
    //     case "growlithe":
    //         resultTitle = "가디"
    //         resultExplain = "무심한 성격에 첫인상은 나쁜 남자 같지만, 알고 보면 따뜻함이 묻어나는 당신! 시크한 매력에 선뜻 다가가지 못하지만 한번 다가가면 헤어나올 수 없는 터프한 매력을 가진 카리스마 있는 남자다."
    //         resultCeleb = "공룡상 연예인: 윤두준(하이라이트), 이민기, 김우빈, 육성재(비투비), 공유"
    //         break;
    //     case "jigglypuff":
    //         resultTitle = "푸린"
    //         resultExplain = "첫 인상은 무서워 보이지만 알고 보면 귀여운 매력의 당신! 꼼꼼하고 섬세한 성격으로 연인을 헌신적으로 챙겨주는 당신은 연인에게 듬직한 존재! 포근한 매력에 듬직함까지 갖춘 최고의 남자다!"
    //         resultCeleb = "곰상 연예인: 마동석, 조진웅, 조세호, 안재홍"
    //         break;
    //     case "mew":
    //         resultTitle = "뮤"
    //         resultExplain = "첫 인상은 무서워 보이지만 알고 보면 귀여운 매력의 당신! 꼼꼼하고 섬세한 성격으로 연인을 헌신적으로 챙겨주는 당신은 연인에게 듬직한 존재! 포근한 매력에 듬직함까지 갖춘 최고의 남자다!"
    //         resultCeleb = "곰상 연예인: 마동석, 조진웅, 조세호, 안재홍"
    //         break;
    //     case "grimer":
    //         resultTitle = "질퍽이"
    //         resultExplain = "첫 인상은 무서워 보이지만 알고 보면 귀여운 매력의 당신! 꼼꼼하고 섬세한 성격으로 연인을 헌신적으로 챙겨주는 당신은 연인에게 듬직한 존재! 포근한 매력에 듬직함까지 갖춘 최고의 남자다!"
    //         resultCeleb = "곰상 연예인: 마동석, 조진웅, 조세호, 안재홍"
    //         break;
    //     case "ditto":
    //         resultTitle = "메타몽"
    //         resultExplain = "첫 인상은 무서워 보이지만 알고 보면 귀여운 매력의 당신! 꼼꼼하고 섬세한 성격으로 연인을 헌신적으로 챙겨주는 당신은 연인에게 듬직한 존재! 포근한 매력에 듬직함까지 갖춘 최고의 남자다!"
    //         resultCeleb = "곰상 연예인: 마동석, 조진웅, 조세호, 안재홍"
    //         break;
    //     default:
    //         resultTitle = "알수없음"
    //         resultExplain = ""
    //         resultCeleb = ""
    // }
    //
    // var title = "<div class='" + prediction[0].className + "-poketmon-title'>" + resultTitle + "</div>"
    // var explain = "<div class='poketmon-explain pt-2'>" + resultExplain + "</div>"
    // var celeb = "<div class='" + prediction[0].className + "-poketmon-celeb pt-2 pb-2'>" + resultCeleb + "</div>"
    // $('.result-message').html(title + explain + celeb);
    // var barWidth;
    // for (let i = 0; i < maxPredictions; i++) {
    //     if (prediction[i].probability.toFixed(2) > 0.1) {
    //         barWidth = Math.round(prediction[i].probability.toFixed(2) * 100) + "%";
    //     } else if (prediction[i].probability.toFixed(2) >= 0.01) {
    //         barWidth = "4%"
    //     } else {
    //         barWidth = "2%"
    //     }
    //     var labelTitle;
    //     switch (prediction[i].className) {
    //         case "pikachu":
    //             labelTitle = "피카츄"
    //             break;
    //         case "charmander":
    //             labelTitle = "파이리"
    //             break;
    //         case "squirtle":
    //             labelTitle = "꼬부기"
    //             break;
    //         case "diglett":
    //             labelTitle = "디그다"
    //             break;
    //         case "snorlax":
    //             labelTitle = "잠만보"
    //             break;
    //         case "growlithe":
    //             labelTitle = "가디"
    //             break;
    //         case "jigglypuff":
    //             labelTitle = "푸린"
    //             break;
    //         case "mew":
    //             labelTitle = "뮤"
    //             break;
    //         case "grimer":
    //             labelTitle = "질퍽이"
    //             break;
    //         case "ditto":
    //             labelTitle = "메타몽"
    //             break;
    //         default:
    //             labelTitle = "알수없음"
    //     }
    // let label = "<div class='poketmon-label d-flex align-items-center'>" + labelTitle + "</div>"
    // let bar = "<div class='bar-container position-relative container'><div class='" + prediction[i].className + "-box'></div><div class='d-flex justify-content-center align-items-center " + prediction[i].className + "-bar' style='width: " + barWidth + "'><span class='d-block percent-text'>" + Math.round(prediction[i].probability.toFixed(2) * 100) + "%</span></div></div>"
    // labelContainer.childNodes[i].innerHTML = label + bar;

}