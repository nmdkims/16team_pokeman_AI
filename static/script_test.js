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

            $('.file-upload-input').hide();
            $('.drag-text').hide();
            $('#loading').show();


            $('.file-upload-image').attr('src', e.target.result);

            $('.file-upload-image').show();
            $('.file-upload-content').show();
            $('.image-title').html(input.files[0].name);
        };



        reader.readAsDataURL(input.files[0]);
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
    console.log("===========getElementById====================")
    let fileInput = document.getElementById("face-image")
    console.log(fileInput)
    console.log("==============================================================")

    console.log("======간단하게 src 값 가져오기 1=========================")
    console.log(fileInput.src)
    console.log("==============================================================")

    console.log("======간단하게 src 값 가져오기 2=========================")
    let fileInput1 = document.getElementById("face-image").src
    console.log(fileInput1)
    console.log("==============================================================")

    console.log("======outerHTML src 값 가져오기 2=========================")
    let image_outer = document.getElementById("face-image").outerHTML;
    console.log(image_outer)
    console.log("==============================================================")

    console.log("====== 쿼리 셀렉터 src 값 가져오기 2=========================")
    let queryInput = document.querySelector('#face-image')
    console.log(queryInput)
    console.log("==============================================================")

    console.log("====== getelement와 정규식으로 값 가져오기 =========================")
    let f = fileInput
    let g = /<IMG src=\"([^\"]*?)\">/gi
    let h = f.match(g)
    alert(h[0]);
    for (let i = 0; i < h.length; i++) {
        alert(h[i]);
        alert(RegExp.$1)
    }
    console.log("==============================================================")

    console.log("====== domparser =========================")
    const htmlTemplate = document.querySelector('#face-image')

    const domparser = new DOMParser();
    const doc = domparser.parseFromString(htmlTemplate, "text/html"); // [object HTMLDocument]

    const doctype = '<!DOCTYPE html>';
    const html = doc.documentElement.outerHTML;

    console.log(doctype + html);
       console.log("==============================================================")

    console.log("====== outerHTML과 정규식으로 값 가져오기 =========================")
    let a = image_outer
    let b = /<IMG src=\"([^\"]*?)\">/gi
    let s = a.match(b)
    alert(s[0]);
    for (let i = 0; i < s.length; i++) {
        alert(s[i]);
        alert(RegExp.$1)
    }
    console.log("==============================================================")


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
            console.log("======질문끝=========================")


            }

    });

}