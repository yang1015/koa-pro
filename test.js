

async function func1() {
    try {
     await func2()
    } catch {
        console.log("error")
    }
}

// return一个promise 调用方需要使用async + await
function func2() {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            // return new Error('new Error')
            if (Math.random() < 0.5) reject('ERROR')
        }, 1000)
    })
}

func1()