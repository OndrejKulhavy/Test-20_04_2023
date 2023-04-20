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
                <td><img src="${this.img}" alt="dog"></td>
            </tr>`;
    }
}

let dogs = [];
function addDog() {
    fetch('https://dogapi.dog/api/v2/breeds')
        .then(response => response.json())
        .then(data => {
            let random = Math.floor(Math.random(10));
            data['data'][random]

            let dog = new Dog(data['data'][random]['attributes']['name'], data['data'][random]['attributes']['life']['min'], data['data'][random]['attributes']['life']['max']);
            dogs.push(dog);
        })
}


function playSound() {
    let audio = new Audio('sound.mp3');
    audio.play();
}

