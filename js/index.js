$(function () {
  $('.link').movebg({
    width: 125 /*滑块的大小*/,
    extra: 40 /*额外反弹的距离*/,
    speed: 300 /*滑块移动的速度*/,
    rebound_speed: 400 /*滑块反弹的速度*/,
  })
})

var clipboard = new Clipboard('.copy')
clipboard.on('success', function (e) {
  console.log(e)
})
clipboard.on('error', function (e) {
  console.log(e)
})
$('#mail').click(function () {
  $('#copyed').css('opacity', 1)
  setTimeout(function () {
    $('#copyed').css('opacity', 0)
  }, 2000)
})
$('#one_part,#two_part,#three_part,#four_part,#five_part').hover(
  function () {
    var that = $(this)
    var target = that.attr('id').replace('_part', '')
    $('.focus .txt').hide()
    $('#' + target).show()
  },
  function () {
    $('.focus .txt').hide()
    $('#default').show()
  }
)
$('#code').focus(function () {
  $('#code').attr('placeholder', '请输入提取码')
  $('#code_error').hide()
})
$('#down').click(function () {
  var that = $(this)
  var code = $('#code').val()
  if (code != 'eswink') {
    //提取码
    $('#code').attr('placeholder', '').val('')
    $('#code_error').show()
    return false
  }
  that.attr('href', 'https://www.esw.ink') //提取码成功跳转地址
  that.attr('target', '_blank')
})

try {
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
  } else {
    var canvas = document.querySelector('canvas'),
      ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    ctx.lineWidth = 0.3
    ctx.strokeStyle = new Color(150).style

    var mousePosition = {
      x: (30 * canvas.width) / 100,
      y: (30 * canvas.height) / 100,
    }

    var dots = {
      nb: 250,
      distance: 100,
      d_radius: 150,
      array: [],
    }

    function colorValue(min) {
      return Math.floor(Math.random() * 255 + min)
    }

    function createColorStyle(r, g, b) {
      return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)'
    }

    function mixComponents(comp1, weight1, comp2, weight2) {
      return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2)
    }

    function averageColorStyles(dot1, dot2) {
      var color1 = dot1.color,
        color2 = dot2.color

      var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
        g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
        b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius)
      return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b))
    }

    function Color(min) {
      min = min || 0
      this.r = colorValue(min)
      this.g = colorValue(min)
      this.b = colorValue(min)
      this.style = createColorStyle(this.r, this.g, this.b)
    }

    function Dot() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height

      this.vx = -0.5 + Math.random()
      this.vy = -0.5 + Math.random()

      this.radius = Math.random() * 2

      this.color = new Color()
    }

    Dot.prototype = {
      draw: function () {
        ctx.beginPath()
        ctx.fillStyle = this.color.style
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fill()
      },
    }

    function createDots() {
      for (i = 0; i < dots.nb; i++) {
        dots.array.push(new Dot())
      }
    }

    function moveDots() {
      for (i = 0; i < dots.nb; i++) {
        var dot = dots.array[i]

        if (dot.y < 0 || dot.y > canvas.height) {
          dot.vx = dot.vx
          dot.vy = -dot.vy
        } else if (dot.x < 0 || dot.x > canvas.width) {
          dot.vx = -dot.vx
          dot.vy = dot.vy
        }
        dot.x += dot.vx
        dot.y += dot.vy
      }
    }

    function connectDots() {
      for (i = 0; i < dots.nb; i++) {
        for (j = 0; j < dots.nb; j++) {
          i_dot = dots.array[i]
          j_dot = dots.array[j]

          if (
            i_dot.x - j_dot.x < dots.distance &&
            i_dot.y - j_dot.y < dots.distance &&
            i_dot.x - j_dot.x > -dots.distance &&
            i_dot.y - j_dot.y > -dots.distance
          ) {
            if (
              i_dot.x - mousePosition.x < dots.d_radius &&
              i_dot.y - mousePosition.y < dots.d_radius &&
              i_dot.x - mousePosition.x > -dots.d_radius &&
              i_dot.y - mousePosition.y > -dots.d_radius
            ) {
              ctx.beginPath()
              ctx.strokeStyle = averageColorStyles(i_dot, j_dot)
              ctx.moveTo(i_dot.x, i_dot.y)
              ctx.lineTo(j_dot.x, j_dot.y)
              ctx.stroke()
              ctx.closePath()
            }
          }
        }
      }
    }

    function drawDots() {
      for (i = 0; i < dots.nb; i++) {
        var dot = dots.array[i]
        dot.draw()
      }
    }

    function animateDots() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      moveDots()
      //connectDots();
      drawDots()

      requestAnimationFrame(animateDots)
    }

    createDots()
    requestAnimationFrame(animateDots)
  }
} catch (e) {}

function play_mp3() {
  naranja()['success']({
    title: '正在播放音乐',
    text: '《不要认为自己没有用》',
    timeout: '5000',
  })
}
function dont_play_mp3() {
  naranja()['success']({
    title: '暂停播放',
    text: '成功暂停音乐',
    timeout: '5000',
  })
}

function judge_mp3() {
  var audio = document.getElementById('music1')
  var s = document.getElementById('bf')
  if (audio !== null) {
    if (audio.paused) {
      audio.play('播放')
      play_mp3()
      s.innerText = 'Playing...'
    } else {
      audio.pause('暂停')
      dont_play_mp3()
      s.innerText = 'Paused'
    }
  }
}

$('bf').click(function () {
  judge_mp3()
})
