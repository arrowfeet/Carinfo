console.log("script running ...");

const getCars = (model) => {
  const myHeaders = new Headers();
  myHeaders.append("X-Api-Key", "bdhGNSI4xv8Hp6muWcw7iA==8ukXfqGI8qnPAb7V");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `https://api.api-ninjas.com/v1/cars?limit=30&model=${model}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      let template = "";

      for (let i = 0; i < result.length; i++) {
        const car = result[i];
        template += `
          <div class="card" >
            <div class="card-body">
              <h5>${car.model}</h5>
              <h5>${car.make}</h5>
              <h5>${car.class}</h5>
            </div>
          </div>
        `
      }

      document.querySelector("#car-container").innerHTML = template;
    })
    .catch((error) => console.log("error", error));
};

document.querySelector("#searchform").addEventListener("submit", (e) => {
  console.log("form sbumitted");
  e.preventDefault();
  const model = document.querySelector("#model").value;
  getCars(model);
});


const getVinDecoded = (vin) => {

  fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinextended/${vin}?format=json`)
    .then(response => response.json())
    .then(data => {
      console.log(data.Results);
  
      const vinDecoded = data.Results;
  
      const car = {};
  
      vinDecoded.forEach(code => {
        car[code.Variable] = code.Value
      });
  
      console.log(car);

      let template = `
          <div class="card" >
            <div class="card-body">
              <h5>Make: ${car['NCSA Make']}</h5>
              <h5>Model: ${car['NCSA Model']}</h5>
              <h5>Year: ${car['Model Year']}</h5>
              <h5>Vehicle Type: ${car['Vehicle Type']}</h5>
              <h5>Engine Brake HP: ${car['Engine Brake (hp) From']}</h5>
              <h5>Drive Type: ${car['Drive Type']}</h5>
              <h5>Displacement(L): ${car['Displacement (L)']}</h5>
              <h5>Top Speed (MPH): ${car['Top Speed (MPH)']}</h5>
              <h5>Trim: ${car['Trim']}</h5>
              <h5>Transmission Style: ${car['Transmission Style']}</h5>
            </div>
          </div>
      `;
  
       document.querySelector("#car-vin-container").innerHTML = template;
    })
    .catch(error => console.log('error', error));
}



document.querySelector("#vindecoder").addEventListener("submit", (e) => {
  console.log("form sbumitted");
  e.preventDefault();
  const vin = document.querySelector("#vinnum").value;
  getVinDecoded(vin);
});