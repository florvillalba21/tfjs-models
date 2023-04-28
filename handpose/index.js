async function main() {
    //modelo de deteccion de manos
    const model = await handpose.load();

    //identificadores de los elementos html
    const video = document.querySelector("#video");
    const canvas = document.querySelector("#canvas");

    //se especifica que se dibujará en 2d
    const ctx = canvas.getContext("2d");

    //permiso para utilizar la camara
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });

   //se especifica que lo mostrado en la camará será lo q se vizualizará
    video.srcObject = stream;

    //se espera a que la camara se cargue
    await video.play();

    //funcion en bucle para vizualizar en tiempo real
    setInterval(async () => {

    
      const predictions = await model.estimateHands(video);

      if (predictions.length > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < predictions.length; i++) {

          const landmarks = predictions[i].landmarks;

    
          for (let j = 0; j < landmarks.length; j++) {
            const [x, y, z] = landmarks[j];
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
          }
        }
      }
    }, 1000 / 60);
  }

  main()