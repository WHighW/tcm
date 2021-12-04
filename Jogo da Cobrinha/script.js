function jogar(){

        document.getElementById('iniciar').style.display = "none";
        document.getElementById('voltar').style.display = "none";    
        var stage = document.getElementById('stage');
        var ctx = stage.getContext("2d");
        document.addEventListener("keydown", keyPush);
        setInterval(game, 100); 

        const vel = 1;//quantas casas a cobra vai andar

        var vx = vy = 0; //começa com velocidade zero
        var px = 10;
        var py = 15;
        var tp = 30;
        var qp = 20;
        var ax=ay=15;

        var trail = [];//rastro
        tail = 5;

        function game(){//posição da cabeça da cobra
            px += vx;
            py += vy;

            if (px <0) {
                px = qp-1;
            }
            if (px > qp-1) {
                px = 0;
            }
            if (py < 0){
                py = qp-1;
            }
            if (py > qp-1){
                py = 0;
            }

            ctx.fillStyle = "black";
            ctx.fillRect(0,0, stage.width, stage.height);

            ctx.fillStyle = "red";
            ctx.fillRect(ax*tp, ay*tp, tp,tp);

            ctx.fillStyle = "gray";
            for (var i = 0; i < trail.length; i++) {
                ctx.fillRect(trail[i].x*tp, trail[i].y*tp, tp-1, tp-1);
                 if (trail[i].x == px && trail[i].y == py)
                {
                vx = vy=0;
                tail = 1;
            }
        }
        trail.push({ x:px, y:py })
        while (trail.length > tail) {
            trail.shift();//tira o primeiro elemento do array
        }
        if (ax==px && ay==py){
            tail++;
            ax = Math.floor(Math.random()*qp);
            ay = Math.floor(Math.random()*qp);
        }
    }
    function keyPush(event){
        switch (event.keyCode) {
            case 37:
                vx = -vel;
                vy = 0;
                break;
            case 38:
                vx = 0;
                vy = -vel;
                break;
            case 39: 
                vx = vel;
                vy = 0;
                break;
            case 40: 
                 vx = 0;
                vy = vel;
                break;
            default:
                break;
        }
    }
}