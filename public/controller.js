function constructFlowers(f_name, f_temperature, f_humidity) {
    var root = document.getElementById('flowers');

    var div_container = document.createElement('div');
    div_container.className = 'flower';

    var p_name = document.createElement('p');
    p_name.textContent = f_name;

    var p_temp = document.createElement('p');
    p_temp.textContent = f_temperature;

    var p_humi = document.createElement('p');
    p_humi.textContent = f_humidity;

    div_container.append(p_name, p_temp, p_humi);

    root.append(div_container);

    
    var root_selectPicker_set = document.getElementById('optgroup_set');

    // <option name="table3" value="3">Table 3</option>

    var option_s = document.createElement('option');
    option_s.setAttribute('name', f_name);
    option_s.setAttribute('value', f_name + '_' + f_humidity);
    option_s.innerText = f_name;

    root_selectPicker_set.appendChild(option_s);


    var root_selectPicker_remove = document.getElementById('optgroup_remove');

    var option_r = document.createElement('option');
    option_r.setAttribute('name', f_name);
    option_r.setAttribute('value', f_name);
    option_r.innerText = f_name;

    root_selectPicker_remove.appendChild(option_r);
}

function setCurrentFlower(f_name, f_temperature, f_humidity){
    var root = document.getElementById('currentFlower');

    var p_name = document.createElement('p');
    p_name.textContent = f_name;

    var p_temp = document.createElement('p');
    p_temp.textContent = f_temperature;

    var p_humi = document.createElement('p');
    p_humi.textContent = f_humidity; 

    root.append(p_name, p_temp,p_humi);
}

function buttonSetFlower(ev) {

    var flower_div = ev.target.parentNode;
    var name = flower_div.querySelector("#name").textContent;

    alert('setting values for plant: ' + name + '\n in progress');
}

//OBTAING VALUES FORM DATABASE db/flowers.db
function getFlowers() {
    $.get('/flowers', function (data) {
        if (!data) {
            console.log('no data recieved');
        }
        for (var i = 0; i < data.length; i++) {
            constructFlowers(data[i].name, data[i].temperature, data[i].humidity);
        }
    });
}

function getCurrent() {
    $.get('/current', function (data) {
        if (!data) {
            console.log('no data recieved');
        }
        for (var i = 0; i < data.length; i++) {
            setCurrentFlower(data[i].name, data[i].temperature, data[i].humidity);
        }
    });
}


//load all flowers
getFlowers();
getCurrent();