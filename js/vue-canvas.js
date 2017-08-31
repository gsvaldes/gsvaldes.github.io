var vm = new Vue({
    el: '#app',
    data: {
        ctx: null,
        width: 0,
        height: 0,
        ballX: 25,
        ballY: 25,
        ballXSpeed: .5,
        ballYSpeed: 1.5,
        ballTimer: null

    },
    methods: {
        clearCanvas: function(){
            this.ctx.clearRect(0,0, this.width, this.height);
        },
        drawBall: function(){
            var radius = 15;
            this.ctx.beginPath();
            this.ctx.arc(this.ballX, this.ballY, radius, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = 'red';
            this.ctx.fill();
            this.ctx.lineWidth = 5;
            this.ctx.strokeStyle = '#003300';
            this.ctx.stroke();
           
        },
        moveBall: function(){
            this.stopBall();  // stop the previous ballTimer if already running
            vm = this;
            this.ballTimer = setInterval(function(){
                vm.ballX += vm.ballXSpeed;
                vm.ballY += vm.ballYSpeed;
                if ((vm.ballX > vm.width) || (vm.ballX < 0)) {
                  vm.ballXSpeed = vm.ballXSpeed * -1;
                }
                if ((vm.ballY  > vm.height) || (vm.ballY  < 0)) {
                  vm.ballYSpeed  = vm.ballYSpeed  * -1;
                }
                vm.clearCanvas();
                vm.drawBall();
            }, 10)
        },
        stopBall: function(){
            clearInterval( this.ballTimer );
        }
    },
    mounted: function(){
      var canvas = document.getElementById('canvas');
      this.ctx = canvas.getContext('2d');
      this.width = canvas.width;
      this.height = canvas.height;
    }
});  