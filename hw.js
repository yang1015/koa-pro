class A  {
    constructor(){
        this.nameA = 'A'
        
    }
    validateA() {
        console.log("validate A")
    }
}

class B extends A  {
    constructor(){
        super()
        this.nameB = 'B'
        
    }
    validateB() {
        console.log("validate B")
    }
}

class C extends B  {
    constructor(){
        super()
        this.nameC = 'C'
    }
    validateC() {
        console.log("validate C")
    }
}

 
let c = new C()
var members = [];
let obj = Object.getPrototypeOf(c) // 以实例换取其原型类
const res = printOutAllMembers(members, obj , 'name', 'validate' )
// console.log(cc)
// console.log(cc.__proto__) // 获取该类的父类
// let b = cc.__proto__
// let bb = b.__proto__
// console.log(b, " ", bb)
// let a = bb.__proto__
// let aa = a.__proto__
// console.log(a, " ", aa)

function printOutAllMembers(members, obj, propertyPrefix, methodPrefix) {
    if (obj.__proto__) {   // 如果该类的父类存在
        let objsFather = obj.__proto__
        printOutAllMembers(members, objsFather, propertyPrefix, methodPrefix)  
    } else { // 再没有更高级别的父类 console.log(obj)
       return;
    }
    members.push(`${propertyPrefix}${obj.constructor.name}`)
    members.push(`${methodPrefix}${obj.constructor.name}`)
}

console.log(members)