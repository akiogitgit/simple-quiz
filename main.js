// 問題
const quiz = [
    {
        question: "お正月に飾るおもちの名前は？",
        answers: ["草餅", "桜餅", "鏡餅"],
        correct: "鏡餅",
        image: "img/img-1.jpg"
    }, {
        question: "日本で２番目に大きい県は？",
        answers: ["岐阜県", "長野県", "北海道"],
        correct: "長野県",
        image: "img/img-2.jpg"
    }, {
        question: "油揚げに使われている材料の名前は？",
        answers: ["お米", "小麦", "大豆"],
        correct: "大豆",
        image: "img/img-3.jpg"
    }, {
        question: "日本の国鳥は？",
        answers: ["キジ", "カワセミ", "トキ"],
        correct: "キジ",
        image: "img/img-4.jpg"
    }, {
        question: "日本で縁起が悪い数字は？",
        answers: ["2", "4", "8"],
        correct: "4",
        image: "img/img-5.jpg"
    }, {
        question: "日本人が打ち上げ花火を見た時に叫ぶ「たまやー」は何？",
        answers: ["花火屋の名前", "花火の産地の名前", "花火で有名な人の愛称"],
        correct: "花火屋の名前",
        image: "img/img-6.jpg"
    }, {
        question: "次のうち腐らないものは？",
        answers: ["コンソメスープ", "ネギ", "はちみつ"],
        correct: "はちみつ",
        image: "img/img-7.jpg"
    }, {
        question: "カルボナーラはどういう意味？",
        answers: ["クリーミーなパスタ", "ベーコンのパスタ", "炭火焼のパスタ"],
        correct: "炭火焼のパスタ",
        image: "img/img-8.jpg"
    }, {
        question: "マスクメロンの「マスク」の意味は？",
        answers: ["香り", "偽物", "仮面"],
        correct: "香り",
        image: "img/img-9.jpg"
    }, {
        question: "スリッパの発祥地は？",
        answers: ["アメリカ", "日本", "フランス"],
        correct: "日本",
        image: "img/img-10.jpg"
    }
];


// 簡略化
const $button = document.getElementsByTagName("button");
const $img = document.getElementById("img");
const $question = document.getElementById("question");
const $questionCount = document.getElementById("question-count");
const $popCorrect = document.getElementById("pop-correct");
const $popMistake = document.getElementById("pop-mistake");
const $score = document.getElementById("your-score");
const $allScore = document.getElementById("sum-score");

const $s_question = document.getElementById("s-question");
const $s_result = document.getElementById("s-result");
const $retry = document.getElementById("retry");

// 初期定義
const quizLen = quiz.length;
let quizIndex = 0;
let score = 0;

// sound
const question_audio = new Audio("sounds/question.mp3");
const correct_audio = new Audio("sounds/correct.mp3");
const correct2_audio = new Audio("sounds/correct2.mp3");
const wrong_audio = new Audio("sounds/wrong.mp3");
const wrong2_audio = new Audio("sounds/wrong2.mp3");

// 問題と選択肢を定義
const setQuiz = () => {
    question_audio.play();
    $questionCount.textContent = quizIndex + 1;
    $question.textContent = quiz[quizIndex].question;

    for (i = 0; i < 3; i++) {
        $button[i].textContent = quiz[quizIndex].answers[i];
        $img.src = quiz[quizIndex].image;
    }
}

setQuiz();

// 選択した時の処理
const clickHandler = (e) => {
    if (quiz[quizIndex].correct === e.target.textContent) {
        $popCorrect.classList.remove("answer");
        correct_audio.play();
        window.alert("Enterを押してください");
        $popCorrect.classList.add("answer");
        score++;
    } else {
        $popMistake.classList.remove("answer");
        wrong_audio.play();
        window.alert("Enterを押してください");
        $popMistake.classList.add("answer");
    }

    quizIndex++;

    if (quizIndex < quizLen) {
        setQuiz();

    } else { // 終了
        // alert("終わり score: " + score + "/" + quizLen);
        $s_question.classList.add("hidden");
        $s_result.classList.remove("hidden");
        $retry.classList.remove("scale-[0]");
        $retry.classList.remove("hidden");

        // $s_result.textContent = "score:" + score + " / " + quizLen;
        $score.textContent = score;
        $allScore.textContent = quizLen;

        if (score * 1.5 > quizLen) {
            correct2_audio.play();
        } else if (score * 3 < quizLen) {
            wrong2_audio.play();
        }
    }
}

for (i = 0; i < 3; i++) {
    $button[i].addEventListener("click", (e) => {
        clickHandler(e);
    });
}

// リトライを押した時の処理
$retry.addEventListener("click", () => {
    $s_question.classList.remove("hidden");
    $s_result.classList.add("hidden");
    $retry.classList.add("scale-[0]");
    $retry.classList.add("hidden");
    quizIndex = 0;
    score = 0;
    setQuiz();
})

