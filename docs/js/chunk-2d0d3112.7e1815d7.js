(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d3112"],{"5ad4":function(t,s,e){"use strict";e.r(s);var r=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"container mt-5"},[e("div",{staticClass:"form-group row"},[e("label",{attrs:{for:"user_pwd"}},[t._v("이름")]),e("input",{ref:"userName",staticClass:"form-control",attrs:{type:"password"}})]),e("div",{staticClass:"form-group row"},[e("label",{attrs:{for:"user_pwd"}},[t._v("바꿀비밀번호")]),e("input",{ref:"userPwd",staticClass:"form-control",attrs:{type:"password"}})]),e("input",{attrs:{type:"button",value:"확인"},on:{click:t.fromcheck}})])},a=[],n={name:"changepwd",methods:{fromcheck:function(){this.changepwd()},changepwd:function(){var t=this;this.$store.dispatch("action_changepwd",{userId:this.$store.state.user.userid,userName:this.$refs.userName.value,userPwd:this.$refs.userPwd.value}).then((function(s){s?(alert("비밀번호 변경이 완료되었습니다."),t.$router.push("/user")):alert("비밀번호 변경에 실패했습니다.")}))}}},o=n,u=e("2877"),c=Object(u["a"])(o,r,a,!1,null,null,null);s["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2d0d3112.7e1815d7.js.map