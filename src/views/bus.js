import Vue from 'vue';

// 使用 Event Bus，EventBus其实就是一个Vue对象（类似一个全局变量），然后通过$emit(..)来发布key的时间，通过$on(..)来监听某key事件
const bus = new Vue();

export default bus;