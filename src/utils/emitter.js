import mitt from "mitt";

const emitter = mitt()


// //触发
// emitter.emit('xxx-event', { visible: false })

// //监听
// emitter.on('xxx-event',(data)=> console.log(data) // { visible: false })

// //移除监听
// emitter.off('xxx-event')

// //清空所有监听
// emitter.all.clear()


export default emitter