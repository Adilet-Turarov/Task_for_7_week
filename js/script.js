$(document).ready(function(){
    // TASK #8

    // $('.btn').on('click', function(){
    //     let color1 = Math.floor(Math.random()*256);
    //     let color2 = Math.floor(Math.random()*256);
    //     let color3 = Math.floor(Math.random()*256);
    //     let colors = `rgb(${color1}, ${color2}, ${color3})`;
    //     $(document.body).css('background', colors);
    //     console.log('Hello')
    // })
    

    // TASK #9
    
    // let btn = $('#btn');
    // let list = $('.list');
    // btn.on('click', function(e){
    //     e.preventDefault();
    //     let firstName = $('#firstName').val();
    //     let lastName = $('#lastName').val();
    //     if(firstName  && lastName){
    //         list.text = "имя: " + firstName
    //         + "\n фамилия: " + lastName
    //     }else{
    //         alert("Заполните поле!")
    //     }
    // })


    // TASK #10
    // let leftRight = 0;
    // let square = $('#square')
    // $(document).on('keydown', function(e){
    //     if(e.originalEvent.code == 'ArrowLeft'){
    //         if(leftRight <= 0) leftRight +=100;
    //         leftRight -= 100;
    //         square.css('left', `${leftRight}px`)
    //     }
    //     if(e.originalEvent.code == 'ArrowRight'){
    //         leftRight += 100;
    //         square.css('left', `${leftRight}px`)
    //     }
    // })

    // TASK #11
    // $(window).on('mousemove', function(e){
    //     console.log('X: '+e.clientX, 'Y: '+e.clientY)
    // })


    // TASK #13
    // let circle = $('#square').on('mousedown', function(e){
    //     moveAt(e.offsetX, e.offsetY);
    //     function moveAt (offsetX, offsetY){
    //         circle.css('left', offsetX);
    //         circle.css('top', offsetY);
    //     }
    //     function mouseMove(e){
    //         moveAt(e.offsetX, e.offsetY)
    //     }
    //     $(document).on('mousemove', mouseMove)
    //     circle.on('mouseup', function(){
    //         $(document).off('mousemove', mouseMove);
    //         circle.on('mouseup', null)
    //     })
    //     circle.on('dragstart', function(){
    //         return false
    //     })
    // })

    // TASK #14
    jQuery(function(){
        $ = $ || jQuery;
        var a = $(".game .item");
        var fields; //массив исходных позиций
        var firstStep; //случайный первых ход компьютера
       
        $("#game-krestiki-noliki div .next,#game-krestiki-noliki div .close").on("click",function (e){
         a.off("click",clickGamer);
         e.preventDefault();
         $(this).parents(".window").hide();
         init();
        });
       
       function init(){
        fields = [0,0,0,0,0,0,0,0,0];
        firstStep = rand(0,fields.length-1);
        //инициализация массива исходных ходов
        fields[firstStep] = 1;
        a.on("click",clickGamer);
        //расставляем начальную позицию
        a.each(function(i,e){
        $(e).html( symbol(fields[i]) );
        });
       }
       
       function clickGamer(e){
        var self = this, num;
        e.preventDefault();
        //отключаем обработчик нажатия
        $(this).off("click",clickGamer);
        //выводим символ игрока - "o"
        $(this).html(symbol(2));
        //узнаем по какой ссылке нажали: номер ссылки помещаем в num
        a.each(function(i,e){
         if( self == e ) {
          num = i;
          fields[i] = 2;
         }
        });
       //выполняем ход компьютера
       clickComp(fields);
       if ( checkWin(fields,2) ) {
         $("#game-krestiki-noliki .win").show();
       } else
       if ( checkWin(fields,1) ) {
         $("#game-krestiki-noliki .lost").show();
       } else if ( checkFullStep(fields) == 0 )
         init();
       }
       
       function clickComp(fields){
        var steps = getStep(fields);
        var step = steps[rand(0, steps.length-1)];
        console.log("Шаг компа: "+step);
        fields[step] = 1;
        //узнаем по какой ссылке нажали: номер ссылки помещаем в num
        a.each(function(i,e){
        if( i == step ) {
         $(e).off("click",clickGamer);
         $(e).html(symbol(1));
        }
       });
       }
       
       function checkWin(fields, sym){
        var flag = true, tmp = [], sum = 0;
        //приобразуем линейный массив в двумерный для упрощения пробега
        for(var i = 0; i < 3; i++){
         tmp[i] = [];
         for(var j = 0; j < 3; j++){
          tmp[i][j] = fields[i*3+j];
         }
        }
        //пробегаем по горизонтали
        for(var i = 0; i < 3; i++){
         flag = true;
          for(var j = 0; j < 3; j++){
           if( tmp[i][j] != sym )
            flag = false;
          }
         if( flag ) return true;
       }
       
       //пробегаем по вертикали
       for(var i = 0; i < 3; i++){
        flag = true;
        for(var j = 0; j < 3; j++){
         if( tmp[j][i] != sym )
          flag = false;
         }
        if( flag ) return true;
       }
       
       //пробегаем по диагоналям
       if(
        tmp[0][0] == sym &&
        tmp[1][1] == sym &&
        tmp[2][2] == sym ||
        tmp[0][2] == sym &&
        tmp[1][1] == sym &&
        tmp[2][0] == sym
       ) return true;
       }
       
       function checkFullStep(arr){
        return arr.join("").split(0).length - 1;
       }
       
       init();
       
    });
       
       //возвращает случайное целое значение из диапазона
       function rand(n,m){
        return Math.round(Math.random()*(m-n)+n);
       }
       
       //функция выбирающая символы для показа
       function symbol(input){
            switch( input ){
             case 0: return "";
             case 1: return "×";
             case 2: return "o";
            }
       }
       
       //возвращает массив доступных для ходов полей
       function getStep(arr){
        var tmp = [],p;
        for( p in arr ){
         if ( !arr[p] )
         tmp.push(p);
        }
       return tmp;
       }
       
       //клонирование массива
       function arrayClone(arr){
        var tmp = [];
        for(var p in arr)
         tmp[p] = arr[p];
         return tmp;
        }
    
})