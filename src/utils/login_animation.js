let m3D = (function () {
  /* ---- private vars ---- */
  let diapo = []
  // let imb
  let scr
  let bar
  let selected
  let imagesPath = '/static/img/'
  let camera = {
    x: 0,
    y: 0,
    z: -650,
    s: 0,
    fov: 500
  }
  let nw = 0
  let nh = 0
  let imgIndex = 0
  let _an = 0
  let _an2 = 0
  /* ==== camera tween methods ==== */
  camera.setTarget = function (c0, t1, p) {
    if (Math.abs(t1 - c0) > 0.1) {
      camera.s = 1
      camera.p = 0
      camera.d = t1 - c0
      if (p) {
        camera.d *= 2
        camera.p = 9
      }
    }
  }
  camera.tween = function (v) {
    if (camera.s !== 0) {
      camera.p += camera.s
      camera[v] += camera.d * camera.p * 0.01
      if (camera.p === 10) camera.s = -1
      else if (camera.p === 0) camera.s = 0
    }
    return camera.s
  }
  /* ==== diapo constructor ==== */
  let Diapo = function (n, img, x, y, z) {
    if (img) {
      // this.url = img.url;
      this.title = img.title
      this.color = img.color
      this.isLoaded = false
      if (document.createElement('canvas').getContext) {
        /* ---- using canvas in place of images (performance trick) ---- */
        this.srcImg = new Image()
        this.srcImg.src = imagesPath + img.src
        this.img = document.createElement('canvas')
        this.canvas = true
        scr.appendChild(this.img)
      } else {
        /* ---- normal image ---- */
        this.img = document.createElement('img')
        this.img.src = imagesPath + img.src
        scr.appendChild(this.img)
      }
      /* ---- on click event ---- */
      this.img.onclick = function () {
        if (camera.s) return
        if (this.diapo.isLoaded) {
          if (this.diapo.urlActive) {
            /* ---- jump hyperlink ---- */
            // top.location.href = this.diapo.url
          } else {
            /* ---- target positions ---- */
            camera.tz = this.diapo.z - camera.fov
            camera.tx = this.diapo.x
            camera.ty = this.diapo.y
            /* ---- disable previously selected img ---- */
            if (selected) {
              selected.but.className = 'button viewed'
              selected.img.className = ''
              selected.img.style.cursor = 'pointer'
              selected.urlActive = false
            }
            /* ---- select current img ---- */
            this.diapo.but.className = 'button selected'
            interpolation(false)
            selected = this.diapo
          }
        }
      }

      /* ---- command bar buttons ---- */
      this.but = document.createElement('div')
      this.but.className = 'button'
      bar.appendChild(this.but)
      this.but.diapo = this
      this.but.style.left = Math.round((this.but.offsetWidth * 1.2) * (n % 4)) + 'px'
      this.but.style.top = Math.round((this.but.offsetHeight * 1.2) * Math.floor(n / 4)) + 'px'
      this.but.onclick = this.img.onclick
      // imb = this.img
      this.img.diapo = this
      this.zi = 25000
      this.img.click()
    } else {
      /* ---- transparent div ---- */
      this.img = document.createElement('div')
      this.isLoaded = true
      this.img.className = 'fog'
      scr.appendChild(this.img)
      this.w = 300
      this.h = 300
      this.zi = 15000
    }
    /* ---- object variables ---- */
    this.x = x
    this.y = y
    this.z = z
    this.css = this.img.style
  }
  /* ==== main 3D animation ==== */
  Diapo.prototype.anim = function () {
    if (this.isLoaded) {
      /* ---- 3D to 2D projection ---- */
      let x = this.x - camera.x
      let y = this.y - camera.y
      let z = this.z - camera.z
      if (z < 20) z += 5000
      let p = camera.fov / z
      let w = this.w * p
      let h = this.h * p
      /* ---- HTML rendering ---- */
      this.css.left = Math.round(nw + x * p - w * 0.5) + 'px'
      this.css.top = Math.round(nh + y * p - h * 0.5) + 'px'
      this.css.width = Math.round(w) + 'px'
      this.css.height = Math.round(h) + 'px'
      this.css.zIndex = this.zi - Math.round(z)
    } else {
      /* ---- image is loaded? ---- */
      this.isLoaded = this.loading()
    }
  }
  /* ==== onload initialization ==== */
  Diapo.prototype.loading = function () {
    if ((this.canvas && this.srcImg.complete) || this.img.complete) {
      if (this.canvas) {
        /* ---- canvas version ---- */
        this.w = this.srcImg.width
        this.h = this.srcImg.height
        this.img.width = this.w
        this.img.height = this.h
        let context = this.img.getContext('2d')
        context.drawImage(this.srcImg, 0, 0, this.w, this.h)
      } else {
        /* ---- plain image version ---- */
        this.w = this.img.width
        this.h = this.img.height
      }
      /* ---- button loaded ---- */
      this.but.className += ' loaded'
      return true
    }
    return false
  }
  /* ==== screen dimensions ==== */
  let resize = function () {
    nw = scr.offsetWidth * 0.5
    nh = scr.offsetHeight * 0.5
  }
  /* ==== disable interpolation during animation ==== */
  let interpolation = function (bicubic) {
    let i = 0
    let o = diapo[i++]
    while (o) {
      if (o.but) {
        o.css.msInterpolationMode = bicubic ? 'bicubic' : 'nearest-neighbor' // makes IE8 happy
        o.css.imageRendering = bicubic ? 'optimizeQuality' : 'optimizeSpeed' // does not really work...
      }
      o = diapo[i++]
    }
  }
  /* ==== init script ==== */
  let init = function (data) {
    if (_an || _an2) {
      clearInterval(_an)
      clearTimeout(_an2)
    }
    /* ---- containers ---- */
    scr = document.getElementById('screen')
    bar = document.getElementById('bar')
    resize()
    /* ---- loading images ---- */
    let i = 0
    let o = data[i++]
    let n = data.length
    while (o) {
      /* ---- images ---- */
      let x = 1000 * ((i % 4) - 1.5)
      let y = Math.round(Math.random() * 4000) - 2000
      let z = i * (5000 / n)
      diapo.push(new Diapo(i - 1, o, x, y, z))
      /* ---- transparent frames ---- */
      let k = diapo.length - 1
      for (let j = 0; j < 3; j++) {
        let x = Math.round(Math.random() * 4000) - 2000
        let y = Math.round(Math.random() * 4000) - 2000
        diapo.push(new Diapo(k, null, x, y, z + 100))
      }
      o = data[i++]
    }
    /* ---- start engine ---- */
    run()
    /*   循环   */
    _an = setInterval(function () {
      if (imgIndex >= diapo.length - 1) {
        imgIndex = 0
      }
      diapo[imgIndex++].img.click()
    }, 600)
  }
  /* ==== main loop ==== */
  let run = function () {
    /* ---- x axis move ---- */
    if (camera.tx) {
      if (!camera.s) camera.setTarget(camera.x, camera.tx)
      let m = camera.tween('x')
      if (!m) camera.tx = 0
      /* ---- y axis move ---- */
    } else if (camera.ty) {
      if (!camera.s) camera.setTarget(camera.y, camera.ty)
      let m = camera.tween('y')
      if (!m) camera.ty = 0
      /* ---- z axis move ---- */
    } else if (camera.tz) {
      if (!camera.s) camera.setTarget(camera.z, camera.tz)
      let m = camera.tween('z')
      if (!m) {
        /* ---- animation end ---- */
        camera.tz = 0
        interpolation(true)
        /* ---- activate hyperlink ---- */
        if (selected.url) {
          selected.img.style.cursor = 'pointer'
          selected.urlActive = true
          selected.img.className = 'href'
        } else {
          selected.img.style.cursor = 'default'
        }
      }
    }
    /* ---- anim images ---- */
    let i = 0
    let o = diapo[i++]
    while (o) {
      o.anim()
      o = diapo[i++]
    }

    /* ---- loop ---- */
    _an2 = setTimeout(run, 32)
  }
  return {
    /* ==== initialize script ==== */
    init: init
  }
})()
// m3D是一个object
export {m3D}
