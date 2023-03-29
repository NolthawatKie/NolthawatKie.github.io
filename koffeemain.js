var bean_init = 3
var bean_init_koin = 5

var cocoa_init = 15
var cocoa_init_koin = 20

var milk_init = 8
var milk_init_koin = 15

document.getElementById("bean-init").innerHTML = bean_init
document.getElementById("bean-init-koin").innerHTML = bean_init_koin

document.getElementById("cocoa-init").innerHTML = cocoa_init
document.getElementById("cocoa-init-koin").innerHTML = cocoa_init_koin

document.getElementById("milk-init").innerHTML = milk_init
document.getElementById("milk-init-koin").innerHTML = milk_init_koin

var bean_prepare = document.getElementById("bean-prepare")
var cocoa_prepare =  document.getElementById("cocoa-prepare")
var milk_prepare = document.getElementById("milk-prepare")


var total_cost = document.getElementById("total-result")

var total_value = 0

var total_log = document.getElementById("tx-log")

var isRoulette = 0


var bean_frac = (bean_init_koin / bean_init).toFixed(2)
var cocoa_frac = (cocoa_init_koin / cocoa_init).toFixed(2)
var milk_frac = (milk_init_koin / milk_init).toFixed(2)

var matDict = {'Coffee Beans' : [bean_frac, 0],'Cocoa' : [cocoa_init_koin / cocoa_init, 0], 'Milk' : [milk_init_koin / milk_init, 0]}



function calRawMat() {

    if (isRoulette > 0) return true

    var bean_prepare_v = +bean_prepare.value || 0
    var cocoa_prepare_v = +cocoa_prepare.value || 0
    var milk_prepare_v = +milk_prepare.value || 0

    matDict[Object.keys(matDict)[0]][1] = bean_prepare_v
    matDict[Object.keys(matDict)[1]][1] = cocoa_prepare_v
    matDict[Object.keys(matDict)[2]][1] = milk_prepare_v

    var x = bean_prepare_v * matDict[Object.keys(matDict)[0]][0]
    var y = cocoa_prepare_v * matDict[Object.keys(matDict)[1]][0]
    var z = milk_prepare_v * matDict[Object.keys(matDict)[2]][0]
    total_value = x+y+z
    var rm_cost = total_value.toFixed(2)

    total_log.innerHTML = ""
    total_log.innerHTML += "<br> Coffee Beans = " + bean_prepare_v + " x " +  bean_frac + " KpK = " + x.toFixed(2) +
                            "<br> Cocoa = " + bean_prepare_v + " x " +  cocoa_frac + " KpK = " +  y.toFixed(2)+ 
                            "<br> Milk = " + milk_prepare_v + " x " +  milk_frac + " KpK = " +  z.toFixed(2)

    total_cost.innerHTML = "Total Cost : " + rm_cost + " 💰"
    return 
    
}


function resetRawMat() {

    if (isRoulette > 0) return true

    bean_prepare.value = ""
    cocoa_prepare.value = ""
    milk_prepare.value = ""

    total_log.innerHTML = ""
    
    total_cost.innerHTML ="Total Cost : 0 💰" 
    total_value = 0
    return 
    
}


function getRoulette() {
    if (total_value == 0 || isRoulette != 0) return true
    isRoulette += 1

    var discountRoulette = (Math.floor(Math.random() * 50) + 1) / 100
    var matRoulette =  Math.floor(Math.random() * 3)

    var discount = matDict[Object.keys(matDict)[matRoulette]][0] *  matDict[Object.keys(matDict)[matRoulette]][1]  * discountRoulette

    var roulette_fee = 0.1 * total_value

    var msg_discount = "You got " + Object.keys(matDict)[matRoulette] + " discount for " + (discountRoulette*100).toFixed(2)+ "% = "

    var msg_roulette = ""
    if (discount > roulette_fee) {
        msg_roulette = "You're Lucky :)"
    } else {
        msg_roulette = "Bad luck Pal ! :("
    }

    total_log.innerHTML += "<br>Roulette Fee = " + roulette_fee.toFixed(2) + 
                            "<br>"+msg_discount + discount.toFixed(2) +
                            "<br>" + msg_roulette
    total_value += roulette_fee - discount

    total_cost.innerHTML = "Total Cost : "+total_value.toFixed(2)+" 💰" 
    return 
}
