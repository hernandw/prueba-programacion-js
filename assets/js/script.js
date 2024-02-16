$(document).ready(function () {
  $("#form").on("submit", function (e) {
    let number = parseInt($("#idHero").val());

    e.preventDefault();
    $("#resultado").html("");
    $("#idHero").val("");
    $("#chartContainer").html("");

    validar(number);
  });

  //crear una funcion para validar el numero

  function validar(num) {
    let expresion = /^[0-9]+$/;
    if (expresion.test(num)) {
      $.ajax({
        datatype: "json",
        method: "GET",
        url: `https://superheroapi.com/api.php/2619421814940190/${num}`,
        success: function (respuesta) {
          if (respuesta.response === "success") {
            let heroe = `
<h3>Super Heroe Encontrado</h3>
    <div class="card">
      <div class="row">
        <div class="col-md-4">
          <img src="${respuesta.image.url}" class="card-img" alt="" />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">Nombre: ${respuesta.name} </h5>
            <p class="card-text">
              Conexiones:${respuesta.connections["group-affiliation"]}
            </p>
            <ul class="list-group">
              <li class="list-group-item">
                <em>Publicado por </em>: ${respuesta.biography.publisher}
              </li>
              <li class="list-group-item">
                <em>Ocupación: ${respuesta.work.occupation} </em>
              </li>
              <li class="list-group-item">
                <em
                  >Primera Aparición:
                  ${respuesta.biography["first-appearance"]}</em
                >
              </li>
              <li class="list-group-item">
                <em>Altura: ${respuesta.appearance.height.join(" - ")} </em>
              </li>
              <li class="list-group-item">
                <em>Peso: ${respuesta.appearance.weight.join(" - ")} </em>
              </li>
              <li class="list-group-item">
                <em>Aliases:  ${respuesta.biography.aliases}</em>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>


        `;
            $("#resultado").append(heroe);

            //Agregamos los valores de las estadisticas

            let datosXY = [];
            for (let key in respuesta.powerstats) {
              datosXY.push({
                label: key,
                y: parseInt(respuesta.powerstats[key]),
              });
            }

            console.log(datosXY);

            let option = {
              title: {
                text: `Estadísticas de Poder para ${respuesta.name}`,
              },
              data: [
                {
                  type: "pie",
                  startAngle: 45,
                  showInLegend: "true",
                  legendText: "{label}",
                  indexLabel: "{label} ({y})",
                  yValueFormatString: "#,##0.#" % "",
                  dataPoints: datosXY,
                },
              ],
            };

            $("#chartContainer").CanvasJSChart(option);
          } else {
            alert("No se encontro el heroe con ese id");
          }
        },

        error: function (error) {
          alert("no se encontro el heroe");
        },
      });
    } else {
      alert("Ingresa un valor numerico");
    }
  }
});
