let searchParams = new URLSearchParams(window.location.search)
$(document).ready(() => {
    if (searchParams.get('register') === 'true') {
        $('#registration').css('display', 'block');
    } else {
        $('#registration').css('display', 'none');

    }
    $('.r_navbar img').click(() => {
        $('#registration').css('display', 'none');
    });

    $('.mobile-btn').click(() => {
        $('.mobile-navbar').toggle();
    })
    $('.quizBtn').click(() => {
        $('.questions').css('display', 'block');
        $("html, body").animate({scrollTop: 0}, "slow");

    });

});

let questions = [
    {
        'heading': "What’s your health goal(s)?",
        'subheading': 'You can select multiple options',
        'answers': ['Lose Weight', 'Stay Healthy', 'Gain Muscle',
            'Manage Medical Condition', 'Improve Sports performance'],
        'button': 'NEXT',
        'choice': 'multiple', 'attempt': 'no'
    },
    {
        'heading': "What do you struggle with?",
        'subheading': 'Select all that apply',
        'answers': ['Junk Food', 'Emotional Eating (e.g. stress, depression)', 'Sugary Foods',
            'I enjoy food too much', 'It’s hard to stick to healthy habits', 'Social pressure from friends to drink or eat'],
        'button': 'NEXT', 'choice': 'multiple', 'attempt': 'yes'
    },
    {
        'heading': "What stops you from adopting a healthy eating lifestyle ?",
        'subheading': 'Select all that apply',
        'answers': ['Feels like lot of planning',
            'Lack of time',
            'Eating healthy is too expensive',
            'Cooks not skilled enough to prepare healthy meals',
            'I don’t know enough about nutrition',
            'Difficult to follow a diet plan when living with others'],
        'button': 'NEXT', 'choice': 'multiple', 'attempt': 'no'
    },
    {
        'heading': "Who does your grocery shopping?",
        'subheading': '',
        'answers': ['I do cause I have to',
            'I do and I enjoy it',
            'Flatmate',
            'Others'],
        'button': 'NEXT', 'choice': 'single', 'attempt': 'no'
    },
    {
        'heading': " Where does your grocery come from?",
        'subheading': 'Select all that apply',
        'answers': ['From mandi / local stores',
            'Offline from retail chains e.g. Reliance Fresh, etc.',
            'E-retailers e.g. Bigbasket, grofers, etc',
            'Hyperlocal delivery e.g. Dunzo, Swiggy Instamart, etc.'],
        'button': 'NEXT', 'choice': 'multiple', 'attempt': 'no'
    },
    {
        'heading': "Who cooks your meals?",
        'subheading': '',
        'answers': ['Cook / Maid',
            'Family Member / Flatmate',
            'I cook myself',
            'Order Online / Tiffin Service',
            'Others'], 'choice': 'single',
        'button': 'NEXT', 'attempt': 'no'
    },
    {
        'heading': "How would you prefer to get your healthy meals?",
        'subheading': '',
        'answers': ['Freshly cooked by a skilled cook at your home',
            'Daily delivery from a healthy kitchen',
            ' Manage the way it is right now'],
        'button': 'NEXT', 'choice': 'single', 'attempt': 'no'
    },
    {
        'heading': "What’s your Gender",
        'subheading': '',
        'answers': ['Male',
            'Female',
            'Non - Binary'],
        'button': 'NEXT', 'choice': 'single', 'attempt': 'no'
    },
]

let answers = []

let progressBarState = $('.questionContainer').width() / 10

function progressBar(val) {
    if (val === '+') {
        progressBarState += $('.questionContainer').width() / 10
    } else {
        progressBarState -= $('.questionContainer').width() / 10
    }
    $(document).ready(() => {
        $('.q_progressBar').css('width', `${progressBarState}px`)
    })
}

function addQuestion(index) {
    $('.questionContainer').html
    (`
     <div class="q_navBar">
            <img src="public/assets/images/leftArrow.png" alt="" class="q_prev">
            <div class="q_navText">QUESTION <span>${index + 1}</span> OF 10</div>
            <div></div>
        </div>
        <div class="q_heading">
            ${questions[index]['heading']}
        </div>
        <div class="q_sub_heading">${questions[index]['subheading']}</div>
        <div class="q_progressBar"></div>
        <div class="q_answers">
            <ul>
            ${questions[index]['answers'].map(
        (val, index) => {
            return `<li class="q_tab">${val}</li>`
        }
    ).join('')}
            </ul>
        </div>
        <div class="q_next" id="q_next">${questions[index]['button']}</div>
    `)
}

let questionNumber = 1
addQuestion(0)
singleAns = []

$(document).ready(function () {
    $('.q_progressBar').css('width', `${progressBarState}px`)
    $(document).on('click', '.q_tab', function () {
        if (questions[questionNumber - 1].choice === 'single') {
            $('.q_tab').css('background', 'transparent');
            $(this).css('background', 'rgba(52, 160, 164, 0.15)')
            singleAns.splice(0, singleAns.length)
        } else {
            $(this).css('background', 'rgba(52, 160, 164, 0.15)')
        }
        let index = singleAns.indexOf($(this).text())
        if (index > -1) {
            $(this).css('background', 'transparent')
            singleAns.splice(index, 1);
        } else {
            singleAns.push($(this).text())
        }
        if (singleAns.length === 0) {
            $('.q_next').css({'background': 'rgba(190, 200, 200, 0.4)', 'color': 'black'})
        } else {
            $('.q_next').css({'background': '#34A0A4', 'color': 'white'})
        }
    })

    $(document).on('click', '.q_next', function () {
        if (questions[questionNumber - 1].attempt === 'yes') {
            if (questionNumber < questions.length) {
                singleAns.splice(0, singleAns.length)
                progressBar('+')
                addQuestion(questionNumber)
                questionNumber += 1
            }

        } else {
            if (singleAns.length === 0) {
                alert('Please select a option')
            } else {
                if (questionNumber < questions.length) {
                    singleAns.splice(0, singleAns.length)
                    progressBar('+')
                    addQuestion(questionNumber)
                    questionNumber += 1
                }
                if (questions[questionNumber].attempt === 'yes') {

                }
            }

        }

    })

    $(document).on('click', '.q_prev', function () {
        if (questionNumber <= questions.length && questionNumber >= 0) {
            if (questionNumber > 0) {
                progressBar('-')
                questionNumber -= 1
            }
            if (questionNumber === 0) {
                $('.questions').css('display', 'none')
            } else {
                addQuestion(questionNumber - 1)
            }
        }
    })
})
