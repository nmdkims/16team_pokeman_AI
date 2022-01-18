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

        reader.readAsDataURL(input.files[0]);
        //동기화를 위한 .then() 함수
        init().then(function () {
            console.log("hello");
            predict().then()
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

//라벨 컨테이너 초기설정
let labelContainer;

async function init() {

    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < 10; i++) {
        let element = document.createElement("div")
        await element.classList.add("d-flex");
        labelContainer.appendChild(element);
    }
}

async function predict() {
    // 파일의 인풋값을 #file-input에서 받아서 저장
    let fileInput = $('#file-input')[0].files[0]
    // form_data를 생성
    let form_data = new FormData();
    // append로 붙여서 전송 준비 키값은 file_give
    await form_data.append("file_give", fileInput)

    $.ajax({
        type: "POST",
        url: "/api/predict",
        // url 값이 같은 곳과 POST ajax 통신
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        // data, cache, contentType, processData 설정 중요
        success: function (response) {
            // 서버에서 json으로 보내준 값을 response['']로 받아줌
            let pred = response['pred']
            let yourpoke = parseFloat(response['pokeclass'][1])



            console.log(yourpoke)
            console.log("클라이ㅇㅇㅇ언트")
            console.log(pred)

            // pred 내용 확인
            // for (let i = 0; i < pred.length; i++) {
            //     console.log(pred[i])
            // }

            // string으로 된 pred 값을 ,을 기준으로 배열로 재 분할
            let predstr = pred.split(',');
            console.log(predstr)

            // predstr배열에 남아있는 대괄호 [] 제거
            console.log(predstr[0])
            predstr[0] = predstr[0].replace('[', '')
            console.log(predstr[0])
            console.log(predstr[9])
            predstr[9] = predstr[9].replace(']', '')
            console.log(predstr[9])

            // pred 내용 재확인
            // console.log("================================")
            // for (let i = 0; i < predstr.length; i++) {
            //     console.log(predstr[i])
            // }

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

            let resultTitle, resultExplain, resultCeleb;

            switch (yourpoke) {
                case 7:
                    resultTitle = "피카츄"
                    resultExplain = "다정다감하고 귀여운 당신은 모든 사람들에게 즐거움을 주는 호감형이다! 친절하고 활발한 성격으로 어디에서도 인기폭발이며 애교와 웃음이 많아 연인에게 특히나 사랑스럽다. 당신은 애인바라기로 애인의 관심이 부족하면 시무룩해지고 외로움을 타는 모습이 마치 강아지와 똑 닮았다!"
                    resultCeleb = "피카츄상 연예인: 강다니엘, 백현(엑소), 솔지(EXID)"
                    break;
                case 0:
                    resultTitle = "파이리"
                    resultExplain = "천진난만하고 귀여운 당신은 주변 사람들에게 기쁨을 주는 행복바이러스다! 호기심이 많아 활발하며 귀엽고 순수한 외모로 연인의 보호본능을 자극한다. 존재 자체가 상큼한 당신은 특별한 애교 없이도 연인에게 너무나도 사랑스럽다!"
                    resultCeleb = "파이리상 연예인: 다현(트와이스), 동해(슈퍼주니어), 엠버(f(x)), 김영철(배우/feat.김두한)"
                    break;
                case 9:
                    resultTitle = "꼬부기"
                    resultExplain = "무뚝뚝한 당신의 첫인상은 차가워 보이지만 묘한 매력을 풍겨 언제나 인기쟁이! 자존심은 세계 1등이지만 의외로 관심 받는 것을 좋아하고 연인에게는 은근히 애교쟁이! 시크한 츤데레로 연인에게 끊임없이 설렘을 안겨주는 당신은 고양이와 닮았다!"
                    resultCeleb = "꼬부기상 연예인: 하연수, 유정(브레이브걸스), 솔라(마마무), 나연(트와이스)"
                    break;
                case 1:
                    resultTitle = "디그다"
                    resultExplain = "첫 인상은 무서워 보이지만 알고 보면 귀여운 매력의 당신! 애교만점 깜찍 덩어리! 매끈한 당신의 섹시함에 빠지면 헤어나올 수가 없겠군요! 당신의 매력을 많은 사람들에게 보여주세요! 이런 마성의 사람!"
                    resultCeleb = "디그다 상 연예인: 밥샵(격투기선수), 제이슨 스타뎀, 존 맥클레인(다이하드)"
                    break;
                case 8:
                    resultTitle = "잠만보"
                    resultExplain = "묵직해보이지만 볼수록 매력덩어리! 안정감있는 당신은 연인에게 듬직한 존재! 포근한 매력에 듬직함까지 갖춘 최고의 사람! 사람들은 힘든 순간이 있을 때 당신을 먼저 생각합니다! 벌써부터 든든한 모습에 심쿵! 이런 죄 많은 사람!"
                    resultCeleb = "잠만보상 연예인: 유민상(개그맨), 마동석, 조세호"
                    break;
                case 4:
                    resultTitle = "가디"
                    resultExplain = "무심한 성격에 첫인상은 나쁜 남자 같지만, 알고 보면 따뜻함이 묻어나는 당신! 시크한 매력에 사람들이 선뜻 다가가지 못하지만 한번 다가가면 매력에 빠져 헤어나올 수 없네요! 터프한 매력을 가진 카리스마!"
                    resultCeleb = "가디상 연예인: 고경표, 윤두준(하이라이트), 이동욱, 공유"
                    break;
                case 5:
                    resultTitle = "푸린"
                    resultExplain = "당신은 재기발랄 태생부터 연예인! 많은 사람들의 관심과 사랑을 받으며, 사람들에게 그 사랑을 되돌려주는 전형적인 초특급 슈퍼스타 연예인! 이 세상에 당신처럼 귀여운 사람들만 가득하면 좋겠군요!"
                    resultCeleb = "푸린상 연예인: 김호성(내배캠 NAMED USER), 이혜정(요리연구가), 초아(AOA)"
                    break;
                case 6:
                    resultTitle = "뮤"
                    resultExplain = "옆에 있으면 눈이 가는 귀염뽀짝! 매력충만! 당신은 뭘해도 사랑스러운 귀염형 스타일! 조심하세요! 행동 하나 하나가 사람들의 심쿵을 유발합니다! 위잉위잉!! 여기 심쿵 주의보 발령입니다!"
                    resultCeleb = "뮤상 연예인: 손연재, 이솜, 한예리, 한지민"
                    break;
                case 3:
                    resultTitle = "질퍽이"
                    resultExplain = "첫인상은 피하고 싶지만 알고 보면 사귀고 싶은 능력자 친구! 자신의 능력을 십분 활용할 줄 아는 재능형 인재! 당신 같은 사람이 진국입니다! 숨겨져 있던 당신의 매력에 사람들은 정신을 못 차릴 예정입니다!"
                    resultCeleb = "질퍽이상 연예인: 방시혁, 갱제(스트리머), 김태호(PD), ,최홍만(격투기선수), 고창석"
                    break;
                case 2:
                    resultTitle = "메타몽"
                    resultExplain = "특징이 없어보이지만 알고보면 팔방미인! 당신은 팔색조! 사교성이 좋으며 두루두루 잘 어울리는 호감형 스타일! 어떤 집단에도 잘 섞일 수 있는 스타일! 많은 사람들이 당신을 부러워합니다!"
                    resultCeleb = "메타몽상 연예인: 안재홍, 김종국, 조우진, 비, 이종석"
                    break;
                default:
                    resultTitle = "알수없음"
                    resultExplain = ""
                    resultCeleb = ""
            }

            let title = "<div class='" + poke_array[yourpoke][1] + "-poketmon-title'>" + resultTitle + "</div>"
            let explain = "<div class='poketmon-explain pt-2'>" + resultExplain + "</div>"
            let celeb = "<div class='" + poke_array[yourpoke][1] + "-poketmon-celeb pt-2 pb-2'>" + resultCeleb + "</div>"
            $('.result-message').html(title + explain + celeb);
            let barWidth;

            poke_array.sort((a, b) => {
                console.log(a[0])
                console.log(a[0][1])
                console.log(a[1])
                if (parseFloat(a[2]) > parseFloat(b[2])) {
                    return -1;
                } else
                    return 1;
            })

            for (let i = 0; i < 10; i++) {
                if (parseFloat(poke_array[i][2]).toFixed(2) > 0.1) {
                    barWidth = Math.round(parseFloat(poke_array[i][2]).toFixed(2) * 100) + "%";
                } else if (parseFloat(poke_array[i][2]).toFixed(2) >= 0.01) {
                    barWidth = "4%"
                } else {
                    barWidth = "2%"
                }
                let labelTitle;
                switch (poke_array[i][1]) {
                    case "pikachu":
                        labelTitle = "피카츄"
                        break;
                    case "charmander":
                        labelTitle = "파이리"
                        break;
                    case "squirtle":
                        labelTitle = "꼬부기"
                        break;
                    case 'diglett':
                        labelTitle = "디그다"
                        break;
                    case "snorlax":
                        labelTitle = "잠만보"
                        break;
                    case "growlithe":
                        labelTitle = "가디"
                        break;
                    case "jigglypuff":
                        labelTitle = "푸린"
                        break;
                    case "mew":
                        labelTitle = "뮤"
                        break;
                    case "grimer":
                        labelTitle = "질퍽이"
                        break;
                    case "ditto":
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
}