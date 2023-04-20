class Dog {
    constructor(name, minAge, maxAge) {
        this.name = name;
        this.maxAge = maxAge;
        this.minAge = minAge;
        this.img = this.addImg();
    }

    addImg(img) {
        let headers = new Headers();
        headers.append('x-api-key', 'live_aDEdgazZfPdmiUPANTOh7dcGzbjcFcfRoCYLgayymdpT6I2w6mnMSmaX6Dxduuz4');
        headers.append('Content-Type', 'application/json');
        fetch('https://api.thedogapi.com/v1/images/search?format=json&limit=1', { headers: headers })
            .then(response => response.json())
            .then(data => {
                this.img = data[0]['url'];
            })
    }
    getHTML() {
        return `<tr>
                <th scope="row"></th>
                <td>${this.name}</td>
                <td>${this.maxAge}</td>
                <td>${this.minAge}</td>
                <td>${this.img}</td>
            </tr>`;
    }
}

let dogs = [];
function addDog() {
    fetch('https://dogapi.dog/api/v2/breeds')
        .then(response => response.json())
        .then(data => {
            let random = Math.floor(Math.random() * 10);
            data['data'][random]

            let dog = new Dog(data['data'][random]['attributes']['name'], data['data'][random]['attributes']['life']['min'], data['data'][random]['attributes']['life']['max']);
            dogs.push(dog);
        })
}

function updateHTML() {
    let tbody = document.getElementById('obsah');
    tbody.innerHTML = '';
    let html = '';
    for (let i = 0; i < dogs.length; i++) {
        html += dogs[i].getHTML();
    }
    tbody.innerHTML = html;
}

function loadit() {
    let range = document.getElementById('range');
    for (let i = 0; i < range.value; i++) {
        addDog();
    }
    playSound();
}
loadit();

setInterval(() => {
    updateHTML();
}, 1000);


function playSound() {
    let audio = new Audio('assets/sound.mp3');
    audio.play();
}

