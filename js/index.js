$(function () {
        let colorArr = ['a', 's', 'd', 'h'],
            poke = [],
            flag = {};
        let index = 0;
        let box = $('.box');
        let lefts = $('.left')[0],
            rights = $('.right')[0],
            btn = $('.center')[0];
        /*  flag 'a_1' true*/
//        for(let i = 0;i < 52;i++){
//            let obj = {};
//            let color = colorArr[Math.floor(Math.random() * 4)];
//            let num = Math.floor(Math.random() * 13 + 1);
//            do{
//                color = colorArr[Math.floor(Math.random() * 4)];
//                num = Math.floor(Math.random() * 13 + 1);
//            } while(flag[color + '_' + num]);
//            poke.push({color,num});
//            flag[color + '_' + num] = true;
//        }
        while (poke.length < 52) {
            let obj = {};
            let color = colorArr[Math.floor(Math.random() * 4)],
                num = Math.floor(Math.random() * 13 + 1);
            if (!flag[color + "_" + num]) {
                poke.push({color, num});
                flag[color + "_" + num] = true;
            }
        }
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j <= i; j++) {
                let divs = $('<div>');
                let left = 375 - 50 * i + 100 * j,
                    top = 60 * i;
                divs
                    .addClass('poke')
                    .attr('id', `${i}_${j}`)//添加id,绑定对应的行与列,中间加_方便以后用split区分行列
                    .css({backgroundImage: `url(img/${poke[index]['color']}${poke[index]['num']}.JPG)`})
                    .data('num', poke[index].num)
                    //                        .html(poke[index].color + '---' + poke[index].num)
                    .appendTo('.box')
                    .delay(index * 50)
                    .animate({left, top, opacity: 1});
                index++;
            }
        }
        ///////////////////////////////////////多余的扑克牌//////////////////////////////////////////////
        for (; index < poke.length; index++) {
            let divs = $('<div>');
            divs
                .addClass('poke left')
                .css({'backgroundImage': `url(img/${poke[index]['color']}${poke[index]['num']}.JPG)`})
                .attr('id', `-2_+-2`)
                .data('num', poke[index].num)
                //              .html(poke[index].color + '---' + poke[index].num)
                .appendTo('.box').delay(index * 50)
                .animate({left: 0, top: 500, opacity: 1});
        }
        /*  游戏(选中状态)
        * box添加点击事件
        * 获取id,$(this).attr('id').split('_');
        * 判断是否可以选中/抬起，每个扑克牌添加坐标，若存在xy坐标可以选中,否则return
        * (`#${**[0]*1+1}_${**[1]*1}}`).length || (`#${**[0]*1+1}_${**[1]*1+1}}`).length  (注意，添加的是字符串，要进行转化)
        * 判断是否有active类   is/hasClass
        * 如果有top+=20,没有-=20
        * toggleClass
        *       （0,0）
        *     (1,0)(1,1)
        *        (x,y)
        *    (x+1,y)(x+1,y+1)
        * */
        let first = null;
        box.on('click', '.poke', function () {
            let card = $(this).attr('id').split('_');
            if ($(`#${card[0] * 1 + 1}_${card[1] * 1}`).length || $(`#${card[0] * 1 + 1}_${card[1] * 1 + 1}`).length) {
                return;
            }
            if ($(this).hasClass('active')) {
                $(this).animate({top: '+=20'});
            } else {
                $(this).animate({top: '-=20'});
            }
            $(this).toggleClass('active');


            if (!first) {
                first = $(this);
            } else {
                //出队之后要手动入队
                if (first.data('num') + $(this).data('num') == 13 || $(this).data('num') == 13) {
                    $('.active').animate({top: 0, left: 730}, function () {
                        $(this).remove();
                    })
                } else {
                    $('.active').animate({top: '+=20'}).queue(function () {
                        $(this).removeClass('active');
                        $(this).dequeue();
                    })
                }
                first = null;
            }
        });

        ///////////////////////////////////////////////////////////////////////////////////
        let leftBtn = $('.leftBtn'),
            rightBtn = $('.rightBtn');
        let zIndex = 0;
        rightBtn.on('click', function () {
            zIndex++;
            $('.left').last().css({zIndex})
            .removeClass('left').addClass('right')
                .animate({left: '+=700'}).queue(function () {
                $(this).dequeue();
            });
        })
        leftBtn.on('click',function(){
            $('.right').each(function(index,obj){
                $(obj).removeClass('right').addClass('left').delay(index*50).animate({left:'-=700',zIndex})
            })
        })
    })