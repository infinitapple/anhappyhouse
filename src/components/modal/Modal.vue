<template>
  <div class="modal__window" v-if="visible" @click.self="handleWrapperClick">
      <div class="modal__dialog">
          <header class="modal__header">
              <span>{{title}}</span>
              <button @click="$emit('update:visible',!visible)">Close</button>
          </header>
          <div class="modal__body">
              <slot></slot>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props:['visible','title'],
    methods:{
        handleWrapperClick(){
            this.$emit('update:visible',false)
        }
    }
}
</script>

<style>
.modal__window {
  background-color: rgba(0, 0, 0, 0.3);
  top: 0; right: 0; bottom: 0; left: 0;
  position: fixed;
  overflow: auto;
  margin: 0;
}
.modal__dialog{
    margin: 75px auto auto auto;
    width: 600px;
    background: #fff;
    margin-bottom: 50px;
    border: 1px solid #888;
}
.modal__header{
    font-size: 28px;
    font-weight: bold;
    line-height: 1.29;
    padding: 16px 16px 0 25px;
    position: relative;
}
.modal__body{
    padding: 25px;
    min-height: 150px;
    max-height: 412px;
    overflow-y: scroll;
}
</style>