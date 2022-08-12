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
              <h5 >${car.model}</h5>
              <h5 >${car.make}</h5>
              <h5 >${car.class}</h5>
              
              <p >Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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
